<?php

use Illuminate\Foundation\Application;
use Illuminate\Http\Request;

define('LARAVEL_START', microtime(true));

// cPanel: Laravel app lives at /home/USERNAME/everfresh_laravel/ (outside public_html)
// cPanel: This file lives at /home/USERNAME/public_html/index.php

//for live server
$laravelPath = __DIR__ . '/../everfresh_laravel';
if (file_exists($maintenance = $laravelPath . '/storage/framework/maintenance.php')) {
    require $maintenance;
}
require $laravelPath . '/vendor/autoload.php';
/** @var Application $app */
$app = require_once $laravelPath . '/bootstrap/app.php';

$app->handleRequest(Request::capture());




/*
//for local env
// Determine if the application is in maintenance mode...
if (file_exists($maintenance = __DIR__.'/../storage/framework/maintenance.php')) {
    require $maintenance;
}
// Register the Composer autoloader...
require __DIR__.'/../vendor/autoload.php';

// Bootstrap Laravel and handle the request...
$app = require_once __DIR__.'/../bootstrap/app.php';

$app->handleRequest(Request::capture());
*/
