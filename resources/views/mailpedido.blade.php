<!doctype html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
    <h1>PEDIDO {{$pedido->idPedido}}</h1>
    <h2>FECHA: {{$pedido->fechaPedido}}</h2>
    <h3>TOTAL: {{$pedido->total}}</h3>

    <h4>Productos</h4>
<ul>
    @foreach($lineasPedido as $l)
        <li>{{$l->nombreProducto}} -- {{$l->precio}} -- {{$l->cantidad}}</li>
    @endforeach
</ul>
</body>
</html>
