<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\DB;
use App\Http\Resources\UserResource;

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
    return DB::table('items')->take(5)->get()->toJson();
});

Route::get('/allItems', function () {
    return DB::table('items')->get()->toJson();
});

$limiter = config('fortify.limiters.login');
$verificationLimiter = config('fortify.limiters.verification', '6,1');

Route::middleware('auth:sanctum')->group(function () {

    Route::get('/authenticated', function () {
        return new UserResource(auth()->user());
    });
});