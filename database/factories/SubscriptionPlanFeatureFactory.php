<?php

namespace Database\Factories;

use App\Models\SubscriptionPlanFeature;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<SubscriptionPlanFeature>
 */
class SubscriptionPlanFeatureFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $features = [
            ['name' => 'Photo Sessions', 'key' => 'photo_sessions', 'limit' => 100],
            ['name' => 'Video Recording', 'key' => 'video_recording', 'limit' => 50],
            ['name' => 'Custom Templates', 'key' => 'custom_templates', 'limit' => 10],
            ['name' => 'Green Screen', 'key' => 'green_screen', 'limit' => null],
            ['name' => 'Social Media Sharing', 'key' => 'social_sharing', 'limit' => null],
            ['name' => 'Email Delivery', 'key' => 'email_delivery', 'limit' => null],
            ['name' => 'Analytics Dashboard', 'key' => 'analytics', 'limit' => null],
            ['name' => 'API Access', 'key' => 'api_access', 'limit' => null],
            ['name' => 'White Label', 'key' => 'white_label', 'limit' => null],
            ['name' => 'Priority Support', 'key' => 'priority_support', 'limit' => null],
        ];

        $feature = fake()->randomElement($features);

        return [
            'subscription_plan_id' => null,
            'feature_name' => $feature['name'],
            'feature_key' => $feature['key'],
            'description' => fake()->sentence(),
            'limit' => $feature['limit'],
            'is_enabled' => true,
        ];
    }

    /**
     * Indicate that the feature is disabled.
     */
    public function disabled(): static
    {
        return $this->state(fn (array $attributes) => [
            'is_enabled' => false,
        ]);
    }

    /**
     * Indicate that the feature has unlimited limit.
     */
    public function unlimited(): static
    {
        return $this->state(fn (array $attributes) => [
            'limit' => null,
        ]);
    }
}
