<?php

namespace App\Http\Controllers;

use App\Models\Pedido;
use App\Models\Cliente;
use App\Models\Pedido_Status;
use App\Models\Pedido_Imagem;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class PedidoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index():  Response
    {
        return Inertia::render('Pedidos/Index', [
            'pedidos' => Pedido::latest()->get(),
            'clientes' => Cliente::all(),
            'pedido__statuses' => Pedido_Status::all(),
            'pedido_imagem' => Pedido_Imagem::all(),
        ]);
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
            'produto' => 'required|string|max:255',
            'valor' => 'required|numeric|min:0',
            'data' => 'required',
            'cliente_id' => 'required|integer',
            'pedido__statuses_id' => 'required|integer',
            'ativo' => 'required|integer|min:1',
        ]);
 
        $pedido = new Pedido();

        $pedido->create($validated);
 
        return redirect(route('pedidos.index'));
    }

    /**
     * Display the specified resource.
     */
    public function show(Pedido $pedido)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Pedido $pedido)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Pedido $pedido)
    {
        $validated = $request->validate([
            'produto' => 'required|string|max:255',
            'valor' => 'required|numeric|min:0',
            'data' => 'required',
            'cliente_id' => 'required|integer',
            'pedido__statuses_id' => 'required|integer',
            'ativo' => 'required|integer|min:1',
        ]);

        $pedido->update($validated);

        return redirect(route('pedidos.index'));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Pedido $pedido)
    {
        $pedido->delete();

        return redirect(route('pedidos.index'));
    }
}
