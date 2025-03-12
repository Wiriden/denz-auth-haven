
import { useAuth } from "@/hooks/useAuth";
import { ReactNode, useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { user, loading, authChecked } = useAuth();
  const location = useLocation();
  const [timeoutReached, setTimeoutReached] = useState(false);

  useEffect(() => {
    console.log("ProtectedRoute:", { user, loading, authChecked, path: location.pathname });
    
    // Set a timeout to prevent infinite loading
    const timeout = setTimeout(() => {
      if (loading) {
        console.log("Loading timeout reached in ProtectedRoute");
        setTimeoutReached(true);
      }
    }, 5000); // 5 second timeout
    
    return () => clearTimeout(timeout);
  }, [user, loading, location, authChecked]);

  // If we're still loading and haven't reached timeout, show spinner
  if (loading && !timeoutReached && !authChecked) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="h-8 w-8 border-4 border-t-transparent border-denz-blue rounded-full animate-spin"></div>
      </div>
    );
  }

  // If auth is checked and no user, or timeout reached, redirect to login
  if ((authChecked && !user) || (timeoutReached && !user)) {
    console.log("No user after auth check or timeout, redirecting to login");
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
