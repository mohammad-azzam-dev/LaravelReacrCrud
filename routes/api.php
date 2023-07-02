<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\Orders\OrderController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::post('login', [AuthController::class, 'login']);
Route::post('register', [AuthController::class, 'register']);

Route::group(['prefix' => 'dashboard', 'middleware' => 'auth:sanctum'],function (){
    Route::get('user',[AuthController::class, 'getAuthUser']);
    Route::post('logout', [AuthController::class, 'logout']);

    Route::apiResource('orders', OrderController::class);

});

