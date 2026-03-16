<?php

use App\Http\Controllers\Api\ContentController;
use App\Http\Controllers\Api\SettingController;
use Illuminate\Support\Facades\Route;

Route::get('/settings', [SettingController::class, 'index']);

Route::get('/content/{type}', [ContentController::class, 'index']);
Route::get('/content/slug/{slug}', [ContentController::class, 'show']);
