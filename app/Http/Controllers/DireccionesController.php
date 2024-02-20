<?php

namespace App\Http\Controllers;

use App\Models\Direccion;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class DireccionesController extends Controller
{
    public function addDirecciones(Request $request){
        $user = Auth::user();
        $direccion = array(
            'idUser' => $user->id,
            'direccion' => $request->direccion,
            'ciudad' => $request->ciudad,
            'pais' => $request->pais,
            'codigo_postal' => $request->cp
        );

        Direccion::saveDireccion($direccion);
        return response()->json([
            'status' => true,
            'message' => 'Direccion añadida correctamente',
            'direccion' => $direccion,
        ], 400);
    }
}
