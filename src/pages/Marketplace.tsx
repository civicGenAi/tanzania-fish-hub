import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, SlidersHorizontal, MapPin, Star, X, Loader2 } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import FishCard from '@/components/fish/FishCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { productsService } from '@/services/products.service';
import { Product, ProductCategory } from '@/types/product.types';
import { cn } from '@/lib/utils';

const MarketplacePage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<ProductCategory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsList, categoriesList] = await Promise.all([
          productsService.getProducts({ status: 'active', in_stock: true }),
          productsService.getCategories(),
        ]);
        setProducts(productsList);
        setCategories(categoriesList);
      } catch (error) {
        console.error('Error fetching marketplace data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || product.category_id === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const clearFilters = () => {
    setSelectedCategory(null);
    setSearchQuery('');
  };

  const hasActiveFilters = selectedCategory || searchQuery;

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
                All Products
              </button>
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={cn(
                    "px-4 py-2 rounded-full text-sm font-medium transition-all",
                    selectedCategory === category.id
                      ? "ocean-gradient text-primary-foreground shadow-ocean"
                      : "bg-muted text-muted-foreground hover:bg-muted/80"
                  )}
                >
                  {category.name}
                </button>
              ))}
            </div>

            {hasActiveFilters && (
              <Button variant="ghost" size="sm" onClick={clearFilters}>
                <X className="h-4 w-4 mr-1" />
                Clear Filters
              </Button>
            )}
          </div>

          {/* Loading State */}
          {loading && (
            <div className="flex items-center justify-center py-16">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          )}

          {/* Results */}
          {!loading && (
            <>
              <div className="mb-6 flex items-center justify-between">
                <p className="text-muted-foreground">
                  Showing <span className="font-semibold text-foreground">{filteredProducts.length}</span> products
                </p>
              </div>

              {/* Products Grid */}
              {filteredProducts.length > 0 ? (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredProducts.map((product, index) => (
                    <Link
                      key={product.id}
                      to={`/fish/${product.id}`}
                      className="animate-fade-in"
                      style={{ animationDelay: `${index * 0.05}s` }}
                    >
                      <div className="bg-card border border-border rounded-2xl overflow-hidden hover:shadow-ocean transition-all group">
                        <div className="relative aspect-video overflow-hidden">
                          <img
                            src={product.image_url || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400'}
                            alt={product.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                          />
                          {product.stock_quantity > 0 && (
                            <div className="absolute top-2 right-2 px-2 py-1 rounded-full bg-secondary text-secondary-foreground text-xs font-medium">
                              In Stock
                            </div>
                          )}
                        </div>
                        <div className="p-4">
                          <h3 className="font-semibold mb-1 group-hover:text-primary transition-colors">
                            {product.name}
                          </h3>
                          {product.description && (
                            <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                              {product.description}
                            </p>
                          )}
                          <div className="flex items-center justify-between">
                            <p className="font-bold text-primary">
                              {new Intl.NumberFormat('en-TZ', {
                                style: 'currency',
                                currency: 'TZS',
                                minimumFractionDigits: 0,
                              }).format(product.price)}/{product.unit}
                            </p>
                            {product.stock > 0 && (
                              <p className="text-xs text-muted-foreground">
                                {product.stock} {product.unit} available
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <div className="text-6xl mb-4">🐟</div>
                  <h3 className="text-xl font-semibold mb-2">No products found</h3>
                  <p className="text-muted-foreground mb-6">
                    Try adjusting your filters or search query
                  </p>
                  <Button onClick={clearFilters}>Clear Filters</Button>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default MarketplacePage;
