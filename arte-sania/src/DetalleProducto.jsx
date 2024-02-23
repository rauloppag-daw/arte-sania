import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import NavBar from "./NavBar";
import { Truck } from "react-feather";

export default function DetalleProducto() {
    const id = useParams();
    const navigate = useNavigate();

    const [datos, setDatos] = useState([]);

    useEffect(() => {
        async function obtenerDatos() {
            let connection = await fetch('http://localhost/arte-sania/public/api/producto/' + id.id);
            if (connection.ok) {
                let data = await connection.json();
                setDatos(data[0]);
                console.log(data[0]);
            }
        }
        obtenerDatos();
    }, []);

    const comprar = (e) => {
        e.preventDefault();
        let cantidad = 1;
        addProducto(cantidad, true);
    }

    const cesta = (e) => {
        e.preventDefault();
        let cantidad = document.forms.producto.cantidad.value;
        if(cantidad > 0 && cantidad <= datos.stock){
            addProducto(cantidad, false)
        }else{
            alert('Hay algo mal con la cantidad seleccionada');
        }
    }

    async function addProducto(cantidad, redireccion){
        let tokenCarrito = sessionStorage.getItem('carrito');
        let token = sessionStorage.getItem('token');
        
        let headers = '';
        if(token == null){
            headers = {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        }else{
            headers = {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            }
        }

        let connection = await fetch('http://localhost/arte-sania/public/api/addProducto', {
            method : 'POST',
            headers: headers,
            body: JSON.stringify({
                'tokenCarrito' : tokenCarrito,
                'idProducto' : datos.idProducto,
                'cantidad': cantidad
            })
        });

        if(connection.ok){
            let data = await connection.json();

            if(tokenCarrito == null){
                sessionStorage.setItem('carrito', data.idCarrito);
            }

            if(redireccion){
                return navigate('/carrito');
            }else{
                return navigate('/');
            }
            
           
        }

    }

    return (

        <div>
            <NavBar />
            <main className="flex w-full  justify-center pt-2 mt-4">
                <div className="w-11/12 bg-orange-50  h-full flex">
                    <div id="gallery" className="w-5/12 h-full flex overflow-hidden aspect-square object-contain">
                        {
                        datos.imagenes != undefined ? 
                        datos.imagenes.map((img,i) => {
                            return <img key={i} className="h-full w-full p-2 object-cover" src={img} />
                        }  ) : ''}
                    </div>
                    <div className="w-7/12 h-full">
                        <p className="text-gray-600 text-xl italic">{datos.nombreCategoria}</p>
                        <h1 className="text-4xl font-openbold pt-4 text-yellow-900 h-24">{datos.nombreProducto}</h1>
                        <p className="text-3xl text-red-600">{datos.precio} €</p>
                        <div className="flex justify-around pt-10">
                            <div className="flex justify-evenly  w-6/12 text-2xl items-center">
                                <img className="ml-2 w-8" src={datos.thumbCCAA} /> <span>{datos.nombreCCAA}</span>
                            </div>
                            <div className="flex justify-evenly w-6/12 text-2xl items-center"> <Truck  />  <span>Envio {datos.envio}</span></div>
                        </div>
                       
                        <div className="h-full">
                      
                        
                        <div className="pt-48">
                            <p className="text-center font-bold text-red-600">¡Quedan {datos.stock} unidades!</p>
                            <form className="flex justify-between" id="producto">
                            <input id="cantidad" placeholder="Cantidad..." max={datos.stock}  className="p-1 mx-2 w-4/12 outline-1 outline outline-yellow-800 border-solid focus:outline-orange-500 text-xl rounded-lg text-center bg-transparent text-yellow-800" type="number" min={0} />
                            <button onClick={cesta}  className="p-1 mx-2 w-4/12 h-2/4 outline outline-1 outline-yellow-800 text-yellow-800 text-xl rounded-lg hover:bg-orange-500 hover:outline-orange-500 hover:text-white transition-colors">Añadir a la cesta</button>
                            <button onClick={comprar} className="p-1 mx-2 bg-yellow-800 text-white w-4/12 h-2/4 rounded-lg text-xl hover:bg-orange-500 transition-colors font-openreg hover:outline-orange-500 outline-yellow-800 outline-1 outline">Comprar</button>
                            </form>
                        
                        </div>
                        </div>
                       
                    </div>
                </div>
            </main>
        </div>
    );
}