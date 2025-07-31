import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Link } from 'react-router-dom';
import { 
  ExternalLink, 
  Globe, 
  Smartphone, 
  ShoppingCart, 
  Building, 
  Heart, 
  GraduationCap,
  ArrowRight,
  Star
} from 'lucide-react';

const portfolioItems = [
  {
    id: 1,
    title: 'E-commerce Fashion Store',
    category: 'e-commerce',
    description: 'Modern online fashion store with integrated payment gateway and inventory management.',
    technologies: ['React', 'Node.js', 'Stripe', 'MongoDB'],
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop',
    liveUrl: '#',
    features: ['Payment Integration', 'Inventory Management', 'User Authentication', 'Mobile Responsive']
  },
  {
    id: 2,
    title: 'Healthcare Management App',
    category: 'mobile',
    description: 'iOS and Android app for healthcare providers to manage patient records and appointments.',
    technologies: ['React Native', 'Firebase', 'Node.js', 'PostgreSQL'],
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800&h=600&fit=crop',
    liveUrl: '#',
    features: ['Patient Records', 'Appointment Scheduling', 'Secure Messaging', 'Analytics Dashboard']
  },
  {
    id: 3,
    title: 'Corporate Business Website',
    category: 'corporate',
    description: 'Professional corporate website with content management system and SEO optimization.',
    technologies: ['WordPress', 'PHP', 'MySQL', 'CSS3'],
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop',
    liveUrl: '#',
    features: ['CMS Integration', 'SEO Optimized', 'Contact Forms', 'Multi-language Support']
  },
  {
    id: 4,
    title: 'Real Estate Platform',
    category: 'web-app',
    description: 'Comprehensive real estate platform with property listings and agent management.',
    technologies: ['Vue.js', 'Laravel', 'MySQL', 'Google Maps API'],
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=600&fit=crop',
    liveUrl: '#',
    features: ['Property Search', 'Agent Profiles', 'Virtual Tours', 'Lead Management']
  },
  {
    id: 5,
    title: 'Restaurant Ordering System',
    category: 'e-commerce',
    description: 'Online food ordering system with real-time order tracking and delivery management.',
    technologies: ['Angular', 'Express.js', 'MongoDB', 'Socket.io'],
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&h=600&fit=crop',
    liveUrl: '#',
    features: ['Online Ordering', 'Real-time Tracking', 'Payment Gateway', 'Delivery Management']
  },
  {
    id: 6,
    title: 'Fitness Mobile App',
    category: 'mobile',
    description: 'Cross-platform fitness app with workout tracking and nutrition planning.',
    technologies: ['Flutter', 'Firebase', 'Dart', 'REST API'],
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop',
    liveUrl: '#',
    features: ['Workout Tracking', 'Nutrition Plans', 'Progress Analytics', 'Social Features']
  },
  {
    id: 7,
    title: 'Educational Platform',
    category: 'web-app',
    description: 'Online learning platform with course management and student progress tracking.',
    technologies: ['React', 'Django', 'PostgreSQL', 'Redis'],
    image: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=800&h=600&fit=crop',
    liveUrl: '#',
    features: ['Course Management', 'Video Streaming', 'Progress Tracking', 'Certification System']
  },
  {
    id: 8,
    title: 'Non-Profit Website',
    category: 'corporate',
    description: 'Responsive website for non-profit organization with donation integration.',
    technologies: ['HTML5', 'CSS3', 'JavaScript', 'PHP'],
    image: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=800&h=600&fit=crop',
    liveUrl: '#',
    features: ['Donation System', 'Event Management', 'Volunteer Portal', 'Newsletter Integration']
  }
];

const categories = [
  { id: 'all', name: 'All Projects', icon: Globe },
  { id: 'web-app', name: 'Web Applications', icon: Globe },
  { id: 'mobile', name: 'Mobile Apps', icon: Smartphone },
  { id: 'e-commerce', name: 'E-commerce', icon: ShoppingCart },
  { id: 'corporate', name: 'Corporate', icon: Building }
];

const clientTestimonials = [
  {
    name: 'Sarah Johnson',
    company: 'Fashion Forward Ltd',
    text: 'Web Extremes delivered an amazing e-commerce platform that increased our sales by 40%.',
    rating: 5,
    project: 'E-commerce Fashion Store'
  },
  {
    name: 'Dr. Michael Chen',
    company: 'HealthCare Plus',
    text: 'The mobile app they developed streamlined our patient management process significantly.',
    rating: 5,
    project: 'Healthcare Management App'
  },
  {
    name: 'Robert Williams',
    company: 'TechCorp Solutions',
    text: 'Professional, reliable, and delivered exactly what we needed for our corporate website.',
    rating: 5,
    project: 'Corporate Business Website'
  }
];

