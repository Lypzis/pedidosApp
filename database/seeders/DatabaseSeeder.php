<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Pedido_Status;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // yep, this is repeating, come back here later on
        Pedido_Status::factory()->create([
            'descricao' => 'Solicitado',
        ]);

        Pedido_Status::factory()->create([
            'descricao' => 'Concluído',
        ]);

        Pedido_Status::factory()->create([
            'descricao' => 'Cancelado',
        ]);
    }
}
