<?php

namespace Database\Factories;

use App\Models\SupportTicket;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<SupportTicket>
 */
class SupportTicketFactory extends Factory
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
            'user_id' => null,
            'ticket_number' => 'TKT-' . fake()->unique()->numerify('######'),
            'subject' => fake()->sentence(),
            'message' => fake()->paragraph(),
            'priority' => fake()->randomElement(['low', 'medium', 'high', 'urgent']),
            'status' => fake()->randomElement(['open', 'in_progress', 'pending', 'resolved', 'closed']),
            'category' => fake()->randomElement(['technical', 'billing', 'feature_request', 'bug_report', 'other']),
            'assigned_to' => null,
            'resolved_at' => null,
            'closed_at' => null,
            'resolution_time_minutes' => null,
            'resolution_notes' => null,
            'attachments' => [],
        ];
    }

    /**
     * Indicate that the ticket is open.
     */
    public function open(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'open',
        ]);
    }

    /**
     * Indicate that the ticket is in progress.
     */
    public function inProgress(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'in_progress',
        ]);
    }

    /**
     * Indicate that the ticket is resolved.
     */
    public function resolved(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'resolved',
            'resolved_at' => now()->subHours(2),
            'resolution_time_minutes' => fake()->numberBetween(30, 480),
            'resolution_notes' => fake()->sentence(),
        ]);
    }

    /**
     * Indicate that the ticket is closed.
     */
    public function closed(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'closed',
            'resolved_at' => now()->subDay(),
            'closed_at' => now()->subHours(12),
            'resolution_time_minutes' => fake()->numberBetween(30, 480),
            'resolution_notes' => fake()->sentence(),
        ]);
    }

    /**
     * Indicate that the ticket has high priority.
     */
    public function highPriority(): static
    {
        return $this->state(fn (array $attributes) => [
            'priority' => 'high',
        ]);
    }

    /**
     * Indicate that the ticket has urgent priority.
     */
    public function urgent(): static
    {
        return $this->state(fn (array $attributes) => [
            'priority' => 'urgent',
        ]);
    }

    /**
     * Indicate that the ticket is a technical issue.
     */
    public function technical(): static
    {
        return $this->state(fn (array $attributes) => [
            'category' => 'technical',
        ]);
    }

    /**
     * Indicate that the ticket is a billing issue.
     */
    public function billing(): static
    {
        return $this->state(fn (array $attributes) => [
            'category' => 'billing',
        ]);
    }

    /**
     * Indicate that the ticket is a bug report.
     */
    public function bugReport(): static
    {
        return $this->state(fn (array $attributes) => [
            'category' => 'bug_report',
        ]);
    }
}
