import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Link } from 'react-router-dom';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/hooks/use-toast';
import { 
  Globe, 
  Smartphone, 
  TrendingUp, 
  Palette, 
  PenTool, 
  BookOpen, 
  Cloud, 
  Code,
  Database,
  Search,
  Share2,
  ArrowRight,
  CheckCircle,
  Plus
} from 'lucide-react';
import servicesImage from '@/assets/services-tech.jpg';

const services = [
  {
    id: 'web-design',
    icon: Globe,
    title: 'Web Design & Development',
    description: 'Custom, mobile-friendly designs with same-day publishing available',
    features: ['Responsive Design', 'CMS Integration', 'E-commerce Solutions', 'Custom Development'],
    pricing: { basic: 499, business: 1199, corporate: 1749 },
    category: 'development'
  },
  {
    id: 'app-development',
    icon: Smartphone,
    title: 'App Development',
    description: 'Native iOS & Android apps and cross-platform solutions',
    features: ['Native Development', 'Cross-Platform', 'App Store Submission', 'Maintenance'],
    pricing: { basic: 2999, business: 5999, corporate: 9999 },
    category: 'development'
  },
  {
    id: 'web-applications',
    icon: Code,
    title: 'Web Applications',
    description: 'Custom web applications with advanced functionality',
    features: ['Custom Backend', 'API Integration', 'Database Design', 'Security Features'],
    pricing: { basic: 1999, business: 3999, corporate: 7999 },
    category: 'development'
  },
  {
    id: 'digital-marketing',
    icon: TrendingUp,
    title: 'Digital Marketing',
    description: 'SEO, PPC, and social media marketing to grow your business',
    features: ['SEO Optimization', 'PPC Campaigns', 'Social Media', 'Analytics'],
    pricing: { basic: 299, business: 599, corporate: 1299 },
    category: 'marketing'
  },
  {
    id: 'graphic-design',
    icon: Palette,
    title: 'Graphic Design',
    description: 'Logos, branding, and marketing materials',
    features: ['Logo Design', 'Brand Identity', 'Marketing Materials', 'Print Design'],
    pricing: { basic: 199, business: 399, corporate: 799 },
    category: 'design'
  },
  {
    id: 'animation',
    icon: PenTool,
    title: 'Animation & Illustration',
    description: 'Custom animations and illustrations for your brand',
    features: ['2D Animation', 'Motion Graphics', 'Custom Illustrations', 'Video Editing'],
    pricing: { basic: 399, business: 799, corporate: 1599 },
    category: 'design'
  },
  {
    id: 'content-writing',
    icon: BookOpen,
    title: 'Content Writing',
    description: 'SEO-optimized content that converts visitors to customers',
    features: ['Website Copy', 'Blog Posts', 'SEO Content', 'Social Media Copy'],
    pricing: { basic: 99, business: 199, corporate: 399 },
    category: 'marketing'
  },
  {
    id: 'cloud-hosting',
    icon: Cloud,
    title: 'Cloud Hosting',
    description: 'Secure, scalable hosting with 24/7 monitoring',
    features: ['99.9% Uptime', '24/7 Monitoring', 'Daily Backups', 'SSL Certificate'],
    pricing: { basic: 29, business: 59, corporate: 99 },
    category: 'hosting'
  }
];

const technologies = [
  { name: 'React', icon: '⚛️', category: 'Frontend' },
  { name: 'Angular', icon: '🅰️', category: 'Frontend' },
  { name: 'Vue.js', icon: '💚', category: 'Frontend' },
  { name: 'Node.js', icon: '🟢', category: 'Backend' },
  { name: 'PHP', icon: '🐘', category: 'Backend' },
  { name: 'Python', icon: '🐍', category: 'Backend' },
  { name: 'Java', icon: '☕', category: 'Backend' },
  { name: 'MySQL', icon: '🐬', category: 'Database' },
  { name: 'MongoDB', icon: '🍃', category: 'Database' },
  { name: 'AWS', icon: '☁️', category: 'Cloud' },
  { name: 'Docker', icon: '🐳', category: 'DevOps' },
  { name: 'WordPress', icon: '📰', category: 'CMS' }
];

