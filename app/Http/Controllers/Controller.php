<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Http\JsonResponse;
use Illuminate\Routing\Controller as BaseController;

class Controller extends BaseController
{
    use AuthorizesRequests, ValidatesRequests;

    protected function response(?string $message = null, ?array $data = [], int $status = 200): JsonResponse
    {
        $data = array_merge([
            'message' => $message,
        ], $data);
        return response()->json($data, $status);
    }
}
