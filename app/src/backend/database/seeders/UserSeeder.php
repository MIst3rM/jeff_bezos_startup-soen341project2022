<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Support\Facades\Http;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $users = Http::get('https://fakestoreapi.com/users')->json();
        foreach ($users as $user) {
            User::create([
                'firstname' => $user['name']['firstname'],
                'lastname' => $user['name']['lastname'],
                'email' => $user['email'],
                'password' => Hash::make($user['password']),
                'role' => 'customer',
                'address_line1' => $user['address']['number'] . ' ' . $user['address']['street'],
                'address_line2' => 'N/A',
                'city' => $user['address']['city'],
                'province_state' => 'N/A',
                'postal_code_zip' => $user['address']['zipcode'],
                'country' => 'United States',
                'phone' => $user['phone'],
            ]);
        }
    }
}