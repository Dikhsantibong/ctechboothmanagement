<?php

namespace App\Console\Commands;

use App\Models\TenantSubscription;
use App\Models\NotificationLog;
use App\Models\User;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Log;

class CheckExpiringSubscriptions extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'subscriptions:check-expiring {days=7 : Number of days before expiration to check}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Check for expiring subscriptions and send reminders';

    /**
     * Execute the console command.
     */
    public function handle(): int
    {
        $days = (int) $this->argument('days');
        $thresholdDate = now()->addDays($days);

        $this->info("Checking subscriptions expiring within {$days} days...");

        // Get expiring subscriptions
        $expiringSubscriptions = TenantSubscription::with(['tenant', 'subscriptionPlan'])
            ->where('status', 'active')
            ->where('ends_at', '<=', $thresholdDate)
            ->where('ends_at', '>', now())
            ->orderBy('ends_at')
            ->get();

        $count = $expiringSubscriptions->count();

        if ($count === 0) {
            $this->info("No expiring subscriptions found.");
            return Command::SUCCESS;
        }

        $this->info("Found {$count} expiring subscription(s).");

        foreach ($expiringSubscriptions as $subscription) {
            $remainingDays = now()->diffInDays(\Carbon\Carbon::parse($subscription->ends_at));
            
            $this->info("Processing: {$subscription->subscription_number} - {$subscription->tenant->business_name} ({$remainingDays} days remaining)");

            // Create notification log
            NotificationLog::create([
                'tenant_id' => $subscription->tenant_id,
                'user_id' => null, // System notification
                'type' => 'subscription_reminder',
                'channel' => 'email',
                'status' => 'sent',
                'subject' => "Subscription Expiring in {$remainingDays} Days",
                'content' => "Your subscription ({$subscription->subscription_number}) for {$subscription->subscriptionPlan->name} will expire in {$remainingDays} days. Please renew to continue enjoying our services.",
                'sent_at' => now(),
                'metadata' => json_encode([
                    'subscription_id' => $subscription->id,
                    'subscription_number' => $subscription->subscription_number,
                    'plan_name' => $subscription->subscriptionPlan->name,
                    'remaining_days' => $remainingDays,
                    'ends_at' => $subscription->ends_at,
                ]),
            ]);

            // In production, you would send actual email here
            // Mail::to($subscription->tenant->email)->send(new SubscriptionExpiringReminder($subscription));
        }

        $this->info("Reminder notifications created for {$count} subscription(s).");

        return Command::SUCCESS;
    }
}
