<?php

use App\Http\Controllers\Api\ActivityController;
use Illuminate\Support\Facades\Route;

Route::middleware(['api'])->group(function () {
    // Activity logging endpoints for tenant applications
    Route::prefix('activity')->group(function () {
        Route::post('/', [ActivityController::class, 'store'])->name('activity.store');
        Route::post('/batch', [ActivityController::class, 'batch'])->name('activity.batch');
        Route::get('/statistics', [ActivityController::class, 'statistics'])->name('activity.statistics');
    });
});
