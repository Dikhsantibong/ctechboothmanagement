<?php

namespace Database\Factories;

use App\Models\UsageEvent;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<UsageEvent>
 */
class UsageEventFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $eventTypes = [
            'photo_session',
            'video_session',
            'template_used',
            'file_upload',
            'file_download',
            'social_share',
            'email_sent',
            'api_call',
            'user_login',
            'booth_start',
            'booth_end',
        ];

        $categories = [
            'session',
            'media',
            'sharing',
            'system',
            'api',
        ];

        return [
            'tenant_id' => null,
            'event_type' => fake()->randomElement($eventTypes),
            'event_category' => fake()->randomElement($categories),
            'description' => fake()->sentence(),
            'metadata' => [
                'ip_address' => fake()->ipv4(),
                'user_agent' => fake()->userAgent(),
            ],
            'quantity' => fake()->numberBetween(1, 10),
            'unit' => 'count',
            'occurred_at' => fake()->dateTimeBetween('-30 days', 'now'),
        ];
    }

    /**
     * Indicate that the event is a photo session.
     */
    public function photoSession(): static
    {
        return $this->state(fn (array $attributes) => [
            'event_type' => 'photo_session',
            'event_category' => 'session',
            'description' => 'Photo booth session completed',
        ]);
    }

    /**
     * Indicate that the event is a video session.
     */
    public function videoSession(): static
    {
        return $this->state(fn (array $attributes) => [
            'event_type' => 'video_session',
            'event_category' => 'session',
            'description' => 'Video recording session completed',
        ]);
    }

    /**
     * Indicate that the event is a template usage.
     */
    public function templateUsage(): static
    {
        return $this->state(fn (array $attributes) => [
            'event_type' => 'template_used',
            'event_category' => 'media',
            'description' => 'Template applied to photo',
        ]);
    }

    /**
     * Indicate that the event is a social share.
     */
    public function socialShare(): static
    {
        return $this->state(fn (array $attributes) => [
            'event_type' => 'social_share',
            'event_category' => 'sharing',
            'description' => 'Photo shared to social media',
        ]);
    }
}
