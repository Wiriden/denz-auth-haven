
import AuthFooter from "@/components/auth/AuthFooter";
import LoginForm from "@/components/auth/LoginForm";
import { useAuth } from "@/hooks/useAuth";
import { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Index = () => {
  const { user, loading, authChecked } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    // Set page title
    document.title = "Denz | Logga in";
    console.log("Index rendered, user:", !!user, "loading:", loading, "authChecked:", authChecked);
  }, [user, loading, authChecked]);

  // Option to bypass login
  const goToDashboard = () => {
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md flex flex-col items-center space-y-6">
        <div className="mb-6 flex items-center justify-center">
          <div className="w-12 h-12 rounded-lg bg-denz-blue flex items-center justify-center text-white font-bold text-xl">
            D
          </div>
          <span className="ml-3 text-xl font-semibold text-denz-text-primary">Assetmaster</span>
        </div>
        
        {/* Regular login form */}
        <LoginForm />
        
        {/* Direct access button */}
        <div className="w-full bg-white rounded-lg shadow-sm border border-gray-200 p-4 mt-4">
          <h3 className="text-sm font-medium text-center mb-3 text-denz-text-primary">Demo Mode</h3>
          <Button 
            onClick={goToDashboard}
            className="w-full bg-denz-success hover:bg-denz-success/90 text-white"
          >
            Gå till översikt utan inloggning
          </Button>
        </div>
        
        <AuthFooter />
      </div>
    </div>
  );
};

export default Index;
