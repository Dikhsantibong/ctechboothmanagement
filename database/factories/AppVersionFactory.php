<?php

namespace Database\Factories;

use App\Models\AppVersion;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<AppVersion>
 */
class AppVersionFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'version' => fake()->randomElement(['1.0.0', '1.1.0', '1.2.0', '2.0.0']),
            'version_code' => fake()->numberBetween(100, 200),
            'platform' => fake()->randomElement(['web', 'android', 'ios', 'desktop']),
            'release_type' => fake()->randomElement(['major', 'minor', 'patch', 'hotfix']),
            'release_notes' => fake()->paragraph(),
            'is_force_update' => false,
            'is_active' => true,
            'released_at' => fake()->dateTimeBetween('-6 months', 'now'),
            'download_url' => fake()->url(),
            'checksum' => fake()->md5(),
            'file_size_bytes' => fake()->numberBetween(10000000, 100000000),
            'metadata' => [],
        ];
    }

    /**
     * Indicate that the version is a force update.
     */
    public function forceUpdate(): static
    {
        return $this->state(fn (array $attributes) => [
            'is_force_update' => true,
        ]);
    }

    /**
     * Indicate that the version is inactive.
     */
    public function inactive(): static
    {
        return $this->state(fn (array $attributes) => [
            'is_active' => false,
        ]);
    }

    /**
     * Create a web version.
     */
    public function web(): static
    {
        return $this->state(fn (array $attributes) => [
            'platform' => 'web',
        ]);
    }

    /**
     * Create an Android version.
     */
    public function android(): static
    {
        return $this->state(fn (array $attributes) => [
            'platform' => 'android',
        ]);
    }

    /**
     * Create an iOS version.
     */
    public function ios(): static
    {
        return $this->state(fn (array $attributes) => [
            'platform' => 'ios',
        ]);
    }
}
