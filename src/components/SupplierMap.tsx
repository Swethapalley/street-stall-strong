import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Navigation, Star, CheckCircle, ShoppingCart } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Supplier {
  id: number;
  name: string;
  supplier: string;
  price: number;
  unit: string;
  rating: number;
  reviews: number;
  category: string;
  location: string;
  coordinates: [number, number]; // [longitude, latitude]
  availability: string;
  minOrder: number;
  image: string;
  verified: boolean;
  distance?: number;
}

interface SupplierMapProps {
  suppliers: Supplier[];
  onOrder: (supplier: Supplier) => void;
}

const SupplierMap: React.FC<SupplierMapProps> = ({ suppliers, onOrder }) => {
  const { toast } = useToast();
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapboxToken, setMapboxToken] = useState('');
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
  const [nearestSuppliers, setNearestSuppliers] = useState<Supplier[]>([]);
  const [selectedSupplier, setSelectedSupplier] = useState<Supplier | null>(null);

  // Calculate distance between two points using Haversine formula
  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
    const R = 6371; // Earth's radius in kilometers
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  };

  // Get user's current location
  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const coords: [number, number] = [position.coords.longitude, position.coords.latitude];
          setUserLocation(coords);
          
          // Calculate distances to all suppliers
          const suppliersWithDistance = suppliers.map(supplier => ({
            ...supplier,
            distance: calculateDistance(
              position.coords.latitude,
              position.coords.longitude,
              supplier.coordinates[1],
              supplier.coordinates[0]
            )
          })).sort((a, b) => (a.distance || 0) - (b.distance || 0));
          
          setNearestSuppliers(suppliersWithDistance);
          
          toast({
            title: "Location Found!",
            description: "Now showing suppliers sorted by distance from your location.",
          });
        },
        (error) => {
          console.error('Error getting location:', error);
          toast({
            title: "Location Error",
            description: "Unable to get your location. Using default view.",
            variant: "destructive"
          });
          setNearestSuppliers(suppliers);
        }
      );
    } else {
      toast({
        title: "Geolocation Not Supported",
        description: "Your browser doesn't support geolocation.",
        variant: "destructive"
      });
      setNearestSuppliers(suppliers);
    }
  };

  const initializeMap = () => {
    if (!mapContainer.current || !mapboxToken) return;

    mapboxgl.accessToken = mapboxToken;
    
    // Default center of India
    const defaultCenter: [number, number] = [78.9629, 20.5937];
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/light-v11',
      center: userLocation || defaultCenter,
      zoom: userLocation ? 10 : 5,
    });

    // Add navigation controls
    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

    // Add user location marker if available
    if (userLocation) {
      new mapboxgl.Marker({ color: '#3b82f6' })
        .setLngLat(userLocation)
        .setPopup(new mapboxgl.Popup().setHTML('<h3>Your Location</h3>'))
        .addTo(map.current);
    }

    // Add supplier markers
    suppliers.forEach((supplier) => {
      const el = document.createElement('div');
      el.className = 'supplier-marker';
      el.style.cssText = `
        background-color: ${supplier.verified ? '#10b981' : '#f59e0b'};
        width: 30px;
        height: 30px;
        border-radius: 50%;
        border: 3px solid white;
        cursor: pointer;
        box-shadow: 0 2px 8px rgba(0,0,0,0.3);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 14px;
      `;
      el.innerHTML = supplier.image;

      const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(`
        <div class="p-3 min-w-64">
          <div class="flex items-center space-x-2 mb-2">
            <span class="text-lg">${supplier.image}</span>
            <div>
              <h3 class="font-semibold">${supplier.name}</h3>
              <p class="text-sm text-gray-600">${supplier.supplier}</p>
            </div>
          </div>
          <div class="flex justify-between items-center mb-2">
            <span class="text-lg font-bold text-blue-600">₹${supplier.price}/${supplier.unit}</span>
            <div class="flex items-center space-x-1">
              <span class="text-yellow-400">⭐</span>
              <span class="text-sm">${supplier.rating} (${supplier.reviews})</span>
            </div>
          </div>
          <div class="text-sm text-gray-600 mb-2">
            📍 ${supplier.location}
            ${supplier.distance ? `<br>📏 ${supplier.distance.toFixed(1)} km away` : ''}
          </div>
          <div class="flex space-x-2">
            <span class="px-2 py-1 text-xs rounded ${supplier.verified ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}">
              ${supplier.verified ? '✓ Verified' : 'Unverified'}
            </span>
            <span class="px-2 py-1 text-xs rounded ${supplier.availability === 'In Stock' ? 'bg-blue-100 text-blue-800' : 'bg-red-100 text-red-800'}">
              ${supplier.availability}
            </span>
          </div>
        </div>
      `);

      const marker = new mapboxgl.Marker(el)
        .setLngLat(supplier.coordinates)
        .setPopup(popup)
        .addTo(map.current!);

      el.addEventListener('click', () => {
        setSelectedSupplier(supplier);
      });
    });
  };

  useEffect(() => {
    if (mapboxToken) {
      initializeMap();
    }
    
    return () => {
      map.current?.remove();
    };
  }, [mapboxToken, userLocation, suppliers]);

  if (!mapboxToken) {
    return (
      <Card className="p-6">
        <CardHeader>
          <CardTitle>Supplier Location Map</CardTitle>
          <CardDescription>
            Enter your Mapbox public token to view suppliers on an interactive map.
            Get your token from <a href="https://mapbox.com/" target="_blank" rel="noopener noreferrer" className="text-primary underline">mapbox.com</a>
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input
            type="password"
            placeholder="Enter Mapbox public token (pk.eyJ1...)"
            value={mapboxToken}
            onChange={(e) => setMapboxToken(e.target.value)}
          />
          <p className="text-sm text-muted-foreground">
            Your token is stored locally and never sent to our servers.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Location Controls */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold">Find Nearest Suppliers</h3>
              <p className="text-sm text-muted-foreground">
                {userLocation ? 
                  `Showing ${nearestSuppliers.length} suppliers sorted by distance` :
                  'Enable location to find suppliers near you'
                }
              </p>
            </div>
            <Button onClick={getUserLocation} className="flex items-center space-x-2">
              <Navigation className="w-4 h-4" />
              <span>Get My Location</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Map */}
        <div className="lg:col-span-2">
          <Card>
            <CardContent className="p-0">
              <div ref={mapContainer} className="w-full h-96 rounded-lg" />
            </CardContent>
          </Card>
        </div>

        {/* Nearest Suppliers List */}
        <div className="space-y-4">
          <h3 className="font-semibold text-lg">
            {userLocation ? 'Nearest Suppliers' : 'All Suppliers'}
          </h3>
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {(nearestSuppliers.length > 0 ? nearestSuppliers : suppliers).slice(0, 10).map((supplier) => (
              <Card 
                key={supplier.id} 
                className={`cursor-pointer transition-all ${selectedSupplier?.id === supplier.id ? 'ring-2 ring-primary' : ''}`}
                onClick={() => setSelectedSupplier(supplier)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <span className="text-xl">{supplier.image}</span>
                      <div>
                        <h4 className="font-medium text-sm">{supplier.name}</h4>
                        <p className="text-xs text-muted-foreground">{supplier.supplier}</p>
                      </div>
                    </div>
                    {supplier.verified && (
                      <CheckCircle className="w-4 h-4 text-accent" />
                    )}
                  </div>
                  
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-bold text-primary">₹{supplier.price}/{supplier.unit}</span>
                    <div className="flex items-center space-x-1">
                      <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      <span className="text-xs">{supplier.rating}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
                    <div className="flex items-center space-x-1">
                      <MapPin className="w-3 h-3" />
                      <span>{supplier.location}</span>
                    </div>
                    {supplier.distance && (
                      <span className="font-medium">{supplier.distance.toFixed(1)} km</span>
                    )}
                  </div>
                  
                  <Button 
                    size="sm" 
                    className="w-full"
                    onClick={(e) => {
                      e.stopPropagation();
                      onOrder(supplier);
                    }}
                    disabled={supplier.availability !== "In Stock"}
                  >
                    <ShoppingCart className="w-3 h-3 mr-1" />
                    Order Now
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupplierMap;