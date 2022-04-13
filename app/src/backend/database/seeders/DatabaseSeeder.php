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
            'firstname' => 'MI5t3r',
            'lastname' => 'M',
            'email' => 'MI5t3r_M@gmail.com',
            'password' => Hash::make('Password_123'),
            'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
            'role' => 'admin',
        ]);

        DB::table('users')->insert([
            'firstname' => 'Agent',
            'lastname' => 'Smith',
            'email' => 'agent_smith@seller.conco',
            'password' => Hash::make('Password_123'),
            'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
            'role' => 'seller',
        ]);

        DB::table('users')->insert([
            'firstname' => 'Thomas',
            'lastname' => 'Anderson',
            'email' => 'neo@seller.conco',
            'password' => Hash::make('Password_123'),
            'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
            'role' => 'seller',
        ]);

        $this->call([
            UserSeeder::class,
            ItemsSeeder::class,
            SalesSeeder::class,
            SalesItemsSeeder::class,
            InventorySeeder::class,
        ]);
    }
}