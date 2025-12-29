import React, { useState, useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import { Fish, Heart, Users, TrendingUp, Award, Leaf } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const About = () => {
  const stats = [
    { icon: Users, value: 2500, suffix: '+', label: 'Fishermen', color: 'from-primary to-blue-400' },
    { icon: Fish, value: 50000, suffix: '+', label: 'Orders', color: 'from-secondary to-green-400' },
    { icon: Heart, value: 15000, suffix: '+', label: 'Customers', color: 'from-accent to-orange-400' },
    { icon: TrendingUp, value: 98, suffix: '%', label: 'Satisfaction', color: 'from-primary to-purple-400' },
  ];

  const team = [
    {
      role: 'Founder & CEO',
      bio: 'Former fisherman with 15 years of experience, passionate about connecting communities',
      image: '👨🏿‍💼',
      gradient: 'from-primary to-blue-500',
    },
    {
      role: 'Operations Director',
      bio: 'Expert in supply chain, ensuring fresh fish reaches customers quickly',
      image: '👩🏿‍💼',
      gradient: 'from-secondary to-green-500',
    },
    {
      role: 'Technology Lead',
      bio: 'Building digital solutions to empower Tanzanian fishermen',
      image: '👨🏿‍💻',
      gradient: 'from-accent to-orange-500',
    },
    {
      role: 'Community Manager',
      bio: 'Connecting with fishing communities to ensure fair partnerships',
      image: '👩🏿‍🏫',
      gradient: 'from-purple-500 to-pink-500',
    },
  ];

  const values = [
    {
      icon: Fish,
      title: 'Freshness First',
      description: 'We guarantee the freshest catch, delivered within hours of being caught.',
      gradient: 'from-primary to-blue-400',
    },
    {
      icon: Users,
      title: 'Community Empowerment',
      description: 'Supporting local fishermen families and creating sustainable livelihoods.',
      gradient: 'from-secondary to-green-400',
    },
    {
      icon: Leaf,
      title: 'Sustainability',
      description: 'Promoting responsible fishing practices to protect our oceans for future generations.',
      gradient: 'from-green-500 to-emerald-400',
    },
    {
      icon: Award,
      title: 'Quality Assurance',
      description: 'Every fish is inspected and meets our strict quality and safety standards.',
      gradient: 'from-accent to-orange-400',
    },
  ];

  return (
    <Layout>
      {/* Add Google Font */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@600;700&display=swap');
        .elegant-font {
          font-family: 'Dancing Script', cursive;
        }
      `}</style>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary via-blue-500 to-secondary py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-64 h-64 bg-white rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center text-white">
            <div className="inline-flex items-center justify-center w-24 h-24 md:w-32 md:h-32 bg-white/20 backdrop-blur-md rounded-full mb-8 animate-bounce">
              <Fish className="h-12 w-12 md:h-16 md:w-16" />
            </div>
            <h1 className="elegant-font text-5xl md:text-6xl lg:text-7xl mb-6 leading-tight">
              Bringing Ocean's Freshness to Your Table
            </h1>
          </div>
        </div>
      </section>

      {/* Circular Stats Section */}
      <section className="py-16 md:py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 max-w-6xl mx-auto">
            {stats.map((stat, index) => (
              <CircularStat key={index} {...stat} delay={index * 200} />
            ))}
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12 md:mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Story</h2>
              <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full" />
            </div>

            <div className="space-y-8 md:space-y-12">
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-3xl p-6 md:p-10">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 md:w-16 md:h-16 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Fish className="h-6 w-6 md:h-8 md:w-8 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl md:text-2xl font-bold mb-3">Born from the Ocean</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Fish Happy was founded in 2020 by Juma Mwinyipembe, a third-generation fisherman from
                      Dar es Salaam. Growing up in a fishing village, Juma witnessed firsthand the challenges
                      local fishermen faced—middlemen taking most profits, fish spoiling before reaching markets,
                      and families struggling to make ends meet.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl p-6 md:p-10">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 md:w-16 md:h-16 bg-secondary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Heart className="h-6 w-6 md:h-8 md:w-8 text-secondary" />
                  </div>
                  <div>
                    <h3 className="text-xl md:text-2xl font-bold mb-3">A Vision for Change</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Determined to create a better future, Juma partnered with technology experts and community
                      leaders to build a platform that connects fishermen directly with customers. By cutting out
                      middlemen, we ensure fishermen earn fair prices while customers get the freshest fish at
                      affordable rates.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-3xl p-6 md:p-10">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 md:w-16 md:h-16 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <TrendingUp className="h-6 w-6 md:h-8 md:w-8 text-accent" />
                  </div>
                  <div>
                    <h3 className="text-xl md:text-2xl font-bold mb-3">Growing Together</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Today, Fish Happy serves over 15,000 customers across Tanzania and supports more than 2,500
                      fishing families. We've delivered over 500,000 fish while maintaining our commitment to
                      sustainability, quality, and community empowerment. This is just the beginning of our journey.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-muted/30 to-transparent">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Values</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              These core principles guide everything we do
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto">
            {values.map((value, index) => (
              <div
                key={index}
                className="group bg-card rounded-2xl p-6 md:p-8 shadow-lg hover:shadow-2xl transition-all hover:-translate-y-2"
              >
                <div className={`w-14 h-14 md:w-16 md:h-16 bg-gradient-to-br ${value.gradient} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <value.icon className="h-7 w-7 md:h-8 md:w-8 text-white" />
                </div>
                <h3 className="text-xl md:text-2xl font-bold mb-3">{value.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Meet Our Team</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Passionate individuals transforming Tanzania's fishing industry
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 max-w-6xl mx-auto">
            {team.map((member, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-3xl shadow-xl hover:shadow-2xl transition-all hover:-translate-y-3"
              >
                {/* Gradient Background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${member.gradient} opacity-90`} />

                {/* Content */}
                <div className="relative p-8 flex flex-col items-center text-center text-white min-h-[320px] justify-center">
                  <div className="text-7xl md:text-8xl mb-6 group-hover:scale-110 transition-transform">
                    {member.image}
                  </div>
                  <h3 className="text-xl font-bold mb-3">{member.role}</h3>
                  <p className="text-sm text-white/90 leading-relaxed">{member.bio}</p>
                </div>

                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-primary via-blue-500 to-secondary">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center text-white">
            <h2 className="elegant-font text-4xl md:text-5xl mb-6">Join Our Community</h2>
            <p className="text-lg md:text-xl mb-8 text-white/90 leading-relaxed">
              Experience the freshest catch from local fishermen
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/marketplace">
                <Button size="lg" variant="secondary" className="w-full sm:w-auto shadow-xl">
                  <Fish className="h-5 w-5 mr-2" />
                  Start Shopping
                </Button>
              </Link>
              <Link to="/seller">
                <Button size="lg" variant="outline" className="w-full sm:w-auto bg-white/10 backdrop-blur-md border-white/30 text-white hover:bg-white/20">
                  <Users className="h-5 w-5 mr-2" />
                  Become a Seller
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

// Circular Stat Component with Counter Animation
const CircularStat: React.FC<{
  icon: any;
  value: number;
  suffix: string;
  label: string;
  color: string;
  delay: number;
}> = ({ icon: Icon, value, suffix, label, color, delay }) => {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);
            const duration = 2000;
            const steps = 60;
            const increment = value / steps;
            let current = 0;

            const timer = setInterval(() => {
              current += increment;
              if (current >= value) {
                setCount(value);
                clearInterval(timer);
              } else {
                setCount(Math.floor(current));
              }
            }, duration / steps);

            return () => clearInterval(timer);
          }
        });
      },
      { threshold: 0.3 }
    );

    const element = document.getElementById(`stat-${label}`);
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, [value, label, hasAnimated]);

  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  return (
    <div id={`stat-${label}`} className="flex flex-col items-center group">
      <div className="relative mb-4">
        {/* Circular Progress Ring */}
        <svg className="w-32 h-32 md:w-40 md:h-40 -rotate-90">
          <circle
            cx="50%"
            cy="50%"
            r="45%"
            className="stroke-muted/20"
            strokeWidth="8"
            fill="none"
          />
          <circle
            cx="50%"
            cy="50%"
            r="45%"
            className={`bg-gradient-to-r ${color} transition-all duration-1000`}
            strokeWidth="8"
            fill="none"
            stroke="url(#gradient)"
            strokeDasharray="283"
            strokeDashoffset={hasAnimated ? 0 : 283}
            strokeLinecap="round"
          />
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" className="text-primary" stopColor="currentColor" />
              <stop offset="100%" className="text-secondary" stopColor="currentColor" />
            </linearGradient>
          </defs>
        </svg>

        {/* Center Content */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <Icon className="h-8 w-8 md:h-10 md:w-10 text-primary mx-auto mb-2" />
            <div className="text-2xl md:text-3xl font-bold">
              {formatNumber(count)}{suffix}
            </div>
          </div>
        </div>
      </div>

      <p className="text-sm md:text-base font-semibold text-center">{label}</p>
    </div>
  );
};

export default About;
