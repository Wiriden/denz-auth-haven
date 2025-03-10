
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Search, Filter, Plus, ChevronLeft, ChevronRight, Award } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

type Employee = {
  name: string;
  role: string;
  department: string;
  certificates: number;
  status: "active" | "inactive" | "onLeave";
};

const employeeData: Employee[] = [
  { name: "Johan Berg", role: "Servicetekniker", department: "Service", certificates: 2, status: "active" },
  { name: "Anna Lindberg", role: "Projektledare", department: "Projekt", certificates: 1, status: "active" },
  { name: "Maria Svensson", role: "Ingenjör", department: "Teknik", certificates: 1, status: "active" },
  { name: "Erik Johansson", role: "Montör", department: "Produktion", certificates: 1, status: "onLeave" },
  { name: "Sofia Björk", role: "Servicetekniker", department: "Service", certificates: 1, status: "active" },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "active":
      return "bg-emerald-100 text-emerald-700 border-emerald-200";
    case "inactive":
      return "bg-slate-100 text-slate-700 border-slate-200";
    case "onLeave":
      return "bg-amber-100 text-amber-700 border-amber-200";
    default:
      return "bg-slate-100 text-slate-700 border-slate-200";
  }
};

const getStatusText = (status: string) => {
  switch (status) {
    case "active":
      return "Aktiv";
    case "inactive":
      return "Inaktiv";
    case "onLeave":
      return "Tjänstledig";
    default:
      return status;
  }
};

const Anstallda = () => {
  return (
    <div className="animate-fadeIn space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Anställda</h1>
          <p className="text-slate-500 mt-1">Hantera personal och certifikat</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700 gap-1.5">
          <Plus size={16} />
          Lägg till anställd
        </Button>
      </div>
      
      <div className="flex gap-4 mb-6">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={18} />
          <Input className="pl-10 border-slate-200" placeholder="Sök efter anställd" />
        </div>
        <Button variant="outline" className="flex gap-2 border-slate-200">
          <Filter size={18} />
          Filter
        </Button>
      </div>
      
      <Card className="shadow-sm overflow-hidden border-slate-200">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 text-left border-b border-slate-200">
                <th className="px-6 py-3 text-slate-600 font-medium">Namn</th>
                <th className="px-6 py-3 text-slate-600 font-medium">Roll</th>
                <th className="px-6 py-3 text-slate-600 font-medium">Avdelning</th>
                <th className="px-6 py-3 text-slate-600 font-medium text-center">Certifikat</th>
                <th className="px-6 py-3 text-slate-600 font-medium">Status</th>
                <th className="px-6 py-3 text-slate-600 font-medium">Åtgärder</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {employeeData.map((employee, index) => (
                <tr key={index} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-slate-800">{employee.name}</td>
                  <td className="px-6 py-4 text-slate-600">{employee.role}</td>
                  <td className="px-6 py-4 text-slate-600">{employee.department}</td>
                  <td className="px-6 py-4 text-center">
                    {employee.certificates > 0 ? (
                      <div className="flex items-center justify-center gap-1">
                        <Award size={14} className="text-blue-500" />
                        <span className="font-medium">{employee.certificates}</span>
                      </div>
                    ) : (
                      <span>-</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <Badge 
                      variant="outline" 
                      className={`px-2 py-0.5 rounded-full text-xs ${getStatusColor(employee.status)}`}
                    >
                      {getStatusText(employee.status)}
                    </Badge>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="sm" className="h-8 text-blue-600 hover:text-blue-700 hover:bg-blue-50">Visa</Button>
                      <Button variant="ghost" size="sm" className="h-8 text-blue-600 hover:text-blue-700 hover:bg-blue-50">Redigera</Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
      
      <div className="flex justify-between items-center text-sm text-slate-600">
        <div>Visar 1-5 av 5 anställda</div>
        <div className="flex space-x-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="border-slate-200 text-slate-600"
            disabled
          >
            <ChevronLeft size={16} className="mr-1" />
            Föregående
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="border-slate-200 text-slate-600"
            disabled
          >
            Nästa
            <ChevronRight size={16} className="ml-1" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Anstallda;
