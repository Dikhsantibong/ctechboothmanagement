# SaaS Photobooth Management - Database Documentation

## Overview
Dokumentasi lengkap untuk struktur database Laravel 13 React Inertia SaaS Photobooth Management System.

## Migrations Created

### 1. tenants_table
**File:** `database/migrations/2025_08_14_170934_create_tenants_table.php`

**Columns:**
- `id` - Primary key
- `business_name` - Nama usaha tenant
- `owner_name` - Nama pemilik
- `email` - Email tenant (unique)
- `phone` - Nomor telepon
- `city` - Kota
- `address` - Alamat lengkap (nullable)
- `status` - Enum: active, inactive, suspended, trial
- `trial_ends_at` - Tanggal berakhir trial (nullable)
- `logo` - Path logo (nullable)
- `slug` - URL slug (unique)
- `settings` - JSON settings (nullable)
- `timestamps` - created_at, updated_at
- `softDeletes` - deleted_at

### 2. subscription_plans_table
**File:** `database/migrations/2025_08_14_170935_create_subscription_plans_table.php`

**Columns:**
- `id` - Primary key
- `name` - Nama paket
- `slug` - URL slug (unique)
- `description` - Deskripsi paket (nullable)
- `price` - Harga (decimal 10,2)
- `currency` - Mata uang (default: IDR)
- `duration_days` - Durasi dalam hari
- `billing_cycle` - Enum: monthly, yearly, custom
- `is_active` - Status aktif (boolean)
- `is_trial` - Status trial (boolean)
- `trial_days` - Hari trial (nullable)
- `max_booths` - Maksimal booth
- `max_users` - Maksimal user
- `storage_limit_mb` - Limit storage dalam MB
- `metadata` - JSON metadata (nullable)
- `timestamps`

### 3. subscription_plan_features_table
**File:** `database/migrations/2025_08_14_170936_create_subscription_plan_features_table.php`

**Columns:**
- `id` - Primary key
- `subscription_plan_id` - Foreign key ke subscription_plans
- `feature_name` - Nama fitur
- `feature_key` - Key fitur (unique)
- `description` - Deskripsi fitur (nullable)
- `limit` - Batas penggunaan (nullable)
- `is_enabled` - Status aktif (boolean)
- `timestamps`

**Indexes:**
- Unique constraint pada [subscription_plan_id, feature_key]

### 4. tenant_subscriptions_table
**File:** `database/migrations/2025_08_14_170937_create_tenant_subscriptions_table.php`

**Columns:**
- `id` - Primary key
- `tenant_id` - Foreign key ke tenants
- `subscription_plan_id` - Foreign key ke subscription_plans
- `subscription_number` - Nomor subscription (unique)
- `starts_at` - Tanggal mulai
- `ends_at` - Tanggal berakhir (nullable)
- `trial_ends_at` - Tanggal berakhir trial (nullable)
- `status` - Enum: active, trial, expired, suspended, cancelled
- `amount` - Nominal pembayaran
- `currency` - Mata uang (default: IDR)
- `auto_renew` - Auto renew (boolean)
- `cancelled_at` - Tanggal cancel (nullable)
- `cancellation_reason` - Alasan cancel (nullable)
- `metadata` - JSON metadata (nullable)
- `timestamps`

**Indexes:**
- Index pada [tenant_id, status]
- Index pada [status, ends_at]

### 5. subscription_payments_table
**File:** `database/migrations/2025_08_14_170938_create_subscription_payments_table.php`

**Columns:**
- `id` - Primary key
- `tenant_subscription_id` - Foreign key ke tenant_subscriptions
- `payment_number` - Nomor pembayaran (unique)
- `amount` - Nominal pembayaran
- `currency` - Mata uang (default: IDR)
- `payment_method` - Enum: bank_transfer, credit_card, ewallet, qris, manual
- `status` - Enum: pending, paid, failed, refunded, cancelled
- `paid_at` - Tanggal bayar (nullable)
- `payment_gateway` - Payment gateway (nullable)
- `transaction_id` - ID transaksi eksternal (nullable)
- `payment_proof` - Bukti pembayaran (nullable)
- `notes` - Catatan (nullable)
- `metadata` - JSON metadata (nullable)
- `timestamps`

**Indexes:**
- Index pada [tenant_subscription_id, status]
- Index pada [status, created_at]

### 6. usage_events_table
**File:** `database/migrations/2025_08_14_170939_create_usage_events_table.php`

