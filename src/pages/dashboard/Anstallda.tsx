import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Users, Search, Filter, Plus, Award, UserCheck, UserMinus, UserX, Bed,
  Shield, BadgeCheck, Hammer } from "lucide-react";
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
      return "bg-emerald-50 text-emerald-600 border-emerald-200";
    case "inactive":
      return "bg-gray-50 text-gray-600 border-gray-200";
    case "sick":
      return "bg-rose-50 text-rose-600 border-rose-200";
    case "vacation":
      return "bg-amber-50 text-amber-600 border-amber-200";
    default:
      return "bg-gray-50 text-gray-600 border-gray-200";
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
    <div className="animate-fadeIn">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-xl font-medium text-denz-text-primary mb-1 flex items-center">
            <Users size={20} className="text-denz-blue mr-2" />
            Anställdhantering
          </h1>
          <p className="text-sm text-denz-text-secondary">
            Hantera personal och certifikat
          </p>
        </div>
        <Button className="bg-denz-blue hover:bg-denz-dark-blue text-sm">
          <Plus size={16} className="mr-1.5" />
          Lägg till anställd
        </Button>
      </div>
      
      <div className="flex gap-3 mb-5 items-center">
        <div className="relative flex-grow max-w-md">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-denz-text-secondary" />
          <Input
            className="pl-9 py-2 h-9 bg-white text-sm teamgantt-search"
            placeholder="Sök anställd..."
          />
        </div>
        <Button variant="outline" size="sm" className="h-9 border-gray-200 text-denz-text-secondary">
          <Filter size={16} className="mr-1.5" />
          Fler filter
        </Button>
      </div>
      
      <Card className="bg-white border border-gray-200 rounded-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 tracking-wide">Namn</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 tracking-wide">Roll</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 tracking-wide">Avdelning</th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-600 tracking-wide">Certifikat</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 tracking-wide">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 tracking-wide">Åtgärder</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {employeeData.map((employee) => (
                <tr key={employee.id} className="hover:bg-blue-50/50 transition-colors cursor-pointer" onClick={() => handleEmployeeClick(employee)}>
                  <td className="px-6 py-4 font-medium text-denz-text-primary">{employee.name}</td>
                  <td className="px-6 py-4 text-denz-text-secondary">{employee.role}</td>
                  <td className="px-6 py-4 text-denz-text-secondary">{employee.department}</td>
                  <td className="px-6 py-4 text-center">
                    {employee.certificates.length > 0 ? (
                      <div className="flex items-center justify-center gap-1">
                        <Award size={14} className="text-denz-blue" />
                        <span className="font-medium text-denz-text-primary">{employee.certificates.length}</span>
                      </div>
                    ) : (
                      <span className="text-denz-text-secondary">-</span>
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
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-8 text-denz-blue hover:text-denz-dark-blue hover:bg-blue-50"
                    >
                      Redigera
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
      
      <div className="mt-6 flex justify-between items-center text-sm text-denz-text-secondary">
        <div>Visar 1-5 av 5 anställda</div>
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
            disabled
          >
            Nästa
          </Button>
        </div>
      </div>

      {/* Employee Detail Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="bg-white border-gray-200 max-w-3xl">
          <DialogHeader>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <DialogTitle className="text-xl text-denz-text-primary">{selectedEmployee?.name}</DialogTitle>
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
                className="border-gray-200 text-denz-text-secondary hover:bg-gray-50"
                onClick={() => setDialogOpen(false)}
              >
                Tillbaka
              </Button>
            </div>
            <DialogDescription className="text-denz-text-secondary">
              {selectedEmployee?.role} - {selectedEmployee?.department}
            </DialogDescription>
          </DialogHeader>

          <Tabs defaultValue="info" className="mt-4">
            <TabsList className="mb-4 bg-gray-50">
              <TabsTrigger value="info" className="data-[state=active]:bg-gray-100 data-[state=active]:text-denz-text-primary">Grundläggande info</TabsTrigger>
              <TabsTrigger value="certs" className="data-[state=active]:bg-gray-100 data-[state=active]:text-denz-text-primary">Behörigheter & certifikat</TabsTrigger>
              <TabsTrigger value="materials" className="data-[state=active]:bg-gray-100 data-[state=active]:text-denz-text-primary">Tilldelat material</TabsTrigger>
            </TabsList>

            <TabsContent value="info" className="space-y-4">
              <Card className="bg-white border border-gray-200">
                
                <div className="p-6">
                  <h3 className="text-lg font-medium mb-4 text-denz-text-primary">Personlig information</h3>
                  <div className="grid grid-cols-2 gap-y-4 gap-x-6">
                    <div>
                      <p className="text-sm text-denz-text-secondary">Namn</p>
                      <p className="font-medium text-denz-text-primary">{selectedEmployee?.name}</p>
                    </div>
                    <div>
                      <p className="text-sm text-denz-text-secondary">Roll</p>
                      <p className="font-medium text-denz-text-primary">{selectedEmployee?.role}</p>
                    </div>
                    <div>
                      <p className="text-sm text-denz-text-secondary">E-post/Telefon</p>
                      <p className="font-medium text-denz-text-primary">{selectedEmployee?.contact || "Ej angivet"}</p>
                    </div>
                    <div>
                      <p className="text-sm text-denz-text-secondary">Avdelning</p>
                      <p className="font-medium text-denz-text-primary">{selectedEmployee?.department}</p>
                    </div>
                    <div>
                      <p className="text-sm text-denz-text-secondary">Anställningsdatum</p>
                      <p className="font-medium text-denz-text-primary">{selectedEmployee?.hireDate || "Ej angivet"}</p>
                    </div>
                    <div>
                      <p className="text-sm text-denz-text-secondary">Status</p>
                      <Badge 
                        variant="outline" 
                        className={`mt-1 px-2 py-0.5 rounded-full text-xs flex items-center gap-1 ${selectedEmployee ? getStatusColor(selectedEmployee.status) : ""}`}
                      >
                        {selectedEmployee && getStatusIcon(selectedEmployee.status)}
                        {selectedEmployee && getStatusText(selectedEmployee.status)}
                      </Badge>
                    </div>
                  </div>
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="certs" className="space-y-4">
              <Card className="bg-white border border-gray-200">
                
                <div className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-medium text-denz-text-primary">Behörigheter & certifikat</h3>
                    <Button size="sm" className="bg-denz-blue hover:bg-denz-dark-blue text-sm flex items-center gap-1">
                      <Plus size={16} />
                      Lägg till certifikat
                    </Button>
                  </div>
                  
                  {selectedEmployee?.certificates && selectedEmployee.certificates.length > 0 ? (
                    <div className="space-y-3">
                      {selectedEmployee.certificates.map((cert, index) => (
                        <div key={index} className="flex justify-between items-center border border-gray-200 p-3 rounded-md bg-gray-50">
                          <div className="flex items-center gap-2">
                            <BadgeCheck size={18} className="text-denz-blue" />
                            <div>
                              <p className="font-medium text-denz-text-primary">{cert.name}</p>
                              <p className="text-sm text-denz-text-secondary">Utgår: {cert.expiryDate}</p>
                            </div>
                          </div>
                          <Button variant="outline" size="sm" className="text-denz-blue border-gray-200 hover:bg-blue-50">Förnya</Button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-6 text-denz-text-secondary">
                      Inga certifikat registrerade
                    </div>
                  )}
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="materials" className="space-y-4">
              <Card className="bg-white border border-gray-200">
                
                <div className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-medium text-denz-text-primary">Tilldelat material</h3>
                    <Button size="sm" className="bg-denz-blue hover:bg-denz-dark-blue text-sm flex items-center gap-1">
                      <Plus size={16} />
                      Tilldela material
                    </Button>
                  </div>
                  
                  {selectedEmployee?.assignedItems && selectedEmployee.assignedItems.length > 0 ? (
                    <div className="space-y-3">
                      {selectedEmployee.assignedItems.map((item, index) => (
                        <div key={index} className="flex justify-between items-center border border-gray-200 p-3 rounded-md bg-gray-50">
                          <div className="flex items-center gap-2">
                            {item.type === "tool" ? 
                              <Hammer size={18} className="text-denz-blue" /> : 
                              <Shield size={18} className="text-denz-purple" />
                            }
                            <div>
                              <p className="font-medium text-denz-text-primary">{item.name}</p>
                              <p className="text-sm text-denz-text-secondary">ID: {item.id} • Tilldelad: {item.assignedDate}</p>
                            </div>
                          </div>
                          <Button variant="outline" size="sm" className="border-gray-200 hover:bg-gray-50 text-denz-text-primary">Återlämna</Button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-6 text-denz-text-secondary">
                      Inget material tilldelat
                    </div>
                  )}

                  {/* History section */}
                  {selectedEmployee?.historyItems && selectedEmployee.historyItems.length > 0 && (
                    <>
                      <h4 className="text-md font-medium mt-6 mb-3 text-denz-text-primary">Historik</h4>
                      <div className="space-y-3">
                        {selectedEmployee.historyItems.map((item, index) => (
                          <div key={index} className="flex justify-between items-center border border-gray-200 bg-gray-50/50 p-3 rounded-md">
                            <div className="flex items-center gap-2">
                              {item.type === "tool" ? 
                                <Hammer size={18} className="text-gray-500" /> : 
                                <Shield size={18} className="text-gray-500" />
                              }
                              <div>
                                <p className="font-medium text-denz-text-secondary">{item.name}</p>
                                <p className="text-sm text-denz-text-secondary">
                                  ID: {item.id} • {item.assignedDate} - {item.returnDate}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Anstallda;
