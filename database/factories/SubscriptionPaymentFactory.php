<?php

namespace Database\Factories;

use App\Models\SubscriptionPayment;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<SubscriptionPayment>
 */
class SubscriptionPaymentFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'tenant_subscription_id' => null,
            'payment_number' => 'PAY-' . fake()->unique()->numerify('######'),
            'amount' => fake()->randomFloat(2, 100000, 5000000),
            'currency' => 'IDR',
            'payment_method' => fake()->randomElement(['bank_transfer', 'credit_card', 'ewallet', 'qris', 'manual']),
            'status' => fake()->randomElement(['pending', 'paid', 'failed', 'refunded', 'cancelled']),
            'paid_at' => fake()->randomElement([now(), null]),
            'payment_gateway' => fake()->randomElement(['midtrans', 'xendit', 'manual']),
            'transaction_id' => fake()->uuid(),
            'payment_proof' => null,
            'notes' => fake()->sentence(),
            'metadata' => [],
        ];
    }

    /**
     * Indicate that the payment is paid.
     */
    public function paid(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'paid',
            'paid_at' => now(),
        ]);
    }

    /**
     * Indicate that the payment is pending.
     */
    public function pending(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'pending',
            'paid_at' => null,
        ]);
    }

    /**
     * Indicate that the payment is failed.
     */
    public function failed(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'failed',
            'paid_at' => null,
        ]);
    }

    /**
     * Indicate that the payment is refunded.
     */
    public function refunded(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'refunded',
            'paid_at' => now()->subDays(10),
        ]);
    }
}
