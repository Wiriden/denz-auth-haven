import { useAuth } from '@/hooks/useAuth';
import { type Profile } from '@/lib/api';
import { createContext, ReactNode, useContext } from 'react';

// Typ för UserContext
interface UserContextType {
  user: Profile | null;
  isAdmin: boolean;
  loading: boolean;
}

// Skapa context
const UserContext = createContext<UserContextType | undefined>(undefined);

// Provider-komponent
export const UserProvider = ({ children }: { children: ReactNode }) => {
  const { user, loading } = useAuth();
  
  // Beräkna om användaren är admin
  const isAdmin = user?.role === 'admin';
  
  return (
    <UserContext.Provider value={{ user, isAdmin, loading }}>
      {children}
    </UserContext.Provider>
  );
};

// Hook för att använda context
export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export default useUser; 