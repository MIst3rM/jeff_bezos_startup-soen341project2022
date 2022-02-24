<?php

namespace App\Models;

use App\Models\Items;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SalesItems extends Model
{
    use HasFactory;

    protected $fillable = [
        'invoice_id',
        'seller_id',
        'item_id',
        'quantity',
        'total_price',
    ];

    public function invoice()
    {
        return $this->belongsTo(Sales::class);
    }

    public function seller()
    {
        return $this->belongsTo(User::class, 'seller_id');
    }

    public function item()
    {
        return $this->belongsTo(Items::class);
    }
}
