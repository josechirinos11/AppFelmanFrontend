import React from 'react'
import { useLocation } from 'react-router-dom';

export default function MarketingYRelacionesPublicas() {
  const location = useLocation();
  const { informacion } = location.state || {}; // Obtén el item clicado



  return (
    <div>
      <h1>Marketing Y Relaciones Publicas</h1>
      {informacion && <p>Has clicado en: {informacion}</p>}
      {/* Resto del contenido de la página */}
    </div>
  )
}
