import { useEffect, useState } from "react";
import NavBar from "./NavBar";
import { Navigate, navigate, useNavigate } from "react-router-dom";
import Pedidos from "./Pedidos";


export default function Perfil() {

    const [user, setUser] = useState([]);
    const navigate = useNavigate();
    const [carritos, setCarritos] = useState([]);



    useEffect(() => {
        let token = sessionStorage.getItem('token');

        async function obtenerUsuario() {
            let token = sessionStorage.getItem('token');
            let connection = await fetch('http://localhost/arte-sania/public/api/usuario', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            })

            if (connection.ok) {
                let data = await connection.json();
                setUser(data.user);
                comprobarCarrito(data.carrito);
            } else {
                return navigate('/login');
            }
        }
        if (token == null) {
            return navigate('/login');
        } else {
            obtenerUsuario();
        }
    }, []);

    function comprobarCarrito(carritoUser) {

        let tokenSinUser = sessionStorage.getItem('carrito');


        if (tokenSinUser !== null && carritoUser !== null) {
            sessionStorage.setItem('carrito',carritoUser);
            if (tokenSinUser != carritoUser) {
                setCarritos([
                    tokenSinUser,
                    carritoUser
                ])
                document.getElementById('carritos').style.display = 'flex';
            }
        } else if (carritoUser !== null) {
            sessionStorage.setItem('carrito', carritoUser);
        }else if(tokenSinUser !== null){
            asignarCarrito(tokenSinUser);
        }
    }

    const selectCarrito = (carrito) => {
        console.log(carrito);
        if (carrito != sessionStorage.getItem('carrito')) {
            cambiarCarrito(carrito);
        }
        document.getElementById('carritos').style.display = 'none';
    }

    async function cambiarCarrito(carrito) {
        let token = sessionStorage.getItem('token');
        let connection = await fetch('http://localhost/arte-sania/public/api/cambiarCarrito', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({
                'carrito': carrito
            }),
        });

        if (connection.ok) {
            console.log('async' + carrito);
            sessionStorage.setItem('carrito', carrito);
        }
    }

    async function asignarCarrito(carrito) {
        let token = sessionStorage.getItem('token');
        let connection = await fetch('http://localhost/arte-sania/public/api/asignarCarrito', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({
                'carrito': carrito
            }),
        });

        if (connection.ok) {
            sessionStorage.setItem('carrito', carrito);
        }
    }

    async function logout() {
        let token = sessionStorage.getItem('token')
        let connection = await fetch('http://localhost/arte-sania/public/api/logout',
            {
                method: 'GET',
                'headers': {
                    'Authorization': `Bearer ${token}`
                }
            }
        )

        if (connection.ok) {
            sessionStorage.removeItem('token');
            sessionStorage.removeItem('carrito');
            return navigate('/login', {
                replace: true
            });
        }
    }

    const logoutClick = () => {
        logout();
    }

    return (
        <div className="h-full w-full">
            <NavBar />
            <div className="w-full h-full flex justify-center mt-10 border-b border-yellow-900 pb-2">
                <div className="w-6/12 h-full flex justify-end">
                    {user.imgProfile == null ? <div className="w-6/12 h-80 bg-gray-200 animate-pulse rounded-md"> </div> : <img className="w-6/12 h-80" src={user.imgProfile}></img>}

                </div>
                <div className="w-6/12 h-full ml-4">

                    <p className="text-4xl font-openbold text-yellow-800">{user.nombre}</p>
                    <p className="text-xl">{user.email}</p>
                    <button className="bg-yellow-900 rounded-xl text-white font-openbold px-4 py-2" onClick={logoutClick}>Log Out</button>
                </div>
            </div>
            <div id="carritos" className="outline outline-1 outline-yellow-900 p-4 justify-around hidden">
                <button onClick={() => selectCarrito(carritos[1])} >Carrito anterior</button>
                <button onClick={() => selectCarrito(carritos[0])}>Carrito nuevo</button>
            </div>
            <Pedidos></Pedidos>
        </div>
    );
}