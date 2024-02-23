<?php

namespace App\Http\Controllers;

use App\Models\Carrito;
use App\Models\Pedido;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class PedidoController extends Controller
{
    public function doCompra(){
        $user = Auth::user();
        $carrito =  Carrito::getCarritoInfo($user->id);
        $carritoContenido = Carrito::getCarrito($carrito->idCarrito);

        $total = Carrito::obtenerTotal($carrito->idCarrito);
        $pedido = Pedido::createPedido($user->id, $total);
        Pedido::passCarritoToPedido($carritoContenido, $pedido);
        Carrito::deleteCarrito($user->id);

    }

    public function getPedidoConLineas(){
        $user = Auth::user();
        $pedidos = Pedido::getPedidos($user->id);
        $respuesta = array();

        foreach ($pedidos as $p){
            $lineas = Pedido::getLineasPedido($p->idPedido);
            array_push($respuesta, ['pedido' => $p, 'lineas' => $lineas]);
        }

        return response()->json([
            'pedidos' => $respuesta
        ]);
    }
}
