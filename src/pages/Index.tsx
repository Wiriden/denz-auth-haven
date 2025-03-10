
import React, { useEffect } from "react";
import Logo from "@/components/auth/Logo";
import LoginForm from "@/components/auth/LoginForm";
import AuthFooter from "@/components/auth/AuthFooter";

const Index = () => {
  useEffect(() => {
    // Sätt titel för sidan
    document.title = "Denz | Logga in";
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-denz-darker to-denz-darkest flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md flex flex-col items-center space-y-8">
        <Logo className="mb-8" />
        <LoginForm />
        <AuthFooter />
      </div>
    </div>
  );
};

export default Index;
