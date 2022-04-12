<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Inventory extends Model
{
    use HasFactory;

    protected $table = 'inventory';

    protected $fillable = [
        'item_id',
        'seller_id',
        'quantity',
    ];

    public function item()
    {
        return $this->belongsTo(Items::class, 'item_id', 'id');
    }
}