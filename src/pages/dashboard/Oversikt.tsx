
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
          <p className="text-denz-gray-400 mt-1">En överblick över system, tillgångar och certifikat</p>
        </div>
        
        <div className="flex items-center gap-3">
          <Button variant="outline" className="gap-2 text-white border-denz-gray-700 hover:bg-denz-gray-800 hover:text-denz-blue">
            <BarChart4 size={16} />
            Rapporter
          </Button>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" size="icon" className="relative text-white border-denz-gray-700 hover:bg-denz-gray-800">
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-denz-danger text-[10px] text-white">3</span>
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
        <Card className="shadow-card hover:shadow-card-hover transition-shadow bg-denz-dark border-denz-gray-700 overflow-hidden">
          <CardHeader className="pb-4 flex flex-row items-center justify-between border-b border-denz-gray-700 card-gradient-blue">
            <div className="space-y-0.5">
              <CardTitle className="text-white">Anställda</CardTitle>
              <p className="text-sm text-denz-gray-300">Certifikatstatus</p>
            </div>
            <div className="bg-denz-blue p-2 rounded-full shadow-glow">
              <Users size={20} className="text-white" />
            </div>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-denz-gray-300 text-sm font-medium">Aktiva certifikat</span>
                <Badge variant="outline" className="bg-denz-blue/20 text-denz-blue border-denz-blue/40">5</Badge>
              </div>
              <div className="space-y-3 mt-3">
                {certificates.slice(0, 3).map((cert, index) => (
                  <div key={index} className="flex justify-between items-center p-2 bg-black/20 rounded-md border border-denz-gray-700">
                    <div className="flex items-center gap-2">
                      <Award size={16} className="text-denz-blue" />
                      <div>
                        <div className="font-medium text-white">{cert.name}</div>
                        <div className="text-xs text-denz-gray-400">{cert.employee}</div>
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
                  <Button variant="ghost" size="sm" className="w-full text-denz-blue hover:text-denz-blue hover:bg-denz-blue/10 justify-between">
                    <span>Visa alla certifikat</span>
                    <ChevronRight size={16} />
                  </Button>
                )}
              </div>
            </div>
            <div className="pt-2 border-t border-denz-gray-700">
              <Button variant="outline" className="w-full text-denz-blue border-denz-blue/30 hover:bg-denz-blue/10 hover:text-denz-blue">
                Hantera anställda
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <Card className="shadow-card hover:shadow-card-hover transition-shadow bg-denz-dark border-denz-gray-700 overflow-hidden">
          <CardHeader className="pb-4 flex flex-row items-center justify-between border-b border-denz-gray-700 card-gradient-green">
            <div className="space-y-0.5">
              <CardTitle className="text-white">Verktyg</CardTitle>
              <p className="text-sm text-denz-gray-300">Underhållstatus</p>
            </div>
            <div className="bg-denz-success p-2 rounded-full shadow-glow">
              <Hammer size={20} className="text-white" />
            </div>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-denz-gray-300 text-sm font-medium">Under underhåll</span>
                <Badge variant="outline" className="bg-denz-success/20 text-denz-success border-denz-success/40">2</Badge>
              </div>
              <div className="space-y-3 mt-3">
                {tools.map((tool, index) => (
                  <div key={index} className="flex justify-between items-center p-2 bg-black/20 rounded-md border border-denz-gray-700">
                    <div>
                      <div className="font-medium text-white">{tool.name}</div>
                      <div className="text-xs text-denz-gray-400">{tool.serialNumber}</div>
                    </div>
                    {getTimeLeftIndicator(tool.hoursLeft)}
                  </div>
                ))}
              </div>
            </div>
            <div className="pt-2 border-t border-denz-gray-700">
              <Button variant="outline" className="w-full text-denz-success border-denz-success/30 hover:bg-denz-success/10 hover:text-denz-success">
                Schemalägg underhåll
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <Card className="shadow-card hover:shadow-card-hover transition-shadow bg-denz-dark border-denz-gray-700 overflow-hidden">
          <CardHeader className="pb-4 flex flex-row items-center justify-between border-b border-denz-gray-700 card-gradient-purple">
            <div className="space-y-0.5">
              <CardTitle className="text-white">Skyddsutrustning</CardTitle>
              <p className="text-sm text-denz-gray-300">Användningsstatus</p>
            </div>
            <div className="bg-denz-purple p-2 rounded-full shadow-glow">
              <Shield size={20} className="text-white" />
            </div>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-denz-gray-300 text-sm font-medium">Total skyddsutrustning</span>
                <span className="text-2xl font-bold text-denz-purple">23</span>
              </div>
              
              <div className="mt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-denz-gray-300">Utcheckade</span>
                  <span className="font-medium text-denz-warning">18 (78%)</span>
                </div>
                <Progress 
                  value={78} 
                  className="h-2.5 bg-black/40" 
                  indicatorClassName="bg-gradient-to-r from-denz-warning/70 to-denz-warning" 
                />
                
                <div className="flex justify-between text-sm mt-3">
                  <span className="text-denz-gray-300">Tillgängliga</span>
                  <span className="font-medium text-denz-success">5 (22%)</span>
                </div>
                <Progress 
                  value={22} 
                  className="h-2.5 bg-black/40" 
                  indicatorClassName="bg-gradient-to-r from-denz-success/70 to-denz-success" 
                />
              </div>
            </div>
            <div className="pt-2 border-t border-denz-gray-700 flex gap-2">
              <Button variant="outline" className="flex-1 text-denz-purple border-denz-purple/30 hover:bg-denz-purple/10 hover:text-denz-purple">
                Hantera
              </Button>
              <Button className="flex-1 bg-denz-purple hover:bg-denz-purple/90 text-white">
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
            <Button variant="outline" size="sm" className="gap-1 text-denz-gray-300 border-denz-gray-700 hover:bg-denz-gray-800">
              <Filter size={14} />
              Filter
            </Button>
            <Button variant="outline" size="sm" className="gap-1 text-denz-gray-300 border-denz-gray-700 hover:bg-denz-gray-800">
              <Search size={14} />
              Sök
            </Button>
          </div>
        </div>
        <Card className="shadow-card divide-y divide-denz-gray-700 border-denz-gray-700 bg-denz-dark">
          {activities.map((activity, index) => (
            <div key={index} className="p-4 hover:bg-black/20 transition-colors">
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
                  <p className="text-denz-gray-400 mt-1 text-sm">{activity.description}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-denz-gray-500 font-medium">{activity.date}{activity.timestamp && `, ${activity.timestamp}`}</p>
                  <div className="mt-2">
                    {activity.title.includes("Certifikat") && (
                      <Button size="sm" className="bg-denz-blue hover:bg-denz-blue/90 h-7 rounded-md text-xs px-2">
                        Förnya
                      </Button>
                    )}
                    {activity.title.includes("Verktyg") && (
                      <Button size="sm" className="bg-denz-success hover:bg-denz-success/90 h-7 rounded-md text-xs px-2">
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
      
      <Card className="shadow-card border-denz-warning/30 bg-gradient-to-r from-denz-warning/5 to-denz-warning/10 backdrop-blur-sm">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <div className="bg-denz-warning/20 border border-denz-warning/30 p-2 rounded-full shadow-glow flex-shrink-0">
              <AlertTriangle size={20} className="text-denz-warning" />
            </div>
            <div>
              <h3 className="font-medium text-white">Kommande händelser</h3>
              <p className="text-sm text-denz-gray-300 mt-1">
                2 certifikat närmar sig utgångsdatum och behöver förnyas inom de kommande 30 dagarna.
              </p>
              <Button variant="outline" size="sm" className="mt-2 text-denz-warning border-denz-warning/30 hover:bg-denz-warning/10 hover:text-denz-warning">
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
