import { useEffect, useState } from "react";
import NavBar from "./NavBar";
import Producto from "./Producto"


export default function Inicio(){
    const [productos, setProductos] = useState([]);
    const dominio = window.dominio;
    useEffect(()=>{
        async function obtenerProductos(){
            let connection = await fetch( dominio + '/public/api/productosAll');
            if(connection.ok){
                let data = await connection.json();
                setProductos(data);
            }
        }
        obtenerProductos();
    },[])

    return(
        <div>
            <NavBar />
            <main className="flex w-full justify-center mt-2">
                <section className="flex w-11/12 gap-2 flex-wrap justify-around">
                {productos.map((p, i)=>{
                    return <Producto key={i} data={p} />
                })}
                </section>
               
            </main>
        </div>
    );   
}