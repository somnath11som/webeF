import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { 
  Users, 
  Target, 
  Clock, 
  Award, 
  Globe, 
  CheckCircle,
  ArrowRight,
  Heart,
  Shield,
  Zap
} from 'lucide-react';
import aboutTeamImage from '@/assets/about-team.jpg';

const values = [
  {
    icon: Target,
    title: 'Mission-Driven',
    description: 'Design. Build. Manage. Support. We deliver exceptional digital solutions that meet your goals, timelines, and budget.'
  },
  {
    icon: Clock,
    title: '24-Hour Delivery',
    description: 'We understand urgency in business. Our streamlined process enables same-day website publishing when needed.'
  },
  {
    icon: Users,
    title: 'Dedicated Support',
    description: 'Every client gets a dedicated project manager and unlimited support, 365 days a year.'
  },
  {
    icon: Globe,
    title: 'Global Reach',
    description: 'Working with businesses of all sizes, across every industry, delivering worldwide excellence.'
  }
];

const commitments = [
  {
    icon: Heart,
    title: 'Your Growth is Our Responsibility',
    description: 'We don\'t just build websites—we create digital experiences that grow your business and engage your customers.'
  },
  {
    icon: Shield,
    title: '100% Satisfaction Guarantee',
    description: 'We stand behind our work with unlimited revisions and a complete satisfaction guarantee.'
  },
  {
    icon: Zap,
    title: 'Always Available',
    description: 'Our clients love our availability. Reach out any time of the day, any day of the year.'
  }
];

export default function About() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-hero text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="bg-white/20 text-white border-white/30 mb-6">
              About Web Extremes International
            </Badge>
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">
              Your Dedicated Digital Partner—
              <span className="block text-primary-glow">Building Success Online</span>
            </h1>
            <p className="text-xl text-primary-foreground/90 max-w-3xl mx-auto">
              At Web Extremes International, we believe every business deserves a professional, 
              high-performing online presence—without the wait, confusion, or high cost.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl lg:text-4xl font-bold text-primary">
                Our Mission is Simple
              </h2>
              <p className="text-lg text-muted-foreground">
                <strong>Design. Build. Manage. Support.</strong>
              </p>
              <p className="text-lg text-muted-foreground">
                We work with businesses of all sizes, across every industry, delivering exceptional 
                websites, apps, and marketing solutions that meet your goals, timelines, and budget.
              </p>
              
              <div className="space-y-4">
                {['Custom Solutions for Every Business', 'Transparent, Affordable Pricing', 'Proven Track Record of Success'].map((item, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    <span className="text-muted-foreground">{item}</span>
                  </div>
                ))}
              </div>

              <Link to="/contact">
                <Button variant="hero" size="lg">
                  Start Your Project
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
            </div>

            <div className="space-y-6">
              <img 
                src={aboutTeamImage} 
                alt="Our professional team" 
                className="rounded-lg shadow-elegant hover-scale"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-primary mb-4">
              What Sets Us Apart
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our commitment to excellence and client satisfaction drives everything we do.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="card-gradient shadow-elegant hover-scale text-center">
                <CardContent className="p-6">
                  <div className="flex justify-center mb-4">
                    <div className="p-3 rounded-full bg-gradient-primary">
                      <value.icon className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold mb-3 text-primary">{value.title}</h3>
                  <p className="text-muted-foreground text-sm">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Commitments Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-primary mb-4">
              Our Commitment to You
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {commitments.map((commitment, index) => (
              <Card key={index} className="hover-scale shadow-elegant">
                <CardContent className="p-8 text-center">
                  <div className="flex justify-center mb-6">
                    <div className="p-4 rounded-full bg-gradient-primary">
                      <commitment.icon className="h-8 w-8 text-white" />
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold mb-4 text-primary">{commitment.title}</h3>
                  <p className="text-muted-foreground">{commitment.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-hero text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {[
              { number: '500+', label: 'Websites Delivered' },
              { number: '24hr', label: 'Average Delivery Time' },
              { number: '365', label: 'Days Support' },
              { number: '100%', label: 'Satisfaction Rate' }
            ].map((stat, index) => (
              <div key={index} className="space-y-2">
                <div className="text-4xl lg:text-5xl font-bold text-primary-glow">{stat.number}</div>
                <div className="text-primary-foreground/90">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-primary mb-4">
            Ready to Experience the Difference?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join hundreds of satisfied clients who trust us with their digital success. 
            Let's discuss your project today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact">
              <Button variant="hero" size="xl">
                Get Started Today
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
            <Link to="/services">
              <Button variant="outline" size="xl">
                View Our Services
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}