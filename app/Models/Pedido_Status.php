<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Pedido_Status extends Model
{
    use HasFactory;

    public function pedido(): BelongsTo 
    {
        return $this->belongsTo(Pedido::class);
    }
}
