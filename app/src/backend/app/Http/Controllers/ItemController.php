<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Items;
use Illuminate\Support\Facades\Log;
use Exception;

class ItemController extends Controller
{
    function addItem(Request $request)
    {  
        $data = $request->input();
			try{
				$item = new Items;
                $item->sellerid = $data['seller_id'];
                $item->title = $data['title'];
				$item->description = $data['description'];
                $item->category = $data['category'];
                $item->image = $data['image'];
				$item->price = $data['price'];
				$item->save();
                return response('Item added', 200)->header('Content-Type', 'text/plain'); 
			}
			catch(Exception $e){
				return response('Item could not be added', 500)->header('Content-Type', 'text/plain'); 
			}
    
    }
}