import React from 'react';
import { Heart, ShoppingCart, Trash2 } from 'lucide-react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import CustomerSidebar from '@/components/dashboard/CustomerSidebar';
import { Button } from '@/components/ui/button';
import { sampleFish, formatTZS } from '@/data/fishData';
import { toast } from 'sonner';

const CustomerFavorites: React.FC = () => {
  const favorites = sampleFish.slice(0, 5);

  const handleAddToCart = (fishName: string) => {
    toast.success(`${fishName} added to cart`);
  };

  return (
    <DashboardLayout 
      sidebar={<CustomerSidebar />}
      title="My Favorites"
      subtitle="Your saved fish products"
    >
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <p className="text-muted-foreground">{favorites.length} items saved</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {favorites.map((fish) => (
            <div key={fish.id} className="bg-card border border-border rounded-2xl overflow-hidden group">
              <div className="relative">
                <img
                  src={fish.image}
                  alt={fish.name}
                  className="w-full h-40 object-cover"
                />
                <button className="absolute top-2 right-2 p-2 rounded-full bg-background/90 text-accent hover:bg-accent hover:text-accent-foreground transition-colors">
                  <Heart className="h-4 w-4 fill-current" />
                </button>
                {!fish.inStock && (
                  <div className="absolute inset-0 bg-background/80 flex items-center justify-center">
                    <span className="px-3 py-1 rounded-full bg-muted text-muted-foreground text-sm font-medium">
                      Out of Stock
                    </span>
                  </div>
                )}
              </div>
              <div className="p-4">
                <h3 className="font-semibold">{fish.name}</h3>
                <p className="text-sm text-muted-foreground mb-2">{fish.nameSwahili}</p>
                <div className="flex items-center justify-between mb-3">
                  <p className="font-bold text-primary">{formatTZS(fish.price)}/{fish.unit}</p>
                  <p className="text-sm text-muted-foreground">{fish.supplier.location}</p>
                </div>
                <div className="flex gap-2">
                  <Button 
                    variant="ocean" 
                    size="sm" 
                    className="flex-1"
                    disabled={!fish.inStock}
                    onClick={() => handleAddToCart(fish.name)}
                  >
                    <ShoppingCart className="h-4 w-4" />
                    Add to Cart
                  </Button>
                  <Button variant="outline" size="sm">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CustomerFavorites;