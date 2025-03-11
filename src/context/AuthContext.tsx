
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import type { Profile } from '@/lib/api';
import { supabase } from '@/lib/supabase';
import { fetchUserProfile, signInWithEmailPassword, signOutUser } from '@/services/authService';

interface AuthContextType {
  user: Profile | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ success: boolean, error?: string }>;
  signOut: () => Promise<void>;
}

// Create the context with undefined as default
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// AuthProvider component that wraps the application
export const AuthProvider = ({ children }: { children: ReactNode }) => {
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
    }, 5000); // 5 second timeout

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log("Auth state changed:", event, !!session);
        if (!mounted) return;

        try {
          if (session) {
            // Set loading to true while fetching user data
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
              // Reset loading after user data is fetched
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
              // Reset loading when user is logged out
              setLoading(false);
            }
          }
        } catch (error) {
          console.error('Error in auth state change:', error);
          if (mounted) {
            // Even on error, if we have a session, create a minimal user object
            if (session) {
              setUser({ id: session.user.id, name: 'User', role: 'user', status: 'active' } as Profile);
            } else {
              setUser(null);
            }
            // Reset loading on error
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
          }
        } else {
          console.log("No initial session");
        }
      } catch (error) {
        console.error('Error fetching initial user data:', error);
        if (mounted && error instanceof Error) {
          toast.error(`Ett fel uppstod: ${error.message}`);
        }
        if (mounted) {
          setUser(null);
        }
      } finally {
        if (mounted) {
          console.log("Initial load complete, setting loading to false");
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
        setLoading(false);
        return { success: false, error: result.error };
      }

      // Set the user immediately
      setUser(result.user);
      
      // Navigate immediately to dashboard
      navigate('/dashboard');
      
      // Notify the user
      toast.success("Inloggning lyckades!");
      
      // Set loading to false after navigation
      setTimeout(() => {
        setLoading(false);
      }, 500);
      
      // Return success immediately, so that UI can be updated
      return { success: true };
    } catch (error: any) {
      console.error('Login error:', error);
      setLoading(false);
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
        throw error;
      }
      console.log("Sign out successful");
      // Navigation is handled by onAuthStateChange
    } catch (error: any) {
      console.error('Sign out error:', error);
      setLoading(false);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for using the context
export default function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
