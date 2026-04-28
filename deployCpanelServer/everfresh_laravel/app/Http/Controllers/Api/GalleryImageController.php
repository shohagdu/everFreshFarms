<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\GalleryImage;
use Illuminate\Http\JsonResponse;

class GalleryImageController extends Controller
{
    public function index(): JsonResponse
    {
        $images = GalleryImage::where('is_active', true)->orderBy('sort_order')->get();
        $images->each(function ($img) {
            $img->image = asset('storage/' . $img->image);
        });
        return response()->json($images);
    }
}
