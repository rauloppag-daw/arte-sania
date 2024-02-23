import { ShoppingCart, User } from "react-feather";
import { Link } from "react-router-dom";
export default function NavBar() {
    return (
        <header className="bg-yellow-800 flex items-center h-20 w-full">
            <div className="w-2/12">
                <h1 className="font-openbold text-white text-4xl ml-4"><Link to={'/'}>arte-sania.</Link></h1>
            </div>
            <nav className="w-2/12" >
                <ul className="flex text-white font-bold font-openreg w-full justify-around">
                    <li><Link to={'/'}>Productos</Link></li>
                </ul>
            </nav>
            <div className="flex justify-end w-8/12">
                <div className="flex justify-evenly items-center w-4/12">
                    <Link to={'/perfil'} className="flex justify-center  w-10 h-10 items-center relative bg-white rounded-full p-4" >
                        <User className="w-full h-full absolute p-2 hover:animate-bounce" color="#854D0E" />
                    </Link>
                    <Link className="flex justify-center w-10 h-10 items-center bg-white rounded-full p-2 relative " to={'/carrito'}>
                        <ShoppingCart className="w-full h-full m-auto p-2 absolute z-10 hover:animate-bounce" color="#854D0E" />
                    </Link>
                </div>
            </div>
        </header>
    );
}