
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Users, Hammer, Shield, AlertTriangle, Clock, Calendar,
  ChevronRight, Award, Bell, Filter, Search, BarChart4
} from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

type ActivityItem = {
  title: string;
  description: string;
  timestamp: string;
  date: string;
  priority?: "low" | "medium" | "high";
};

type Certificate = {
  name: string;
  employee: string;
  expiryDate: string;
  daysLeft: number;
};

type Tool = {
  name: string;
  serialNumber: string;
  maintenanceDate: string;
  hoursLeft: number;
};

const activities: ActivityItem[] = [
  {
    title: "Ny anställd registrerad",
    description: "Sofia Björk har lagts till som Servicetekniker",
    timestamp: "10:24",
    date: "idag",
    priority: "low"
  },
  {
    title: "Verktyg incheckad",
    description: "Borrmaskin SN12345 incheckad av Johan Berg",
    timestamp: "15:30",
    date: "igår",
    priority: "low"
  },
  {
    title: "Certifikat utgår snart",
    description: "Truckkort för Johan Berg utgår om 30 dagar",
    timestamp: "",
    date: "2 dagar sedan",
    priority: "medium"
  }
];

const certificates: Certificate[] = [
  { name: "Truckkort", employee: "Johan Berg", expiryDate: "2023-12-15", daysLeft: 30 },
  { name: "Heta arbeten", employee: "Anna Lindberg", expiryDate: "2023-12-01", daysLeft: 16 },
  { name: "Elsäkerhet", employee: "Maria Svensson", expiryDate: "2024-01-10", daysLeft: 56 },
  { name: "Lift", employee: "Erik Johansson", expiryDate: "2024-02-05", daysLeft: 82 },
  { name: "Arbetsmiljö", employee: "Sofia Björk", expiryDate: "2024-03-20", daysLeft: 125 }
];

const tools: Tool[] = [
  { name: "Borrmaskin", serialNumber: "SN12345", maintenanceDate: "2023-11-25", hoursLeft: 24 },
  { name: "Slipmaskin", serialNumber: "SN67890", maintenanceDate: "2023-11-27", hoursLeft: 72 }
];

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "high":
      return "bg-denz-danger/20 text-denz-danger border-denz-danger/20";
    case "medium":
      return "bg-denz-warning/20 text-denz-warning border-denz-warning/20";
    case "low":
      return "bg-denz-success/20 text-denz-success border-denz-success/20";
    default:
      return "bg-denz-gray-200/10 text-denz-gray-200 border-denz-gray-300/20";
  }
};

const getDaysLeftColor = (days: number) => {
  if (days <= 14) return "text-denz-danger";
  if (days <= 30) return "text-denz-warning";
  return "text-denz-success";
};

const getTimeLeftIndicator = (hours: number) => {
  const colorClass = hours <= 24 ? "status-danger" : "status-success";
  return (
    <div className={`flex items-center gap-1.5 px-2 py-1 rounded-full border ${colorClass}`}>
      <Clock size={14} />
      <span className="font-medium">{hours}h</span>
    </div>
  );
};

