
import type { Profile } from '@/lib/api';
import { supabase } from '@/lib/supabase';
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

interface AuthContextType {
  user: Profile | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ success: boolean, error?: string }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchUser = async (userId: string) => {
    try {
      console.log("Fetching user data for ID:", userId);
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();
        
      if (error) {
        console.error("Error fetching user profile:", error);
        // Create a minimal user object with just the ID if we can't fetch the full profile
        // This allows authentication to proceed even if profile data is unavailable
        return { id: userId, name: 'User', role: 'user', status: 'active' } as Profile;
      }
      
      if (!data) {
        console.error("No profile found for user ID:", userId);
        return { id: userId, name: 'User', role: 'user', status: 'active' } as Profile;
      }
      
      console.log("User profile fetched successfully:", data);
      return data as Profile;
    } catch (error) {
      console.error("Exception in fetchUser:", error);
      // Return minimal user object on exception
      return { id: userId, name: 'User', role: 'user', status: 'active' } as Profile;
    }
  };

  useEffect(() => {
    let mounted = true;
    console.log("AuthProvider initialized, loading:", loading);

    // Lyssna på auth-ändringar
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log("Auth state changed:", event, !!session);
        if (!mounted) return;

        try {
          if (session) {
            // Sätt loading till true under användardata-hämtning
            if (mounted) setLoading(true);
            console.log("Session found, loading user data...");
            
            const userId = session.user.id;
            const userData = await fetchUser(userId);
            console.log("User data fetched:", !!userData);
            
            if (mounted) {
              setUser(userData);
              if (event === 'SIGNED_IN') {
                console.log("User signed in, navigating to dashboard");
                navigate('/dashboard');
              }
              // Återställ loading när användardata är hämtad
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
              // Återställ loading när användaren är utloggad
              setLoading(false);
            }
          }
        } catch (error) {
          console.error('Fel vid auth state change:', error);
          if (mounted) {
            // Even on error, if we have a session, create a minimal user object
            if (session) {
              setUser({ id: session.user.id, name: 'User', role: 'user', status: 'active' } as Profile);
            } else {
              setUser(null);
            }
            // Återställ loading vid fel
            setLoading(false);
          }
        }
      }
    );

    // Hämta initial user
    const getInitialUser = async () => {
      if (!mounted) return;
      console.log("Fetching initial user...");

      try {
        const { data: sessionData } = await supabase.auth.getSession();
        console.log("Initial session:", !!sessionData.session);
        
        if (sessionData.session && mounted) {
          console.log("Session exists, getting user data");
          const userId = sessionData.session.user.id;
          const userData = await fetchUser(userId);
          console.log("Initial user data:", !!userData);
          
          if (mounted) {
            setUser(userData);
          }
        } else {
          console.log("No initial session");
        }
      } catch (error) {
        console.error('Fel vid hämtning av initial användardata:', error);
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
      subscription.unsubscribe();
    };
  }, [navigate]);

  const signIn = async (email: string, password: string) => {
    console.log("Starting sign in process...");
    setLoading(true);
    
    try {
      console.log('Försöker logga in med:', email);
      const { data, error } = await supabase.auth.signInWithPassword({ 
        email, 
        password 
      });

      console.log('Inloggningssvar:', data, error);

      if (error) {
        console.error("Sign in error:", error.message);
        setLoading(false);
        return { success: false, error: error.message };
      }

      if (!data.session) {
        console.error("No session created during sign in");
        setLoading(false);
        return { success: false, error: 'Ingen session skapades vid inloggning' };
      }

      console.log("Sign in successful, session created:", data.session.user.id);
      
      // Create a minimal user object directly after successful auth
      const minimalUser = { 
        id: data.session.user.id, 
        name: 'User', 
        role: 'user', 
        status: 'active' 
      } as Profile;
      
      setUser(minimalUser);
      
      // Navigate immediately to dashboard
      navigate('/dashboard');
      
      // Notify the user
      toast.success("Inloggning lyckades!");
      
      // Set loading to false after navigation
      setTimeout(() => {
        setLoading(false);
      }, 500);
      
      // Returnera framgång omedelbart, så att UI kan uppdateras
      return { success: true };
    } catch (error: any) {
      console.error('Inloggningsfel:', error);
      setLoading(false);
      return { success: false, error: error.message || 'Ett oväntat fel uppstod' };
    }
  };

  const signOut = async () => {
    setLoading(true);
    try {
      console.log("Signing out...");
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error("Sign out error:", error);
        throw error;
      }
      console.log("Sign out successful");
      // Navigering hanteras av onAuthStateChange
    } catch (error: any) {
      console.error('Utloggningsfel:', error);
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

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default useAuth;
