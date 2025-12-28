import React from 'react';
import { Package, Plus, Edit, Trash2, Eye, EyeOff, Search, Filter } from 'lucide-react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import SellerSidebar from '@/components/dashboard/SellerSidebar';
import { Button } from '@/components/ui/button';
import { sampleFish, formatTZS } from '@/data/fishData';
import { cn } from '@/lib/utils';

const SellerProducts: React.FC = () => {
  const myProducts = sampleFish.slice(0, 6);

  return (
    <DashboardLayout 
      sidebar={<SellerSidebar />}
      title="My Products"
      subtitle="Manage your fish listings"
    >
      <div className="space-y-6">
        {/* Header Actions */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input 
              type="text"
              placeholder="Search products..."
              className="w-full pl-10 pr-4 py-2 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Filter className="h-4 w-4" />
              Filter
            </Button>
            <Button variant="ocean">
              <Plus className="h-4 w-4" />
              Add Product
            </Button>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {myProducts.map((product) => (
            <div key={product.id} className="bg-card border border-border rounded-2xl overflow-hidden group">
              <div className="relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-40 object-cover"
                />
                <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button variant="ghost" size="icon" className="h-8 w-8 bg-background/90 backdrop-blur-sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8 bg-background/90 backdrop-blur-sm text-destructive">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                <div className="absolute bottom-2 left-2">
                  <span className={cn(
                    "px-2 py-1 rounded-full text-xs font-medium",
                    product.inStock ? 'bg-secondary text-secondary-foreground' : 'bg-muted text-muted-foreground'
                  )}>
                    {product.inStock ? 'In Stock' : 'Out of Stock'}
                  </span>
                </div>
              </div>
              <div className="p-4">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div>
                    <h3 className="font-semibold">{product.name}</h3>
                    <p className="text-sm text-muted-foreground">{product.nameSwahili}</p>
                  </div>
                  <button className={cn(
                    "p-1.5 rounded-full transition-colors",
                    product.inStock ? 'bg-green-light text-secondary' : 'bg-muted text-muted-foreground'
                  )}>
                    {product.inStock ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <p className="font-bold text-primary">{formatTZS(product.price)}/{product.unit}</p>
                  <p className="text-sm text-muted-foreground">Stock: 50kg</p>
                </div>
              </div>
            </div>
          ))}

          {/* Add Product Card */}
          <button className="bg-muted/30 border-2 border-dashed border-border rounded-2xl flex flex-col items-center justify-center p-8 hover:border-primary hover:bg-ocean-light/30 transition-all min-h-[280px]">
            <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-3">
              <Plus className="h-7 w-7 text-primary" />
            </div>
            <p className="font-semibold">Add New Product</p>
            <p className="text-sm text-muted-foreground">List your fresh catch</p>
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default SellerProducts;
