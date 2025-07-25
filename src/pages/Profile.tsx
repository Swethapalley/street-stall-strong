import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { 
  User, 
  MapPin, 
  Clock, 
  Phone, 
  Mail, 
  Star,
  QrCode,
  Camera,
  Save,
  Edit,
  Share2,
  Award
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface VendorProfile {
  name: string;
  businessName: string;
  email: string;
  phone: string;
  location: string;
  description: string;
  specialties: string[];
  businessHours: {
    open: string;
    close: string;
    days: string;
  };
  rating: number;
  totalOrders: number;
  joinDate: string;
  isVerified: boolean;
  isOpen: boolean;
}

const Profile = () => {
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [showQR, setShowQR] = useState(false);
  const [profile, setProfile] = useState<VendorProfile>({
    name: "Rajesh Kumar",
    businessName: "Kumar's Street Delights",
    email: "rajesh.kumar@email.com",
    phone: "+91 98765 43210",
    location: "Connaught Place, New Delhi",
    description: "Serving authentic North Indian street food for over 15 years. Famous for crispy chaat, hot samosas, and refreshing lassi.",
    specialties: ["Vada Pav", "Pani Puri", "Dosa", "Chai", "Samosa"],
    businessHours: {
      open: "08:00",
      close: "22:00",
      days: "Monday - Sunday"
    },
    rating: 4.8,
    totalOrders: 2847,
    joinDate: "2024-01-15",
    isVerified: true,
    isOpen: true
  });

  // Load profile from localStorage
  useEffect(() => {
    const savedProfile = localStorage.getItem("vendorProfile");
    if (savedProfile) {
      setProfile(JSON.parse(savedProfile));
    }
  }, []);

  // Save profile to localStorage
  useEffect(() => {
    localStorage.setItem("vendorProfile", JSON.stringify(profile));
  }, [profile]);

  const handleSave = () => {
    setIsEditing(false);
    toast({
      title: "Profile Updated",
      description: "Your profile has been successfully updated",
    });
  };

  const handleAddSpecialty = (specialty: string) => {
    if (specialty && !profile.specialties.includes(specialty)) {
      setProfile({
        ...profile,
        specialties: [...profile.specialties, specialty]
      });
    }
  };

  const handleRemoveSpecialty = (specialty: string) => {
    setProfile({
      ...profile,
      specialties: profile.specialties.filter(s => s !== specialty)
    });
  };

  const generateQRCode = () => {
    const profileURL = `https://vendorhub.app/vendor/${profile.businessName.toLowerCase().replace(/\s+/g, '-')}`;
    return `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(profileURL)}`;
  };

  const handleShare = () => {
    const profileText = `Check out ${profile.businessName} on VendorHub!\n\n${profile.description}\n\nLocation: ${profile.location}\nRating: ⭐ ${profile.rating}/5`;
    
    if (navigator.share) {
      navigator.share({
        title: profile.businessName,
        text: profileText,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(profileText);
      toast({
        title: "Profile copied to clipboard",
        description: "Share your profile link with customers",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/30">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Vendor Profile</h1>
            <p className="text-muted-foreground">
              Manage your business information and digital presence
            </p>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" onClick={handleShare}>
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </Button>
            <Button 
              variant={isEditing ? "default" : "outline"}
              onClick={isEditing ? handleSave : () => setIsEditing(true)}
            >
              {isEditing ? (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  Save
                </>
              ) : (
                <>
                  <Edit className="w-4 h-4 mr-2" />
                  Edit
                </>
              )}
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Profile */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Info */}
            <Card className="border-2">
              <CardHeader>
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center">
                    <User className="w-8 h-8 text-primary-foreground" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <CardTitle className="text-foreground">{profile.businessName}</CardTitle>
                      {profile.isVerified && (
                        <Badge variant="secondary" className="bg-accent/20 text-accent">
                          <Award className="w-3 h-3 mr-1" />
                          Verified
                        </Badge>
                      )}
                    </div>
                    <CardDescription className="flex items-center space-x-4">
                      <span>{profile.name}</span>
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span>{profile.rating}</span>
                        <span>({profile.totalOrders} orders)</span>
                      </div>
                    </CardDescription>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-muted-foreground">Status:</span>
                    <Switch
                      checked={profile.isOpen}
                      onCheckedChange={(checked) => setProfile({...profile, isOpen: checked})}
                    />
                    <span className={`text-sm font-medium ${profile.isOpen ? 'text-accent' : 'text-muted-foreground'}`}>
                      {profile.isOpen ? 'Open' : 'Closed'}
                    </span>
                  </div>
                </div>
              </CardHeader>
            </Card>

            {/* Business Details */}
            <Card className="border-2">
              <CardHeader>
                <CardTitle className="text-foreground">Business Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="businessName">Business Name</Label>
                    <Input
                      id="businessName"
                      value={profile.businessName}
                      onChange={(e) => setProfile({...profile, businessName: e.target.value})}
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <Label htmlFor="ownerName">Owner Name</Label>
                    <Input
                      id="ownerName"
                      value={profile.name}
                      onChange={(e) => setProfile({...profile, name: e.target.value})}
                      disabled={!isEditing}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="description">Business Description</Label>
                  <Textarea
                    id="description"
                    value={profile.description}
                    onChange={(e) => setProfile({...profile, description: e.target.value})}
                    disabled={!isEditing}
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={profile.email}
                      onChange={(e) => setProfile({...profile, email: e.target.value})}
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      value={profile.phone}
                      onChange={(e) => setProfile({...profile, phone: e.target.value})}
                      disabled={!isEditing}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={profile.location}
                    onChange={(e) => setProfile({...profile, location: e.target.value})}
                    disabled={!isEditing}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Specialties */}
            <Card className="border-2">
              <CardHeader>
                <CardTitle className="text-foreground">Menu Specialties</CardTitle>
                <CardDescription>Items you're known for</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2 mb-4">
                  {profile.specialties.map((specialty, index) => (
                    <Badge key={index} variant="secondary" className="bg-primary/10 text-primary">
                      {specialty}
                      {isEditing && (
                        <button
                          onClick={() => handleRemoveSpecialty(specialty)}
                          className="ml-2 text-primary hover:text-destructive"
                        >
                          ×
                        </button>
                      )}
                    </Badge>
                  ))}
                </div>
                {isEditing && (
                  <div className="flex space-x-2">
                    <Input
                      placeholder="Add a specialty..."
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          handleAddSpecialty(e.currentTarget.value);
                          e.currentTarget.value = '';
                        }
                      }}
                    />
                    <Button 
                      variant="outline" 
                      onClick={(e) => {
                        const input = e.currentTarget.previousElementSibling as HTMLInputElement;
                        handleAddSpecialty(input.value);
                        input.value = '';
                      }}
                    >
                      Add
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Business Hours */}
            <Card className="border-2">
              <CardHeader>
                <CardTitle className="text-foreground flex items-center">
                  <Clock className="w-5 h-5 mr-2" />
                  Business Hours
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="openTime">Opening Time</Label>
                    <Input
                      id="openTime"
                      type="time"
                      value={profile.businessHours.open}
                      onChange={(e) => setProfile({
                        ...profile,
                        businessHours: {...profile.businessHours, open: e.target.value}
                      })}
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <Label htmlFor="closeTime">Closing Time</Label>
                    <Input
                      id="closeTime"
                      type="time"
                      value={profile.businessHours.close}
                      onChange={(e) => setProfile({
                        ...profile,
                        businessHours: {...profile.businessHours, close: e.target.value}
                      })}
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <Label htmlFor="days">Days</Label>
                    <Input
                      id="days"
                      value={profile.businessHours.days}
                      onChange={(e) => setProfile({
                        ...profile,
                        businessHours: {...profile.businessHours, days: e.target.value}
                      })}
                      disabled={!isEditing}
                      placeholder="e.g., Monday - Sunday"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* QR Code */}
            <Card className="border-2">
              <CardHeader>
                <CardTitle className="text-foreground flex items-center">
                  <QrCode className="w-5 h-5 mr-2" />
                  QR Code Menu
                </CardTitle>
                <CardDescription>Share your digital menu with customers</CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                {showQR ? (
                  <div>
                    <img 
                      src={generateQRCode()} 
                      alt="QR Code" 
                      className="mx-auto mb-4 rounded-lg shadow-soft"
                    />
                    <Button variant="outline" onClick={() => setShowQR(false)}>
                      Hide QR Code
                    </Button>
                  </div>
                ) : (
                  <Button onClick={() => setShowQR(true)} className="w-full">
                    <QrCode className="w-4 h-4 mr-2" />
                    Generate QR Code
                  </Button>
                )}
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card className="border-2">
              <CardHeader>
                <CardTitle className="text-foreground">Quick Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Member Since</span>
                  <span className="font-medium">
                    {new Date(profile.joinDate).toLocaleDateString()}
                  </span>
                </div>
                <Separator />
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Total Orders</span>
                  <span className="font-medium">{profile.totalOrders.toLocaleString()}</span>
                </div>
                <Separator />
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Rating</span>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium">{profile.rating}/5</span>
                  </div>
                </div>
                <Separator />
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Status</span>
                  <Badge variant={profile.isVerified ? "secondary" : "destructive"}>
                    {profile.isVerified ? "Verified" : "Pending"}
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Contact Info */}
            <Card className="border-2">
              <CardHeader>
                <CardTitle className="text-foreground">Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Mail className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">{profile.email}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">{profile.phone}</span>
                </div>
                <div className="flex items-start space-x-3">
                  <MapPin className="w-4 h-4 text-muted-foreground mt-0.5" />
                  <span className="text-sm">{profile.location}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;