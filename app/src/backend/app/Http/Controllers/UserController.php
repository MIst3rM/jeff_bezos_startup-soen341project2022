<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class UserController extends Controller
{
    function updateUser(Request $request)
    {
        $newUser = $request->input('updatedUser');
        $user = User::where('id', $newUser['id'])->first();
        $user->firstname = $newUser['firstname'];
        $user->lastname = $newUser['lastname'];
        $user->email = $newUser['email'];
        $user->save();
        $user->refresh();
        return response()->json([
            'id' => $user->id,
            'firstname' => $user->firstname,
            'lastname' => $user->lastname,
            'email' => $user->email,
            'phone' => $user->phone,
            'address1' => $user->address_line1,
            'address2' => $user->address_line2,
            'city' => $user->city,
            'province' => $user->province_state,
            'postal_code' => $user->postal_code_zip,
            'country' => $user->country,
        ]);
    }
}