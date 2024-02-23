<?php

namespace App\Http\Controllers;

use App\Mail\MailPedido;
use App\Models\Carrito;
use App\Models\Pedido;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;

class PedidoController extends Controller
{
    public function doCompra(){
        $user = Auth::user();
        $carrito =  Carrito::getCarritoInfo($user->id);
        $carritoContenido = Carrito::getCarrito($carrito->idCarrito);

        $total = Carrito::obtenerTotal($carrito->idCarrito);
        $pedidoId = Pedido::createPedido($user->id, $total);
        $lineasPedido = Pedido::passCarritoToPedido($carritoContenido, $pedidoId);
        Carrito::deleteCarrito($user->id);

        $pedido = Pedido::getPedido($pedidoId);
        //Mail::to($user->email)->send(new MailPedido($pedido, $lineasPedido));

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
