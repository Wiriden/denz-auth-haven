
import { createContext } from 'react';
import type { Profile } from '@/lib/api';

interface AuthContextType {
  user: Profile | null;
  loading: boolean;
  authChecked: boolean;
  signIn: (email: string, password: string) => Promise<{ success: boolean, error?: string }>;
  signOut: () => Promise<void>;
}

// Create the context with undefined as default
export const AuthContext = createContext<AuthContextType | undefined>(undefined);
