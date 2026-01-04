import React from 'react';
import Layout from '@/components/layout/Layout';
import { Shield, Eye, Lock, Database, Bell, Users, Globe, Mail } from 'lucide-react';

const Privacy: React.FC = () => {
  const sections = [
    {
      icon: Database,
      title: '1. Information We Collect',
      content: [
        {
          subtitle: 'Personal Information',
          text: 'When you create an account or place an order, we collect your name, email address, phone number, delivery address, and payment information necessary to process your transactions.',
        },
        {
          subtitle: 'Usage Information',
          text: 'We automatically collect information about how you interact with our platform, including pages visited, products viewed, search queries, and device information such as IP address, browser type, and operating system.',
        },
        {
          subtitle: 'Location Data',
          text: 'With your consent, we may collect precise location data to provide delivery services and show you nearby sellers and products.',
        },
      ],
    },
    {
      icon: Eye,
      title: '2. How We Use Your Information',
      content: [
        {
          subtitle: 'Order Processing',
          text: 'We use your personal information to process orders, arrange deliveries, and communicate with you about your purchases.',
        },
        {
          subtitle: 'Platform Improvement',
          text: 'Usage data helps us understand how customers use our platform, enabling us to improve features, fix issues, and develop new services.',
        },
        {
          subtitle: 'Marketing Communications',
          text: 'With your consent, we may send promotional emails about new products, special offers, and platform updates. You can opt out at any time.',
        },
        {
          subtitle: 'Safety and Security',
          text: 'We use information to detect and prevent fraud, abuse, and security incidents to protect our users and platform.',
        },
      ],
    },
    {
      icon: Users,
      title: '3. Information Sharing',
      content: [
        {
          subtitle: 'Sellers and Distributors',
          text: 'We share necessary order details with sellers to fulfill your orders and with distributors to arrange delivery. This includes your name, delivery address, and phone number.',
        },
        {
          subtitle: 'Service Providers',
          text: 'We work with third-party service providers who assist with payment processing, analytics, customer support, and other services. These providers are bound by confidentiality agreements.',
        },
        {
          subtitle: 'Legal Requirements',
          text: 'We may disclose information when required by law, to protect our rights, or in response to valid legal requests from authorities.',
        },
      ],
    },
    {
      icon: Lock,
      title: '4. Data Security',
      content: [
        {
          subtitle: 'Encryption',
          text: 'All data transmitted between your device and our servers is encrypted using industry-standard SSL/TLS protocols.',
        },
        {
          subtitle: 'Secure Storage',
          text: 'Your personal information is stored in secure, access-controlled databases. Payment information is processed by PCI-compliant payment processors.',
        },
        {
          subtitle: 'Access Controls',
          text: 'Only authorized personnel with a legitimate need have access to personal information, and all access is logged and monitored.',
        },
      ],
    },
    {
      icon: Bell,
      title: '5. Your Rights and Choices',
      content: [
        {
          subtitle: 'Access and Correction',
          text: 'You can access and update your personal information through your account settings at any time.',
        },
        {
          subtitle: 'Data Deletion',
          text: 'You may request deletion of your account and personal information by contacting our support team. Some information may be retained for legal or legitimate business purposes.',
        },
        {
          subtitle: 'Marketing Preferences',
          text: 'You can manage your email preferences and opt out of promotional communications through your account settings or by clicking unsubscribe in any marketing email.',
        },
        {
          subtitle: 'Cookie Settings',
          text: 'You can manage cookie preferences through your browser settings. Note that disabling certain cookies may affect platform functionality.',
        },
      ],
    },
    {
      icon: Globe,
      title: '6. International Data Transfers',
      content: [
        {
          subtitle: 'Data Location',
          text: 'Your information is primarily stored and processed in Tanzania. If we transfer data internationally, we ensure appropriate safeguards are in place.',
        },
      ],
    },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-primary/10 via-background to-secondary/10">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
              <Shield className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Privacy Policy
            </h1>
            <p className="text-lg text-muted-foreground mb-4">
              Your privacy matters to us. This policy explains how FishHappy collects, uses, and protects your personal information.
            </p>
            <p className="text-sm text-muted-foreground">
              Last updated: January 1, 2026
            </p>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-12">
        <div className="container max-w-4xl">
          <div className="bg-card border border-border rounded-2xl p-8 mb-12">
            <p className="text-muted-foreground leading-relaxed">
              FishHappy ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy describes how we collect, use, store, and share your personal information when you use our fish marketplace platform, including our website and mobile applications (collectively, the "Platform").
            </p>
            <p className="text-muted-foreground leading-relaxed mt-4">
              By using our Platform, you agree to the collection and use of information in accordance with this policy. If you do not agree with our policies and practices, please do not use our Platform.
            </p>
          </div>

          {/* Sections */}
          <div className="space-y-8">
            {sections.map((section, index) => (
              <div key={index} className="bg-card border border-border rounded-2xl p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <section.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h2 className="text-2xl font-bold">{section.title}</h2>
                </div>
                <div className="space-y-6">
                  {section.content.map((item, i) => (
                    <div key={i}>
                      <h3 className="font-semibold mb-2">{item.subtitle}</h3>
                      <p className="text-muted-foreground leading-relaxed">{item.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Contact Section */}
          <div className="bg-gradient-to-br from-primary/10 to-secondary/10 border border-border rounded-2xl p-8 mt-12">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Mail className="h-6 w-6 text-primary" />
              </div>
              <h2 className="text-2xl font-bold">Questions About Privacy?</h2>
            </div>
            <p className="text-muted-foreground mb-4">
              If you have any questions about this Privacy Policy or our data practices, please contact our Data Protection Officer at:
            </p>
            <div className="space-y-2 text-muted-foreground">
              <p><strong>Email:</strong> privacy@fishhappy.co.tz</p>
              <p><strong>Address:</strong> Msasani Peninsula, Dar es Salaam, Tanzania</p>
              <p><strong>Phone:</strong> +255 22 123 4567</p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Privacy;
