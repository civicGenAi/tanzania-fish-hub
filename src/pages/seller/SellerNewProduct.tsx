import React, { useState } from 'react';
import { Upload, Camera, Plus, X } from 'lucide-react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import SellerSidebar from '@/components/dashboard/SellerSidebar';
import { Button } from '@/components/ui/button';
import { fishCategories } from '@/data/fishData';

const SellerNewProduct: React.FC = () => {
  const [images, setImages] = useState<string[]>([]);

  return (
    <DashboardLayout 
      sidebar={<SellerSidebar />}
      title="Add New Product"
      subtitle="List your fresh catch for sale"
    >
      <div className="max-w-3xl space-y-6">
        {/* Image Upload */}
        <div className="bg-card border border-border rounded-2xl p-6">
          <h3 className="font-semibold mb-4">Product Images</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {images.map((img, i) => (
              <div key={i} className="relative aspect-square rounded-xl overflow-hidden">
                <img src={img} alt="" className="w-full h-full object-cover" />
                <button className="absolute top-2 right-2 p-1 rounded-full bg-background/90">
                  <X className="h-4 w-4" />
                </button>
              </div>
            ))}
            <button className="aspect-square border-2 border-dashed border-border rounded-xl flex flex-col items-center justify-center hover:border-primary hover:bg-ocean-light/30 transition-all">
              <Camera className="h-6 w-6 text-muted-foreground mb-2" />
              <span className="text-sm text-muted-foreground">Add Photo</span>
            </button>
          </div>
        </div>

        {/* Basic Info */}
        <div className="bg-card border border-border rounded-2xl p-6">
          <h3 className="font-semibold mb-4">Basic Information</h3>
          <div className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Product Name (English)</label>
                <input 
                  type="text"
                  placeholder="e.g., Fresh Tilapia"
                  className="w-full px-4 py-2.5 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Jina la Bidhaa (Swahili)</label>
                <input 
                  type="text"
                  placeholder="mfano, Sato Safi"
                  className="w-full px-4 py-2.5 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Category</label>
              <select className="w-full px-4 py-2.5 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary">
                <option value="">Select category</option>
                {fishCategories.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Description</label>
              <textarea 
                rows={4}
                placeholder="Describe your product..."
                className="w-full px-4 py-2.5 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary resize-none"
              />
            </div>
          </div>
        </div>

        {/* Pricing */}
        <div className="bg-card border border-border rounded-2xl p-6">
          <h3 className="font-semibold mb-4">Pricing & Stock</h3>
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Price (TZS)</label>
              <input 
                type="number"
                placeholder="15000"
                className="w-full px-4 py-2.5 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Unit</label>
              <select className="w-full px-4 py-2.5 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary">
                <option value="kg">Per Kilogram (kg)</option>
                <option value="piece">Per Piece</option>
                <option value="bucket">Per Bucket</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Stock Quantity</label>
              <input 
                type="number"
                placeholder="50"
                className="w-full px-4 py-2.5 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <Button variant="outline" className="flex-1">Save as Draft</Button>
          <Button variant="ocean" className="flex-1">Publish Product</Button>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default SellerNewProduct;
