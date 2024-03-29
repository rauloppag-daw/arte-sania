import logo from './logo.svg';
import './App.css';
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider, Navigate } from 'react-router-dom';
import Inicio from './Inicio';
import DetalleProducto from './DetalleProducto';
import Login from './Login';
import Perfil from './Perfil';
import Carrito from './Carrito';
import Registro from './Registro'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/'>
      <Route index element={<Inicio />}></Route>
      <Route path='/producto/:id' element={<DetalleProducto />}></Route>
      <Route path='/login' element={<Login />}></Route>
      <Route path='/perfil' element={<Perfil />}></Route>
      <Route path='/carrito' element={<Carrito />}></Route>
      <Route path='/registro' element={<Registro />}></Route>
    </Route>
  )
);

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
