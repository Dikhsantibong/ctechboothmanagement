<?php

namespace Database\Factories;

use App\Models\SubscriptionPlan;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends Factory<SubscriptionPlan>
 */
class SubscriptionPlanFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $name = fake()->randomElement(['Starter', 'Professional', 'Enterprise', 'Basic']);
        return [
            'name' => $name . ' Plan',
            'slug' => Str::slug($name) . '-' . fake()->randomNumber(4),
            'description' => fake()->sentence(),
            'price' => fake()->randomFloat(2, 100000, 5000000),
            'currency' => 'IDR',
            'duration_days' => fake()->randomElement([30, 90, 365]),
            'billing_cycle' => fake()->randomElement(['monthly', 'yearly']),
            'is_active' => true,
            'is_trial' => false,
            'trial_days' => null,
            'max_booths' => fake()->numberBetween(1, 10),
            'max_users' => fake()->numberBetween(1, 50),
            'storage_limit_mb' => fake()->numberBetween(1000, 50000),
            'metadata' => [],
        ];
    }

    /**
     * Indicate that the plan is a trial plan.
     */
    public function trial(): static
    {
        return $this->state(fn (array $attributes) => [
            'is_trial' => true,
            'trial_days' => 14,
            'price' => 0,
        ]);
    }

    /**
     * Indicate that the plan is inactive.
     */
    public function inactive(): static
    {
        return $this->state(fn (array $attributes) => [
            'is_active' => false,
        ]);
    }

    /**
     * Create a starter plan.
     */
    public function starter(): static
    {
        return $this->state(fn (array $attributes) => [
            'name' => 'Starter Plan',
            'slug' => 'starter-plan',
            'price' => 299000,
            'duration_days' => 30,
            'billing_cycle' => 'monthly',
            'max_booths' => 1,
            'max_users' => 2,
            'storage_limit_mb' => 1000,
        ]);
    }

    /**
     * Create a professional plan.
     */
    public function professional(): static
    {
        return $this->state(fn (array $attributes) => [
            'name' => 'Professional Plan',
            'slug' => 'professional-plan',
            'price' => 999000,
            'duration_days' => 30,
            'billing_cycle' => 'monthly',
            'max_booths' => 5,
            'max_users' => 10,
            'storage_limit_mb' => 10000,
        ]);
    }

    /**
     * Create an enterprise plan.
     */
    public function enterprise(): static
    {
        return $this->state(fn (array $attributes) => [
            'name' => 'Enterprise Plan',
            'slug' => 'enterprise-plan',
            'price' => 2499000,
            'duration_days' => 30,
            'billing_cycle' => 'monthly',
            'max_booths' => 20,
            'max_users' => 50,
            'storage_limit_mb' => 50000,
        ]);
    }
}
