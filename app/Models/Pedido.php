<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Date;
use Illuminate\Support\Facades\DB;

class Pedido extends Model
{
    use HasFactory;
    public static function createPedido($user, $total){
        $pedidoId = DB::table('pedido')->insertGetId([
            'idUser' => $user,
            'total' => $total->total,
            'fechaPedido' => new \DateTime()
        ]);
        return $pedidoId;
    }

    public static function passCarritoToPedido($lineasCarrito, $pedido){
        foreach ($lineasCarrito as $c){
            $producto = DB::table('productos')->where('idProducto', $c->idProducto)->first();

            if($producto->stock - $c->cantidad > 0){
                DB::table('lineapedido')->insert([
                    'idPedido' => $pedido,
                    'idProducto' => $c->idProducto,
                    'precio' => $c->precio,
                    'cantidad' => $c->cantidad,
                ]);
                DB::table('productos')->where('idProducto', $c->idProducto)->update(['stock' => $producto->stock - $c->cantidad]);
            }else{
                DB::table('lineapedido')->insert([
                    'idPedido' => $pedido,
                    'idProducto' => $c->idProducto,
                    'precio' => $c->precio,
                    'cantidad' => $c->stock,
                ]);
                DB::table('productos')->where('idProducto', $c->idProducto)->update(['stock' => 0]);
            }
        }

    }

    public static function getPedidos($idUser){
        return DB::table('pedido')->where('idUser', $idUser)->get();
    }

    public static function getLineasPedido($idPedido){
        return DB::table('lineapedido')->join('productos', 'lineapedido.idProducto', 'productos.idProducto')
            ->where('idPedido', $idPedido)->get();
    }
}
