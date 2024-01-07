<?php

namespace App\Services\Auth;

use App\Models\User;
use App\Repositories\AuthRepository;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class Login
{
    /**
     * Static method for user authentication.
     *
     * This method takes a request, validates user login credentials, checks for account activation,
     * and returns an array with the status and relevant data or error messages.
     *
     * @param mixed $request The request object or array containing user input.
     *
     * @return array An array containing the status and relevant data or error messages.
     */
    public static function make($request): array
    {
        try {
            // Extracting all data from the request
            $requestData = $request->all();

            // Validating the request data using Laravel Validator
            $validator = Validator::make($requestData, [
                'email' => 'required|email',
                'password' => 'required'
            ]);

            // Checking if validation fails
            if ($validator->fails()) {
                // Returning validation errors if any
                return ['status' => 500, 'errors' => $validator->errors()];
            }

            // Retrieving user information based on the provided email
            $userInfo = User::where('email', $requestData['email'])->first();

            // Checking if a valid user object is retrieved
            if (!$userInfo instanceof User) {
                // Returning an error response for invalid credentials
                return ['status' => 500, 'errors' => ['email' => ['Invalid credential! Please try again']]];
            }

            // Checking if the provided password matches the stored hashed password
            if (Hash::check($requestData['password'], $userInfo->password)) {

                // Generating and returning an access token upon successful social login
                $access_token = $userInfo->createToken('authToken')->accessToken;

                // Returning success response with access token and user data
                return ['status' => 200, 'access_token' => $access_token, 'user' => User::parseData($userInfo)];
            }

            // Returning an error response if the password is incorrect
            return ['status' => 500, 'errors' => ['password' => ['Password is not correct! Please try again.']]];
        } catch (\Exception $exception) {
            // Handling exceptions and returning an error response
            return ['status' => 500, 'message' => $exception->getMessage(), 'error_code' => $exception->getCode()];
        }
    }

}
