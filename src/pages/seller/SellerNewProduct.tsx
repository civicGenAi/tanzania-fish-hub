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
    // Enhanced fields for international market
    scientific_name: '',
    product_type: '', // e.g., Whole, Fillet, Steaks
    source: '', // e.g., Farmed, Wild-caught
    weight_per_unit: '',
    size_grade: '', // e.g., Small, Medium, Large
    harvest_date: '',
    expiry_date: '',
    storage_condition: '',
    processing_status: '',
    origin_location: '',
    supplier_name: '',
    supplier_contact: '',
    quality_grade: '', // e.g., A, B, C
    notes: '',
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

      // Convert empty date strings to null
      const harvestDate = formData.harvest_date || null;
      const expiryDate = formData.expiry_date || null;
      const weightPerUnit = formData.weight_per_unit ? parseFloat(formData.weight_per_unit) : null;

      // Create product with enhanced fields as actual columns
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
        // Enhanced fields as actual database columns
        scientific_name: formData.scientific_name || undefined,
        product_type: formData.product_type || undefined,
        source: formData.source || undefined,
        weight_per_unit: weightPerUnit,
        size_grade: formData.size_grade || undefined,
        harvest_date: harvestDate,
        expiry_date: expiryDate,
        storage_condition: formData.storage_condition || undefined,
        processing_status: formData.processing_status || undefined,
        origin_location: formData.origin_location || undefined,
        supplier_name: formData.supplier_name || undefined,
        supplier_contact: formData.supplier_contact || undefined,
        quality_grade: formData.quality_grade || undefined,
        product_notes: formData.notes || undefined,
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

          {/* Product Details (International Market) */}
          <div className="bg-card border border-border rounded-2xl p-6">
            <div className="mb-4">
              <h3 className="font-semibold">Product Details</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Detailed information helps your product reach international markets. The more complete your information, the better!
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Scientific Name</label>
                <Input
                  name="scientific_name"
                  value={formData.scientific_name}
                  onChange={handleChange}
                  placeholder="e.g., Oreochromis niloticus"
                  className="h-12"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Product Type</label>
                <select
                  name="product_type"
                  value={formData.product_type}
                  onChange={handleChange}
                  className="w-full h-12 px-4 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="">Select type</option>
                  <option value="Whole">Whole</option>
                  <option value="Fillet">Fillet</option>
                  <option value="Steaks">Steaks</option>
                  <option value="Portions">Portions</option>
                  <option value="Gutted">Gutted and Cleaned</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Source</label>
                <select
                  name="source"
                  value={formData.source}
                  onChange={handleChange}
                  className="w-full h-12 px-4 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="">Select source</option>
                  <option value="Farmed">Farmed</option>
                  <option value="Wild-caught">Wild-caught</option>
                  <option value="Aquaculture">Aquaculture</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Size Grade</label>
                <select
                  name="size_grade"
                  value={formData.size_grade}
                  onChange={handleChange}
                  className="w-full h-12 px-4 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="">Select grade</option>
                  <option value="Small">Small</option>
                  <option value="Medium">Medium</option>
                  <option value="Large">Large</option>
                  <option value="Extra Large">Extra Large</option>
                  <option value="Jumbo">Jumbo</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Weight per Unit (kg)</label>
                <Input
                  type="number"
                  name="weight_per_unit"
                  value={formData.weight_per_unit}
                  onChange={handleChange}
                  placeholder="e.g., 1.2"
                  step="0.1"
                  min="0"
                  className="h-12"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Quality Grade</label>
                <select
                  name="quality_grade"
                  value={formData.quality_grade}
                  onChange={handleChange}
                  className="w-full h-12 px-4 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="">Select grade</option>
                  <option value="A">Grade A (Premium)</option>
                  <option value="B">Grade B (Standard)</option>
                  <option value="C">Grade C (Economy)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Harvest & Storage */}
          <div className="bg-card border border-border rounded-2xl p-6">
            <h3 className="font-semibold mb-4">Harvest & Storage Information</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Harvest Date</label>
                <Input
                  type="date"
                  name="harvest_date"
                  value={formData.harvest_date}
                  onChange={handleChange}
                  className="h-12"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Expiry / Best Before Date</label>
                <Input
                  type="date"
                  name="expiry_date"
                  value={formData.expiry_date}
                  onChange={handleChange}
                  className="h-12"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Storage Condition</label>
                <Input
                  name="storage_condition"
                  value={formData.storage_condition}
                  onChange={handleChange}
                  placeholder="e.g., Kept on ice (0–4°C)"
                  className="h-12"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Processing Status</label>
                <Input
                  name="processing_status"
                  value={formData.processing_status}
                  onChange={handleChange}
                  placeholder="e.g., Fresh, gutted and cleaned"
                  className="h-12"
                />
              </div>
            </div>
          </div>

          {/* Supplier Information */}
          <div className="bg-card border border-border rounded-2xl p-6">
            <h3 className="font-semibold mb-4">Supplier & Origin</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Origin Location</label>
                <Input
                  name="origin_location"
                  value={formData.origin_location}
                  onChange={handleChange}
                  placeholder="e.g., Mwanza, Lake Victoria"
                  className="h-12"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Supplier Name</label>
                <Input
                  name="supplier_name"
                  value={formData.supplier_name}
                  onChange={handleChange}
                  placeholder="e.g., LakeFresh Fish Farm"
                  className="h-12"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-2">Supplier Contact</label>
                <Input
                  name="supplier_contact"
                  value={formData.supplier_contact}
                  onChange={handleChange}
                  placeholder="e.g., +255 XXX XXX XXX"
                  className="h-12"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-2">Additional Notes</label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  rows={3}
                  placeholder="e.g., No preservatives used, certified organic, etc."
                  className="w-full px-4 py-2.5 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary resize-none"
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
