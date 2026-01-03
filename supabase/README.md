# Supabase Database Setup Guide

This guide will help you set up the complete database schema for Tanzania Fish Hub.

## Prerequisites

- Supabase account with a project created
- Access to Supabase SQL Editor

## Database Schema Overview

The database consists of 10 migration files that create:

1. **User Management** - Profiles, customers, sellers, distributors
2. **Products** - Categories, products, variants
3. **Orders** - Orders, order items, status tracking
4. **Deliveries** - Delivery tracking, addresses
5. **Payments** - Payment records, seller earnings, payouts
6. **Reviews** - Product reviews and ratings
7. **Regions** - Regional coverage and statistics
8. **Messaging** - Notifications and customer support
9. **Analytics** - Events, daily stats, audit logs
10. **Sample Data** - Initial data and dashboard views

## How to Run Migrations

### Option 1: Supabase SQL Editor (Recommended)

1. Go to your Supabase project dashboard
2. Navigate to **SQL Editor** in the left sidebar
3. Run each migration file in order (001 → 010):

```sql
-- Copy and paste the contents of each file in order:
-- 1. migrations/001_user_management_tables.sql
-- 2. migrations/002_product_tables.sql
-- 3. migrations/003_order_tables.sql
-- ... and so on
```

4. Click **RUN** after pasting each migration
5. Verify there are no errors before proceeding to the next

### Option 2: Supabase CLI

If you have Supabase CLI installed:

```bash
# Link to your project
supabase link --project-ref YOUR_PROJECT_REF

# Run all migrations
supabase db push
```

## Migration Order

**⚠️ IMPORTANT: Run migrations in this exact order:**

1. `001_user_management_tables.sql` - Creates base user tables and enums
2. `002_product_tables.sql` - Creates product catalog tables
3. `003_order_tables.sql` - Creates order management tables
4. `004_delivery_logistics_tables.sql` - Creates delivery and address tables
5. `005_payment_tables.sql` - Creates payment and earnings tables
6. `006_review_rating_tables.sql` - Creates review system
7. `007_region_location_tables.sql` - Creates regions and adds default data
8. `008_notification_messaging_tables.sql` - Creates messaging system
9. `009_analytics_audit_tables.sql` - Creates analytics and audit logging
10. `010_insert_sample_data.sql` - Creates views and sample categories

## What Gets Created

### Tables (30+)
- profiles, customer_profiles, seller_profiles, distributor_profiles
- categories, products, product_variants
- orders, order_items, order_status_history
- deliveries, delivery_tracking, addresses
- payments, seller_earnings, payouts
- reviews, review_votes
- regions, region_stats
- notifications, conversations, messages
- analytics_events, daily_stats, audit_logs

### Enums
- user_type, user_status, verification_status, customer_tier
- product_status, order_status, payment_status, payment_method
- delivery_status, delivery_priority, distributor_status
- review_status, conversation_status, and more

### Views
- seller_dashboard_stats
- customer_dashboard_stats
- distributor_dashboard_stats
- admin_overview_stats

### Functions & Triggers
- Auto-generate order numbers (ORD-XXXXXX)
- Auto-generate delivery numbers (DEL-XXXXXX)
- Auto-update timestamps
- Calculate product ratings
- Update vote counts
- Audit trail logging
- Daily stats calculation

### Indexes
- Performance indexes on all foreign keys
- Full-text search index on products
- Composite indexes for common queries

### Sample Data
- 8 default regions (Dar es Salaam, Mwanza, Arusha, etc.)
- 5 product categories (Fresh Fish, Dried Fish, etc.)

## Verification

After running all migrations, verify the setup:

```sql
-- Check all tables are created
SELECT table_name
FROM information_schema.tables
WHERE table_schema = 'public'
ORDER BY table_name;

-- Check sample categories
SELECT * FROM categories;

-- Check default regions
SELECT * FROM regions;

-- Check views
SELECT * FROM admin_overview_stats;
```

You should see:
- 30+ tables created
- 5 categories inserted
- 8 regions inserted
- 4 views created

## Next Steps

After successfully running all migrations:

1. ✅ Set up Row Level Security (RLS) policies
2. ✅ Configure Storage Buckets
3. ✅ Set up Authentication
4. ✅ Create Edge Functions
5. ✅ Integrate with frontend

## Troubleshooting

### "Extension uuid-ossp does not exist"
Run this first:
```sql
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
```

### "Type already exists"
If you re-run migrations, you may need to drop existing types:
```sql
DROP TYPE IF EXISTS user_type CASCADE;
-- Then re-run the migration
```

### Foreign Key Violations
Make sure to run migrations in order. Foreign keys depend on tables from earlier migrations.

### Permission Errors
Ensure you're running in the SQL Editor with proper permissions. Some operations may require service role access.

## Schema Diagram

```
profiles (base user table)
├── customer_profiles
├── seller_profiles
└── distributor_profiles

categories
└── products
    ├── product_variants
    └── reviews
        └── review_votes

orders
├── order_items (references products & sellers)
├── order_status_history
├── payments
└── deliveries
    └── delivery_tracking

seller_earnings → payouts
addresses
regions → region_stats
conversations → messages
notifications
analytics_events
daily_stats
audit_logs
```

## Support

If you encounter issues:
1. Check migration order
2. Verify no syntax errors in SQL
3. Check Supabase logs in Dashboard
4. Ensure project has enough database space

---

**Ready to proceed?** After successful migration, move to setting up RLS policies.
