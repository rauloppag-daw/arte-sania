import { useEffect, useState } from 'react';
import NavBar from './NavBar'
import { useNavigate } from 'react-router-dom';
import { X } from 'react-feather';
export default function Carrito() {

    const [carrito, setCarrito] = useState([]);
    const [updated, setUpdated] = useState(0);
    const [total, setTotal] = useState(0);
    let navigate  = useNavigate();
    const dominio = window.dominio;

    useEffect(() => {
        async function getCarritoAll() {
            let tokenCarrito = sessionStorage.getItem('carrito');
            let connection = await fetch(dominio +'/public/api/carrito/' + tokenCarrito);
            if (connection.ok) {
                let data = await connection.json();
                setCarrito(data.carrito);
                setTotal(data.total);
            }
        }
        getCarritoAll();
        setUpdated(0);
    },[updated]);

    async function doCompra(){
        let token = sessionStorage.getItem('token');
        let connection = await fetch(dominio +'/public/api/realizar-pedido',
            {
                method : 'GET',
                headers: 
                {
                    'Authorization': `Bearer ${token}`,
                }
            }
        
        )
        if(connection.ok){
            sessionStorage.removeItem('carrito');
            return navigate('/perfil',{
                replace: true
            });
        }
    }

    const comprar = () => {
        if(sessionStorage.getItem('carrito') !== null && sessionStorage.getItem('token') !== null){
            doCompra()
        }else{
            alert('Debe haber un minimo producto y estar registrado')
        }
        
    }

    async function quitarLinea(idLinea){
        let connection = await fetch(dominio +'/public/api/quitar-linea', {
            method :'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({'idLinea' : idLinea})
        })

        if(connection.ok){
            setUpdated(1);
        }
    }

    return (
        <div>
            <NavBar />
            <div className='flex mt-10 justify-around'>
                <div className='w-6/12'>
                    <h1 className='text-4xl font-openbold text-yellow-800'>Carrito</h1>
                    <div>
                        <ul className='h-96 overflow-y-scroll'>
                        {carrito !== null ? carrito.map((c, i) => {
                               return (<li key={i}>
                                   <div className={`flex justify-around ${i%2 == 0 ? 'bg-yellow-50' : ''} py-10 text-xl items-center`}>
                                       <p>{c.nombreProducto}</p>
                                       <p>{c.cantidad}uds.</p>
                                       <p>{c.precio}€</p>
                                       <p>Subtotal: {Number(c.cantidad) * Number(c.precio)}€</p>
                                       <p><X className='bg-white rounded-full cursor-pointer' onClick={() => quitarLinea(c.idLinea)} /></p>
                                   </div>
                               </li>);
                           }
                           
                           ) : ''}
                        </ul>

                    </div>
                </div>
                <div className='w-6/12 flex justify-center'>
                    <div className='w-8/12 h-56 outline outline-1 outline-yellow-900'>
                        <h1 className='text-4xl font-openbold text-yellow-800'>Subtotal</h1>
                        <div className='p-4'>
                        <ul>
                                <li>Total (Sin IVA) : {total}</li>
                                <li>Iva: {total * 21 / 100}</li>
                                <hr>
                                </hr>
                                <li>Total (Con IVA): {Number(total) + (total*21/100)}</li>
                            </ul>
                            <button onClick={comprar} className='w-full py-4 bg-yellow-900 text-white mt-4'>Comprar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}