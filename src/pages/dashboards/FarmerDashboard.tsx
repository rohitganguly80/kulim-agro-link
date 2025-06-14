
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
  Wind
} from 'lucide-react';

export const FarmerDashboard = () => {
  const { user } = useAuth();

  // Mock data for demonstration
  const listings = [
    { id: '1', name: 'Organic Tomatoes', stock: 150, sold: 75, price: 2.50, status: 'active' },
    { id: '2', name: 'Fresh Carrots', stock: 25, sold: 180, price: 1.80, status: 'low_stock' },
    { id: '3', name: 'Wheat Seeds', stock: 0, sold: 50, price: 4.50, status: 'out_of_stock' }
  ];

  const recentSales = [
    { id: '1', product: 'Organic Tomatoes', buyer: 'John Buyer', quantity: '10 kg', amount: 25.00, date: '2024-01-15' },
    { id: '2', product: 'Fresh Carrots', buyer: 'Jane Smith', quantity: '15 kg', amount: 27.00, date: '2024-01-14' },
    { id: '3', product: 'Wheat Seeds', buyer: 'Farm Supply Co', quantity: '5 kg', amount: 22.50, date: '2024-01-13' }
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

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Welcome back, {user?.name}!</h1>
        <p className="text-gray-600 mt-2">Manage your farm products and track your sales</p>
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
            <CardTitle className="text-sm font-medium text-gray-600">Low Stock Alerts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold">{lowStockAlerts}</span>
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
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    Get Advisory
                  </Button>
                </Link>
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

          {/* Recent Sales */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Sales</CardTitle>
              <CardDescription>Latest transactions and orders</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentSales.map((sale) => (
                  <div key={sale.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <h4 className="font-medium">{sale.product}</h4>
                      <p className="text-sm text-gray-600">{sale.buyer} • {sale.quantity}</p>
                      <p className="text-xs text-gray-500">{sale.date}</p>
                    </div>
                    <div className="text-right">
                      <span className="font-medium text-green-600">${sale.amount}</span>
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
                Weather Today
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="text-center">
                  <div className="text-3xl font-bold">24°C</div>
                  <div className="text-gray-600">Perfect for farming</div>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center">
                    <CloudRain className="mr-2 h-4 w-4 text-blue-500" />
                    <span>20% Rain</span>
                  </div>
                  <div className="flex items-center">
                    <Wind className="mr-2 h-4 w-4 text-gray-500" />
                    <span>15 km/h</span>
                  </div>
                </div>
                <div className="text-xs text-gray-600 bg-green-50 p-2 rounded">
                  <strong>Farming Tip:</strong> Good conditions for harvesting and outdoor work today.
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Performance Summary */}
          <Card>
            <CardHeader>
              <CardTitle>This Month's Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Sales Target</span>
                  <span className="font-medium">75%</span>
                </div>
                <Progress value={75} className="h-2" />
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Customer Satisfaction</span>
                  <span className="font-medium">92%</span>
                </div>
                <Progress value={92} className="h-2" />
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Inventory Turnover</span>
                  <span className="font-medium">68%</span>
                </div>
                <Progress value={68} className="h-2" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
