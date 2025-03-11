
import { supabase } from '@/lib/supabase';
import type { Profile } from '@/lib/api';
import { toast } from 'sonner';

/**
 * Fetches user profile data from the database
 */
export const fetchUserProfile = async (userId: string): Promise<Profile> => {
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
      return { id: userId, name: 'User', role: 'user', status: 'active' } as Profile;
    }
    
    if (!data) {
      console.error("No profile found for user ID:", userId);
      return { id: userId, name: 'User', role: 'user', status: 'active' } as Profile;
    }
    
    console.log("User profile fetched successfully:", data);
    return data as Profile;
  } catch (error) {
    console.error("Exception in fetchUserProfile:", error);
    // Return minimal user object on exception
    return { id: userId, name: 'User', role: 'user', status: 'active' } as Profile;
  }
};

/**
 * Signs in a user with email and password
 */
export const signInWithEmailPassword = async (email: string, password: string) => {
  console.log('Attempting to sign in with:', email);
  
  const { data, error } = await supabase.auth.signInWithPassword({ 
    email, 
    password 
  });

  console.log('Sign in response:', data, error);

  if (error) {
    console.error("Sign in error:", error.message);
    return { success: false, error: error.message, session: null, user: null };
  }

  if (!data.session) {
    console.error("No session created during sign in");
    return { success: false, error: 'Ingen session skapades vid inloggning', session: null, user: null };
  }

  console.log("Sign in successful, session created:", data.session.user.id);
  
  // Create a minimal user object directly after successful auth
  const minimalUser = { 
    id: data.session.user.id, 
    name: 'User', 
    role: 'user', 
    status: 'active' 
  } as Profile;
  
  return { 
    success: true, 
    session: data.session,
    user: minimalUser
  };
};

/**
 * Signs the user out
 */
export const signOutUser = async () => {
  console.log("Signing out...");
  return await supabase.auth.signOut();
};

/**
 * Gets the current session if one exists
 */
export const getCurrentSession = async () => {
  const { data } = await supabase.auth.getSession();
  return data.session;
};