**Columns:**
- `id` - Primary key
- `tenant_id` - Foreign key ke tenants
- `event_type` - Tipe event
- `event_category` - Kategori event
- `description` - Deskripsi (nullable)
- `metadata` - JSON metadata (nullable)
- `quantity` - Jumlah (default: 1)
- `unit` - Satuan (default: count)
- `occurred_at` - Waktu terjadi
- `timestamps`

**Indexes:**
- Index pada [tenant_id, event_type]
- Index pada [tenant_id, occurred_at]
- Index pada [event_category, occurred_at]

### 7. app_versions_table
**File:** `database/migrations/2025_08_14_170940_create_app_versions_table.php`

**Columns:**
- `id` - Primary key
- `version` - Versi (misal: 1.0.0)
- `version_code` - Kode versi numerik
- `platform` - Enum: web, android, ios, desktop
- `release_type` - Enum: major, minor, patch, hotfix
- `release_notes` - Catatan rilis (nullable)
- `is_force_update` - Force update (boolean)
- `is_active` - Status aktif (boolean)
- `released_at` - Tanggal rilis
- `download_url` - URL download (nullable)
- `checksum` - Checksum file (nullable)
- `file_size_bytes` - Ukuran file dalam bytes (nullable)
- `metadata` - JSON metadata (nullable)
- `timestamps`

**Indexes:**
- Unique constraint pada [version, platform]
- Index pada [platform, is_active]

### 8. tenant_activity_logs_table
**File:** `database/migrations/2025_08_14_170941_create_tenant_activity_logs_table.php`

**Columns:**
- `id` - Primary key
- `tenant_id` - Foreign key ke tenants
- `user_id` - Foreign key ke users (nullable)
- `action` - Aksi yang dilakukan
- `module` - Modul yang diakses
- `description` - Deskripsi (nullable)
- `ip_address` - IP address (nullable)
- `user_agent` - User agent (nullable)
- `old_values` - JSON nilai lama (nullable)
- `new_values` - JSON nilai baru (nullable)
- `logged_at` - Waktu log
- `timestamps`

**Indexes:**
- Index pada [tenant_id, logged_at]
- Index pada [user_id, logged_at]
- Index pada [module, action]

### 9. support_tickets_table
**File:** `database/migrations/2025_08_14_170942_create_support_tickets_table.php`

**Columns:**
- `id` - Primary key
- `tenant_id` - Foreign key ke tenants
- `user_id` - Foreign key ke users (nullable)
- `ticket_number` - Nomor tiket (unique)
- `subject` - Subjek tiket
- `message` - Pesan tiket
- `priority` - Enum: low, medium, high, urgent
- `status` - Enum: open, in_progress, pending, resolved, closed
- `category` - Enum: technical, billing, feature_request, bug_report, other
- `assigned_to` - Foreign key ke users (nullable)
- `resolved_at` - Tanggal resolved (nullable)
- `closed_at` - Tanggal closed (nullable)
- `resolution_time_minutes` - Waktu resolusi dalam menit (nullable)
- `resolution_notes` - Catatan resolusi (nullable)
- `attachments` - JSON attachments (nullable)
- `timestamps`

**Indexes:**
- Index pada [tenant_id, status]
- Index pada [status, priority]
- Index pada [assigned_to, status]

### 10. notifications_logs_table
**File:** `database/migrations/2025_08_14_170943_create_notifications_logs_table.php`

**Columns:**
- `id` - Primary key
- `tenant_id` - Foreign key ke tenants
- `user_id` - Foreign key ke users (nullable)
- `notification_type` - Tipe notifikasi
- `channel` - Channel notifikasi
- `subject` - Subjek (nullable)
- `content` - Konten notifikasi
- `recipient` - JSON penerima (nullable)
- `status` - Enum: queued, sent, delivered, failed, bounced
- `error_message` - Pesan error (nullable)
- `sent_at` - Tanggal kirim (nullable)
- `delivered_at` - Tanggal terkirim (nullable)
- `external_id` - ID eksternal (nullable)
- `metadata` - JSON metadata (nullable)
- `timestamps`

**Indexes:**
- Index pada [tenant_id, status]
- Index pada [notification_type, created_at]
- Index pada [status, created_at]

## Models Created

### 1. Tenant
**File:** `app/Models/Tenant.php`

