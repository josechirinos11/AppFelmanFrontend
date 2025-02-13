import React, { useEffect, useState } from 'react';
import clienteAxios from '../../config/axios';
import { useLocation } from 'react-router-dom';
import AgregarUsuarioTrabajador from '../../components/AgregarUsuarioTrabajador';
import ConfirmDialog from '../../components/ConfirmDialog';
import ActualizarTrabajador from '../../components/ActualizarTrabajador';

const Departamento = () => {

  const { informacion } = location.state || {};  // Obtén la información pasada al componente
  const [data, setData] = useState([]);  // Estado para almacenar los datos de la colección


  useEffect(() => {
    const fetchData = async () => {
      if (informacion === "Departamentos") {
        try {
          // Fetch de los datos de los departamentos
          const response = await clienteAxios.get('/departamentos/items');
          setData(response.data);  // Guardar datos de empleados
      

         
        } catch (error) {
          console.error("Error al obtener los datos de empleados o campos:", error);
        }
      }
    };

    fetchData();
    console.log("departamentos en carga:   ",data)
  }, [informacion]);






  return (
    <div>
      ddd
    </div>
  )
}

export default Departamento
