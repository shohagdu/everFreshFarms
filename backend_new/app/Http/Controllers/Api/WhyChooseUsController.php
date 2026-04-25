<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\WhyChooseUs;
use Illuminate\Http\JsonResponse;

class WhyChooseUsController extends Controller
{
    public function index(): JsonResponse
    {
        $items = WhyChooseUs::where('is_active', true)->orderBy('sort_order')->get();
        return response()->json($items);
    }
}