**Relations:**
- `subscriptions()` - HasMany ke TenantSubscription
- `activeSubscription()` - HasOne ke TenantSubscription (status: active)
- `usageEvents()` - HasMany ke UsageEvent
- `activityLogs()` - HasMany ke TenantActivityLog
- `supportTickets()` - HasMany ke SupportTicket
- `notificationLogs()` - HasMany ke NotificationLog

**Scopes:**
- `scopeActive()` - Filter tenant aktif
- `scopeTrial()` - Filter tenant trial

**Methods:**
- `isOnTrial()` - Cek apakah tenant sedang trial
- `isActive()` - Cek apakah tenant aktif

### 2. SubscriptionPlan
**File:** `app/Models/SubscriptionPlan.php`

**Relations:**
- `features()` - HasMany ke SubscriptionPlanFeature
- `tenantSubscriptions()` - HasMany ke TenantSubscription

**Scopes:**
- `scopeActive()` - Filter plan aktif
- `scopeTrial()` - Filter plan trial
- `scopePaid()` - Filter plan berbayar

### 3. SubscriptionPlanFeature
**File:** `app/Models/SubscriptionPlanFeature.php`

**Relations:**
- `subscriptionPlan()` - BelongsTo ke SubscriptionPlan

**Scopes:**
- `scopeEnabled()` - Filter fitur aktif

### 4. TenantSubscription
**File:** `app/Models/TenantSubscription.php`

**Relations:**
- `tenant()` - BelongsTo ke Tenant
- `subscriptionPlan()` - BelongsTo ke SubscriptionPlan
- `payments()` - HasMany ke SubscriptionPayment

**Scopes:**
- `scopeActive()` - Filter subscription aktif
- `scopeTrial()` - Filter subscription trial
- `scopeExpired()` - Filter subscription expired
- `scopeEndingSoon($days)` - Filter subscription yang akan berakhir

**Methods:**
- `isActive()` - Cek apakah subscription aktif
- `isOnTrial()` - Cek apakah subscription trial
- `isExpired()` - Cek apakah subscription expired
- `isCancelled()` - Cek apakah subscription cancelled

### 5. SubscriptionPayment
**File:** `app/Models/SubscriptionPayment.php`

**Relations:**
- `tenantSubscription()` - BelongsTo ke TenantSubscription

**Scopes:**
- `scopePaid()` - Filter pembayaran yang sudah dibayar
- `scopePending()` - Filter pembayaran pending
- `scopeFailed()` - Filter pembayaran gagal

**Methods:**
- `isPaid()` - Cek apakah pembayaran sudah dibayar
- `isPending()` - Cek apakah pembayaran pending
- `isFailed()` - Cek apakah pembayaran gagal

### 6. UsageEvent
**File:** `app/Models/UsageEvent.php`

**Relations:**
- `tenant()` - BelongsTo ke Tenant

**Scopes:**
- `scopeByEventType($eventType)` - Filter berdasarkan tipe event
- `scopeByCategory($category)` - Filter berdasarkan kategori
- `scopeBetweenDates($startDate, $endDate)` - Filter berdasarkan rentang tanggal
- `scopeRecent($days)` - Filter event terbaru

### 7. AppVersion
**File:** `app/Models/AppVersion.php`

**Scopes:**
- `scopeActive()` - Filter versi aktif
- `scopeForceUpdate()` - Filter versi force update
- `scopeByPlatform($platform)` - Filter berdasarkan platform
- `scopeLatestForPlatform($platform)` - Get versi terbaru untuk platform

### 8. TenantActivityLog
**File:** `app/Models/TenantActivityLog.php`

**Relations:**
- `tenant()` - BelongsTo ke Tenant
- `user()` - BelongsTo ke User

**Scopes:**
- `scopeByAction($action)` - Filter berdasarkan aksi
- `scopeByModule($module)` - Filter berdasarkan modul
- `scopeBetweenDates($startDate, $endDate)` - Filter berdasarkan rentang tanggal
- `scopeRecent($days)` - Filter log terbaru

### 9. SupportTicket
**File:** `app/Models/SupportTicket.php`

**Relations:**
- `tenant()` - BelongsTo ke Tenant
- `user()` - BelongsTo ke User
- `assignedTo()` - BelongsTo ke User (assigned_to)

**Scopes:**
- `scopeOpen()` - Filter tiket open
- `scopeInProgress()` - Filter tiket in progress
- `scopeResolved()` - Filter tiket resolved
- `scopeClosed()` - Filter tiket closed
- `scopeByPriority($priority)` - Filter berdasarkan priority
- `scopeByCategory($category)` - Filter berdasarkan kategori
- `scopeHighPriority()` - Filter tiket high priority

