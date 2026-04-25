<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\Facades\Config;
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
        if (env('IS_LIVE_DEPLOY') === 'YES') {
            $liveUrl = 'https://shohozit.com/everfresh_farm';
            URL::forceRootUrl($liveUrl);
            Config::set('app.url', $liveUrl);
            Config::set('session.path', '/everfresh_farm');

            Livewire::setUpdateRoute(function ($handle) {
                return Route::post('/everfresh_farm/livewire/update', $handle);
            });

            Livewire::setScriptRoute(function ($handle) {
                return Route::get('/everfresh_farm/livewire/livewire.js', $handle);
            });
        }
    }
}
