import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NavBar from "./NavBar";
import { Truck } from "react-feather";

export default function DetalleProducto() {
    const id = useParams();

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
                            <form className="flex justify-between">
                            <input placeholder="Cantidad..." max={datos.stock}  className="p-1 mx-2 w-4/12 outline-1 outline outline-yellow-800 border-solid focus:outline-orange-500 text-xl rounded-lg text-center bg-transparent text-yellow-800" type="number" min={0} />
                            <button className="p-1 mx-2 w-4/12 h-2/4 outline outline-1 outline-yellow-800 text-yellow-800 text-xl rounded-lg hover:bg-orange-500 hover:outline-orange-500 hover:text-white transition-colors">Añadir a la cesta</button>
                            <button  className="p-1 mx-2 bg-yellow-800 text-white w-4/12 h-2/4 rounded-lg text-xl hover:bg-orange-500 transition-colors font-openreg hover:outline-orange-500 outline-yellow-800 outline-1 outline">Comprar</button>
                            </form>
                        
                        </div>
                        </div>
                       
                    </div>
                </div>
            </main>
        </div>
    );
}