**Methods:**
- `isOpen()` - Cek apakah tiket open
- `isResolved()` - Cek apakah tiket resolved
- `isClosed()` - Cek apakah tiket closed

### 10. NotificationLog
**File:** `app/Models/NotificationLog.php`

**Relations:**
- `tenant()` - BelongsTo ke Tenant
- `user()` - BelongsTo ke User

**Scopes:**
- `scopeSent()` - Filter notifikasi terkirim
- `scopeDelivered()` - Filter notifikasi terdeliver
- `scopeFailed()` - Filter notifikasi gagal
- `scopeByType($type)` - Filter berdasarkan tipe
- `scopeByChannel($channel)` - Filter berdasarkan channel
- `scopeRecent($days)` - Filter notifikasi terbaru

**Methods:**
- `isSent()` - Cek apakah notifikasi terkirim
- `isFailed()` - Cek apakah notifikasi gagal

### 11. User (Updated)
**File:** `app/Models/User.php`

**Changes:**
- Added `tenant_id` to fillable
- Added relations:
  - `tenant()` - BelongsTo ke Tenant
  - `activityLogs()` - HasMany ke TenantActivityLog
  - `supportTickets()` - HasMany ke SupportTicket
  - `notificationLogs()` - HasMany ke NotificationLog
  - `assignedTickets()` - HasMany ke SupportTicket (assigned_to)

## Model Relationships Diagram

```
Tenant (1) ----< (N) TenantSubscription
Tenant (1) ----< (N) UsageEvent
Tenant (1) ----< (N) TenantActivityLog
Tenant (1) ----< (N) SupportTicket
Tenant (1) ----< (N) NotificationLog

SubscriptionPlan (1) ----< (N) SubscriptionPlanFeature
SubscriptionPlan (1) ----< (N) TenantSubscription

TenantSubscription (1) ----< (N) SubscriptionPayment

User (1) ----< (N) TenantActivityLog
User (1) ----< (N) SupportTicket
User (1) ----< (N) NotificationLog
User (1) ----< (N) SupportTicket (assigned_to)

Tenant (1) ----< (N) User
```

## Factories Created

### 1. TenantFactory
**File:** `database/factories/TenantFactory.php`

**States:**
- `active()` - Tenant aktif
- `trial()` - Tenant trial
- `suspended()` - Tenant suspended

### 2. SubscriptionPlanFactory
**File:** `database/factories/SubscriptionPlanFactory.php`

**States:**
- `trial()` - Plan trial
- `inactive()` - Plan tidak aktif
- `starter()` - Plan starter
- `professional()` - Plan professional
- `enterprise()` - Plan enterprise

### 3. SubscriptionPlanFeatureFactory
**File:** `database/factories/SubscriptionPlanFeatureFactory.php`

**States:**
- `disabled()` - Fitur disabled
- `unlimited()` - Fitur unlimited

### 4. TenantSubscriptionFactory
**File:** `database/factories/TenantSubscriptionFactory.php`

**States:**
- `active()` - Subscription aktif
- `trial()` - Subscription trial
- `expired()` - Subscription expired
- `cancelled()` - Subscription cancelled
- `suspended()` - Subscription suspended

### 5. SubscriptionPaymentFactory
**File:** `database/factories/SubscriptionPaymentFactory.php`

**States:**
- `paid()` - Pembayaran paid
- `pending()` - Pembayaran pending
- `failed()` - Pembayaran failed
- `refunded()` - Pembayaran refunded

### 6. UsageEventFactory
**File:** `database/factories/UsageEventFactory.php`

**States:**
- `photoSession()` - Event photo session
- `videoSession()` - Event video session
- `templateUsage()` - Event template usage
- `socialShare()` - Event social share

### 7. AppVersionFactory
**File:** `database/factories/AppVersionFactory.php`

**States:**
- `forceUpdate()` - Versi force update
- `inactive()` - Versi tidak aktif
- `web()` - Versi web
- `android()` - Versi android
- `ios()` - Versi ios

### 8. TenantActivityLogFactory
**File:** `database/factories/TenantActivityLogFactory.php`

**States:**
- `create()` - Log create action
- `update()` - Log update action
- `delete()` - Log delete action
- `login()` - Log login action
- `logout()` - Log logout action

