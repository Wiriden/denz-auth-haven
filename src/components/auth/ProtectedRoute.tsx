
import { useAuth } from "@/hooks/useAuth";
import { ReactNode, useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { user, loading } = useAuth();
  const location = useLocation();
  const [timeoutReached, setTimeoutReached] = useState(false);

  useEffect(() => {
    console.log("ProtectedRoute:", { user, loading, path: location.pathname });
    
    // Set a timeout to prevent infinite loading
    const timeout = setTimeout(() => {
      if (loading) {
        console.log("Loading timeout reached in ProtectedRoute");
        setTimeoutReached(true);
      }
    }, 5000); // 5 second timeout
    
    return () => clearTimeout(timeout);
  }, [user, loading, location]);

  // Show loading spinner for a maximum of 5 seconds
  if (loading && !timeoutReached) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="h-8 w-8 border-4 border-t-transparent border-denz-blue rounded-full animate-spin"></div>
      </div>
    );
  }

  // If timeout reached but still no user, redirect to login
  if ((timeoutReached || !loading) && !user) {
    console.log("No user after loading finished, redirecting to login");
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
