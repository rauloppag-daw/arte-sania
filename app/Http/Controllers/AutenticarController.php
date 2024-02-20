<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AutenticarController extends Controller
{
    /**
     * Registra un usuario
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function registrar(Request $request)
    {
        $rules = [
            'nombre' => 'required',
            'email' => 'required|email|unique:users',
            'password' => 'required'
        ];
        $validator = Validator::make($request->input(), $rules);

        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'errors' => $validator->errors()->all()
            ], 400);
        }

        $usuario = User::create([
            'email' => $request->email,
            'name' => $request->nombre,
            'password' => Hash::make($request->password)
        ]);

        return response()->json([
            'status' => true,
            'message' => 'El usuario se ha creadp correctamente',
            'token' => $usuario->createToken('API TOKEN')->plainTextToken
        ], 200);
    }

    /**
     * Loguea un usuario
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function login(Request $request)
    {
        $rules = [
            'email' => 'required|email',
            'password' => 'required'
        ];
        $validator = Validator::make($request->input(), $rules);

        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'errors' => $validator->errors()->all()
            ], 400);
        }

        if (!Auth::attempt($request->only('email', 'password'))) {
            return response()->json([
                'status' => false,
                'message' => 'No autorizado'
            ], 401);
        }

        $user = User::where('email', $request->email)->first();


        return response()->json([
            'status' => true,
            'message' => 'Usuario logueado correctamente',
            'data' => $user,
            'token' => $user->CreateToken('API TOKEN')->plainTextToken
        ], 200);


    }



    /**
     * Elimina la sesión de los usuarios
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout()
    {
        auth()->user()->tokens()->delete();
        return response()->json([
            'status' => true,
            'message' => 'Cierre de sesión correcto'
        ], 200);
    }
}
