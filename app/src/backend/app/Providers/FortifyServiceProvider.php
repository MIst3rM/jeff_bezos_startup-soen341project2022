<?php

namespace App\Providers;

use App\Actions\Fortify\CreateNewUser;
use App\Actions\Fortify\ResetUserPassword;
use App\Actions\Fortify\UpdateUserPassword;
use App\Actions\Fortify\UpdateUserProfileInformation;
use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\ServiceProvider;
use Laravel\Fortify\Fortify;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth;
use Laravel\Fortify\Contracts\LoginResponse;

class FortifyServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        $this->app->instance(LoginResponse::class, new class implements LoginResponse
        {
            public function toResponse($request)
            {
                return $request->wantsJson()
                    ? response()->json([
                        'id' => Auth::user()->id,
                        'firstname' => Auth::user()->firstname,
                        'lastname' => Auth::user()->lastname,
                        'email' => Auth::user()->email,
                        'phone' => Auth::user()->phone,
                        'address1' => Auth::user()->address_line1,
                        'address2' => Auth::user()->address_line2,
                        'city' => Auth::user()->city,
                        'province' => Auth::user()->province_state,
                        'postal_code' => Auth::user()->postal_code_zip,
                        'country' => Auth::user()->country,
                    ])
                    : redirect()->intended(config('fortify.home'));
            }
        });
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        Fortify::createUsersUsing(CreateNewUser::class);
        Fortify::updateUserProfileInformationUsing(UpdateUserProfileInformation::class);
        Fortify::updateUserPasswordsUsing(UpdateUserPassword::class);
        Fortify::resetUserPasswordsUsing(ResetUserPassword::class);
        Fortify::authenticateUsing(function (Request $request) {
            $user = User::where('email', $request->email)->first();
            if ($request->header('origin') === 'http://admin.store.conco') {
                if (
                    $user &&
                    in_array($user->role, ['admin', 'seller']) &&
                    Hash::check($request->password, $user->password)
                ) {
                    Log::debug(Auth::user());
                    return $user;
                }
            } else {
                if (
                    $user &&
                    Hash::check($request->password, $user->password)
                ) {
                    return $user;
                }
            }
        });

        RateLimiter::for('login', function (Request $request) {
            $email = (string) $request->email;

            return Limit::perMinute(5)->by($email . $request->ip());
        });

        RateLimiter::for('two-factor', function (Request $request) {
            return Limit::perMinute(5)->by($request->session()->get('login.id'));
        });
    }
}