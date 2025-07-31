import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/hooks/use-toast';
import axios from 'axios';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Send, 
  Globe,
  Smartphone,
  TrendingUp,
  Palette,
  Code,
  Cloud,
  PenTool,
  BookOpen
} from 'lucide-react';
import contactImage from '@/assets/contact-support.jpg';

const services = [
  { id: 'web-design', name: 'Web Design & Development', icon: Globe, price: 499 },
  { id: 'app-development', name: 'App Development', icon: Smartphone, price: 2999 },
  { id: 'web-app', name: 'Web Applications', icon: Code, price: 1999 },
  { id: 'digital-marketing', name: 'Digital Marketing', icon: TrendingUp, price: 299 },
  { id: 'graphic-design', name: 'Graphic Design', icon: Palette, price: 199 },
  { id: 'animation', name: 'Animation & Illustration', icon: PenTool, price: 399 },
  { id: 'content-writing', name: 'Content Writing', icon: BookOpen, price: 99 },
  { id: 'cloud-hosting', name: 'Cloud Hosting', icon: Cloud, price: 29 }
];

const contactInfo = [
  {
    icon: Phone,
    title: 'Phone Numbers',
    details: ['+1 1800-853-3982', '+1 202-888-9705'],
    description: 'Call us anytime, 24/7 support available'
  },
  {
    icon: Mail,
    title: 'Email Address',
    details: ['info@webextremesinternational.com'],
    description: 'We typically respond within 1 hour'
  },
  {
    icon: MapPin,
    title: 'Office Address',
    details: ['4301 50th St NW, Suite 300 #2091', 'Washington DC 20016'],
    description: 'Visit us during business hours'
  },
  {
    icon: Clock,
    title: 'Business Hours',
    details: ['24/7 Support Available', 'Same-day Response Guarantee'],
    description: 'We are always here to help'
  }
];

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    projectType: '',
    budget: '',
    timeline: '',
    message: '',
    selectedServices: [] as string[],
    newsletter: false
  });

  const { addItem } = useCart();
  const { toast } = useToast();

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleServiceToggle = (serviceId: string) => {
    setFormData(prev => ({
      ...prev,
      selectedServices: prev.selectedServices.includes(serviceId)
        ? prev.selectedServices.filter(id => id !== serviceId)
        : [...prev.selectedServices, serviceId]
    }));
  };

  const handleAddSelectedServices = () => {
    const selectedServiceItems = services.filter(service => 
      formData.selectedServices.includes(service.id)
    );

    selectedServiceItems.forEach(service => {
      addItem({
        id: `${service.id}-basic`,
        name: `${service.name} (Basic)`,
        price: service.price,
        type: 'service',
        description: `Basic ${service.name} package`
      });
    });

    if (selectedServiceItems.length > 0) {
      toast({
        title: 'Services Added to Cart',
        description: `${selectedServiceItems.length} service(s) added to your cart.`,
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Add selected services to cart
    if (formData.selectedServices.length > 0) {
      handleAddSelectedServices();
    }

    const payload = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone || '',
      c_name: formData.company || '',
      p_type: formData.projectType || '',
      p_bud: formData.budget || '',
      p_timeline: formData.timeline || '',
      des: formData.message,
      services: formData.selectedServices.join(', '), // Converts selected service IDs/names to comma-separated string
      subscribe: formData.newsletter ? 'Y' : 'N',
    };

    const response = await axios.post('http://localhost:4000/api/v1/user/contact', payload);
    if(response.data.status !== 1) {
      toast({
        title: 'Error',
        description: response.data.message || 'Failed to send message. Please try again later.',
      });
    }else{
      toast({
      title: 'Message Sent Successfully!',
      description: 'We will get back to you within 1 hour.',
    });
    }
    // Simulate form submission
    
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      company: '',
      projectType: '',
      budget: '',
      timeline: '',
      message: '',
      selectedServices: [],
      newsletter: false
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
                Get In Touch
              </Badge>
              <h1 className="text-4xl lg:text-6xl font-bold">
                Let's Build Something
                <span className="block text-primary-glow">Amazing Together</span>
              </h1>
              <p className="text-xl text-primary-foreground/90">
                Ready to transform your digital presence? Contact us today for a free consultation 
                and discover how we can help your business grow online.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button variant="hero" size="lg" className="bg-white text-primary hover:bg-white/90">
                  <Phone className="h-5 w-5 mr-2" />
                  Call Now: +1 1800-853-3982
                </Button>
              </div>
            </div>
            <div className="hidden lg:block">
              <img 
                src={contactImage} 
                alt="Contact Support" 
                className="rounded-lg shadow-glow hover-scale"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Contact Info Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-primary mb-4">
              Multiple Ways to Reach Us
            </h2>
            <p className="text-xl text-muted-foreground">
              Choose the most convenient way to get in touch with our team.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {contactInfo.map((info, index) => (
              <Card key={index} className="text-center hover-scale shadow-elegant">
                <CardContent className="p-6">
                  <div className="flex justify-center mb-4">
                    <div className="p-3 rounded-full bg-gradient-primary">
                      <info.icon className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold mb-3 text-primary">{info.title}</h3>
                  <div className="space-y-1 mb-3">
                    {info.details.map((detail, idx) => (
                      <div key={idx} className="text-sm font-medium">{detail}</div>
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground">{info.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-primary mb-4">
                Tell Us About Your Project
              </h2>
              <p className="text-xl text-muted-foreground">
                Fill out the form below and we'll get back to you within 1 hour.
              </p>
            </div>

            <Card className="shadow-elegant">
              <CardHeader>
                <CardTitle className="text-2xl">Project Details</CardTitle>
                <CardDescription>
                  The more information you provide, the better we can help you.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Basic Information */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        required
                        placeholder="Your full name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        required
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        placeholder="+1 (555) 123-4567"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="company">Company Name</Label>
                      <Input
                        id="company"
                        value={formData.company}
                        onChange={(e) => handleInputChange('company', e.target.value)}
                        placeholder="Your company name"
                      />
                    </div>
                  </div>

                  {/* Project Details */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="projectType">Project Type</Label>
                      <Select value={formData.projectType} onValueChange={(value) => handleInputChange('projectType', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select project type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="website">Website Development</SelectItem>
                          <SelectItem value="app">Mobile App</SelectItem>
                          <SelectItem value="webapp">Web Application</SelectItem>
                          <SelectItem value="ecommerce">E-commerce Store</SelectItem>
                          <SelectItem value="redesign">Website Redesign</SelectItem>
                          <SelectItem value="maintenance">Maintenance & Support</SelectItem>
                          <SelectItem value="marketing">Digital Marketing</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="budget">Project Budget</Label>
                      <Select value={formData.budget} onValueChange={(value) => handleInputChange('budget', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select budget range" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="under-1k">Under $1,000</SelectItem>
                          <SelectItem value="1k-5k">$1,000 - $5,000</SelectItem>
                          <SelectItem value="5k-10k">$5,000 - $10,000</SelectItem>
                          <SelectItem value="10k-25k">$10,000 - $25,000</SelectItem>
                          <SelectItem value="25k-50k">$25,000 - $50,000</SelectItem>
                          <SelectItem value="50k-plus">$50,000+</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="timeline">Project Timeline</Label>
                    <Select value={formData.timeline} onValueChange={(value) => handleInputChange('timeline', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="When do you need this completed?" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="asap">ASAP (24-48 hours)</SelectItem>
                        <SelectItem value="1-week">Within 1 week</SelectItem>
                        <SelectItem value="2-weeks">Within 2 weeks</SelectItem>
                        <SelectItem value="1-month">Within 1 month</SelectItem>
                        <SelectItem value="2-3-months">2-3 months</SelectItem>
                        <SelectItem value="flexible">I'm flexible</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Services Selection */}
                  <div className="space-y-4">
                    <Label>Services Needed (Select all that apply)</Label>
                    <div className="grid md:grid-cols-2 gap-4">
                      {services.map((service) => (
                        <div key={service.id} className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-muted/30">
                          <Checkbox
                            id={service.id}
                            checked={formData.selectedServices.includes(service.id)}
                            onCheckedChange={() => handleServiceToggle(service.id)}
                          />
                          <div className="flex items-center space-x-2 flex-1">
                            <service.icon className="h-4 w-4 text-primary" />
                            <Label htmlFor={service.id} className="flex-1 cursor-pointer">
                              {service.name}
                            </Label>
                            <span className="text-sm text-muted-foreground">
                              from ${service.price}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Message */}
                  <div className="space-y-2">
                    <Label htmlFor="message">Project Description *</Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => handleInputChange('message', e.target.value)}
                      required
                      rows={6}
                      placeholder="Tell us more about your project, goals, and any specific requirements..."
                    />
                  </div>

                  {/* Newsletter */}
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="newsletter"
                      checked={formData.newsletter}
                      onCheckedChange={(checked) => handleInputChange('newsletter', checked)}
                    />
                    <Label htmlFor="newsletter" className="text-sm cursor-pointer">
                      Subscribe to our newsletter for updates and special offers
                    </Label>
                  </div>

                  {/* Submit Button */}
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button type="submit" variant="hero" size="lg" className="flex-1">
                      <Send className="h-5 w-5 mr-2" />
                      Send Message & Get Quote
                    </Button>
                    {formData.selectedServices.length > 0 && (
                      <Button 
                        type="button" 
                        variant="outline" 
                        size="lg"
                        onClick={handleAddSelectedServices}
                      >
                        Add Services to Cart ({formData.selectedServices.length})
                      </Button>
                    )}
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-primary mb-4">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              {
                question: "How quickly can you deliver my project?",
                answer: "We offer same-day publishing for websites and can deliver most projects within 24-48 hours, depending on complexity."
              },
              {
                question: "Do you provide ongoing support?",
                answer: "Yes! We provide unlimited support 365/24/7 to all our clients. Your success is our responsibility."
              },
              {
                question: "What technologies do you work with?",
                answer: "We work with all modern technologies including React, Node.js, PHP, Python, WordPress, Shopify, and many more."
              },
              {
                question: "Can you help with digital marketing?",
                answer: "Absolutely! We offer comprehensive digital marketing services including SEO, PPC, social media marketing, and content strategy."
              }
            ].map((faq, index) => (
              <Card key={index} className="hover-scale">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-3 text-primary">{faq.question}</h3>
                  <p className="text-muted-foreground">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}