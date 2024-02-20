<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class Direccion extends Model
{
    use HasFactory;

    protected $primaryKey = 'idDireccion';
    protected $fillable = [
        'idDireccion',
        'idUser',
        'direccion',
        'ciudad',
        'pais',
        'codigo_postal'
    ];

    public static function saveDireccion($direccion){
        return DB::table('direccion')->insert($direccion);
    }
}
