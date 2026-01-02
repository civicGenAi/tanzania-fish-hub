# Tanzania Fish Hub - Supabase Backend Implementation Plan

## Overview
This document outlines the complete backend implementation plan using Supabase for the Tanzania Fish Hub marketplace platform. The backend will support customers, sellers, distributors, and administrators.

---

## 1. Database Schema

### 1.1 User Management Tables

#### `profiles`
- `id` (uuid, PK, references auth.users)
- `email` (text, unique)
- `full_name` (text)
- `phone` (text)
- `avatar_url` (text)
- `user_type` (enum: 'customer', 'seller', 'distributor', 'admin')
- `status` (enum: 'active', 'inactive', 'suspended')
- `created_at` (timestamp)
- `updated_at` (timestamp)

#### `customer_profiles`
- `id` (uuid, PK)
- `user_id` (uuid, FK to profiles)
- `tier` (enum: 'bronze', 'silver', 'gold', 'platinum')
- `loyalty_points` (integer, default 0)
- `total_spent` (decimal)
- `total_orders` (integer)
- `created_at` (timestamp)

#### `seller_profiles`
- `id` (uuid, PK)
- `user_id` (uuid, FK to profiles)
- `business_name` (text)
- `business_license` (text)
- `verification_status` (enum: 'pending', 'verified', 'rejected')
- `rating` (decimal)
- `total_sales` (decimal)
- `commission_rate` (decimal, default 0.15)
- `bank_account` (text)
- `mpesa_number` (text)
- `created_at` (timestamp)

#### `distributor_profiles`
- `id` (uuid, PK)
- `user_id` (uuid, FK to profiles)
- `vehicle_type` (text)
- `vehicle_registration` (text)
- `license_number` (text)
- `verification_status` (enum: 'pending', 'verified', 'rejected')
- `rating` (decimal)
- `total_deliveries` (integer)
- `active_delivery_id` (uuid, nullable, FK to deliveries)
- `status` (enum: 'available', 'busy', 'offline')
- `created_at` (timestamp)

---

### 1.2 Product Tables

#### `categories`
- `id` (uuid, PK)
- `name` (text)
- `slug` (text, unique)
- `description` (text)
- `image_url` (text)
- `parent_id` (uuid, nullable, FK to categories)
- `created_at` (timestamp)

#### `products`
- `id` (uuid, PK)
- `seller_id` (uuid, FK to seller_profiles)
- `category_id` (uuid, FK to categories)
- `name` (text)
- `slug` (text, unique)
- `description` (text)
- `short_description` (text)
- `sku` (text, unique)
- `price` (decimal)
- `compare_price` (decimal, nullable)
- `cost` (decimal)
- `stock` (integer)
- `unit` (text, e.g., 'kg', 'piece')
- `min_order_quantity` (integer, default 1)
- `max_order_quantity` (integer, nullable)
- `images` (text[], array of URLs)
- `status` (enum: 'active', 'inactive', 'out_of_stock')
- `featured` (boolean, default false)
- `rating` (decimal)
- `total_reviews` (integer, default 0)
- `total_sold` (integer, default 0)
- `metadata` (jsonb, for flexible product attributes)
- `created_at` (timestamp)
- `updated_at` (timestamp)

#### `product_variants`
- `id` (uuid, PK)
- `product_id` (uuid, FK to products)
- `name` (text, e.g., "500g", "1kg")
- `sku` (text, unique)
- `price` (decimal)
- `stock` (integer)
- `attributes` (jsonb, e.g., {"size": "500g", "package": "vacuum"})
- `created_at` (timestamp)

---

### 1.3 Order Tables

#### `orders`
- `id` (uuid, PK)
- `order_number` (text, unique, e.g., "ORD-2345")
- `customer_id` (uuid, FK to customer_profiles)
- `status` (enum: 'pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled', 'refunded')
- `payment_status` (enum: 'pending', 'paid', 'failed', 'refunded')
- `payment_method` (enum: 'mpesa', 'cash', 'bank_transfer', 'card')
- `subtotal` (decimal)
- `shipping_fee` (decimal)
- `tax` (decimal)
- `discount` (decimal)
- `total` (decimal)
- `notes` (text)
- `shipping_address_id` (uuid, FK to addresses)
- `assigned_distributor_id` (uuid, nullable, FK to distributor_profiles)
- `created_at` (timestamp)
- `updated_at` (timestamp)