### 9. SupportTicketFactory
**File:** `database/factories/SupportTicketFactory.php`

**States:**
- `open()` - Tiket open
- `inProgress()` - Tiket in progress
- `resolved()` - Tiket resolved
- `closed()` - Tiket closed
- `highPriority()` - Tiket high priority
- `urgent()` - Tiket urgent
- `technical()` - Tiket technical
- `billing()` - Tiket billing
- `bugReport()` - Tiket bug report

### 10. NotificationLogFactory
**File:** `database/factories/NotificationLogFactory.php`

**States:**
- `sent()` - Notifikasi sent
- `delivered()` - Notifikasi delivered
- `failed()` - Notifikasi failed
- `email()` - Notifikasi email
- `sms()` - Notifikasi SMS
- `push()` - Notifikasi push
- `subscriptionExpiring()` - Notifikasi subscription expiring
- `paymentReceived()` - Notifikasi payment received

## Example Data

### Tenant Example
```json
{
  "id": 1,
  "business_name": "Foto Booth Studio",
  "owner_name": "Budi Santoso",
  "email": "budi@fotobooth.com",
  "phone": "081234567890",
  "city": "Jakarta",
  "address": "Jl. Sudirman No. 123",
  "status": "active",
  "trial_ends_at": null,
  "logo": "logos/fotobooth.png",
  "slug": "foto-booth-studio-1234",
  "settings": {
    "timezone": "Asia/Jakarta",
    "locale": "id"
  },
  "created_at": "2025-08-14T10:00:00Z",
  "updated_at": "2025-08-14T10:00:00Z"
}
```

### Subscription Plan Example
```json
{
  "id": 1,
  "name": "Professional Plan",
  "slug": "professional-plan",
  "description": "Plan untuk bisnis yang sedang berkembang",
  "price": 999000.00,
  "currency": "IDR",
  "duration_days": 30,
  "billing_cycle": "monthly",
  "is_active": true,
  "is_trial": false,
  "trial_days": null,
  "max_booths": 5,
  "max_users": 10,
  "storage_limit_mb": 10000,
  "metadata": {},
  "created_at": "2025-08-14T10:00:00Z",
  "updated_at": "2025-08-14T10:00:00Z"
}
```

### Subscription Plan Feature Example
```json
{
  "id": 1,
  "subscription_plan_id": 1,
  "feature_name": "Photo Sessions",
  "feature_key": "photo_sessions",
  "description": "Maksimal sesi foto per bulan",
  "limit": 100,
  "is_enabled": true,
  "created_at": "2025-08-14T10:00:00Z",
  "updated_at": "2025-08-14T10:00:00Z"
}
```

### Tenant Subscription Example
```json
{
  "id": 1,
  "tenant_id": 1,
  "subscription_plan_id": 1,
  "subscription_number": "SUB-123456",
  "starts_at": "2025-08-01T00:00:00Z",
  "ends_at": "2025-09-01T00:00:00Z",
  "trial_ends_at": null,
  "status": "active",
  "amount": 999000.00,
  "currency": "IDR",
  "auto_renew": true,
  "cancelled_at": null,
  "cancellation_reason": null,
  "metadata": {},
  "created_at": "2025-08-01T00:00:00Z",
  "updated_at": "2025-08-01T00:00:00Z"
}
```

### Subscription Payment Example
```json
{
  "id": 1,
  "tenant_subscription_id": 1,
  "payment_number": "PAY-123456",
  "amount": 999000.00,
  "currency": "IDR",
  "payment_method": "bank_transfer",
  "status": "paid",
  "paid_at": "2025-08-01T10:00:00Z",
  "payment_gateway": "midtrans",
  "transaction_id": "uuid-here",
  "payment_proof": null,
  "notes": "Pembayaran bulan Agustus",
  "metadata": {},
  "created_at": "2025-08-01T10:00:00Z",
  "updated_at": "2025-08-01T10:00:00Z"
}
```

### Usage Event Example
```json
{
  "id": 1,
  "tenant_id": 1,
  "event_type": "photo_session",
  "event_category": "session",
  "description": "Photo booth session completed",
  "metadata": {
    "ip_address": "192.168.1.1",
    "user_agent": "Mozilla/5.0..."
  },
  "quantity": 1,
  "unit": "count",
  "occurred_at": "2025-08-14T15:30:00Z",
  "created_at": "2025-08-14T15:30:00Z",
  "updated_at": "2025-08-14T15:30:00Z"
}
```

