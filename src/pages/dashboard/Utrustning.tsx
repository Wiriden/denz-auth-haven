
import React from "react";
import { Card } from "@/components/ui/card";
import { Hammer, Search, Filter, Plus, CheckCircle, XCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

type Tool = {
  id: string;
  name: string;
  category: string;
  assignedTo: string | null;
  lastChecked: string;
  status: "available" | "checked-out" | "maintenance" | "lost";
};

const toolsData: Tool[] = [
  { id: "VE-001", name: "Borrmaskin", category: "Verktyg", assignedTo: "Johan Berg", lastChecked: "2023-10-05", status: "checked-out" },
  { id: "VE-002", name: "Skruvdragare", category: "Verktyg", assignedTo: "Anna Karlsson", lastChecked: "2023-10-12", status: "checked-out" },
  { id: "VE-003", name: "Multimeter", category: "Verktyg", assignedTo: null, lastChecked: "2023-10-15", status: "available" },
  { id: "VE-004", name: "Hammare", category: "Verktyg", assignedTo: "Erik Holm", lastChecked: "2023-09-28", status: "checked-out" },
  { id: "VE-005", name: "Slipmaskin", category: "Verktyg", assignedTo: null, lastChecked: "2023-10-01", status: "maintenance" },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "available":
      return "bg-green-100 text-green-800";
    case "checked-out":
      return "bg-amber-100 text-amber-800";
    case "maintenance":
      return "bg-blue-100 text-blue-800";
    case "lost":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const getStatusText = (status: string) => {
  switch (status) {
    case "available":
      return "Tillgänglig";
    case "checked-out":
      return "Utcheckad";
    case "maintenance":
      return "Underhåll";
    case "lost":
      return "Förlorad";
    default:
      return status;
  }
};

const Utrustning = () => {
  return (
    <div className="animate-fadeIn">
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center">
          <Hammer size={24} className="text-blue-500 mr-2" />
          <h1 className="text-2xl font-bold text-gray-800">Verktyg</h1>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="flex gap-2">
            <CheckCircle size={16} />
            Checka in
          </Button>
          <Button variant="outline" className="flex gap-2">
            <XCircle size={16} />
            Checka ut
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus size={16} className="mr-1" />
            Lägg till verktyg
          </Button>
        </div>
      </div>
      
      <div className="flex gap-4 mb-6">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <Input className="pl-10" placeholder="Sök efter verktyg" />
        </div>
        <Button variant="outline" className="flex gap-2">
          <Filter size={18} />
          Filter
        </Button>
      </div>
      
      <div className="grid grid-cols-4 gap-4 mb-6">
        <Card className="p-4 flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600">Totalt verktyg</p>
            <p className="text-2xl font-semibold">23</p>
          </div>
          <Hammer size={24} className="text-gray-400" />
        </Card>
        <Card className="p-4 flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600">Tillgängliga</p>
            <p className="text-2xl font-semibold text-green-600">5</p>
          </div>
          <CheckCircle size={24} className="text-green-400" />
        </Card>
        <Card className="p-4 flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600">Utcheckade</p>
            <p className="text-2xl font-semibold text-amber-600">18</p>
          </div>
          <XCircle size={24} className="text-amber-400" />
        </Card>
        <Card className="p-4 flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600">Under underhåll</p>
            <p className="text-2xl font-semibold text-blue-600">0</p>
          </div>
          <div className="rounded-full bg-gray-100 p-1">
            <Hammer size={22} className="text-blue-400" />
          </div>
        </Card>
      </div>
      
      <Card className="shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 text-left">
                <th className="px-6 py-3 text-gray-600 font-medium">ID</th>
                <th className="px-6 py-3 text-gray-600 font-medium">Namn</th>
                <th className="px-6 py-3 text-gray-600 font-medium">Kategori</th>
                <th className="px-6 py-3 text-gray-600 font-medium">Tilldelad till</th>
                <th className="px-6 py-3 text-gray-600 font-medium">Senast kontrollerad</th>
                <th className="px-6 py-3 text-gray-600 font-medium">Status</th>
                <th className="px-6 py-3 text-gray-600 font-medium">Åtgärder</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {toolsData.map((item, index) => (
                <tr key={index} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-gray-800">{item.id}</td>
                  <td className="px-6 py-4 text-gray-800">{item.name}</td>
                  <td className="px-6 py-4">
                    <Badge variant="outline" className="font-normal">
                      {item.category}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 text-gray-600">{item.assignedTo || "—"}</td>
                  <td className="px-6 py-4 text-gray-600">{item.lastChecked}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(item.status)}`}>
                      {getStatusText(item.status)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-800 font-medium text-sm">Visa</button>
                      <span className="text-gray-300">|</span>
                      <button className="text-blue-600 hover:text-blue-800 font-medium text-sm">Redigera</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
      
      <div className="mt-6 flex justify-between items-center text-sm text-gray-600">
        <div>Visar 1-5 av 23 verktyg</div>
        <div className="flex space-x-2">
          <button className="px-3 py-1 bg-white border border-gray-200 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed" disabled>Föregående</button>
          <button className="px-3 py-1 bg-white border border-gray-200 rounded-md hover:bg-gray-50">Nästa</button>
        </div>
      </div>
    </div>
  );
};

export default Utrustning;
