<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Pedido_Imagem extends Model
{
    use HasFactory;

    protected $fillable = [
        'pedido_id',
        'imagem',
        'capa',
    ];

    public function pedido(): BelongsTo 
    {
        return $this->belongsTo(Pedido::class);
    }
}
