<?php

namespace App\Http\Middleware;

use Closure;
use App\Models\User;
use Illuminate\Auth\Middleware\Authenticate as Middleware;
use Laravel\Passport\TokenRepository;
use League\OAuth2\Server\Exception\OAuthServerException;
use League\OAuth2\Server\ResourceServer;
use Nyholm\Psr7\Factory\Psr17Factory;
use Symfony\Bridge\PsrHttpMessage\Factory\PsrHttpFactory;

class Authenticate extends Middleware
{
    protected $server;
    protected $repository;
    public function __construct(ResourceServer $server, TokenRepository $repository)
    {
        $this->server = $server;
        $this->repository = $repository;
    }

    public function handle($request, Closure $next, ...$guards)
    {
        $authorization = $request->hasHeader('Authorization');
        if(!$authorization){
            $xAuthorization = $request->header('X-Authorization');
            $request->headers->set('Authorization', $xAuthorization);
        }
        $psr = (new PsrHttpFactory(
            new Psr17Factory,
            new Psr17Factory,
            new Psr17Factory,
            new Psr17Factory
        ))->createRequest($request);
        try {
            $psr = $this->server->validateAuthenticatedRequest($psr);
            $token = $this->repository->find(
                $psr->getAttribute('oauth_access_token_id')
            );
            $currentDate = new \DateTime();
            $tokenExpireDate = new \DateTime($token->expires_at);
            $isAuthenticated = $tokenExpireDate > $currentDate ? true : false;
            if ($isAuthenticated == true) {
                $oauthUser = $this->repository->findForUser($token->id, $token->user_id);
                $oauth_token = $token->loadMissing('client');
                $user = User::find($oauthUser->user_id);
                $request->request->add(['oauth_token' => $oauth_token]);
                $request->request->add(['session_user' => $user]);
                $request->query->add(['session_user' => $user]);
                return $next($request);
            }
            return response()->json(['status' => 401, 'message' => 'Token has been expired!'],401);
        } catch (OAuthServerException $e) {
            return response()->json(['status' => 401, 'message' => 'Invalid Token!'],401);
        }
    }
}
