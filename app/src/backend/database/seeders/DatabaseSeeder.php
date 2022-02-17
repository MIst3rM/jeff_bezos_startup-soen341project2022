<?php

namespace Database\Seeders;

use Carbon\Carbon;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {

        DB::table('users')->insert([
            'name' => 'MI5t3r_M',
            'email' => 'MI5t3r_M' . '@gmail.com',
            'password' => Hash::make('password'),
            'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
            'role' => 'admin',
        ]);

        $this->call([
            ItemsSeeder::class,
        ]);
    }
}