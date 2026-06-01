<?php

namespace App\Models;

use Database\Factories\SubscriptionPlanFeatureFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Attributes\Hidden;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

#[Fillable([
    'subscription_plan_id',
    'feature_name',
    'feature_key',
    'description',
    'limit',
    'is_enabled',
])]
#[Hidden([])]
class SubscriptionPlanFeature extends Model
{
    /** @use HasFactory<SubscriptionPlanFeatureFactory> */
    use HasFactory;

    /**
     * Get the subscription plan that owns the feature.
     */
    public function subscriptionPlan(): BelongsTo
    {
        return $this->belongsTo(SubscriptionPlan::class);
    }

    /**
     * Scope a query to only include enabled features.
     */
    public function scopeEnabled($query)
    {
        return $query->where('is_enabled', true);
    }
}
