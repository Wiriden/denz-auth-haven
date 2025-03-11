
import { createContext, useContext } from 'react';
import type { Profile } from '@/lib/api';

interface AuthContextType {
  user: Profile | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ success: boolean, error?: string }>;
  signOut: () => Promise<void>;
}

// Create the context with undefined as default
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Custom hook for using the context
export default function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export { AuthProvider } from './AuthProvider';
