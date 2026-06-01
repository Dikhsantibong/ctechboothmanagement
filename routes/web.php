<?php

use Illuminate\Support\Facades\Route;

Route::inertia('/', 'welcome')->name('home');
Route::inertia('/features', 'front/features')->name('front.features');
Route::inertia('/analytics', 'front/analytics')->name('front.analytics');
Route::inertia('/testimonials', 'front/testimonials')->name('front.testimonials');
Route::inertia('/pricing', 'front/pricing')->name('front.pricing');

require __DIR__.'/settings.php';
require __DIR__.'/admin.php';
require __DIR__.'/api.php';
