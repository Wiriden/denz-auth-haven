
import React, { useState } from "react";
import { 
  Folder, 
  Search, 
  Filter, 
  Plus,
  Pencil,
  Trash2
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

// Mock data for categories
type Category = {
  id: string;
  name: string;
  description: string;
  itemCount: number;
};

const initialCategories: Category[] = [
  { id: "KA-001", name: "Elektronik", description: "Elektroniska verktyg och utrustning", itemCount: 15 },
  { id: "KA-002", name: "Handverktyg", description: "Manuella verktyg för diverse uppgifter", itemCount: 23 },
  { id: "KA-003", name: "Skyddsutrustning", description: "Skyddskläder och säkerhetsutrustning", itemCount: 8 },
  { id: "KA-004", name: "Mätutrustning", description: "Verktyg för mätning och kalibrering", itemCount: 12 },
  { id: "KA-005", name: "Trädgård", description: "Utrustning för trädgårdsarbete", itemCount: 6 },
];

const Administration = () => {
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentCategory, setCurrentCategory] = useState<Category | null>(null);
  const [newCategory, setNewCategory] = useState({
    name: "",
    description: ""
  });

  // Filter categories based on search query
  const filteredCategories = categories.filter(category => 
    category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    category.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

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

  return (
    <div className="animate-fadeIn">
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
                  <tr key={category.id} className="hover:bg-denz-dark transition-colors">
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
                    <td className="px-6 py-4">
                      <div className="flex space-x-3">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-denz-text-secondary hover:text-denz-blue hover:bg-denz-dark"
                          onClick={() => handleEditCategory(category)}
                        >
                          <Pencil size={16} className="mr-1" />
                          Redigera
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-denz-text-secondary hover:text-denz-danger hover:bg-denz-dark"
                          onClick={() => handleDeleteCategory(category)}
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
      
      <div className="mt-6 flex justify-between items-center text-sm text-denz-text-secondary">
        <div>Visar {filteredCategories.length} av {categories.length} kategorier</div>
      </div>
    </div>
  );
};

export default Administration;