#### `order_items`
- `id` (uuid, PK)
- `order_id` (uuid, FK to orders)
- `product_id` (uuid, FK to products)
- `variant_id` (uuid, nullable, FK to product_variants)
- `seller_id` (uuid, FK to seller_profiles)
- `name` (text, snapshot of product name)
- `quantity` (integer)
- `unit_price` (decimal)
- `total_price` (decimal)
- `status` (enum: 'pending', 'confirmed', 'packed', 'shipped', 'delivered')
- `created_at` (timestamp)

#### `order_status_history`
- `id` (uuid, PK)
- `order_id` (uuid, FK to orders)
- `status` (text)
- `notes` (text)
- `changed_by` (uuid, FK to profiles)
- `created_at` (timestamp)

---

### 1.4 Delivery & Logistics Tables

#### `deliveries`
- `id` (uuid, PK)
- `delivery_number` (text, unique, e.g., "DEL-001")
- `order_id` (uuid, FK to orders)
- `distributor_id` (uuid, FK to distributor_profiles)
- `status` (enum: 'pending', 'assigned', 'picked_up', 'in_transit', 'delivered', 'failed', 'cancelled')
- `priority` (enum: 'normal', 'high', 'urgent')
- `pickup_location` (text)
- `delivery_location` (text)
- `pickup_lat` (decimal)
- `pickup_lng` (decimal)
- `delivery_lat` (decimal)
- `delivery_lng` (decimal)
- `distance` (decimal, in km)
- `estimated_time` (integer, in minutes)
- `scheduled_time` (timestamp)
- `pickup_time` (timestamp, nullable)
- `delivery_time` (timestamp, nullable)
- `proof_of_delivery` (text, image URL)
- `signature` (text, image URL)
- `notes` (text)
- `created_at` (timestamp)
- `updated_at` (timestamp)

#### `delivery_tracking`
- `id` (uuid, PK)
- `delivery_id` (uuid, FK to deliveries)
- `lat` (decimal)
- `lng` (decimal)
- `status` (text)
- `notes` (text)
- `created_at` (timestamp)

---

### 1.5 Address Tables

#### `addresses`
- `id` (uuid, PK)
- `user_id` (uuid, FK to profiles)
- `type` (enum: 'home', 'work', 'other')
- `label` (text)
- `full_name` (text)
- `phone` (text)
- `street_address` (text)
- `city` (text)
- `region` (text)
- `postal_code` (text)
- `country` (text, default 'Tanzania')
- `lat` (decimal, nullable)
- `lng` (decimal, nullable)
- `is_default` (boolean, default false)
- `created_at` (timestamp)
- `updated_at` (timestamp)

---

### 1.6 Payment Tables

#### `payments`
- `id` (uuid, PK)
- `order_id` (uuid, FK to orders)
- `user_id` (uuid, FK to profiles)
- `payment_method` (text)
- `amount` (decimal)
- `currency` (text, default 'TZS')
- `status` (enum: 'pending', 'completed', 'failed', 'refunded')
- `transaction_id` (text, unique)
- `mpesa_receipt` (text, nullable)
- `provider_response` (jsonb)
- `created_at` (timestamp)
- `updated_at` (timestamp)

#### `seller_earnings`
- `id` (uuid, PK)
- `seller_id` (uuid, FK to seller_profiles)
- `order_item_id` (uuid, FK to order_items)
- `order_id` (uuid, FK to orders)
- `gross_amount` (decimal)
- `commission_amount` (decimal)
- `net_amount` (decimal)
- `status` (enum: 'pending', 'available', 'paid')
- `payout_id` (uuid, nullable, FK to payouts)
- `created_at` (timestamp)

