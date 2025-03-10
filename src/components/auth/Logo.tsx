
import React from "react";
import { LogoIcon } from "../icons/AuthIcons";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className }) => {
  return (
    <div className={cn("flex flex-col items-center justify-center", className)}>
      <LogoIcon className="text-denz-blue animate-pulse w-12 h-12 mb-2" />
      <h1 className="text-2xl font-bold text-white tracking-wider">DENZ</h1>
    </div>
  );
};

export default Logo;
