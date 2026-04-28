<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\GalleryVideo;
use Illuminate\Http\JsonResponse;

class GalleryVideoController extends Controller
{
    public function index(): JsonResponse
    {
        $videos = GalleryVideo::where('is_active', true)->orderBy('sort_order')->get();
        $videos->each(function ($v) {
            if ($v->thumbnail) {
                $v->thumbnail = asset('storage/' . $v->thumbnail);
            }
            if ($v->video_file) {
                $v->video_file = asset('storage/' . $v->video_file);
            }
        });
        return response()->json($videos);
    }
}
