
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Package, 
  DollarSign, 
  TrendingUp, 
  AlertTriangle,
  Plus,
  BarChart3,
  Leaf,
  ShoppingCart,
  Sun,
  CloudRain,
  Wind,
  Thermometer,
  Droplets,
  Eye,
  Activity
} from 'lucide-react';

export const FarmerDashboard = () => {
  const { user } = useAuth();

  // Mock data for demonstration
  const listings = [
    { id: '1', name: 'Organic Tomatoes', stock: 150, sold: 75, price: 2.50, status: 'active' },
    { id: '2', name: 'Fresh Carrots', stock: 25, sold: 180, price: 1.80, status: 'low_stock' },
    { id: '3', name: 'Wheat Seeds', stock: 0, sold: 50, price: 4.50, status: 'out_of_stock' }
  ];

  const marketPrices = [
    { crop: 'Tomatoes', current: 2.50, change: '+12%', trend: 'up' },
    { crop: 'Wheat', current: 1.80, change: '-5%', trend: 'down' },
    { crop: 'Rice', current: 1.45, change: '+8%', trend: 'up' },
    { crop: 'Carrots', current: 1.20, change: '+3%', trend: 'up' }
  ];

  const weatherData = {
    temperature: 24,
    humidity: 68,
    rainfall: 20,
    windSpeed: 15,
    condition: 'Partly Cloudy',
    uvIndex: 6,
    soilMoisture: 75
  };

  const advisoryAlerts = [
    { type: 'disease', message: 'Late blight detected in tomato farms nearby', severity: 'high' },
    { type: 'weather', message: 'Heavy rain expected in 2 days', severity: 'medium' },
    { type: 'fertilizer', message: 'Optimal time for nitrogen application', severity: 'low' }
  ];

  const monthlyEarnings = 1250.75;
  const totalListings = 12;
  const lowStockAlerts = 3;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'low_stock': return 'bg-yellow-100 text-yellow-800';
      case 'out_of_stock': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStockPercentage = (stock: number, sold: number) => {
    const total = stock + sold;
    return total > 0 ? (stock / total) * 100 : 0;
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Welcome back, {user?.name}!</h1>
        <p className="text-gray-600 mt-2">Manage your farm with comprehensive insights and tools</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">Monthly Earnings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold">${monthlyEarnings}</span>
              <DollarSign className="h-6 w-6 text-green-600" />
            </div>
            <p className="text-xs text-green-600 mt-2">+12% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">Active Listings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold">{totalListings}</span>
              <Package className="h-6 w-6 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">Total Sales</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold">156</span>
              <TrendingUp className="h-6 w-6 text-green-600" />
            </div>
            <p className="text-xs text-green-600 mt-2">+8 this week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">Alerts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold">{advisoryAlerts.length}</span>
              <AlertTriangle className="h-6 w-6 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Manage your farm business efficiently</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <Button className="w-full" variant="outline">
                  <Plus className="mr-2 h-4 w-4" />
                  Add New Listing
                </Button>
                <Button className="w-full" variant="outline">
                  <BarChart3 className="mr-2 h-4 w-4" />
                  View Analytics
                </Button>
                <Button className="w-full" variant="outline">
                  <Leaf className="mr-2 h-4 w-4" />
                  Manage Inventory
                </Button>
                <Link to="/advisory">
                  <Button className="w-full" variant="outline">
                    <Activity className="mr-2 h-4 w-4" />
                    Get Advisory
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Market Analysis */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <TrendingUp className="mr-2 h-5 w-5 text-green-600" />
                Market Analysis
              </CardTitle>
              <CardDescription>Real-time crop prices and trends</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {marketPrices.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                        <Leaf className="h-4 w-4 text-green-600" />
                      </div>
                      <span className="font-medium">{item.crop}</span>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className="font-semibold">${item.current}/kg</span>
                      <Badge className={item.trend === 'up' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                        {item.change}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Inventory Overview */}
          <Card>
            <CardHeader>
              <CardTitle>Inventory Overview</CardTitle>
              <CardDescription>Current stock levels and sales performance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {listings.map((listing) => (
                  <div key={listing.id} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h4 className="font-medium">{listing.name}</h4>
                        <p className="text-sm text-gray-600">${listing.price} per kg</p>
                      </div>
                      <Badge className={getStatusColor(listing.status)}>
                        {listing.status.replace('_', ' ')}
                      </Badge>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Stock: {listing.stock} kg</span>
                        <span>Sold: {listing.sold} kg</span>
                      </div>
                      <Progress value={getStockPercentage(listing.stock, listing.sold)} className="h-2" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Weather Widget */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Sun className="mr-2 h-5 w-5 text-yellow-500" />
                Weather & Farm Conditions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="text-center">
                  <div className="text-3xl font-bold">{weatherData.temperature}°C</div>
                  <div className="text-gray-600">{weatherData.condition}</div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center">
                    <Droplets className="mr-2 h-4 w-4 text-blue-500" />
                    <span>{weatherData.humidity}% Humidity</span>
                  </div>
                  <div className="flex items-center">
                    <Wind className="mr-2 h-4 w-4 text-gray-500" />
                    <span>{weatherData.windSpeed} km/h</span>
                  </div>
                  <div className="flex items-center">
                    <CloudRain className="mr-2 h-4 w-4 text-blue-500" />
                    <span>{weatherData.rainfall}% Rain</span>
                  </div>
                  <div className="flex items-center">
                    <Thermometer className="mr-2 h-4 w-4 text-orange-500" />
                    <span>UV {weatherData.uvIndex}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Soil Moisture</span>
                    <span>{weatherData.soilMoisture}%</span>
                  </div>
                  <Progress value={weatherData.soilMoisture} className="h-2" />
                </div>

                <div className="text-xs text-gray-600 bg-green-50 p-2 rounded">
                  <strong>Farming Tip:</strong> Good conditions for harvesting and outdoor work today.
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Advisory Alerts */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <AlertTriangle className="mr-2 h-5 w-5 text-orange-500" />
                Advisory Alerts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {advisoryAlerts.map((alert, index) => (
                  <div key={index} className={`p-3 border rounded-lg ${getSeverityColor(alert.severity)}`}>
                    <div className="flex items-start space-x-2">
                      <AlertTriangle className="h-4 w-4 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium">{alert.message}</p>
                        <Badge variant="outline" className="mt-1 text-xs">
                          {alert.type}
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <Link to="/advisory" className="block mt-4">
                <Button className="w-full" variant="outline">
                  <Eye className="mr-2 h-4 w-4" />
                  View All Advisories
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Fertilizer Advisory */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Leaf className="mr-2 h-5 w-5 text-green-500" />
                Fertilizer Advisory
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-sm font-medium text-green-800">Recommended for this week:</p>
                  <p className="text-sm text-green-700">Apply NPK 20-20-20 for tomatoes</p>
                </div>
                <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-sm font-medium text-blue-800">Soil pH Alert:</p>
                  <p className="text-sm text-blue-700">Consider lime application (pH 5.8)</p>
                </div>
              </div>
              <Link to="/inputs-marketplace" className="block mt-4">
                <Button className="w-full" variant="outline">
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Buy Fertilizers
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
