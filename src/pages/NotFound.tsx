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
    <div className="relative flex min-h-screen items-center justify-center bg-gradient-to-b from-sky-100 via-blue-50 to-cyan-100 overflow-hidden">
      {/* Animated Waves Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Top Waves */}
        <svg className="absolute top-0 left-0 w-full" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path
            d="M0,50 Q300,100 600,50 T1200,50 V0 H0 Z"
            fill="rgba(59, 130, 246, 0.1)"
            className="animate-[wave_8s_ease-in-out_infinite]"
          />
          <path
            d="M0,70 Q250,20 500,70 T1000,70 T1500,70 V0 H0 Z"
            fill="rgba(14, 165, 233, 0.1)"
            className="animate-[wave_12s_ease-in-out_infinite_reverse]"
          />
        </svg>

        {/* Bottom Waves */}
        <svg className="absolute bottom-0 left-0 w-full" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path
            d="M0,50 Q300,0 600,50 T1200,50 V120 H0 Z"
            fill="rgba(6, 182, 212, 0.15)"
            className="animate-[wave_10s_ease-in-out_infinite]"
          />
          <path
            d="M0,30 Q400,80 800,30 T1600,30 V120 H0 Z"
            fill="rgba(8, 145, 178, 0.1)"
            className="animate-[wave_15s_ease-in-out_infinite_reverse]"
          />
        </svg>
      </div>

      {/* Floating Bubbles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white/20 backdrop-blur-sm border border-white/30"
            style={{
              width: `${Math.random() * 40 + 10}px`,
              height: `${Math.random() * 40 + 10}px`,
              left: `${Math.random() * 100}%`,
              bottom: '-50px',
              animation: `float ${Math.random() * 10 + 8}s ease-in infinite`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      {/* Swimming Fish */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Fish 1 - Large, slow */}
        <div
          className="absolute text-primary/30"
          style={{
            top: '20%',
            animation: 'swim1 20s linear infinite',
          }}
        >
          <Fish className="h-16 w-16 md:h-24 md:w-24" style={{ transform: 'scaleX(-1)' }} />
        </div>

        {/* Fish 2 - Medium, medium speed */}
        <div
          className="absolute text-secondary/40"
          style={{
            top: '45%',
            animation: 'swim2 15s linear infinite',
            animationDelay: '3s',
          }}
        >
          <Fish className="h-12 w-12 md:h-16 md:w-16" />
        </div>

        {/* Fish 3 - Small, fast */}
        <div
          className="absolute text-accent/35"
          style={{
            top: '65%',
            animation: 'swim3 12s linear infinite',
            animationDelay: '6s',
          }}
        >
          <Fish className="h-10 w-10 md:h-14 md:w-14" style={{ transform: 'scaleX(-1)' }} />
        </div>

        {/* Fish 4 - Small, reverse direction */}
        <div
          className="absolute text-cyan-500/30"
          style={{
            top: '35%',
            animation: 'swim4 18s linear infinite',
            animationDelay: '2s',
          }}
        >
          <Fish className="h-8 w-8 md:h-12 md:w-12" />
        </div>

        {/* Fish 5 - Tiny, very fast */}
        <div
          className="absolute text-blue-400/40"
          style={{
            top: '55%',
            animation: 'swim5 10s linear infinite',
            animationDelay: '4s',
          }}
        >
          <Fish className="h-6 w-6 md:h-10 md:w-10" style={{ transform: 'scaleX(-1)' }} />
        </div>
      </div>

      {/* Seaweed/Coral Decorations */}
      <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute bottom-0 w-3 bg-gradient-to-t from-green-600/20 to-transparent rounded-t-full"
            style={{
              left: `${i * 12 + 5}%`,
              height: `${Math.random() * 60 + 40}px`,
              animation: `sway ${Math.random() * 3 + 3}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="container relative z-10 max-w-2xl px-4">
        <div className="text-center">
          {/* 404 Illustration with Ocean Theme */}
          <div className="mb-8 relative">
            <div className="text-[150px] md:text-[200px] font-bold leading-none select-none bg-gradient-to-b from-primary via-blue-500 to-cyan-600 bg-clip-text text-transparent opacity-20">
              404
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative">
                {/* Ripple effect */}
                <div className="absolute inset-0 w-32 h-32 -left-4 -top-4">
                  <div className="absolute inset-0 rounded-full bg-primary/10 animate-ping" style={{ animationDuration: '3s' }} />
                  <div className="absolute inset-0 rounded-full bg-primary/10 animate-ping" style={{ animationDuration: '3s', animationDelay: '1s' }} />
                </div>
                {/* Main fish icon */}
                <div className="relative w-24 h-24 rounded-full bg-gradient-to-br from-primary/30 to-secondary/30 backdrop-blur-md flex items-center justify-center border-2 border-white/30 shadow-xl animate-[float_3s_ease-in-out_infinite]">
                  <Fish className="h-12 w-12 text-primary animate-[wiggle_2s_ease-in-out_infinite]" />
                </div>
              </div>
            </div>
          </div>

          {/* Message */}
          <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Oops! This page swam away 🐠
          </h1>
          <p className="text-lg text-muted-foreground mb-2">
            We couldn't find the page you're looking for.
          </p>
          <p className="text-muted-foreground mb-8">
            The page <code className="px-2 py-1 rounded bg-white/60 backdrop-blur-sm text-sm font-mono border border-primary/20">{location.pathname}</code> doesn't exist.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-12">
            <Link to="/">
              <Button variant="ocean" size="lg" className="w-full sm:w-auto shadow-lg hover:shadow-xl transition-all">
                <Home className="h-5 w-5 mr-2" />
                Go to Homepage
              </Button>
            </Link>
            <Link to="/marketplace">
              <Button variant="fresh" size="lg" className="w-full sm:w-auto shadow-lg hover:shadow-xl transition-all">
                <Search className="h-5 w-5 mr-2" />
                Browse Marketplace
              </Button>
            </Link>
          </div>

          {/* Quick Links */}
          <div className="bg-white/60 backdrop-blur-md border border-white/40 rounded-2xl p-6 text-left shadow-xl">
            <h3 className="font-semibold mb-4 text-center">Looking for something?</h3>
            <div className="grid md:grid-cols-2 gap-3">
              <Link
                to="/dashboard"
                className="flex items-center gap-3 p-3 rounded-xl bg-white/40 hover:bg-white/60 backdrop-blur-sm transition-all group border border-transparent hover:border-primary/20"
              >
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center group-hover:from-primary/30 group-hover:to-primary/20 transition-all">
                  <ArrowLeft className="h-5 w-5 text-primary rotate-180" />
                </div>
                <div>
                  <p className="font-medium">My Dashboard</p>
                  <p className="text-sm text-muted-foreground">View your orders</p>
                </div>
              </Link>
              <Link
                to="/help"
                className="flex items-center gap-3 p-3 rounded-xl bg-white/40 hover:bg-white/60 backdrop-blur-sm transition-all group border border-transparent hover:border-secondary/20"
              >
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-secondary/20 to-secondary/10 flex items-center justify-center group-hover:from-secondary/30 group-hover:to-secondary/20 transition-all">
                  <HelpCircle className="h-5 w-5 text-secondary" />
                </div>
                <div>
                  <p className="font-medium">Help Center</p>
                  <p className="text-sm text-muted-foreground">Get support</p>
                </div>
              </Link>
              <Link
                to="/seller"
                className="flex items-center gap-3 p-3 rounded-xl bg-white/40 hover:bg-white/60 backdrop-blur-sm transition-all group border border-transparent hover:border-accent/20"
              >
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent/20 to-accent/10 flex items-center justify-center group-hover:from-accent/30 group-hover:to-accent/20 transition-all">
                  <ArrowLeft className="h-5 w-5 text-accent rotate-180" />
                </div>
                <div>
                  <p className="font-medium">Seller Dashboard</p>
                  <p className="text-sm text-muted-foreground">Manage your store</p>
                </div>
              </Link>
              <Link
                to="/distributor"
                className="flex items-center gap-3 p-3 rounded-xl bg-white/40 hover:bg-white/60 backdrop-blur-sm transition-all group border border-transparent hover:border-primary/20"
              >
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center group-hover:from-primary/30 group-hover:to-primary/20 transition-all">
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

      {/* CSS Animations */}
      <style>{`
        @keyframes wave {
          0%, 100% { transform: translateX(0) translateY(0); }
          50% { transform: translateX(-25%) translateY(10px); }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-100vh); }
        }

        @keyframes swim1 {
          0% { left: -10%; transform: scaleX(-1) translateY(0); }
          50% { transform: scaleX(-1) translateY(-20px); }
          100% { left: 110%; transform: scaleX(-1) translateY(0); }
        }

        @keyframes swim2 {
          0% { right: -10%; transform: scaleX(1) translateY(0); }
          50% { transform: scaleX(1) translateY(15px); }
          100% { right: 110%; transform: scaleX(1) translateY(0); }
        }

        @keyframes swim3 {
          0% { left: -10%; transform: scaleX(-1) translateY(0); }
          50% { transform: scaleX(-1) translateY(-15px); }
          100% { left: 110%; transform: scaleX(-1) translateY(0); }
        }

        @keyframes swim4 {
          0% { right: -10%; transform: scaleX(1) translateY(0); }
          50% { transform: scaleX(1) translateY(20px); }
          100% { right: 110%; transform: scaleX(1) translateY(0); }
        }

        @keyframes swim5 {
          0% { left: -10%; transform: scaleX(-1) translateY(0); }
          50% { transform: scaleX(-1) translateY(-25px); }
          100% { left: 110%; transform: scaleX(-1) translateY(0); }
        }

        @keyframes sway {
          0%, 100% { transform: rotate(0deg); }
          50% { transform: rotate(5deg); }
        }

        @keyframes wiggle {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(-5deg); }
          75% { transform: rotate(5deg); }
        }
      `}</style>
    </div>
  );
};

export default NotFound;
