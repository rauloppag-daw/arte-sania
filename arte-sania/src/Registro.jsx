import NavBar from "./NavBar";
import { Link, Navigate, redirect, useNavigate } from "react-router-dom";
import Perfil from './Perfil';
import { useEffect } from "react";

export default function Registro({ }) {
    const navigate = useNavigate();
    const dominio = window.dominio;


    useEffect(()=>{
        let token = sessionStorage.getItem('token');
        if(token != null){
            return navigate('/perfil')
        }
    },[])

    async function registro(nombre, email, password){
        let connection = await fetch( dominio +'/public/api/registrar', {
            method : 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({'nombre': nombre, 'email': email, 'password': password}),
        })

        if(connection.ok){
            let data = await connection.json();
            sessionStorage.setItem('token', data.token);
            return navigate('/perfil', {
                replace: true
            });
        }else{
            console.log(connection);
        }
    }

    const enviarForm = (e) => {
        e.preventDefault();
        let email = document.forms.form.email.value;
        let password = document.forms.form.password.value;
        let nombre = document.forms.form.nombre.value;

        if(email !== null && password && password !== null && nombre !== null){
            registro(nombre,email, password);
        }
       
    }

    return (
        <div className="h-full">
            <NavBar />
            <div className="w-full flex justify-center mt-20 h-88">
                <div className="w-6/12 flex justify-center">
                <form id="form" onSubmit={enviarForm} className="outline outline-2 outline-yellow-900 p-10 rounded-lg relative">
                <div className="bg-yellow-900  absolute inset-0 h-8 w-full ">
                        <h2 className="text-center text-white text-lg">Registro de Usuario</h2>
                    </div>
                <p className="text-center w-full text-yellow-900 text-2xl">Nombre</p>
                    <input type="text" id="nombre" className="outline-yellow-900 outline outline-1 rounded-md w-80 text-2xl" />
                    <br />
                    <br />
                    <p className="text-center w-full text-yellow-900 text-2xl">Email</p>
                    <input type="email" id="email" className="outline-yellow-900 outline outline-1 rounded-md w-80 text-2xl" />
                    <br />
                    <br />
                    <p className="text-center text-yellow-900 text-2xl">Contraseña</p>
                    <input type="password" id="password" className="outline-yellow-900 outline outline-1 rounded-md w-80 text-2xl" />
                    <br />
                    <br />
                    <input type="submit" value={'Registrarme'} className="w-80 mt-10 bg-yellow-900 text-white rounded-md py-2 text-2xl hover:bg-orange-500 hover:outline-orange-500 transition-colors cursor-pointer" />
                    <br></br>
                    <Link className="text-yellow-700 underline" to={'/login'}>¿Ya estas registrado?</Link>
                </form>
                    
                </div>
                
            </div>
        </div>

    );
}