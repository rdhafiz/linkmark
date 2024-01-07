<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;

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

// Authentication Route Group
Route::group(['prefix' => 'auth'], function () {
    // User Login: Handles user login through a POST request to '/auth/login'. Invokes 'login' method in 'AuthController'.
    Route::post('login', [AuthController::class, 'login']);
    // Forgot Password: Handles forgot password requests through a POST request to '/auth/forgot/password'. Invokes 'forgotPassword' method in 'AuthController'.
    Route::post('forgot/password', [AuthController::class, 'forgotPassword']);
    // Reset Password: Handles password reset through a POST request to '/auth/reset/password'. Invokes 'resetPassword' method in 'AuthController'.
    Route::post('reset/password', [AuthController::class, 'resetPassword']);
});

// Profile Route Group with 'auth:api' Middleware
//Route::group(['prefix' => 'profile', 'middleware' => ['auth:api']], function () {
//    // Logout: Handles user logout through a GET request to '/profile/logout'. Invokes 'logout' method in 'AuthController'.
//    Route::get('logout', [AuthController::class, 'logout']);
//    // Get Profile: Retrieves user profile information through a GET request to '/profile/get'. Invokes 'get' method in 'ProfileController'.
//    Route::get('get', [ProfileController::class, 'get']);
//    // Update Profile: Handles user profile updates through a POST request to '/profile/update'. Invokes 'update' method in 'ProfileController'.
//    Route::post('update', [ProfileController::class, 'update']);
//    // Update Password: Handles password updates through a POST request to '/profile/update/password'. Invokes 'updatePassword' method in 'ProfileController'.
//    Route::post('update/password', [ProfileController::class, 'updatePassword']);
//});
