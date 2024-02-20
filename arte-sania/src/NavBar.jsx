import { ShoppingCart } from "react-feather";
import { Link } from "react-router-dom";
export default function NavBar(){
    return (
        <header className="bg-yellow-800 flex items-center h-20 w-full">
            <div className="w-2/12">
                <h1 className="font-openbold text-white text-3xl"><Link to={'/'}>arte-sania </Link></h1>
            </div>
            <nav className="w-4/12" >
                <ul className="flex text-white font-bold font-openreg w-full justify-around">
                    <li><Link to={'/'}>Productos</Link></li>
                    <li><Link to={'/login'}>Perfil</Link></li>
                </ul>
            </nav>
            <div className="flex justify-end w-5/12">
                <ShoppingCart className="w-10 h-10" fill="white" color="white" />
            </div>
        </header>
    );
}