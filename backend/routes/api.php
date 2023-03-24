<?php

use App\Http\Controllers\APIController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/tasks', [APIController::class, 'index']);
Route::get('/tasks/{id}', [APIController::class, 'show']);
Route::post('/tasks', [APIController::class, 'store']);
Route::match(['put', 'patch'], '/tasks/{id}', [APIController::class, 'update']);
Route::delete('/tasks/{id}', [APIController::class, 'destroy']);
