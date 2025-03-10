import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";
import { Bell, Package2, Settings, Shield, Users, Wrench } from "lucide-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Dashboard = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    document.title = "Denz | Dashboard";
  }, []);
  
  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      toast.info("Du har loggats ut");
      navigate("/");
    } catch (error: any) {
      toast.error(error.message);
    }
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-denz-darker to-denz-darkest">
      {/* Topbar */}
      <div className="border-b border-denz-border bg-denz-dark/90 backdrop-blur-md">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Package2 className="h-5 w-5 text-denz-primary" />
            <span className="text-lg font-medium text-denz-text-primary">Denz Assetmaster</span>
          </div>
          
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="text-denz-text-secondary hover:text-denz-text-primary">
              <Bell className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="text-denz-text-secondary hover:text-denz-text-primary">
              <Settings className="h-4 w-4" />
            </Button>
            <div className="flex items-center space-x-3 ml-4">
              <div className="text-right">
                <div className="text-sm font-medium text-denz-text-primary">Johan Andersson</div>
                <Badge variant="outline" className="bg-denz-primary/5 text-denz-primary border-denz-primary/20 text-[11px]">
                  Admin
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-xl font-medium text-denz-text-primary mb-1">Assetmaster Översikt</h1>
          <p className="text-sm text-denz-text-secondary">En överblick över system, tillgångar och certifikat</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {/* Anställda Card */}
          <div className="glass-card p-5">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h2 className="text-base font-medium text-denz-text-primary mb-1">Anställda</h2>
                <p className="text-xs text-denz-text-secondary">Certifikatstatus</p>
              </div>
              <div className="p-2 rounded bg-denz-primary/5">
                <Users className="h-5 w-5 text-denz-primary" />
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 rounded bg-denz-bg-hover">
                <div>
                  <p className="text-sm font-medium text-denz-text-primary">Truckkort</p>
                  <p className="text-xs text-denz-text-secondary">Johan Berg</p>
                </div>
                <Badge variant="outline" className="bg-denz-warning/5 text-denz-warning border-denz-warning/20">
                  30 dagar
                </Badge>
              </div>
              
              <div className="flex items-center justify-between p-3 rounded bg-denz-bg-hover">
                <div>
                  <p className="text-sm font-medium text-denz-text-primary">Heta arbeten</p>
                  <p className="text-xs text-denz-text-secondary">Anna Lindberg</p>
                </div>
                <Badge variant="outline" className="bg-denz-warning/5 text-denz-warning border-denz-warning/20">
                  16 dagar
                </Badge>
              </div>
            </div>

            <Button variant="ghost" className="w-full mt-4 text-denz-text-secondary hover:text-denz-text-primary text-sm">
              Visa alla certifikat
            </Button>
          </div>

          {/* Verktyg Card */}
          <div className="glass-card p-5">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h2 className="text-base font-medium text-denz-text-primary mb-1">Verktyg</h2>
                <p className="text-xs text-denz-text-secondary">Underhållstatus</p>
              </div>
              <div className="p-2 rounded bg-denz-success/5">
                <Wrench className="h-5 w-5 text-denz-success" />
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 rounded bg-denz-bg-hover">
                <div>
                  <p className="text-sm font-medium text-denz-text-primary">Borrmaskin</p>
                  <p className="text-xs text-denz-text-secondary">SN12345</p>
                </div>
                <Badge variant="outline" className="bg-denz-danger/5 text-denz-danger border-denz-danger/20">
                  24h
                </Badge>
              </div>
              
              <div className="flex items-center justify-between p-3 rounded bg-denz-bg-hover">
                <div>
                  <p className="text-sm font-medium text-denz-text-primary">Slipmaskin</p>
                  <p className="text-xs text-denz-text-secondary">SN67890</p>
                </div>
                <Badge variant="outline" className="bg-denz-success/5 text-denz-success border-denz-success/20">
                  72h
                </Badge>
              </div>
            </div>

            <Button variant="ghost" className="w-full mt-4 text-denz-text-secondary hover:text-denz-text-primary text-sm">
              Schemalägg underhåll
            </Button>
          </div>

          {/* Skyddsutrustning Card */}
          <div className="glass-card p-5">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h2 className="text-base font-medium text-denz-text-primary mb-1">Skyddsutrustning</h2>
                <p className="text-xs text-denz-text-secondary">Användningsstatus</p>
              </div>
              <div className="p-2 rounded bg-denz-accent/5">
                <Shield className="h-5 w-5 text-denz-accent" />
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs text-denz-text-secondary">Utcheckade</span>
                  <span className="text-xs text-denz-text-primary">18 (78%)</span>
                </div>
                <div className="progress-bar">
                  <div className="progress-bar-fill bg-denz-warning" style={{ width: '78%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs text-denz-text-secondary">Tillgängliga</span>
                  <span className="text-xs text-denz-text-primary">5 (22%)</span>
                </div>
                <div className="progress-bar">
                  <div className="progress-bar-fill bg-denz-success" style={{ width: '22%' }}></div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 mt-4">
              <Button variant="outline" className="text-sm border-denz-border text-denz-text-secondary hover:text-denz-text-primary">
                Hantera
              </Button>
              <Button className="text-sm bg-denz-accent hover:bg-denz-accent/90">
                Checka ut
              </Button>
            </div>
          </div>
        </div>

        {/* Senaste aktiviteter */}
        <div className="mt-8">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-base font-medium text-denz-text-primary">Senaste aktiviteter</h2>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" className="text-xs border-denz-border text-denz-text-secondary hover:text-denz-text-primary">
                Filter
              </Button>
              <Button variant="outline" size="sm" className="text-xs border-denz-border text-denz-text-secondary hover:text-denz-text-primary">
                Sök
              </Button>
            </div>
          </div>

          <div className="glass-card divide-y divide-denz-border">
            <div className="p-4 flex items-center justify-between hover:bg-denz-bg-hover transition-colors">
              <div>
                <Badge className="bg-denz-success/5 text-denz-success border-denz-success/20 mb-2">Låg</Badge>
                <p className="text-sm font-medium text-denz-text-primary">Ny anställd registrerad</p>
                <p className="text-xs text-denz-text-secondary">Sofia Björk har lagts till som Servicetekniker</p>
              </div>
              <span className="text-xs text-denz-text-secondary">idag, 10:24</span>
            </div>
            
            <div className="p-4 flex items-center justify-between hover:bg-denz-bg-hover transition-colors">
              <div>
                <Badge className="bg-denz-success/5 text-denz-success border-denz-success/20 mb-2">Låg</Badge>
                <p className="text-sm font-medium text-denz-text-primary">Verktyg incheckad</p>
                <p className="text-xs text-denz-text-secondary">Borrmaskin SN12345 har checkats in av Johan</p>
              </div>
              <span className="text-xs text-denz-text-secondary">igår, 15:30</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
