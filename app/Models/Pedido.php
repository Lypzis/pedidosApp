<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pedido extends Model
{
    use HasFactory;

    protected $fillable = [
        'produto',
        'valor',
        'data',
        'cliente_id',
        'pedido__statuses_id',
        'ativo',
    ];

}
