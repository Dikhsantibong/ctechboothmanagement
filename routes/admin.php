<?php

use App\Http\Controllers\Admin\TenantController;
use App\Http\Controllers\Admin\SubscriptionPlanController;
use App\Http\Controllers\Admin\TenantSubscriptionController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\SupportTicketController;
use App\Http\Controllers\Admin\AdminActivityLogController;
use App\Http\Controllers\Admin\InvoiceController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'verified'])->group(function () {
    Route::prefix('admin')->name('admin.')->group(function () {
        // Dashboard Route
        Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');

        // Invoices
        Route::resource('invoices', InvoiceController::class);

        // Activity Logs Routes
        Route::prefix('activity-logs')->name('activity-logs.')->group(function () {
            Route::get('/', [AdminActivityLogController::class, 'index'])->name('index');
            Route::get('/{log}', [AdminActivityLogController::class, 'show'])->name('show');
        });

        // Support Tickets Routes
        Route::prefix('support-tickets')->name('support-tickets.')->group(function () {
            Route::get('/', [SupportTicketController::class, 'index'])->name('index');
            Route::get('/create', [SupportTicketController::class, 'create'])->name('create');
            Route::post('/', [SupportTicketController::class, 'store'])->name('store');
            Route::get('/{ticket}', [SupportTicketController::class, 'show'])->name('show');
            Route::get('/{ticket}/edit', [SupportTicketController::class, 'edit'])->name('edit');
            Route::put('/{ticket}', [SupportTicketController::class, 'update'])->name('update');
            Route::delete('/{ticket}', [SupportTicketController::class, 'destroy'])->name('destroy');
            
            // Ticket Actions
            Route::post('/{ticket}/status/{status}', [SupportTicketController::class, 'updateStatus'])->name('update-status');
            Route::post('/{ticket}/resolution', [SupportTicketController::class, 'updateResolution'])->name('update-resolution');
        });



        // Subscription Management Routes
        Route::prefix('subscriptions')->name('subscriptions.')->group(function () {
            Route::get('/', [TenantSubscriptionController::class, 'index'])->name('index');
            Route::get('/{subscription}', [TenantSubscriptionController::class, 'show'])->name('show');
        });

        // Tenant Management Routes
        Route::prefix('tenants')->name('tenants.')->group(function () {
            Route::get('/', [TenantController::class, 'index'])->name('index');
            Route::get('/create', [TenantController::class, 'create'])->name('create');
            Route::post('/', [TenantController::class, 'store'])->name('store');
            Route::get('/{tenant}', [TenantController::class, 'show'])->name('show');
            Route::get('/{tenant}/edit', [TenantController::class, 'edit'])->name('edit');
            Route::put('/{tenant}', [TenantController::class, 'update'])->name('update');
            Route::delete('/{tenant}', [TenantController::class, 'destroy'])->name('destroy');
            
            // Tenant Actions
            Route::post('/{tenant}/suspend', [TenantController::class, 'suspend'])->name('suspend');
            Route::post('/{tenant}/activate', [TenantController::class, 'activate'])->name('activate');
            
            // Tenant Details
            Route::get('/{tenant}/subscriptions', [TenantController::class, 'subscriptions'])->name('subscriptions');
            Route::get('/{tenant}/payments', [TenantController::class, 'payments'])->name('payments');
            Route::get('/{tenant}/activity', [TenantController::class, 'activity'])->name('activity');

            // Tenant Subscription Management
            Route::prefix('{tenant}/subscriptions')->name('subscriptions.')->group(function () {
                Route::get('/create', [TenantSubscriptionController::class, 'create'])->name('create');
                Route::post('/', [TenantSubscriptionController::class, 'store'])->name('store');
                Route::get('/{subscription}/edit', [TenantSubscriptionController::class, 'edit'])->name('edit');
                Route::put('/{subscription}', [TenantSubscriptionController::class, 'update'])->name('update');
                Route::post('/{subscription}/cancel', [TenantSubscriptionController::class, 'cancel'])->name('cancel');
                Route::post('/{subscription}/suspend', [TenantSubscriptionController::class, 'suspend'])->name('suspend');
                Route::post('/{subscription}/activate', [TenantSubscriptionController::class, 'activate'])->name('activate');
                Route::post('/{subscription}/renew', [TenantSubscriptionController::class, 'renew'])->name('renew');
            });
        });

        // Subscription Plan Management Routes
        Route::prefix('subscription-plans')->name('subscription-plans.')->group(function () {
            Route::get('/', [SubscriptionPlanController::class, 'index'])->name('index');
            Route::get('/create', [SubscriptionPlanController::class, 'create'])->name('create');
            Route::post('/', [SubscriptionPlanController::class, 'store'])->name('store');
            Route::get('/{plan}', [SubscriptionPlanController::class, 'show'])->name('show');
            Route::get('/{plan}/edit', [SubscriptionPlanController::class, 'edit'])->name('edit');
            Route::put('/{plan}', [SubscriptionPlanController::class, 'update'])->name('update');
            Route::delete('/{plan}', [SubscriptionPlanController::class, 'destroy'])->name('destroy');
            
            // Plan Actions
            Route::post('/{plan}/toggle-status', [SubscriptionPlanController::class, 'toggleStatus'])->name('toggle-status');
            
            // API for plan selection
            Route::get('/api/active', [SubscriptionPlanController::class, 'getActivePlans'])->name('api.active');
        });
    });
});
