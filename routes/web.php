<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/



/*
 *
 * Routes for front panel
 * For Customer Portal the root url will be ('/')
 *
 * */


Route::get('{any}', [FrontController::class, 'index'])->where('any','.*');




