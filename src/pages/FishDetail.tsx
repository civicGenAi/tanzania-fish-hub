import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Star, MapPin, Shield, Plus, Minus, ShoppingCart, Heart, Share2, Truck, Clock, Check, Loader2 } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useCart } from '@/contexts/CartContext';
import { productsService } from '@/services/products.service';
import { Product, ProductWithDetails } from '@/types/product.types';

const FishDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { addToCart, isInCart } = useCart();

  const [product, setProduct] = useState<ProductWithDetails | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;

      try {
        setLoading(true);
        const productData = await productsService.getProductById(id);

        if (productData) {
          setProduct(productData);
          setQuantity(productData.min_order_quantity);

          // Fetch related products from same category
          if (productData.category_id) {
            const related = await productsService.getProducts({
              category_id: productData.category_id,
              status: 'active',
              in_stock: true,
            });
            setRelatedProducts(related.filter(p => p.id !== id).slice(0, 4));
          }
        }
      } catch (error) {
        console.error('Error fetching product:', error);
        toast({
          title: 'Error',
          description: 'Failed to load product',
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id, toast]);

  const handleAddToCart = () => {
    if (!product) return;

    addToCart(product, quantity);
    toast({
      title: "Added to cart!",
      description: `${quantity} ${product.unit} of ${product.name} added to your cart.`,
    });
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-TZ', {
      style: 'currency',
      currency: 'TZS',
      minimumFractionDigits: 0,
    }).format(price);
  };

  if (loading) {
    return (
      <Layout>
        <div className="container py-20 flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </Layout>
    );
  }

  if (!product) {
    return (
      <Layout>
        <div className="container py-20 text-center">
          <h1 className="text-2xl font-bold mb-4">Product not found</h1>
          <Link to="/marketplace">
            <Button>Back to Marketplace</Button>
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Breadcrumb */}
      <div className="bg-muted/50 py-4">
        <div className="container">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Marketplace
          </button>
        </div>
      </div>

      {/* Main Content */}
      <section className="py-8 md:py-12">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Image Gallery */}
            <div className="space-y-4">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-muted">
                <img
                  src={product.image_url || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=800'}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                {/* Badges */}
                <div className="absolute top-4 left-4 flex gap-2">
                  {product.status === 'active' && product.stock_quantity > 0 ? (
                    <span className="px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-sm font-medium flex items-center gap-1">
                      <Check className="h-3 w-3" />
                      In Stock
                    </span>
                  ) : (
                    <span className="px-3 py-1 rounded-full bg-destructive text-destructive-foreground text-sm font-medium">
                      Out of Stock
                    </span>
                  )}
                  <span className="px-3 py-1 rounded-full bg-primary text-primary-foreground text-sm font-medium flex items-center gap-1">
                    <Shield className="h-3 w-3" />
                    Verified
                  </span>
                </div>

                {/* Actions */}
                <div className="absolute top-4 right-4 flex gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="bg-background/80 backdrop-blur-sm hover:bg-background"
                    onClick={() => setIsFavorite(!isFavorite)}
                  >
                    <Heart className={`h-5 w-5 ${isFavorite ? 'fill-destructive text-destructive' : ''}`} />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="bg-background/80 backdrop-blur-sm hover:bg-background"
                  >
                    <Share2 className="h-5 w-5" />
                  </Button>
                </div>
              </div>

              {/* Thumbnails */}
              {product.images && product.images.length > 0 && (
                <div className="flex gap-3">
                  {product.images.slice(0, 4).map((img, i) => (
                    <button
                      key={img.id}
                      className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                        i === 0 ? 'border-primary' : 'border-transparent hover:border-border'
                      }`}
                    >
                      <img src={img.image_url} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Details */}
            <div className="space-y-6">
              {/* Header */}
              <div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                  {product.category && <span className="capitalize">{product.category.name}</span>}
                  <span>•</span>
                  <span>Listed: {new Date(product.created_at).toLocaleDateString()}</span>
                </div>
                <h1 className="text-3xl md:text-4xl font-bold mb-1">{product.name}</h1>
              </div>

              {/* Supplier */}
              {product.seller && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>Sold by {product.seller.business_name}</span>
                </div>
              )}

              {/* Price */}
              <div className="bg-ocean-light rounded-2xl p-6">
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-4xl font-bold text-primary">
                    {formatPrice(product.price)}
                  </span>
                  <span className="text-muted-foreground">per {product.unit}</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  {product.stock_quantity} {product.unit} available
                </p>
              </div>

              {/* Description */}
              {product.description && (
                <div>
                  <h3 className="font-semibold mb-2">Description</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {product.description}
                  </p>
                </div>
              )}

              {/* Product Details */}
              <div>
                <h3 className="font-semibold mb-3">Product Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-muted rounded-xl p-4">
                    <p className="text-sm text-muted-foreground">Unit</p>
                    <p className="font-semibold capitalize">{product.unit}</p>
                  </div>
                  <div className="bg-muted rounded-xl p-4">
                    <p className="text-sm text-muted-foreground">Min Order</p>
                    <p className="font-semibold">{product.min_order_quantity} {product.unit}</p>
                  </div>
                  <div className="bg-muted rounded-xl p-4">
                    <p className="text-sm text-muted-foreground">Status</p>
                    <p className="font-semibold capitalize">{product.status}</p>
                  </div>
                  <div className="bg-muted rounded-xl p-4">
                    <p className="text-sm text-muted-foreground">Stock</p>
                    <p className="font-semibold">{product.stock_quantity} {product.unit}</p>
                  </div>
                </div>
              </div>

              {/* Quantity & Add to Cart */}
              <div className="space-y-4 pt-4 border-t border-border">
                <div className="flex items-center gap-4">
                  <span className="font-medium">Quantity ({product.unit}):</span>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setQuantity(Math.max(product.min_order_quantity, quantity - 1))}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-12 text-center font-semibold text-lg">{quantity}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setQuantity(Math.min(product.stock_quantity, quantity + 1))}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <span className="text-muted-foreground ml-auto">
                    Total: <span className="font-bold text-foreground">{formatPrice(product.price * quantity)}</span>
                  </span>
                </div>

                <div className="flex gap-4">
                  <Button
                    variant="ocean"
                    size="lg"
                    className="flex-1"
                    onClick={handleAddToCart}
                    disabled={product.status !== 'active' || product.stock_quantity === 0}
                  >
                    <ShoppingCart className="h-5 w-5" />
                    {isInCart(product.id) ? 'Add More' : 'Add to Cart'}
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    disabled={product.status !== 'active' || product.stock_quantity === 0}
                  >
                    Buy Now
                  </Button>
                </div>
              </div>

              {/* Delivery Info */}
              <div className="flex items-center gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Truck className="h-4 w-4 text-secondary" />
                  <span>Fast delivery</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-primary" />
                  <span>Quality guaranteed</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Supplier Info */}
      {product.seller && (
        <section className="py-8 bg-muted/50">
          <div className="container">
            <div className="bg-card border border-border rounded-2xl p-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full ocean-gradient flex items-center justify-center text-primary-foreground font-bold text-xl">
                  {product.seller.business_name.charAt(0)}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{product.seller.business_name}</h3>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Shield className="h-3 w-3 text-secondary" />
                      Verified Seller
                    </span>
                  </div>
                </div>
                <Button variant="outline">View Profile</Button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="py-12">
          <div className="container">
            <h2 className="text-2xl font-bold mb-6">Similar Products</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <Link
                  key={relatedProduct.id}
                  to={`/fish/${relatedProduct.id}`}
                  className="bg-card border border-border rounded-2xl overflow-hidden hover:shadow-ocean transition-all group"
                >
                  <div className="relative aspect-video overflow-hidden">
                    <img
                      src={relatedProduct.image_url || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400'}
                      alt={relatedProduct.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                    {relatedProduct.stock_quantity > 0 && (
                      <div className="absolute top-2 right-2 px-2 py-1 rounded-full bg-secondary text-secondary-foreground text-xs font-medium">
                        In Stock
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold mb-1 group-hover:text-primary transition-colors">
                      {relatedProduct.name}
                    </h3>
                    {relatedProduct.description && (
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                        {relatedProduct.description}
                      </p>
                    )}
                    <div className="flex items-center justify-between">
                      <p className="font-bold text-primary">
                        {formatPrice(relatedProduct.price)}/{relatedProduct.unit}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </Layout>
  );
};

export default FishDetailPage;
