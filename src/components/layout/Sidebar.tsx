
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { 
  Package2, 
  Users, 
  Wrench, 
  Settings, 
  ChevronRight, 
  ChevronLeft,
  LayoutDashboard,
  Shield
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
      { title: "Verktyg", path: "/dashboard/utrustning" },
      { title: "Administration", path: "/dashboard/administration" },
    ],
  },
];

const Sidebar = () => {
  const [expanded, setExpanded] = useState(false);
  const [hovering, setHovering] = useState(false);
  const navigate = useNavigate();
  
  const isExpanded = expanded || hovering;
  
  return (
    <div 
      className="relative flex flex-col h-screen"
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      <div 
        className={cn(
          "bg-[#1E293B] h-full transition-all duration-300 overflow-hidden flex flex-col",
          isExpanded ? "w-60" : "w-16"
        )}
      >
        {/* Toggle button */}
        <button 
          className={cn(
            "absolute top-3 -right-4 z-10 bg-[#1E293B] p-1 rounded-full text-white",
            !isExpanded && "rotate-180"
          )}
          onClick={() => setExpanded(!expanded)}
        >
          {isExpanded ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
        </button>
        
        {/* Sidebar content */}
        <div className="py-4 flex flex-col flex-1">
          {sidebarItems.map((item) => (
            <div key={item.title} className="mb-1">
              <div 
                className="flex items-center px-4 py-3 text-white cursor-pointer hover:bg-[#2D3748]"
                onClick={() => navigate(item.path)}
              >
                <item.icon size={24} className="text-[#3B82F6]" />
                {isExpanded && (
                  <span className="ml-4 font-medium">{item.title}</span>
                )}
              </div>
              
              {/* Sub-items */}
              {isExpanded && item.subItems?.map((subItem) => (
                <div
                  key={subItem.title}
                  className="flex items-center pl-12 pr-4 py-2 text-gray-300 cursor-pointer hover:bg-[#2D3748] hover:text-white"
                  onClick={() => navigate(subItem.path)}
                >
                  <span className="font-light text-sm">{subItem.title}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
