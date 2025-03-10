
import React from "react";
import { Card } from "@/components/ui/card";
import { Users, Search, Filter, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

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
      return "bg-green-100 text-green-800";
    case "inactive":
      return "bg-gray-100 text-gray-800";
    case "onLeave":
      return "bg-amber-100 text-amber-800";
    default:
      return "bg-gray-100 text-gray-800";
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
    <div className="animate-fadeIn">
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center">
          <Users size={24} className="text-blue-500 mr-2" />
          <h1 className="text-2xl font-bold text-gray-800">Anställda</h1>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus size={16} className="mr-1" />
          Lägg till anställd
        </Button>
      </div>
      
      <div className="flex gap-4 mb-6">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <Input className="pl-10" placeholder="Sök efter anställd" />
        </div>
        <Button variant="outline" className="flex gap-2">
          <Filter size={18} />
          Filter
        </Button>
      </div>
      
      <Card className="shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 text-left">
                <th className="px-6 py-3 text-gray-600 font-medium">Namn</th>
                <th className="px-6 py-3 text-gray-600 font-medium">Roll</th>
                <th className="px-6 py-3 text-gray-600 font-medium">Avdelning</th>
                <th className="px-6 py-3 text-gray-600 font-medium">Certifikat</th>
                <th className="px-6 py-3 text-gray-600 font-medium">Status</th>
                <th className="px-6 py-3 text-gray-600 font-medium">Åtgärder</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {employeeData.map((employee, index) => (
                <tr key={index} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-gray-800">{employee.name}</td>
                  <td className="px-6 py-4 text-gray-600">{employee.role}</td>
                  <td className="px-6 py-4 text-gray-600">{employee.department}</td>
                  <td className="px-6 py-4 text-center">{employee.certificates}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(employee.status)}`}>
                      {getStatusText(employee.status)}
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
        <div>Visar 1-5 av 5 anställda</div>
        <div className="flex space-x-2">
          <button className="px-3 py-1 bg-white border border-gray-200 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed" disabled>Föregående</button>
          <button className="px-3 py-1 bg-white border border-gray-200 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed" disabled>Nästa</button>
        </div>
      </div>
    </div>
  );
};

export default Anstallda;
