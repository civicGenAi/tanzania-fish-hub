import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Fish, Package, Truck, Users, Home, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { stats } from '@/data/fishData';

const HeroSection: React.FC = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-gradient-to-r from-blue-50 via-green-50 to-orange-50">
      {/* Animated Ecosystem Journey */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Ocean Scene - Left */}
        <div className="absolute left-0 top-0 bottom-0 w-1/3">
          {/* Animated Waves */}
          <svg className="absolute bottom-0 left-0 w-full h-48 opacity-30" viewBox="0 0 1440 320" preserveAspectRatio="none">
            <path fill="#0EA5E9" d="M0,160 Q120,200 240,160 T480,160 L480,320 L0,320 Z" className="animate-[wave_8s_ease-in-out_infinite]" />
            <path fill="#0EA5E9" fillOpacity="0.5" d="M0,192 Q100,224 200,192 T400,192 L400,320 L0,320 Z" className="animate-[wave_12s_ease-in-out_infinite_reverse]" />
          </svg>

          {/* Fishing Boat */}
          <div className="absolute left-1/4 top-1/3 animate-[bob_3s_ease-in-out_infinite]">
            <div className="relative">
              <div className="text-6xl">⛵</div>
              <div className="absolute -right-2 -top-2 text-2xl animate-[cast_4s_ease-in-out_infinite]">🎣</div>
            </div>
          </div>

          {/* Fisherman Icon */}
          <div className="absolute left-1/2 bottom-1/3 opacity-70">
            <Users className="h-16 w-16 text-primary animate-pulse" />
          </div>
        </div>

        {/* Platform Hub - Center */}
        <div className="absolute left-1/3 right-1/3 top-0 bottom-0 flex items-center justify-center">
          <div className="relative">
            {/* Central Hub */}
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-2xl animate-[pulse_3s_ease-in-out_infinite]">
              <Fish className="h-16 w-16 md:h-20 md:h-20 text-white" />
            </div>

            {/* Orbiting Particles */}
            <div className="absolute inset-0 animate-[spin_20s_linear_infinite]">
              <Package className="absolute -top-8 left-1/2 -translate-x-1/2 h-6 w-6 text-primary" />
              <Package className="absolute bottom-0 left-0 h-6 w-6 text-secondary" />
              <Package className="absolute bottom-0 right-0 h-6 w-6 text-accent" />
            </div>

            {/* Pulse Rings */}
            <div className="absolute inset-0 -m-8">
              <div className="absolute inset-0 border-2 border-primary/30 rounded-full animate-ping" style={{ animationDuration: '3s' }} />
              <div className="absolute inset-0 border-2 border-secondary/30 rounded-full animate-ping" style={{ animationDuration: '3s', animationDelay: '1s' }} />
            </div>
          </div>
        </div>

        {/* Delivery & Customer - Right */}
        <div className="absolute right-0 top-0 bottom-0 w-1/3">
          {/* Delivery Truck */}
          <div className="absolute right-1/3 top-1/3 animate-[drive_8s_ease-in-out_infinite]">
            <Truck className="h-12 w-12 md:h-16 md:w-16 text-secondary" />
          </div>

          {/* Customer Receiving */}
          <div className="absolute right-1/4 bottom-1/3">
            <div className="relative">
              <div className="text-6xl animate-[wave-hand_2s_ease-in-out_infinite]">👨🏿‍🍳</div>
              <ShoppingBag className="absolute -right-2 -top-2 h-8 w-8 text-accent animate-bounce" />
            </div>
          </div>

          {/* House Icon */}
          <div className="absolute right-12 top-1/2 opacity-70">
            <Home className="h-16 w-16 text-accent" />
          </div>
        </div>

        {/* Swimming Fish - Connecting Flow */}
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute top-1/2 -translate-y-1/2 text-2xl md:text-4xl opacity-60"
            style={{
              left: '-5%',
              animation: `swim ${10 + i * 2}s linear infinite`,
              animationDelay: `${i * 1.5}s`,
            }}
          >
            🐟
          </div>
        ))}

        {/* Dotted Connection Line */}
        <svg className="absolute top-1/2 -translate-y-1/2 w-full h-2" preserveAspectRatio="none">
          <line
            x1="10%"
            y1="50%"
            x2="90%"
            y2="50%"
            stroke="currentColor"
            strokeWidth="2"
            strokeDasharray="10,10"
            className="text-primary/20 animate-[dash_20s_linear_infinite]"
          />
        </svg>
      </div>

      {/* Content Overlay */}
      <div className="container relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/80 backdrop-blur-sm shadow-lg mb-8 animate-slide-up">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-secondary"></span>
            </span>
            <span className="text-sm font-medium text-primary">
              Connecting Ocean to Table • {stats.regionsServed} Regions
            </span>
          </div>

          {/* Headline */}
          <div className="space-y-6 mb-10 animate-slide-up" style={{ animationDelay: '0.1s' }}>
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold leading-tight">
              Fresh Fish,
              <span className="block elegant-font bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                From Ocean to Your Table
              </span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Tanzania's complete fish ecosystem. Supporting local fishermen, ensuring freshness, delivering happiness.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <Link to="/marketplace">
              <Button size="xl" className="w-full sm:w-auto bg-gradient-to-r from-primary to-secondary hover:shadow-2xl transition-all duration-300 hover:scale-105 group">
                Browse Marketplace
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link to="/sell">
              <Button variant="outline" size="xl" className="w-full sm:w-auto hover:bg-white/80 backdrop-blur-sm">
                Become a Seller
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 md:gap-8 max-w-2xl mx-auto pt-8 border-t border-border/50 animate-slide-up" style={{ animationDelay: '0.3s' }}>
            {[
              { value: `${(stats.fishermen / 1000).toFixed(1)}K+`, label: 'Fishermen', icon: Users },
              { value: `${(stats.ordersDelivered / 1000).toFixed(0)}K+`, label: 'Orders', icon: Package },
              { value: `${stats.satisfactionRate}%`, label: 'Happy Customers', icon: Fish },
            ].map((stat) => (
              <div key={stat.label} className="text-center bg-white/60 backdrop-blur-sm rounded-2xl p-4 shadow-lg">
                <stat.icon className="h-6 w-6 md:h-8 md:w-8 mx-auto mb-2 text-primary" />
                <p className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  {stat.value}
                </p>
                <p className="text-xs md:text-sm text-muted-foreground font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CSS Animations */}
      <style>{`
        @keyframes swim {
          0% { transform: translateX(0) translateY(0); }
          50% { transform: translateX(50vw) translateY(-20px); }
          100% { transform: translateX(110vw) translateY(0); }
        }

        @keyframes bob {
          0%, 100% { transform: translateY(0px) rotate(-2deg); }
          50% { transform: translateY(-15px) rotate(2deg); }
        }

        @keyframes cast {
          0%, 100% { transform: rotate(0deg) translateX(0); }
          50% { transform: rotate(-30deg) translateX(10px); }
        }

        @keyframes drive {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(-30px); }
        }

        @keyframes wave-hand {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(20deg); }
          75% { transform: rotate(-20deg); }
        }

        @keyframes dash {
          to { stroke-dashoffset: -100; }
        }

        @keyframes wave {
          0%, 100% { d: path("M0,160 Q120,200 240,160 T480,160 L480,320 L0,320 Z"); }
          50% { d: path("M0,180 Q120,160 240,180 T480,180 L480,320 L0,320 Z"); }
        }
      `}</style>
    </section>
  );
};

export default HeroSection;
