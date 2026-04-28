<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\AboutUs;
use Illuminate\Http\JsonResponse;

class AboutUsController extends Controller
{
    public function index(): JsonResponse
    {
        $about = AboutUs::first();
        if ($about && $about->image) {
            $about->image = asset('storage/' . $about->image);
        }
        return response()->json($about);
    }
}
