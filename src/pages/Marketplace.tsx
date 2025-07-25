import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Search, 
  Filter, 
  Star, 
  MapPin, 
  ShoppingCart,
  Package,
  Truck,
  CheckCircle,
  BarChart3,
  Grid3X3
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Marketplace = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("relevance");

  // Mock data for marketplace items
  const marketplaceItems = [
    {
      id: 1,
      name: "Premium Basmati Rice",
      supplier: "AgriSource Ltd",
      price: 45,
      unit: "kg",
      rating: 4.8,
      reviews: 324,
      category: "grains",
      location: "Punjab, India",
      availability: "In Stock",
      minOrder: 10,
      image: "🌾",
      verified: true
    },
    {
      id: 2,
      name: "Organic Turmeric Powder",
      supplier: "Spice Kingdom",
      price: 180,
      unit: "kg",
      rating: 4.9,
      reviews: 156,
      category: "spices",
      location: "Kerala, India",
      availability: "In Stock",
      minOrder: 5,
      image: "🟡",
      verified: true
    },
    {
      id: 3,
      name: "Fresh Onions",
      supplier: "FreshVeg Co",
      price: 25,
      unit: "kg",
      rating: 4.5,
      reviews: 89,
      category: "vegetables",
      location: "Maharashtra, India",
      availability: "Limited Stock",
      minOrder: 20,
      image: "🧅",
      verified: false
    },
    {
      id: 4,
      name: "Cooking Oil (Refined)",
      supplier: "PureCook Industries",
      price: 120,
      unit: "liter",
      rating: 4.7,
      reviews: 267,
      category: "oils",
      location: "Gujarat, India",
      availability: "In Stock",
      minOrder: 15,
      image: "🛢️",
      verified: true
    },
    {
      id: 5,
      name: "Red Chili Powder",
      supplier: "Spice Kingdom",
      price: 200,
      unit: "kg",
      rating: 4.9,
      reviews: 423,
      category: "spices",
      location: "Rajasthan, India",
      availability: "In Stock",
      minOrder: 5,
      image: "🌶️",
      verified: true
    },
    {
      id: 6,
      name: "Fresh Tomatoes",
      supplier: "FarmFresh Direct",
      price: 30,
      unit: "kg",
      rating: 4.3,
      reviews: 156,
      category: "vegetables",
      location: "Karnataka, India",
      availability: "In Stock",
      minOrder: 25,
      image: "🍅",
      verified: true
    },
    // Additional suppliers with same materials for price comparison
    {
      id: 7,
      name: "Premium Basmati Rice",
      supplier: "Golden Grains",
      price: 42,
      unit: "kg",
      rating: 4.6,
      reviews: 189,
      category: "grains",
      location: "Haryana, India",
      availability: "In Stock",
      minOrder: 15,
      image: "🌾",
      verified: true
    },
    {
      id: 8,
      name: "Premium Basmati Rice",
      supplier: "Rice Masters",
      price: 48,
      unit: "kg",
      rating: 4.9,
      reviews: 445,
      category: "grains",
      location: "Uttar Pradesh, India",
      availability: "In Stock",
      minOrder: 8,
      image: "🌾",
      verified: true
    },
    {
      id: 9,
      name: "Organic Turmeric Powder",
      supplier: "Pure Spices Co",
      price: 175,
      unit: "kg",
      rating: 4.7,
      reviews: 234,
      category: "spices",
      location: "Tamil Nadu, India",
      availability: "In Stock",
      minOrder: 3,
      image: "🟡",
      verified: true
    },
    {
      id: 10,
      name: "Fresh Onions",
      supplier: "Farm Direct",
      price: 22,
      unit: "kg",
      rating: 4.7,
      reviews: 167,
      category: "vegetables",
      location: "Rajasthan, India",
      availability: "In Stock",
      minOrder: 30,
      image: "🧅",
      verified: true
    },
    {
      id: 11,
      name: "Cooking Oil (Refined)",
      supplier: "Golden Oil Mills",
      price: 115,
      unit: "liter",
      rating: 4.5,
      reviews: 189,
      category: "oils",
      location: "Andhra Pradesh, India",
      availability: "In Stock",
      minOrder: 20,
      image: "🛢️",
      verified: false
    }
  ];

  const categories = [
    { value: "all", label: "All Categories" },
    { value: "grains", label: "Grains & Cereals" },
    { value: "spices", label: "Spices" },
    { value: "vegetables", label: "Vegetables" },
    { value: "oils", label: "Oils & Fats" },
    { value: "dairy", label: "Dairy Products" },
    { value: "meat", label: "Meat & Poultry" }
  ];

  const filteredItems = marketplaceItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.supplier.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Group items by name for price comparison
  const groupedItems = filteredItems.reduce((acc, item) => {
    const key = item.name;
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(item);
    return acc;
  }, {} as Record<string, typeof filteredItems>);

  // Sort comparison groups by price
  const sortedGroups = Object.entries(groupedItems).map(([name, items]) => ({
    name,
    items: items.sort((a, b) => a.price - b.price),
    lowestPrice: Math.min(...items.map(item => item.price)),
    suppliers: items.length
  })).sort((a, b) => a.lowestPrice - b.lowestPrice);

  const handleOrder = (item: any) => {
    toast({
      title: "Order Placed Successfully!",
      description: `Your order for ${item.name} has been sent to ${item.supplier}`,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Raw Material Marketplace</h1>
          <p className="text-muted-foreground">
            Discover affordable supplies from verified suppliers across India
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-card rounded-lg shadow-soft p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search materials or suppliers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full md:w-48">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map(category => (
                  <SelectItem key={category.value} value={category.value}>
                    {category.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full md:w-40">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="relevance">Relevance</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="rating">Highest Rated</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Results count */}
        <div className="mb-6 flex justify-between items-center">
          <p className="text-muted-foreground">
            Showing {filteredItems.length} results
          </p>
          <p className="text-sm text-muted-foreground">
            {sortedGroups.filter(group => group.suppliers > 1).length} materials available from multiple suppliers
          </p>
        </div>

        {/* Tabs for Grid and Comparison Views */}
        <Tabs defaultValue="grid" className="space-y-6">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="grid" className="flex items-center space-x-2">
              <Grid3X3 className="w-4 h-4" />
              <span>Grid View</span>
            </TabsTrigger>
            <TabsTrigger value="comparison" className="flex items-center space-x-2">
              <BarChart3 className="w-4 h-4" />
              <span>Price Comparison</span>
            </TabsTrigger>
          </TabsList>

          {/* Grid View */}
          <TabsContent value="grid">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredItems.map((item) => (
                <Card key={item.id} className="border-2 hover:shadow-warm transition-smooth group">
                  <CardHeader>
                    <div className="flex justify-between items-start mb-4">
                      <div className="text-4xl">{item.image}</div>
                      <div className="flex items-center space-x-2">
                        {item.verified && (
                          <Badge variant="secondary" className="bg-accent/10 text-accent">
                            <CheckCircle className="w-3 h-3 mr-1" />
                            Verified
                          </Badge>
                        )}
                        <Badge 
                          variant={item.availability === "In Stock" ? "secondary" : "destructive"}
                          className={item.availability === "In Stock" ? "bg-accent/20 text-accent" : ""}
                        >
                          {item.availability}
                        </Badge>
                      </div>
                    </div>
                    <CardTitle className="text-lg text-foreground">{item.name}</CardTitle>
                    <CardDescription className="flex items-center space-x-1">
                      <span>{item.supplier}</span>
                      <span>•</span>
                      <MapPin className="w-3 h-3" />
                      <span className="text-xs">{item.location}</span>
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <span className="text-2xl font-bold text-primary">₹{item.price}</span>
                          <span className="text-muted-foreground">/{item.unit}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="font-medium">{item.rating}</span>
                          <span className="text-muted-foreground">({item.reviews})</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <div className="flex items-center space-x-1">
                          <Package className="w-4 h-4" />
                          <span>Min: {item.minOrder} {item.unit}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Truck className="w-4 h-4" />
                          <span>2-3 days</span>
                        </div>
                      </div>

                      <Button 
                        className="w-full" 
                        variant="default"
                        onClick={() => handleOrder(item)}
                        disabled={item.availability !== "In Stock"}
                      >
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        {item.availability === "In Stock" ? "Order Now" : "Out of Stock"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Price Comparison View */}
          <TabsContent value="comparison">
            <div className="space-y-6">
              {sortedGroups.map((group) => (
                <Card key={group.name} className="overflow-hidden">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <span className="text-3xl">{group.items[0].image}</span>
                        <div>
                          <CardTitle className="text-xl">{group.name}</CardTitle>
                          <CardDescription>
                            {group.suppliers} supplier{group.suppliers > 1 ? 's' : ''} • Starting from ₹{group.lowestPrice}
                          </CardDescription>
                        </div>
                      </div>
                      {group.suppliers > 1 && (
                        <Badge variant="secondary" className="bg-primary/10 text-primary">
                          Compare Prices
                        </Badge>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Supplier</TableHead>
                          <TableHead>Price</TableHead>
                          <TableHead>Rating</TableHead>
                          <TableHead>Min Order</TableHead>
                          <TableHead>Location</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Action</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {group.items.map((item, index) => (
                          <TableRow key={item.id} className={index === 0 ? "bg-accent/5" : ""}>
                            <TableCell>
                              <div className="flex items-center space-x-2">
                                <span className="font-medium">{item.supplier}</span>
                                {item.verified && (
                                  <CheckCircle className="w-4 h-4 text-accent" />
                                )}
                                {index === 0 && (
                                  <Badge variant="secondary" className="bg-green-100 text-green-800 text-xs">
                                    Best Price
                                  </Badge>
                                )}
                              </div>
                            </TableCell>
                            <TableCell>
                              <span className="font-bold text-lg">₹{item.price}</span>
                              <span className="text-muted-foreground text-sm">/{item.unit}</span>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center space-x-1">
                                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                <span>{item.rating}</span>
                                <span className="text-muted-foreground text-sm">({item.reviews})</span>
                              </div>
                            </TableCell>
                            <TableCell>{item.minOrder} {item.unit}</TableCell>
                            <TableCell>
                              <div className="flex items-center space-x-1">
                                <MapPin className="w-3 h-3" />
                                <span className="text-sm">{item.location}</span>
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge 
                                variant={item.availability === "In Stock" ? "secondary" : "destructive"}
                                className={item.availability === "In Stock" ? "bg-accent/20 text-accent" : ""}
                              >
                                {item.availability}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <Button 
                                size="sm"
                                onClick={() => handleOrder(item)}
                                disabled={item.availability !== "In Stock"}
                              >
                                <ShoppingCart className="w-4 h-4 mr-1" />
                                Order
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Empty state */}
        {filteredItems.length === 0 && (
          <div className="text-center py-12">
            <Package className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">No items found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Marketplace;