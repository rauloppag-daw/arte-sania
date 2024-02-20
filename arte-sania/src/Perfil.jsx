import { useEffect, useState } from "react";
import NavBar from "./NavBar";
import { Navigate, navigate, useNavigate } from "react-router-dom";
import Pedidos from "./Pedidos";


export default function Perfil(){

    const [user, setUser] = useState([]);
    const navigate = useNavigate();

    

    useEffect(()=>{
        let token  = sessionStorage.getItem('token');

        async function obtenerUsuario(){
            let token  = sessionStorage.getItem('token');

            
                let connection = await fetch('http://localhost/arte-sania/public/api/usuario', {
                    method: 'GET',
                    headers:{
                        'Authorization': `Bearer ${token}`,
                    }
                })
    
                if(connection.ok){
                    let data = await connection.json();
                    setUser(data.user);
                }else{
                    return navigate('/login');
                }
        }
        if(token == null){
            return navigate('/login');
        }else{
            obtenerUsuario();
        }
    },[]);

    return(
        <div className="h-full w-full">
            <NavBar />
            <div className="w-full h-full flex justify-center mt-10 border-b border-yellow-900 pb-2">
                <div className="w-6/12 h-full flex justify-end">
                    {user.imgProfile == null ? <div className="w-6/12 h-80 bg-gray-200 animate-pulse rounded-md"> </div> : <img className="w-6/12 h-80" src={user.imgProfile}></img>}
                    
                    </div>
                <div className="w-6/12 h-full ml-4">
                    
                    <p className="text-4xl font-openbold text-yellow-800">{user.nombre}</p>
                    <p className="text-xl">{user.email}</p>
                    
                    </div>
            </div>
            <Pedidos user={user.id} ></Pedidos>
        </div>
    );
}