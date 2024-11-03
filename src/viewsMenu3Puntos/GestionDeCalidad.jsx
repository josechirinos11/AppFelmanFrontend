import React from 'react'
import { useLocation } from 'react-router-dom';

export default function GestionDeCalidad() {
  const location = useLocation();
  const { informacion } = location.state || {}; // Obtén el item clicado



  return (
    <div>
      <h1>Gestion De Calidad</h1>
      {informacion && <p>Has clicado en: {informacion}</p>}
      {/* Resto del contenido de la página */}
    </div>
  )
}
