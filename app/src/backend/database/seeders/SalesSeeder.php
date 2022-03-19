<?php

namespace Database\Seeders;

use App\Models\Sales;
use App\Models\Items;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Arr;

class SalesSeeder extends Seeder
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
            Sales::create([
                'seller_id' => 1,
                'customer_id' => $sale['userId'],
                'payment_method' => Arr::random(['credit_card', 'debit_card', 'paypal', 'bitcoin'], 1)[0],
                'total_price' => $this->total($sale),
            ]);
        }
    }

    public function total($sale){
        $total = 0.00;
        foreach ($sale['products'] as $product) {
            $total += $product['quantity'] * Items::where('id', $product['productId'])->first()->price;
        }
        return $total;
    }
}