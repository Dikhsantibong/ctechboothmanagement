<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\TenantSubscriptionStoreRequest;
use App\Http\Requests\Admin\TenantSubscriptionUpdateRequest;
use App\Models\Tenant;
use App\Models\TenantSubscription;
use App\Models\SubscriptionPlan;
use App\Models\SubscriptionPayment;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use App\Traits\LogsActivity;

class TenantSubscriptionController extends Controller
{
    use LogsActivity;

    /**
     * Display a listing of all subscriptions.
     */
    public function index(Request $request): Response
    {
        $query = TenantSubscription::with(['tenant', 'subscriptionPlan']);

        // Filter by status
        if ($request->has('status') && $request->status) {
            $query->where('status', $request->status);
        }

        // Filter by tenant
        if ($request->has('search') && $request->search) {
            $query->whereHas('tenant', function ($q) use ($request) {
                $q->where('business_name', 'like', '%' . $request->search . '%');
            });
        }

        // Sort
        $sortField = $request->get('sort', 'created_at');
        $sortDirection = $request->get('direction', 'desc');
        $query->orderBy($sortField, $sortDirection);

        $subscriptions = $query->paginate(20)->withQueryString();

        // Calculate remaining days for each subscription
        $subscriptions->getCollection()->transform(function ($subscription) {
            $subscription->remaining_days = $this->calculateRemainingDays($subscription);
            $subscription->calculated_status = $this->calculateSubscriptionStatus($subscription);
            return $subscription;
        });

        return Inertia::render('admin/subscriptions/index', [
            'subscriptions' => $subscriptions,
            'filters' => [
                'search' => $request->search,
                'status' => $request->status,
                'sort' => $sortField,
                'direction' => $sortDirection,
            ],
        ]);
    }

    /**
     * Show the form for creating a new tenant subscription.
     */
    public function create(Tenant $tenant): Response
    {
        $plans = SubscriptionPlan::where('is_active', true)
            ->orderBy('price')
            ->get();

        return Inertia::render('admin/tenant-subscriptions/create', [
            'tenant' => $tenant,
            'plans' => $plans,
        ]);
    }

    /**
     * Store a newly created tenant subscription in storage.
     */
    public function store(TenantSubscriptionStoreRequest $request, Tenant $tenant): RedirectResponse
    {
        $plan = SubscriptionPlan::findOrFail($request->subscription_plan_id);

        // Generate subscription number
        $subscriptionNumber = 'SUB-' . strtoupper(substr(md5(uniqid()), 0, 8));

        // Calculate end date
        $startDate = now();
        $endDate = $startDate->copy()->addDays($plan->duration_days);

        $subscription = TenantSubscription::create([
            'tenant_id' => $tenant->id,
            'subscription_plan_id' => $plan->id,
            'subscription_number' => $subscriptionNumber,
            'starts_at' => $startDate,
            'ends_at' => $endDate,
            'status' => $plan->is_trial ? 'trial' : 'active',
            'amount' => $plan->price,
            'currency' => $plan->currency,
        ]);

        // Create initial payment record
        SubscriptionPayment::create([
            'tenant_subscription_id' => $subscription->id,
            'payment_number' => 'PAY-' . strtoupper(substr(md5(uniqid()), 0, 8)),
            'amount' => $plan->price,
            'currency' => $plan->currency,
            'payment_method' => 'manual',
            'status' => $plan->price > 0 ? 'pending' : 'paid',
            'paid_at' => $plan->price === 0 ? now() : null,
        ]);

        session()->flash('toast', [
            'type' => 'success',
            'message' => 'Langganan berhasil dibuat.',
        ]);

        $this->logActivity('create', 'tenant_subscriptions', 'Membuat langganan baru untuk tenant ' . $tenant->business_name, $subscription);

        return redirect()->route('admin.subscriptions.show', $subscription);
    }

