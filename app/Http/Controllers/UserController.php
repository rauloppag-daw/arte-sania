<?php

namespace App\Http\Controllers;

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

        return response()->json([
           'user' => $userData
        ]);


    }
}
