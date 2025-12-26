import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import FishCard from '@/components/fish/FishCard';
import { sampleFish } from '@/data/fishData';

const FeaturedFishSection: React.FC = () => {
  const featuredFish = sampleFish.filter((fish) => fish.inStock).slice(0, 4);

  return (
    <section className="py-20 bg-background">
      <div className="container">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-2">
              Today's Fresh Catch
            </h2>
            <p className="text-muted-foreground">
              Handpicked selections from our top-rated suppliers
            </p>
          </div>
          <Link to="/marketplace">
            <Button variant="outline" className="group">
              View All Fish
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>

        {/* Fish Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredFish.map((fish, index) => (
            <div
              key={fish.id}
              className="animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <FishCard fish={fish} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedFishSection;
