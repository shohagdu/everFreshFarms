<?php

use Illuminate\Support\Facades\Route;

Route::any('/{any}', function () {
    return file_get_contents('/home/shohozit/public_html/everfresh_farm/index.html');
})->where('any', '^(?!admin|api|livewire).*$');
