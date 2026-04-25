<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ContactInfo;
use Illuminate\Http\JsonResponse;

class ContactInfoController extends Controller
{
    public function index(): JsonResponse
    {
        $info = ContactInfo::first();
        return response()->json($info);
    }
}
