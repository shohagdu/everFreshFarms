<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\HeroBanner;
use Illuminate\Http\JsonResponse;

class HeroBannerController extends Controller
{
    public function index(): JsonResponse
    {
        $banner = HeroBanner::where('is_active', true)->first();

        if ($banner && $banner->background_image) {
            $banner->background_image = asset('storage/' . $banner->background_image);
        }

        return response()->json($banner);
    }
}