#### `payouts`
- `id` (uuid, PK)
- `seller_id` (uuid, FK to seller_profiles)
- `amount` (decimal)
- `method` (enum: 'mpesa', 'bank_transfer')
- `account_details` (jsonb)
- `status` (enum: 'pending', 'processing', 'completed', 'failed')
- `transaction_id` (text)
- `processed_at` (timestamp, nullable)
- `created_at` (timestamp)

---

### 1.7 Review & Rating Tables

#### `reviews`
- `id` (uuid, PK)
- `product_id` (uuid, FK to products)
- `order_item_id` (uuid, FK to order_items)
- `customer_id` (uuid, FK to customer_profiles)
- `seller_id` (uuid, FK to seller_profiles)
- `rating` (integer, 1-5)
- `title` (text)
- `comment` (text)
- `images` (text[], array of URLs)
- `status` (enum: 'pending', 'published', 'flagged', 'rejected')
- `verified_purchase` (boolean, default true)
- `helpful_count` (integer, default 0)
- `not_helpful_count` (integer, default 0)
- `seller_response` (text, nullable)
- `responded_at` (timestamp, nullable)
- `created_at` (timestamp)
- `updated_at` (timestamp)

#### `review_votes`
- `id` (uuid, PK)
- `review_id` (uuid, FK to reviews)
- `user_id` (uuid, FK to profiles)
- `vote_type` (enum: 'helpful', 'not_helpful')
- `created_at` (timestamp)
- Unique constraint on (review_id, user_id)

---

### 1.8 Region & Location Tables

#### `regions`
- `id` (uuid, PK)
- `name` (text)
- `code` (text, unique)
- `population` (integer)
- `delivery_fee` (decimal)
- `avg_delivery_time` (integer, in minutes)
- `coverage` (decimal, percentage 0-100)
- `active` (boolean, default true)
- `bounds` (jsonb, geojson polygon)
- `created_at` (timestamp)

#### `region_stats`
- `id` (uuid, PK)
- `region_id` (uuid, FK to regions)
- `date` (date)
- `total_orders` (integer)
- `total_customers` (integer)
- `total_revenue` (decimal)
- `created_at` (timestamp)

---

### 1.9 Notification Tables

#### `notifications`
- `id` (uuid, PK)
- `user_id` (uuid, FK to profiles)
- `type` (text, e.g., 'order_update', 'new_message', 'low_stock')
- `title` (text)
- `message` (text)
- `data` (jsonb, additional context)
- `read` (boolean, default false)
- `read_at` (timestamp, nullable)
- `action_url` (text, nullable)
- `created_at` (timestamp)

---

### 1.10 Message & Communication Tables

#### `conversations`
- `id` (uuid, PK)
- `customer_id` (uuid, FK to profiles)
- `subject` (text)
- `status` (enum: 'open', 'pending', 'resolved', 'closed')
- `priority` (enum: 'normal', 'high', 'urgent')
- `last_message_at` (timestamp)
- `created_at` (timestamp)
- `updated_at` (timestamp)

#### `messages`
- `id` (uuid, PK)
- `conversation_id` (uuid, FK to conversations)
- `sender_id` (uuid, FK to profiles)
- `sender_type` (enum: 'customer', 'admin', 'system')
- `content` (text)
- `attachments` (text[], array of URLs)
- `read` (boolean, default false)
- `read_at` (timestamp, nullable)
- `created_at` (timestamp)

---

### 1.11 Analytics & Reporting Tables

#### `analytics_events`
- `id` (uuid, PK)
- `event_type` (text, e.g., 'page_view', 'product_view', 'add_to_cart')
- `user_id` (uuid, nullable, FK to profiles)
- `session_id` (text)
- `data` (jsonb)
- `ip_address` (text)
- `user_agent` (text)
- `created_at` (timestamp)

#### `daily_stats`
- `id` (uuid, PK)
- `date` (date, unique)
- `total_orders` (integer)
- `total_revenue` (decimal)
- `total_customers` (integer)
- `new_customers` (integer)
- `avg_order_value` (decimal)
- `created_at` (timestamp)

---

### 1.12 Audit Trail Tables