    /**
     * Display the specified subscription.
     */
    public function show(TenantSubscription $subscription): Response
    {
        $subscription->load(['tenant', 'subscriptionPlan', 'payments']);

        $subscription->remaining_days = $this->calculateRemainingDays($subscription);
        $subscription->calculated_status = $this->calculateSubscriptionStatus($subscription);

        return Inertia::render('admin/subscriptions/show', [
            'subscription' => $subscription,
        ]);
    }

    /**
     * Show the form for editing the specified tenant subscription.
     */
    public function edit(Tenant $tenant, TenantSubscription $subscription): Response
    {
        $subscription->load('subscriptionPlan');
        $plans = SubscriptionPlan::where('is_active', true)
            ->orderBy('price')
            ->get();

        return Inertia::render('admin/tenant-subscriptions/edit', [
            'tenant' => $tenant,
            'subscription' => $subscription,
            'plans' => $plans,
        ]);
    }

    /**
     * Update the specified tenant subscription in storage.
     */
    public function update(TenantSubscriptionUpdateRequest $request, Tenant $tenant, TenantSubscription $subscription): RedirectResponse
    {
        $plan = SubscriptionPlan::findOrFail($request->subscription_plan_id);

        // Check if this is an upgrade or downgrade
        $oldPlan = $subscription->subscriptionPlan;
        $isUpgrade = $plan->price > $oldPlan->price;
        $isDowngrade = $plan->price < $oldPlan->price;

        // Update subscription
        $subscription->update([
            'subscription_plan_id' => $plan->id,
            'amount' => $plan->price,
            'currency' => $plan->currency,
        ]);

        // Recalculate end date if duration changed
        if ($request->recalculate_end_date) {
            $startDate = $subscription->starts_at;
            $endDate = $startDate->copy()->addDays($plan->duration_days);
            $subscription->update(['ends_at' => $endDate]);
        }

        // Create payment record for upgrade/downgrade
        if ($isUpgrade || $isDowngrade) {
            $paymentAmount = $isUpgrade ? $plan->price - $oldPlan->price : $oldPlan->price - $plan->price;
            
            SubscriptionPayment::create([
                'tenant_subscription_id' => $subscription->id,
                'payment_number' => 'PAY-' . strtoupper(substr(md5(uniqid()), 0, 8)),
                'amount' => $paymentAmount,
                'currency' => $plan->currency,
                'payment_method' => 'manual',
                'status' => 'pending',
                'notes' => $isUpgrade ? 'Upgrade package' : 'Downgrade package',
            ]);
        }

        session()->flash('toast', [
            'type' => 'success',
            'message' => 'Langganan berhasil diperbarui.',
        ]);

        $this->logActivity('update', 'tenant_subscriptions', 'Memperbarui langganan tenant ' . $tenant->business_name, $subscription);

        return redirect()->route('admin.subscriptions.show', $subscription);
    }

    /**
     * Cancel the specified tenant subscription.
     */
    public function cancel(Tenant $tenant, TenantSubscription $subscription): RedirectResponse
    {
        $subscription->update(['status' => 'cancelled']);

        session()->flash('toast', [
            'type' => 'success',
            'message' => 'Langganan berhasil dibatalkan.',
        ]);

        $this->logActivity('cancel', 'tenant_subscriptions', 'Membatalkan langganan tenant ' . $tenant->business_name, $subscription);

        return redirect()->route('admin.subscriptions.show', $subscription);
    }

    /**
     * Suspend the specified tenant subscription.
     */
    public function suspend(Tenant $tenant, TenantSubscription $subscription): RedirectResponse
    {
        $subscription->update(['status' => 'suspended']);

        session()->flash('toast', [
            'type' => 'success',
            'message' => 'Langganan berhasil disuspend.',
        ]);

        $this->logActivity('suspend', 'tenant_subscriptions', 'Menyuspend langganan tenant ' . $tenant->business_name, $subscription);

        return redirect()->route('admin.subscriptions.show', $subscription);
    }

