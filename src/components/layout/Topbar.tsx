import { Button } from "@/components/ui/button";
import { useUser } from "@/context/UserContext";
import { useAuth } from "@/hooks/useAuth";
import { Bell, LogOut, Settings } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Topbar = () => {
  const { user } = useUser();
  const { signOut } = useAuth();
  const navigate = useNavigate();
  
  const handleLogout = async () => {
    try {
      await signOut();
      toast.success("Du har loggats ut");
    } catch (error: any) {
      toast.error(error.message || "Utloggning misslyckades");
    }
  };
  
  return (
    <header className="border-b border-border h-16 px-4 md:px-6 flex items-center justify-between bg-white">
      {/* Logo och sidtitel */}
      <div className="flex items-center gap-2">
        <div className="h-8 w-8 rounded-md bg-denz-blue flex items-center justify-center text-white font-semibold text-lg">
          D
        </div>
        <span className="font-medium hidden md:inline">Denz Assetmaster</span>
      </div>
      
      {/* Användarinfo och åtgärder */}
      <div className="flex items-center gap-2 md:gap-4">
        <Button variant="ghost" size="icon" className="text-denz-text-secondary hover:text-denz-text-primary">
          <Bell className="h-5 w-5" />
        </Button>
        
        <Button variant="ghost" size="icon" className="text-denz-text-secondary hover:text-denz-text-primary">
          <Settings className="h-5 w-5" />
        </Button>
        
        <div className="h-8 w-px bg-border mx-1 md:mx-2"></div>
        
        <div className="flex items-center gap-3">
          <div className="text-right hidden md:block">
            <div className="text-sm font-medium">{user?.name || 'Anonym användare'}</div>
            <div className="text-xs text-denz-text-secondary">{user?.role || 'Okänd roll'}</div>
          </div>
          
          <Button variant="ghost" size="icon" onClick={handleLogout} title="Logga ut">
            <LogOut className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Topbar;
