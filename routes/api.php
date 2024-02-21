<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers;

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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/registrar', [\App\Http\Controllers\AutenticarController::class, 'registrar']);
Route::post('/login', [\App\Http\Controllers\AutenticarController::class, 'login']);


Route::get('/carrito/{id}', [Controllers\CarritoController::class, 'getCarrito']);
Route::post('/addProducto', [Controllers\CarritoController::class, 'addProductToCarrito']);

Route::middleware(['auth:sanctum'])->group(function() {
    Route::get('/usuario', [Controllers\UserController::class, 'obtenerUsuario']);

    Route::get('/logout', [Controllers\AutenticarController::class, 'logout']);
});


Route::get('/productos', [Controllers\ProductosController::class, 'index']);
Route::get('/productosAll', [Controllers\ProductosController::class, 'indexAllInfo']);
Route::get('/producto/{id}', [Controllers\ProductosController::class, 'showAllProduct']);
