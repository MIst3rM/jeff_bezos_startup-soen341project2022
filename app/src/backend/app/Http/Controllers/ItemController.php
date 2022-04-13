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
            broadcast(new \App\Events\AddedItem(Items::all()));
            return response('Item added', 200)->header('Content-Type', 'text/plain');
        } catch (Exception $e) {
            return response('Item could not be added', 500)->header('Content-Type', 'text/plain');
        }
    }

    function updateItem(Request $request)
    {
        $newItem = $request->input('updatedItem');
        $item = Items::where('id', $newItem['id'])->first();
        $item->title = $newItem['title'];
        $item->image = $newItem['image'];
        $item->description = $newItem['description'];
        $item->category = $newItem['category'];
        $item->price = $newItem['price'];
        $item->save();
        $item->refresh();
        broadcast(new \App\Events\UpdatedItem($item));
        return response()->json([
            'id' => $item->id,
            'title' => $item->title,
            'image' => $item->image,
            'description' => $item->description,
            'category' => $item->category,
            'price' => $item->price,
            'successMsg' => 'Item updated',
        ]);
    }
    public function destroy($id)
    {
        try {
            $item = Items::find($id);
            broadcast(new \App\Events\DeletedItem($item));
            $item->delete();
            return response('Item deleted', 200)->header('Content-Type', 'text/plain');
        } catch (Exception $e) {
            return response('Item could not be deleted', 500)->header('Content-Type', 'text/plain');
        }
    }
}