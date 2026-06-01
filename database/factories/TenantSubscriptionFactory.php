<?php

namespace Database\Factories;

use App\Models\TenantSubscription;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<TenantSubscription>
 */
class TenantSubscriptionFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'tenant_id' => null,
            'subscription_plan_id' => null,
            'subscription_number' => 'SUB-' . fake()->unique()->numerify('######'),
            'starts_at' => now(),
            'ends_at' => now()->addDays(30),
            'trial_ends_at' => null,
            'status' => fake()->randomElement(['active', 'trial', 'expired', 'suspended']),
            'amount' => fake()->randomFloat(2, 100000, 5000000),
            'currency' => 'IDR',
            'auto_renew' => true,
            'cancelled_at' => null,
            'cancellation_reason' => null,
            'metadata' => [],
        ];
    }

    /**
     * Indicate that the subscription is active.
     */
    public function active(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'active',
            'starts_at' => now()->subDays(15),
            'ends_at' => now()->addDays(15),
            'trial_ends_at' => null,
        ]);
    }

    /**
     * Indicate that the subscription is on trial.
     */
    public function trial(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'trial',
            'starts_at' => now(),
            'ends_at' => now()->addDays(30),
            'trial_ends_at' => now()->addDays(14),
            'amount' => 0,
        ]);
    }

    /**
     * Indicate that the subscription is expired.
     */
    public function expired(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'expired',
            'starts_at' => now()->subDays(60),
            'ends_at' => now()->subDays(30),
            'trial_ends_at' => null,
        ]);
    }

    /**
     * Indicate that the subscription is cancelled.
     */
    public function cancelled(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'cancelled',
            'cancelled_at' => now()->subDays(5),
            'cancellation_reason' => fake()->sentence(),
            'auto_renew' => false,
        ]);
    }

    /**
     * Indicate that the subscription is suspended.
     */
    public function suspended(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'suspended',
        ]);
    }
}
