<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Log;

class UserController extends Controller
{
    function updateUser(Request $request)
    {
        $newUser = $request->input('updatedUser');
        Log::debug($newUser['id']);
        $user = User::where('id', $newUser['id'])->first();
        Log::debug($user);
        $user->firstname = $newUser['firstname'];
        $user->lastname = $newUser['lastname'];
        $user->email = $newUser['email'];
        $user->save();
        $user->refresh();
        return response('User updated', 200)->header('Content-Type', 'text/plain');
    }
}
