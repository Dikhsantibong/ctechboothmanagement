<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Tenant;
use App\Models\TenantAppActivity;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class ActivityController extends Controller
{
    /**
     * Receive activity data from tenant application.
     */
    public function store(Request $request): JsonResponse
    {
        // Validate request
        $validated = $request->validate([
            'tenant_slug' => 'required|string',
            'event_type' => 'required|string|in:session_started,session_ended,photo_taken,photo_success,photo_failed,qr_generated,qr_downloaded,qr_failed,print_success,print_failed,camera_error,printer_error,storage_full,app_error',
            'event_data' => 'nullable|array',
            'app_version' => 'nullable|string',
            'device_info' => 'nullable|array',
            'ip_address' => 'nullable|ip',
        ]);

        // Find tenant by slug
        $tenant = Tenant::where('slug', $validated['tenant_slug'])->first();

        if (!$tenant) {
            return response()->json([
                'success' => false,
                'message' => 'Tenant not found',
            ], 404);
        }

        // Check if tenant is active
        if ($tenant->status !== 'active' && $tenant->status !== 'trial') {
            return response()->json([
                'success' => false,
                'message' => 'Tenant is not active',
            ], 403);
        }

        // Create activity log
        $activity = TenantAppActivity::create([
            'tenant_id' => $tenant->id,
            'event_type' => $validated['event_type'],
            'event_data' => $validated['event_data'] ?? [],
            'app_version' => $validated['app_version'] ?? null,
            'device_info' => $validated['device_info'] ?? [],
            'ip_address' => $validated['ip_address'] ?? $request->ip(),
            'occurred_at' => now(),
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Activity logged successfully',
            'activity_id' => $activity->id,
        ]);
    }

    /**
     * Batch receive multiple activities.
     */
    public function batch(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'tenant_slug' => 'required|string',
            'activities' => 'required|array|min:1|max:100',
            'activities.*.event_type' => 'required|string|in:session_started,session_ended,photo_taken,photo_success,photo_failed,qr_generated,qr_downloaded,qr_failed,print_success,print_failed,camera_error,printer_error,storage_full,app_error',
            'activities.*.event_data' => 'nullable|array',
            'activities.*.occurred_at' => 'nullable|date',
            'app_version' => 'nullable|string',
            'device_info' => 'nullable|array',
            'ip_address' => 'nullable|ip',
        ]);

        // Find tenant by slug
        $tenant = Tenant::where('slug', $validated['tenant_slug'])->first();

        if (!$tenant) {
            return response()->json([
                'success' => false,
                'message' => 'Tenant not found',
            ], 404);
        }

        // Check if tenant is active
        if ($tenant->status !== 'active' && $tenant->status !== 'trial') {
            return response()->json([
                'success' => false,
                'message' => 'Tenant is not active',
            ], 403);
        }

        // Create activity logs
        $createdActivities = [];
        foreach ($validated['activities'] as $activityData) {
            $activity = TenantAppActivity::create([
                'tenant_id' => $tenant->id,
                'event_type' => $activityData['event_type'],
                'event_data' => $activityData['event_data'] ?? [],
                'app_version' => $validated['app_version'] ?? null,
                'device_info' => $validated['device_info'] ?? [],
                'ip_address' => $validated['ip_address'] ?? $request->ip(),
                'occurred_at' => $activityData['occurred_at'] ?? now(),
            ]);
            $createdActivities[] = $activity->id;
        }

        return response()->json([
            'success' => true,
            'message' => 'Activities logged successfully',
            'activity_count' => count($createdActivities),
            'activity_ids' => $createdActivities,
        ]);
    }

    /**
     * Get tenant activity statistics.
     */
    public function statistics(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'tenant_slug' => 'required|string',
            'days' => 'nullable|integer|min:1|max:90',
        ]);

        $tenant = Tenant::where('slug', $validated['tenant_slug'])->first();

        if (!$tenant) {
            return response()->json([
                'success' => false,
                'message' => 'Tenant not found',
            ], 404);
        }

        $days = $validated['days'] ?? 30;

        // Get statistics
        $totalActivities = TenantAppActivity::where('tenant_id', $tenant->id)
            ->recent($days)
            ->count();

        $errorCount = TenantAppActivity::where('tenant_id', $tenant->id)
            ->recent($days)
            ->errors()
            ->count();

        $photoTakenCount = TenantAppActivity::where('tenant_id', $tenant->id)
            ->recent($days)
            ->where('event_type', 'photo_taken')
            ->count();

        $printSuccessCount = TenantAppActivity::where('tenant_id', $tenant->id)
            ->recent($days)
            ->where('event_type', 'print_success')
            ->count();

        $dailyUsage = TenantAppActivity::where('tenant_id', $tenant->id)
            ->selectRaw('DATE(occurred_at) as date, COUNT(*) as count')
            ->recent($days)
            ->groupBy('date')
            ->orderBy('date')
            ->get();

        return response()->json([
            'success' => true,
            'statistics' => [
                'total_activities' => $totalActivities,
                'error_count' => $errorCount,
                'photo_taken_count' => $photoTakenCount,
                'print_success_count' => $printSuccessCount,
                'daily_usage' => $dailyUsage,
            ],
        ]);
    }
}