### App Version Example
```json
{
  "id": 1,
  "version": "1.2.0",
  "version_code": 120,
  "platform": "web",
  "release_type": "minor",
  "release_notes": "Added new templates and bug fixes",
  "is_force_update": false,
  "is_active": true,
  "released_at": "2025-08-14T10:00:00Z",
  "download_url": "https://example.com/download",
  "checksum": "md5-hash",
  "file_size_bytes": 25000000,
  "metadata": {},
  "created_at": "2025-08-14T10:00:00Z",
  "updated_at": "2025-08-14T10:00:00Z"
}
```

### Tenant Activity Log Example
```json
{
  "id": 1,
  "tenant_id": 1,
  "user_id": 1,
  "action": "update",
  "module": "tenants",
  "description": "Updated tenant settings",
  "ip_address": "192.168.1.1",
  "user_agent": "Mozilla/5.0...",
  "old_values": {
    "city": "Bandung"
  },
  "new_values": {
    "city": "Jakarta"
  },
  "logged_at": "2025-08-14T15:30:00Z",
  "created_at": "2025-08-14T15:30:00Z",
  "updated_at": "2025-08-14T15:30:00Z"
}
```

### Support Ticket Example
```json
{
  "id": 1,
  "tenant_id": 1,
  "user_id": 1,
  "ticket_number": "TKT-123456",
  "subject": "Tidak bisa upload foto",
  "message": "Saya tidak bisa upload foto ke booth",
  "priority": "high",
  "status": "in_progress",
  "category": "technical",
  "assigned_to": 2,
  "resolved_at": null,
  "closed_at": null,
  "resolution_time_minutes": null,
  "resolution_notes": null,
  "attachments": [],
  "created_at": "2025-08-14T10:00:00Z",
  "updated_at": "2025-08-14T10:00:00Z"
}
```

### Notification Log Example
```json
{
  "id": 1,
  "tenant_id": 1,
  "user_id": 1,
  "notification_type": "subscription_expiring",
  "channel": "email",
  "subject": "Subscription Anda akan berakhir segera",
  "content": "Halo, subscription Anda akan berakhir dalam 7 hari...",
  "recipient": {
    "email": "budi@fotobooth.com",
    "phone": "081234567890"
  },
  "status": "delivered",
  "error_message": null,
  "sent_at": "2025-08-14T10:00:00Z",
  "delivered_at": "2025-08-14T10:01:00Z",
  "external_id": "uuid-here",
  "metadata": {},
  "created_at": "2025-08-14T10:00:00Z",
  "updated_at": "2025-08-14T10:01:00Z"
}
```

## Artisan Commands

### Run Migrations
```bash
php artisan migrate
```

### Rollback Migrations
```bash
php artisan migrate:rollback
```

### Fresh Migration (Warning: will delete all data)
```bash
php artisan migrate:fresh
```

### Create Seeder for Subscription Plans
```bash
php artisan make:seeder SubscriptionPlanSeeder
```

### Run Seeders
```bash
php artisan db:seed
```

### Run Specific Seeder
```bash
php artisan db:seed --class=SubscriptionPlanSeeder
```

### Create Model with Migration and Factory
```bash
php artisan make:model ModelName -m -f
```

### Clear Cache
```bash
php artisan cache:clear
php artisan config:clear
php artisan route:clear
php artisan view:clear
```

### Tinker for Testing
```bash
php artisan tinker
```

## Status Enums

### Tenant Status
- `active` - Tenant aktif
- `inactive` - Tenant tidak aktif
- `suspended` - Tenant disuspend
- `trial` - Tenant dalam masa trial

### Subscription Status
- `active` - Subscription aktif
- `trial` - Subscription dalam trial
- `expired` - Subscription expired
- `suspended` - Subscription disuspend
- `cancelled` - Subscription dicancel

### Payment Status
- `pending` - Pembayaran pending
- `paid` - Pembayaran sudah dibayar
- `failed` - Pembayaran gagal
- `refunded` - Pembayaran direfund
- `cancelled` - Pembayaran dicancel

### Payment Method
- `bank_transfer` - Transfer bank
- `credit_card` - Kartu kredit
- `ewallet` - E-wallet
- `qris` - QRIS
- `manual` - Manual

### Support Ticket Priority
- `low` - Prioritas rendah
- `medium` - Prioritas sedang
- `high` - Prioritas tinggi
- `urgent` - Prioritas mendesak

