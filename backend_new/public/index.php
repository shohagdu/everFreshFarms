<?php
use Illuminate\Foundation\Application;
use Illuminate\Http\Request;

define('LARAVEL_START', microtime(true));

if (file_exists($maintenance = '/home/shohozit/everfresh_farm/storage/framework/maintenance.php')) {
    require $maintenance;
}

require '/home/shohozit/everfresh_farm/vendor/autoload.php';

$app = require_once '/home/shohozit/everfresh_farm/bootstrap/app.php';

$app->handleRequest(Request::capture());