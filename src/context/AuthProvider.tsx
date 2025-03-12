
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
  const [loading, setLoading] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);
  const navigate = useNavigate();

  // Check initial session on mount
  useEffect(() => {
    const checkSession = async () => {
      try {
        console.log("Checking initial session...");
        
        // Don't set loading to true here, as it triggers the spinner on initial page load
        const { data: { session } } = await supabase.auth.getSession();
        
        if (session) {
          console.log("Session found, fetching user profile...");
          try {
            const userData = await fetchUserProfile(session.user.id);
            setUser(userData);
            console.log("User profile set:", !!userData);
          } catch (error) {
            console.error("Error fetching user profile:", error);
            setUser(null);
          }
        } else {
          console.log("No session found");
          setUser(null);
        }
      } catch (error) {
        console.error("Error checking session:", error);
        setUser(null);
      } finally {
        setAuthChecked(true);
      }
    };

    checkSession();
  }, []);

  // Listen for auth state changes
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log("Auth state changed:", event, !!session);
        
        if (session) {
          try {
            // Only set loading to true for sign-in event
            if (event === 'SIGNED_IN') {
              setLoading(true);
            }
            
            const userData = await fetchUserProfile(session.user.id);
            setUser(userData);
            
            if (event === 'SIGNED_IN') {
              navigate('/dashboard');
              setLoading(false);
            }
          } catch (error) {
            console.error('Error in auth state change:', error);
            setUser(null);
            setLoading(false);
            toast.error('Ett fel uppstod vid inloggning');
          }
        } else {
          setUser(null);
          if (event === 'SIGNED_OUT') {
            navigate('/');
          }
        }
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate]);

  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true);
      console.log("Attempting to sign in with:", email);
      
      const result = await signInWithEmailPassword(email, password);

      if (!result.success) {
        toast.error(result.error || 'Inloggning misslyckades');
        setLoading(false);
        return { success: false, error: result.error };
      }
      
      // Auth state change handler will handle the user setting and navigation
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
      setLoading(true);
      await signOutUser();
      // Auth state change will handle the rest
    } catch (error: any) {
      console.error('Sign out error:', error);
      toast.error('Ett fel uppstod vid utloggning');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, authChecked, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};
