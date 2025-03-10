
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { 
  Users, Search, Filter, Plus, ChevronLeft, ChevronRight, 
  Award, X, UserCheck, UserMinus, UserX, Bed,
  Shield, BadgeCheck, Hammer
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

type Employee = {
  id: number;
  name: string;
  role: string;
  department: string;
  contact: string;
  hireDate?: string;
  certificates: { name: string; expiryDate: string }[];
  status: "active" | "inactive" | "sick" | "vacation";
  assignedItems: AssignedItem[];
  historyItems: AssignedItem[];
};

type AssignedItem = {
  id: string;
  name: string;
  type: "tool" | "safety";
  assignedDate: string;
  returnDate?: string;
};

const employeeData: Employee[] = [
  { 
    id: 1,
    name: "Johan Berg", 
    role: "Servicetekniker", 
    department: "Service", 
    contact: "070-123-4567",
    hireDate: "2021-06-15",
    certificates: [
      { name: "Truckkort", expiryDate: "2023-12-15" },
      { name: "Heta arbeten", expiryDate: "2024-02-20" }
    ],
    status: "active",
    assignedItems: [
      { id: "T001", name: "Skruvdragare", type: "tool", assignedDate: "2023-05-10" },
      { id: "S001", name: "Skyddshjälm", type: "safety", assignedDate: "2023-01-15" }
    ],
    historyItems: [
      { id: "T002", name: "Vinkelslip", type: "tool", assignedDate: "2022-03-10", returnDate: "2022-10-15" }
    ]
  },
  { 
    id: 2,
    name: "Anna Karlsson", 
    role: "Projektledare", 
    department: "Projekt", 
    contact: "anna.k@example.com",
    hireDate: "2020-01-10",
    certificates: [
      { name: "Arbetsmiljö", expiryDate: "2024-05-20" }
    ],
    status: "active",
    assignedItems: [
      { id: "T003", name: "Laptop", type: "tool", assignedDate: "2022-08-12" }
    ],
    historyItems: []
  },
  { 
    id: 3,
    name: "Erik Holm", 
    role: "Elektriker", 
    department: "Installation", 
    contact: "erik.h@example.com",
    hireDate: "2022-05-15",
    certificates: [
      { name: "Elsäkerhet", expiryDate: "2024-01-10" }
    ],
    status: "active",
    assignedItems: [
      { id: "T005", name: "Multimeter", type: "tool", assignedDate: "2022-06-01" },
      { id: "S003", name: "Skyddshandskar", type: "safety", assignedDate: "2022-05-20" }
    ],
    historyItems: []
  },
  { 
    id: 4,
    name: "Maria Lindberg", 
    role: "Byggledare", 
    department: "Bygg", 
    contact: "maria.l@example.com",
    hireDate: "2019-08-01",
    certificates: [],
    status: "inactive",
    assignedItems: [],
    historyItems: [
      { id: "T008", name: "Hammare", type: "tool", assignedDate: "2020-02-10", returnDate: "2021-11-05" },
      { id: "S005", name: "Skyddsskor", type: "safety", assignedDate: "2019-09-01", returnDate: "2021-11-05" }
    ]
  },
  { 
    id: 5,
    name: "Sofia Björk", 
    role: "Servicetekniker", 
    department: "Service", 
    contact: "070-987-6543",
    hireDate: "2022-02-15",
    certificates: [
      { name: "Lift", expiryDate: "2024-02-05" }
    ],
    status: "sick",
    assignedItems: [
      { id: "T010", name: "Mutterdragare", type: "tool", assignedDate: "2022-03-10" },
      { id: "S007", name: "Hörselskydd", type: "safety", assignedDate: "2022-02-20" }
    ],
    historyItems: []
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "active":
      return "bg-emerald-100 text-emerald-700 border-emerald-200";
    case "inactive":
      return "bg-slate-100 text-slate-700 border-slate-200";
    case "sick":
      return "bg-red-100 text-red-700 border-red-200";
    case "vacation":
      return "bg-amber-100 text-amber-700 border-amber-200";
    default:
      return "bg-slate-100 text-slate-700 border-slate-200";
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case "active":
      return <UserCheck size={14} />;
    case "inactive":
      return <UserX size={14} />;
    case "sick":
      return <UserMinus size={14} />;
    case "vacation":
      return <Bed size={14} />;
    default:
      return <UserCheck size={14} />;
  }
};

const getStatusText = (status: string) => {
  switch (status) {
    case "active":
      return "Aktiv";
    case "inactive":
      return "Inaktiv";
    case "sick":
      return "Sjuk";
    case "vacation":
      return "Ledig";
    default:
      return status;
  }
};

const Anstallda = () => {
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleEmployeeClick = (employee: Employee) => {
    setSelectedEmployee(employee);
    setDialogOpen(true);
  };

  return (
    <div className="animate-fadeIn space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Anställdhantering</h1>
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
          <Input className="pl-10 border-slate-200" placeholder="Sök anställd..." />
        </div>
        <Button variant="outline" className="flex gap-2 border-slate-200">
          <Filter size={18} />
          Fler filter
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
                <th className="px-6 py-3 text-slate-600 font-medium">Kontakt</th>
                <th className="px-6 py-3 text-slate-600 font-medium text-center">Certifikat</th>
                <th className="px-6 py-3 text-slate-600 font-medium">Status</th>
                <th className="px-6 py-3 text-slate-600 font-medium">Åtgärder</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {employeeData.map((employee) => (
                <tr key={employee.id} className="hover:bg-slate-50 transition-colors cursor-pointer" onClick={() => handleEmployeeClick(employee)}>
                  <td className="px-6 py-4 font-medium text-slate-800">{employee.name}</td>
                  <td className="px-6 py-4 text-slate-600">{employee.role}</td>
                  <td className="px-6 py-4 text-slate-600">{employee.department}</td>
                  <td className="px-6 py-4 text-slate-600">{employee.contact}</td>
                  <td className="px-6 py-4 text-center">
                    {employee.certificates.length > 0 ? (
                      <div className="flex items-center justify-center gap-1">
                        <Award size={14} className="text-blue-500" />
                        <span className="font-medium">{employee.certificates.length}</span>
                      </div>
                    ) : (
                      <span>-</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <Badge 
                      variant="outline" 
                      className={`px-2 py-0.5 rounded-full text-xs flex items-center gap-1 ${getStatusColor(employee.status)}`}
                    >
                      {getStatusIcon(employee.status)}
                      {getStatusText(employee.status)}
                    </Badge>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="sm" className="h-8 text-blue-600 hover:text-blue-700 hover:bg-blue-50">
                        Redigera
                      </Button>
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

      {/* Employee Detail Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-3xl">
          <DialogHeader>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <DialogTitle className="text-xl">{selectedEmployee?.name}</DialogTitle>
                {selectedEmployee && (
                  <Badge 
                    variant="outline" 
                    className={`px-2 py-0.5 rounded-full text-xs flex items-center gap-1 ${getStatusColor(selectedEmployee.status)}`}
                  >
                    {getStatusIcon(selectedEmployee.status)}
                    {getStatusText(selectedEmployee.status)}
                  </Badge>
                )}
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                className="border-slate-200 text-slate-600"
                onClick={() => setDialogOpen(false)}
              >
                Tillbaka
              </Button>
            </div>
            <DialogDescription className="text-slate-500">
              {selectedEmployee?.role} - {selectedEmployee?.department}
            </DialogDescription>
          </DialogHeader>

          <Tabs defaultValue="info" className="mt-4">
            <TabsList className="mb-4">
              <TabsTrigger value="info">Grundläggande info</TabsTrigger>
              <TabsTrigger value="certs">Behörigheter & certifikat</TabsTrigger>
              <TabsTrigger value="materials">Tilldelat material</TabsTrigger>
            </TabsList>

            <TabsContent value="info" className="space-y-4">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-medium mb-4">Personlig information</h3>
                  <div className="grid grid-cols-2 gap-y-4 gap-x-6">
                    <div>
                      <p className="text-sm text-slate-500">Namn</p>
                      <p className="font-medium">{selectedEmployee?.name}</p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-500">Roll</p>
                      <p className="font-medium">{selectedEmployee?.role}</p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-500">E-post/Telefon</p>
                      <p className="font-medium">{selectedEmployee?.contact || "Ej angivet"}</p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-500">Avdelning</p>
                      <p className="font-medium">{selectedEmployee?.department}</p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-500">Anställningsdatum</p>
                      <p className="font-medium">{selectedEmployee?.hireDate || "Ej angivet"}</p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-500">Status</p>
                      <Badge 
                        variant="outline" 
                        className={`mt-1 px-2 py-0.5 rounded-full text-xs flex items-center gap-1 ${selectedEmployee ? getStatusColor(selectedEmployee.status) : ""}`}
                      >
                        {selectedEmployee && getStatusIcon(selectedEmployee.status)}
                        {selectedEmployee && getStatusText(selectedEmployee.status)}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="certs" className="space-y-4">
              <Card>
                <CardContent className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-medium">Behörigheter & certifikat</h3>
                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700 flex items-center gap-1">
                      <Plus size={16} />
                      Lägg till certifikat
                    </Button>
                  </div>
                  
                  {selectedEmployee?.certificates && selectedEmployee.certificates.length > 0 ? (
                    <div className="space-y-3">
                      {selectedEmployee.certificates.map((cert, index) => (
                        <div key={index} className="flex justify-between items-center border p-3 rounded-md">
                          <div className="flex items-center gap-2">
                            <BadgeCheck size={18} className="text-blue-500" />
                            <div>
                              <p className="font-medium">{cert.name}</p>
                              <p className="text-sm text-slate-500">Utgår: {cert.expiryDate}</p>
                            </div>
                          </div>
                          <Button variant="outline" size="sm">Förnya</Button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-6 text-slate-500">
                      Inga certifikat registrerade
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="materials" className="space-y-4">
              <Card>
                <CardContent className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-medium">Tilldelat material</h3>
                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700 flex items-center gap-1">
                      <Plus size={16} />
                      Tilldela material
                    </Button>
                  </div>
                  
                  {selectedEmployee?.assignedItems && selectedEmployee.assignedItems.length > 0 ? (
                    <div className="space-y-3">
                      {selectedEmployee.assignedItems.map((item, index) => (
                        <div key={index} className="flex justify-between items-center border p-3 rounded-md">
                          <div className="flex items-center gap-2">
                            {item.type === "tool" ? 
                              <Hammer size={18} className="text-blue-500" /> : 
                              <Shield size={18} className="text-purple-500" />
                            }
                            <div>
                              <p className="font-medium">{item.name}</p>
                              <p className="text-sm text-slate-500">ID: {item.id} • Tilldelad: {item.assignedDate}</p>
                            </div>
                          </div>
                          <Button variant="outline" size="sm">Återlämna</Button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-6 text-slate-500">
                      Inget material tilldelat
                    </div>
                  )}

                  {/* History section */}
                  {selectedEmployee?.historyItems && selectedEmployee.historyItems.length > 0 && (
                    <>
                      <h4 className="text-md font-medium mt-6 mb-3">Historik</h4>
                      <div className="space-y-3">
                        {selectedEmployee.historyItems.map((item, index) => (
                          <div key={index} className="flex justify-between items-center border border-slate-200 bg-slate-50 p-3 rounded-md">
                            <div className="flex items-center gap-2">
                              {item.type === "tool" ? 
                                <Hammer size={18} className="text-slate-400" /> : 
                                <Shield size={18} className="text-slate-400" />
                              }
                              <div>
                                <p className="font-medium text-slate-700">{item.name}</p>
                                <p className="text-sm text-slate-500">
                                  ID: {item.id} • {item.assignedDate} - {item.returnDate}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Anstallda;
