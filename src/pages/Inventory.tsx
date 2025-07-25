import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { 
  Plus, 
  Package, 
  AlertTriangle, 
  Edit, 
  Trash2, 
  TrendingDown,
  TrendingUp,
  Calendar
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface InventoryItem {
  id: number;
  name: string;
  category: string;
  quantity: number;
  unit: string;
  purchasePrice: number;
  purchaseDate: string;
  supplier: string;
  lowStockThreshold: number;
  expiryDate?: string;
}

const Inventory = () => {
  const { toast } = useToast();
  const [inventoryItems, setInventoryItems] = useState<InventoryItem[]>([]);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<InventoryItem | null>(null);
  const [newItem, setNewItem] = useState({
    name: "",
    category: "",
    quantity: 0,
    unit: "",
    purchasePrice: 0,
    supplier: "",
    lowStockThreshold: 0,
    expiryDate: ""
  });

  // Load inventory from localStorage on mount
  useEffect(() => {
    const savedInventory = localStorage.getItem("vendorInventory");
    if (savedInventory) {
      setInventoryItems(JSON.parse(savedInventory));
    } else {
      // Mock initial data
      const mockInventory: InventoryItem[] = [
        {
          id: 1,
          name: "Basmati Rice",
          category: "Grains",
          quantity: 45,
          unit: "kg",
          purchasePrice: 45,
          purchaseDate: "2024-01-15",
          supplier: "AgriSource Ltd",
          lowStockThreshold: 10,
          expiryDate: "2024-06-15"
        },
        {
          id: 2,
          name: "Turmeric Powder",
          category: "Spices",
          quantity: 8,
          unit: "kg",
          purchasePrice: 180,
          purchaseDate: "2024-01-10",
          supplier: "Spice Kingdom",
          lowStockThreshold: 5,
          expiryDate: "2025-01-10"
        },
        {
          id: 3,
          name: "Cooking Oil",
          category: "Oils",
          quantity: 3,
          unit: "liters",
          purchasePrice: 120,
          purchaseDate: "2024-01-20",
          supplier: "PureCook Industries",
          lowStockThreshold: 5,
          expiryDate: "2024-07-20"
        },
        {
          id: 4,
          name: "Red Chili Powder",
          category: "Spices",
          quantity: 12,
          unit: "kg",
          purchasePrice: 200,
          purchaseDate: "2024-01-12",
          supplier: "Spice Kingdom",
          lowStockThreshold: 3,
          expiryDate: "2025-01-12"
        }
      ];
      setInventoryItems(mockInventory);
      localStorage.setItem("vendorInventory", JSON.stringify(mockInventory));
    }
  }, []);

  // Save to localStorage whenever inventory changes
  useEffect(() => {
    localStorage.setItem("vendorInventory", JSON.stringify(inventoryItems));
  }, [inventoryItems]);

  const handleAddItem = () => {
    if (!newItem.name || !newItem.category || newItem.quantity <= 0) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    const item: InventoryItem = {
      id: Date.now(),
      ...newItem,
      purchaseDate: new Date().toISOString().split('T')[0]
    };

    setInventoryItems([...inventoryItems, item]);
    setNewItem({
      name: "",
      category: "",
      quantity: 0,
      unit: "",
      purchasePrice: 0,
      supplier: "",
      lowStockThreshold: 0,
      expiryDate: ""
    });
    setIsAddDialogOpen(false);
    
    toast({
      title: "Item Added",
      description: `${item.name} has been added to your inventory`,
    });
  };

  const handleUpdateItem = (updatedItem: InventoryItem) => {
    setInventoryItems(items => 
      items.map(item => item.id === updatedItem.id ? updatedItem : item)
    );
    setEditingItem(null);
    
    toast({
      title: "Item Updated",
      description: `${updatedItem.name} has been updated`,
    });
  };

  const handleDeleteItem = (id: number) => {
    const item = inventoryItems.find(item => item.id === id);
    setInventoryItems(items => items.filter(item => item.id !== id));
    
    toast({
      title: "Item Deleted",
      description: `${item?.name} has been removed from inventory`,
    });
  };

  const isLowStock = (item: InventoryItem) => item.quantity <= item.lowStockThreshold;
  const isExpiringSoon = (item: InventoryItem) => {
    if (!item.expiryDate) return false;
    const expiryDate = new Date(item.expiryDate);
    const today = new Date();
    const daysUntilExpiry = Math.ceil((expiryDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    return daysUntilExpiry <= 30 && daysUntilExpiry > 0;
  };

  const lowStockItems = inventoryItems.filter(isLowStock);
  const expiringSoonItems = inventoryItems.filter(isExpiringSoon);
  const totalValue = inventoryItems.reduce((sum, item) => sum + (item.quantity * item.purchasePrice), 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Inventory Management</h1>
            <p className="text-muted-foreground">
              Track your stock levels and manage your supplies
            </p>
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="flex items-center space-x-2">
                <Plus className="w-4 h-4" />
                <span>Add Item</span>
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Inventory Item</DialogTitle>
                <DialogDescription>
                  Add a new item to your inventory tracking
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Item Name</Label>
                  <Input
                    id="name"
                    value={newItem.name}
                    onChange={(e) => setNewItem({...newItem, name: e.target.value})}
                    placeholder="e.g., Basmati Rice"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="category">Category</Label>
                    <Input
                      id="category"
                      value={newItem.category}
                      onChange={(e) => setNewItem({...newItem, category: e.target.value})}
                      placeholder="e.g., Grains"
                    />
                  </div>
                  <div>
                    <Label htmlFor="unit">Unit</Label>
                    <Input
                      id="unit"
                      value={newItem.unit}
                      onChange={(e) => setNewItem({...newItem, unit: e.target.value})}
                      placeholder="e.g., kg, liters"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="quantity">Quantity</Label>
                    <Input
                      id="quantity"
                      type="number"
                      value={newItem.quantity}
                      onChange={(e) => setNewItem({...newItem, quantity: parseFloat(e.target.value) || 0})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="price">Purchase Price (per unit)</Label>
                    <Input
                      id="price"
                      type="number"
                      value={newItem.purchasePrice}
                      onChange={(e) => setNewItem({...newItem, purchasePrice: parseFloat(e.target.value) || 0})}
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="supplier">Supplier</Label>
                  <Input
                    id="supplier"
                    value={newItem.supplier}
                    onChange={(e) => setNewItem({...newItem, supplier: e.target.value})}
                    placeholder="e.g., AgriSource Ltd"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="threshold">Low Stock Threshold</Label>
                    <Input
                      id="threshold"
                      type="number"
                      value={newItem.lowStockThreshold}
                      onChange={(e) => setNewItem({...newItem, lowStockThreshold: parseFloat(e.target.value) || 0})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="expiry">Expiry Date (optional)</Label>
                    <Input
                      id="expiry"
                      type="date"
                      value={newItem.expiryDate}
                      onChange={(e) => setNewItem({...newItem, expiryDate: e.target.value})}
                    />
                  </div>
                </div>
                <Button onClick={handleAddItem} className="w-full">
                  Add Item
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="border-2">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Items</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{inventoryItems.length}</div>
            </CardContent>
          </Card>
          <Card className="border-2">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Value</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">₹{totalValue.toLocaleString()}</div>
            </CardContent>
          </Card>
          <Card className="border-2 border-destructive/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-destructive flex items-center">
                <TrendingDown className="w-4 h-4 mr-1" />
                Low Stock
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-destructive">{lowStockItems.length}</div>
            </CardContent>
          </Card>
          <Card className="border-2 border-yellow-500/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-yellow-600 flex items-center">
                <Calendar className="w-4 h-4 mr-1" />
                Expiring Soon
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">{expiringSoonItems.length}</div>
            </CardContent>
          </Card>
        </div>

        {/* Alerts */}
        {(lowStockItems.length > 0 || expiringSoonItems.length > 0) && (
          <div className="space-y-4 mb-8">
            {lowStockItems.length > 0 && (
              <Card className="border-destructive/20 bg-destructive/5">
                <CardHeader>
                  <CardTitle className="text-destructive flex items-center">
                    <AlertTriangle className="w-5 h-5 mr-2" />
                    Low Stock Alert
                  </CardTitle>
                  <CardDescription>
                    These items are running low and need restocking:
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {lowStockItems.map(item => (
                      <Badge key={item.id} variant="destructive">
                        {item.name}: {item.quantity} {item.unit} left
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
            
            {expiringSoonItems.length > 0 && (
              <Card className="border-yellow-500/20 bg-yellow-50">
                <CardHeader>
                  <CardTitle className="text-yellow-600 flex items-center">
                    <Calendar className="w-5 h-5 mr-2" />
                    Expiry Alert
                  </CardTitle>
                  <CardDescription>
                    These items are expiring within 30 days:
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {expiringSoonItems.map(item => (
                      <Badge key={item.id} className="bg-yellow-100 text-yellow-800">
                        {item.name}: expires {item.expiryDate}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        )}

        {/* Inventory List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {inventoryItems.map((item) => (
            <Card key={item.id} className="border-2 hover:shadow-soft transition-smooth">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg text-foreground">{item.name}</CardTitle>
                    <CardDescription>{item.category} • {item.supplier}</CardDescription>
                  </div>
                  <div className="flex space-x-1">
                    {isLowStock(item) && (
                      <Badge variant="destructive" className="text-xs">
                        Low Stock
                      </Badge>
                    )}
                    {isExpiringSoon(item) && (
                      <Badge className="bg-yellow-100 text-yellow-800 text-xs">
                        Expiring
                      </Badge>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Quantity:</span>
                    <span className="font-medium">
                      {item.quantity} {item.unit}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Value:</span>
                    <span className="font-medium">
                      ₹{(item.quantity * item.purchasePrice).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Purchase Date:</span>
                    <span className="text-sm">{item.purchaseDate}</span>
                  </div>
                  {item.expiryDate && (
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Expires:</span>
                      <span className="text-sm">{item.expiryDate}</span>
                    </div>
                  )}
                  
                  <div className="flex space-x-2 pt-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setEditingItem(item)}
                      className="flex-1"
                    >
                      <Edit className="w-3 h-3 mr-1" />
                      Edit
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDeleteItem(item.id)}
                      className="flex-1"
                    >
                      <Trash2 className="w-3 h-3 mr-1" />
                      Delete
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty state */}
        {inventoryItems.length === 0 && (
          <div className="text-center py-12">
            <Package className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">No inventory items</h3>
            <p className="text-muted-foreground mb-4">
              Start tracking your inventory by adding your first item
            </p>
            <Button onClick={() => setIsAddDialogOpen(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Add Your First Item
            </Button>
          </div>
        )}

        {/* Edit Dialog */}
        {editingItem && (
          <Dialog open={!!editingItem} onOpenChange={() => setEditingItem(null)}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit Inventory Item</DialogTitle>
                <DialogDescription>
                  Update the details of {editingItem.name}
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="edit-quantity">Quantity</Label>
                  <Input
                    id="edit-quantity"
                    type="number"
                    value={editingItem.quantity}
                    onChange={(e) => setEditingItem({
                      ...editingItem,
                      quantity: parseFloat(e.target.value) || 0
                    })}
                  />
                </div>
                <div>
                  <Label htmlFor="edit-threshold">Low Stock Threshold</Label>
                  <Input
                    id="edit-threshold"
                    type="number"
                    value={editingItem.lowStockThreshold}
                    onChange={(e) => setEditingItem({
                      ...editingItem,
                      lowStockThreshold: parseFloat(e.target.value) || 0
                    })}
                  />
                </div>
                <Button onClick={() => handleUpdateItem(editingItem)} className="w-full">
                  Update Item
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </div>
  );
};

export default Inventory;