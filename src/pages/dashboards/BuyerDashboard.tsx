
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useCart } from '@/contexts/CartContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  ShoppingCart, 
  Package, 
  TrendingUp, 
  MessageCircle,
  Sun,
  CloudRain,
  Wind,
  Eye
} from 'lucide-react';

export const BuyerDashboard = () => {
  const { user } = useAuth();
  const { getTotalItems, getTotalPrice } = useCart();

  // Mock data for demonstration
  const recentOrders = [
    { id: '1', product: 'Organic Tomatoes', quantity: '50 kg', status: 'Delivered', date: '2024-01-15', total: 125.00 },
    { id: '2', product: 'Wheat Seeds', quantity: '10 kg', status: 'In Transit', date: '2024-01-12', total: 45.00 },
    { id: '3', product: 'Fertilizer NPK', quantity: '25 kg', status: 'Processing', date: '2024-01-10', total: 87.50 }
  ];

  const recommendations = [
    { id: '1', name: 'Fresh Carrots', price: 2.50, unit: 'kg', farmer: 'Green Valley Farm', image: '/images/crops/carrots.jpg' },
    { id: '2', name: 'Organic Spinach', price: 4.00, unit: 'kg', farmer: 'Sunrise Organics', image: '/images/crops/spinach.jpg' },
    { id: '3', name: 'Premium Rice', price: 1.80, unit: 'kg', farmer: 'Golden Harvest', image: '/images/crops/rice.jpg' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Delivered': return 'bg-green-100 text-green-800';
      case 'In Transit': return 'bg-blue-100 text-blue-800';
      case 'Processing': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Welcome back, {user?.name}!</h1>
        <p className="text-gray-600 mt-2">Here's what's happening with your agricultural purchases</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">Cart Items</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold">{getTotalItems()}</span>
              <ShoppingCart className="h-6 w-6 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">Cart Value</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold">${getTotalPrice().toFixed(2)}</span>
              <TrendingUp className="h-6 w-6 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">Total Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold">24</span>
              <Package className="h-6 w-6 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">Advisory Used</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold">8</span>
              <MessageCircle className="h-6 w-6 text-green-600" />
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
              <CardDescription>Jump to the most important tasks</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <Link to="/crop-marketplace">
                  <Button className="w-full" variant="outline">
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    Browse Crops
                  </Button>
                </Link>
                <Link to="/inputs-marketplace">
                  <Button className="w-full" variant="outline">
                    <Package className="mr-2 h-4 w-4" />
                    Buy Inputs
                  </Button>
                </Link>
                <Link to="/advisory">
                  <Button className="w-full" variant="outline">
                    <MessageCircle className="mr-2 h-4 w-4" />
                    Get Advisory
                  </Button>
                </Link>
                <Link to="/cart">
                  <Button className="w-full" variant="outline">
                    <Eye className="mr-2 h-4 w-4" />
                    View Cart
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Recent Orders */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Orders</CardTitle>
              <CardDescription>Track your latest purchases</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentOrders.map((order) => (
                  <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <h4 className="font-medium">{order.product}</h4>
                      <p className="text-sm text-gray-600">{order.quantity} • {order.date}</p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Badge className={getStatusColor(order.status)}>
                        {order.status}
                      </Badge>
                      <span className="font-medium">${order.total}</span>
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
                  <div className="text-gray-600">Partly Cloudy</div>
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
              </div>
            </CardContent>
          </Card>

          {/* Recommendations */}
          <Card>
            <CardHeader>
              <CardTitle>Recommended for You</CardTitle>
              <CardDescription>Based on your purchase history</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recommendations.map((item) => (
                  <div key={item.id} className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50">
                    <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                      <Package className="h-6 w-6 text-gray-500" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-sm truncate">{item.name}</h4>
                      <p className="text-xs text-gray-600">{item.farmer}</p>
                      <p className="text-sm font-medium text-green-600">${item.price}/{item.unit}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
