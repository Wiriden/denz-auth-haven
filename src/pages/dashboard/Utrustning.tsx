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
  { id: "VE-001", name: "Borrmaskin", category: "Material", assignedTo: "Johan Berg", lastChecked: "2023-10-05", status: "checked-out" },
  { id: "VE-002", name: "Skruvdragare", category: "Material", assignedTo: "Anna Karlsson", lastChecked: "2023-10-12", status: "checked-out" },
  { id: "VE-003", name: "Multimeter", category: "Material", assignedTo: null, lastChecked: "2023-10-15", status: "available" },
  { id: "VE-004", name: "Hammare", category: "Material", assignedTo: "Erik Holm", lastChecked: "2023-09-28", status: "checked-out" },
  { id: "VE-005", name: "Slipmaskin", category: "Material", assignedTo: null, lastChecked: "2023-10-01", status: "maintenance" },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "available":
      return "bg-emerald-50 text-emerald-600 border-emerald-200";
    case "checked-out":
      return "bg-sky-50 text-sky-600 border-sky-200";
    case "maintenance":
      return "bg-amber-50 text-amber-600 border-amber-200";
    case "lost":
      return "bg-rose-50 text-rose-600 border-rose-200";
    default:
      return "bg-gray-50 text-gray-600 border-gray-200";
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
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-xl font-medium text-denz-text-primary mb-1 flex items-center">
            <Hammer size={20} className="text-denz-blue mr-2" />
            Material
          </h1>
          <p className="text-sm text-denz-text-secondary">
            Hantera material och utrustning
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="text-sm border-gray-200">
            <CheckCircle size={16} className="mr-1.5" />
            Checka in
          </Button>
          <Button variant="outline" className="text-sm border-gray-200">
            <XCircle size={16} className="mr-1.5" />
            Checka ut
          </Button>
          <Button className="bg-denz-blue hover:bg-denz-dark-blue text-sm">
            <Plus size={16} className="mr-1.5" />
            Lägg till material
          </Button>
        </div>
      </div>
      
      <div className="flex gap-3 mb-5 items-center">
        <div className="relative flex-grow max-w-md">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-denz-text-secondary" />
          <Input
            type="text"
            placeholder="Sök efter material..."
            className="pl-9 py-2 h-9 bg-white text-sm teamgantt-search"
          />
        </div>
        <Button variant="outline" size="sm" className="h-9 border-gray-200 text-denz-text-secondary">
          <Filter size={16} className="mr-1.5" />
          Filter
        </Button>
      </div>
      
      <div className="grid grid-cols-4 gap-4 mb-6">
        <Card className="p-4 bg-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-denz-text-secondary">Totalt material</p>
              <p className="text-2xl font-semibold text-denz-text-primary">23</p>
            </div>
            <Hammer size={24} className="text-denz-blue/20" />
          </div>
        </Card>
        <Card className="p-4 bg-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-denz-text-secondary">Tillgängliga</p>
              <p className="text-2xl font-semibold text-emerald-600">5</p>
            </div>
            <CheckCircle size={24} className="text-emerald-600/20" />
          </div>
        </Card>
        <Card className="p-4 bg-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-denz-text-secondary">Utcheckade</p>
              <p className="text-2xl font-semibold text-amber-600">18</p>
            </div>
            <XCircle size={24} className="text-amber-600/20" />
          </div>
        </Card>
        <Card className="p-4 bg-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-denz-text-secondary">Under underhåll</p>
              <p className="text-2xl font-semibold text-sky-600">0</p>
            </div>
            <Hammer size={24} className="text-sky-600/20" />
          </div>
        </Card>
      </div>
      
      <Card className="bg-white border border-gray-200 rounded-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 tracking-wide">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 tracking-wide">Namn</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 tracking-wide">Kategori</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 tracking-wide">Tilldelad till</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 tracking-wide">Senast kontrollerad</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 tracking-wide">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 tracking-wide">Åtgärder</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {toolsData.map((item, index) => (
                <tr key={index} className="hover:bg-blue-50/50 transition-colors">
                  <td className="px-6 py-4 font-medium text-denz-text-primary">{item.id}</td>
                  <td className="px-6 py-4 text-denz-text-primary">{item.name}</td>
                  <td className="px-6 py-4">
                    <Badge variant="outline" className="bg-gray-50 text-denz-text-secondary border-gray-200">
                      {item.category}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 text-denz-text-secondary">{item.assignedTo || "—"}</td>
                  <td className="px-6 py-4 text-denz-text-secondary">{item.lastChecked}</td>
                  <td className="px-6 py-4">
                    <Badge variant="outline" className={`px-2 py-0.5 ${getStatusColor(item.status)}`}>
                      {getStatusText(item.status)}
                    </Badge>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex space-x-2">
                      <button className="text-denz-blue hover:text-denz-dark-blue font-medium text-sm">Visa</button>
                      <span className="text-gray-300">|</span>
                      <button className="text-denz-blue hover:text-denz-dark-blue font-medium text-sm">Redigera</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
      
      <div className="mt-6 flex justify-between items-center text-sm text-denz-text-secondary">
        <div>Visar 1-5 av 23 verktyg</div>
        <div className="flex space-x-2">
          <Button 
            variant="outline" 
            size="sm"
            className="border-gray-200" 
            disabled
          >
            Föregående
          </Button>
          <Button 
            variant="outline"
            size="sm"
            className="border-gray-200"
          >
            Nästa
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Utrustning;
