<?php

namespace App\Http\Responses;

use Illuminate\Support\Facades\Auth;
use Laravel\Fortify\Contracts\LoginResponse as LoginResponseContract;
use Illuminate\Support\Facades\Log;

class LoginResponse implements LoginResponseContract
{

    public function toResponse($request)
    {

        Log::debug(Auth()->user());
        return $request->wantsJson()
            ? response()->json(['user' => [
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
            ]])
            : redirect()->intended(config('fortify.home'));
    }
}