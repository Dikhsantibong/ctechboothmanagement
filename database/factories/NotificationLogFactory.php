<?php

namespace Database\Factories;

use App\Models\NotificationLog;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<NotificationLog>
 */
class NotificationLogFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $notificationTypes = [
            'subscription_expiring',
            'payment_received',
            'payment_failed',
            'trial_ending',
            'welcome_email',
            'password_reset',
            'support_ticket_update',
            'system_maintenance',
        ];

        $channels = [
            'email',
            'sms',
            'push',
            'whatsapp',
        ];

        return [
            'tenant_id' => null,
            'user_id' => null,
            'notification_type' => fake()->randomElement($notificationTypes),
            'channel' => fake()->randomElement($channels),
            'subject' => fake()->sentence(),
            'content' => fake()->paragraph(),
            'recipient' => [
                'email' => fake()->email(),
                'phone' => fake()->phoneNumber(),
            ],
            'status' => fake()->randomElement(['queued', 'sent', 'delivered', 'failed', 'bounced']),
            'error_message' => null,
            'sent_at' => fake()->randomElement([now(), null]),
            'delivered_at' => fake()->randomElement([now(), null]),
            'external_id' => fake()->uuid(),
            'metadata' => [],
        ];
    }

    /**
     * Indicate that the notification is sent.
     */
    public function sent(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'sent',
            'sent_at' => now(),
        ]);
    }

    /**
     * Indicate that the notification is delivered.
     */
    public function delivered(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'delivered',
            'sent_at' => now()->subMinutes(5),
            'delivered_at' => now(),
        ]);
    }

    /**
     * Indicate that the notification failed.
     */
    public function failed(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'failed',
            'error_message' => fake()->sentence(),
        ]);
    }

    /**
     * Indicate that the notification is an email.
     */
    public function email(): static
    {
        return $this->state(fn (array $attributes) => [
            'channel' => 'email',
        ]);
    }

    /**
     * Indicate that the notification is an SMS.
     */
    public function sms(): static
    {
        return $this->state(fn (array $attributes) => [
            'channel' => 'sms',
        ]);
    }

    /**
     * Indicate that the notification is a push notification.
     */
    public function push(): static
    {
        return $this->state(fn (array $attributes) => [
            'channel' => 'push',
        ]);
    }

    /**
     * Indicate that the notification is for subscription expiry.
     */
    public function subscriptionExpiring(): static
    {
        return $this->state(fn (array $attributes) => [
            'notification_type' => 'subscription_expiring',
            'subject' => 'Your subscription is expiring soon',
        ]);
    }

    /**
     * Indicate that the notification is for payment received.
     */
    public function paymentReceived(): static
    {
        return $this->state(fn (array $attributes) => [
            'notification_type' => 'payment_received',
            'subject' => 'Payment received successfully',
        ]);
    }
}
