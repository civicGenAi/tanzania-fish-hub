import React from 'react';
import { Search, ShoppingCart, Truck, CheckCircle } from 'lucide-react';

const steps = [
  {
    icon: Search,
    title: 'Browse & Select',
    titleSwahili: 'Tafuta & Chagua',
    description: 'Explore our wide selection of fresh fish from verified local suppliers across Tanzania.',
    color: 'bg-primary/10 text-primary',
  },
  {
    icon: ShoppingCart,
    title: 'Order Online',
    titleSwahili: 'Agiza Mtandaoni',
    description: 'Add to cart, choose your delivery time, and pay securely via M-Pesa or card.',
    color: 'bg-secondary/10 text-secondary',
  },
  {
    icon: Truck,
    title: 'Fast Delivery',
    titleSwahili: 'Usafirishaji wa Haraka',
    description: 'Track your order in real-time as our distributors bring fresh fish to your doorstep.',
    color: 'bg-accent/10 text-accent',
  },
  {
    icon: CheckCircle,
    title: 'Enjoy Fresh',
    titleSwahili: 'Furahia Ubichi',
    description: 'Receive blockchain-verified fresh fish with full transparency from catch to table.',
    color: 'bg-green-100 text-green-600',
  },
];

const HowItWorksSection: React.FC = () => {
  return (
    <section className="py-20 bg-muted/50">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            How FishHappy Works
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Getting fresh fish has never been easier. Four simple steps from the water to your plate.
          </p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connection Line */}
          <div className="hidden lg:block absolute top-24 left-0 right-0 h-0.5 bg-border" />
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div
                key={step.title}
                className="relative bg-card rounded-2xl p-6 border border-border hover:shadow-ocean transition-all animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Step Number */}
                <div className="absolute -top-4 left-6 w-8 h-8 rounded-full ocean-gradient flex items-center justify-center text-primary-foreground font-bold text-sm shadow-glow">
                  {index + 1}
                </div>

                {/* Icon */}
                <div className={`w-16 h-16 rounded-2xl ${step.color} flex items-center justify-center mb-6 mt-4`}>
                  <step.icon className="h-8 w-8" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-semibold mb-1">{step.title}</h3>
                <p className="text-sm text-primary mb-3">{step.titleSwahili}</p>
                <p className="text-muted-foreground text-sm">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
