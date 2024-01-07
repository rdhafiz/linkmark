<?php

namespace App\Http\Controllers;

use App\Services\Auth\Login;
use App\Services\Auth\Profile;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    /**
     * Handles the login endpoint.
     *
     * This function invokes the static 'make' method of the 'Login' class to process
     * the user login request and then returns a JSON response based on the result.
     *
     * @param Request $request The HTTP request object containing user login details.
     *
     * @return JsonResponse A JSON response containing the result of the login attempt.
     */
    public function login(Request $request): JsonResponse
    {
        $rv = Login::make($request);
        return response()->json($rv, 200);
    }


    /**
     * Handles the forgot password endpoint.
     *
     * This function invokes the static 'forgotPassword' method of the 'Profile' class to initiate
     * the password reset process based on the provided email. It then returns a JSON response based
     * on the result of the password reset operation.
     *
     * @param Request $request The HTTP request object containing the email for password reset.
     *
     * @return JsonResponse A JSON response containing the result of the password reset operation.
     */
    public function forgotPassword(Request $request): JsonResponse
    {
        $rv = Profile::forgotPassword($request);
        return response()->json($rv, 200);
    }

    /**
     * Handles the reset password endpoint.
     *
     * This function invokes the static 'resetPassword' method of the 'Profile' class to reset
     * the user's password based on the provided email, reset code, and new password. It then
     * returns a JSON response based on the result of the password reset operation.
     *
     * @param Request $request The HTTP request object containing email, reset code, and new password.
     *
     * @return JsonResponse A JSON response containing the result of the password reset operation.
     */
    public function resetPassword(Request $request): JsonResponse
    {
        $rv = Profile::resetPassword($request);
        return response()->json($rv, 200);
    }

    /**
     * Handles the logout endpoint.
     *
     * This function invokes the static 'logout' method of the 'Profile' class to log out the user.
     * It revokes the access token, records the user's logout activity, and returns a JSON response
     * based on the result of the logout operation.
     *
     * @param Request $request The HTTP request object containing the access token and session user information.
     *
     * @return JsonResponse A JSON response containing the result of the logout operation.
     */
    public function logout(Request $request): JsonResponse
    {
        $rv = Profile::logout($request);
        return response()->json($rv, 200);
    }

}
