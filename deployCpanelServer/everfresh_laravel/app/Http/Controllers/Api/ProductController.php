<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\JsonResponse;

class ProductController extends Controller
{
    public function index(): JsonResponse
    {
        $products = Product::where('is_active', true)->orderBy('sort_order')->get();
        $products->each(function ($p) {
            if ($p->image) {
                $p->image = asset('storage/' . $p->image);
            }
        });
        return response()->json($products);
    }
}
