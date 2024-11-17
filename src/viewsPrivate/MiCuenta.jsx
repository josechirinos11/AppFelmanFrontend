import { useState, useEffect } from 'react';
import { Link, useNavigate  } from 'react-router-dom';
import Alerta from '../components/Alerta';
import clienteAxios from '../config/axios';
import felmanImage from '../img/felman.png';
import { useAuth } from '../config/AuthContext';

export default function MiCuenta() {
  //const { usuario } = useAuth();
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
 
const UserLocalstorage = localStorage.getItem('usuario')
// Convertir la cadena JSON de nuevo a un objeto
const usuarioObjeto = UserLocalstorage ? JSON.parse(UserLocalstorage) : null;

 
  return (
    <div>
      <p>
        Micuenta
      </p>
      {(UserLocalstorage) ? (
                <>
                    <p>Nombre: {usuarioObjeto.nombreUSER}</p>
                    <p>Email: {usuarioObjeto.emailUSER}</p>
                </>
            ) : (
                <p>No estás autenticado.</p>
            )}
    </div>
  )
}

