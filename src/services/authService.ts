
import { supabase } from '@/lib/supabase';
import type { Profile } from '@/lib/api';

export const fetchUserProfile = async (userId: string): Promise<Profile> => {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();
      
    if (error) {
      console.error("Error fetching user profile:", error);
      return { id: userId, name: 'User', role: 'user', status: 'active' } as Profile;
    }
    
    if (!data) {
      console.error("No profile found for user ID:", userId);
      return { id: userId, name: 'User', role: 'user', status: 'active' } as Profile;
    }
    
    return data as Profile;
  } catch (error) {
    console.error("Exception in fetchUserProfile:", error);
    return { id: userId, name: 'User', role: 'user', status: 'active' } as Profile;
  }
};

export const signInWithEmailPassword = async (email: string, password: string) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({ 
      email, 
      password 
    });

    if (error) {
      return { 
        success: false, 
        error: error.message === 'Invalid login credentials' 
          ? 'Felaktiga inloggningsuppgifter' 
          : error.message,
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

    try {
      const userProfile = await fetchUserProfile(data.session.user.id);
      return { 
        success: true, 
        session: data.session,
        user: userProfile
      };
    } catch (error) {
      console.error("Error fetching user profile after sign in:", error);
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
    }
  } catch (error: any) {
    return { 
      success: false, 
      error: error.message || "Ett oväntat fel uppstod", 
      session: null, 
      user: null 
    };
  }
};

export const signOutUser = async () => {
  return await supabase.auth.signOut();
};

export const getCurrentSession = async () => {
  const { data } = await supabase.auth.getSession();
  return data.session;
};