export default function Services() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const { addItem } = useCart();
  const { toast } = useToast();

  const filteredServices = selectedCategory === 'all' 
    ? services 
    : services.filter(service => service.category === selectedCategory);

  const handleAddToCart = (service: typeof services[0], tier: 'basic' | 'business' | 'corporate') => {
    const item = {
      id: `${service.id}-${tier}`,
      name: `${service.title} (${tier.charAt(0).toUpperCase() + tier.slice(1)})`,
      price: service.pricing[tier],
      type: 'service' as const,
      description: service.description
    };
    
    addItem(item);
    toast({
      title: 'Added to Cart',
      description: `${item.name} has been added to your cart.`,
    });
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-hero text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <Badge className="bg-white/20 text-white border-white/30">
                Complete Digital Solutions
              </Badge>
              <h1 className="text-4xl lg:text-6xl font-bold">
                Services That 
                <span className="block text-primary-glow">Drive Growth</span>
              </h1>
              <p className="text-xl text-primary-foreground/90">
                From websites and apps to marketing and hosting, we provide everything 
                your business needs to succeed online.
              </p>
              <Link to="/contact">
                <Button variant="hero" size="xl" className="bg-white text-primary hover:bg-white/90">
                  Get Free Consultation
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
            </div>
            <div className="hidden lg:block">
              <img 
                src={servicesImage} 
                alt="Technology Services" 
                className="rounded-lg shadow-glow hover-scale"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services Filter */}
      <section className="py-8 border-b">
        <div className="container mx-auto px-4">
          <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-full">
            <TabsList className="grid grid-cols-5 lg:grid-cols-5 w-full max-w-2xl mx-auto">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="development">Development</TabsTrigger>
              <TabsTrigger value="design">Design</TabsTrigger>
              <TabsTrigger value="marketing">Marketing</TabsTrigger>
              <TabsTrigger value="hosting">Hosting</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredServices.map((service) => (
              <Card key={service.id} className="hover-scale shadow-elegant">
                <CardHeader>
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="p-2 rounded-lg bg-gradient-primary">
                      <service.icon className="h-6 w-6 text-white" />
                    </div>
                    <Badge variant="secondary">{service.category}</Badge>
                  </div>
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                  <CardDescription>{service.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    {service.features.map((feature, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-primary" />
                        <span className="text-sm text-muted-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-2">
                    <div className="text-sm font-medium">Starting from:</div>
                    <div className="text-2xl font-bold text-primary">${service.pricing.basic}</div>
                  </div>

                  <div className="grid grid-cols-3 gap-1">
                    <Link to="/contact">
                      <Button variant="hero" size="lg" className="bg-white text-primary hover:bg-white/90">
                        Get Free Consultation
                        <ArrowRight className="h-5 w-5" />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Technologies Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-primary mb-4">
              Technologies We Master
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              We deliver cutting-edge solutions using the latest technologies and frameworks.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
            {technologies.map((tech, index) => (
              <Card key={index} className="hover-scale text-center">
                <CardContent className="p-6">
                  <div className="text-4xl mb-2">{tech.icon}</div>
                  <div className="font-semibold">{tech.name}</div>
                  <div className="text-sm text-muted-foreground">{tech.category}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-primary mb-4">
              Our Development Process
            </h2>
            <p className="text-xl text-muted-foreground">
              From concept to launch, we follow a proven process that delivers results.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { step: '01', title: 'Discovery', desc: 'We understand your needs and goals' },
              { step: '02', title: 'Design', desc: 'Create stunning visuals and user experience' },
              { step: '03', title: 'Development', desc: 'Build with cutting-edge technology' },
              { step: '04', title: 'Launch', desc: 'Deploy and provide ongoing support' }
            ].map((phase, index) => (
              <Card key={index} className="text-center hover-scale">
                <CardContent className="p-6">
                  <div className="text-4xl font-bold text-primary mb-4">{phase.step}</div>
                  <h3 className="text-xl font-semibold mb-2">{phase.title}</h3>
                  <p className="text-muted-foreground">{phase.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-hero text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Ready to Start Your Project?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Get a custom quote for your project and see how we can help grow your business.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact">
              <Button variant="hero" size="xl" className="bg-white text-primary hover:bg-white/90">
                Get Free Quote
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
            <Link to="/packages">
              <Button variant="outline" size="xl" className="border-white/30 text-white hover:bg-white/10">
                View Packages
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}