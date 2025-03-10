
import React from "react";
import { Card } from "@/components/ui/card";
import { Bell } from "lucide-react";

type ActivityItem = {
  title: string;
  description: string;
  timestamp: string;
  date: string;
};

const activities: ActivityItem[] = [
  {
    title: "Ny anställd registrerad",
    description: "Sofia Björk har lagts till som Servicetekniker",
    timestamp: "10:24",
    date: "idag"
  },
  {
    title: "Fordon incheckad",
    description: "VW Transporter ABC123 incheckad av Johan Berg",
    timestamp: "15:30",
    date: "igår"
  },
  {
    title: "Certifikat utgår snart",
    description: "Truckkort för Johan Berg utgår om 30 dagar",
    timestamp: "",
    date: "2 dagar sedan"
  }
];

const Oversikt = () => {
  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Assetmaster Översikt</h1>
        <button className="p-2 rounded-full bg-white shadow">
          <Bell size={20} className="text-gray-600" />
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="p-6 shadow-sm">
          <h2 className="text-lg font-medium text-gray-800 mb-4">Anställda</h2>
          <div className="space-y-4">
            <div className="text-gray-600">5 aktiva certifikat</div>
          </div>
        </Card>
        
        <Card className="p-6 shadow-sm">
          <h2 className="text-lg font-medium text-gray-800 mb-4">Fordon</h2>
          <div className="space-y-4">
            <div className="text-gray-600">2 under service</div>
          </div>
        </Card>
        
        <Card className="p-6 shadow-sm">
          <h2 className="text-lg font-medium text-gray-800 mb-4">Tillgångar</h2>
          <div className="space-y-4">
            <div className="text-3xl font-semibold text-orange-500">23</div>
            <div className="text-gray-600">18 utcheckade</div>
          </div>
        </Card>
      </div>
      
      <div className="mb-8">
        <h2 className="text-xl font-medium text-gray-800 mb-4">Senaste aktiviteter</h2>
        <Card className="shadow-sm divide-y">
          {activities.map((activity, index) => (
            <div key={index} className="p-6">
              <div className="flex justify-between">
                <div>
                  <h3 className="font-medium text-gray-800">{activity.title}</h3>
                  <p className="text-gray-600 mt-1">{activity.description}</p>
                </div>
                <div className="text-right text-gray-500">
                  <p>{activity.date}{activity.timestamp && `, ${activity.timestamp}`}</p>
                </div>
              </div>
            </div>
          ))}
        </Card>
      </div>
    </div>
  );
};

export default Oversikt;
