<?php

namespace App\Models;

use Database\Factories\TenantFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Attributes\Hidden;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

#[Fillable([
    'business_name',
    'owner_name',
    'email',
    'phone',
    'city',
    'address',
    'status',
    'trial_ends_at',
    'logo',
    'slug',
    'settings',
])]
#[Hidden([])]
class Tenant extends Model
{
    /** @use HasFactory<TenantFactory> */
    use HasFactory, SoftDeletes;

    protected static function booted()
    {
        static::deleting(function ($tenant) {
            if ($tenant->isForceDeleting()) {
                $tenant->subscriptions()->forceDelete();
                $tenant->invoices()->forceDelete();
                $tenant->activityLogs()->forceDelete();
                $tenant->supportTickets()->forceDelete();
                $tenant->notificationLogs()->forceDelete();
                $tenant->usageEvents()->forceDelete();
            } else {
                $tenant->subscriptions()->delete();
                $tenant->invoices()->delete();
                $tenant->activityLogs()->delete();
                $tenant->supportTickets()->delete();
                $tenant->notificationLogs()->delete();
                $tenant->usageEvents()->delete();
            }
        });
    }

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'trial_ends_at' => 'datetime',
            'settings' => 'array',
        ];
    }

    /**
     * Get the subscriptions for the tenant.
     */
    public function subscriptions(): HasMany
    {
        return $this->hasMany(TenantSubscription::class);
    }

    /**
     * Get the active subscription for the tenant.
     */
    public function activeSubscription()
    {
        return $this->hasOne(TenantSubscription::class)->where('status', 'active');
    }

    /**
     * Get the usage events for the tenant.
     */
    public function usageEvents(): HasMany
    {
        return $this->hasMany(UsageEvent::class);
    }

    /**
     * Get the activity logs for the tenant.
     */
    public function activityLogs(): HasMany
    {
        return $this->hasMany(TenantActivityLog::class);
    }

    /**
     * Get the support tickets for the tenant.
     */
    public function supportTickets(): HasMany
    {
        return $this->hasMany(SupportTicket::class);
    }

    public function invoices()
    {
        return $this->hasMany(Invoice::class);
    }

    /**
     * Get the notification logs for the tenant.
     */
    public function notificationLogs(): HasMany
    {
        return $this->hasMany(NotificationLog::class);
    }

    /**
     * Scope a query to only include active tenants.
     */
    public function scopeActive($query)
    {
        return $query->where('status', 'active');
    }

    /**
     * Scope a query to only include trial tenants.
     */
    public function scopeTrial($query)
    {
        return $query->where('status', 'trial');
    }

    /**
     * Check if tenant is on trial.
     */
    public function isOnTrial(): bool
    {
        return $this->status === 'trial' && $this->trial_ends_at && $this->trial_ends_at->isFuture();
    }

    /**
     * Check if tenant is active.
     */
    public function isActive(): bool
    {
        return $this->status === 'active';
    }
}
