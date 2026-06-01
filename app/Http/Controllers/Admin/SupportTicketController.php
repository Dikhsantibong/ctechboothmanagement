<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\SupportTicketStoreRequest;
use App\Http\Requests\Admin\SupportTicketUpdateRequest;
use App\Models\SupportTicket;
use App\Models\Tenant;
use App\Models\AdminActivityLog;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class SupportTicketController extends Controller
{
    /**
     * Display a listing of support tickets.
     */
    public function index(): Response
    {
        $tickets = SupportTicket::with(['tenant', 'user', 'assignedTo'])
            ->orderBy('created_at', 'desc')
            ->paginate(20);

        return Inertia::render('admin/support-tickets/index', [
            'tickets' => $tickets,
        ]);
    }

    /**
     * Show the form for creating a new support ticket.
     */
    public function create(): Response
    {
        $tenants = Tenant::where('status', 'active')->get();

        return Inertia::render('admin/support-tickets/create', [
            'tenants' => $tenants,
        ]);
    }

    /**
     * Store a newly created support ticket in storage.
     */
    public function store(SupportTicketStoreRequest $request): RedirectResponse
    {
        $ticketNumber = 'TKT-' . strtoupper(substr(md5(uniqid()), 0, 8));

        SupportTicket::create([
            'tenant_id' => $request->tenant_id,
            'user_id' => $request->user_id,
            'ticket_number' => $ticketNumber,
            'subject' => $request->subject,
            'message' => $request->message,
            'priority' => $request->priority,
            'category' => $request->category,
            'assigned_to' => $request->assigned_to,
        ]);

        // Log activity
        $this->logActivity('create', 'support_ticket', 'Support ticket created', $ticketNumber);

        session()->flash('toast', [
            'type' => 'success',
            'message' => 'Tiket support berhasil dibuat.',
        ]);

        return redirect()->route('admin.support-tickets.index');
    }

    /**
     * Display the specified support ticket.
     */
    public function show(SupportTicket $ticket): Response
    {
        $ticket->load(['tenant', 'user', 'assignedTo']);

        return Inertia::render('admin/support-tickets/show', [
            'ticket' => $ticket,
        ]);
    }

    /**
     * Show the form for editing the specified support ticket.
     */
    public function edit(SupportTicket $ticket): Response
    {
        $ticket->load(['tenant', 'user', 'assignedTo']);
        $tenants = Tenant::where('status', 'active')->get();

        return Inertia::render('admin/support-tickets/edit', [
            'ticket' => $ticket,
            'tenants' => $tenants,
        ]);
    }

    /**
     * Update the specified support ticket in storage.
     */
    public function update(SupportTicketUpdateRequest $request, SupportTicket $ticket): RedirectResponse
    {
        $oldStatus = $ticket->status;
        $oldPriority = $ticket->priority;

        $ticket->update([
            'tenant_id' => $request->tenant_id,
            'subject' => $request->subject,
            'message' => $request->message,
            'priority' => $request->priority,
            'category' => $request->category,
            'assigned_to' => $request->assigned_to,
        ]);

        // Log activity if status or priority changed
        if ($oldStatus !== $request->status) {
            $ticket->update(['status' => $request->status]);
            
            if ($request->status === 'resolved' && !$ticket->resolved_at) {
                $ticket->update(['resolved_at' => now()]);
            }
            
            if ($request->status === 'closed' && !$ticket->closed_at) {
                $ticket->update(['closed_at' => now()]);
            }

            $this->logActivity('update_status', 'support_ticket', "Status changed from {$oldStatus} to {$request->status}", $ticket->ticket_number);
        }

        if ($oldPriority !== $request->priority) {
            $this->logActivity('update_priority', 'support_ticket', "Priority changed from {$oldPriority} to {$request->priority}", $ticket->ticket_number);
        }

        session()->flash('toast', [
            'type' => 'success',
            'message' => 'Tiket support berhasil diperbarui.',
        ]);

        return redirect()->route('admin.support-tickets.show', $ticket);
    }

    /**
     * Update ticket status.
     */
    public function updateStatus(SupportTicket $ticket, string $status): RedirectResponse
    {
        $oldStatus = $ticket->status;
        
        $ticket->update(['status' => $status]);

        if ($status === 'resolved' && !$ticket->resolved_at) {
            $ticket->update(['resolved_at' => now()]);
        }
        
        if ($status === 'closed' && !$ticket->closed_at) {
            $ticket->update(['closed_at' => now()]);
        }

        $this->logActivity('update_status', 'support_ticket', "Status changed from {$oldStatus} to {$status}", $ticket->ticket_number);

        session()->flash('toast', [
            'type' => 'success',
            'message' => 'Status tiket berhasil diperbarui.',
        ]);

        return redirect()->route('admin.support-tickets.show', $ticket);
    }

    /**
     * Update ticket resolution notes.
     */
    public function updateResolution(SupportTicket $ticket): RedirectResponse
    {
        request()->validate([
            'resolution_notes' => 'required|string',
        ]);

        $ticket->update([
            'resolution_notes' => request('resolution_notes'),
        ]);

        $this->logActivity('update_resolution', 'support_ticket', 'Resolution notes updated', $ticket->ticket_number);

        session()->flash('toast', [
            'type' => 'success',
            'message' => 'Catatan penyelesaian berhasil diperbarui.',
        ]);

        return redirect()->route('admin.support-tickets.show', $ticket);
    }

    /**
     * Remove the specified support ticket from storage.
     */
    public function destroy(SupportTicket $ticket): RedirectResponse
    {
        $ticketNumber = $ticket->ticket_number;
        $ticket->delete();

        $this->logActivity('delete', 'support_ticket', 'Support ticket deleted', $ticketNumber);

        session()->flash('toast', [
            'type' => 'success',
            'message' => 'Tiket support berhasil dihapus.',
        ]);

        return redirect()->route('admin.support-tickets.index');
    }

    /**
     * Log admin activity.
     */
    private function logActivity(string $action, string $module, string $description, string $subject = null): void
    {
        AdminActivityLog::create([
            'user_id' => auth()->id(),
            'action' => $action,
            'module' => $module,
            'description' => $description,
            'subject_type' => $module,
            'subject_id' => $subject ? null : null,
            'ip_address' => request()->ip(),
            'user_agent' => request()->userAgent(),
        ]);
    }
}
