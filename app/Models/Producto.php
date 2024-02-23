<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class Producto extends Model
{
    use HasFactory;

    protected $primaryKey = 'idProducto';
    protected $fillable = [
        'idProducto',
        'nombreProducto',
        'precio',
        'origen',
        'visible',
        'categoria',
        'envio',
        'stock',
    ];


    public static function getProductos(){
        return DB::table('productos')->where('visible', 1)->get();
    }

    public static function getAllInfoProductos($id){
        $productos = DB::table('productos as p')
            ->select('p.*', 'ccaa.nombreCCAA', 'c.nombreCategoria', 'ccaa.thumbCCAA')
            ->join('categorias as c', 'p.categoria', 'c.idCategoria')
            ->join('comunidades_autonomas as ccaa', 'p.origen', 'ccaa.idCCAA' )
            ->where('visible', 1);


            if(isset($id)){
                return $productos->where('idProducto', $id)->get();
            }

            return $productos->get();
    }

    public static function saveProducto($producto){
        DB::table('productos')->insert($producto);
    }


}
