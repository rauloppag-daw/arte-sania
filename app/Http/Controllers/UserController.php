<?php

namespace App\Http\Controllers;

use App\Models\Carrito;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    public function obtenerUsuario(Request $request){
        $user = Auth::user();

        $userData = array(
            'email' => $user->email,
            'nombre' => $user->name,
            'imgProfile' => asset('storage/imgProducts/notFound.jpg')
        );

        $carrito = Carrito::getCarritoInfo($user->id);

        return response()->json([
           'user' => $userData,
            'carrito' => $carrito->idCarrito
        ]);
    }
}
