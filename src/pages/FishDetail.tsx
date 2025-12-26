import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Star, MapPin, Shield, Plus, Minus, ShoppingCart, Heart, Share2, Truck, Clock, Check } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import FishCard from '@/components/fish/FishCard';
import { sampleFish, formatTZS } from '@/data/fishData';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/hooks/use-toast';

const FishDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart, items } = useCart();
  const { toast } = useToast();
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);

  const fish = sampleFish.find((f) => f.id === id);
  const isInCart = items.some((item) => item.fish.id === id);
  const relatedFish = sampleFish.filter((f) => f.category === fish?.category && f.id !== id).slice(0, 4);

  if (!fish) {
    return (
      <Layout>
        <div className="container py-20 text-center">
          <h1 className="text-2xl font-bold mb-4">Fish not found</h1>
          <Link to="/marketplace">
            <Button>Back to Marketplace</Button>
          </Link>
        </div>
      </Layout>
    );
  }

  const handleAddToCart = () => {
    addToCart(fish, quantity);
    toast({
      title: "Added to cart!",
      description: `${quantity}${fish.unit} of ${fish.name} added to your cart.`,
    });
  };

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
                  src={fish.image}
                  alt={fish.name}
                  className="w-full h-full object-cover"
                />
                {/* Badges */}
                <div className="absolute top-4 left-4 flex gap-2">
                  {fish.inStock ? (
                    <span className="px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-sm font-medium flex items-center gap-1">
                      <Check className="h-3 w-3" />
                      In Stock
                    </span>
                  ) : (
                    <span className="px-3 py-1 rounded-full bg-destructive text-destructive-foreground text-sm font-medium">
                      Sold Out
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
              <div className="flex gap-3">
                {[fish.image, fish.image, fish.image].map((img, i) => (
                  <button
                    key={i}
                    className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                      i === 0 ? 'border-primary' : 'border-transparent hover:border-border'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Details */}
            <div className="space-y-6">
              {/* Header */}
              <div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                  <span className="capitalize">{fish.category} Fish</span>
                  <span>•</span>
                  <span>Caught: {new Date(fish.catchDate).toLocaleDateString()}</span>
                </div>
                <h1 className="text-3xl md:text-4xl font-bold mb-1">{fish.name}</h1>
                <p className="text-xl text-primary">{fish.nameSwahili}</p>
              </div>

              {/* Rating & Supplier */}
              <div className="flex items-center gap-4 flex-wrap">
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(fish.supplier.rating)
                          ? 'fill-accent text-accent'
                          : 'text-muted'
                      }`}
                    />
                  ))}
                  <span className="ml-2 font-semibold">{fish.supplier.rating}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  {fish.supplier.location}
                </div>
              </div>

              {/* Price */}
              <div className="bg-ocean-light rounded-2xl p-6">
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-4xl font-bold text-primary">
                    {formatTZS(fish.price)}
                  </span>
                  <span className="text-muted-foreground">per {fish.unit}</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Price includes delivery within Dar es Salaam
                </p>
              </div>

              {/* Description */}
              <div>
                <h3 className="font-semibold mb-2">Description</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {fish.description}
                </p>
              </div>

              {/* Nutritional Info */}
              <div>
                <h3 className="font-semibold mb-3">Nutritional Information</h3>
                <div className="grid grid-cols-3 gap-4">
                  {Object.entries(fish.nutritionalInfo).map(([key, value]) => (
                    <div key={key} className="bg-muted rounded-xl p-4 text-center">
                      <p className="text-sm text-muted-foreground capitalize">{key}</p>
                      <p className="font-semibold">{value}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quantity & Add to Cart */}
              <div className="space-y-4 pt-4 border-t border-border">
                <div className="flex items-center gap-4">
                  <span className="font-medium">Quantity ({fish.unit}):</span>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-12 text-center font-semibold text-lg">{quantity}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setQuantity(quantity + 1)}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <span className="text-muted-foreground ml-auto">
                    Total: <span className="font-bold text-foreground">{formatTZS(fish.price * quantity)}</span>
                  </span>
                </div>

                <div className="flex gap-4">
                  <Button
                    variant="ocean"
                    size="lg"
                    className="flex-1"
                    onClick={handleAddToCart}
                    disabled={!fish.inStock}
                  >
                    <ShoppingCart className="h-5 w-5" />
                    {isInCart ? 'Add More' : 'Add to Cart'}
                  </Button>
                  <Button variant="outline" size="lg">
                    Buy Now
                  </Button>
                </div>
              </div>

              {/* Delivery Info */}
              <div className="flex items-center gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Truck className="h-4 w-4 text-secondary" />
                  <span>Free delivery in Dar</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-primary" />
                  <span>Same day delivery</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Supplier Info */}
      <section className="py-8 bg-muted/50">
        <div className="container">
          <div className="bg-card border border-border rounded-2xl p-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full ocean-gradient flex items-center justify-center text-primary-foreground font-bold text-xl">
                {fish.supplier.name.charAt(0)}
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-lg">{fish.supplier.name}</h3>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    {fish.supplier.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <Star className="h-3 w-3 fill-accent text-accent" />
                    {fish.supplier.rating} rating
                  </span>
                  <span className="flex items-center gap-1">
                    <Shield className="h-3 w-3 text-secondary" />
                    Verified Supplier
                  </span>
                </div>
              </div>
              <Button variant="outline">View Profile</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Related Fish */}
      {relatedFish.length > 0 && (
        <section className="py-12">
          <div className="container">
            <h2 className="text-2xl font-bold mb-6">Similar Fish</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedFish.map((fish) => (
                <FishCard key={fish.id} fish={fish} />
              ))}
            </div>
          </div>
        </section>
      )}
    </Layout>
  );
};

export default FishDetailPage;
