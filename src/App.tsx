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
import About from "./pages/About";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import Dashboard from "./pages/Dashboard";
import SellerDashboard from "./pages/SellerDashboard";
import DistributorDashboard from "./pages/DistributorDashboard";
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
import SellerDeliveries from "./pages/seller/SellerDeliveries";
import SellerMessages from "./pages/seller/SellerMessages";
import SellerNotifications from "./pages/seller/SellerNotifications";

// Distributor pages
import DistributorActive from "./pages/distributor/DistributorActive";
import DistributorQueue from "./pages/distributor/DistributorQueue";
import DistributorMap from "./pages/distributor/DistributorMap";
import DistributorEarnings from "./pages/distributor/DistributorEarnings";
import DistributorSettings from "./pages/distributor/DistributorSettings";
import DistributorSchedule from "./pages/distributor/DistributorSchedule";
import DistributorPickups from "./pages/distributor/DistributorPickups";
import DistributorCompleted from "./pages/distributor/DistributorCompleted";
import DistributorHistory from "./pages/distributor/DistributorHistory";
import DistributorSupport from "./pages/distributor/DistributorSupport";
import DistributorNotifications from "./pages/distributor/DistributorNotifications";

// Admin pages
import AdminDashboard from "./pages/admin/AdminDashboard";
import Overview from "./pages/admin/Overview";
import Analytics from "./pages/admin/Analytics";
import Orders from "./pages/admin/Orders";
import Sales from "./pages/admin/Sales";
import Customers from "./pages/admin/Customers";
import Products from "./pages/admin/Products";
import AuditTrails from "./pages/admin/AuditTrails";
import UserManagement from "./pages/admin/UserManagement";
import Settings from "./pages/admin/Settings";

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
              <Route path="/about" element={<About />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:id" element={<BlogPost />} />

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
              <Route path="/seller/products/new" element={<SellerNewProduct />} />
              <Route path="/seller/orders" element={<SellerOrders />} />
              <Route path="/seller/analytics" element={<SellerAnalytics />} />
              <Route path="/seller/earnings" element={<SellerEarnings />} />
              <Route path="/seller/customers" element={<SellerCustomers />} />
              <Route path="/seller/reviews" element={<SellerReviews />} />
              <Route path="/seller/deliveries" element={<SellerDeliveries />} />
              <Route path="/seller/messages" element={<SellerMessages />} />
              <Route path="/seller/notifications" element={<SellerNotifications />} />
              <Route path="/seller/new-product" element={<SellerNewProduct />} />
              <Route path="/seller/settings" element={<SellerSettings />} />

              {/* Distributor Dashboard Routes */}
              <Route path="/distributor" element={<DistributorDashboard />} />
              <Route path="/distributor/queue" element={<DistributorQueue />} />
              <Route path="/distributor/active" element={<DistributorActive />} />
              <Route path="/distributor/map" element={<DistributorMap />} />
              <Route path="/distributor/schedule" element={<DistributorSchedule />} />
              <Route path="/distributor/pickups" element={<DistributorPickups />} />
              <Route path="/distributor/completed" element={<DistributorCompleted />} />
              <Route path="/distributor/history" element={<DistributorHistory />} />
              <Route path="/distributor/earnings" element={<DistributorEarnings />} />
              <Route path="/distributor/support" element={<DistributorSupport />} />
              <Route path="/distributor/notifications" element={<DistributorNotifications />} />
              <Route path="/distributor/settings" element={<DistributorSettings />} />

              {/* Admin Dashboard Routes */}
              <Route path="/admin" element={<AdminDashboard />}>
                <Route index element={<Overview />} />
                <Route path="analytics" element={<Analytics />} />
                <Route path="orders" element={<Orders />} />
                <Route path="sales" element={<Sales />} />
                <Route path="customers" element={<Customers />} />
                <Route path="products" element={<Products />} />
                <Route path="audit" element={<AuditTrails />} />
                <Route path="users" element={<UserManagement />} />
                <Route path="settings" element={<Settings />} />
              </Route>

              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </CartProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
