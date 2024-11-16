import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import clienteAxios from '../config/axios';
import '../css/RecursosHumanos.css';
import SSEComponent from '../config/SSEComponent';
import AgregarUsuarioTrabajador from '../components/AgregarUsuarioTrabajador';
import ConfirmDialog from '../components/ConfirmDialog';
import { useAuth } from '../config/AuthContext';
import ActualizarTrabajador from '../components/ActualizarTrabajador';

import Empleado from '../components/recursosHumanos/Empleados';
import Departamento from '../components/recursosHumanos/Departamento';
import RolesYPermisos from '../components/recursosHumanos/RolesYPermisos';
import ContratistasYConsultoresExternos from '../components/recursosHumanos/ContratistasYConsultoresExternos'

export default function RecursosHumanos() {
  const location = useLocation();
  const { informacion } = location.state || {}; // Obtén la información pasada al componente
  const [mensaje, setMensaje] = useState("");  // Estado para manejar el mensaje


  const [data, setData] = useState([]);          // Estado para almacenar los datos de la colección
  const [filteredData, setFilteredData] = useState([]); // Estado para el resultado de la búsqueda
  const [searchTerm, setSearchTerm] = useState("");     // Estado para el término de búsqueda
  const [selectedID, setSelectedID] = useState(null); // Almacena el ID del trabajador a eliminar


  const { usuario } = useAuth(); // Extraer la función login del contexto
  const usuarioContexto = usuario || JSON.parse(localStorage.getItem('usuario'));


  // Estado para mostrar el modal
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);  // Estado para mostrar el modal de edición
  const [selectedTrabajador, setSelectedTrabajador] = useState(null); // Estado para almacenar el trabajador seleccionado para editar
  const [showDialog, setShowDialog] = useState(false); // Estado para mostrar el cuadro de confirmación

  // useEffect para consultar la base de datos al cargar el componente o cambiar "informacion"
  useEffect(() => {
    const fetchData = async () => {
      try {
        let response;
  
        switch (informacion) {
          case "Empleados":
            response = await clienteAxios.get('/trabajadores/recursos-humanos');
            break;
          case "Departamentos":
            response = await clienteAxios.get('/trabajadores/departamentos');
            break;
          case "Roles y permisos":
            response = await clienteAxios.get('/trabajadores/roles-permisos');
            break;
          case "Contratistas y consultores externos":
            response = await clienteAxios.get('/trabajadores/contratistas');
            break;
          default:
            console.warn("No se reconoció la opción proporcionada:", informacion);
            return; // Si no hay una opción válida, no hacemos nada
        }
  
        if (response && response.data) {
          setMensaje(response.data.mensaje)
          console.log(response.data)
          setData(response.data);          // Guardamos los datos en el estado
          setFilteredData(response.data);  // Inicializamos el filtro con todos los datos
        }
      } catch (error) {
        console.error(`Error al obtener los datos para ${informacion}:`, error);
      }
    };
  
    if (informacion) {
      fetchData();
    }
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

  const handleEdit = (IDtrabajador) => {
    console.log(IDtrabajador)
    const trabajador = data.find((trabajador) => trabajador._id === IDtrabajador);
    setSelectedTrabajador(trabajador);
    setShowEditModal(true);  // Abre el modal de edición

  };
  const handleCloseEditModal = () => {
    setShowEditModal(false);  // Cierra el modal de edición
    setSelectedTrabajador(null);  // Limpia el trabajador seleccionado
  };


  const handleDelete = async (IDtrabajador) => {
    try {
      // Eliminar el trabajador
      const response = await clienteAxios.delete(
        `/trabajadores/recursos-humanos/${IDtrabajador}`
      );
      console.log("Trabajador eliminado:", response.data);

      // Obtener la lista actualizada de trabajadores
      const updatedResponse = await clienteAxios.get("/trabajadores/recursos-humanos");
      setData(updatedResponse.data);         // Actualizamos el estado con los nuevos datos
      setFilteredData(updatedResponse.data); // Actualizamos también el filtro
    } catch (error) {
      console.error("Error al eliminar el trabajador:", error);
      alert("Ocurrió un error al intentar eliminar el trabajador.");
    }
  };

  const openConfirmDialog = (id) => {
    setSelectedID(id);
    setShowDialog(true);
  };

  const closeConfirmDialog = () => {
    setShowDialog(false);
    setSelectedID(null);
  };

  const confirmDelete = () => {
    if (selectedID) {
      handleDelete(selectedID);
      closeConfirmDialog();
    }
  };

  const renderComponent = () => {
    switch (informacion) {
      case "Empleados":
        return (
          <Empleado 
            searchTerm={searchTerm} 
            handleSearch={handleSearch} 
            filteredData={filteredData} 
            mensaje={mensaje} 
            handleModalToggle={handleModalToggle} 
            showModal={showModal} 
            onAdd={handleAdd} 
            showDialog={showDialog} 
            openConfirmDialog={openConfirmDialog} 
            closeConfirmDialog={closeConfirmDialog} 
            handleEdit={handleEdit} 
            handleDelete={handleDelete} 
            handleCloseEditModal={handleCloseEditModal} 
            selectedTrabajador={selectedTrabajador} 
            showEditModal={showEditModal} 
            confirmDelete={confirmDelete} 
          />
        );
      case "Departamentos":
        return <Departamento />;
      case "Roles y permisos":
        return <RolesYPermisos />;
      case "Contratistas y consultores externos":
        return <ContratistasYConsultoresExternos />;
      default:
        return <div>Sección no encontrada</div>;
    }
  };





  return (
    <div className="recursos-container">
      <h1 className="recursos-title">{informacion || "Recursos Humanos"}</h1>

      {/* Mostrar el componente correspondiente según la información */}
      {renderComponent()}

     
    </div>
  );
}