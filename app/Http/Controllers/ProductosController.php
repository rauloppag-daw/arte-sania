<?php

namespace App\Http\Controllers;

use App\Models\Producto;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ProductosController extends Controller
{
    public function index(){
        $productos = Producto::getProductos();

        return $productos;
    }

    public function indexAllInfo(){

        $productos = Producto::getAllInfoProductos(null);

        foreach ($productos as $p){
            $imagenes = array();
            $directorio = Storage::disk('public')->files('/imgProducts/'. $p->idProducto);

            $imagenes = array();

            if(count($directorio) == 0){
                array_push($imagenes, '');
            }else{
                foreach ($directorio as $img){
                    array_push($imagenes,asset( 'storage/'. $img ));
                }
            }

            $p->imagenes = $imagenes;
        }

        return $productos;


    }

    public function showAllProduct($id){
        $productos = Producto::getAllInfoProductos($id);

        foreach ($productos as $p){
            $imagenes = array();
            $directorio = Storage::disk('public')->files('/imgProducts/'. $p->idProducto);

            $imagenes = array();

            if(count($directorio) == 0){
                array_push($imagenes, '');
            }else{
                foreach ($directorio as $img){
                    array_push($imagenes,asset( 'storage/'. $img ));
                }
            }

            $p->imagenes = $imagenes;
        }

        return $productos;
    }

}
