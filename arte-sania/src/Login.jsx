import NavBar from "./NavBar";
import { Navigate, redirect, useNavigate } from "react-router-dom";
import Perfil from './Perfil';
import { useEffect } from "react";

export default function Login({ }) {
    const navigate = useNavigate();


    useEffect(()=>{
        let token = sessionStorage.getItem('token');
        console.log(sessionStorage.getItem('token'));
        if(token != null){
            return navigate('/perfil')
        }
    },[])

    async function login(email, password){
        let connection = await fetch('http://localhost/arte-sania/public/api/login', {
            method : 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({'email': email, 'password': password}),
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
        login(email, password);
    }

    return (
        <div className="h-full">
            <NavBar />
            <div className="w-full flex justify-center mt-20 h-80">
                <div className="w-6/12 flex justify-center">
                <form id="form" onSubmit={enviarForm} className="outline outline-2 outline-yellow-900 p-10 rounded-lg">
                    <p className="text-center w-full text-yellow-900 text-2xl">Email</p>
                    <input type="email" id="email" className="outline-yellow-900 outline outline-1 rounded-md w-80 text-2xl" />
                    <br />
                    <br />
                    <p className="text-center text-yellow-900 text-2xl">Contraseña</p>
                    <input type="password" id="password" className="outline-yellow-900 outline outline-1 rounded-md w-80 text-2xl" />
                    <br />
                    <br />
                    <input type="submit" value={'Login'} className="w-80 mt-10 bg-yellow-900 text-white rounded-md py-2 text-2xl hover:bg-orange-500 hover:outline-orange-500 transition-colors cursor-pointer" />
                </form>
                </div>

            </div>
        </div>

    );
}
