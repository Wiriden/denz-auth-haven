
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { 
  Package2, 
  Users, 
  Box, 
  Settings, 
  ChevronRight, 
  ChevronLeft,
  LayoutDashboard,
  Shield,
  Folder
} from "lucide-react";

type SidebarItem = {
  title: string;
  icon: React.ElementType;
  path: string;
  subItems?: { title: string; path: string }[];
};

const sidebarItems: SidebarItem[] = [
  {
    title: "Assetmaster",
    icon: Package2,
    path: "/dashboard/oversikt",
    subItems: [
      { title: "Översikt", path: "/dashboard/oversikt" },
      { title: "Anställda", path: "/dashboard/anstallda" },
      { title: "Material", path: "/dashboard/utrustning" },
      { title: "Administration", path: "/dashboard/administration" },
    ],
  },
];

const Sidebar = () => {
  const [expanded, setExpanded] = useState(false);
  const [hovering, setHovering] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  
  const isExpanded = expanded || hovering;
  
  return (
    <div 
      className="relative flex flex-col h-screen"
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      <div 
        className={cn(
          "bg-denz-darker h-full transition-all duration-300 overflow-hidden flex flex-col",
          isExpanded ? "w-64" : "w-16"
        )}
      >
        {/* Toggle button */}
        <button 
          className={cn(
            "absolute top-3 -right-4 z-10 bg-denz-dark p-1 rounded-full text-denz-text-secondary border border-denz-gray-700/30",
            !isExpanded && "rotate-180"
          )}
          onClick={() => setExpanded(!expanded)}
        >
          {isExpanded ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
        </button>
        
        {/* Sidebar header */}
        <div className="h-16 flex items-center px-4 border-b border-denz-gray-700/30">
          {isExpanded ? (
            <span className="text-lg font-semibold text-denz-text-primary">Denz</span>
          ) : (
            <div className="w-8 h-8 rounded-md bg-denz-blue flex items-center justify-center text-white font-bold">
              D
            </div>
          )}
        </div>
        
        {/* Sidebar content */}
        <div className="py-4 flex flex-col flex-1">
          {sidebarItems.map((item) => (
            <div key={item.title} className="mb-1">
              <div 
                className="flex items-center px-4 py-3 text-denz-text-primary cursor-pointer hover:bg-denz-dark"
                onClick={() => navigate(item.path)}
              >
                <item.icon size={20} className="text-denz-text-secondary" />
                {isExpanded && (
                  <span className="ml-4 font-medium">{item.title}</span>
                )}
              </div>
              
              {/* Sub-items */}
              {isExpanded && item.subItems?.map((subItem) => {
                const isActive = location.pathname === subItem.path;
                
                // Choose icon based on the path
                let SubItemIcon = LayoutDashboard;
                if (subItem.path.includes('anstallda')) SubItemIcon = Users;
                if (subItem.path.includes('utrustning')) SubItemIcon = Box;
                if (subItem.path.includes('administration')) SubItemIcon = Folder;
                
                return (
                  <div
                    key={subItem.title}
                    className={cn(
                      "flex items-center pl-12 pr-4 py-2 cursor-pointer",
                      isActive 
                        ? "bg-denz-blue/10 text-denz-blue" 
                        : "text-denz-text-secondary hover:bg-denz-dark hover:text-denz-text-primary"
                    )}
                    onClick={() => navigate(subItem.path)}
                  >
                    <SubItemIcon size={16} className="mr-2" />
                    <span className="font-light text-sm">{subItem.title}</span>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