    /**
     * Activate the specified tenant subscription.
     */
    public function activate(Tenant $tenant, TenantSubscription $subscription): RedirectResponse
    {
        $subscription->update(['status' => 'active']);

        session()->flash('toast', [
            'type' => 'success',
            'message' => 'Langganan berhasil diaktifkan.',
        ]);

        $this->logActivity('activate', 'tenant_subscriptions', 'Mengaktifkan langganan tenant ' . $tenant->business_name, $subscription);

        return redirect()->route('admin.subscriptions.show', $subscription);
    }

    /**
     * Renew the specified tenant subscription.
     */
    public function renew(Tenant $tenant, TenantSubscription $subscription): RedirectResponse
    {
        $plan = $subscription->subscriptionPlan;

        // Calculate new end date
        $startDate = $subscription->ends_at > now() ? $subscription->ends_at : now();
        $endDate = $startDate->copy()->addDays($plan->duration_days);

        // Create new subscription
        $newSubscriptionNumber = 'SUB-' . strtoupper(substr(md5(uniqid()), 0, 8));

        $newSubscription = TenantSubscription::create([
            'tenant_id' => $tenant->id,
            'subscription_plan_id' => $plan->id,
            'subscription_number' => $newSubscriptionNumber,
            'starts_at' => $startDate,
            'ends_at' => $endDate,
            'status' => 'active',
            'amount' => $plan->price,
            'currency' => $plan->currency,
        ]);

        // Create payment record for renewal
        SubscriptionPayment::create([
            'tenant_subscription_id' => $newSubscription->id,
            'payment_number' => 'PAY-' . strtoupper(substr(md5(uniqid()), 0, 8)),
            'amount' => $plan->price,
            'currency' => $plan->currency,
            'payment_method' => 'manual',
            'status' => 'pending',
            'notes' => 'Subscription renewal',
        ]);

        // Mark old subscription as expired
        $subscription->update(['status' => 'expired']);

        session()->flash('toast', [
            'type' => 'success',
            'message' => 'Langganan berhasil diperpanjang.',
        ]);

        $this->logActivity('renew', 'tenant_subscriptions', 'Memperpanjang langganan tenant ' . $tenant->business_name, $newSubscription);

        return redirect()->route('admin.subscriptions.show', $newSubscription);
    }

    /**
     * Get expiring subscriptions for reminders.
     */
    public function getExpiringSubscriptions(int $days = 7): array
    {
        $thresholdDate = now()->addDays($days);

        return TenantSubscription::with(['tenant', 'subscriptionPlan'])
            ->where('status', 'active')
            ->where('ends_at', '<=', $thresholdDate)
            ->where('ends_at', '>', now())
            ->orderBy('ends_at')
            ->get()
            ->toArray();
    }

    /**
     * Calculate remaining days for a subscription.
     */
    private function calculateRemainingDays(TenantSubscription $subscription): int
    {
        if (!$subscription->ends_at) {
            return 0;
        }

        $endDate = \Carbon\Carbon::parse($subscription->ends_at);
        $now = now();
        
        if ($endDate->isPast()) {
            return 0;
        }

        return $now->diffInDays($endDate);
    }

    /**
     * Calculate subscription status based on dates.
     */
    private function calculateSubscriptionStatus(TenantSubscription $subscription): string
    {
        if ($subscription->status === 'cancelled' || $subscription->status === 'suspended') {
            return $subscription->status;
        }

        if (!$subscription->ends_at) {
            return 'active';
        }

        $endDate = \Carbon\Carbon::parse($subscription->ends_at);
        $now = now();

        if ($endDate->isPast()) {
            return 'expired';
        }

        $remainingDays = $now->diffInDays($endDate);
        
        if ($remainingDays <= 7) {
            return 'expiring';
        }

        return $subscription->status;
    }
}
