<?php

namespace App\Services\Auth;

use App\Constants\UserLogType;
use App\Constants\UserType;
use App\Helpers\Helpers;
use App\Models\Companies;
use App\Models\User;
use App\Repositories\CompaniesRepository;
use App\Repositories\ProfileRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Validator;
use Laravel\Passport\TokenRepository;

class Profile
{
    /**
     * Retrieves user data based on the session user's ID.
     *
     * This method takes a request object, extracts the session user's ID from the request data,
     * and retrieves user data using the 'ProfileRepository::get' method. It also fetches company
     * information for company-type users. The method returns an array containing the status and
     * user data, including company information if applicable.
     *
     * @param Request $request The HTTP request object containing the session user information.
     *
     * @return array An array containing the status and user data, including company information if applicable.
     */
    public static function get($request): array
    {
        try {
            // Extracting all data from the request
            $requestData = $request->all();

            // Extracting the session user from the request data
            $sessionUser = $requestData['session_user'];

            // Retrieving user data based on the session user's ID
            $userData = ProfileRepository::get($sessionUser['id']);

            // Returning an error response if the user data is not found
            if (!$userData instanceof User) {
                return ['status' => 500, 'message' => 'Cannot find user'];
            }

            // Fetching company information for company-type users
            if ($userData['user_type'] == UserType::Company) {
                $companyData = CompaniesRepository::get($userData['company_id']);

                // Returning an error response if the company data is not found
                if (!$companyData instanceof Companies) {
                    return ['status' => 500, 'message' => 'Cannot find company'];
                }

                // Adding company information to the user data
                $userData['company_info'] = $companyData;
            }

            // Returning a success response with the user data
            return ['status' => 200, 'data' => $userData];
        } catch (\Exception $exception) {
            // Returning an error response for exceptions
            return ['status' => 500, 'message' => $exception->getMessage(), 'error_code' => $exception->getCode(), 'code_line' => $exception->getLine()];
        }
    }

    /**
     * Update user profile based on the provided request data.
     *
     * This function handles the updating of user profiles, including validation, checking email uniqueness,
     * updating user data, uploading avatars, handling company-type users, and logging user activities.
     *
     * @param Request $request The HTTP request containing user data.
     * @return array An array indicating the status of the profile update.
     */
    public static function update($request): array
    {
        try {
            // Extracting all data from the request
            $requestData = $request->all();

            // Validating the incoming data using the specified rules
            $validator = Validator::make($requestData, [
                'first_name' => 'required|string',
                'last_name' => 'nullable|string',
                'email' => 'required|email',
                'user_type' => 'required|integer',
                'company_name' => 'required_if:user_type,2',
                'company_size' => 'required_if:user_type,2',
                'company_address' => 'required_if:user_type,2',
                'company_city' => 'required_if:user_type,2',
                'company_country' => 'required_if:user_type,2',
            ]);

            // Returning validation errors if present
            if ($validator->fails()) {
                return ['status' => 422, 'errors' => $validator->errors()];
            }

            // Checking if the email is already taken by another user
            $user = User::where('email', $requestData['email'])
                ->where('id', '!=', $requestData['session_user']['id'])
                ->first();

            // Returning an error response if the email is already taken
            if ($user instanceof User) {
                return ['status' => 422, 'errors' => ['email' => ['Email already has been taken']]];
            }

            // Finding the user based on the session user's ID
            $user = User::find($requestData['session_user']['id']);

            // Returning an error response if the user is not found
            if (!$user instanceof User) {
                return ['status' => 500, 'message' => 'Cannot find user'];
            }

            // Creating an array with updated user data
            $userData = [
                'first_name' => $requestData['first_name'],
                'last_name' => $requestData['last_name'] ?? null,
                'email' => $requestData['email'],
                'phone' => $requestData['phone'] ?? null,
                'gender' => $requestData['gender'] ?? null,
                'address' => $requestData['address'] ?? null,
                'city' => $requestData['city'] ?? null,
                'country' => $requestData['country'] ?? null,
                'user_type' => $requestData['user_type'],
            ];

            // Uploading a new avatar file if provided in the request
            if ($request->file('avatar')) {
                Helpers::fileRemove($user, 'avatar');
                $userData['avatar'] = Helpers::fileUpload($request->file('avatar'));
            }

            // Updating the user's profile using the 'ProfileRepository::update' method
            $userInfo = ProfileRepository::update($user, $userData);

            // Returning an error response if the user profile update fails
            if (!$userInfo instanceof User) {
                return ['status' => 500, 'message' => 'Cannot update profile'];
            }

            // Handling updates for company-type users
            if ($userInfo['user_type'] == UserType::Company) {
                // Finding the company associated with the user
                $company = Companies::find($userInfo['company_id']);

                // Returning an error response if the company is not found
                if (!$company instanceof Companies) {
                    return ['status' => 500, 'message' => 'Cannot find company'];
                }

                // Creating an array with updated company data
                $companyData = [
                    'company_name' => $requestData['company_name'],
                    'company_size' => $requestData['company_size'],
                    'company_address' => $requestData['company_address'],
                    'company_city' => $requestData['company_city'],
                    'company_country' => $requestData['company_country'],
                ];

                // Uploading a new company logo file if provided in the request
                if ($request->file('company_logo')) {
                    Helpers::fileRemove($company, 'logo');
                    $companyData['company_logo'] = Helpers::fileUpload($request->file('company_logo'));
                }

                // Updating the company's profile using the 'CompaniesRepository::update' method
                $companyInfo = CompaniesRepository::update($company, $companyData);

                // Returning an error response if the company profile update fails
                if (!$companyInfo instanceof Companies) {
                    return ['status' => 500, 'message' => 'Cannot update company'];
                }
            }

            // Logging the user's profile update activity
            Helpers::saveUserActivity(
                $userInfo['id'],
                UserLogType::Update_profile,
                $requestData['session_user']['first_name'] . ' ' . $requestData['session_user']['last_name'] . ' updated profile'
            );

            // Returning a success response
            return ['status' => 200, 'message' => 'Profile updated successfully'];
        } catch (\Exception $exception) {
            // Returning an error response for any exceptions that occurred during the profile update process
            return [
                'status' => 500,
                'message' => $exception->getMessage(),
                'error_code' => $exception->getCode(),
                'code_line' => $exception->getLine(),
            ];
        }
    }

