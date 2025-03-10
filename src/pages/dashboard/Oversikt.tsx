
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bell, Users, Car, Package, AlertTriangle, Clock, CheckCircle } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";

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
      return "bg-red-100 text-red-800 border-red-200";
    case "medium":
      return "bg-amber-100 text-amber-800 border-amber-200";
    case "low":
      return "bg-green-100 text-green-800 border-green-200";
    default:
      return "bg-gray-100 text-gray-800 border-gray-200";
  }
};

const getDaysLeftColor = (days: number) => {
  if (days <= 14) return "text-red-600";
  if (days <= 30) return "text-amber-600";
  return "text-green-600";
};

const Oversikt = () => {
  return (
    <div className="animate-fadeIn">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Assetmaster Översikt</h1>
        <Tooltip>
          <TooltipTrigger asChild>
            <button className="relative p-2 rounded-full bg-white shadow hover:bg-gray-50 transition-colors">
              <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] text-white">3</span>
              <Bell size={20} className="text-gray-600" />
            </button>
          </TooltipTrigger>
          <TooltipContent>
            <p>3 nya notifikationer</p>
          </TooltipContent>
        </Tooltip>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="p-6 shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="p-0 pb-4 flex flex-row items-center justify-between">
            <CardTitle className="text-lg font-medium text-gray-800">Anställda</CardTitle>
            <Users size={20} className="text-blue-500" />
          </CardHeader>
          <CardContent className="p-0 space-y-4">
            <div className="text-gray-600">
              <span className="font-medium">5</span> aktiva certifikat
              <div className="mt-2 space-y-2">
                <div className="text-sm bg-gray-50 p-2 rounded-md">
                  <div className="flex justify-between">
                    <span className="font-medium">Certifikat</span>
                    <span>Utgår</span>
                  </div>
                  {certificates.slice(0, 2).map((cert, index) => (
                    <div key={index} className="flex justify-between mt-2">
                      <span>{cert.name} - {cert.employee}</span>
                      <span className={getDaysLeftColor(cert.daysLeft)}>{cert.daysLeft} dagar</span>
                    </div>
                  ))}
                  <button className="w-full mt-2 text-xs text-blue-600 hover:text-blue-800">Visa alla certifikat</button>
                </div>
              </div>
            </div>
            <button className="text-sm text-blue-600 hover:text-blue-800 hover:underline font-medium">Hantera anställda</button>
          </CardContent>
        </Card>
        
        <Card className="p-6 shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="p-0 pb-4 flex flex-row items-center justify-between">
            <CardTitle className="text-lg font-medium text-gray-800">Fordon</CardTitle>
            <Car size={20} className="text-green-500" />
          </CardHeader>
          <CardContent className="p-0 space-y-4">
            <div className="text-gray-600">
              <span className="font-medium">2</span> under service
              <div className="mt-2 space-y-2">
                <div className="text-sm bg-gray-50 p-2 rounded-md">
                  {vehicles.map((vehicle, index) => (
                    <div key={index} className="flex justify-between items-center mt-2 first:mt-0">
                      <span>{vehicle.name} ({vehicle.regNumber})</span>
                      <div className="flex items-center">
                        <Clock size={14} className="mr-1 text-blue-500" />
                        <span>{vehicle.hoursLeft}h</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <button className="text-sm text-blue-600 hover:text-blue-800 hover:underline font-medium">Schemalägg service</button>
          </CardContent>
        </Card>
        
        <Card className="p-6 shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="p-0 pb-4 flex flex-row items-center justify-between">
            <CardTitle className="text-lg font-medium text-gray-800">Tillgångar</CardTitle>
            <Package size={20} className="text-purple-500" />
          </CardHeader>
          <CardContent className="p-0 space-y-4">
            <div className="text-3xl font-semibold text-orange-500">23</div>
            <div className="text-gray-600 flex items-center">
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-amber-500 h-2.5 rounded-full" style={{ width: "78%" }}></div>
              </div>
              <span className="ml-2 text-amber-600 font-medium">18</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Utcheckade</span>
              <span className="text-gray-500">78%</span>
            </div>
            <div className="flex space-x-2">
              <button className="text-sm text-blue-600 hover:text-blue-800 hover:underline font-medium">Hantera tillgångar</button>
              <span className="text-gray-300">|</span>
              <button className="text-sm text-blue-600 hover:text-blue-800 hover:underline font-medium">Checka ut</button>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-medium text-gray-800">Senaste aktiviteter</h2>
          <div className="flex space-x-2">
            <button className="px-3 py-1 text-sm bg-white border border-gray-200 rounded-md hover:bg-gray-50 transition-colors">Filter</button>
            <button className="px-3 py-1 text-sm bg-white border border-gray-200 rounded-md hover:bg-gray-50 transition-colors">Sök</button>
          </div>
        </div>
        <Card className="shadow-sm divide-y">
          {activities.map((activity, index) => (
            <div key={index} className="p-6 hover:bg-gray-50 transition-colors">
              <div className="flex justify-between">
                <div>
                  <div className="flex items-center">
                    <h3 className="font-medium text-gray-800">{activity.title}</h3>
                    {activity.priority && (
                      <Badge className={`ml-2 ${getPriorityColor(activity.priority)}`} variant="outline">
                        {activity.priority === "high" ? "Hög" : activity.priority === "medium" ? "Medium" : "Låg"}
                      </Badge>
                    )}
                  </div>
                  <p className="text-gray-600 mt-1">{activity.description}</p>
                </div>
                <div className="text-right">
                  <p className="text-gray-500">{activity.date}{activity.timestamp && `, ${activity.timestamp}`}</p>
                  <div className="mt-2">
                    {activity.title.includes("Certifikat") && (
                      <button className="text-xs bg-blue-50 text-blue-700 hover:bg-blue-100 px-2 py-1 rounded transition-colors">
                        Förnya
                      </button>
                    )}
                    {activity.title.includes("Fordon") && (
                      <button className="text-xs bg-green-50 text-green-700 hover:bg-green-100 px-2 py-1 rounded transition-colors">
                        Detaljer
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Card>
      </div>
      
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 border border-blue-100">
        <div className="flex items-start">
          <AlertTriangle size={20} className="text-amber-500 mt-1 mr-2 flex-shrink-0" />
          <div>
            <h3 className="font-medium text-gray-800">Kommande händelser</h3>
            <p className="text-sm text-gray-600 mt-1">
              2 certifikat närmar sig utgångsdatum och behöver förnyas inom de kommande 30 dagarna.
            </p>
            <button className="mt-2 text-sm text-blue-600 hover:text-blue-800 hover:underline font-medium">
              Visa detaljer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Oversikt;
