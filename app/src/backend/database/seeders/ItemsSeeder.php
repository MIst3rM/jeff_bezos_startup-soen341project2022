<?php

namespace Database\Seeders;

use App\Models\Items;
use Illuminate\Support\Facades\Http;
use Illuminate\Database\Seeder;

class ItemsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $products = Http::get('https://fakestoreapi.com/products')->json();
        $i = 1;
        foreach ($products as $product) {
            Items::create([
                'seller_id' => $i % 2 == 0 ? 3 : 2,
                'category' => $product['category'],
                'title' => $product['title'],
                'description' => $product['description'],
                'price' => $product['price'],
                'image' => $product['image']
            ]);
            $i++;
        }
    }
}