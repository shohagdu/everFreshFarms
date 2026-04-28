<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Livewire\Livewire;
use Illuminate\Support\Facades\Route;

class AppServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        //
    }

    public function boot(): void
    {
//        $prefix = env('LIVEWIRE_ROUTE_PREFIX', '');
//
//        Livewire::setUpdateRoute(function ($handle) use ($prefix) {
//            return Route::post($prefix . '/livewire/update', $handle);
//        });
//
//        Livewire::setScriptRoute(function ($handle) use ($prefix) {
//            return Route::get($prefix . '/livewire/livewire.js', $handle);
//        });
    }
}
