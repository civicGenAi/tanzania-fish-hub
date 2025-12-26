import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, SlidersHorizontal, MapPin, Star, X } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import FishCard from '@/components/fish/FishCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { sampleFish, fishCategories, locations } from '@/data/fishData';
import { cn } from '@/lib/utils';

const MarketplacePage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100000]);

  const filteredFish = sampleFish.filter((fish) => {
    const matchesSearch = 
      fish.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      fish.nameSwahili.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = !selectedCategory || fish.category === selectedCategory;
    const matchesLocation = !selectedLocation || fish.supplier.location.includes(selectedLocation);
    const matchesPrice = fish.price >= priceRange[0] && fish.price <= priceRange[1];

    return matchesSearch && matchesCategory && matchesLocation && matchesPrice;
  });

  const clearFilters = () => {
    setSelectedCategory(null);
    setSelectedLocation(null);
    setPriceRange([0, 100000]);
    setSearchQuery('');
  };

  const hasActiveFilters = selectedCategory || selectedLocation || searchQuery;

  return (
    <Layout>
      {/* Hero */}
      <section className="hero-gradient py-12 md:py-20">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Fresh Fish Marketplace
            </h1>
            <p className="text-muted-foreground mb-8">
              Discover the freshest catch from Tanzania's lakes and oceans
            </p>

            {/* Search Bar */}
            <div className="relative max-w-xl mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search for fish... (e.g., Tilapia, Sangara, Tuna)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-4 h-14 text-base rounded-2xl border-2 border-border focus:border-primary shadow-ocean"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-8">
        <div className="container">
          {/* Filters Row */}
          <div className="flex flex-wrap items-center gap-4 mb-8">
            {/* Category Pills */}
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => setSelectedCategory(null)}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium transition-all",
                  !selectedCategory
                    ? "ocean-gradient text-primary-foreground shadow-ocean"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                )}
              >
                All Fish
              </button>
              {fishCategories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={cn(
                    "px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2",
                    selectedCategory === category.id
                      ? "ocean-gradient text-primary-foreground shadow-ocean"
                      : "bg-muted text-muted-foreground hover:bg-muted/80"
                  )}
                >
                  <span>{category.icon}</span>
                  <span className="hidden sm:inline">{category.name}</span>
                </button>
              ))}
            </div>

            {/* Filter Button */}
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowFilters(!showFilters)}
              className="ml-auto"
            >
              <SlidersHorizontal className="h-4 w-4" />
              Filters
            </Button>
          </div>

          {/* Expanded Filters */}
          {showFilters && (
            <div className="bg-card border border-border rounded-2xl p-6 mb-8 animate-slide-up">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">Filter Options</h3>
                {hasActiveFilters && (
                  <Button variant="ghost" size="sm" onClick={clearFilters}>
                    <X className="h-4 w-4 mr-1" />
                    Clear All
                  </Button>
                )}
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Location Filter */}
                <div>
                  <label className="text-sm font-medium mb-2 block flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-primary" />
                    Location
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {locations.slice(0, 6).map((location) => (
                      <button
                        key={location}
                        onClick={() => setSelectedLocation(
                          selectedLocation === location ? null : location
                        )}
                        className={cn(
                          "px-3 py-1.5 rounded-full text-xs font-medium transition-all",
                          selectedLocation === location
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted text-muted-foreground hover:bg-muted/80"
                        )}
                      >
                        {location.split(',')[0]}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Rating Filter */}
                <div>
                  <label className="text-sm font-medium mb-2 block flex items-center gap-2">
                    <Star className="h-4 w-4 text-accent" />
                    Minimum Rating
                  </label>
                  <div className="flex items-center gap-2">
                    {[4, 4.5, 5].map((rating) => (
                      <button
                        key={rating}
                        className="px-3 py-1.5 rounded-full text-xs font-medium bg-muted text-muted-foreground hover:bg-accent/20 hover:text-accent transition-all flex items-center gap-1"
                      >
                        <Star className="h-3 w-3 fill-current" />
                        {rating}+
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Results */}
          <div className="mb-6 flex items-center justify-between">
            <p className="text-muted-foreground">
              Showing <span className="font-semibold text-foreground">{filteredFish.length}</span> fish
            </p>
            <select className="text-sm border border-border rounded-lg px-3 py-2 bg-background">
              <option>Sort by: Recommended</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Rating: High to Low</option>
            </select>
          </div>

          {/* Fish Grid */}
          {filteredFish.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredFish.map((fish, index) => (
                <div
                  key={fish.id}
                  className="animate-fade-in"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <FishCard fish={fish} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🐟</div>
              <h3 className="text-xl font-semibold mb-2">No fish found</h3>
              <p className="text-muted-foreground mb-6">
                Try adjusting your filters or search query
              </p>
              <Button onClick={clearFilters}>Clear Filters</Button>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default MarketplacePage;
