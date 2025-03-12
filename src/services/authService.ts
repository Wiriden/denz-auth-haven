
import { supabase } from '@/lib/supabase';
import type { Profile } from '@/lib/api';

export const fetchUserProfile = async (userId: string): Promise<Profile> => {
  try {
    console.log("Fetching user profile for ID:", userId);
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();
      
    if (error) {
      console.error("Error fetching user profile:", error);
      throw new Error('Kunde inte hämta användarprofil');
    }
    
    if (!data) {
      console.error("No profile found for user ID:", userId);
      throw new Error('Ingen användarprofil hittades');
    }
    
    console.log("User profile fetched successfully");
    return data as Profile;
  } catch (error) {
    console.error("Exception in fetchUserProfile:", error);
    throw new Error('Ett fel uppstod vid hämtning av användarprofil');
  }
};

export const signInWithEmailPassword = async (email: string, password: string) => {
  try {
    console.log("Attempting to sign in with:", email);
    const { data, error } = await supabase.auth.signInWithPassword({ 
      email, 
      password 
    });

    if (error) {
      console.error("Sign-in error:", error.message);
      
      // Translate common error messages to Swedish
      let errorMessage = error.message;
      if (error.message === 'Invalid login credentials') {
        errorMessage = 'Felaktiga inloggningsuppgifter';
      } else if (error.message.includes('rate limit')) {
        errorMessage = 'För många inloggningsförsök. Vänta en stund och försök igen.';
      }
      
      return { 
        success: false, 
        error: errorMessage,
        session: null, 
        user: null 
      };
    }

    if (!data.session) {
      return { 
        success: false, 
        error: 'Ingen session skapades vid inloggning', 
        session: null, 
        user: null 
      };
    }

    console.log("Sign-in successful");
    
    return { 
      success: true, 
      session: data.session,
      user: data.user
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
  return await supabase.auth.signOut();
};

export const getCurrentSession = async () => {
  console.log("Getting current session");
  const { data } = await supabase.auth.getSession();
  return data.session;
};
