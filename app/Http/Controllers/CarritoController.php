<?php

namespace App\Http\Controllers;

use App\Models\Carrito;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CarritoController extends Controller
{
    public function addProductToCarrito(Request $request){
        //dd();

        $idProducto = $request->idProducto;
        $cantidad = $request->cantidad;

        //para el carrito
        $idUser = null;

        $lineaCarrito = array(
            'idProducto' => $idProducto,
            'cantidad' => $cantidad
        );

        if(isset($request->tokenCarrito)){

            $tokenCarrito =  $request->tokenCarrito;
            $lineaCarrito['idCarrito'] = $request->tokenCarrito;

        }else{

            $idUser = auth('sanctum')->user()->id;
            $tokenCarrito = $this->createCarrito($idUser);
            $lineaCarrito['idCarrito'] =  $tokenCarrito;
        }

        if(!Carrito::checkAddProducto($idProducto, $tokenCarrito, $cantidad)){
            Carrito::addProductoToCarrito($lineaCarrito);
        }

        return response()->json([
            'idCarrito' => $tokenCarrito,
            'idUser' => $idUser
        ]);
    }

    public function getCarrito($id){
        $carrito = Carrito::getCarrito($id);
        $total = Carrito::obtenerTotal($id);

        return response()->json([
            'carrito' => $carrito,
            'total' => $total->total
        ]);
    }

    public function createCarrito($idUser){
        return Carrito::createCarrito($idUser);
    }
}
