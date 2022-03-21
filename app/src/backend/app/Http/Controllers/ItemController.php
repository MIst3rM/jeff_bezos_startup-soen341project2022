<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Items;
use Illuminate\Support\Facades\Log;
use Exception;

class ItemController extends Controller
{
    public function store(Request $request)
    {
        try {
            $item = new Items;
            $item->seller_id = $request->seller_id;
            $item->title = $request->title;
            $item->description = $request->description;
            $item->category = $request->category;
            $item->image = $request->image;
            $item->price = $request->price;
            $item->save();
            return response('Item added', 200)->header('Content-Type', 'text/plain');
        } catch (Exception $e) {
            return response('Item could not be added', 500)->header('Content-Type', 'text/plain');
        }
    }
}