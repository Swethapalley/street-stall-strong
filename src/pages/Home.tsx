import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { 
  ShoppingCart, 
  BarChart3, 
  MapPin, 
  Star, 
  TrendingUp,
  Users,
  Shield,
  Smartphone
} from "lucide-react";
import heroImage from "@/assets/hero-street-food.jpg";

const Home = () => {
  const features = [
    {
      icon: ShoppingCart,
      title: "Raw Material Marketplace",
      description: "Access affordable supplies from verified suppliers with competitive pricing",
      color: "bg-gradient-primary"
    },
    {
      icon: BarChart3,
      title: "Business Analytics",
      description: "Track sales, expenses, and performance with detailed insights",
      color: "bg-gradient-accent"
    },
    {
      icon: MapPin,
      title: "Vendor Discovery",
      description: "Get discovered by customers through our interactive vendor map",
      color: "bg-gradient-warm"
    },
    {
      icon: Shield,
      title: "Trust & Safety",
      description: "Build credibility with hygiene ratings and customer reviews",
      color: "bg-gradient-primary"
    }
  ];

  const painPoints = [
    "Lack of access to affordable raw materials",
    "No centralized platform",
    "Lack of trust & structure", 
    "No data & insights"
  ];

  const stats = [
    { label: "Active Vendors", value: "2,500+", icon: Users },
    { label: "Monthly Orders", value: "15K+", icon: ShoppingCart },
    { label: "Avg Cost Savings", value: "30%", icon: TrendingUp },
    { label: "Customer Rating", value: "4.8", icon: Star }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/30">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-primary text-primary-foreground">
        <div className="absolute inset-0 bg-black/20"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30"
          style={{ backgroundImage: `url(${heroImage})` }}
        ></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <Badge className="mb-4 bg-primary-foreground/20 text-primary-foreground border-primary-foreground/30">
              Solving for Street Food
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Empowering Street Food
              <span className="block text-primary-glow">Vendors to Thrive</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto opacity-90">
              Join the digital revolution in street food business management. 
              Access affordable supplies, track performance, and build customer trust.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="outline" asChild>
                <Link to="/signup">Start Your Journey</Link>
              </Button>
              <Button size="lg" variant="secondary" asChild>
                <Link to="/marketplace">Explore Marketplace</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Pain Points Section */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Key Pain Points We Solve</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Understanding the challenges street food vendors face every day
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {painPoints.map((point, index) => (
              <Card key={index} className="text-center border-2 hover:shadow-soft transition-smooth">
                <CardContent className="pt-6">
                  <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-primary-foreground font-bold">{index + 1}</span>
                  </div>
                  <p className="text-foreground font-medium">{point}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gradient-warm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Powerful Features for Your Business</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Everything you need to manage and grow your street food business
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map(({ icon: Icon, title, description, color }, index) => (
              <Card key={index} className="border-2 hover:shadow-warm transition-smooth group">
                <CardHeader>
                  <div className={`w-12 h-12 ${color} rounded-lg flex items-center justify-center mb-4 group-hover:shadow-glow transition-smooth`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-foreground">{title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Trusted by Thousands</h2>
            <p className="text-muted-foreground">
              Join a growing community of successful street food vendors
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map(({ label, value, icon: Icon }, index) => (
              <div key={index} className="text-center">
                <div className="bg-gradient-primary w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-8 h-8 text-primary-foreground" />
                </div>
                <div className="text-3xl font-bold text-foreground mb-2">{value}</div>
                <div className="text-muted-foreground">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <Smartphone className="w-16 h-16 mx-auto mb-6 opacity-80" />
          <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Business?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of vendors who've already modernized their operations with VendorHub
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="outline" asChild>
              <Link to="/signup">Get Started Free</Link>
            </Button>
            <Button size="lg" variant="secondary" asChild>
              <Link to="/marketplace">Browse Suppliers</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;