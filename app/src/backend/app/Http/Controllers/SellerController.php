<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Log;
use Illuminate\Database\Eloquent\Collection;
use Exception;

class SellerController extends Controller
{
    public function getSellerItems(Request $request)
    {
       $items = DB::table('items')->where('seller_id', $request->seller_id)->get();
       return response($items, 200)->header('Content-Type', 'text/plain');
    }
}