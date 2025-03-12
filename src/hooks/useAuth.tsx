
import { useContext } from 'react';
import { AuthContext } from '@/context/AuthContext';

// Main hook for using auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Re-export AuthProvider
export { AuthProvider } from '@/context/AuthProvider';