#### `audit_logs`
- `id` (uuid, PK)
- `user_id` (uuid, FK to profiles)
- `action` (text, e.g., 'create', 'update', 'delete')
- `resource_type` (text, e.g., 'order', 'product', 'user')
- `resource_id` (uuid)
- `changes` (jsonb, before/after values)
- `ip_address` (text)
- `user_agent` (text)
- `created_at` (timestamp)

---

## 2. Authentication & Authorization

### 2.1 Authentication Strategy

**Supabase Auth** will handle:
- Email/password authentication
- Phone number authentication (OTP via SMS)
- Social OAuth (Google, Facebook - optional)
- Magic link authentication
- Session management with JWT tokens

### 2.2 Row Level Security (RLS) Policies

#### Customers
- Can read their own profile
- Can create/update their own addresses
- Can read their own orders
- Can create reviews for purchased products
- Can read published reviews

#### Sellers
- Can read/update their own seller profile
- Can CRUD their own products
- Can read orders containing their products
- Can update order_items status for their products
- Can read reviews for their products
- Can respond to reviews

#### Distributors
- Can read/update their own distributor profile
- Can read assigned deliveries
- Can update delivery status and tracking
- Can read order details for assigned deliveries

#### Admins
- Full access to all tables (except sensitive auth data)
- Can manage users, products, orders, reviews
- Can view audit logs and analytics

### 2.3 Custom Claims
Add custom claims to JWT tokens:
```javascript
{
  user_type: 'customer' | 'seller' | 'distributor' | 'admin',
  seller_id: 'uuid',
  verified: boolean
}
```

---

## 3. Storage Buckets

### 3.1 Public Buckets
- `product-images` - Product photos
- `category-images` - Category images
- `avatars` - User profile pictures

### 3.2 Private Buckets
- `documents` - Business licenses, verification documents
- `delivery-proofs` - Delivery photos and signatures
- `review-images` - Customer review photos

### 3.3 Storage Policies
- Public buckets: Read access for all, write for authenticated users
- Private buckets: Access based on user role and ownership

---

## 4. Edge Functions (Supabase Functions)

### 4.1 Payment Processing
**Function: `process-mpesa-payment`**
- Initiate M-Pesa STK Push
- Verify payment status
- Update order payment status
- Trigger order confirmation

**Function: `mpesa-callback`**
- Handle M-Pesa callback
- Update payment records
- Send confirmation notifications

### 4.2 Order Management
**Function: `create-order`**
- Validate cart items
- Check stock availability
- Calculate totals (shipping, tax, discounts)
- Create order and order_items
- Reduce product stock
- Assign to nearest distributor

**Function: `assign-distributor`**
- Find available distributors in region
- Calculate distance and assign
- Send notification to distributor

### 4.3 Notifications
**Function: `send-notification`**
- Create notification record
- Send email via SendGrid/Resend
- Send SMS via Africa's Talking/Twilio
- Send push notification (if mobile app)

### 4.4 Analytics
**Function: `generate-daily-stats`**
- Aggregate daily statistics
- Update daily_stats table
- Scheduled to run daily at midnight

### 4.5 Search & Recommendations
**Function: `search-products`**
- Full-text search on products
- Filter by category, price, rating
- Sort by relevance, price, popularity

**Function: `get-recommendations`**
- Product recommendations based on:
  - User purchase history
  - Popular products
  - Similar products

---

## 5. Real-time Subscriptions

### 5.1 Customer Subscriptions
- `orders` - Real-time order status updates
- `notifications` - New notifications
- `conversations` - New messages

### 5.2 Seller Subscriptions
- `order_items` - New orders for their products
- `reviews` - New reviews for their products
- `earnings` - Earning updates

### 5.3 Distributor Subscriptions
- `deliveries` - New delivery assignments
- `order` status updates for active deliveries

### 5.4 Admin Subscriptions
- `orders` - All order updates
- `audit_logs` - System activity monitoring

---

## 6. API Integration Layer

### 6.1 Supabase Client Setup
```typescript
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
```

