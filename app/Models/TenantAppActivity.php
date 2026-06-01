<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

#[Fillable([
    'tenant_id',
    'event_type',
    'event_data',
    'app_version',
    'device_info',
    'ip_address',
    'occurred_at',
])]
class TenantAppActivity extends Model
{
    use HasFactory;

    protected $casts = [
        'event_data' => 'array',
        'device_info' => 'array',
        'occurred_at' => 'datetime',
    ];

    /**
     * Get the tenant that owns the activity.
     */
    public function tenant(): BelongsTo
    {
        return $this->belongsTo(Tenant::class);
    }

    /**
     * Scope a query to filter by event type.
     */
    public function scopeByEventType($query, $eventType)
    {
        return $query->where('event_type', $eventType);
    }

    /**
     * Scope a query to filter by tenant.
     */
    public function scopeByTenant($query, $tenantId)
    {
        return $query->where('tenant_id', $tenantId);
    }

    /**
     * Scope a query to filter by date range.
     */
    public function scopeBetweenDates($query, $startDate, $endDate)
    {
        return $query->whereBetween('occurred_at', [$startDate, $endDate]);
    }

    /**
     * Scope a query for recent activities.
     */
    public function scopeRecent($query, $days = 30)
    {
        return $query->where('occurred_at', '>=', now()->subDays($days));
    }

    /**
     * Scope a query for error events.
     */
    public function scopeErrors($query)
    {
        return $query->where('event_type', 'like', '%_error');
    }

    /**
     * Scope a query for usage events.
     */
    public function scopeUsage($query)
    {
        return $query->where('event_type', 'like', '%_success')
            ->orWhere('event_type', 'session_started')
            ->orWhere('event_type', 'photo_taken')
            ->orWhere('event_type', 'qr_downloaded');
    }
}
