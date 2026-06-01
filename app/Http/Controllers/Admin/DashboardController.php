<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Tenant;
use App\Models\TenantSubscription;
use App\Models\SubscriptionPlan;
use App\Models\SubscriptionPayment;
use App\Models\SupportTicket;
use App\Models\AdminActivityLog;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function index(): Response
    {
        // Tenant Statistics
        $totalTenants = Tenant::count();
        $activeTenants = Tenant::where('status', 'active')->count();
        $trialTenants = Tenant::where('status', 'trial')->count();
        $suspendedTenants = Tenant::where('status', 'suspended')->count();
        $inactiveTenants = Tenant::where('status', 'inactive')->count();

        // Subscription Statistics
        $activeSubscriptions = TenantSubscription::where('status', 'active')->count();
        $expiredSubscriptions = TenantSubscription::where('status', 'expired')->count();
        $expiringSubscriptions = TenantSubscription::where('status', 'active')
            ->where('ends_at', '<=', now()->addDays(7))
            ->where('ends_at', '>', now())
            ->count();

        // Revenue
        $totalRevenue = SubscriptionPayment::where('status', 'paid')->sum('amount');
        $monthlyRevenue = SubscriptionPayment::where('status', 'paid')
            ->whereMonth('paid_at', now()->month)
            ->whereYear('paid_at', now()->year)
            ->sum('amount');
        $pendingPayments = SubscriptionPayment::where('status', 'pending')->sum('amount');

        // Support Tickets
        $openTickets = SupportTicket::whereIn('status', ['open', 'in_progress'])->count();
        $resolvedTicketsThisMonth = SupportTicket::where('status', 'resolved')
            ->whereMonth('resolved_at', now()->month)
            ->count();

        // Recent Activity Logs
        $recentLogs = AdminActivityLog::with('user')
            ->orderBy('logged_at', 'desc')
            ->limit(10)
            ->get();

        // Tenant Growth (last 6 months)
        $tenantGrowth = [];
        for ($i = 5; $i >= 0; $i--) {
            $date = now()->subMonths($i);
            $tenantGrowth[] = [
                'month' => $date->translatedFormat('M Y'),
                'count' => Tenant::whereYear('created_at', $date->year)
                    ->whereMonth('created_at', $date->month)
                    ->count(),
            ];
        }

        // Revenue Chart (last 6 months)
        $revenueChart = [];
        for ($i = 5; $i >= 0; $i--) {
            $date = now()->subMonths($i);
            $revenueChart[] = [
                'month' => $date->translatedFormat('M Y'),
                'amount' => (float) SubscriptionPayment::where('status', 'paid')
                    ->whereYear('paid_at', $date->year)
                    ->whereMonth('paid_at', $date->month)
                    ->sum('amount'),
            ];
        }

        // Top Plans
        $topPlans = SubscriptionPlan::withCount(['tenantSubscriptions as active_subscribers' => function ($query) {
                $query->where('status', 'active');
            }])
            ->where('is_active', true)
            ->orderByDesc('active_subscribers')
            ->limit(5)
            ->get(['id', 'name', 'price', 'currency']);

        // Recent Tenants
        $recentTenants = Tenant::orderBy('created_at', 'desc')
            ->limit(5)
            ->get(['id', 'business_name', 'owner_name', 'status', 'created_at']);

        return Inertia::render('dashboard', [
            'statistics' => [
                'total_tenants' => $totalTenants,
                'active_tenants' => $activeTenants,
                'trial_tenants' => $trialTenants,
                'suspended_tenants' => $suspendedTenants,
                'inactive_tenants' => $inactiveTenants,
                'active_subscriptions' => $activeSubscriptions,
                'expired_subscriptions' => $expiredSubscriptions,
                'expiring_subscriptions' => $expiringSubscriptions,
                'total_revenue' => $totalRevenue,
                'monthly_revenue' => $monthlyRevenue,
                'pending_payments' => $pendingPayments,
                'open_tickets' => $openTickets,
                'resolved_tickets_month' => $resolvedTicketsThisMonth,
            ],
            'tenant_growth' => $tenantGrowth,
            'revenue_chart' => $revenueChart,
            'top_plans' => $topPlans,
            'recent_tenants' => $recentTenants,
            'recent_logs' => $recentLogs,
        ]);
    }
}
