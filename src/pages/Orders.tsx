import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Search, Filter, Calendar, Package, Eye } from "lucide-react";
import type { RootState } from "../redux/store";
import { useSelector } from "react-redux";
import { useAppSelector, useAppDispatch } from "../hooks";
import { logout } from "../features/user/userSlice";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
// Mock data for demonstration

const getStatusColor = (status: string) => {
  switch (status) {
    case "completed":
      return "bg-green-100 text-green-800 border-green-200";
    case "in-progress":
      return "bg-blue-100 text-blue-800 border-blue-200";
    case "pending":
      return "bg-yellow-100 text-yellow-800 border-yellow-200";
    default:
      return "bg-gray-100 text-gray-800 border-gray-200";
  }
};
const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};
const Orders = () => {
  const [orders, setOrders] = useState<any[]>([]);
  const query = useQuery(); // ✅ safe hook usage at top-level
  const navigate = useNavigate();
  const linkToken = query.get("token");

  const user = localStorage.getItem("user");
  const token = localStorage.getItem("token");

  useEffect(() => {
    // ✅ Store token from URL if present
    if (linkToken) {
      localStorage.setItem("token", linkToken);
      console.log("Token saved from URL:", linkToken);
    }

    const response = axios
      .get(
        "https://backend.webextremesinternational.com/api/v1/order/getOrderDetails",
        {
          headers: {
            Authorization: `Bearer ${token || linkToken}`,
          },
        }
      )
      .then((res) => {
        if (res.data.status === 1) {
          console.log(res.data);
          setOrders(Object.values(res.data.data));
          console.log("Orders fetched successfully:", orders);
        } else {
          console.log("User is not authenticated, redirecting to login.");
          navigate("/login");
        }
      })
      .catch((error) => {
        console.error("Error checking authentication:", error);
        alert(
          "An error occurred while checking authentication. Please try again."
        );
      });

    // ✅ Redirect or show message if no token is present
    const effectiveToken = linkToken || token;
    if (!effectiveToken) {
      alert("Please login first.");
      navigate("/login"); // or navigate to your login route
    } else {
      console.log("User is logged in:", user ? JSON.parse(user) : null);
    }
  }, [linkToken, token, user, navigate]);

  const dispatch = useAppDispatch();
  console.log("Current User:", user, token);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredOrders = orders.filter((order) => {
    console.log("Filtering order:", order);
    const matchesSearch =
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.service.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || order.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Orders</h1>
            <p className="text-muted-foreground">
              Track and manage all customer orders
            </p>
          </div>
          <div className="text-sm text-muted-foreground">
            Total Orders: {orders.length}
          </div>
        </div>

        {/* Filters */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="h-5 w-5" />
              Filters
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search orders, customers, or services..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Orders List */}
        <div className="space-y-4">
          {filteredOrders.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <Package className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold">No orders found</h3>
                <p className="text-muted-foreground text-center">
                  No orders match your current search criteria.
                </p>
              </CardContent>
            </Card>
          ) : (
            filteredOrders.map((order) => (
              <Card
                key={order.id}
                className="hover:shadow-md transition-shadow"
              >
                <CardHeader>
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="space-y-1">
                      <CardTitle className="flex items-center gap-2">
                        {order.id}
                        <Badge className={getStatusColor(order.status)}>
                          {order.status.replace("-", " ")}
                        </Badge>
                      </CardTitle>
                      <CardDescription className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        {order.date}
                      </CardDescription>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-primary">
                        {order.amount}
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-lg">{order.service}</h4>
                      <p className="text-muted-foreground">
                        {order.description}
                      </p>
                    </div>

                    <Separator />

                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div>
                        <p className="font-medium">{order.customer}</p>
                        <p className="text-sm text-muted-foreground">
                          {order.email}
                        </p>
                      </div>
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 mr-2" />
                        View Details
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Orders;
