
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Leaf, 
  Users, 
  ShoppingCart, 
  MessageCircle, 
  TrendingUp,
  Shield,
  Globe,
  ArrowRight
} from 'lucide-react';

export const Home = () => {
  const features = [
    {
      icon: ShoppingCart,
      title: "Marketplace",
      description: "Buy and sell crops, fertilizers, and agricultural inputs directly"
    },
    {
      icon: MessageCircle,
      title: "Plant Disease Advisory",
      description: "Get expert advice on plant diseases and treatment recommendations"
    },
    {
      icon: TrendingUp,
      title: "Price Analytics",
      description: "Track market prices and make informed trading decisions"
    },
    {
      icon: Shield,
      title: "Secure Transactions",
      description: "Safe and secure payment processing for all transactions"
    },
    {
      icon: Globe,
      title: "Weather Integration",
      description: "Real-time weather updates and agricultural forecasts"
    },
    {
      icon: Users,
      title: "Community",
      description: "Connect with farmers and buyers in your region"
    }
  ];

  const stats = [
    { label: "Active Farmers", value: "10,000+" },
    { label: "Crop Varieties", value: "500+" },
    { label: "Successful Trades", value: "50,000+" },
    { label: "Advisory Solutions", value: "1,000+" }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-600 to-green-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Connecting Farmers & Buyers
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              AgroConnect is your one-stop platform for agricultural trading, 
              plant disease advisory, and farming insights.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/crop-marketplace">
                <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Browse Marketplace
                </Button>
              </Link>
              <Link to="/advisory">
                <Button size="lg" variant="outline" className="w-full sm:w-auto border-white text-white hover:bg-white hover:text-green-600">
                  <MessageCircle className="mr-2 h-5 w-5" />
                  Get Advisory
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose AgroConnect?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We provide comprehensive solutions for modern agriculture, 
              connecting stakeholders and providing expert guidance.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <feature.icon className="h-12 w-12 text-green-600 mb-4" />
                  <CardTitle>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-green-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Transform Your Agricultural Business?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of farmers and buyers who trust AgroConnect 
            for their agricultural needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/signup">
              <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                Get Started Today
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/faqs">
              <Button size="lg" variant="outline" className="w-full sm:w-auto border-white text-white hover:bg-white hover:text-green-600">
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
