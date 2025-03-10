
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Users, Car, Package, AlertTriangle, Clock, Calendar,
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

type Vehicle = {
  name: string;
  regNumber: string;
  serviceEndDate: string;
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
    title: "Fordon incheckad",
    description: "VW Transporter ABC123 incheckad av Johan Berg",
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

const vehicles: Vehicle[] = [
  { name: "VW Transporter", regNumber: "ABC123", serviceEndDate: "2023-11-25", hoursLeft: 24 },
  { name: "Volvo FH16", regNumber: "XYZ789", serviceEndDate: "2023-11-27", hoursLeft: 72 }
];

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "high":
      return "bg-red-100 text-red-700 border-red-200";
    case "medium":
      return "bg-amber-100 text-amber-700 border-amber-200";
    case "low":
      return "bg-emerald-100 text-emerald-700 border-emerald-200";
    default:
      return "bg-slate-100 text-slate-700 border-slate-200";
  }
};

const getDaysLeftColor = (days: number) => {
  if (days <= 14) return "text-red-600";
  if (days <= 30) return "text-amber-600";
  return "text-emerald-600";
};

const getTimeLeftIndicator = (hours: number) => {
  const color = hours <= 24 ? "text-red-600" : "text-emerald-600";
  return (
    <div className="flex items-center gap-1.5">
      <Clock size={14} className={color} />
      <span className={`font-medium ${color}`}>{hours}h</span>
    </div>
  );
};

