<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\SiteSetting;
use Illuminate\Http\JsonResponse;

class SiteSettingController extends Controller
{
    public function index(): JsonResponse
    {
        $settings = SiteSetting::first();

        if ($settings) {
            if ($settings->logo) {
                $settings->logo = asset('storage/' . $settings->logo);
            }
            if ($settings->favicon) {
                $settings->favicon = asset('storage/' . $settings->favicon);
            }
        }

        return response()->json($settings);
    }
}
