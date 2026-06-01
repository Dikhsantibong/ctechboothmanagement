<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

#[Fillable([
    'user_id',
    'action',
    'module',
    'description',
    'subject_type',
    'subject_id',
    'old_values',
    'new_values',
    'ip_address',
    'user_agent',
    'logged_at',
])]
class AdminActivityLog extends Model
{
    use HasFactory;

    protected $casts = [
        'old_values' => 'array',
        'new_values' => 'array',
        'logged_at' => 'datetime',
    ];

    public const CREATED_AT = 'logged_at';
    public const UPDATED_AT = null;

    /**
     * Get the user that owns the activity log.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Scope a query to filter by action.
     */
    public function scopeByAction($query, $action)
    {
        return $query->where('action', $action);
    }

    /**
     * Scope a query to filter by module.
     */
    public function scopeByModule($query, $module)
    {
        return $query->where('module', $module);
    }

    /**
     * Scope a query to filter by date range.
     */
    public function scopeBetweenDates($query, $startDate, $endDate)
    {
        return $query->whereBetween('logged_at', [$startDate, $endDate]);
    }

    /**
     * Scope a query for recent logs.
     */
    public function scopeRecent($query, $days = 30)
    {
        return $query->where('logged_at', '>=', now()->subDays($days));
    }

    /**
     * Scope a query by user.
     */
    public function scopeByUser($query, $userId)
    {
        return $query->where('user_id', $userId);
    }
}
