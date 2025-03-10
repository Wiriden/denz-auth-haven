import { cn } from "@/lib/utils";
import {
    Box,
    ChevronLeft,
    ChevronRight,
    Folder,
    LayoutDashboard,
    Package2,
    PieChart,
    Settings,
    Users
} from "lucide-react";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

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
  const [expanded, setExpanded] = useState(true);
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
          "bg-white h-full transition-all duration-300 overflow-hidden flex flex-col border-r border-denz-border",
          isExpanded ? "w-64" : "w-16"
        )}
      >
        {/* Toggle button */}
        <button 
          className={cn(
            "absolute top-4 -right-3 z-10 bg-white p-1 rounded-full text-denz-text-secondary border border-denz-border shadow-sm hover:bg-denz-gray-50",
            !isExpanded && "rotate-180"
          )}
          onClick={() => setExpanded(!expanded)}
        >
          {isExpanded ? <ChevronLeft size={14} /> : <ChevronRight size={14} />}
        </button>
        
        {/* Sidebar header */}
        <div className="h-16 flex items-center px-4 border-b border-denz-border">
          {isExpanded ? (
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-md bg-denz-blue flex items-center justify-center text-white font-bold">
                D
              </div>
              <span className="ml-3 text-base font-medium text-denz-text-primary">Assetmaster</span>
            </div>
          ) : (
            <div className="w-8 h-8 rounded-md bg-denz-blue flex items-center justify-center text-white font-bold">
              D
            </div>
          )}
        </div>
        
        {/* Sidebar content */}
        <div className="py-3 flex flex-col flex-1 overflow-y-auto">
          {sidebarItems.map((item) => (
            <div key={item.title} className="mb-1">
              {isExpanded ? (
                <div className="px-4 py-2">
                  <div className="text-xs font-medium uppercase tracking-wider text-denz-text-secondary">
                    Navigation
                  </div>
                </div>
              ) : null}
              
              {/* Sub-items */}
              {item.subItems?.map((subItem) => {
                const isActive = location.pathname === subItem.path;
                
                // Choose icon based on the path
                let SubItemIcon = PieChart;
                if (subItem.path.includes('anstallda')) SubItemIcon = Users;
                if (subItem.path.includes('utrustning')) SubItemIcon = Box;
                if (subItem.path.includes('administration')) SubItemIcon = Folder;
                if (subItem.path.includes('oversikt')) SubItemIcon = LayoutDashboard;
                
                return (
                  <div
                    key={subItem.title}
                    className={cn(
                      "flex items-center px-4 py-2 cursor-pointer transition-colors duration-150 mx-2 rounded-md",
                      isActive 
                        ? "bg-denz-blue/10 text-denz-blue font-medium" 
                        : "text-denz-text-secondary hover:bg-denz-gray-100 hover:text-denz-text-primary"
                    )}
                    onClick={() => navigate(subItem.path)}
                  >
                    <SubItemIcon size={isExpanded ? 16 : 20} className={cn(!isExpanded && "mx-auto")} />
                    {isExpanded && (
                      <span className="ml-3 text-sm">{subItem.title}</span>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
        
        {/* Sidebar footer */}
        <div className="px-4 py-3 border-t border-denz-border">
          {isExpanded ? (
            <div 
              className="flex items-center text-denz-text-secondary hover:text-denz-text-primary cursor-pointer px-2 py-2 rounded-md hover:bg-denz-gray-100 transition-colors duration-150"
              onClick={() => navigate('/dashboard/administration')}
            >
              <Settings size={16} />
              <span className="ml-3 text-sm">Inställningar</span>
            </div>
          ) : (
            <div 
              className="flex justify-center text-denz-text-secondary hover:text-denz-text-primary cursor-pointer p-2 rounded-md hover:bg-denz-gray-100 transition-colors duration-150"
              onClick={() => navigate('/dashboard/administration')}
            >
              <Settings size={20} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
