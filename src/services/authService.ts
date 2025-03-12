
import { setMockUser } from '@/lib/mockData';
import type { Profile } from '@/lib/api';
import { mockProfiles } from '@/lib/mockData';

export const fetchUserProfile = async (userId: string): Promise<Profile> => {
  try {
    console.log("Fetching user profile for ID:", userId);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const profile = mockProfiles.find(profile => profile.id === userId);
      
    if (!profile) {
      console.error("No profile found for user ID:", userId);
      throw new Error('Ingen användarprofil hittades');
    }
    
    console.log("User profile fetched successfully");
    return profile;
  } catch (error) {
    console.error("Exception in fetchUserProfile:", error);
    throw new Error('Ett fel uppstod vid hämtning av användarprofil');
  }
};

export const signInWithEmailPassword = async (email: string, password: string) => {
  try {
    console.log("Attempting to sign in with:", email);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // For demo purposes, accept any valid email format and 'password' as the password
    if (!email.includes('@') || password !== 'password') {
      console.error("Sign-in error: Invalid credentials");
      return { 
        success: false, 
        error: 'Felaktiga inloggningsuppgifter',
        session: null, 
        user: null 
      };
    }

    // Find or create a mock user based on email
    let user = mockProfiles.find(profile => profile.contact === email);
    
    // If no user is found with the exact email, just use the first admin user
    if (!user) {
      user = mockProfiles.find(profile => profile.role === 'admin') || mockProfiles[0];
    }
    
    // Set the mock user as the current user
    setMockUser(user);

    console.log("Sign-in successful");
    
    return { 
      success: true, 
      session: { user: { id: user.id } },
      user: user
    };
  } catch (error: any) {
    console.error("Unexpected error during sign-in:", error);
    return { 
      success: false, 
      error: error.message || "Ett oväntat fel uppstod", 
      session: null, 
      user: null 
    };
  }
};

export const signOutUser = async () => {
  console.log("Signing out user");
  // Clear the current user
  setMockUser(null);
  return { error: null };
};

export const getCurrentSession = async () => {
  console.log("Getting current session");
  const user = mockProfiles[0]; // Always return the first user for demo
  return user ? { user: { id: user.id } } : null;
};