    /**
     * Update user password based on the provided request data.
     *
     * This function handles the updating of a user's password, including validation,
     * checking the correctness of the old password, and logging user activity.
     *
     * @param Request $request The HTTP request containing user data.
     * @return array An array indicating the status of the password update.
     */
    public static function updatePassword($request): array
    {
        try {
            // Extracting all data from the request
            $requestData = $request->all();

            // Validating the incoming data using the specified rules
            $validator = Validator::make($requestData, [
                'old_password' => 'required|string',
                'password' => 'required|confirmed',
            ]);

            // Returning validation errors if present
            if ($validator->fails()) {
                return ['status' => 422, 'errors' => $validator->errors()];
            }

            // Finding the user based on the session user's ID
            $user = User::find($requestData['session_user']['id']);

            // Returning an error response if the user is not found
            if (!$user instanceof User) {
                return ['status' => 500, 'message' => 'Cannot find user'];
            }

            // Checking if the old password matches the user's current password
            if (!Hash::check($requestData['old_password'], $user->password)) {
                return ['status' => 422, 'errors' => ['old_password' => ['Current password does not match']]];
            }

            // Updating the user's password
            $user->password = bcrypt($requestData['password']);

            // Saving the updated password
            if (!$user->save()) {
                return ['status' => 500, 'message' => 'Cannot update password'];
            }

            // Logging the user's password change activity
            Helpers::saveUserActivity(
                $user['id'],
                UserLogType::Change_password,
                $requestData['session_user']['first_name'] . ' ' . $requestData['session_user']['last_name'] . ' changed password'
            );

            // Returning a success response
            return ['status' => 200, 'message' => 'Password updated successfully'];
        } catch (\Exception $exception) {
            // Returning an error response for any exceptions that occurred during the password update process
            return [
                'status' => 500,
                'message' => $exception->getMessage(),
                'error_code' => $exception->getCode(),
                'code_line' => $exception->getLine(),
            ];
        }
    }


