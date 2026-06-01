<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Invoice;
use App\Models\InvoiceItem;
use App\Models\Tenant;
use App\Models\SubscriptionPlan;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Str;

class InvoiceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Invoice::with(['tenant']);

        if ($request->has('search')) {
            $search = $request->get('search');
            $query->where(function($q) use ($search) {
                $q->where('invoice_number', 'like', "%{$search}%")
                  ->orWhere('customer_name', 'like', "%{$search}%")
                  ->orWhere('customer_email', 'like', "%{$search}%");
            });
        }

        if ($request->has('status') && $request->get('status') !== 'all') {
            $query->where('status', $request->get('status'));
        }

        $invoices = $query->orderBy('created_at', 'desc')->paginate(10)->withQueryString();

        return Inertia::render('admin/invoices/index', [
            'invoices' => $invoices,
            'filters' => $request->only(['search', 'status']),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $tenants = Tenant::with(['subscriptions' => function($q) {
            $q->where('status', 'active')->with('subscriptionPlan');
        }])->orderBy('business_name')->get(['id', 'business_name', 'owner_name', 'email', 'phone', 'address']);
        $plans = SubscriptionPlan::where('is_active', true)->get(['id', 'name', 'price', 'currency', 'description']);

        // Generate next invoice number
        $lastInvoice = Invoice::orderBy('id', 'desc')->first();
        $nextId = $lastInvoice ? $lastInvoice->id + 1 : 1;
        $invoiceNumber = 'INV-' . date('Ymd') . '-' . str_pad($nextId, 4, '0', STR_PAD_LEFT);

        return Inertia::render('admin/invoices/create', [
            'tenants' => $tenants,
            'plans' => $plans,
            'default_invoice_number' => $invoiceNumber
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'tenant_id' => 'nullable|exists:tenants,id',
            'invoice_number' => 'required|string|unique:invoices,invoice_number',
            'customer_name' => 'required|string|max:255',
            'customer_email' => 'required|email|max:255',
            'customer_phone' => 'nullable|string|max:255',
            'customer_address' => 'nullable|string',
            'issue_date' => 'required|date',
            'due_date' => 'required|date|after_or_equal:issue_date',
            'status' => 'required|in:draft,sent,paid,cancelled',
            'subtotal' => 'required|numeric|min:0',
            'tax' => 'required|numeric|min:0',
            'discount' => 'required|numeric|min:0',
            'total' => 'required|numeric|min:0',
            'notes' => 'nullable|string',
            
            // Items validation
            'items' => 'required|array|min:1',
            'items.*.item_name' => 'required|string|max:255',
            'items.*.description' => 'nullable|string',
            'items.*.quantity' => 'required|integer|min:1',
            'items.*.unit_price' => 'required|numeric|min:0',
            'items.*.total_price' => 'required|numeric|min:0',
        ]);

        $invoice = Invoice::create(collect($validated)->except('items')->toArray());

        foreach ($validated['items'] as $item) {
            $invoice->items()->create($item);
        }

        session()->flash('toast', [
            'type' => 'success',
            'message' => 'Invoice berhasil dibuat.'
        ]);

        return redirect()->route('admin.invoices.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(Invoice $invoice)
    {
        $invoice->load(['tenant', 'items']);
        
        return Inertia::render('admin/invoices/show', [
            'invoice' => $invoice
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Invoice $invoice)
    {
        $invoice->load('items');
        $tenants = Tenant::with(['subscriptions' => function($q) {
            $q->where('status', 'active')->with('subscriptionPlan');
        }])->orderBy('business_name')->get(['id', 'business_name', 'owner_name', 'email', 'phone', 'address']);
        $plans = SubscriptionPlan::where('is_active', true)->get(['id', 'name', 'price', 'currency', 'description']);

        return Inertia::render('admin/invoices/edit', [
            'invoice' => $invoice,
            'tenants' => $tenants,
            'plans' => $plans
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Invoice $invoice)
    {
        $validated = $request->validate([
            'tenant_id' => 'nullable|exists:tenants,id',
            'invoice_number' => 'required|string|unique:invoices,invoice_number,' . $invoice->id,
            'customer_name' => 'required|string|max:255',
            'customer_email' => 'required|email|max:255',
            'customer_phone' => 'nullable|string|max:255',
            'customer_address' => 'nullable|string',
            'issue_date' => 'required|date',
            'due_date' => 'required|date|after_or_equal:issue_date',
            'status' => 'required|in:draft,sent,paid,cancelled',
            'subtotal' => 'required|numeric|min:0',
            'tax' => 'required|numeric|min:0',
            'discount' => 'required|numeric|min:0',
            'total' => 'required|numeric|min:0',
            'notes' => 'nullable|string',
            
            // Items validation
            'items' => 'required|array|min:1',
            'items.*.id' => 'nullable|exists:invoice_items,id',
            'items.*.item_name' => 'required|string|max:255',
            'items.*.description' => 'nullable|string',
            'items.*.quantity' => 'required|integer|min:1',
            'items.*.unit_price' => 'required|numeric|min:0',
            'items.*.total_price' => 'required|numeric|min:0',
        ]);

        $invoice->update(collect($validated)->except('items')->toArray());

        // Update items (sync)
        $existingItemIds = $invoice->items()->pluck('id')->toArray();
        $newItemIds = [];

        foreach ($validated['items'] as $itemData) {
            if (isset($itemData['id']) && in_array($itemData['id'], $existingItemIds)) {
                $item = InvoiceItem::find($itemData['id']);
                $item->update($itemData);
                $newItemIds[] = $item->id;
            } else {
                $newItem = $invoice->items()->create($itemData);
                $newItemIds[] = $newItem->id;
            }
        }

        // Delete items that were removed
        $itemsToDelete = array_diff($existingItemIds, $newItemIds);
        if (!empty($itemsToDelete)) {
            InvoiceItem::whereIn('id', $itemsToDelete)->delete();
        }

        session()->flash('toast', [
            'type' => 'success',
            'message' => 'Invoice berhasil diperbarui.'
        ]);

        return redirect()->route('admin.invoices.show', $invoice->id);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Invoice $invoice)
    {
        $invoice->delete();

        session()->flash('toast', [
            'type' => 'success',
            'message' => 'Invoice berhasil dihapus.'
        ]);

        return redirect()->route('admin.invoices.index');
    }
}
