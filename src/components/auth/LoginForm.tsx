
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/useAuth";
import React, { useState } from "react";
import { toast } from "sonner";
import { EmailIcon, EyeIcon, EyeOffIcon, LockIcon } from "../icons/AuthIcons";

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { signIn, loading } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast.error("Vänligen fyll i både e-post och lösenord");
      return;
    }
    
    if (isSubmitting) return;
    
    setIsSubmitting(true);
    console.log("LoginForm: Påbörjar inloggning");
    
    try {
      console.log("LoginForm: Anropar signIn");
      const result = await signIn(email, password);
      console.log("LoginForm: signIn resultat:", result);
      
      if (!result.success) {
        toast.error(result.error || "Inloggning misslyckades");
      }
    } catch (error: any) {
      console.error('LoginForm error:', error);
      toast.error(error.message || "Ett oväntat fel uppstod");
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const isLoading = loading || isSubmitting;

  return (
    <div className="w-full bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h2 className="text-xl font-medium text-center mb-6 text-denz-text-primary">Logga in</h2>
      
      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-denz-text-secondary mb-1.5">
            E-postadress
          </label>
          <div className="relative">
            <EmailIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-denz-text-secondary" />
            <Input
              id="email"
              type="email"
              placeholder="din@email.se"
              className="pl-10 h-10 bg-white border-gray-200 rounded-md focus:border-denz-blue focus:ring-1 focus:ring-denz-blue/20 w-full"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
              required
            />
          </div>
        </div>
        
        <div>
          <div className="flex justify-between items-center mb-1.5">
            <label htmlFor="password" className="block text-sm font-medium text-denz-text-secondary">
              Lösenord
            </label>
            <a href="#" className="text-xs text-denz-blue hover:underline">
              Glömt lösenord?
            </a>
          </div>
          <div className="relative">
            <LockIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-denz-text-secondary" />
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Lösenord"
              className="pl-10 pr-10 h-10 bg-white border-gray-200 rounded-md focus:border-denz-blue focus:ring-1 focus:ring-denz-blue/20 w-full"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
              required
            />
            <button
              type="button"
              onClick={toggleShowPassword}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-denz-text-secondary hover:text-denz-text-primary focus:outline-none"
              aria-label={showPassword ? "Dölj lösenord" : "Visa lösenord"}
              disabled={isLoading}
            >
              {showPassword ? <EyeOffIcon /> : <EyeIcon />}
            </button>
          </div>
        </div>
        
        <Button 
          type="submit" 
          className="w-full h-10 bg-denz-blue hover:bg-denz-dark-blue text-white transition-colors duration-200 rounded-md mt-2"
          disabled={isLoading}
        >
          {isLoading ? (
            <div className="flex items-center justify-center">
              <div className="h-4 w-4 border-2 border-t-transparent border-white rounded-full animate-spin mr-2"></div>
              Loggar in...
            </div>
          ) : (
            "Logga in"
          )}
        </Button>
      </form>
      
      <div className="mt-5 text-center">
        <a 
          href="#" 
          className="text-sm text-denz-text-secondary hover:text-denz-blue transition-colors duration-200"
        >
          Vill du ha en faktura?
        </a>
      </div>
    </div>
  );
};

export default LoginForm;
