
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
    let loadingTimeout: number | undefined;
    
    console.log("AuthProvider initialized, loading:", loading);

    // Set a timeout to prevent infinite loading
    loadingTimeout = window.setTimeout(() => {
      if (mounted && loading) {
        console.log("Forcing loading state to false after timeout");
        setLoading(false);
      }
    }, 5000);

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log("Auth state changed:", event, !!session);
        if (!mounted) return;

        try {
          if (session) {
            if (mounted) setLoading(true);
            console.log("Session found, loading user data...");
            
            const userId = session.user.id;
            const userData = await fetchUserProfile(userId);
            console.log("User data fetched:", !!userData);
            
            if (mounted) {
              setUser(userData);
              if (event === 'SIGNED_IN') {
                console.log("User signed in, navigating to dashboard");
                navigate('/dashboard');
              }
              setLoading(false);
            }
          } else {
            if (mounted) {
              console.log("No session, clearing user");
              setUser(null);
              if (event === 'SIGNED_OUT') {
                console.log("User signed out, navigating to login");
                navigate('/');
              }
              setLoading(false);
            }
          }
        } catch (error) {
          console.error('Error in auth state change:', error);
          if (mounted) {
            if (session) {
              setUser({ id: session.user.id, name: 'User', role: 'user', status: 'active' } as Profile);
            } else {
              setUser(null);
            }
            setLoading(false);
          }
        }
      }
    );

    // Fetch initial user
    const getInitialUser = async () => {
      if (!mounted) return;
      console.log("Fetching initial user...");

      try {
        const { data: sessionData } = await supabase.auth.getSession();
        console.log("Initial session:", !!sessionData.session);
        
        if (sessionData.session && mounted) {
          console.log("Session exists, getting user data");
          const userId = sessionData.session.user.id;
          const userData = await fetchUserProfile(userId);
          console.log("Initial user data:", !!userData);
          
          if (mounted) {
            setUser(userData);
            setLoading(false);
          }
        } else {
          console.log("No initial session");
          if (mounted) {
            setLoading(false);
          }
        }
      } catch (error) {
        console.error('Error fetching initial user data:', error);
        if (mounted && error instanceof Error) {
          toast.error(`Ett fel uppstod: ${error.message}`);
        }
        if (mounted) {
          setUser(null);
          setLoading(false);
        }
      }
    };

    getInitialUser();

    return () => {
      console.log("AuthProvider cleaning up");
      mounted = false;
      if (loadingTimeout) {
        clearTimeout(loadingTimeout);
      }
      subscription.unsubscribe();
    };
  }, [navigate]);

  const signIn = async (email: string, password: string) => {
    console.log("Starting sign in process...");
    setLoading(true);
    
    try {
      const result = await signInWithEmailPassword(email, password);

      if (!result.success) {
        setLoading(false); // Reset loading state when login fails
        return { success: false, error: result.error };
      }

      setUser(result.user);
      toast.success("Inloggning lyckades!");
      
      // Let the auth state change handle redirection and loading state reset
      return { success: true };
    } catch (error: any) {
      console.error('Login error:', error);
      setLoading(false); // Reset loading state on error
      return { success: false, error: error.message || 'Ett oväntat fel uppstod' };
    }
  };

  const signOut = async () => {
    setLoading(true);
    try {
      console.log("Signing out...");
      const { error } = await signOutUser();
      if (error) {
        console.error("Sign out error:", error);
        setLoading(false); // Reset loading state on error
        throw error;
      }
      console.log("Sign out successful");
      // Auth state change will handle clearing user and navigation
    } catch (error: any) {
      console.error('Sign out error:', error);
      setLoading(false); // Reset loading state on error
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};