const Oversikt = () => {
  return (
    <div className="animate-fadeIn space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-white">Assetmaster Översikt</h1>
          <p className="text-[#94A3B8] mt-1">En överblick över system, tillgångar och certifikat</p>
        </div>
        
        <div className="flex items-center gap-3">
          <Button variant="outline" className="gap-2 text-white border-[#334155] hover:bg-[#1E293B] hover:text-[#3B82F6]">
            <BarChart4 size={16} />
            Rapporter
          </Button>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" size="icon" className="relative text-white border-[#334155] hover:bg-[#1E293B]">
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#EF4444] text-[10px] text-white">3</span>
                <Bell size={18} />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>3 nya notifikationer</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="shadow-md bg-[#111827] border-[#334155] overflow-hidden">
          <CardHeader className="pb-4 flex flex-row items-center justify-between border-b border-[#334155] bg-gradient-to-r from-[#111827] to-[#1E293B]">
            <div className="space-y-0.5">
              <CardTitle className="text-white">Anställda</CardTitle>
              <p className="text-sm text-[#94A3B8]">Certifikatstatus</p>
            </div>
            <div className="bg-[#3B82F6] p-2 rounded-full">
              <Users size={20} className="text-white" />
            </div>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-[#94A3B8] text-sm font-medium">Aktiva certifikat</span>
                <Badge variant="outline" className="bg-[#3B82F6]/10 text-[#3B82F6] border-[#3B82F6]/20">5</Badge>
              </div>
              <div className="space-y-3 mt-3">
                {certificates.slice(0, 3).map((cert, index) => (
                  <div key={index} className="flex justify-between items-center p-2 bg-[#0F172A] rounded-md border border-[#334155]">
                    <div className="flex items-center gap-2">
                      <Award size={16} className="text-[#3B82F6]" />
                      <div>
                        <div className="font-medium text-white">{cert.name}</div>
                        <div className="text-xs text-[#94A3B8]">{cert.employee}</div>
                      </div>
                    </div>
                    <div className={`flex items-center gap-1.5 px-2 py-1 rounded-full border ${getDaysLeftColor(cert.daysLeft) === "text-denz-danger" ? "status-danger" : 
                      getDaysLeftColor(cert.daysLeft) === "text-denz-warning" ? "status-warning" : "status-success"}`}>
                      <Calendar size={14} />
                      <span className="text-sm font-medium">
                        {cert.daysLeft} dagar
                      </span>
                    </div>
                  </div>
                ))}
                {certificates.length > 3 && (
                  <Button variant="ghost" size="sm" className="w-full text-[#3B82F6] hover:text-[#3B82F6] hover:bg-[#3B82F6]/10 justify-between">
                    <span>Visa alla certifikat</span>
                    <ChevronRight size={16} />
                  </Button>
                )}
              </div>
            </div>
            <div className="pt-2 border-t border-[#334155]">
              <Button variant="outline" className="w-full text-[#3B82F6] border-[#3B82F6]/20 hover:bg-[#3B82F6]/10 hover:text-[#3B82F6]">
                Hantera anställda
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <Card className="shadow-md bg-[#111827] border-[#334155] overflow-hidden">
          <CardHeader className="pb-4 flex flex-row items-center justify-between border-b border-[#334155] bg-gradient-to-r from-[#111827] to-[#1E293B]">
            <div className="space-y-0.5">
              <CardTitle className="text-white">Verktyg</CardTitle>
              <p className="text-sm text-[#94A3B8]">Underhållstatus</p>
            </div>
            <div className="bg-[#16A34A] p-2 rounded-full">
              <Hammer size={20} className="text-white" />
            </div>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-[#94A3B8] text-sm font-medium">Under underhåll</span>
                <Badge variant="outline" className="bg-[#16A34A]/10 text-[#16A34A] border-[#16A34A]/20">2</Badge>
              </div>
              <div className="space-y-3 mt-3">
                {tools.map((tool, index) => (
                  <div key={index} className="flex justify-between items-center p-2 bg-[#0F172A] rounded-md border border-[#334155]">
                    <div>
                      <div className="font-medium text-white">{tool.name}</div>
                      <div className="text-xs text-[#94A3B8]">{tool.serialNumber}</div>
                    </div>
                    {getTimeLeftIndicator(tool.hoursLeft)}
                  </div>
                ))}
              </div>
            </div>
            <div className="pt-2 border-t border-[#334155]">
              <Button variant="outline" className="w-full text-[#16A34A] border-[#16A34A]/20 hover:bg-[#16A34A]/10 hover:text-[#16A34A]">
                Schemalägg underhåll
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <Card className="shadow-md bg-[#111827] border-[#334155] overflow-hidden">
          <CardHeader className="pb-4 flex flex-row items-center justify-between border-b border-[#334155] bg-gradient-to-r from-[#111827] to-[#1E293B]">
            <div className="space-y-0.5">
              <CardTitle className="text-white">Skyddsutrustning</CardTitle>
              <p className="text-sm text-[#94A3B8]">Användningsstatus</p>
            </div>
            <div className="bg-[#8B5CF6] p-2 rounded-full">
              <Shield size={20} className="text-white" />
            </div>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-[#94A3B8] text-sm font-medium">Total skyddsutrustning</span>
                <span className="text-2xl font-bold text-[#8B5CF6]">23</span>
              </div>
              
              <div className="mt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-[#94A3B8]">Utcheckade</span>
                  <span className="font-medium text-[#F59E0B]">18 (78%)</span>
                </div>
                <Progress 
                  value={78} 
                  className="h-2.5 bg-[#0F172A]" 
                  indicatorClassName="bg-[#F59E0B]" 
                />
                
                <div className="flex justify-between text-sm mt-3">
                  <span className="text-[#94A3B8]">Tillgängliga</span>
                  <span className="font-medium text-[#16A34A]">5 (22%)</span>
                </div>
                <Progress 
                  value={22} 
                  className="h-2.5 bg-[#0F172A]" 
                  indicatorClassName="bg-[#16A34A]" 
                />
              </div>
            </div>
            <div className="pt-2 border-t border-[#334155] flex gap-2">
              <Button variant="outline" className="flex-1 text-[#8B5CF6] border-[#8B5CF6]/20 hover:bg-[#8B5CF6]/10 hover:text-[#8B5CF6]">
                Hantera
              </Button>
              <Button className="flex-1 bg-[#8B5CF6] hover:bg-[#8B5CF6]/90 text-white">
                Checka ut
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-white">Senaste aktiviteter</h2>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="gap-1 text-[#94A3B8] border-[#334155] hover:bg-[#1E293B]">
              <Filter size={14} />
              Filter
            </Button>
            <Button variant="outline" size="sm" className="gap-1 text-[#94A3B8] border-[#334155] hover:bg-[#1E293B]">
              <Search size={14} />
              Sök
            </Button>
          </div>
        </div>
        <Card className="shadow-md divide-y divide-[#334155] border-[#334155] bg-[#111827]">
          {activities.map((activity, index) => (
            <div key={index} className="p-4 hover:bg-[#0F172A] transition-colors">
              <div className="flex justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium text-white">{activity.title}</h3>
                    {activity.priority && (
                      <Badge variant="outline" className={`${getPriorityColor(activity.priority)}`}>
                        {activity.priority === "high" ? "Hög" : activity.priority === "medium" ? "Medium" : "Låg"}
                      </Badge>
                    )}
                  </div>
                  <p className="text-[#94A3B8] mt-1 text-sm">{activity.description}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-[#64748B] font-medium">{activity.date}{activity.timestamp && `, ${activity.timestamp}`}</p>
                  <div className="mt-2">
                    {activity.title.includes("Certifikat") && (
                      <Button size="sm" className="bg-[#3B82F6] hover:bg-[#3B82F6]/90 h-7 rounded-md text-xs px-2">
                        Förnya
                      </Button>
                    )}
                    {activity.title.includes("Verktyg") && (
                      <Button size="sm" className="bg-[#16A34A] hover:bg-[#16A34A]/90 h-7 rounded-md text-xs px-2">
                        Detaljer
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Card>
      </div>
      
      <Card className="shadow-md border-[#F59E0B]/20 bg-gradient-to-r from-[#111827] to-[#111827] backdrop-blur-sm">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <div className="bg-[#F59E0B]/10 border border-[#F59E0B]/20 p-2 rounded-full">
              <AlertTriangle size={20} className="text-[#F59E0B]" />
            </div>
            <div>
              <h3 className="font-medium text-white">Kommande händelser</h3>
              <p className="text-sm text-[#94A3B8] mt-1">
                2 certifikat närmar sig utgångsdatum och behöver förnyas inom de kommande 30 dagarna.
              </p>
              <Button variant="outline" size="sm" className="mt-2 text-[#F59E0B] border-[#F59E0B]/20 hover:bg-[#F59E0B]/10 hover:text-[#F59E0B]">
                Visa detaljer
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Oversikt;
