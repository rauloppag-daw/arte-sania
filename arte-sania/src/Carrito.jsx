import { useEffect, useState } from 'react';
import NavBar from './NavBar'
export default function Carrito() {

    const [carrito, setCarrito] = useState([]);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        async function getCarritoAll() {
            let tokenCarrito = sessionStorage.getItem('carrito');
            let connection = await fetch('http://localhost/arte-sania/public/api/carrito/' + tokenCarrito);
            if (connection.ok) {
                let data = await connection.json();
                console.log(data.carrito);
                setCarrito(data.carrito);
                setTotal(data.total);
                console.log(data.total);
                
            }
        }
        getCarritoAll();
    },[]);

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
                                   <div className={`flex justify-between ${i%2 == 0 ? 'bg-yellow-50' : ''} py-10 text-xl items-center`}>
                                       <p>{c.nombreProducto}</p>
                                       <p>{c.cantidad}</p>
                                       <p>Subtotal: {Number(c.cantidad) * Number(c.precio)}</p>
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
                            <button className='w-full py-4 bg-yellow-900 text-white mt-4'>Comprar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}