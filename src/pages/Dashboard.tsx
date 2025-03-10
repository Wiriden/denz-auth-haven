
import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import Logo from "@/components/auth/Logo";

const Dashboard = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    document.title = "Denz | Dashboard";
    
    // Välkomstmeddelande
    toast.success("Välkommen till Denz!");
  }, []);
  
  const handleLogout = () => {
    // Här skulle verklig utloggningsfunktion finnas
    toast.info("Du har loggats ut");
    navigate("/");
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-denz-darker to-denz-darkest">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-12">
          <Logo />
          <Button 
            onClick={handleLogout}
            variant="outline" 
            className="border-gray-700 hover:bg-denz-card-bg"
          >
            Logga ut
          </Button>
        </div>
        
        <div className="glass-card p-8 rounded-xl">
          <h1 className="text-3xl font-bold mb-6 text-center">Välkommen till Denz Assetmaster</h1>
          <p className="text-gray-400 text-center mb-8">
            Detta är en demosida för inloggade användare. Använd navigeringen för att utforska systemet.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div 
                key={item} 
                className="bg-black/20 border border-gray-800 rounded-lg p-6 hover:border-denz-blue transition-all duration-300"
              >
                <h3 className="text-xl font-medium mb-3">Feature {item}</h3>
                <p className="text-gray-400">
                  Beskrivning av funktionalitet och användningsområde skulle visas här.
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
