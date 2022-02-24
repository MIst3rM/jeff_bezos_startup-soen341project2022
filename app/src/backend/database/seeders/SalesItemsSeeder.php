<?php

namespace Database\Seeders;

use App\Models\Items;
use App\Models\SalesItems;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Http;

class SalesItemsSeeder extends Seeder
{

    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $sales = Http::get('https://fakestoreapi.com/carts')->json();
        foreach ($sales as $sale) {
            foreach ($sale['products'] as $product) {
                SalesItems::create([
                    'invoice_id' => $sale['id'],
                    'seller_id' => 1,
                    'item_id' => $product['productId'],
                    'quantity' => $product['quantity'],
                    'total_price' => $this->total($product),
                ]);
            }
        }
    }

    public function total($product)
    {
        return $product['quantity'] * Items::where('id', $product['productId'])->first()->price;
    }
}