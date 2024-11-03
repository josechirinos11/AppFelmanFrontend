import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Alerta from '../components/Alerta';
import clienteAxios from '../config/axios';
import felmanImage from '../img/felman.png';

export default function Ajustes() {
  const UserLocalstorage = localStorage.getItem('usuario');
  // convertir a objeto lo que esta la cadena de texto
  const usuarioObjeto = UserLocalstorage ? JSON.parse(UserLocalstorage) : null;


  return (
    <div>
      <h1>Ajustes</h1>
      <p>{usuarioObjeto?.nombreUSER}</p>
      <p>{usuarioObjeto?.emailUSER}</p>
    </div>
  )
}
