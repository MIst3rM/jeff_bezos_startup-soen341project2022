<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Sales;
use App\Models\Items;

class UserController extends Controller
{
    function updateUser(Request $request)
    {
        $newUser = $request->input('updatedUser');
        $user = User::where('id', $newUser['id'])->first();
        $user->firstname = $newUser['firstname'];
        $user->lastname = $newUser['lastname'];
        $user->email = $newUser['email'];
        $user->phone = $newUser['phone'];
        $user->save();
        $user->refresh();
        return response()->json([
            'id' => $user->id,
            'firstname' => $user->firstname,
            'lastname' => $user->lastname,
            'email' => $user->email,
            'phone' => $user->phone,
            'address1' => $user->address_line1,
            'address2' => $user->address_line2,
            'city' => $user->city,
            'province_state' => $user->province_state,
            'postal_code' => $user->postal_code_zip,
            'country' => $user->country,
        ]);
    }

    function updateAddress(Request $request)
    {
        $newUser = $request->input('updatedUser');
        $user = User::where('id', $newUser['id'])->first();
        $user->address_line1 = $newUser['address1'];
        $user->address_line2 = $newUser['address2'];
        $user->city = $newUser['city'];
        $user->province_state = $newUser['province_state'];
        $user->postal_code_zip = $newUser['postal_code'];
        $user->country = $newUser['country'];
        $user->save();
        $user->refresh();
        return response()->json([
            'id' => $user->id,
            'firstname' => $user->firstname,
            'lastname' => $user->lastname,
            'email' => $user->email,
            'phone' => $user->phone,
            'address1' => $user->address_line1,
            'address2' => $user->address_line2,
            'city' => $user->city,
            'province_state' => $user->province_state,
            'postal_code' => $user->postal_code_zip,
            'country' => $user->country,
        ]);
    }

    function userOrderHistory(Request $request)
    {
        $userId = $request->input('id');
        $orders = [];
        $orderItems = collect(new Items);
        $quantities = [];
        $invoices = Sales::where('customer_id', $userId)->get(['invoice_id', 'payment_method', 'total_price', 'created_at']);
        foreach ($invoices as $invoice) {
            $items = $invoice->sale_items()->get(['item_id', 'quantity']);

            foreach ($items as $item) {
                $orderItems->push($item->item()->first());
                array_push($quantities, $item->quantity);
            }
            array_push($orders, [
                'invoice' => $invoice,
                'items' => $orderItems,
                'quantities' => $quantities,
            ]);
            $orderItems = collect(new Items);
            $quantities = [];
        }
        return response()->json($orders);
    }
}