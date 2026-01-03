import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, Camera, X, Loader2, ArrowLeft } from 'lucide-react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import SellerSidebar from '@/components/dashboard/SellerSidebar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/lib/supabase';
import { productsService } from '@/services/products.service';
import { ProductCategory, ProductUnit } from '@/types/product.types';

const SellerNewProduct: React.FC = () => {
  const navigate = useNavigate();
  const { profile } = useAuth();
  const { toast } = useToast();

  const [categories, setCategories] = useState<ProductCategory[]>([]);
  const [sellerId, setSellerId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category_id: '',
    price: '',
    stock: '',
    unit: 'kg' as ProductUnit,
    min_order_quantity: '1',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        setInitialLoading(true);

        // Get seller ID
        if (!profile) {
          setInitialLoading(false);
          return;
        }

        const { data: sellerProfile, error: sellerError } = await supabase
          .from('seller_profiles')
          .select('id')
          .eq('user_id', profile.id)
          .single();

        if (sellerError) throw sellerError;
        setSellerId(sellerProfile.id);

        // Get categories
        const cats = await productsService.getCategories();
        setCategories(cats);
      } catch (error) {
        console.error('Error fetching data:', error);
        toast({
          title: 'Error',
          description: 'Failed to load form data',
          variant: 'destructive',
        });
      } finally {
        setInitialLoading(false);
      }
    };

    fetchData();
  }, [profile, toast]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast({
        title: 'Error',
        description: 'Please select an image file',
        variant: 'destructive',
      });
      return;
    }

    setImageFile(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Product name is required';
    }

    if (!formData.category_id) {
      newErrors.category_id = 'Please select a category';
    }

    if (!formData.price || parseFloat(formData.price) <= 0) {
      newErrors.price = 'Please enter a valid price';
    }

    if (!formData.stock || parseInt(formData.stock) < 0) {
      newErrors.stock = 'Please enter a valid stock quantity';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      toast({
        title: 'Validation Error',
        description: 'Please fill in all required fields correctly',
        variant: 'destructive',
      });
      return;
    }

    if (!sellerId) {
      toast({
        title: 'Error',
        description: 'Seller profile not found. Please try refreshing the page.',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);

    try {
      let imageUrl: string | undefined;

      // Upload image if provided
      if (imageFile) {
        try {
          const tempId = `temp-${Date.now()}`;
          imageUrl = await productsService.uploadProductImage(imageFile, tempId);
        } catch (uploadError) {
          console.error('Error uploading image:', uploadError);
          toast({
            title: 'Warning',
            description: 'Product will be created without image. Please create "product-images" bucket in Supabase Storage.',
            variant: 'default',
          });
        }
      }

      // Generate slug and SKU
      const slug = formData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
      const sku = `${slug}-${Date.now()}`.toUpperCase();

      // Create product
      const product = await productsService.createProduct(sellerId, {
        name: formData.name,
        slug,
        sku,
        description: formData.description || undefined,
        category_id: formData.category_id,
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock),
        unit: formData.unit,
        min_order_quantity: parseInt(formData.min_order_quantity),
        images: imageUrl ? [imageUrl] : [],
      });

      toast({
        title: 'Success',
        description: imageUrl ? 'Product created successfully' : 'Product created successfully (without image)',
      });

      navigate('/seller/products');
    } catch (error) {
      console.error('Error creating product:', error);
      toast({
        title: 'Error',
        description: 'Failed to create product',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  return (
    <DashboardLayout
      sidebar={<SellerSidebar />}
      title="Add New Product"
      subtitle="List your fresh catch for sale"
    >
      <div className="max-w-3xl">
        <Button
          variant="ghost"
          onClick={() => navigate('/seller/products')}
          className="mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Products
        </Button>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Image Upload */}
          <div className="bg-card border border-border rounded-2xl p-6">
            <h3 className="font-semibold mb-4">Product Image</h3>
            <div className="flex flex-col items-center gap-4">
              {imagePreview ? (
                <div className="relative w-full max-w-md aspect-video rounded-xl overflow-hidden">
                  <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={() => {
                      setImageFile(null);
                      setImagePreview(null);
                    }}
                    className="absolute top-2 right-2 p-2 rounded-full bg-background/90 backdrop-blur-sm hover:bg-background"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ) : (
                <label className="w-full max-w-md aspect-video border-2 border-dashed border-border rounded-xl flex flex-col items-center justify-center hover:border-primary hover:bg-ocean-light/30 transition-all cursor-pointer">
                  <Camera className="h-12 w-12 text-muted-foreground mb-2" />
                  <span className="text-sm text-muted-foreground mb-1">Click to upload image</span>
                  <span className="text-xs text-muted-foreground">PNG, JPG up to 5MB</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
              )}
            </div>
          </div>

          {/* Basic Info */}
          <div className="bg-card border border-border rounded-2xl p-6">
            <h3 className="font-semibold mb-4">Basic Information</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Product Name <span className="text-red-500">*</span>
                </label>
                <Input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g., Fresh Tilapia"
                  className="h-12"
                />
                {errors.name && <p className="text-sm text-red-600 mt-1">{errors.name}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Category <span className="text-red-500">*</span>
                </label>
                <select
                  name="category_id"
                  value={formData.category_id}
                  onChange={handleChange}
                  className="w-full h-12 px-4 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="">Select category</option>
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
                {errors.category_id && <p className="text-sm text-red-600 mt-1">{errors.category_id}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Describe your product..."
                  className="w-full px-4 py-2.5 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                />
              </div>
            </div>
          </div>

          {/* Pricing & Stock */}
          <div className="bg-card border border-border rounded-2xl p-6">
            <h3 className="font-semibold mb-4">Pricing & Stock</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Price (TZS) <span className="text-red-500">*</span>
                </label>
                <Input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="15000"
                  min="0"
                  step="100"
                  className="h-12"
                />
                {errors.price && <p className="text-sm text-red-600 mt-1">{errors.price}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Unit <span className="text-red-500">*</span>
                </label>
                <select
                  name="unit"
                  value={formData.unit}
                  onChange={handleChange}
                  className="w-full h-12 px-4 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="kg">Per Kilogram (kg)</option>
                  <option value="piece">Per Piece</option>
                  <option value="dozen">Per Dozen</option>
                  <option value="bundle">Per Bundle</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Stock Quantity <span className="text-red-500">*</span>
                </label>
                <Input
                  type="number"
                  name="stock"
                  value={formData.stock}
                  onChange={handleChange}
                  placeholder="50"
                  min="0"
                  className="h-12"
                />
                {errors.stock && <p className="text-sm text-red-600 mt-1">{errors.stock}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Minimum Order Quantity
                </label>
                <Input
                  type="number"
                  name="min_order_quantity"
                  value={formData.min_order_quantity}
                  onChange={handleChange}
                  placeholder="1"
                  min="1"
                  className="h-12"
                />
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              onClick={() => navigate('/seller/products')}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="ocean"
              className="flex-1"
              disabled={loading || initialLoading || !sellerId}
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Creating...
                </>
              ) : initialLoading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Loading...
                </>
              ) : (
                'Create Product'
              )}
            </Button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
};

export default SellerNewProduct;