const Oversikt = () => {
  return (
    <div className="animate-fadeIn space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Assetmaster Översikt</h1>
          <p className="text-slate-500 mt-1">En överblick över system, tillgångar och certifikat</p>
        </div>
        
        <div className="flex items-center gap-3">
          <Button variant="outline" className="gap-2">
            <BarChart4 size={16} />
            Rapporter
          </Button>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" size="icon" className="relative">
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] text-white">3</span>
                <Bell size={18} className="text-slate-600" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>3 nya notifikationer</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="shadow-sm hover:shadow-md transition-shadow overflow-hidden border-slate-200">
          <CardHeader className="pb-4 flex flex-row items-center justify-between bg-gradient-to-r from-blue-50 to-blue-100 border-b border-slate-200">
            <div className="space-y-0.5">
              <CardTitle className="text-slate-800">Anställda</CardTitle>
              <p className="text-sm text-slate-500">Certifikatstatus</p>
            </div>
            <div className="bg-white p-2 rounded-full shadow-sm">
              <Users size={20} className="text-blue-600" />
            </div>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-slate-600 text-sm font-medium">Aktiva certifikat</span>
                <Badge variant="outline" className="bg-blue-50 text-blue-700 hover:bg-blue-100">5</Badge>
              </div>
              <div className="space-y-3 mt-3">
                {certificates.slice(0, 3).map((cert, index) => (
                  <div key={index} className="flex justify-between items-center p-2 bg-slate-50 rounded-md border border-slate-100">
                    <div className="flex items-center gap-2">
                      <Award size={16} className="text-blue-500" />
                      <div>
                        <div className="font-medium text-slate-700">{cert.name}</div>
                        <div className="text-xs text-slate-500">{cert.employee}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Calendar size={14} className={getDaysLeftColor(cert.daysLeft)} />
                      <span className={`text-sm font-medium ${getDaysLeftColor(cert.daysLeft)}`}>
                        {cert.daysLeft} dagar
                      </span>
                    </div>
                  </div>
                ))}
                {certificates.length > 3 && (
                  <Button variant="ghost" size="sm" className="w-full text-blue-600 hover:text-blue-700 justify-between">
                    <span>Visa alla certifikat</span>
                    <ChevronRight size={16} />
                  </Button>
                )}
              </div>
            </div>
            <div className="pt-2 border-t border-slate-100">
              <Button variant="outline" className="w-full text-blue-600 border-blue-200 hover:bg-blue-50 hover:text-blue-700">
                Hantera anställda
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <Card className="shadow-sm hover:shadow-md transition-shadow overflow-hidden border-slate-200">
          <CardHeader className="pb-4 flex flex-row items-center justify-between bg-gradient-to-r from-emerald-50 to-emerald-100 border-b border-slate-200">
            <div className="space-y-0.5">
              <CardTitle className="text-slate-800">Fordon</CardTitle>
              <p className="text-sm text-slate-500">Servicestatus</p>
            </div>
            <div className="bg-white p-2 rounded-full shadow-sm">
              <Car size={20} className="text-emerald-600" />
            </div>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-slate-600 text-sm font-medium">Under service</span>
                <Badge variant="outline" className="bg-emerald-50 text-emerald-700 hover:bg-emerald-100">2</Badge>
              </div>
              <div className="space-y-3 mt-3">
                {vehicles.map((vehicle, index) => (
                  <div key={index} className="flex justify-between items-center p-2 bg-slate-50 rounded-md border border-slate-100">
                    <div>
                      <div className="font-medium text-slate-700">{vehicle.name}</div>
                      <div className="text-xs text-slate-500">{vehicle.regNumber}</div>
                    </div>
                    {getTimeLeftIndicator(vehicle.hoursLeft)}
                  </div>
                ))}
              </div>
            </div>
            <div className="pt-2 border-t border-slate-100">
              <Button variant="outline" className="w-full text-emerald-600 border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700">
                Schemalägg service
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <Card className="shadow-sm hover:shadow-md transition-shadow overflow-hidden border-slate-200">
          <CardHeader className="pb-4 flex flex-row items-center justify-between bg-gradient-to-r from-purple-50 to-purple-100 border-b border-slate-200">
            <div className="space-y-0.5">
              <CardTitle className="text-slate-800">Tillgångar</CardTitle>
              <p className="text-sm text-slate-500">Användningsstatus</p>
            </div>
            <div className="bg-white p-2 rounded-full shadow-sm">
              <Package size={20} className="text-purple-600" />
            </div>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-slate-600 text-sm font-medium">Total tillgångar</span>
                <span className="text-2xl font-bold text-purple-600">23</span>
              </div>
              
              <div className="mt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">Utcheckade</span>
                  <span className="font-medium text-amber-600">18 (78%)</span>
                </div>
                <Progress 
                  value={78} 
                  className="h-2 bg-slate-100" 
                  indicatorClassName="bg-gradient-to-r from-amber-400 to-amber-500" 
                />
                
                <div className="flex justify-between text-sm mt-3">
                  <span className="text-slate-600">Tillgängliga</span>
                  <span className="font-medium text-emerald-600">5 (22%)</span>
                </div>
                <Progress 
                  value={22} 
                  className="h-2 bg-slate-100" 
                  indicatorClassName="bg-gradient-to-r from-emerald-400 to-emerald-500" 
                />
              </div>
            </div>
            <div className="pt-2 border-t border-slate-100 flex gap-2">
              <Button variant="outline" className="flex-1 text-purple-600 border-purple-200 hover:bg-purple-50 hover:text-purple-700">
                Hantera
              </Button>
              <Button className="flex-1 bg-purple-600 hover:bg-purple-700">
                Checka ut
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-slate-800">Senaste aktiviteter</h2>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="gap-1">
              <Filter size={14} />
              Filter
            </Button>
            <Button variant="outline" size="sm" className="gap-1">
              <Search size={14} />
              Sök
            </Button>
          </div>
        </div>
        <Card className="shadow-sm divide-y divide-slate-100 border-slate-200">
          {activities.map((activity, index) => (
            <div key={index} className="p-4 hover:bg-slate-50 transition-colors">
              <div className="flex justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium text-slate-800">{activity.title}</h3>
                    {activity.priority && (
                      <Badge variant="outline" className={`${getPriorityColor(activity.priority)}`}>
                        {activity.priority === "high" ? "Hög" : activity.priority === "medium" ? "Medium" : "Låg"}
                      </Badge>
                    )}
                  </div>
                  <p className="text-slate-600 mt-1 text-sm">{activity.description}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-slate-500 font-medium">{activity.date}{activity.timestamp && `, ${activity.timestamp}`}</p>
                  <div className="mt-2">
                    {activity.title.includes("Certifikat") && (
                      <Button size="sm" className="bg-blue-500 hover:bg-blue-600 h-7 rounded-md text-xs px-2">
                        Förnya
                      </Button>
                    )}
                    {activity.title.includes("Fordon") && (
                      <Button size="sm" className="bg-emerald-500 hover:bg-emerald-600 h-7 rounded-md text-xs px-2">
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
      
      <Card className="shadow-sm border-amber-200 bg-gradient-to-r from-amber-50 to-amber-100">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <div className="bg-white p-2 rounded-full shadow-sm flex-shrink-0">
              <AlertTriangle size={20} className="text-amber-500" />
            </div>
            <div>
              <h3 className="font-medium text-slate-800">Kommande händelser</h3>
              <p className="text-sm text-slate-600 mt-1">
                2 certifikat närmar sig utgångsdatum och behöver förnyas inom de kommande 30 dagarna.
              </p>
              <Button variant="outline" size="sm" className="mt-2 text-amber-600 border-amber-200 hover:bg-amber-50 hover:text-amber-700">
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
