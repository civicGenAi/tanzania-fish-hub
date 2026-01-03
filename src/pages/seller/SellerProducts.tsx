import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Package, Plus, Edit, Trash2, Eye, EyeOff, Search, Filter, Loader2, Download, Upload } from 'lucide-react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import SellerSidebar from '@/components/dashboard/SellerSidebar';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/lib/supabase';
import { productsService } from '@/services/products.service';
import { Product } from '@/types/product.types';
import { cn } from '@/lib/utils';

const SellerProducts: React.FC = () => {
  const navigate = useNavigate();
  const { profile } = useAuth();
  const { toast } = useToast();

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [sellerId, setSellerId] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fetchSellerIdAndProducts = async () => {
      if (!profile) return;

      try {
        // Get seller profile ID
        const { data: sellerProfile, error: sellerError } = await supabase
          .from('seller_profiles')
          .select('id')
          .eq('user_id', profile.id)
          .single();

        if (sellerError) throw sellerError;
        if (!sellerProfile) {
          toast({
            title: 'Error',
            description: 'Seller profile not found',
            variant: 'destructive',
          });
          return;
        }

        setSellerId(sellerProfile.id);

        // Fetch products
        const productsList = await productsService.getSellerProducts(sellerProfile.id);
        setProducts(productsList);
      } catch (error) {
        console.error('Error fetching products:', error);
        toast({
          title: 'Error',
          description: 'Failed to load products',
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchSellerIdAndProducts();
  }, [profile, toast]);

  const handleDeleteProduct = async (productId: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return;

    try {
      await productsService.deleteProduct(productId);
      setProducts(products.filter(p => p.id !== productId));
      toast({
        title: 'Success',
        description: 'Product deleted successfully',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete product',
        variant: 'destructive',
      });
    }
  };

  const handleToggleStatus = async (product: Product) => {
    try {
      const newStatus = product.status === 'active' ? 'inactive' : 'active';
      await productsService.updateProduct(product.id, { status: newStatus });

      setProducts(products.map(p =>
        p.id === product.id ? { ...p, status: newStatus } : p
      ));

      toast({
        title: 'Success',
        description: `Product ${newStatus === 'active' ? 'activated' : 'deactivated'}`,
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update product status',
        variant: 'destructive',
      });
    }
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-TZ', {
      style: 'currency',
      currency: 'TZS',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const handleExportCSV = () => {
    if (products.length === 0) {
      toast({
        title: 'No products',
        description: 'You have no products to export',
        variant: 'default',
      });
      return;
    }

    const headers = ['Name', 'SKU', 'Price', 'Stock', 'Unit', 'Status', 'Category ID', 'Description'];
    const rows = products.map(p => [
      p.name,
      p.sku,
      p.price,
      p.stock,
      p.unit,
      p.status,
      p.category_id,
      p.description || '',
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `products-export-${Date.now()}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);

    toast({
      title: 'Success',
      description: `Exported ${products.length} products`,
    });
  };

  const handleImportCSV = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !sellerId) return;

    try {
      const text = await file.text();
      const lines = text.split('\n').filter(line => line.trim());

      if (lines.length < 2) {
        toast({
          title: 'Error',
          description: 'CSV file is empty',
          variant: 'destructive',
        });
        return;
      }

      const headers = lines[0].split(',').map(h => h.replace(/"/g, '').trim());
      const imported: Product[] = [];

      for (let i = 1; i < lines.length; i++) {
        const values = lines[i].split(',').map(v => v.replace(/"/g, '').trim());

        if (values.length < 6) continue;

        const name = values[0];
        const price = parseFloat(values[2]);
        const stock = parseInt(values[3]);
        const unit = values[4] as any;
        const category_id = values[6];

        if (!name || !price || !stock || !category_id) continue;

        const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
        const sku = `${slug}-${Date.now()}-${i}`.toUpperCase();

        const product = await productsService.createProduct(sellerId, {
          name,
          slug,
          sku,
          price,
          stock,
          unit: unit || 'kg',
          category_id,
          description: values[7] || undefined,
        });

        imported.push(product);
      }

      setProducts([...products, ...imported]);

      toast({
        title: 'Success',
        description: `Imported ${imported.length} products`,
      });

      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (error) {
      console.error('Error importing CSV:', error);
      toast({
        title: 'Error',
        description: 'Failed to import products',
        variant: 'destructive',
      });
    }
  };

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
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleExportCSV} disabled={products.length === 0}>
              <Download className="h-4 w-4 mr-2" />
              Export CSV
            </Button>
            <Button variant="outline" onClick={handleImportCSV}>
              <Upload className="h-4 w-4 mr-2" />
              Import CSV
            </Button>
            <input
              ref={fileInputRef}
              type="file"
              accept=".csv"
              onChange={handleFileChange}
              className="hidden"
            />
            <Button variant="ocean" onClick={() => navigate('/seller/products/new')}>
              <Plus className="h-4 w-4 mr-2" />
              Add Product
            </Button>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        )}

        {/* Empty State */}
        {!loading && filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <Package className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No products found</h3>
            <p className="text-muted-foreground mb-4">
              {searchQuery ? 'Try a different search term' : 'Start by adding your first product'}
            </p>
            {!searchQuery && (
              <Button variant="ocean" onClick={() => navigate('/seller/products/new')}>
                <Plus className="h-4 w-4" />
                Add Your First Product
              </Button>
            )}
          </div>
        )}

        {/* Products Grid */}
        {!loading && filteredProducts.length > 0 && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredProducts.map((product) => (
              <div key={product.id} className="bg-card border border-border rounded-2xl overflow-hidden group">
                <div className="relative">
                  <img
                    src={product.images?.[0] || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400'}
                    alt={product.name}
                    className="w-full h-40 object-cover"
                  />
                  <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 bg-background/90 backdrop-blur-sm"
                      onClick={() => navigate(`/seller/products/${product.id}/edit`)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 bg-background/90 backdrop-blur-sm text-destructive"
                      onClick={() => handleDeleteProduct(product.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="absolute bottom-2 left-2">
                    <span className={cn(
                      "px-2 py-1 rounded-full text-xs font-medium",
                      product.status === 'active' && product.stock > 0
                        ? 'bg-secondary text-secondary-foreground'
                        : 'bg-muted text-muted-foreground'
                    )}>
                      {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="flex-1">
                      <h3 className="font-semibold">{product.name}</h3>
                      {product.description && (
                        <p className="text-sm text-muted-foreground line-clamp-1">{product.description}</p>
                      )}
                    </div>
                    <button
                      onClick={() => handleToggleStatus(product)}
                      className={cn(
                        "p-1.5 rounded-full transition-colors",
                        product.status === 'active'
                          ? 'bg-green-light text-secondary'
                          : 'bg-muted text-muted-foreground'
                      )}
                    >
                      {product.status === 'active' ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                    </button>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="font-bold text-primary">{formatPrice(product.price)}/{product.unit}</p>
                    <p className="text-sm text-muted-foreground">Stock: {product.stock}{product.unit}</p>
                  </div>
                </div>
              </div>
            ))}

            {/* Add Product Card */}
            <button
              onClick={() => navigate('/seller/products/new')}
              className="bg-muted/30 border-2 border-dashed border-border rounded-2xl flex flex-col items-center justify-center p-8 hover:border-primary hover:bg-ocean-light/30 transition-all min-h-[280px]"
            >
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                <Plus className="h-7 w-7 text-primary" />
              </div>
              <p className="font-semibold">Add New Product</p>
              <p className="text-sm text-muted-foreground">List your fresh catch</p>
            </button>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default SellerProducts;
