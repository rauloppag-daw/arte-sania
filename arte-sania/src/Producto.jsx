import { Link, useNavigate } from "react-router-dom";

export default function Producto({data}){

    const navigate = useNavigate();
    const dominio = window.dominio;

    async function addProducto(){
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

        let connection = await fetch(dominio +'/public/api/addProducto', {
            method : 'POST',
            headers: headers,
            body: JSON.stringify({
                'tokenCarrito' : tokenCarrito,
                'idProducto' : data.idProducto,
                'cantidad': 1
            })
        });

        if(connection.ok){
            let data = await connection.json();

            if(tokenCarrito == null){
                sessionStorage.setItem('carrito', data.idCarrito);
            }
            
            return navigate('/carrito');
        }

    }

    const comprar = (e) => {
        e.preventDefault();
        addProducto()
    }

    return (
        <Link to={`producto/${data.idProducto}`} className="border border-gray-300 rounded-xl h-96 w-56 p-2 ">
            <div className={`h-2/5 w-full flex  rounded-lg  overflow-hidden ${data.imagenes[0] == '' && 'bg-gray-200 animate-pulse'} `}>
                {data.imagenes[0] != '' ?   data.imagenes.map((img) => {
                    return <img className="h-full w-full object-cover" src={img} />
                }) : ''}
                
            </div>
            <div className="font-bold text-lg h-1/5">
                {data.nombreProducto}
            </div>
            <div className="flex justify-between items-center pt-4 h-1/5">
                <div className="w-4/12 flex justify-center items-center"><img className="w-6/12" src={data.thumbCCAA} /></div>
                <div className="w-4/12 text-center italic">{data.stock} uds</div>
                <div className="w-4/12 text-center text-red-400 font-bold">{data.precio} €</div>
            </div>
            <div className="w-full h-1/5 flex items-center justify-center">
                <button onClick={comprar} className="bg-yellow-800 text-white w-11/12 h-3/5 rounded-xl hover:bg-orange-500 transition-colors font-openreg">Comprar</button>
            </div>
        </Link>
    );
}