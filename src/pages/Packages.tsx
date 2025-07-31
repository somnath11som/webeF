import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/hooks/use-toast';
import { 
  CheckCircle, 
  Star, 
  Zap, 
  Globe, 
  Shield, 
  Clock, 
  Headphones,
  TrendingUp,
  Plus,
  ArrowRight
} from 'lucide-react';

const packages = [
  {
    id: 'starter',
    name: 'Starter',
    description: 'Perfect for small businesses & startups',
    icon: Globe,
    monthly: 499,
    annual: 4990,
    popular: false,
    features: [
      '5 pages website',
      'Mobile-friendly design',
      'Basic CMS integration',
      '1 month support',
      'Basic SEO setup',
      'Contact form integration',
      'Social media links',
      'Google Analytics setup'
    ]
  },
  {
    id: 'business',
    name: 'Business',
    description: 'Best for growing SMEs',
    icon: TrendingUp,
    monthly: 1199,
    annual: 11990,
    popular: true,
    features: [
      '7-10 pages website',
      'Custom responsive design',
      'Advanced CMS integration',
      'Animated header/hero section',
      'SEO optimization',
      'E-commerce ready',
      'Blog setup',
      'Newsletter integration',
      '3 months support',
      'Free logo design'
    ]
  },
  {
    id: 'corporate',
    name: 'Corporate',
    description: 'For large companies & agencies',
    icon: Star,
    monthly: 1749,
    annual: 17490,
    popular: false,
    features: [
      '11-17 pages website',
      'Custom premium design',
      'Advanced functionality',
      'Multiple CMS options',
      'Advanced SEO & analytics',
      'E-commerce with payment gateway',
      'Multi-language support',
      'Advanced security features',
      '6 months support',
      'Custom logo & branding',
      'Priority support'
    ]
  }
];

const addOns = [
  {
    id: 'ssl',
    name: 'SSL Certificate',
    description: 'Secure your website with SSL encryption',
    icon: Shield,
    monthly: 20,
    annual: 149
  },
  {
    id: 'hosting',
    name: 'Professional Hosting',
    description: 'Fast, reliable hosting with 99.9% uptime',
    icon: Zap,
    monthly: 50,
    annual: 399
  },
  {
    id: 'maintenance',
    name: 'Website Maintenance',
    description: 'Keep your website updated and secure',
    icon: Clock,
    monthly: 60,
    annual: 600
  },
  {
    id: 'marketing',
    name: 'Digital Marketing',
    description: 'SEO, PPC, and social media marketing',
    icon: TrendingUp,
    monthly: 299,
    annual: 2499
  }
];

