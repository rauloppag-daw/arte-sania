import { Link } from "react-router-dom";

export default function Producto({data}){

    const comprar = (e) => {
        e.preventDefault();
        alert('hola');
        
    }

    return (
        <Link to={`producto/${data.idProducto}`} className="border border-gray-300 rounded-xl h- w-56 p-2">
            <div className={` h-2/5 w-full flex ${data.imagenes.length > 0 ? 'overflow-x-scroll' : 'overflow-x-hidden'}  rounded-lg scrollbar-hide `}>
                {data.imagenes.map((img) => {
                    return <img className="h-full w-full object-cover" src={img} />
                })}
                
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