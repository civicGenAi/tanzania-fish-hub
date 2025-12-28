import React from 'react';
import Layout from '@/components/layout/Layout';
import { Fish, Heart, Users, TrendingUp, Award, Leaf, MapPin, Phone, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const About = () => {
  const stats = [
    { icon: Users, value: '2,500+', label: 'Local Fishermen', color: 'text-primary' },
    { icon: Fish, value: '50,000+', label: 'Fish Delivered Monthly', color: 'text-secondary' },
    { icon: Heart, value: '15,000+', label: 'Happy Customers', color: 'text-accent' },
    { icon: TrendingUp, value: '98%', label: 'Satisfaction Rate', color: 'text-primary' },
  ];

  const team = [
    {
      name: 'Juma Mwinyipembe',
      role: 'Founder & CEO',
      bio: 'Former fisherman with 15 years of experience, passionate about connecting local communities.',
      image: '👨🏿‍💼',
    },
    {
      name: 'Amina Hassan',
      role: 'Operations Director',
      bio: 'Expert in supply chain management, ensuring fresh fish reaches customers quickly.',
      image: '👩🏿‍💼',
    },
    {
      name: 'Ibrahim Mwangi',
      role: 'Technology Lead',
      bio: 'Building digital solutions to empower Tanzanian fishermen and customers.',
      image: '👨🏿‍💻',
    },
    {
      name: 'Fatuma Ali',
      role: 'Community Manager',
      bio: 'Connecting with fishermen communities across Tanzania to ensure fair partnerships.',
      image: '👩🏿‍🏫',
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
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary via-blue-500 to-secondary py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-64 h-64 bg-white rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center text-white">
            <div className="inline-flex items-center justify-center w-20 h-20 md:w-24 md:h-24 bg-white/20 backdrop-blur-md rounded-full mb-6 animate-bounce">
              <Fish className="h-10 w-10 md:h-12 md:w-12" />
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Connecting Tanzania Through Fresh Fish
            </h1>
            <p className="text-lg md:text-xl text-white/90 mb-8 leading-relaxed">
              We're on a mission to bring the freshest catch from local fishermen directly to your table,
              while empowering coastal communities and preserving our ocean's bounty.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/marketplace">
                <Button size="lg" variant="secondary" className="w-full sm:w-auto shadow-xl hover:shadow-2xl transition-all">
                  Browse Marketplace
                </Button>
              </Link>
              <Link to="/contact">
                <Button size="lg" variant="outline" className="w-full sm:w-auto bg-white/10 backdrop-blur-md border-white/30 text-white hover:bg-white/20">
                  Get In Touch
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 md:py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-card rounded-2xl p-6 md:p-8 text-center shadow-lg hover:shadow-xl transition-all hover:-translate-y-1"
              >
                <stat.icon className={`h-8 w-8 md:h-10 md:w-10 ${stat.color} mx-auto mb-3`} />
                <div className="text-2xl md:text-3xl font-bold mb-1">{stat.value}</div>
                <div className="text-sm md:text-base text-muted-foreground">{stat.label}</div>
              </div>
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
              Passionate individuals working together to transform Tanzania's fishing industry
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 max-w-6xl mx-auto">
            {team.map((member, index) => (
              <div
                key={index}
                className="group bg-card rounded-2xl p-6 text-center shadow-lg hover:shadow-2xl transition-all hover:-translate-y-2"
              >
                <div className="text-6xl md:text-7xl mb-4 group-hover:scale-110 transition-transform">
                  {member.image}
                </div>
                <h3 className="text-lg md:text-xl font-bold mb-1">{member.name}</h3>
                <p className="text-primary font-medium mb-3 text-sm md:text-base">{member.role}</p>
                <p className="text-sm text-muted-foreground leading-relaxed">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-primary via-blue-500 to-secondary">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Join Our Community</h2>
            <p className="text-lg md:text-xl mb-8 text-white/90 leading-relaxed">
              Whether you're a customer looking for fresh fish or a fisherman wanting to expand your reach,
              Fish Happy welcomes you to our growing community.
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

export default About;