### Support Ticket Status
- `open` - Tiket terbuka
- `in_progress` - Tiket sedang diproses
- `pending` - Tiket pending
- `resolved` - Tiket resolved
- `closed` - Tiket ditutup

### Support Ticket Category
- `technical` - Masalah teknis
- `billing` - Masalah billing
- `feature_request` - Request fitur
- `bug_report` - Laporan bug
- `other` - Lainnya

### Notification Status
- `queued` - Notifikasi dalam antrian
- `sent` - Notifikasi terkirim
- `delivered` - Notifikasi terdeliver
- `failed` - Notifikasi gagal
- `bounced` - Notifikasi bounce

### App Platform
- `web` - Platform web
- `android` - Platform Android
- `ios` - Platform iOS
- `desktop` - Platform desktop

### Release Type
- `major` - Rilis major
- `minor` - Rilis minor
- `patch` - Rilis patch
- `hotfix` - Rilis hotfix

### Billing Cycle
- `monthly` - Bulanan
- `yearly` - Tahunan
- `custom` - Custom

## Files Created/Modified

### Migrations (10 files)
1. `database/migrations/2025_08_14_170934_create_tenants_table.php`
2. `database/migrations/2025_08_14_170935_create_subscription_plans_table.php`
3. `database/migrations/2025_08_14_170936_create_subscription_plan_features_table.php`
4. `database/migrations/2025_08_14_170937_create_tenant_subscriptions_table.php`
5. `database/migrations/2025_08_14_170938_create_subscription_payments_table.php`
6. `database/migrations/2025_08_14_170939_create_usage_events_table.php`
7. `database/migrations/2025_08_14_170940_create_app_versions_table.php`
8. `database/migrations/2025_08_14_170941_create_tenant_activity_logs_table.php`
9. `database/migrations/2025_08_14_170942_create_support_tickets_table.php`
10. `database/migrations/2025_08_14_170943_create_notifications_logs_table.php`

### Models (10 files)
1. `app/Models/Tenant.php`
2. `app/Models/SubscriptionPlan.php`
3. `app/Models/SubscriptionPlanFeature.php`
4. `app/Models/TenantSubscription.php`
5. `app/Models/SubscriptionPayment.php`
6. `app/Models/UsageEvent.php`
7. `app/Models/AppVersion.php`
8. `app/Models/TenantActivityLog.php`
9. `app/Models/SupportTicket.php`
10. `app/Models/NotificationLog.php`

### Factories (10 files)
1. `database/factories/TenantFactory.php`
2. `database/factories/SubscriptionPlanFactory.php`
3. `database/factories/SubscriptionPlanFeatureFactory.php`
4. `database/factories/TenantSubscriptionFactory.php`
5. `database/factories/SubscriptionPaymentFactory.php`
6. `database/factories/UsageEventFactory.php`
7. `database/factories/AppVersionFactory.php`
8. `database/factories/TenantActivityLogFactory.php`
9. `database/factories/SupportTicketFactory.php`
10. `database/factories/NotificationLogFactory.php`

### Modified Files (1 file)
1. `app/Models/User.php` - Added tenant_id to fillable and tenant relations

### Documentation (1 file)
1. `SAAS_DATABASE_DOCUMENTATION.md` - This file

## Next Steps

1. **Run migrations:**
   ```bash
   php artisan migrate
   ```

2. **Create seeders for initial data:**
   - Subscription plans (Starter, Professional, Enterprise)
   - Subscription plan features
   - App versions

3. **Add tenant_id column to users table:**
   ```bash
   php artisan make:migration add_tenant_id_to_users_table --table=users
   ```

4. **Implement middleware for tenant isolation**
5. **Create controllers for CRUD operations**
6. **Create API resources for JSON responses**
7. **Implement subscription validation logic**
8. **Add event listeners for subscription lifecycle**
9. **Create jobs for notification processing**
10. **Implement usage tracking logic**

## Notes

- All models use Laravel 13's new attribute syntax (`#[Fillable]`, `#[Hidden]`)
- All relationships use proper Eloquent conventions
- All timestamps use datetime casting
- JSON columns are cast to array
- Soft deletes implemented on Tenant model
- Proper indexing for performance optimization
- Foreign key constraints with cascade/restrict actions
- Unique constraints where appropriate
- Enum types for status fields
- Consistent naming conventions (snake_case)
