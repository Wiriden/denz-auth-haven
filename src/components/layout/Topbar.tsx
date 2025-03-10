
import React from "react";
import { UserCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

// In a real app, this would come from auth context
const mockUser = {
  name: "Johan Andersson",
  role: "Admin"
};

const Topbar = () => {
  return (
    <div className="h-16 bg-[#1E293B] border-b border-[#334155] px-6 flex items-center justify-end">
      <div className="flex items-center gap-3">
        <div className="text-right">
          <div className="text-sm font-medium text-white">{mockUser.name}</div>
          <Badge variant="outline" className="bg-[#1E293B] border-[#3B82F6]/30 text-[#3B82F6] text-xs">
            {mockUser.role}
          </Badge>
        </div>
        <div className="flex items-center justify-center bg-[#273347] h-10 w-10 rounded-full">
          <UserCircle className="text-[#94A3B8]" size={24} />
        </div>
      </div>
    </div>
  );
};

export default Topbar;
