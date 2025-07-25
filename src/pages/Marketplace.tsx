import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Search, 
  Filter, 
  Star, 
  MapPin, 
  ShoppingCart,
  Package,
  Truck,
  CheckCircle
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
        <div className="mb-6">
          <p className="text-muted-foreground">
            Showing {filteredItems.length} results
          </p>
        </div>

        {/* Product Grid */}
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