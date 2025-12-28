import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Home, Search, ArrowLeft, Fish, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-ocean-light to-green-light">
      <div className="container max-w-2xl px-4">
        <div className="text-center">
          {/* 404 Illustration */}
          <div className="mb-8 relative">
            <div className="text-[150px] md:text-[200px] font-bold text-primary/10 leading-none select-none">
              404
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center animate-pulse">
                <Fish className="h-12 w-12 text-primary" />
              </div>
            </div>
          </div>

          {/* Message */}
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Oops! This page swam away
          </h1>
          <p className="text-lg text-muted-foreground mb-2">
            We couldn't find the page you're looking for.
          </p>
          <p className="text-muted-foreground mb-8">
            The page <code className="px-2 py-1 rounded bg-muted text-sm font-mono">{location.pathname}</code> doesn't exist.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-12">
            <Link to="/">
              <Button variant="ocean" size="lg" className="w-full sm:w-auto">
                <Home className="h-5 w-5 mr-2" />
                Go to Homepage
              </Button>
            </Link>
            <Link to="/marketplace">
              <Button variant="fresh" size="lg" className="w-full sm:w-auto">
                <Search className="h-5 w-5 mr-2" />
                Browse Marketplace
              </Button>
            </Link>
          </div>

          {/* Quick Links */}
          <div className="bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-6 text-left">
            <h3 className="font-semibold mb-4 text-center">Looking for something?</h3>
            <div className="grid md:grid-cols-2 gap-3">
              <Link
                to="/dashboard"
                className="flex items-center gap-3 p-3 rounded-xl hover:bg-muted/50 transition-colors group"
              >
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <ArrowLeft className="h-5 w-5 text-primary rotate-180" />
                </div>
                <div>
                  <p className="font-medium">My Dashboard</p>
                  <p className="text-sm text-muted-foreground">View your orders</p>
                </div>
              </Link>
              <Link
                to="/help"
                className="flex items-center gap-3 p-3 rounded-xl hover:bg-muted/50 transition-colors group"
              >
                <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center group-hover:bg-secondary/20 transition-colors">
                  <HelpCircle className="h-5 w-5 text-secondary" />
                </div>
                <div>
                  <p className="font-medium">Help Center</p>
                  <p className="text-sm text-muted-foreground">Get support</p>
                </div>
              </Link>
              <Link
                to="/seller"
                className="flex items-center gap-3 p-3 rounded-xl hover:bg-muted/50 transition-colors group"
              >
                <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                  <ArrowLeft className="h-5 w-5 text-accent rotate-180" />
                </div>
                <div>
                  <p className="font-medium">Seller Dashboard</p>
                  <p className="text-sm text-muted-foreground">Manage your store</p>
                </div>
              </Link>
              <Link
                to="/distributor"
                className="flex items-center gap-3 p-3 rounded-xl hover:bg-muted/50 transition-colors group"
              >
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <ArrowLeft className="h-5 w-5 text-primary rotate-180" />
                </div>
                <div>
                  <p className="font-medium">Driver Dashboard</p>
                  <p className="text-sm text-muted-foreground">Manage deliveries</p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
