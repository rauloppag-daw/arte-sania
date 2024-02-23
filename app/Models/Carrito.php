<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class Carrito extends Model
{
    use HasFactory;

    protected $primaryKey = 'idCarrito';
    public $timestamps = false;

    public static function createCarrito($idUser)
    {
        $carrito = DB::table('carrito')->insertGetId(['idUser' => $idUser]);
        return $carrito;
    }

    public static function addProductoToCarrito($lineaCarrito)
    {
        DB::table('lineaCarrito')->insert($lineaCarrito);
    }

    public static function getCarritoInfo($idUser)
    {
        return DB::table('carrito')->select('idCarrito')->where('idUser', $idUser)->first();
    }

    public static function getCarrito($id)
    {
        $carrito = DB::table('lineacarrito as l')
            ->select('p.idProducto', 'l.idLinea', 'p.nombreProducto', 'l.cantidad', 'p.precio', 'p.stock', DB::raw('SUM(p.precio * l.cantidad) as subtotal'))
            ->join('productos as p', 'l.idProducto', 'p.idProducto')
            ->where('idCarrito', $id)
            ->groupBy('p.idProducto', 'p.nombreProducto', 'l.cantidad', 'p.precio', 'l.idLinea', 'p.stock')
            ->get();
        return $carrito;
    }

    public static function quitarLinea($idLinea)
    {
        DB::table('lineacarrito')->where('idLinea', $idLinea)->delete();
    }

    public static function deleteCarrito($idUser)
    {
        $idCarrito = DB::table('carrito')->select('idCarrito')->where('idUser', $idUser)->first();
        DB::table('lineacarrito')->where('idCarrito', $idCarrito->idCarrito);
        DB::table('carrito')->where('idUser', $idUser)->delete();

    }

    public static function obtenerTotal($id)
    {
        $total = DB::table('lineacarrito as l')
            ->select(Db::raw('SUM(p.precio * l.cantidad) as total'))
            ->join('productos as p', 'l.idProducto', 'p.idProducto')
            ->where('idCarrito', $id)
            ->first();
        return $total;
    }

    public static function cambiarCarrito($idCarrito, $idUser, $eliminarOtros)
    {
        if ($eliminarOtros) {
            DB::table('carrito')->where('idUser', $idUser)->delete();
        }

        DB::table('carrito')->where('idCarrito', $idCarrito)->update(['idUser' => $idUser]);
    }

    public static function checkAddProducto($idProducto, $idCarrito, $cantidad)
    {
        $cantidadActual = Db::table('lineacarrito')->select('cantidad')->where('idProducto', $idProducto)->where('idCarrito', $idCarrito)->first();

        if ($cantidadActual == null) {
            return false;
        } else {
            DB::table('lineacarrito')->where('idProducto', $idProducto)->where('idCarrito', $idCarrito)->update(['cantidad' => $cantidadActual->cantidad + $cantidad]);
            return true;
        }
    }
}
