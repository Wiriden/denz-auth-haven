
import { ReactNode, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import type { Profile } from '@/lib/api';
import { AuthContext } from './AuthContext';
import { fetchUserProfile, signInWithEmailPassword, signOutUser } from '@/services/authService';
import { getMockUser } from '@/lib/mockData';

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
        // In mock version, just check if we have a stored user
        const mockUser = getMockUser();
        
        if (mockUser) {
          console.log("Session found, fetching user profile...");
          try {
            const userData = await fetchUserProfile(mockUser.id);
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

  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true);
      console.log("Attempting to sign in with:", email);
      
      const result = await signInWithEmailPassword(email, password);

      if (!result.success) {
        toast.error(result.error || 'Inloggning misslyckades');
        return { success: false, error: result.error };
      }
      
      try {
        if (result.user) {
          setUser(result.user as Profile);
        } else if (result.session?.user?.id) {
          const userData = await fetchUserProfile(result.session.user.id);
          setUser(userData);
        }
        
        // Navigate after successful login
        navigate('/dashboard');
        return { success: true };
      } catch (error: any) {
        console.error('Error fetching user profile after login:', error);
        toast.error('Kunde inte hämta användardata');
        return { success: false, error: error.message };
      }
    } catch (error: any) {
      console.error('Login error:', error);
      toast.error(error.message || 'Ett oväntat fel uppstod');
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setLoading(true);
      await signOutUser();
      setUser(null);
      navigate('/');
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
