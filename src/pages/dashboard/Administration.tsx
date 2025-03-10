
import React, { useState } from "react";
import { 
  Folder, 
  Search, 
  Filter, 
  Plus,
  Pencil,
  Trash2,
  ArrowLeft,
  FileText,
  Package
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock data for categories
type Category = {
  id: string;
  name: string;
  description: string;
  itemCount: number;
};

type Item = {
  id: string;
  name: string;
  description: string;
  status: "available" | "in-use" | "maintenance";
  serialNumber?: string;
  purchaseDate?: string;
};

const initialCategories: Category[] = [
  { id: "KA-001", name: "Elektronik", description: "Elektroniska verktyg och utrustning", itemCount: 15 },
  { id: "KA-002", name: "Handverktyg", description: "Manuella verktyg för diverse uppgifter", itemCount: 23 },
  { id: "KA-003", name: "Skyddsutrustning", description: "Skyddskläder och säkerhetsutrustning", itemCount: 8 },
  { id: "KA-004", name: "Mätutrustning", description: "Verktyg för mätning och kalibrering", itemCount: 12 },
  { id: "KA-005", name: "Trädgård", description: "Utrustning för trädgårdsarbete", itemCount: 6 },
];

// Mock data for category items
const mockItems: Record<string, Item[]> = {
  "KA-001": [
    { id: "E-001", name: "Laptop Dell XPS", description: "Laptop för utvecklare", status: "in-use", serialNumber: "DL-123456", purchaseDate: "2022-05-15" },
    { id: "E-002", name: "iPhone 13", description: "Smarttelefon för testning", status: "available", serialNumber: "IP-789012", purchaseDate: "2022-02-10" },
    { id: "E-003", name: "Monitor LG 27\"", description: "Extern skärm", status: "available", serialNumber: "LG-345678", purchaseDate: "2021-11-20" },
    { id: "E-004", name: "Logitech MX Keys", description: "Trådlöst tangentbord", status: "in-use", serialNumber: "LG-901234", purchaseDate: "2022-01-05" },
    { id: "E-005", name: "MacBook Pro", description: "Laptop för designers", status: "maintenance", serialNumber: "AP-567890", purchaseDate: "2021-08-15" },
  ],
  "KA-002": [
    { id: "H-001", name: "Skruvmejselset", description: "Komplett set med olika storlekar", status: "available" },
    { id: "H-002", name: "Hammare", description: "Standard hammare", status: "in-use" },
    { id: "H-003", name: "Skiftnyckel", description: "Justerbar skiftnyckel", status: "available" },
    { id: "H-004", name: "Måttband", description: "5 meters måttband", status: "in-use" },
    { id: "H-005", name: "Borr", description: "Sladdlös borrmaskin", status: "maintenance" },
  ],
  "KA-003": [
    { id: "S-001", name: "Skyddshjälm", description: "Standard skyddshjälm", status: "available" },
    { id: "S-002", name: "Skyddsglasögon", description: "Klarplast skyddsglasögon", status: "available" },
    { id: "S-003", name: "Arbetshandskar", description: "Kraftiga läderhandskar", status: "in-use" },
  ],
  "KA-004": [
    { id: "M-001", name: "Digital multimeter", description: "För elektriska mätningar", status: "available" },
    { id: "M-002", name: "Lasermätare", description: "För avståndsmätning", status: "in-use" },
    { id: "M-003", name: "Termometer", description: "Digital termometer", status: "available" },
  ],
  "KA-005": [
    { id: "T-001", name: "Grästrimmer", description: "Batteridriven trimmer", status: "maintenance" },
    { id: "T-002", name: "Sekatör", description: "För beskärning av buskar", status: "available" },
  ],
};

const getStatusColor = (status: Item["status"]) => {
  switch (status) {
    case "available":
      return "bg-green-500/10 text-green-500 border-green-500/30";
    case "in-use":
      return "bg-blue-500/10 text-blue-500 border-blue-500/30";
    case "maintenance":
      return "bg-amber-500/10 text-amber-500 border-amber-500/30";
    default:
      return "bg-gray-500/10 text-gray-500 border-gray-500/30";
  }
};

const getStatusLabel = (status: Item["status"]) => {
  switch (status) {
    case "available":
      return "Tillgänglig";
    case "in-use":
      return "I användning";
    case "maintenance":
      return "Underhåll";
    default:
      return "Okänd";
  }
};

const Administration = () => {
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentCategory, setCurrentCategory] = useState<Category | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [itemSearchQuery, setItemSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<string>("list");
  const [newCategory, setNewCategory] = useState({
    name: "",
    description: ""
  });

  // Filter categories based on search query
  const filteredCategories = categories.filter(category => 
    category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    category.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Get items for the selected category and filter by search query
  const categoryItems = selectedCategory 
    ? (mockItems[selectedCategory.id] || []).filter(item => 
        item.name.toLowerCase().includes(itemSearchQuery.toLowerCase()) || 
        (item.description && item.description.toLowerCase().includes(itemSearchQuery.toLowerCase())) ||
        (item.serialNumber && item.serialNumber.toLowerCase().includes(itemSearchQuery.toLowerCase()))
      )
    : [];

  // Handle opening the edit dialog
  const handleEditCategory = (category: Category) => {
    setCurrentCategory(category);
    setNewCategory({
      name: category.name,
      description: category.description
    });
    setIsEditDialogOpen(true);
  };

  // Handle opening the delete dialog
  const handleDeleteCategory = (category: Category) => {
    setCurrentCategory(category);
    setIsDeleteDialogOpen(true);
  };

  // Handle saving a new category
  const handleSaveNewCategory = () => {
    if (!newCategory.name.trim()) {
      toast.error("Kategorinamn är obligatoriskt");
      return;
    }

    const newId = `KA-${String(categories.length + 1).padStart(3, '0')}`;
    
    setCategories([
      ...categories,
      {
        id: newId,
        name: newCategory.name,
        description: newCategory.description,
        itemCount: 0
      }
    ]);
    
    setNewCategory({ name: "", description: "" });
    setIsAddDialogOpen(false);
    toast.success("Kategori har lagts till");
  };

  // Handle updating an existing category
  const handleUpdateCategory = () => {
    if (!currentCategory || !newCategory.name.trim()) {
      toast.error("Kategorinamn är obligatoriskt");
      return;
    }

    setCategories(categories.map(category => 
      category.id === currentCategory.id 
        ? { 
            ...category, 
            name: newCategory.name, 
            description: newCategory.description 
          } 
        : category
    ));
    
    setIsEditDialogOpen(false);
    toast.success("Kategori har uppdaterats");
  };

  // Handle deleting a category
  const handleConfirmDelete = () => {
    if (!currentCategory) return;
    
    setCategories(categories.filter(category => category.id !== currentCategory.id));
    setIsDeleteDialogOpen(false);
    toast.success("Kategori har tagits bort");
  };

  // Handle showing category details
  const handleViewCategoryDetails = (category: Category) => {
    setSelectedCategory(category);
    setItemSearchQuery("");
  };

  // Go back to categories list
  const handleBackToCategories = () => {
    setSelectedCategory(null);
  };

  return (
    <div className="animate-fadeIn">
      {!selectedCategory ? (
        // Categories List View
        <>
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center">
              <Folder size={24} className="text-denz-blue mr-2" />
              <h1 className="text-2xl font-bold text-denz-text-primary">Materialkategorier</h1>
            </div>
            <Button 
              onClick={() => {
                setNewCategory({ name: "", description: "" });
                setIsAddDialogOpen(true);
              }}
              className="bg-denz-blue hover:bg-denz-blue/90"
            >
              <Plus size={16} className="mr-1" />
              Lägg till kategori
            </Button>
          </div>
          
          <p className="text-denz-text-secondary mb-6">
            Här kan du lägga till, redigera och ta bort kategorier för material.
          </p>
          
          <div className="flex gap-4 mb-6">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-denz-text-secondary" size={18} />
              <Input 
                className="pl-10 bg-denz-darker border-denz-gray-700/30 text-denz-text-primary"
                placeholder="Sök bland kategorier..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button variant="outline" className="flex gap-2 border-denz-gray-700/30 text-denz-text-secondary hover:bg-denz-dark">
              <Filter size={18} />
              Filter
            </Button>
          </div>
          
          <Card className="shadow-md overflow-hidden border-denz-gray-700/30 bg-denz-darker">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-denz-dark text-left border-b border-denz-gray-700/30">
                    <th className="px-6 py-3 text-denz-text-secondary font-medium">ID</th>
                    <th className="px-6 py-3 text-denz-text-secondary font-medium">Namn</th>
                    <th className="px-6 py-3 text-denz-text-secondary font-medium">Beskrivning</th>
                    <th className="px-6 py-3 text-denz-text-secondary font-medium">Antal material</th>
                    <th className="px-6 py-3 text-denz-text-secondary font-medium">Åtgärder</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-denz-gray-700/30">
                  {filteredCategories.length > 0 ? (
                    filteredCategories.map((category) => (
                      <tr 
                        key={category.id} 
                        className="hover:bg-denz-dark transition-colors cursor-pointer"
                        onClick={() => handleViewCategoryDetails(category)}
                      >
                        <td className="px-6 py-4 font-medium text-denz-text-primary">{category.id}</td>
                        <td className="px-6 py-4 text-denz-text-primary">{category.name}</td>
                        <td className="px-6 py-4 text-denz-text-secondary">
                          {category.description || "—"}
                        </td>
                        <td className="px-6 py-4">
                          <Badge variant="outline" className="font-normal bg-denz-blue/10 text-denz-blue border-denz-blue/30">
                            {category.itemCount} st
                          </Badge>
                        </td>
                        <td className="px-6 py-4" onClick={e => e.stopPropagation()}>
                          <div className="flex space-x-3">
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="text-denz-text-secondary hover:text-denz-blue hover:bg-denz-dark"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleEditCategory(category);
                              }}
                            >
                              <Pencil size={16} className="mr-1" />
                              Redigera
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="text-denz-text-secondary hover:text-denz-danger hover:bg-denz-dark"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDeleteCategory(category);
                              }}
                            >
                              <Trash2 size={16} className="mr-1" />
                              Ta bort
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="px-6 py-8 text-center text-denz-text-secondary">
                        Inga kategorier hittades
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </Card>
          
          <div className="mt-6 flex justify-between items-center text-sm text-denz-text-secondary">
            <div>Visar {filteredCategories.length} av {categories.length} kategorier</div>
          </div>
        </>
      ) : (
        // Category Detail View
        <>
          <div className="mb-8">
            <Button 
              variant="outline" 
              size="sm" 
              className="mb-4 border-denz-gray-700/30 text-denz-text-secondary hover:bg-denz-dark"
              onClick={handleBackToCategories}
            >
              <ArrowLeft size={16} className="mr-1" />
              Tillbaka
            </Button>
            
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">
              <div>
                <div className="flex items-center">
                  <Folder size={24} className="text-denz-blue mr-2" />
                  <h1 className="text-2xl font-bold text-denz-text-primary">{selectedCategory.name}</h1>
                </div>
                {selectedCategory.description && (
                  <p className="text-denz-text-secondary mt-1">
                    {selectedCategory.description}
                  </p>
                )}
              </div>
              
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  className="border-denz-gray-700/30 text-denz-text-secondary hover:bg-denz-dark"
                  onClick={() => handleEditCategory(selectedCategory)}
                >
                  <Pencil size={16} className="mr-1" />
                  Redigera kategori
                </Button>
                <Button
                  variant="outline"
                  className="border-denz-danger/30 text-denz-danger hover:bg-denz-dark"
                  onClick={() => handleDeleteCategory(selectedCategory)}
                >
                  <Trash2 size={16} className="mr-1" />
                  Ta bort kategori
                </Button>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-denz-text-secondary" size={18} />
                  <Input 
                    className="pl-10 bg-denz-darker border-denz-gray-700/30 text-denz-text-primary"
                    placeholder="Sök material inom kategorin..." 
                    value={itemSearchQuery}
                    onChange={(e) => setItemSearchQuery(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="flex gap-2">
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full sm:w-auto">
                  <TabsList className="bg-denz-dark">
                    <TabsTrigger value="list" className="data-[state=active]:bg-denz-darker data-[state=active]:text-denz-text-primary">
                      Lista
                    </TabsTrigger>
                    <TabsTrigger value="grid" className="data-[state=active]:bg-denz-darker data-[state=active]:text-denz-text-primary">
                      Rutnät
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
                
                <Button className="bg-denz-blue hover:bg-denz-blue/90">
                  <Plus size={16} className="mr-1" />
                  Lägg till material
                </Button>
              </div>
            </div>
            
            <div className="mb-4 p-4 rounded-md bg-denz-blue/10 border border-denz-blue/30 text-denz-blue">
              <div className="flex items-center">
                <Package size={18} className="mr-2" />
                <span className="font-medium">Kategori-ID: {selectedCategory.id}</span>
                <span className="mx-3">•</span>
                <span>{categoryItems.length} material i denna kategori</span>
              </div>
            </div>
          </div>
          
          <TabsContent value="list" className="m-0">
            <Card className="shadow-md overflow-hidden border-denz-gray-700/30 bg-denz-darker">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-denz-dark text-left border-b border-denz-gray-700/30">
                      <th className="px-6 py-3 text-denz-text-secondary font-medium">ID</th>
                      <th className="px-6 py-3 text-denz-text-secondary font-medium">Namn</th>
                      <th className="px-6 py-3 text-denz-text-secondary font-medium">Beskrivning</th>
                      <th className="px-6 py-3 text-denz-text-secondary font-medium">Status</th>
                      <th className="px-6 py-3 text-denz-text-secondary font-medium">Serienummer</th>
                      <th className="px-6 py-3 text-denz-text-secondary font-medium">Åtgärder</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-denz-gray-700/30">
                    {categoryItems.length > 0 ? (
                      categoryItems.map((item) => (
                        <tr key={item.id} className="hover:bg-denz-dark transition-colors">
                          <td className="px-6 py-4 font-medium text-denz-text-primary">{item.id}</td>
                          <td className="px-6 py-4 text-denz-text-primary">{item.name}</td>
                          <td className="px-6 py-4 text-denz-text-secondary">
                            {item.description || "—"}
                          </td>
                          <td className="px-6 py-4">
                            <Badge variant="outline" className={`font-normal ${getStatusColor(item.status)}`}>
                              {getStatusLabel(item.status)}
                            </Badge>
                          </td>
                          <td className="px-6 py-4 text-denz-text-secondary">
                            {item.serialNumber || "—"}
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex space-x-3">
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="text-denz-text-secondary hover:text-denz-blue hover:bg-denz-dark"
                              >
                                <Pencil size={16} className="mr-1" />
                                Redigera
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="text-denz-text-secondary hover:text-denz-danger hover:bg-denz-dark"
                              >
                                <Trash2 size={16} className="mr-1" />
                                Ta bort
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={6} className="px-6 py-8 text-center text-denz-text-secondary">
                          Inga material hittades i denna kategori
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </Card>
          </TabsContent>
          
          <TabsContent value="grid" className="m-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {categoryItems.length > 0 ? (
                categoryItems.map((item) => (
                  <Card key={item.id} className="border-denz-gray-700/30 bg-denz-darker hover:border-denz-blue/50 transition-all">
                    <div className="p-4">
                      <div className="flex justify-between mb-2">
                        <Badge variant="outline" className={`font-normal ${getStatusColor(item.status)}`}>
                          {getStatusLabel(item.status)}
                        </Badge>
                        <span className="text-xs text-denz-text-secondary">{item.id}</span>
                      </div>
                      
                      <h3 className="text-denz-text-primary font-medium mb-2">{item.name}</h3>
                      
                      {item.description && (
                        <p className="text-denz-text-secondary text-sm mb-3">
                          {item.description}
                        </p>
                      )}
                      
                      {item.serialNumber && (
                        <div className="flex items-center text-xs text-denz-text-secondary mb-1">
                          <FileText size={12} className="mr-1" />
                          <span>Serienummer: {item.serialNumber}</span>
                        </div>
                      )}
                      
                      {item.purchaseDate && (
                        <div className="flex items-center text-xs text-denz-text-secondary mb-3">
                          <span>Inköpsdatum: {item.purchaseDate}</span>
                        </div>
                      )}
                      
                      <div className="flex justify-end gap-2 mt-2">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-denz-text-secondary hover:text-denz-blue hover:bg-denz-dark"
                        >
                          <Pencil size={14} className="mr-1" />
                          Redigera
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-denz-text-secondary hover:text-denz-danger hover:bg-denz-dark"
                        >
                          <Trash2 size={14} className="mr-1" />
                          Ta bort
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))
              ) : (
                <div className="col-span-full py-8 text-center text-denz-text-secondary">
                  Inga material hittades i denna kategori
                </div>
              )}
            </div>
          </TabsContent>
        </>
      )}
      
      {/* Add Category Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="bg-denz-card-bg border-denz-gray-700/30">
          <DialogHeader>
            <DialogTitle className="text-denz-text-primary">Lägg till kategori</DialogTitle>
            <DialogDescription className="text-denz-text-secondary">
              Fyll i informationen nedan för att skapa en ny materialkategori.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-denz-text-primary" htmlFor="categoryName">
                Kategorinamn *
              </label>
              <Input 
                id="categoryName"
                value={newCategory.name}
                onChange={(e) => setNewCategory({...newCategory, name: e.target.value})}
                placeholder="Ange namn på kategorin"
                className="bg-denz-darker border-denz-gray-700/30 text-denz-text-primary"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-denz-text-primary" htmlFor="categoryDescription">
                Beskrivning
              </label>
              <Input 
                id="categoryDescription"
                value={newCategory.description}
                onChange={(e) => setNewCategory({...newCategory, description: e.target.value})}
                placeholder="Ange en valfri beskrivning"
                className="bg-denz-darker border-denz-gray-700/30 text-denz-text-primary"
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setIsAddDialogOpen(false)}
              className="border-denz-gray-700/30 text-denz-text-primary hover:bg-denz-dark"
            >
              Avbryt
            </Button>
            <Button 
              onClick={handleSaveNewCategory}
              className="bg-denz-blue hover:bg-denz-blue/90"
            >
              Spara
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Edit Category Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="bg-denz-card-bg border-denz-gray-700/30">
          <DialogHeader>
            <DialogTitle className="text-denz-text-primary">Redigera kategori</DialogTitle>
            <DialogDescription className="text-denz-text-secondary">
              Uppdatera information om kategorin.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-denz-text-primary" htmlFor="editCategoryName">
                Kategorinamn *
              </label>
              <Input 
                id="editCategoryName"
                value={newCategory.name}
                onChange={(e) => setNewCategory({...newCategory, name: e.target.value})}
                className="bg-denz-darker border-denz-gray-700/30 text-denz-text-primary"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-denz-text-primary" htmlFor="editCategoryDescription">
                Beskrivning
              </label>
              <Input 
                id="editCategoryDescription"
                value={newCategory.description}
                onChange={(e) => setNewCategory({...newCategory, description: e.target.value})}
                className="bg-denz-darker border-denz-gray-700/30 text-denz-text-primary"
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setIsEditDialogOpen(false)}
              className="border-denz-gray-700/30 text-denz-text-primary hover:bg-denz-dark"
            >
              Avbryt
            </Button>
            <Button 
              onClick={handleUpdateCategory}
              className="bg-denz-blue hover:bg-denz-blue/90"
            >
              Spara
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="bg-denz-card-bg border-denz-gray-700/30">
          <DialogHeader>
            <DialogTitle className="text-denz-text-primary">Ta bort kategori</DialogTitle>
            <DialogDescription className="text-denz-text-secondary">
              Är du säker på att du vill ta bort denna kategori?
            </DialogDescription>
          </DialogHeader>
          
          {currentCategory && (
            <div className="py-4">
              <p className="text-denz-text-primary mb-2">
                <span className="font-medium">Kategori:</span> {currentCategory.name}
              </p>
              {currentCategory.itemCount > 0 && (
                <div className="bg-denz-warning/10 border border-denz-warning/30 rounded-md p-3 text-sm text-denz-warning">
                  <p className="font-medium">OBS! Denna åtgärd kan påverka kopplat material.</p>
                  <p>Det finns {currentCategory.itemCount} material kopplat till denna kategori.</p>
                </div>
              )}
            </div>
          )}
          
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setIsDeleteDialogOpen(false)}
              className="border-denz-gray-700/30 text-denz-text-primary hover:bg-denz-dark"
            >
              Avbryt
            </Button>
            <Button 
              variant="destructive" 
              onClick={handleConfirmDelete}
              className="bg-denz-danger hover:bg-denz-danger/90"
            >
              Ta bort
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Administration;
