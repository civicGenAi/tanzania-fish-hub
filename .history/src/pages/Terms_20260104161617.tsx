import React from 'react';
import Layout from '@/components/layout/Layout';
import { ScrollText, ShoppingCart, Truck, CreditCard, AlertTriangle, Scale, FileText, Mail } from 'lucide-react';

const Terms: React.FC = () => {
  const sections = [
    {
      icon: FileText,
      title: '1. Acceptance of Terms',
      content: [
        'By accessing or using FishHappy\'s platform, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this platform.',
        'We reserve the right to modify these terms at any time. Continued use of the platform after any such changes constitutes your consent to such changes.',
      ],
    },
    {
      icon: ShoppingCart,
      title: '2. Ordering and Purchases',
      content: [
        'All orders placed through FishHappy are subject to acceptance by the respective sellers. We reserve the right to refuse or cancel any order for any reason, including availability, errors in product or pricing information, or problems identified by our fraud detection systems.',
        'Prices displayed on the platform are in Tanzanian Shillings (TZS) and may be subject to change without notice. The price applicable to your order is the price displayed at the time of order confirmation.',
        'Product images are for illustration purposes only. Actual products may vary slightly in appearance due to the natural variation in fresh fish and seafood.',
        'Minimum order quantities may apply for certain products. These requirements are displayed on the product page.',
      ],
    },
    {
      icon: CreditCard,
      title: '3. Payment Terms',
      content: [
        'We accept payments through M-Pesa, bank transfers, and cash on delivery (where available). Payment must be received before or at the time of delivery unless otherwise arranged.',
        'For M-Pesa and bank transfers, orders will be processed once payment confirmation is received. Processing times may vary depending on the payment method.',
        'In case of payment disputes, please contact our customer support team within 48 hours of the transaction with relevant documentation.',
      ],
    },
    {
      icon: Truck,
      title: '4. Delivery and Shipping',
      content: [
        'Delivery is available within our service areas in Tanzania. Delivery times are estimates and may vary due to factors beyond our control, including weather, traffic, and product availability.',
        'You are responsible for providing accurate delivery information. FishHappy is not liable for delivery delays or failures caused by incorrect address information.',
        'Fresh fish and seafood require immediate refrigeration upon delivery. Please ensure someone is available to receive the delivery at the specified address.',
        'Delivery fees are calculated based on location and order size. Free delivery may be available for orders exceeding certain thresholds in eligible areas.',
      ],
    },
    {
      icon: AlertTriangle,
      title: '5. Returns and Refunds',
      content: [
        'Due to the perishable nature of our products, returns are generally not accepted once delivery is complete. However, we stand behind the quality of our products.',
        'If you receive products that are damaged, spoiled, or significantly different from what was ordered, please contact us within 2 hours of delivery with photographic evidence.',
        'Refunds for quality issues will be processed within 5-7 business days to your original payment method after verification.',
        'Cancellation is free if made before the seller has started preparing your order. Late cancellations may incur a fee.',
      ],
    },
    {
      icon: Scale,
      title: '6. Seller and Buyer Responsibilities',
      content: [
        'Sellers on FishHappy are independent businesses responsible for their product quality, accurate descriptions, and fulfilling orders in a timely manner.',
        'Buyers agree to provide accurate information, make timely payments, and receive deliveries as scheduled.',
        'FishHappy acts as a marketplace platform and is not the direct seller of products. We facilitate transactions between buyers and sellers but are not party to the sale contract.',
        'Users must not engage in fraudulent activities, misrepresent products, or abuse the platform in any way. Violations may result in account suspension or termination.',
      ],
    },
    {
      icon: ScrollText,
      title: '7. Intellectual Property',
      content: [
        'All content on FishHappy, including text, graphics, logos, images, and software, is the property of FishHappy or its content suppliers and is protected by intellectual property laws.',
        'You may not reproduce, distribute, modify, or create derivative works from any content without our express written permission.',
        'User-submitted content (such as reviews and photos) remains your property, but you grant FishHappy a non-exclusive, royalty-free license to use, display, and distribute such content on our platform.',
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
              <ScrollText className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Terms of Service
            </h1>
            <p className="text-lg text-muted-foreground mb-4">
              Please read these terms carefully before using FishHappy's platform and services.
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
              Welcome to FishHappy! These Terms of Service ("Terms") govern your access to and use of the FishHappy platform, including our website, mobile applications, and related services (collectively, the "Platform"). FishHappy is operated by FishHappy Tanzania Ltd.
            </p>
            <p className="text-muted-foreground leading-relaxed mt-4">
              Please read these Terms carefully. By creating an account, placing an order, or otherwise using our Platform, you acknowledge that you have read, understood, and agree to be bound by these Terms.
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
                <div className="space-y-4">
                  {section.content.map((paragraph, i) => (
                    <p key={i} className="text-muted-foreground leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Limitation of Liability */}
          <div className="bg-destructive/5 border border-destructive/20 rounded-2xl p-8 mt-8">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-full bg-destructive/10 flex items-center justify-center">
                <AlertTriangle className="h-6 w-6 text-destructive" />
              </div>
              <h2 className="text-2xl font-bold">8. Limitation of Liability</h2>
            </div>
            <p className="text-muted-foreground leading-relaxed mb-4">
              To the maximum extent permitted by applicable law, FishHappy shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Our total liability for any claim arising out of or relating to these Terms or our Platform shall not exceed the amount paid by you to FishHappy during the twelve (12) months preceding the claim.
            </p>
          </div>

          {/* Contact Section */}
          <div className="bg-gradient-to-br from-primary/10 to-secondary/10 border border-border rounded-2xl p-8 mt-12">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Mail className="h-6 w-6 text-primary" />
              </div>
              <h2 className="text-2xl font-bold">Questions About Terms?</h2>
            </div>
            <p className="text-muted-foreground mb-4">
              If you have any questions about these Terms of Service, please contact our legal team:
            </p>
            <div className="space-y-2 text-muted-foreground">
              <p><strong>Email:</strong> legal@fishhappy.co.tz</p>
              <p><strong>Address:</strong> Msasani Peninsula, Dar es Salaam, Tanzania</p>
              <p><strong>Phone:</strong> +255 22 123 4567</p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Terms;
