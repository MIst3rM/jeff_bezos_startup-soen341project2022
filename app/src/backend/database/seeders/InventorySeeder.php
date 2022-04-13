<?php

namespace Database\Seeders;

use App\Models\Inventory;
use Illuminate\Database\Seeder;

class InventorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        for ($i = 1; $i < 21; $i++) {
            Inventory::create([
                'item_id' => $i,
                'seller_id' => 1,
                'quantity' => rand(1, 10),
            ]);
        }
    }
}