import React from 'react';
import { Link } from 'react-router-dom';
import { Star, MapPin, Plus, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

interface FishCardProps {
  fish: Product;
  variant?: 'default' | 'compact';
}

const FishCard: React.FC<FishCardProps> = ({ fish, variant = 'default' }) => {
  const [isInCart, setIsInCart] = React.useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsInCart(true);
    toast.success(`${fish.name} added to cart`);
  };

  if (variant === 'compact') {
    return (
      <Link to={`/fish/${fish.id}`} className="block">
        <div className="fish-card bg-card border border-border p-3 flex gap-3">
          <img
            src={fish.images?.[0] || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200'}
            alt={fish.name}
            className="w-20 h-20 object-cover rounded-lg"
          />
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <div>
                <h3 className="font-semibold text-sm truncate">{fish.name}</h3>
                {fish.rating && fish.rating > 0 && (
                  <div className="flex items-center gap-1 mt-0.5">
                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                    <span className="text-xs font-medium">{fish.rating.toFixed(1)}</span>
                    {fish.total_reviews && fish.total_reviews > 0 && (
                      <span className="text-xs text-muted-foreground">({fish.total_reviews})</span>
                    )}
                  </div>
                )}
              </div>
              <span className="text-sm font-bold text-primary whitespace-nowrap">
                {formatPrice(fish.price)}/{fish.unit}
              </span>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link to={`/fish/${fish.id}`} className="block group">
      <div className="fish-card bg-card border border-border overflow-hidden">
        {/* Image */}
        <div className="relative aspect-[4/3] overflow-hidden">
          <img
            src={fish.images?.[0] || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400'}
            alt={fish.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent" />

          {/* Stock Badge */}
          <div className={cn(
            "absolute top-3 left-3 px-2 py-1 rounded-full text-xs font-semibold",
            fish.status === 'active' && fish.stock > 0
              ? "bg-secondary text-secondary-foreground"
              : "bg-destructive text-destructive-foreground"
          )}>
            {fish.status === 'active' && fish.stock > 0 ? 'In Stock' : 'Sold Out'}
          </div>

          {/* Price */}
          <div className="absolute bottom-3 left-3 right-3">
            <div className="flex items-end justify-between">
              <div>
                <p className="text-primary-foreground text-lg font-bold">
                  {formatPrice(fish.price)}
                </p>
                <p className="text-primary-foreground/80 text-xs">per {fish.unit}</p>
              </div>

              {/* Add to Cart */}
              <Button
                variant={isInCart(fish.id) ? "fresh" : "ocean"}
                size="icon"
                className="h-10 w-10 rounded-full shadow-lg"
                onClick={handleAddToCart}
                disabled={fish.status !== 'active' || fish.stock === 0}
              >
                {isInCart(fish.id) ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <Plus className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          <div className="flex items-start justify-between gap-2 mb-2">
            <div className="flex-1">
              <h3 className="font-semibold group-hover:text-primary transition-colors">
                {fish.name}
              </h3>
              {fish.description && (
                <p className="text-xs text-muted-foreground line-clamp-1 mt-0.5">
                  {fish.description}
                </p>
              )}
            </div>
            {fish.rating && fish.rating > 0 && (
              <div className="flex items-center gap-1 text-sm">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="font-medium">{fish.rating.toFixed(1)}</span>
              </div>
            )}
          </div>

          <div className="flex items-center justify-between">
            <div className="text-xs text-muted-foreground">
              Stock: {fish.stock} {fish.unit}
            </div>
            {fish.total_reviews && fish.total_reviews > 0 && (
              <span className="text-xs text-muted-foreground">
                {fish.total_reviews} {fish.total_reviews === 1 ? 'review' : 'reviews'}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default FishCard;