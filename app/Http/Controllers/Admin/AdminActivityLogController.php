<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\AdminActivityLog;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class AdminActivityLogController extends Controller
{
    /**
     * Display a listing of admin activity logs.
     */
    public function index(Request $request): Response
    {
        $query = AdminActivityLog::with('user');

        // Filter by module
        if ($request->has('module') && $request->module) {
            $query->byModule($request->module);
        }

        // Filter by action
        if ($request->has('action') && $request->action) {
            $query->byAction($request->action);
        }

        // Filter by user
        if ($request->has('user_id') && $request->user_id) {
            $query->byUser($request->user_id);
        }

        // Filter by date range
        if ($request->has('start_date') && $request->start_date) {
            $query->where('logged_at', '>=', $request->start_date);
        }
        if ($request->has('end_date') && $request->end_date) {
            $query->where('logged_at', '<=', $request->end_date);
        }

        // Sort
        $sortField = $request->get('sort', 'logged_at');
        $sortDirection = $request->get('direction', 'desc');
        $query->orderBy($sortField, $sortDirection);

        $logs = $query->paginate(50)->withQueryString();

        return Inertia::render('admin/activity-logs/index', [
            'logs' => $logs,
            'filters' => [
                'module' => $request->module,
                'action' => $request->action,
                'user_id' => $request->user_id,
                'start_date' => $request->start_date,
                'end_date' => $request->end_date,
                'sort' => $sortField,
                'direction' => $sortDirection,
            ],
        ]);
    }

    /**
     * Display the specified activity log.
     */
    public function show(AdminActivityLog $log): Response
    {
        $log->load('user');

        return Inertia::render('admin/activity-logs/show', [
            'log' => $log,
        ]);
    }
}
