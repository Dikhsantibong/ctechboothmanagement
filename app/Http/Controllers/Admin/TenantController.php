<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\TenantStoreRequest;
use App\Http\Requests\Admin\TenantUpdateRequest;
use App\Models\Tenant;
use App\Models\TenantSubscription;
use App\Models\SubscriptionPayment;
use App\Models\TenantActivityLog;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\View\View;
use Inertia\Inertia;
use Inertia\Response;
use App\Traits\LogsActivity;

class TenantController extends Controller
{
    use LogsActivity;

    /**
     * Display a listing of tenants.
     */
    public function index(Request $request): Response
    {
        $query = Tenant::query();

        // Search
        if ($request->has('search') && $request->search) {
            $query->where(function ($q) use ($request) {
                $q->where('business_name', 'like', '%' . $request->search . '%')
                  ->orWhere('owner_name', 'like', '%' . $request->search . '%')
                  ->orWhere('email', 'like', '%' . $request->search . '%')
                  ->orWhere('city', 'like', '%' . $request->search . '%');
            });
        }

        // Filter by status
        if ($request->has('status') && $request->status) {
            $query->where('status', $request->status);
        }

        // Sort
        $sortField = $request->get('sort', 'created_at');
        $sortDirection = $request->get('direction', 'desc');
        $query->orderBy($sortField, $sortDirection);

        // Pagination
        $tenants = $query->paginate(10)->withQueryString();

        return Inertia::render('admin/tenants/index', [
            'tenants' => $tenants,
            'filters' => [
                'search' => $request->search,
                'status' => $request->status,
                'sort' => $sortField,
                'direction' => $sortDirection,
            ],
        ]);
    }

    /**
     * Show the form for creating a new tenant.
     */
    public function create(): Response
    {
        return Inertia::render('admin/tenants/create');
    }

    /**
     * Store a newly created tenant in storage.
     */
    public function store(TenantStoreRequest $request): RedirectResponse
    {
        $tenant = Tenant::create($request->validated());

        session()->flash('toast', [
            'type' => 'success',
            'message' => 'Tenant berhasil ditambahkan.',
        ]);

        $this->logActivity('create', 'tenants', 'Membuat tenant baru: ' . $tenant->business_name, $tenant);

        return redirect()->route('admin.tenants.show', $tenant);
    }

    /**
     * Display the specified tenant.
     */
    public function show(Tenant $tenant): Response
    {
        $tenant->load([
            'activeSubscription.subscriptionPlan',
            'activeSubscription.payments',
            'subscriptions.subscriptionPlan',
            'subscriptions.payments',
        ]);

        $recentActivity = TenantActivityLog::where('tenant_id', $tenant->id)
            ->orderBy('logged_at', 'desc')
            ->limit(10)
            ->get();

        return Inertia::render('admin/tenants/show', [
            'tenant' => $tenant,
            'recentActivity' => $recentActivity,
        ]);
    }

    /**
     * Show the form for editing the specified tenant.
     */
    public function edit(Tenant $tenant): Response
    {
        return Inertia::render('admin/tenants/edit', [
            'tenant' => $tenant,
        ]);
    }

    /**
     * Update the specified tenant in storage.
     */
    public function update(TenantUpdateRequest $request, Tenant $tenant): RedirectResponse
    {
        $tenant->update($request->validated());

        session()->flash('toast', [
            'type' => 'success',
            'message' => 'Tenant berhasil diperbarui.',
        ]);

        $this->logActivity('update', 'tenants', 'Memperbarui data tenant: ' . $tenant->business_name, $tenant);

        return redirect()->route('admin.tenants.show', $tenant);
    }

    /**
     * Remove the specified tenant from storage.
     */
    public function destroy(Tenant $tenant): RedirectResponse
    {
        $tenant->delete();

        session()->flash('toast', [
            'type' => 'success',
            'message' => 'Tenant berhasil dihapus.',
        ]);

        $this->logActivity('delete', 'tenants', 'Menghapus tenant: ' . $tenant->business_name);

        return redirect()->route('admin.tenants.index');
    }

    /**
     * Suspend the specified tenant.
     */
    public function suspend(Tenant $tenant): RedirectResponse
    {
        $tenant->update(['status' => 'suspended']);

        session()->flash('toast', [
            'type' => 'success',
            'message' => 'Tenant berhasil disuspend.',
        ]);

        $this->logActivity('suspend', 'tenants', 'Menyuspend tenant: ' . $tenant->business_name, $tenant);

        return redirect()->route('admin.tenants.show', $tenant);
    }

    /**
     * Activate the specified tenant.
     */
    public function activate(Tenant $tenant): RedirectResponse
    {
        $tenant->update(['status' => 'active']);

        session()->flash('toast', [
            'type' => 'success',
            'message' => 'Tenant berhasil diaktifkan.',
        ]);

        $this->logActivity('activate', 'tenants', 'Mengaktifkan tenant: ' . $tenant->business_name, $tenant);

        return redirect()->route('admin.tenants.show', $tenant);
    }

    /**
     * Get tenant subscription history.
     */
    public function subscriptions(Tenant $tenant): Response
    {
        $subscriptions = $tenant->subscriptions()
            ->with('subscriptionPlan', 'payments')
            ->orderBy('created_at', 'desc')
            ->paginate(10);

        return Inertia::render('admin/tenants/subscriptions', [
            'tenant' => $tenant,
            'subscriptions' => $subscriptions,
        ]);
    }

    /**
     * Get tenant payment history.
     */
    public function payments(Tenant $tenant): Response
    {
        $payments = SubscriptionPayment::whereHas('tenantSubscription', function ($query) use ($tenant) {
            $query->where('tenant_id', $tenant->id);
        })
            ->with('tenantSubscription.subscriptionPlan')
            ->orderBy('created_at', 'desc')
            ->paginate(10);

        return Inertia::render('admin/tenants/payments', [
            'tenant' => $tenant,
            'payments' => $payments,
        ]);
    }

    /**
     * Get tenant activity logs.
     */
    public function activity(Tenant $tenant): Response
    {
        $activityLogs = $tenant->activityLogs()
            ->with('user')
            ->orderBy('logged_at', 'desc')
            ->paginate(20);

        return Inertia::render('admin/tenants/activity', [
            'tenant' => $tenant,
            'activityLogs' => $activityLogs,
        ]);
    }
}
