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
import Checkout from "./pages/Checkout";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ProfileSetup from "./pages/ProfileSetup";
import Help from "./pages/Help";
import About from "./pages/About";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import Dashboard from "./pages/Dashboard";
import { ProtectedRoute, GuestRoute } from "./components/ProtectedRoute";
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
import SellerEditProduct from "./pages/seller/SellerEditProduct";
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
import Logistics from "./pages/admin/Logistics";
import Regions from "./pages/admin/Regions";
import Reviews from "./pages/admin/Reviews";
import Reports from "./pages/admin/Reports";
import Messages from "./pages/admin/Messages";
import Contact from "./pages/Contact";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";

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
              {/* Public Routes */}
              <Route path="/" element={<Index />} />
              <Route path="/marketplace" element={<Marketplace />} />
              <Route path="/fish/:id" element={<FishDetail />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/help" element={<Help />} />
              <Route path="/about" element={<About />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:id" element={<BlogPost />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/terms" element={<Terms />} />

              {/* Auth Routes - Redirect to dashboard if already logged in */}
              <Route path="/login" element={<GuestRoute><Login /></GuestRoute>} />
              <Route path="/signup" element={<GuestRoute><Signup /></GuestRoute>} />
              <Route path="/profile-setup" element={<ProfileSetup />} />

              {/* Customer Dashboard Routes - Protected */}
              <Route path="/dashboard" element={
                <ProtectedRoute allowedRoles={['customer']}>
                  <Dashboard />
                </ProtectedRoute>
              } />
              <Route path="/dashboard/orders" element={<ProtectedRoute allowedRoles={['customer']}><CustomerOrders /></ProtectedRoute>} />
              <Route path="/dashboard/history" element={<ProtectedRoute allowedRoles={['customer']}><CustomerHistory /></ProtectedRoute>} />
              <Route path="/dashboard/favorites" element={<ProtectedRoute allowedRoles={['customer']}><CustomerFavorites /></ProtectedRoute>} />
              <Route path="/dashboard/addresses" element={<ProtectedRoute allowedRoles={['customer']}><CustomerAddresses /></ProtectedRoute>} />
              <Route path="/dashboard/payments" element={<ProtectedRoute allowedRoles={['customer']}><CustomerPayments /></ProtectedRoute>} />
              <Route path="/dashboard/notifications" element={<ProtectedRoute allowedRoles={['customer']}><CustomerNotifications /></ProtectedRoute>} />
              <Route path="/dashboard/rewards" element={<ProtectedRoute allowedRoles={['customer']}><CustomerRewards /></ProtectedRoute>} />
              <Route path="/dashboard/settings" element={<ProtectedRoute allowedRoles={['customer']}><CustomerSettings /></ProtectedRoute>} />

              {/* Seller Dashboard Routes - Protected */}
              <Route path="/seller" element={<ProtectedRoute allowedRoles={['seller']}><SellerDashboard /></ProtectedRoute>} />
              <Route path="/seller/products" element={<ProtectedRoute allowedRoles={['seller']}><SellerProducts /></ProtectedRoute>} />
              <Route path="/seller/products/new" element={<ProtectedRoute allowedRoles={['seller']}><SellerNewProduct /></ProtectedRoute>} />
              <Route path="/seller/products/:id/edit" element={<ProtectedRoute allowedRoles={['seller']}><SellerEditProduct /></ProtectedRoute>} />
              <Route path="/seller/orders" element={<ProtectedRoute allowedRoles={['seller']}><SellerOrders /></ProtectedRoute>} />
              <Route path="/seller/analytics" element={<ProtectedRoute allowedRoles={['seller']}><SellerAnalytics /></ProtectedRoute>} />
              <Route path="/seller/earnings" element={<ProtectedRoute allowedRoles={['seller']}><SellerEarnings /></ProtectedRoute>} />
              <Route path="/seller/customers" element={<ProtectedRoute allowedRoles={['seller']}><SellerCustomers /></ProtectedRoute>} />
              <Route path="/seller/reviews" element={<ProtectedRoute allowedRoles={['seller']}><SellerReviews /></ProtectedRoute>} />
              <Route path="/seller/deliveries" element={<ProtectedRoute allowedRoles={['seller']}><SellerDeliveries /></ProtectedRoute>} />
              <Route path="/seller/messages" element={<ProtectedRoute allowedRoles={['seller']}><SellerMessages /></ProtectedRoute>} />
              <Route path="/seller/notifications" element={<ProtectedRoute allowedRoles={['seller']}><SellerNotifications /></ProtectedRoute>} />
              <Route path="/seller/new-product" element={<ProtectedRoute allowedRoles={['seller']}><SellerNewProduct /></ProtectedRoute>} />
              <Route path="/seller/settings" element={<ProtectedRoute allowedRoles={['seller']}><SellerSettings /></ProtectedRoute>} />

              {/* Distributor Dashboard Routes - Protected */}
              <Route path="/distributor" element={<ProtectedRoute allowedRoles={['distributor']}><DistributorDashboard /></ProtectedRoute>} />
              <Route path="/distributor/queue" element={<ProtectedRoute allowedRoles={['distributor']}><DistributorQueue /></ProtectedRoute>} />
              <Route path="/distributor/active" element={<ProtectedRoute allowedRoles={['distributor']}><DistributorActive /></ProtectedRoute>} />
              <Route path="/distributor/map" element={<ProtectedRoute allowedRoles={['distributor']}><DistributorMap /></ProtectedRoute>} />
              <Route path="/distributor/schedule" element={<ProtectedRoute allowedRoles={['distributor']}><DistributorSchedule /></ProtectedRoute>} />
              <Route path="/distributor/pickups" element={<ProtectedRoute allowedRoles={['distributor']}><DistributorPickups /></ProtectedRoute>} />
              <Route path="/distributor/completed" element={<ProtectedRoute allowedRoles={['distributor']}><DistributorCompleted /></ProtectedRoute>} />
              <Route path="/distributor/history" element={<ProtectedRoute allowedRoles={['distributor']}><DistributorHistory /></ProtectedRoute>} />
              <Route path="/distributor/earnings" element={<ProtectedRoute allowedRoles={['distributor']}><DistributorEarnings /></ProtectedRoute>} />
              <Route path="/distributor/support" element={<ProtectedRoute allowedRoles={['distributor']}><DistributorSupport /></ProtectedRoute>} />
              <Route path="/distributor/notifications" element={<ProtectedRoute allowedRoles={['distributor']}><DistributorNotifications /></ProtectedRoute>} />
              <Route path="/distributor/settings" element={<ProtectedRoute allowedRoles={['distributor']}><DistributorSettings /></ProtectedRoute>} />

              {/* Admin Dashboard Routes - Protected */}
              <Route path="/admin" element={<ProtectedRoute allowedRoles={['admin']}><AdminDashboard /></ProtectedRoute>}>
                <Route index element={<Overview />} />
                <Route path="analytics" element={<Analytics />} />
                <Route path="orders" element={<Orders />} />
                <Route path="sales" element={<Sales />} />
                <Route path="customers" element={<Customers />} />
                <Route path="products" element={<Products />} />
                <Route path="logistics" element={<Logistics />} />
                <Route path="regions" element={<Regions />} />
                <Route path="reviews" element={<Reviews />} />
                <Route path="reports" element={<Reports />} />
                <Route path="audit" element={<AuditTrails />} />
                <Route path="users" element={<UserManagement />} />
                <Route path="messages" element={<Messages />} />
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
