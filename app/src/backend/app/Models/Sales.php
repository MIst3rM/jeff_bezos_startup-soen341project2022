<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Sales extends Model
{
    use HasFactory;

    protected $fillable = [
        'customer_id',
        'payment_method',
        'total_price',
    ];

    public function sale_items()
    {
        return $this->hasMany(SalesItems::class, 'invoice_id', 'invoice_id');
    }
}