    /**
     * Initiates the password reset process.
     *
     * This method validates the provided email, generates a reset code, associates it with
     * the user, and sends a password reset email. It returns an array containing the status
     * and relevant messages or errors related to the password reset operation.
     *
     * @param mixed $request The request object or array containing the email for password reset.
     *
     * @return array An array containing the status and relevant messages or errors for the password reset operation.
     */
    public static function forgotPassword($request): array
    {
        try {
            // Extracting all data from the request
            $requestData = $request->all();

            // Validating the request data using Laravel Validator
            $validator = Validator::make($requestData, [
                'email' => 'required|email',
            ]);

            // Checking if validation fails
            if ($validator->fails()) {
                // Returning validation errors if any
                return ['status' => 500, 'errors' => $validator->errors()];
            }

            // Retrieving user information based on the provided email
            $userInfo = User::where('email', $requestData['email'])->first();

            // Returning an error response if the user is not found
            if (!$userInfo instanceof User) {
                return ['status' => 500, 'errors' => ['email' => ['Invalid Email']]];
            }

            // Generating a random reset code
            $resetCode = rand(100000, 999999);

            // Associating the reset code with the user
            $userInfo->reset_code = $resetCode;

            // Saving the updated user information with the reset code
            if (!$userInfo->save()) {
                return ['status' => 500, 'message' => 'Cannot set reset code'];
            }

            // Composing and sending the password reset email
            Mail::send('email.reset_code', ['userInfo' => $userInfo], function ($message) use ($userInfo) {
                $message->to($userInfo['email'], $userInfo['first_name'] . ' ' . $userInfo['last_name'] ?? '')->subject(env('APP_NAME') . ': Password Reset code');
                $message->from(env('MAIL_FROM_ADDRESS'), env('MAIL_FROM_NAME'));
            });

            // Returning a success response with a confirmation message
            return ['status' => 200, 'message' => 'A reset code has been sent to your email'];
        } catch (\Exception $exception) {
            // Returning an error response for exceptions
            return ['status' => 500, 'message' => $exception->getMessage(), 'error_code' => $exception->getCode(), 'code_line' => $exception->getLine()];
        }
    }

    /**
     * Resets the user's password using a provided reset code.
     *
     * This method validates the provided email, reset code, and new password. If the validation
     * is successful, it retrieves the user based on the email and reset code, updates the password,
     * clears the reset code, and logs the password reset activity. It returns an array containing
     * the status and relevant messages or errors related to the password reset operation.
     *
     * @param Request $request The HTTP request object containing email, reset code, and new password.
     *
     * @return array An array containing the status and relevant messages or errors for the password reset operation.
     */
    public static function resetPassword(Request $request): array
    {
        try {
            // Extracting all data from the request
            $requestData = $request->all();

            // Validating the request data using Laravel Validator
            $validator = Validator::make($requestData, [
                'email' => 'required|email',
                'reset_code' => 'required|string',
                'password' => 'required|confirmed',
            ]);

            // Checking if validation fails
            if ($validator->fails()) {
                // Returning validation errors if any
                return ['status' => 500, 'errors' => $validator->errors()];
            }

            // Retrieving user information based on the provided email and reset code
            $userInfo = User::where('email', $requestData['email'])->where('reset_code', $requestData['reset_code'])->first();

            // Returning an error response if the user is not found or reset code is invalid
            if (!$userInfo instanceof User) {
                return ['status' => 500, 'errors' => ['reset_code' => ['Invalid reset code']]];
            }

            // Clearing the reset code and updating the password with the new hashed password
            $userInfo->reset_code = null;
            $userInfo->password = bcrypt($requestData['password']);

            // Saving the updated user information with the cleared reset code and new password
            if (!$userInfo->save()) {
                return ['status' => 500, 'message' => 'Cannot reset password'];
            }

            // Logging the user activity for password reset
            Helpers::saveUserActivity($userInfo['id'], UserLogType::Reset_password, $userInfo['first_name'] . ' ' . $userInfo['first_name'] . ' reset his password');

            // Returning a success response with a confirmation message
            return ['status' => 200, 'message' => 'Password reset successful'];
        } catch (\Exception $exception) {
            // Returning an error response for exceptions
            return ['status' => 500, 'message' => $exception->getMessage(), 'error_code' => $exception->getCode(), 'code_line' => $exception->getLine()];
        }
    }

    /**
     * Logs out the user, revoking the access token and recording the logout activity.
     *
     * This method takes an access token, revokes it using the TokenRepository, and records the
     * user's logout activity. It returns an array containing the status and a logout success message.
     *
     * @param Request $request The HTTP request object containing the access token and session user information.
     *
     * @return array An array containing the status and a message indicating the success of the logout operation.
     */
    public static function logout(Request $request): array
    {
        // Extracting the OAuth token from the request
        $oauth_token = $request->get('oauth_token');

        // Obtaining the TokenRepository instance
        $token_repository = app(TokenRepository::class);

        // Revoking the access token using the TokenRepository
        $token_repository->revokeAccessToken($oauth_token->id);

        // Extracting user information from the session
        $userInfo = $request->get('session_user');

        // Saving the user activity for logout
        Helpers::saveUserActivity($request->session_user->id, UserLogType::Logout, $userInfo['first_name'] . ' ' . $userInfo['first_name'] . ' logged out');

        // Returning a success response with a logout success message
        return ['status' => 200, 'message' => 'Logout Success'];
    }
}
