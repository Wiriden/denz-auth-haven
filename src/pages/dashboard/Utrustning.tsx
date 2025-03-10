
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
      return "bg-[#16A34A]/10 text-[#16A34A] border-[#16A34A]/20";
    case "checked-out":
      return "bg-[#F59E0B]/10 text-[#F59E0B] border-[#F59E0B]/20";
    case "maintenance":
      return "bg-[#3B82F6]/10 text-[#3B82F6] border-[#3B82F6]/20";
    case "lost":
      return "bg-[#EF4444]/10 text-[#EF4444] border-[#EF4444]/20";
    default:
      return "bg-[#64748B]/10 text-[#64748B] border-[#64748B]/20";
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
          <Hammer size={24} className="text-[#3B82F6] mr-2" />
          <h1 className="text-2xl font-bold text-white">Verktyg</h1>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="flex gap-2 border-[#334155] text-white hover:bg-[#1E293B]">
            <CheckCircle size={16} />
            Checka in
          </Button>
          <Button variant="outline" className="flex gap-2 border-[#334155] text-white hover:bg-[#1E293B]">
            <XCircle size={16} />
            Checka ut
          </Button>
          <Button className="bg-[#3B82F6] hover:bg-[#3B82F6]/90">
            <Plus size={16} className="mr-1" />
            Lägg till verktyg
          </Button>
        </div>
      </div>
      
      <div className="flex gap-4 mb-6">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#64748B]" size={18} />
          <Input className="pl-10 bg-[#111827] border-[#334155] text-white placeholder:text-[#64748B]" placeholder="Sök efter verktyg" />
        </div>
        <Button variant="outline" className="flex gap-2 border-[#334155] text-[#94A3B8] hover:bg-[#1E293B]">
          <Filter size={18} />
          Filter
        </Button>
      </div>
      
      <div className="grid grid-cols-4 gap-4 mb-6">
        <Card className="p-4 flex items-center justify-between bg-[#111827] border-[#334155]">
          <div>
            <p className="text-sm text-[#94A3B8]">Totalt verktyg</p>
            <p className="text-2xl font-semibold text-white">23</p>
          </div>
          <Hammer size={24} className="text-[#64748B]" />
        </Card>
        <Card className="p-4 flex items-center justify-between bg-[#111827] border-[#334155]">
          <div>
            <p className="text-sm text-[#94A3B8]">Tillgängliga</p>
            <p className="text-2xl font-semibold text-[#16A34A]">5</p>
          </div>
          <CheckCircle size={24} className="text-[#16A34A]" />
        </Card>
        <Card className="p-4 flex items-center justify-between bg-[#111827] border-[#334155]">
          <div>
            <p className="text-sm text-[#94A3B8]">Utcheckade</p>
            <p className="text-2xl font-semibold text-[#F59E0B]">18</p>
          </div>
          <XCircle size={24} className="text-[#F59E0B]" />
        </Card>
        <Card className="p-4 flex items-center justify-between bg-[#111827] border-[#334155]">
          <div>
            <p className="text-sm text-[#94A3B8]">Under underhåll</p>
            <p className="text-2xl font-semibold text-[#3B82F6]">0</p>
          </div>
          <div className="rounded-full bg-[#0F172A] p-1">
            <Hammer size={22} className="text-[#3B82F6]" />
          </div>
        </Card>
      </div>
      
      <Card className="shadow-md overflow-hidden border-[#334155] bg-[#111827]">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[#0F172A] text-left border-b border-[#334155]">
                <th className="px-6 py-3 text-[#94A3B8] font-medium">ID</th>
                <th className="px-6 py-3 text-[#94A3B8] font-medium">Namn</th>
                <th className="px-6 py-3 text-[#94A3B8] font-medium">Kategori</th>
                <th className="px-6 py-3 text-[#94A3B8] font-medium">Tilldelad till</th>
                <th className="px-6 py-3 text-[#94A3B8] font-medium">Senast kontrollerad</th>
                <th className="px-6 py-3 text-[#94A3B8] font-medium">Status</th>
                <th className="px-6 py-3 text-[#94A3B8] font-medium">Åtgärder</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#334155]">
              {toolsData.map((item, index) => (
                <tr key={index} className="hover:bg-[#0F172A] transition-colors">
                  <td className="px-6 py-4 font-medium text-white">{item.id}</td>
                  <td className="px-6 py-4 text-white">{item.name}</td>
                  <td className="px-6 py-4">
                    <Badge variant="outline" className="font-normal bg-[#1E293B] text-[#94A3B8] border-[#334155]">
                      {item.category}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 text-[#94A3B8]">{item.assignedTo || "—"}</td>
                  <td className="px-6 py-4 text-[#94A3B8]">{item.lastChecked}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(item.status)}`}>
                      {getStatusText(item.status)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex space-x-2">
                      <button className="text-[#3B82F6] hover:text-[#3B82F6]/80 font-medium text-sm">Visa</button>
                      <span className="text-[#334155]">|</span>
                      <button className="text-[#3B82F6] hover:text-[#3B82F6]/80 font-medium text-sm">Redigera</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
      
      <div className="mt-6 flex justify-between items-center text-sm text-[#94A3B8]">
        <div>Visar 1-5 av 23 verktyg</div>
        <div className="flex space-x-2">
          <button className="px-3 py-1 bg-[#111827] border border-[#334155] rounded-md hover:bg-[#1E293B] disabled:opacity-50 disabled:cursor-not-allowed" disabled>Föregående</button>
          <button className="px-3 py-1 bg-[#111827] border border-[#334155] rounded-md hover:bg-[#1E293B]">Nästa</button>
        </div>
      </div>
    </div>
  );
};

export default Utrustning;
