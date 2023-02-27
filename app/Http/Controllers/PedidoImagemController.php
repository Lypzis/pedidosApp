<?php

namespace App\Http\Controllers;

use App\Models\Pedido_Imagem;
use Illuminate\Http\Request;

class PedidoImagemController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'pedido_id' => 'required|integer',
            'imagem' => 'required|string|max:255',
            'capa' => 'required|string|max:255',
        ]);
 
        $pedidoImagem = new Pedido_Imagem();

        $pedidoImagem->create($validated);
 
        return redirect(route('pedidos.index'));
    }

    /**
     * Display the specified resource.
     */
    public function show(Pedido_Imagem $pedido_Imagem)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Pedido_Imagem $pedido_Imagem)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Pedido_Imagem $pedido_Imagem)
    {
        $validated = $request->validate([
            'pedido_id' => 'required|integer',
            'imagem' => 'required|string|max:255',
            'capa' => 'required|string|max:255',
        ]);

        $pedido_Imagem->update($validated);

        return redirect(route('pedidos.index'));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Pedido_Imagem $pedido_Imagem)
    {
        //
    }
}