export default function Packages() {
  const [isAnnual, setIsAnnual] = useState(false);
  const { addItem } = useCart();
  const { toast } = useToast();

  const handleAddPackage = (pkg: typeof packages[0]) => {
    const price = isAnnual ? pkg.annual : pkg.monthly;
    const billing = isAnnual ? 'annually' as const : 'monthly' as const;
    
    const item = {
      id: `${pkg.id}-${billing}`,
      name: `${pkg.name} Package (${billing})`,
      price,
      type: 'package' as const,
      billing,
      description: pkg.description
    };
    
    addItem(item);
    toast({
      title: 'Added to Cart',
      description: `${item.name} has been added to your cart.`,
    });
  };

  const handleAddAddon = (addon: typeof addOns[0]) => {
    const price = isAnnual ? addon.annual : addon.monthly;
    const billing = isAnnual ? 'annually' as const : 'monthly' as const;
    
    const item = {
      id: `${addon.id}-${billing}`,
      name: `${addon.name} (${billing})`,
      price,
      type: 'addon' as const,
      billing,
      description: addon.description
    };
    
    addItem(item);
    toast({
      title: 'Added to Cart',
      description: `${item.name} has been added to your cart.`,
    });
  };

  const calculateSavings = (monthly: number, annual: number) => {
    const monthlyCost = monthly * 12;
    const savings = monthlyCost - annual;
    const percentage = Math.round((savings / monthlyCost) * 100);
    return { savings, percentage };
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-hero text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <Badge className="bg-white/20 text-white border-white/30 mb-6">
            Choose Your Package
          </Badge>
          <h1 className="text-4xl lg:text-6xl font-bold mb-6">
            Transparent Pricing for
            <span className="block text-primary-glow">Every Business</span>
          </h1>
          <p className="text-xl text-primary-foreground/90 max-w-3xl mx-auto mb-8">
            Choose the perfect package for your business needs. All packages include our 
            24-hour delivery guarantee and unlimited support.
          </p>
          
          {/* Billing Toggle */}
          <div className="flex items-center justify-center space-x-4 bg-white/10 rounded-lg p-2 max-w-xs mx-auto">
            <span className={`text-sm ${!isAnnual ? 'text-white font-medium' : 'text-white/70'}`}>
              Monthly
            </span>
            <Switch
              checked={isAnnual}
              onCheckedChange={setIsAnnual}
              className="data-[state=checked]:bg-white/30"
            />
            <span className={`text-sm ${isAnnual ? 'text-white font-medium' : 'text-white/70'}`}>
              Annual
            </span>
            {isAnnual && (
              <Badge className="bg-green-500/20 text-green-200 border-green-300/30">
                Save up to 20%
              </Badge>
            )}
          </div>
        </div>
      </section>

      {/* Packages Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {packages.map((pkg) => {
              const price = isAnnual ? pkg.annual : pkg.monthly;
              const savings = isAnnual ? calculateSavings(pkg.monthly, pkg.annual) : null;
              
              return (
                <Card 
                  key={pkg.id} 
                  className={`relative hover-scale shadow-elegant ${
                    pkg.popular ? 'ring-2 ring-primary shadow-glow' : ''
                  }`}
                >
                  {pkg.popular && (
                    <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-primary">
                      <Star className="h-3 w-3 mr-1" />
                      Most Popular
                    </Badge>
                  )}
                  
                  <CardHeader className="text-center pb-2">
                    <div className="flex justify-center mb-4">
                      <div className={`p-3 rounded-full ${pkg.popular ? 'bg-gradient-primary' : 'bg-muted'}`}>
                        <pkg.icon className={`h-8 w-8 ${pkg.popular ? 'text-white' : 'text-primary'}`} />
                      </div>
                    </div>
                    <CardTitle className="text-2xl">{pkg.name}</CardTitle>
                    <CardDescription className="text-base">{pkg.description}</CardDescription>
                  </CardHeader>
                  
                  <CardContent className="space-y-6">
                    <div className="text-center">
                      <div className="text-4xl font-bold text-primary">
                        ${price.toLocaleString()}
                      </div>
                      <div className="text-muted-foreground">
                        {isAnnual ? 'per year' : 'per month'}
                      </div>
                      {isAnnual && savings && (
                        <div className="text-green-600 text-sm font-medium mt-1">
                          Save ${savings.savings.toLocaleString()} ({savings.percentage}%)
                        </div>
                      )}
                    </div>

                    <div className="space-y-3">
                      {pkg.features.map((feature, index) => (
                        <div key={index} className="flex items-center space-x-3">
                          <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                          <span className="text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>

                    <Button
                      onClick={() => handleAddPackage(pkg)}
                      variant={pkg.popular ? "hero" : "default"}
                      className="w-full"
                      size="lg"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add to Cart
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Add-ons Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-primary mb-4">
              Enhance Your Package
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Boost your website's performance and security with our premium add-ons.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {addOns.map((addon) => {
              const price = isAnnual ? addon.annual : addon.monthly;
              const savings = isAnnual ? calculateSavings(addon.monthly, addon.annual) : null;
              
              return (
                <Card key={addon.id} className="hover-scale shadow-elegant">
                  <CardHeader className="text-center pb-2">
                    <div className="flex justify-center mb-4">
                      <div className="p-3 rounded-full bg-gradient-primary">
                        <addon.icon className="h-6 w-6 text-white" />
                      </div>
                    </div>
                    <CardTitle className="text-lg">{addon.name}</CardTitle>
                    <CardDescription className="text-sm">{addon.description}</CardDescription>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary">
                        ${price.toLocaleString()}
                      </div>
                      <div className="text-muted-foreground text-sm">
                        {isAnnual ? 'per year' : 'per month'}
                      </div>
                      {isAnnual && savings && (
                        <div className="text-green-600 text-xs font-medium mt-1">
                          Save ${savings.savings.toLocaleString()}
                        </div>
                      )}
                    </div>

                    <Button
                      onClick={() => handleAddAddon(addon)}
                      variant="outline"
                      className="w-full"
                      size="sm"
                    >
                      <Plus className="h-3 w-3 mr-2" />
                      Add to Cart
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Comparison */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-primary mb-4">
              Compare Package Features
            </h2>
          </div>

          <Card className="overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-4 font-semibold">Features</th>
                    {packages.map((pkg) => (
                      <th key={pkg.id} className="text-center p-4 font-semibold">
                        {pkg.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    'Mobile-friendly design',
                    'CMS integration',
                    'SEO optimization',
                    'E-commerce ready',
                    'Logo design',
                    'Multi-language support',
                    'Priority support'
                  ].map((feature, index) => (
                    <tr key={index} className="border-b hover:bg-muted/30">
                      <td className="p-4">{feature}</td>
                      <td className="text-center p-4">
                        <CheckCircle className="h-5 w-5 text-primary mx-auto" />
                      </td>
                      <td className="text-center p-4">
                        <CheckCircle className="h-5 w-5 text-primary mx-auto" />
                      </td>
                      <td className="text-center p-4">
                        <CheckCircle className="h-5 w-5 text-primary mx-auto" />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-hero text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Choose your package and launch your professional website in 24 hours 
            with our expert team.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              variant="hero" 
              size="xl" 
              className="bg-white text-primary hover:bg-white/90"
              asChild
            >
              <a href="/cart">
                View Cart & Checkout
                <ArrowRight className="h-5 w-5" />
              </a>
            </Button>
            <Button 
              variant="outline" 
              size="xl" 
              className="border-white/30 text-white hover:bg-white/10"
              asChild
            >
              <a href="/contact">
                Get Custom Quote
              </a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}