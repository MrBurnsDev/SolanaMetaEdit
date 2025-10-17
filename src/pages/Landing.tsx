import { useState } from 'react';
import { useLocation } from 'wouter';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Card, CardContent } from '../components/ui/Card';
import { Search, Zap, Shield, Sparkles } from 'lucide-react';

export function Landing() {
  const [, setLocation] = useLocation();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setLocation(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const features = [
    {
      icon: <Search className="w-8 h-8 text-purple-600" />,
      title: "Discover Collections",
      description: "Browse thousands of NFT collections on Solana without connecting your wallet"
    },
    {
      icon: <Shield className="w-8 h-8 text-blue-600" />,
      title: "Secure Editing", 
      description: "Edit metadata only after verifying your ownership authority on-chain"
    },
    {
      icon: <Zap className="w-8 h-8 text-yellow-600" />,
      title: "Fast & Reliable",
      description: "Built on Solana's high-performance blockchain for instant transactions"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="text-center space-y-8">
          {/* Hero Title */}
          <div className="space-y-4">
            <div className="flex items-center justify-center mb-6">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  Solana NFT Editor
                </h1>
              </div>
            </div>
            
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Discover, browse, and edit NFT metadata on Solana with the most beautiful and secure editor
            </p>
          </div>

          {/* Search Form */}
          <div className="max-w-2xl mx-auto">
            <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <Input
                  type="text"
                  placeholder="Search collections, creators, or NFT names..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="text-lg py-4"
                  data-testid="input-search"
                />
              </div>
              <Button 
                type="submit" 
                size="lg" 
                className="sm:px-8"
                data-testid="button-search"
              >
                <Search className="w-5 h-5 mr-2" />
                Search
              </Button>
            </form>
          </div>

          {/* Quick Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              variant="outline" 
              onClick={() => setLocation('/search')}
              data-testid="button-browse"
            >
              Browse All Collections
            </Button>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              No wallet connection required to browse
            </p>
          </div>
        </div>

        {/* Features Grid */}
        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="text-center p-8 hover:shadow-lg transition-all duration-300">
              <CardContent className="space-y-4">
                <div className="flex justify-center">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Popular Collections Preview */}
        <div className="mt-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              Popular Collections
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Explore the most popular NFT collections on Solana
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { name: "DRiP Collection", image: "https://images.unsplash.com/photo-1634986666676-ec8fd927c23d?w=300&h=300&fit=crop", count: "10K items" },
              { name: "Solana Monkey Business", image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=300&h=300&fit=crop", count: "5K items" },
              { name: "DeGods", image: "https://images.unsplash.com/photo-1606041008023-472dfb5e530f?w=300&h=300&fit=crop", count: "8.8K items" }
            ].map((collection, index) => (
              <Card key={index} className="group cursor-pointer hover:scale-105 transition-all duration-300" onClick={() => setLocation('/search')}>
                <CardContent className="p-0">
                  <div className="aspect-square overflow-hidden rounded-t-2xl">
                    <img 
                      src={collection.image} 
                      alt={collection.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                      {collection.name}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {collection.count}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}