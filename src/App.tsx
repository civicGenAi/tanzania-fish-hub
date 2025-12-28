import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "@/contexts/CartContext";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import Marketplace from "./pages/Marketplace";
import FishDetail from "./pages/FishDetail";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Help from "./pages/Help";
import Dashboard from "./pages/Dashboard";
import SellerDashboard from "./pages/SellerDashboard";
import DistributorDashboard from "./pages/DistributorDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import NotFound from "./pages/NotFound";

// Customer pages
import CustomerOrders from "./pages/customer/CustomerOrders";
import CustomerHistory from "./pages/customer/CustomerHistory";
import CustomerFavorites from "./pages/customer/CustomerFavorites";
import CustomerAddresses from "./pages/customer/CustomerAddresses";
import CustomerPayments from "./pages/customer/CustomerPayments";
import CustomerNotifications from "./pages/customer/CustomerNotifications";
import CustomerRewards from "./pages/customer/CustomerRewards";
import CustomerSettings from "./pages/customer/CustomerSettings";

// Seller pages
import SellerProducts from "./pages/seller/SellerProducts";
import SellerOrders from "./pages/seller/SellerOrders";
import SellerAnalytics from "./pages/seller/SellerAnalytics";
import SellerEarnings from "./pages/seller/SellerEarnings";
import SellerCustomers from "./pages/seller/SellerCustomers";
import SellerReviews from "./pages/seller/SellerReviews";
import SellerNewProduct from "./pages/seller/SellerNewProduct";
import SellerSettings from "./pages/seller/SellerSettings";

// Distributor pages
import DistributorActive from "./pages/distributor/DistributorActive";
import DistributorQueue from "./pages/distributor/DistributorQueue";
import DistributorMap from "./pages/distributor/DistributorMap";
import DistributorEarnings from "./pages/distributor/DistributorEarnings";
import DistributorSettings from "./pages/distributor/DistributorSettings";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <CartProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/marketplace" element={<Marketplace />} />
              <Route path="/fish/:id" element={<FishDetail />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/login" element={<Login />} />
              <Route path="/help" element={<Help />} />

              {/* Customer Dashboard Routes */}
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/dashboard/orders" element={<CustomerOrders />} />
              <Route path="/dashboard/history" element={<CustomerHistory />} />
              <Route path="/dashboard/favorites" element={<CustomerFavorites />} />
              <Route path="/dashboard/addresses" element={<CustomerAddresses />} />
              <Route path="/dashboard/payments" element={<CustomerPayments />} />
              <Route path="/dashboard/notifications" element={<CustomerNotifications />} />
              <Route path="/dashboard/rewards" element={<CustomerRewards />} />
              <Route path="/dashboard/settings" element={<CustomerSettings />} />

              {/* Seller Dashboard Routes */}
              <Route path="/seller" element={<SellerDashboard />} />
              <Route path="/seller/products" element={<SellerProducts />} />
              <Route path="/seller/orders" element={<SellerOrders />} />
              <Route path="/seller/analytics" element={<SellerAnalytics />} />
              <Route path="/seller/earnings" element={<SellerEarnings />} />
              <Route path="/seller/customers" element={<SellerCustomers />} />
              <Route path="/seller/reviews" element={<SellerReviews />} />
              <Route path="/seller/new-product" element={<SellerNewProduct />} />
              <Route path="/seller/settings" element={<SellerSettings />} />

              {/* Distributor Dashboard Routes */}
              <Route path="/distributor" element={<DistributorDashboard />} />
              <Route path="/distributor/active" element={<DistributorActive />} />
              <Route path="/distributor/queue" element={<DistributorQueue />} />
              <Route path="/distributor/map" element={<DistributorMap />} />
              <Route path="/distributor/earnings" element={<DistributorEarnings />} />
              <Route path="/distributor/settings" element={<DistributorSettings />} />

              {/* Admin Dashboard Route */}
              <Route path="/admin" element={<AdminDashboard />} />

              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </CartProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
