
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
    <div className="min-h-screen bg-gradient-to-b from-[#1A1F2C] to-[#111827]">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-12">
          <div className="flex flex-col">
            <span className="text-2xl font-bold text-white">Denz</span>
            <span className="text-sm text-gray-400">Assetmaster</span>
          </div>
          
          <Button 
            onClick={handleLogout}
            variant="outline" 
            className="border-gray-600 hover:bg-gray-800 text-gray-200"
          >
            Logga ut
          </Button>
        </div>
        
        <div className="glass-card p-8 rounded-xl bg-[#1E2235]/80 border-gray-700">
          <h1 className="text-3xl font-bold mb-6 text-center text-gray-100">Välkommen till Denz Assetmaster</h1>
          <p className="text-gray-300 text-center mb-8">
            Detta är en demosida för inloggade användare. Använd navigeringen för att utforska systemet.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div 
                key={item} 
                className="bg-[#111827]/60 border border-gray-700 rounded-lg p-6 hover:border-[#3B82F6] transition-all duration-300"
              >
                <h3 className="text-xl font-medium mb-3 text-gray-200">Feature {item}</h3>
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
