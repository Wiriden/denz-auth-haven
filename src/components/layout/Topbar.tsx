
import React from "react";
import { UserCircle, Bell, Settings } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

// In a real app, this would come from auth context
const mockUser = {
  name: "Johan Andersson",
  role: "Admin"
};

const Topbar = () => {
  return (
    <div className="h-16 bg-denz-dark border-b border-denz-gray-700/30 px-6 flex items-center justify-between">
      <div className="text-xl font-semibold text-denz-text-primary">
        Denz Assetmaster
      </div>
      
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="text-denz-text-secondary hover:text-denz-text-primary">
          <Bell size={20} />
        </Button>
        
        <Button variant="ghost" size="icon" className="text-denz-text-secondary hover:text-denz-text-primary">
          <Settings size={20} />
        </Button>
        
        <div className="flex items-center gap-3">
          <div className="text-right">
            <div className="text-sm font-medium text-denz-text-primary">{mockUser.name}</div>
            <Badge variant="outline" className="bg-denz-blue/10 border-denz-blue/30 text-denz-blue text-xs">
              {mockUser.role}
            </Badge>
          </div>
          <div className="flex items-center justify-center bg-denz-darker h-10 w-10 rounded-full border border-denz-gray-700/50">
            <UserCircle className="text-denz-gray-500" size={24} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
