import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/20">
                <span className="text-sm font-bold">WEI</span>
              </div>
              <span className="text-xl font-bold">
                Web Extremes International
              </span>
            </div>
            <p className="text-sm text-primary-foreground/80">
              We Design, Build and Manage Professional Websites and Apps for
              Small, Medium and Large Businesses.
            </p>
            <div className="flex space-x-2">
              <Button variant="ghost" size="icon" className="hover:bg-white/20">
                <Facebook className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="hover:bg-white/20">
                <Twitter className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="hover:bg-white/20">
                <Linkedin className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="hover:bg-white/20">
                <Instagram className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <div className="space-y-2">
              <Link
                to="/about"
                className="block text-sm text-primary-foreground/80 hover:text-primary-foreground transition-smooth"
              >
                About Us
              </Link>
              <Link
                to="/services"
                className="block text-sm text-primary-foreground/80 hover:text-primary-foreground transition-smooth"
              >
                Services
              </Link>
              <Link
                to="/portfolio"
                className="block text-sm text-primary-foreground/80 hover:text-primary-foreground transition-smooth"
              >
                Portfolio
              </Link>
              <Link
                to="/packages"
                className="block text-sm text-primary-foreground/80 hover:text-primary-foreground transition-smooth"
              >
                Packages
              </Link>
            </div>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Our Services</h3>
            <div className="space-y-2 text-sm text-primary-foreground/80">
              <div>Web Design & Development</div>
              <div>App Development</div>
              <div>Digital Marketing</div>
              <div>Graphic Design</div>
              <div>Cloud Hosting</div>
              <div>Content Writing</div>
            </div>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact Info</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span className="text-sm">+1 1800-853-3982</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span className="text-sm">
                  info@webextremesinternational.com
                </span>
              </div>
              <div className="flex items-start space-x-2">
                <MapPin className="h-4 w-4 mt-0.5" />
                <span className="text-sm">
                  4301 50th St NW Suite 300 #2091 Washington DC 20016
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/20 mt-8 pt-8 text-center">
          <p className="text-sm text-primary-foreground/80">
            © 2024 Web Extremes International. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
