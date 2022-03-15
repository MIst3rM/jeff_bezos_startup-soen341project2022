<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Items;
use Illuminate\Support\Facades\Log;

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
				return redirect('insert')->with('status', "Insert successfully");
			}
			catch(Exception $e){
				return redirect('insert')->with('failed', "operation failed");
			}
    
    }
}