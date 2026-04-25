<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\SiteSettingController;
use App\Http\Controllers\Api\HeroBannerController;
use App\Http\Controllers\Api\AboutUsController;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\WhyChooseUsController;
use App\Http\Controllers\Api\GalleryImageController;
use App\Http\Controllers\Api\GalleryVideoController;
use App\Http\Controllers\Api\ContactInfoController;
use App\Http\Controllers\Api\ContactMessageController;

Route::get('/site-settings',  [SiteSettingController::class, 'index']);
Route::get('/hero',           [HeroBannerController::class, 'index']);
Route::get('/about',          [AboutUsController::class, 'index']);
Route::get('/products',       [ProductController::class, 'index']);
Route::get('/why-choose-us',  [WhyChooseUsController::class, 'index']);
Route::get('/gallery/images', [GalleryImageController::class, 'index']);
Route::get('/gallery/videos', [GalleryVideoController::class, 'index']);
Route::get('/contact-info',   [ContactInfoController::class, 'index']);
Route::post('/contact',       [ContactMessageController::class, 'store']);
