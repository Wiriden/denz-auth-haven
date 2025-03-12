import { ReactNode, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import type { Profile } from '@/lib/api';
import { AuthContext } from './AuthContext';
import { fetchUserProfile, signInWithEmailPassword, signOutUser } from '@/services/authService';
import { getMockUser, mockProfiles, setMockUser } from '@/lib/mockData';

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);
  const navigate = useNavigate();

  // Check initial session and automatically set a mock user
  useEffect(() => {
    const autoLogin = async () => {
      try {
        console.log("Auto-logging in with mock user...");
        // Automatically use the first admin user for demo purposes
        const adminUser = mockProfiles.find(profile => profile.role === 'admin') || mockProfiles[0];
        
        // Set this user as the logged in user
        setMockUser(adminUser);
        setUser(adminUser);
        console.log("Auto-login successful with user:", adminUser.name);
      } catch (error) {
        console.error("Error during auto-login:", error);
      } finally {
        setAuthChecked(true);
      }
    };

    autoLogin();
  }, []);

  // Keep the original signIn and signOut methods for UI functionality
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
