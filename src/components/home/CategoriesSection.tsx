import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { fishCategories } from '@/data/fishData';
import { cn } from '@/lib/utils';

const categoryImages = {
  lake: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=300&fit=crop',
  ocean: 'https://images.unsplash.com/photo-1559737558-2f5a35f4523b?w=400&h=300&fit=crop',
  ornamental: 'https://images.unsplash.com/photo-1520302519878-3c3691b52c9c?w=400&h=300&fit=crop',
};

const categoryColors = {
  lake: 'from-blue-500 to-cyan-500',
  ocean: 'from-indigo-500 to-blue-500',
  ornamental: 'from-pink-500 to-purple-500',
};

const CategoriesSection: React.FC = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Explore Our Categories
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            From the depths of Lake Victoria to the warm waters of the Indian Ocean, 
            discover Tanzania's finest fish
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {fishCategories.map((category, index) => (
            <Link
              key={category.id}
              to={`/marketplace?category=${category.id}`}
              className="group relative overflow-hidden rounded-2xl aspect-[4/3] animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Background Image */}
              <img
                src={categoryImages[category.id as keyof typeof categoryImages]}
                alt={category.name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              
              {/* Gradient Overlay */}
              <div className={cn(
                "absolute inset-0 bg-gradient-to-t opacity-80",
                categoryColors[category.id as keyof typeof categoryColors]
              )} />
              
              {/* Content */}
              <div className="absolute inset-0 p-6 flex flex-col justify-end text-primary-foreground">
                <span className="text-4xl mb-3">{category.icon}</span>
                <h3 className="text-2xl font-bold mb-1">{category.name}</h3>
                <p className="text-primary-foreground/80 text-sm mb-4">
                  {category.nameSwahili}
                </p>
                <div className="flex items-center gap-2 text-sm font-medium opacity-0 transform translate-y-4 transition-all group-hover:opacity-100 group-hover:translate-y-0">
                  <span>Browse Collection</span>
                  <ArrowRight className="h-4 w-4" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;
