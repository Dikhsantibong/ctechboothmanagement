<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\SubscriptionPlanStoreRequest;
use App\Http\Requests\Admin\SubscriptionPlanUpdateRequest;
use App\Models\SubscriptionPlan;
use App\Models\SubscriptionPlanFeature;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use App\Traits\LogsActivity;

class SubscriptionPlanController extends Controller
{
    use LogsActivity;

    /**
     * Display a listing of subscription plans.
     */
    public function index(Request $request): Response
    {
        $query = SubscriptionPlan::query();

        // Filter by status
        if ($request->has('status') && $request->status) {
            if ($request->status === 'active') {
                $query->where('is_active', true);
            } elseif ($request->status === 'inactive') {
                $query->where('is_active', false);
            } elseif ($request->status === 'trial') {
                $query->where('is_trial', true);
            }
        }

        // Sort
        $sortField = $request->get('sort', 'price');
        $sortDirection = $request->get('direction', 'asc');
        $query->orderBy($sortField, $sortDirection);

        $plans = $query->with('features')->get();

        return Inertia::render('admin/subscription-plans/index', [
            'plans' => $plans,
            'filters' => [
                'status' => $request->status,
                'sort' => $sortField,
                'direction' => $sortDirection,
            ],
        ]);
    }

    /**
     * Show the form for creating a new subscription plan.
     */
    public function create(): Response
    {
        return Inertia::render('admin/subscription-plans/create');
    }

    /**
     * Store a newly created subscription plan in storage.
     */
    public function store(SubscriptionPlanStoreRequest $request): RedirectResponse
    {
        $plan = SubscriptionPlan::create($request->validated());

        // Create features if provided
        if ($request->has('features') && is_array($request->features)) {
            foreach ($request->features as $feature) {
                if (!empty($feature['feature_name']) && !empty($feature['feature_key'])) {
                    SubscriptionPlanFeature::create([
                        'subscription_plan_id' => $plan->id,
                        'feature_name' => $feature['feature_name'],
                        'feature_key' => $feature['feature_key'],
                        'description' => $feature['description'] ?? null,
                        'limit' => $feature['limit'] ?? null,
                        'is_enabled' => $feature['is_enabled'] ?? true,
                    ]);
                }
            }
        }

        session()->flash('toast', [
            'type' => 'success',
            'message' => 'Paket langganan berhasil ditambahkan.',
        ]);

        $this->logActivity('create', 'subscription_plans', 'Membuat paket langganan baru: ' . $plan->name, $plan);

        return redirect()->route('admin.subscription-plans.show', $plan);
    }

    /**
     * Display the specified subscription plan.
     */
    public function show(SubscriptionPlan $plan): Response
    {
        $plan->load('features');

        return Inertia::render('admin/subscription-plans/show', [
            'plan' => $plan,
        ]);
    }

    /**
     * Show the form for editing the specified subscription plan.
     */
    public function edit(SubscriptionPlan $plan): Response
    {
        $plan->load('features');

        return Inertia::render('admin/subscription-plans/edit', [
            'plan' => $plan,
        ]);
    }

    /**
     * Update the specified subscription plan in storage.
     */
    public function update(SubscriptionPlanUpdateRequest $request, SubscriptionPlan $plan): RedirectResponse
    {
        $plan->update($request->validated());

        // Update features
        if ($request->has('features') && is_array($request->features)) {
            // Delete existing features
            $plan->features()->delete();

            // Create new features
            foreach ($request->features as $feature) {
                if (!empty($feature['feature_name']) && !empty($feature['feature_key'])) {
                    SubscriptionPlanFeature::create([
                        'subscription_plan_id' => $plan->id,
                        'feature_name' => $feature['feature_name'],
                        'feature_key' => $feature['feature_key'],
                        'description' => $feature['description'] ?? null,
                        'limit' => $feature['limit'] ?? null,
                        'is_enabled' => $feature['is_enabled'] ?? true,
                    ]);
                }
            }
        }

        session()->flash('toast', [
            'type' => 'success',
            'message' => 'Paket langganan berhasil diperbarui.',
        ]);

        $this->logActivity('update', 'subscription_plans', 'Memperbarui paket langganan: ' . $plan->name, $plan);

        return redirect()->route('admin.subscription-plans.show', $plan);
    }

    /**
     * Remove the specified subscription plan from storage.
     */
    public function destroy(SubscriptionPlan $plan): RedirectResponse
    {
        // Check if plan is being used by any tenant
        if ($plan->tenantSubscriptions()->exists()) {
            session()->flash('toast', [
                'type' => 'error',
                'message' => 'Paket langganan sedang digunakan oleh tenant dan tidak dapat dihapus.',
            ]);
            return redirect()->route('admin.subscription-plans.index');
        }

        $plan->features()->delete();
        $plan->delete();

        session()->flash('toast', [
            'type' => 'success',
            'message' => 'Paket langganan berhasil dihapus.',
        ]);

        $this->logActivity('delete', 'subscription_plans', 'Menghapus paket langganan: ' . $plan->name);

        return redirect()->route('admin.subscription-plans.index');
    }

    /**
     * Toggle the active status of the subscription plan.
     */
    public function toggleStatus(SubscriptionPlan $plan): RedirectResponse
    {
        $plan->update(['is_active' => !$plan->is_active]);

        session()->flash('toast', [
            'type' => 'success',
            'message' => $plan->is_active ? 'Paket langganan berhasil diaktifkan.' : 'Paket langganan berhasil dinonaktifkan.',
        ]);

        $this->logActivity('toggle_status', 'subscription_plans', 'Mengubah status paket langganan ' . $plan->name . ' menjadi ' . ($plan->is_active ? 'aktif' : 'nonaktif'), $plan);

        return redirect()->route('admin.subscription-plans.show', $plan);
    }

    /**
     * Get all active plans for selection (API endpoint).
     */
    public function getActivePlans(): Response
    {
        $plans = SubscriptionPlan::where('is_active', true)
            ->where('is_trial', false)
            ->orderBy('price')
            ->get(['id', 'name', 'price', 'currency', 'duration_days']);

        return Inertia::render('admin/subscription-plans/plans-select', [
            'plans' => $plans,
        ]);
    }
}
