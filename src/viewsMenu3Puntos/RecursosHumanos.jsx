import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import clienteAxios from '../config/axios';
import '../css/RecursosHumanos.css';
import SSEComponent from '../config/SSEComponent';
import AgregarUsuarioTrabajador from '../components/AgregarUsuarioTrabajador';

export default function RecursosHumanos() {
  const location = useLocation();
  const { informacion } = location.state || {}; // Obtén la información pasada al componente
  const [data, setData] = useState([]);          // Estado para almacenar los datos de la colección
  const [filteredData, setFilteredData] = useState([]); // Estado para el resultado de la búsqueda
  const [searchTerm, setSearchTerm] = useState("");     // Estado para el término de búsqueda


 // Estado para mostrar el modal
 const [showModal, setShowModal] = useState(false);
 console.log(informacion)


  // useEffect para consultar la base de datos al cargar el componente o cambiar "informacion"
  useEffect(() => {
    
    const fetchData = async () => {
      if (informacion === "Empleados") {
        try {
          const response = await clienteAxios.get('/trabajadores/recursos-humanos'); // Ruta para traer la colección trabajadores
          setData(response.data);            // Guardamos los datos en el estado
          setFilteredData(response.data);    // Inicializamos el filtro con todos los datos
        } catch (error) {
          console.error("Error al obtener los datos:", error);
        }
      }
    };
    fetchData();
  }, [informacion]);
  

  // Manejador para el input de búsqueda
  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    // Filtrar los trabajadores según el término de búsqueda
    const filtered = data.filter((trabajador) =>
      trabajador.nombre.toLowerCase().includes(term)
    );
    setFilteredData(filtered);
  };

  // Función para abrir y cerrar el modal
  const handleModalToggle = () => {
    setShowModal(!showModal);
  };

  // Función para actualizar la lista de trabajadores después de agregar uno
  const handleAdd = () => {
    // Recargar los datos después de agregar un trabajador
    const fetchData = async () => {
      const response = await clienteAxios.get(
        "/trabajadores/recursos-humanos"
      );
      setData(response.data);
      setFilteredData(response.data);
    };
    fetchData();
  };
  return (
    <div className="recursos-container">
      <h1 className="recursos-title">{informacion || "Recursos Humanos"}</h1>
      {/*  <SSEComponent />  Componente que maneja los eventos SSE */}

      <button className="recursos-button" onClick={handleModalToggle}>
        Agregar Trabajador
      </button>

      <input
        type="text"
        placeholder="Buscar trabajador..."
        value={searchTerm}
        onChange={handleSearch}
        className="recursos-input"
      />

      <ul className="recursos-list">
        {filteredData.length > 0 ? (
          filteredData.map((trabajador) => (
            <li key={trabajador._id} className="recursos-list-item">
              {trabajador.nombre}
            </li>
          ))
        ) : (
          <p className="no-results">No se encontraron trabajadores</p>
        )}
      </ul>
       {/* Mostrar el modal si `showModal` es true */}
       {showModal && (
        <AgregarUsuarioTrabajador onClose={handleModalToggle} onAdd={handleAdd} />
      )}
    </div>
  );
}