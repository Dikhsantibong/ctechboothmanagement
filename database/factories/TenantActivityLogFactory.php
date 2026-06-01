<?php

namespace Database\Factories;

use App\Models\TenantActivityLog;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<TenantActivityLog>
 */
class TenantActivityLogFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $actions = [
            'create',
            'update',
            'delete',
            'login',
            'logout',
            'export',
            'import',
            'settings_update',
        ];

        $modules = [
            'users',
            'tenants',
            'subscriptions',
            'payments',
            'booths',
            'templates',
            'sessions',
            'reports',
        ];

        return [
            'tenant_id' => null,
            'user_id' => null,
            'action' => fake()->randomElement($actions),
            'module' => fake()->randomElement($modules),
            'description' => fake()->sentence(),
            'ip_address' => fake()->ipv4(),
            'user_agent' => fake()->userAgent(),
            'old_values' => null,
            'new_values' => null,
            'logged_at' => fake()->dateTimeBetween('-30 days', 'now'),
        ];
    }

    /**
     * Indicate that the log is for a create action.
     */
    public function create(): static
    {
        return $this->state(fn (array $attributes) => [
            'action' => 'create',
            'description' => 'Created a new record',
        ]);
    }

    /**
     * Indicate that the log is for an update action.
     */
    public function update(): static
    {
        return $this->state(fn (array $attributes) => [
            'action' => 'update',
            'description' => 'Updated an existing record',
            'old_values' => ['field' => 'old_value'],
            'new_values' => ['field' => 'new_value'],
        ]);
    }

    /**
     * Indicate that the log is for a delete action.
     */
    public function delete(): static
    {
        return $this->state(fn (array $attributes) => [
            'action' => 'delete',
            'description' => 'Deleted a record',
            'old_values' => ['field' => 'deleted_value'],
        ]);
    }

    /**
     * Indicate that the log is for a login action.
     */
    public function login(): static
    {
        return $this->state(fn (array $attributes) => [
            'action' => 'login',
            'module' => 'auth',
            'description' => 'User logged in',
        ]);
    }

    /**
     * Indicate that the log is for a logout action.
     */
    public function logout(): static
    {
        return $this->state(fn (array $attributes) => [
            'action' => 'logout',
            'module' => 'auth',
            'description' => 'User logged out',
        ]);
    }
}
