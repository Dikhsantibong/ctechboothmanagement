<?php

namespace App\Models;

use Database\Factories\SubscriptionPlanFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Attributes\Hidden;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

#[Fillable([
    'name',
    'slug',
    'description',
    'price',
    'currency',
    'duration_days',
    'billing_cycle',
    'is_active',
    'is_trial',
    'trial_days',
    'max_booths',
    'max_users',
    'storage_limit_mb',
    'metadata',
])]
#[Hidden([])]
class SubscriptionPlan extends Model
{
    /** @use HasFactory<SubscriptionPlanFactory> */
    use HasFactory;

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'metadata' => 'array',
        ];
    }

    /**
     * Get the features for the subscription plan.
     */
    public function features(): HasMany
    {
        return $this->hasMany(SubscriptionPlanFeature::class);
    }

    /**
     * Get the tenant subscriptions for the plan.
     */
    public function tenantSubscriptions(): HasMany
    {
        return $this->hasMany(TenantSubscription::class);
    }

    /**
     * Scope a query to only include active plans.
     */
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    /**
     * Scope a query to only include trial plans.
     */
    public function scopeTrial($query)
    {
        return $query->where('is_trial', true);
    }

    /**
     * Scope a query to only include paid plans.
     */
    public function scopePaid($query)
    {
        return $query->where('is_trial', false);
    }
}
