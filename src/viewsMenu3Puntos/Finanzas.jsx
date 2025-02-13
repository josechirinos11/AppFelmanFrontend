import React from 'react'
import { useLocation } from 'react-router-dom';
import Info from './Info';

export default function Finanzas() {
  const location = useLocation();
  const { informacion } = location.state || {}; // Obtén el item clicado



  return (
    <div>
      <h1>Finanzas</h1>
      {informacion && <p>Has clicado en: {informacion}</p>}
      {/* Resto del contenido de la página */}
      <Info />
    </div>
  )
}
