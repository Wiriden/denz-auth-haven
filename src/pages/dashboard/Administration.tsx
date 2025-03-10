import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
    ArrowLeft,
    Filter,
    Folder,
    Package,
    Pencil,
    Plus,
    Search,
    Trash2
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

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
      return "bg-emerald-50 text-emerald-600 border-emerald-200";
    case "in-use":
      return "bg-sky-50 text-sky-600 border-sky-200";
    case "maintenance":
      return "bg-amber-50 text-amber-600 border-amber-200";
    default:
      return "bg-gray-50 text-gray-600 border-gray-200";
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
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-xl font-medium text-denz-text-primary mb-1 flex items-center">
                <Folder size={20} className="text-denz-blue mr-2" />
                Materialkategorier
              </h1>
              <p className="text-sm text-denz-text-secondary">
                Här kan du lägga till, redigera och ta bort kategorier för material.
              </p>
            </div>
            <Button 
              onClick={() => {
                setNewCategory({ name: "", description: "" });
                setIsAddDialogOpen(true);
              }}
              className="bg-denz-blue hover:bg-denz-dark-blue text-sm font-medium h-9 px-4"
            >
              <Plus size={16} className="mr-1.5" />
              Lägg till kategori
            </Button>
          </div>
          
          <div className="flex gap-3 mb-5 items-center">
            <div className="relative flex-grow max-w-md">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-denz-text-secondary" />
              <Input
                type="text"
                placeholder="Sök bland kategorier..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 py-2 h-9 bg-white text-sm teamgantt-search"
              />
            </div>
            <Button variant="outline" size="sm" className="h-9 border-gray-200 text-denz-text-secondary">
              <Filter size={16} className="mr-1.5" />
              Filter
            </Button>
          </div>
          
          <div className="bg-white border border-gray-200 rounded-md overflow-hidden">
            <div className="grid grid-cols-12 gap-4 px-4 py-3 bg-gray-50 border-b border-gray-200 text-xs font-medium text-gray-600 tracking-wide">
              <div className="col-span-2">ID</div>
              <div className="col-span-3">Namn</div>
              <div className="col-span-4">Beskrivning</div>
              <div className="col-span-2 text-center">Antal material</div>
              <div className="col-span-1 text-right">Åtgärder</div>
            </div>
            
            {filteredCategories.length > 0 ? (
              <div>
                {filteredCategories.map((category) => (
                  <div 
                    key={category.id} 
                    className="grid grid-cols-12 gap-4 px-4 py-3 border-b border-gray-200 hover:bg-blue-50/50 text-sm items-center"
                  >
                    <div className="col-span-2 text-denz-text-secondary">{category.id}</div>
                    <div className="col-span-3 font-medium text-denz-text-primary">{category.name}</div>
                    <div className="col-span-4 text-denz-text-secondary line-clamp-1">{category.description}</div>
                    <div className="col-span-2 text-center">
                      <Badge variant="outline" className="bg-denz-blue/5 text-denz-blue border-denz-blue/20 px-2 py-0.5 text-xs">
                        {category.itemCount} st
                      </Badge>
                    </div>
                    <div className="col-span-1 flex justify-end gap-2">
                      <button 
                        onClick={() => handleEditCategory(category)}
                        className="text-denz-text-secondary hover:text-denz-blue rounded-full p-1.5 hover:bg-blue-50 transition-colors"
                        aria-label="Redigera"
                      >
                        <Pencil size={15} />
                      </button>
                      <button 
                        onClick={() => handleDeleteCategory(category)}
                        className="text-denz-text-secondary hover:text-rose-500 rounded-full p-1.5 hover:bg-rose-50 transition-colors"
                        aria-label="Ta bort"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </div>
                ))}
                <div className="px-4 py-3 text-sm text-denz-text-secondary">
                  Visar {filteredCategories.length} av {categories.length} kategorier
                </div>
              </div>
            ) : (
              <div className="p-8 text-center">
                <div className="bg-gray-50 inline-flex rounded-full p-3 mb-3">
                  <Folder className="h-6 w-6 text-denz-text-secondary" />
                </div>
                <h3 className="text-lg font-medium text-denz-text-primary">Inga kategorier hittades</h3>
                <p className="text-denz-text-secondary mt-1 mb-4">
                  Det finns inga kategorier som matchar din sökning.
                </p>
                <Button 
                  variant="outline" 
                  onClick={() => setSearchQuery("")}
                  className="text-sm"
                >
                  Rensa sökning
                </Button>
              </div>
            )}
          </div>
        </>
      ) : (
        // Category Details View
        <div>
          <div className="flex items-center mb-6">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleBackToCategories}
              className="mr-2 text-denz-text-secondary hover:text-denz-text-primary"
            >
              <ArrowLeft size={16} className="mr-1.5" />
              Tillbaka
            </Button>
            <h1 className="text-xl font-medium text-denz-text-primary">
              {selectedCategory.name}
            </h1>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <Card className="p-4 bg-white">
              <div className="flex justify-between items-start mb-2">
                <div className="text-sm font-medium text-denz-text-secondary">ID</div>
                <Badge variant="outline" className="bg-gray-50 text-denz-text-secondary border-gray-200">
                  {selectedCategory.id}
                </Badge>
              </div>
              <div className="mb-4">
                <div className="text-sm font-medium text-denz-text-secondary mb-1">Beskrivning</div>
                <p className="text-denz-text-primary">{selectedCategory.description}</p>
              </div>
              <div className="mt-auto">
                <div className="text-sm font-medium text-denz-text-secondary mb-1">Antal material</div>
                <Badge variant="outline" className="bg-denz-blue/5 text-denz-blue border-denz-blue/20 px-2 py-0.5">
                  {selectedCategory.itemCount} st
                </Badge>
              </div>
            </Card>
            
            <Card className="p-4 col-span-2 bg-white flex flex-col">
              <h3 className="font-medium text-denz-text-primary mb-3 flex items-center">
                <Package size={16} className="mr-1.5 text-denz-blue" />
                Material i denna kategori
              </h3>
              
              <div className="relative mb-4">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-denz-text-secondary" />
                <Input
                  type="text"
                  placeholder="Sök material..."
                  value={itemSearchQuery}
                  onChange={(e) => setItemSearchQuery(e.target.value)}
                  className="pl-9 h-9 bg-white text-sm teamgantt-search"
                />
              </div>
              
              {categoryItems.length > 0 ? (
                <div className="overflow-hidden border border-gray-200 rounded-md">
                  <div className="grid grid-cols-12 gap-4 px-4 py-2 bg-gray-50 border-b border-gray-200 text-xs font-medium text-gray-600">
                    <div className="col-span-3">Namn</div>
                    <div className="col-span-5">Beskrivning</div>
                    <div className="col-span-2">Serial nr.</div>
                    <div className="col-span-2 text-right">Status</div>
                  </div>
                  
                  <div className="max-h-[240px] overflow-y-auto">
                    {categoryItems.map((item) => (
                      <div 
                        key={item.id} 
                        className="grid grid-cols-12 gap-4 px-4 py-2.5 border-b border-gray-200 hover:bg-blue-50/50 text-sm items-center"
                      >
                        <div className="col-span-3 font-medium text-denz-text-primary">{item.name}</div>
                        <div className="col-span-5 text-denz-text-secondary line-clamp-1">{item.description}</div>
                        <div className="col-span-2 text-denz-text-secondary">{item.serialNumber || "-"}</div>
                        <div className="col-span-2 text-right">
                          <Badge variant="outline" className={`${getStatusColor(item.status)} text-xs px-2 py-0.5`}>
                            {getStatusLabel(item.status)}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="flex-1 flex flex-col items-center justify-center p-6 bg-gray-50 rounded-md border border-gray-200">
                  <Package className="h-8 w-8 text-denz-text-secondary mb-2" />
                  <h3 className="text-base font-medium text-denz-text-primary">Inga material hittades</h3>
                  <p className="text-sm text-denz-text-secondary">
                    Det finns inga material i denna kategori.
                  </p>
                </div>
              )}
            </Card>
          </div>
          
          <div className="flex gap-3 mt-4">
            <Button
              onClick={() => handleEditCategory(selectedCategory)}
              variant="outline"
              className="text-sm border-gray-200"
            >
              <Pencil size={15} className="mr-1.5" />
              Redigera kategori
            </Button>
            <Button
              onClick={() => handleDeleteCategory(selectedCategory)}
              variant="outline"
              className="text-sm border-gray-200 text-rose-500 hover:text-rose-600 hover:bg-rose-50 hover:border-rose-200"
            >
              <Trash2 size={15} className="mr-1.5" />
              Ta bort kategori
            </Button>
          </div>
        </div>
      )}
      
      {/* Add Category Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-denz-text-primary">Lägg till kategori</DialogTitle>
            <DialogDescription className="text-denz-text-secondary">
              Skapa en ny kategori för material.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-2">
            <div>
              <Label htmlFor="name" className="text-sm font-medium text-denz-text-secondary mb-1.5 block">
                Kategorinamn
              </Label>
              <Input
                id="name"
                type="text"
                value={newCategory.name}
                onChange={(e) => setNewCategory({...newCategory, name: e.target.value})}
                placeholder="T.ex. Verktyg, Elektronik, etc."
                className="col-span-3 teamgantt-search"
              />
            </div>
            
            <div>
              <Label htmlFor="description" className="text-sm font-medium text-denz-text-secondary mb-1.5 block">
                Beskrivning
              </Label>
              <Textarea
                id="description"
                value={newCategory.description}
                onChange={(e) => setNewCategory({...newCategory, description: e.target.value})}
                placeholder="Kort beskrivning av kategorin"
                className="col-span-3 min-h-[100px] teamgantt-search"
              />
            </div>
          </div>
          
          <DialogFooter className="flex gap-3">
            <Button 
              variant="outline" 
              onClick={() => setIsAddDialogOpen(false)}
              className="flex-1 text-sm"
            >
              Avbryt
            </Button>
            <Button 
              type="submit" 
              onClick={handleSaveNewCategory}
              className="flex-1 bg-denz-blue hover:bg-denz-dark-blue text-sm"
            >
              Lägg till
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Edit Category Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-denz-text-primary">Redigera kategori</DialogTitle>
            <DialogDescription className="text-denz-text-secondary">
              Uppdatera information för kategorin.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-2">
            <div>
              <Label htmlFor="edit-name" className="text-sm font-medium text-denz-text-secondary mb-1.5 block">
                Kategorinamn
              </Label>
              <Input
                id="edit-name"
                type="text"
                value={newCategory.name}
                onChange={(e) => setNewCategory({...newCategory, name: e.target.value})}
                className="col-span-3 teamgantt-search"
              />
            </div>
            
            <div>
              <Label htmlFor="edit-description" className="text-sm font-medium text-denz-text-secondary mb-1.5 block">
                Beskrivning
              </Label>
              <Textarea
                id="edit-description"
                value={newCategory.description}
                onChange={(e) => setNewCategory({...newCategory, description: e.target.value})}
                className="col-span-3 min-h-[100px] teamgantt-search"
              />
            </div>
          </div>
          
          <DialogFooter className="flex gap-3">
            <Button 
              variant="outline" 
              onClick={() => setIsEditDialogOpen(false)}
              className="flex-1 text-sm"
            >
              Avbryt
            </Button>
            <Button 
              type="submit" 
              onClick={handleUpdateCategory}
              className="flex-1 bg-denz-blue hover:bg-denz-dark-blue text-sm"
            >
              Spara ändringar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Delete Category Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-denz-text-primary">Ta bort kategori</DialogTitle>
            <DialogDescription className="text-denz-text-secondary">
              Är du säker på att du vill ta bort denna kategori? Denna åtgärd kan inte ångras.
            </DialogDescription>
          </DialogHeader>
          
          {currentCategory && (
            <div className="bg-rose-50 border border-rose-200 rounded-md p-4 mb-4">
              <h4 className="text-rose-600 font-medium mb-1">{currentCategory.name}</h4>
              <p className="text-sm text-denz-text-secondary">{currentCategory.description}</p>
              <div className="mt-2 flex items-center">
                <span className="text-xs text-denz-text-secondary mr-2">Material i kategorin:</span>
                <Badge variant="outline" className="bg-rose-50 text-rose-600 border-rose-200 text-xs">
                  {currentCategory.itemCount} st
                </Badge>
              </div>
            </div>
          )}
          
          <DialogFooter className="flex gap-3">
            <Button 
              variant="outline" 
              onClick={() => setIsDeleteDialogOpen(false)}
              className="flex-1 text-sm"
            >
              Avbryt
            </Button>
            <Button 
              variant="destructive"
              onClick={handleConfirmDelete}
              className="flex-1 text-sm"
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
