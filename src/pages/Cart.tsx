import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";
import { Switch } from "@/components/ui/switch";
import axios from "axios";
import {
  Trash2,
  Minus,
  ShoppingCart,
  CreditCard,
  Lock,
  ArrowLeft,
  CheckCircle,
  AlertCircle,
  Star,
  Zap,
  Globe,
  Shield,
  Clock,
  Headphones,
  TrendingUp,
  Plus,
  ArrowRight,
} from "lucide-react";

const addOns = [
  {
    id: "ssl",
    name: "SSL Certificate",
    description: "Secure your website with SSL encryption",
    icon: Shield,
    monthly: 20,
    annual: 149,
  },
  {
    id: "hosting",
    name: "Professional Hosting",
    description: "Fast, reliable hosting with 99.9% uptime",
    icon: Zap,
    monthly: 50,
    annual: 399,
  },
  {
    id: "maintenance",
    name: "Website Maintenance",
    description: "Keep your website updated and secure",
    icon: Clock,
    monthly: 60,
    annual: 600,
  },
  {
    id: "marketing",
    name: "Digital Marketing",
    description: "SEO, PPC, and social media marketing",
    icon: TrendingUp,
    monthly: 299,
    annual: 2499,
  },
];

export default function Cart() {
  const [isAnnual, setIsAnnual] = useState(false);
  const { addItem } = useCart();
  const { toast } = useToast();
  const { state, removeItem, updateQuantity, clearCart } = useCart();
  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [checkoutData, setCheckoutData] = useState({
    email: "",
    fullName: "",
    phone: "",
    company: "",
    notes: "",
  });

  const handleQuantityChange = (id: string, newQuantity: number) => {
    if (newQuantity < 1) {
      removeItem(id);
      return;
    }
    updateQuantity(id, newQuantity);
  };

  const handlePromoCode = () => {
    // Simple promo code logic - in real app this would call an API
    const validCodes = {
      WELCOME15: 15,
    };

    if (validCodes[promoCode as keyof typeof validCodes]) {
      const discountPercent = validCodes[promoCode as keyof typeof validCodes];
      setDiscount(discountPercent);
      toast({
        title: "Promo Code Applied!",
        description: `You saved ${discountPercent}% on your order.`,
      });
    } else {
      toast({
        title: "Invalid Promo Code",
        description: "Please check your promo code and try again.",
        variant: "destructive",
      });
    }
  };

  const handleAddAddon = (addon: (typeof addOns)[0]) => {
    const price = isAnnual ? addon.annual : addon.monthly;
    const billing = isAnnual ? ("annually" as const) : ("monthly" as const);

    const item = {
      id: `${addon.id}-${billing}`,
      name: `${addon.name} (${billing})`,
      price,
      type: "addon" as const,
      billing,
      description: addon.description,
    };

    addItem(item);
    toast({
      title: "Added to Cart",
      description: `${item.name} has been added to your cart.`,
    });
  };

  const calculateSavings = (monthly: number, annual: number) => {
    const monthlyCost = monthly * 12;
    const savings = monthlyCost - annual;
    const percentage = Math.round((savings / monthlyCost) * 100);
    return { savings, percentage };
  };

  const subtotal = state.total;
  const discountAmount = (subtotal * discount) / 100;
  const total = subtotal - discountAmount;

  const handleCheckout = async () => {
    if (state.items.length === 0) {
      toast({
        title: "Cart is Empty",
        description: "Please add some items to your cart before checkout.",
        variant: "destructive",
      });
      return;
    }

    if (!checkoutData.email || !checkoutData.fullName || !checkoutData.phone) {
      toast({
        title: "Missing Information",
        description: "Please fill in your email and full name.",
        variant: "destructive",
      });
      return;
    }

    const payload = {
      name: checkoutData.fullName,
      email: checkoutData.email,
      phone: checkoutData.phone,
      c_name: checkoutData.company,
      notes: checkoutData.notes,
      amount: total,
      packages: state.items,
      promoCode: promoCode,
      discount: discount,
    };
    const response = await axios.post(
      "https://backend.webextremesinternational.com/api/v1/order/createOrder",
      payload
    );
    if (response.data.status !== 1) {
      toast({
        title: "Error",
        description: "Failed to process your order. Please try again later.",
        variant: "destructive",
      });
      return;
    } else {
      const data = response.data;
      const link = data.link;
      setTimeout(() => {
        clearCart();
      }, 2000);
      window.location.href = link; // Redirect to payment link
      return; // Exit after redirecting
    }
  };

  const getItemBillingInfo = (item: any) => {
    if (item.billing) {
      return item.billing === "annually" ? "/year" : "/month";
    }
    return "";
  };

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl lg:text-4xl font-bold text-primary mb-4">
            Shopping Cart
          </h1>
          <p className="text-muted-foreground">
            Review your selected services and packages before checkout.
          </p>
        </div>

        {state.items.length === 0 ? (
          /* Empty Cart */
          <div className="text-center py-16">
            <div className="flex justify-center mb-6">
              <div className="p-4 rounded-full bg-muted">
                <ShoppingCart className="h-12 w-12 text-muted-foreground" />
              </div>
            </div>
            <h2 className="text-2xl font-semibold mb-4">Your cart is empty</h2>
            <p className="text-muted-foreground mb-8">
              Add some services or packages to get started with your project.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/services">
                <Button variant="hero" size="lg">
                  Browse Services
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Button>
              </Link>
              <Link to="/packages">
                <Button variant="outline" size="lg">
                  View Packages
                </Button>
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>Cart Items ({state.items.length})</CardTitle>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={clearCart}
                      className="text-destructive hover:text-destructive"
                    >
                      Clear All
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {state.items.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center space-x-4 p-4 border rounded-lg"
                    >
                      <div className="flex-1">
                        <h3 className="font-semibold">{item.name}</h3>
                        {item.description && (
                          <p className="text-sm text-muted-foreground">
                            {item.description}
                          </p>
                        )}
                        <div className="flex items-center space-x-2 mt-2">
                          <Badge
                            variant={
                              item.type === "package"
                                ? "default"
                                : item.type === "service"
                                ? "secondary"
                                : "outline"
                            }
                          >
                            {item.type}
                          </Badge>
                          {item.billing && (
                            <Badge variant="outline">{item.billing}</Badge>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() =>
                            handleQuantityChange(item.id, item.quantity - 1)
                          }
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() =>
                            handleQuantityChange(item.id, item.quantity + 1)
                          }
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>

                      <div className="text-right">
                        <div className="font-semibold">
                          ${(item.price * item.quantity).toLocaleString()}
                          {getItemBillingInfo(item)}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          ${item.price}
                          {getItemBillingInfo(item)} each
                        </div>
                      </div>

                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeItem(item.id)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Continue Shopping */}
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="text-center mb-16">
                  <h2 className="text-3xl lg:text-4xl font-bold text-primary mb-4">
                    Enhance Your Package
                  </h2>
                  <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                    Boost your website's performance and security with our
                    premium add-ons.
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-center space-x-4 bg-gradient-primary text-primary-foreground rounded-lg p-2 max-w-xs mx-auto">
                <span
                  className={`text-sm ${
                    !isAnnual ? "text-white font-medium" : "text-white/70"
                  }`}
                >
                  Monthly
                </span>
                <Switch
                  checked={isAnnual}
                  onCheckedChange={setIsAnnual}
                  className="data-[state=checked]:bg-white/30"
                />
                <span
                  className={`text-sm ${
                    isAnnual ? "text-white font-medium" : "text-white/70"
                  }`}
                >
                  Annual
                </span>
                {isAnnual && (
                  <Badge className="bg-green-500/20 text-green-200 border-green-300/30">
                    Save up to 20%
                  </Badge>
                )}
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {addOns.map((addon) => {
                    const price = isAnnual ? addon.annual : addon.monthly;
                    const savings = isAnnual
                      ? calculateSavings(addon.monthly, addon.annual)
                      : null;

                    return (
                      <Card
                        key={addon.id}
                        className="hover-scale shadow-elegant"
                      >
                        <CardHeader className="text-center pb-2">
                          <div className="flex justify-center mb-4">
                            <div className="p-3 rounded-full bg-gradient-primary">
                              <addon.icon className="h-6 w-6 text-white" />
                            </div>
                          </div>
                          <CardTitle className="text-lg">
                            {addon.name}
                          </CardTitle>
                          <CardDescription className="text-sm">
                            {addon.description}
                          </CardDescription>
                        </CardHeader>

                        <CardContent className="space-y-4">
                          <div className="text-center">
                            <div className="text-2xl font-bold text-primary">
                              ${price.toLocaleString()}
                            </div>
                            <div className="text-muted-foreground text-sm">
                              {isAnnual ? "per year" : "per month"}
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
            </div>

            {/* Order Summary & Checkout */}
            <div className="space-y-6">
              {/* Promo Code */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Promo Code</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex space-x-2">
                    <Input
                      placeholder="Enter promo code"
                      value={promoCode}
                      onChange={(e) =>
                        setPromoCode(e.target.value.toUpperCase())
                      }
                    />
                    <Button onClick={handlePromoCode} variant="outline">
                      Apply
                    </Button>
                  </div>
                  {discount > 0 && (
                    <div className="flex items-center space-x-2 text-green-600">
                      <CheckCircle className="h-4 w-4" />
                      <span className="text-sm">
                        {discount}% discount applied
                      </span>
                    </div>
                  )}
                  <div className="text-xs text-muted-foreground">
                    Try: WELCOME15
                  </div>
                </CardContent>
              </Card>

              {/* Order Summary */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Subtotal:</span>
                      <span>${subtotal.toLocaleString()}</span>
                    </div>
                    {discount > 0 && (
                      <div className="flex justify-between text-green-600">
                        <span>Discount ({discount}%):</span>
                        <span>-${discountAmount.toLocaleString()}</span>
                      </div>
                    )}
                    <Separator />
                    <div className="flex justify-between text-lg font-semibold">
                      <span>Total:</span>
                      <span className="text-primary">
                        ${total.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Checkout Form */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center">
                    <Lock className="h-5 w-5 mr-2" />
                    Checkout Information
                  </CardTitle>
                  <CardDescription>
                    Secure checkout - We'll contact you to discuss payment
                    options.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      value={checkoutData.email}
                      onChange={(e) =>
                        setCheckoutData((prev) => ({
                          ...prev,
                          email: e.target.value,
                        }))
                      }
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name *</Label>
                    <Input
                      id="fullName"
                      placeholder="Your full name"
                      value={checkoutData.fullName}
                      onChange={(e) =>
                        setCheckoutData((prev) => ({
                          ...prev,
                          fullName: e.target.value,
                        }))
                      }
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+1 (555) 123-4567"
                      value={checkoutData.phone}
                      onChange={(e) =>
                        setCheckoutData((prev) => ({
                          ...prev,
                          phone: e.target.value,
                        }))
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="company">Company Name</Label>
                    <Input
                      id="company"
                      placeholder="Your company (optional)"
                      value={checkoutData.company}
                      onChange={(e) =>
                        setCheckoutData((prev) => ({
                          ...prev,
                          company: e.target.value,
                        }))
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="notes">Project Notes</Label>
                    <Textarea
                      id="notes"
                      placeholder="Any specific requirements or notes about your project..."
                      value={checkoutData.notes}
                      onChange={(e) =>
                        setCheckoutData((prev) => ({
                          ...prev,
                          notes: e.target.value,
                        }))
                      }
                      rows={3}
                    />
                  </div>

                  <Button
                    onClick={handleCheckout}
                    className="w-full"
                    size="lg"
                    variant="hero"
                  >
                    <CreditCard className="h-5 w-5 mr-2" />
                    Submit Order & Pay Now
                  </Button>

                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    {/* <AlertCircle className="h-4 w-4" /> */}
                    {/* <span>
                      We'll contact you within 1 hour to discuss payment options
                      and project details.
                    </span> */}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
