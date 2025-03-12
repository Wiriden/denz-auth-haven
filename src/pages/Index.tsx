
import AuthFooter from "@/components/auth/AuthFooter";
import LoginForm from "@/components/auth/LoginForm";
import { useAuth } from "@/hooks/useAuth";
import { useEffect } from "react";
import { Navigate } from "react-router-dom";

const Index = () => {
  const { user, loading, authChecked } = useAuth();
  
  useEffect(() => {
    // Set page title
    document.title = "Denz | Logga in";
    console.log("Index rendered, user:", !!user, "loading:", loading, "authChecked:", authChecked);
  }, [user, loading, authChecked]);

  // Only redirect if we've checked auth and found a user
  if (authChecked && user && !loading) {
    console.log("User is logged in, redirecting to dashboard");
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md flex flex-col items-center space-y-6">
        <div className="mb-6 flex items-center justify-center">
          <div className="w-12 h-12 rounded-lg bg-denz-blue flex items-center justify-center text-white font-bold text-xl">
            D
          </div>
          <span className="ml-3 text-xl font-semibold text-denz-text-primary">Assetmaster</span>
        </div>
        
        {/* Show login form - all loading states are handled inside */}
        <LoginForm />
        
        <AuthFooter />
      </div>
    </div>
  );
};

export default Index;
