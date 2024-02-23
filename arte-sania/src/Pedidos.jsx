import { useEffect, useState } from "react";

export default function Pedidos() {

    const token = sessionStorage.getItem('token');
    const [pedidos, setPedidos] = useState([]);
    useEffect(() => {
        async function obtenerPedidos() {
            let connection = await fetch('http://localhost/arte-sania/public/api/obtener-pedidos',
                {
                    method: 'GET',
                    headers:
                    {
                        'Authorization': `Bearer ${token}`,
                    }
                }

            )
            if (connection.ok) {
                let data = await connection.json();
                console.log(data.pedidos)
                setPedidos(data.pedidos.sort(function(a,b){
                    
                    let fecha1 = new Date(a.pedido.fechaPedido.replace(' ', 'T'));
                    let fecha2 = new Date(b.pedido.fechaPedido.replace(' ', 'T'));
                    
                    if(fecha1 > fecha2){
                        return -1
                    }else if(fecha1 < fecha2){
                        return 1
                    }
                    return 0
                }));
               
            }
        }
        obtenerPedidos();
    },[])

    return (
        <div>
            <h1 className="text-4xl font-openbold text-yellow-800">PEDIDOS</h1>
            {
                pedidos.map((p,i) => {
                    return (
                        <div className={`${i%2 == 0 ? 'bg-yellow-50' : ''}`} key={p.pedido.idPedido}>
                            <h2 className="text-2xl">Fecha realizacion: {p.pedido.fechaPedido}</h2>
                            <p className="text-xl">Total: {p.pedido.total}€</p>
                            <div>
                                <ul>
                                {p.lineas.map((l,i)=>{
                                    return(
                                        <li className="pl-8 " key={i}>{l.nombreProducto} -- {l.cantidad} uds. -- {l.precio}€</li>
                                    )
                                })}    
                                </ul>
                            </div>
                        </div>
                    )
                })
            }

        </div>
    )
}