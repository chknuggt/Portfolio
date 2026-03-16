<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Content;
use Illuminate\Http\JsonResponse;

class ContentController extends Controller
{
    public function index(string $type): JsonResponse
    {
        return response()->json(
            Content::where('type', $type)->get()
        );
    }

    public function show(string $slug): JsonResponse
    {
        $content = Content::where('slug', $slug)->first();

        if (!$content) {
            return response()->json(['error' => 'Not found'], 404);
        }

        return response()->json($content);
    }
}
