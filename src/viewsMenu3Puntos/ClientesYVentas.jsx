import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Info from './Info';

export default function ClientesYVentas() {
  const location = useLocation();
  const { informacion } = location.state || {};
  const [infoData, setInfoData] = useState(null);

  const handleItemClick = (nombre, ciudad, pais) => {
    setInfoData({ nombre, ciudad, pais });
  };

  const clientesYVentas = [
    { nombre: 'Cliente 1', ciudad: 'Ciudad A', pais: 'País A' },
    { nombre: 'Cliente 2', ciudad: 'Ciudad B', pais: 'País B' },
    // ... más clientes y ventas
  ];

  return (
    <div>
      <h1>Clientes y Ventas</h1>
      {informacion && <p>Has clicado en: {informacion}</p>}
      {/* Resto del contenido de la página */}
      <Info /> {/* Muestra el componente Info */}
    </div>
  );
}