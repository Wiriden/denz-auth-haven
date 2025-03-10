
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { EmailIcon, LockIcon, EyeIcon, EyeOffIcon } from "../icons/AuthIcons";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast.error("Vänligen fyll i både e-post och lösenord");
      return;
    }
    
    setIsLoading(true);
    
    // Detta är en simulerad inloggning som representerar en riktig auth-process
    // Här skulle du integrera Supabase eller annan auth-provider
    try {
      // Simulera nätverksfördröjning
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Simulera lyckad inloggning
      toast.success("Inloggning lyckades!");
      navigate("/dashboard");
    } catch (error) {
      toast.error("Inloggning misslyckades");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="glass-card w-full max-w-md p-8 rounded-xl animate-fadeIn">
      <h2 className="text-2xl font-medium text-center mb-8">Logga in</h2>
      
      <form onSubmit={handleLogin} className="space-y-5">
        <div className="relative">
          <EmailIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <Input
            type="email"
            placeholder="Email"
            className="pl-10 h-12 bg-black/20 border-gray-700 input-glow"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        
        <div className="relative">
          <LockIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <Input
            type={showPassword ? "text" : "password"}
            placeholder="Lösenord"
            className="pl-10 pr-10 h-12 bg-black/20 border-gray-700 input-glow"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="button"
            onClick={toggleShowPassword}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-300 focus:outline-none"
          >
            {showPassword ? <EyeOffIcon /> : <EyeIcon />}
          </button>
        </div>
        
        <Button 
          type="submit" 
          className="w-full h-12 bg-denz-blue hover:bg-denz-dark-blue text-white btn-shine"
          disabled={isLoading}
        >
          {isLoading ? (
            <div className="flex items-center justify-center">
              <div className="h-5 w-5 border-2 border-t-transparent border-white rounded-full animate-spin mr-2"></div>
              Loggar in...
            </div>
          ) : (
            "Logga in"
          )}
        </Button>
      </form>
      
      <div className="mt-6 text-center">
        <a 
          href="#" 
          className="text-sm text-denz-blue hover:text-blue-400 hover-scale inline-block"
        >
          Vill du ha en faktura?
        </a>
      </div>
    </div>
  );
};

export default LoginForm;
