<?php

use Illuminate\Support\Facades\Route;

Route::inertia('/', 'welcome')->name('home');
Route::inertia('/fitur', 'front/fitur')->name('front.fitur');
Route::inertia('/solusi', 'front/solusi')->name('front.solusi');
Route::inertia('/harga', 'front/harga')->name('front.harga');
Route::inertia('/faq', 'front/faq')->name('front.faq');

require __DIR__.'/settings.php';
require __DIR__.'/admin.php';
require __DIR__.'/api.php';