### 6.2 Database Helpers
Create typed helpers for database operations:
- `lib/supabase/products.ts` - Product queries
- `lib/supabase/orders.ts` - Order operations
- `lib/supabase/auth.ts` - Auth helpers
- `lib/supabase/reviews.ts` - Review operations

### 6.3 React Query Integration
Use `@tanstack/react-query` for:
- Data fetching and caching
- Optimistic updates
- Background refetching
- Pagination

---

## 7. Third-Party Integrations

### 7.1 Payment Gateway
- **M-Pesa (Daraja API)**
  - STK Push for customer payments
  - B2C for seller payouts
  - Payment verification

### 7.2 SMS Provider
- **Africa's Talking** or **Twilio**
  - OTP for authentication
  - Order notifications
  - Delivery updates

### 7.3 Email Service
- **Resend** or **SendGrid**
  - Order confirmations
  - Shipping notifications
  - Marketing emails

### 7.4 Maps & Geocoding
- **Google Maps API** or **Mapbox**
  - Address geocoding
  - Distance calculation
  - Route optimization for deliveries

---

## 8. Implementation Phases

### Phase 1: Foundation (Week 1-2)
1. Set up Supabase project
2. Create database schema and tables
3. Set up RLS policies
4. Configure storage buckets
5. Implement authentication

### Phase 2: Core Features (Week 3-4)
1. Product management (CRUD)
2. Shopping cart functionality
3. Order creation and management
4. Basic payment integration (M-Pesa)

### Phase 3: Advanced Features (Week 5-6)
1. Delivery & logistics system
2. Real-time order tracking
3. Review and rating system
4. Notification system

### Phase 4: Admin & Analytics (Week 7-8)
1. Admin dashboard data integration
2. Analytics and reporting
3. Audit trail system
4. Scheduled jobs (Edge Functions)

### Phase 5: Optimization & Testing (Week 9-10)
1. Performance optimization
2. Security audit
3. Load testing
4. Bug fixes and refinements

---

## 9. Environment Variables

```env
# Supabase
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key (server only)

# M-Pesa
MPESA_CONSUMER_KEY=your-consumer-key
MPESA_CONSUMER_SECRET=your-consumer-secret
MPESA_SHORTCODE=your-shortcode
MPESA_PASSKEY=your-passkey

# SMS
AFRICAS_TALKING_API_KEY=your-api-key
AFRICAS_TALKING_USERNAME=your-username

# Email
RESEND_API_KEY=your-api-key

# Maps
VITE_GOOGLE_MAPS_API_KEY=your-api-key
```

---

## 10. Security Considerations

1. **RLS Policies**: Strict policies on all tables
2. **API Rate Limiting**: Implement rate limiting on Edge Functions
3. **Input Validation**: Validate all user inputs
4. **SQL Injection**: Use parameterized queries
5. **XSS Protection**: Sanitize user-generated content
6. **Secrets Management**: Use Supabase Vault for sensitive data
7. **HTTPS Only**: Enforce HTTPS for all connections
8. **JWT Validation**: Verify JWT tokens on all protected routes

---

## 11. Monitoring & Maintenance

1. **Error Tracking**: Integrate Sentry or similar
2. **Performance Monitoring**: Supabase Dashboard + custom metrics
3. **Backup Strategy**: Daily automated backups via Supabase
4. **Database Migrations**: Version control all schema changes
5. **Logging**: Comprehensive logging in Edge Functions

---

## 12. Cost Estimation (Supabase Pro Plan)

- **Database**: ~$25/month (Pro plan)
- **Storage**: ~$0.021/GB/month
- **Bandwidth**: ~$0.09/GB
- **Edge Functions**: First 2M invocations free
- **Auth**: Unlimited MAUs on Pro

**Estimated Monthly Cost**: $25-100 (depending on usage)

---

## Next Steps

After approval of this plan:
1. Set up Supabase project
2. Create database migrations
3. Implement RLS policies
4. Build API integration layer
5. Integrate with existing React frontend

This plan provides a complete, scalable backend architecture for the Tanzania Fish Hub platform using Supabase.
