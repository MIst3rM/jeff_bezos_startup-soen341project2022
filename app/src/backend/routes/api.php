<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\DB;
use App\Http\Resources\UserResource;
use Illuminate\Support\Facades\Log;
use App\Models\User;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ItemController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::get('/items', function () {
    return DB::table('items')->orderBy('id', 'desc')->take(5)->get()->toJson();
});

Route::get('/allItems', function () {
    return DB::table('items')->get()->toJson();
});

Route::middleware('auth:sanctum')->group(function () {

    Route::get('/user/{id}', function ($id) {
        return User::where('id', $id)->get()->toJson();
    });

    Route::post('/updateUser', [UserController::class, 'updateUser']);

    Route::post('/updateAddress', [UserController::class, 'updateAddress']);

    Route::get('/userOrderHistory', [UserController::class, 'userOrderHistory']);

    Route::post('/addItem', [ItemController::class, 'store']);
});