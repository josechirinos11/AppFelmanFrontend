import React from 'react'
import { useLocation } from 'react-router-dom';
import Info from './Info';

export default function OperacionesYLogistica() {
 
  const location = useLocation();
  const { informacion } = location.state || {}; // Obtén el item clicado



  return (
    <div>
      <h1>Operaciones Y Logistica</h1>
      {informacion && <p>Has clicado en: {informacion}</p>}
      {/* Resto del contenido de la página */}
      <Info />
    </div>

  )
}
