<?php

namespace Database\Seeders;

use App\Models\SubscriptionPlan;
use App\Models\SubscriptionPlanFeature;
use Illuminate\Database\Seeder;

class SubscriptionPlanSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Trial Plan
        $trial = SubscriptionPlan::create([
            'name' => 'Trial',
            'slug' => 'trial',
            'description' => 'Paket trial untuk mencoba fitur dasar',
            'price' => 0,
            'currency' => 'IDR',
            'duration_days' => 14,
            'billing_cycle' => 'custom',
            'is_active' => true,
            'is_trial' => true,
            'trial_days' => 14,
            'max_booths' => 1,
            'max_users' => 1,
            'storage_limit_mb' => 500,
        ]);

        // Trial Features
        $trialFeatures = [
            ['feature_name' => 'Photo Sessions', 'feature_key' => 'photo_sessions', 'description' => 'Sesi foto dasar', 'limit' => 10, 'is_enabled' => true],
            ['feature_name' => 'Basic Templates', 'feature_key' => 'basic_templates', 'description' => 'Template dasar', 'limit' => 5, 'is_enabled' => true],
            ['feature_name' => 'Watermark', 'feature_key' => 'watermark', 'description' => 'Watermark otomatis', 'limit' => null, 'is_enabled' => true],
            ['feature_name' => 'Email Support', 'feature_key' => 'email_support', 'description' => 'Support via email', 'limit' => null, 'is_enabled' => true],
        ];

        foreach ($trialFeatures as $feature) {
            SubscriptionPlanFeature::create([
                'subscription_plan_id' => $trial->id,
                ...$feature,
            ]);
        }

        // Starter Plan
        $starter = SubscriptionPlan::create([
            'name' => 'Starter',
            'slug' => 'starter',
            'description' => 'Paket untuk usaha kecil yang baru mulai',
            'price' => 299000,
            'currency' => 'IDR',
            'duration_days' => 30,
            'billing_cycle' => 'monthly',
            'is_active' => true,
            'is_trial' => false,
            'max_booths' => 1,
            'max_users' => 2,
            'storage_limit_mb' => 2000,
        ]);

        // Starter Features
        $starterFeatures = [
            ['feature_name' => 'Photo Sessions', 'feature_key' => 'photo_sessions', 'description' => 'Sesi foto unlimited', 'limit' => 0, 'is_enabled' => true],
            ['feature_name' => 'Video Sessions', 'feature_key' => 'video_sessions', 'description' => 'Sesi video', 'limit' => 50, 'is_enabled' => true],
            ['feature_name' => 'Basic Templates', 'feature_key' => 'basic_templates', 'description' => 'Template dasar', 'limit' => 20, 'is_enabled' => true],
            ['feature_name' => 'Custom Branding', 'feature_key' => 'custom_branding', 'description' => 'Branding kustom', 'limit' => null, 'is_enabled' => false],
            ['feature_name' => 'Broadcast', 'feature_key' => 'broadcast', 'description' => 'Broadcast ke email', 'limit' => 100, 'is_enabled' => true],
            ['feature_name' => 'Export Reports', 'feature_key' => 'export_reports', 'description' => 'Export laporan', 'limit' => null, 'is_enabled' => true],
            ['feature_name' => 'Email Support', 'feature_key' => 'email_support', 'description' => 'Support via email', 'limit' => null, 'is_enabled' => true],
            ['feature_name' => 'Multi Branch', 'feature_key' => 'multi_branch', 'description' => 'Multi cabang', 'limit' => null, 'is_enabled' => false],
            ['feature_name' => 'API Access', 'feature_key' => 'api_access', 'description' => 'Akses API', 'limit' => null, 'is_enabled' => false],
        ];

        foreach ($starterFeatures as $feature) {
            SubscriptionPlanFeature::create([
                'subscription_plan_id' => $starter->id,
                ...$feature,
            ]);
        }

        // Professional Plan
        $professional = SubscriptionPlan::create([
            'name' => 'Professional',
            'slug' => 'professional',
            'description' => 'Paket untuk usaha yang sedang berkembang',
            'price' => 799000,
            'currency' => 'IDR',
            'duration_days' => 30,
            'billing_cycle' => 'monthly',
            'is_active' => true,
            'is_trial' => false,
            'max_booths' => 3,
            'max_users' => 5,
            'storage_limit_mb' => 10000,
        ]);

        // Professional Features
        $professionalFeatures = [
            ['feature_name' => 'Photo Sessions', 'feature_key' => 'photo_sessions', 'description' => 'Sesi foto unlimited', 'limit' => 0, 'is_enabled' => true],
            ['feature_name' => 'Video Sessions', 'feature_key' => 'video_sessions', 'description' => 'Sesi video unlimited', 'limit' => 0, 'is_enabled' => true],
            ['feature_name' => 'Premium Templates', 'feature_key' => 'premium_templates', 'description' => 'Template premium', 'limit' => 50, 'is_enabled' => true],
            ['feature_name' => 'Custom Branding', 'feature_key' => 'custom_branding', 'description' => 'Branding kustom', 'limit' => null, 'is_enabled' => true],
            ['feature_name' => 'Broadcast', 'feature_key' => 'broadcast', 'description' => 'Broadcast ke email & SMS', 'limit' => 500, 'is_enabled' => true],
            ['feature_name' => 'Export Reports', 'feature_key' => 'export_reports', 'description' => 'Export laporan', 'limit' => null, 'is_enabled' => true],
            ['feature_name' => 'Priority Support', 'feature_key' => 'priority_support', 'description' => 'Support prioritas', 'limit' => null, 'is_enabled' => true],
            ['feature_name' => 'Multi Branch', 'feature_key' => 'multi_branch', 'description' => 'Multi cabang', 'limit' => null, 'is_enabled' => true],
            ['feature_name' => 'API Access', 'feature_key' => 'api_access', 'description' => 'Akses API', 'limit' => null, 'is_enabled' => false],
        ];

        foreach ($professionalFeatures as $feature) {
            SubscriptionPlanFeature::create([
                'subscription_plan_id' => $professional->id,
                ...$feature,
            ]);
        }

        // Enterprise Plan
        $enterprise = SubscriptionPlan::create([
            'name' => 'Enterprise',
            'slug' => 'enterprise',
            'description' => 'Paket untuk usaha besar dengan kebutuhan khusus',
            'price' => 2499000,
            'currency' => 'IDR',
            'duration_days' => 30,
            'billing_cycle' => 'monthly',
            'is_active' => true,
            'is_trial' => false,
            'max_booths' => 10,
            'max_users' => 20,
            'storage_limit_mb' => 50000,
        ]);

        // Enterprise Features
        $enterpriseFeatures = [
            ['feature_name' => 'Photo Sessions', 'feature_key' => 'photo_sessions', 'description' => 'Sesi foto unlimited', 'limit' => 0, 'is_enabled' => true],
            ['feature_name' => 'Video Sessions', 'feature_key' => 'video_sessions', 'description' => 'Sesi video unlimited', 'limit' => 0, 'is_enabled' => true],
            ['feature_name' => 'Premium Templates', 'feature_key' => 'premium_templates', 'description' => 'Template premium unlimited', 'limit' => 0, 'is_enabled' => true],
            ['feature_name' => 'Custom Branding', 'feature_key' => 'custom_branding', 'description' => 'Branding kustom', 'limit' => null, 'is_enabled' => true],
            ['feature_name' => 'Broadcast', 'feature_key' => 'broadcast', 'description' => 'Broadcast ke email, SMS & WhatsApp', 'limit' => 0, 'is_enabled' => true],
            ['feature_name' => 'Export Reports', 'feature_key' => 'export_reports', 'description' => 'Export laporan', 'limit' => null, 'is_enabled' => true],
            ['feature_name' => 'Priority Support', 'feature_key' => 'priority_support', 'description' => 'Support prioritas 24/7', 'limit' => null, 'is_enabled' => true],
            ['feature_name' => 'Multi Branch', 'feature_key' => 'multi_branch', 'description' => 'Multi cabang unlimited', 'limit' => 0, 'is_enabled' => true],
            ['feature_name' => 'API Access', 'feature_key' => 'api_access', 'description' => 'Akses API', 'limit' => null, 'is_enabled' => true],
            ['feature_name' => 'Custom Integration', 'feature_key' => 'custom_integration', 'description' => 'Integrasi kustom', 'limit' => null, 'is_enabled' => true],
            ['feature_name' => 'Dedicated Account Manager', 'feature_key' => 'dedicated_account_manager', 'description' => 'Account manager khusus', 'limit' => null, 'is_enabled' => true],
        ];

        foreach ($enterpriseFeatures as $feature) {
            SubscriptionPlanFeature::create([
                'subscription_plan_id' => $enterprise->id,
                ...$feature,
            ]);
        }
    }
}