export default function Portfolio() {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredItems = selectedCategory === 'all' 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === selectedCategory);

  const getCategoryIcon = (category: string) => {
    const cat = categories.find(c => c.id === category);
    return cat ? cat.icon : Globe;
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-hero text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <Badge className="bg-white/20 text-white border-white/30 mb-6">
            Our Portfolio
          </Badge>
          <h1 className="text-4xl lg:text-6xl font-bold mb-6">
            Projects That
            <span className="block text-primary-glow">Drive Results</span>
          </h1>
          <p className="text-xl text-primary-foreground/90 max-w-3xl mx-auto">
            Explore our diverse portfolio of successful projects across various industries. 
            Each project showcases our commitment to excellence and innovation.
          </p>
        </div>
      </section>

      {/* Portfolio Filter */}
      <section className="py-8 border-b">
        <div className="container mx-auto px-4">
          <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-full">
            <TabsList className="grid grid-cols-5 w-full max-w-3xl mx-auto">
              {categories.map((category) => (
                <TabsTrigger key={category.id} value={category.id} className="flex items-center space-x-2">
                  <category.icon className="h-4 w-4" />
                  <span className="hidden sm:inline">{category.name}</span>
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>
      </section>

      {/* Portfolio Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map((item) => {
              const CategoryIcon = getCategoryIcon(item.category);
              return (
                <Card key={item.id} className="overflow-hidden hover-scale shadow-elegant group">
                  <div className="relative overflow-hidden">
                    <img 
                      src={item.image} 
                      alt={item.title}
                      className="w-full h-48 object-cover transition-smooth group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-smooth"></div>
                    <Button 
                      variant="hero" 
                      size="sm" 
                      className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-smooth"
                      asChild
                    >
                      <a href={item.liveUrl} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </Button>
                  </div>
                  
                  <CardContent className="p-6 space-y-4">
                    <div className="flex items-center justify-between">
                      <Badge variant="secondary" className="flex items-center space-x-1">
                        <CategoryIcon className="h-3 w-3" />
                        <span className="capitalize">{item.category.replace('-', ' ')}</span>
                      </Badge>
                    </div>
                    
                    <h3 className="text-xl font-semibold text-primary">{item.title}</h3>
                    <p className="text-muted-foreground text-sm">{item.description}</p>
                    
                    <div className="space-y-3">
                      <div>
                        <h4 className="text-sm font-medium mb-2">Technologies:</h4>
                        <div className="flex flex-wrap gap-1">
                          {item.technologies.map((tech, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-medium mb-2">Key Features:</h4>
                        <div className="space-y-1">
                          {item.features.slice(0, 2).map((feature, index) => (
                            <div key={index} className="text-xs text-muted-foreground">
                              • {feature}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Client Testimonials */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-primary mb-4">
              What Our Clients Say
            </h2>
            <p className="text-xl text-muted-foreground">
              Don't just take our word for it - hear from our satisfied clients.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {clientTestimonials.map((testimonial, index) => (
              <Card key={index} className="card-gradient shadow-elegant">
                <CardContent className="p-6">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-primary text-primary" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-4">"{testimonial.text}"</p>
                  <div className="space-y-1">
                    <div className="font-semibold text-primary">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.company}</div>
                    <Badge variant="outline" className="text-xs">
                      {testimonial.project}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {[
              { number: '500+', label: 'Projects Completed', icon: Globe },
              { number: '250+', label: 'Happy Clients', icon: Heart },
              { number: '50+', label: 'Mobile Apps', icon: Smartphone },
              { number: '100+', label: 'E-commerce Sites', icon: ShoppingCart }
            ].map((stat, index) => (
              <Card key={index} className="text-center hover-scale">
                <CardContent className="p-8">
                  <div className="flex justify-center mb-4">
                    <div className="p-3 rounded-full bg-gradient-primary">
                      <stat.icon className="h-8 w-8 text-white" />
                    </div>
                  </div>
                  <div className="text-4xl font-bold text-primary mb-2">{stat.number}</div>
                  <div className="text-muted-foreground">{stat.label}</div>
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
            Ready to Create Your Success Story?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Let's discuss your project and see how we can help you achieve your digital goals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact">
              <Button variant="hero" size="xl" className="bg-white text-primary hover:bg-white/90">
                Start Your Project
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
            <Link to="/services">
              <Button variant="outline" size="xl" className="border-white/30 text-white hover:bg-white/10">
                View Services
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}