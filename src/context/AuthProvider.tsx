
import { ReactNode, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import type { Profile } from '@/lib/api';
import { supabase } from '@/lib/supabase';
import { AuthContext } from './AuthContext';
import { fetchUserProfile, signInWithEmailPassword, signOutUser } from '@/services/authService';

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    let mounted = true;

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (process.env.NODE_ENV === 'development') {
          console.log("Auth state changed:", event, !!session);
        }
        
        if (!mounted) return;

        try {
          if (session) {
            // Only set loading true on initial load or new sign in
            if (event === 'INITIAL_SESSION' || event === 'SIGNED_IN') {
              setLoading(true);
            }

            const userId = session.user.id;
            const userData = await fetchUserProfile(userId);
            
            if (mounted) {
              setUser(userData);
              
              if (event === 'SIGNED_IN') {
                navigate('/dashboard');
              }
            }
          } else {
            if (mounted) {
              setUser(null);
              if (event === 'SIGNED_OUT') {
                navigate('/');
              }
            }
          }
        } catch (error) {
          console.error('Error in auth state change:', error);
          toast.error('Ett fel uppstod vid inloggning');
        } finally {
          if (mounted) {
            setLoading(false);
          }
        }
      }
    );

    // Check initial session
    const checkSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session && mounted) {
          const userData = await fetchUserProfile(session.user.id);
          if (mounted) {
            setUser(userData);
          }
        }
      } catch (error) {
        console.error('Error checking initial session:', error);
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    checkSession();

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [navigate]);

  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true);
      const result = await signInWithEmailPassword(email, password);

      if (!result.success) {
        toast.error(result.error || 'Inloggning misslyckades');
        setLoading(false);
        return { success: false, error: result.error };
      }

      // The auth state change handler will handle setting the user and navigation
      return { success: true };
    } catch (error: any) {
      console.error('Login error:', error);
      toast.error(error.message || 'Ett oväntat fel uppstod');
      setLoading(false);
      return { success: false, error: error.message };
    }
  };

  const signOut = async () => {
    try {
      await signOutUser();
      // Auth state change will handle the rest
    } catch (error: any) {
      console.error('Sign out error:', error);
      toast.error('Ett fel uppstod vid utloggning');
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};
