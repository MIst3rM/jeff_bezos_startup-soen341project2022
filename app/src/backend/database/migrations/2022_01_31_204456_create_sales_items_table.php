<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSalesItemsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('sales_items', function (Blueprint $table) {
            $table->id();
            $table->foreignId('invoice_id')->constrained('sales', 'invoice_id')->onUpdate('cascade')->onDelete('cascade');
            $table->foreignId('seller_id')->constrained('users', 'id')->onUpdate('cascade')->onDelete('cascade');
            $table->foreignId('item_id')->constrained('items', 'id')->onUpdate('cascade')->onDelete('cascade');
            $table->integer('quantity');
            $table->decimal('total_price', 8, 2);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('sales_items');
    }
}