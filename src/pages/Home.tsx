import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  CheckCircle,
  Clock,
  Users,
  Globe,
  Zap,
  Star,
  Quote,
} from "lucide-react";
import heroImage from "@/assets/hero-web-development.jpg";

const features = [
  {
    icon: Clock,
    title: "Same-Day Publishing",
    description:
      "Get your website live in 24 hours with our rapid development process.",
  },
  {
    icon: Users,
    title: "Dedicated Project Manager",
    description:
      "Your own dedicated manager available 24/7 throughout the project.",
  },
  {
    icon: Globe,
    title: "Global Delivery, Local Care",
    description: "Serving businesses worldwide with personalized attention.",
  },
  {
    icon: Zap,
    title: "Unlimited Support",
    description: "365/24/7 support with unlimited revisions and maintenance.",
  },
];

const testimonials = [
  {
    name: "Douglass",
    text: "Web Extremes designed a beautiful website for us. Extremely pleased with the outcome.",
    rating: 5,
  },
  {
    name: "Jeff Vilus",
    text: "The team at Web Extremes is very talented and even available late nights to complete work. We are grateful to work with them.",
    rating: 5,
  },
  {
    name: "Isaac Ojukwu",
    text: "Web Extremes International made our website dynamic and user friendly. I will always recommend them.",
    rating: 5,
  },
];

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-hero text-primary-foreground py-20 overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge className="bg-white/20 text-white border-white/30">
                  🎁 Special Offer: 15% Off On Every New Projects
                </Badge>
                <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                  Professional Web Design & Development
                  <span className="block text-primary-glow">
                    Delivered in 24 Hours
                  </span>
                </h1>
                <p className="text-xl text-primary-foreground/90 max-w-2xl">
                  Launch your business online with stunning, mobile-friendly
                  websites, custom apps, and 24/7 support—all from one trusted
                  partner.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/packages">
                  <Button variant="hero" size="xl" className="w-full sm:w-auto">
                    Get Started Today
                    <ArrowRight className="h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button
                    variant="outline"
                    size="xl"
                    className="w-full sm:w-auto bg-white/10 border-white/30 text-white hover:bg-white/20"
                  >
                    Free Consultation
                  </Button>
                </Link>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 pt-8">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <CheckCircle className="h-5 w-5 text-primary-glow" />
                    <span className="text-sm font-medium">{feature.title}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="hidden lg:block">
              <img
                src={heroImage}
                alt="Web Development Services"
                className="rounded-lg shadow-glow hover-scale"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-primary mb-4">
              Why Choose Web Extremes International?
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Your growth is our responsibility. We deliver exceptional digital
              solutions with unmatched support.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="card-gradient shadow-elegant hover-scale"
              >
                <CardContent className="p-6 text-center">
                  <div className="flex justify-center mb-4">
                    <div className="p-3 rounded-full bg-gradient-primary">
                      <feature.icon className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-primary mb-4">
              Complete Digital Solutions
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              From websites to apps, we provide everything your business needs
              to succeed online.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {[
              {
                title: "Web Design & Development",
                desc: "Custom, mobile-friendly designs with same-day publishing",
              },
              {
                title: "App Development",
                desc: "Native and cross-platform apps for iOS and Android",
              },
              {
                title: "Digital Marketing",
                desc: "SEO, PPC, and social media marketing to grow your business",
              },
              {
                title: "Graphic Design",
                desc: "Logos, branding, and marketing materials",
              },
              {
                title: "Cloud Hosting",
                desc: "Secure, scalable hosting with 24/7 monitoring",
              },
              {
                title: "Content Writing",
                desc: "SEO-optimized content that converts visitors to customers",
              },
            ].map((service, index) => (
              <Card key={index} className="hover-scale shadow-elegant">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-2 text-primary">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground">{service.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Link to="/services">
              <Button variant="hero" size="lg">
                View All Services
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-primary mb-4">
              Our Clients Love Working With Us
            </h2>
            <p className="text-xl text-muted-foreground">
              Don't just take our word for it. Here's what our clients say about
              us.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="card-gradient shadow-elegant">
                <CardContent className="p-6">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-5 w-5 fill-primary text-primary"
                      />
                    ))}
                  </div>
                  <Quote className="h-8 w-8 text-primary/30 mb-4" />
                  <p className="text-muted-foreground mb-4">
                    {testimonial.text}
                  </p>
                  <div className="font-semibold text-primary">
                    - {testimonial.name}
                  </div>
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
            Ready to Launch Your Digital Success?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join hundreds of satisfied clients who trust us with their digital
            presence. Get started today with our 24-hour delivery guarantee.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact">
              <Button
                variant="hero"
                size="xl"
                className="bg-white text-primary hover:bg-white/90"
              >
                Start Your Project
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
            <Link to="/packages">
              <Button
                variant="outline"
                size="xl"
                className="border-white/30 text-primary hover:bg-white/10"
              >
                View Packages
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
