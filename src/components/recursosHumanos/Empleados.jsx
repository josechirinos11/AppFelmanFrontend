import React, { useEffect, useState } from 'react';
import clienteAxios from '../../config/axios';
import { useLocation } from 'react-router-dom';
import AgregarUsuarioTrabajador from '../../components/AgregarUsuarioTrabajador';
import ConfirmDialog from '../../components/ConfirmDialog';
import ActualizarTrabajador from '../../components/ActualizarTrabajador';

export default function Empleado() {
  const location = useLocation();
  const { informacion } = location.state || {};  // Obtén la información pasada al componente

  const [data, setData] = useState([]);  // Estado para almacenar los datos de la colección
  const [filteredData, setFilteredData] = useState([]);  // Estado para el resultado de la búsqueda
  const [searchTerm, setSearchTerm] = useState("");  // Estado para el término de búsqueda
  const [showModal, setShowModal] = useState(false);  // Estado para mostrar el modal de agregar trabajador
  const [showEditModal, setShowEditModal] = useState(false);  // Estado para mostrar el modal de editar trabajador
  const [selectedTrabajador, setSelectedTrabajador] = useState(null);  // Trabajador seleccionado para editar
  const [showDialog, setShowDialog] = useState(false);  // Estado para mostrar el cuadro de confirmación
  const [selectedID, setSelectedID] = useState(null);  // ID del trabajador seleccionado para eliminar

  useEffect(() => {
    const fetchData = async () => {
      if (informacion === "Empleados") {
        try {
          // Fetch de los datos de empleados
          const response = await clienteAxios.get('/trabajadores/recursos-humanos');
          setData(response.data);  // Guardar datos de empleados
          setFilteredData(response.data);

          // Fetch de los campos del modelo
          const responseCampos = await clienteAxios.get('/trabajadores/campos');

          // Si necesitas guardar los campos en un estado diferente
          // puedes usar otro estado como `setCampos`.
        } catch (error) {
          console.error("Error al obtener los datos de empleados o campos:", error);
        }
      }
    };

    fetchData();
  }, [informacion]);


  // Función para filtrar los trabajadores por el término de búsqueda
  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = data.filter((trabajador) =>
      trabajador.nombre.toLowerCase().includes(term)
    );
    setFilteredData(filtered);
  };

  // Función para mostrar y ocultar el modal de agregar trabajador
  const handleModalToggle = () => {
    setShowModal(!showModal);
  };

  // Función para actualizar la lista de trabajadores después de agregar uno
  const handleAdd = () => {
    const fetchData = async () => {
      const response = await clienteAxios.get("/trabajadores/recursos-humanos");
      setData(response.data);
      setFilteredData(response.data);
    };
    fetchData();
  };

  // Función para editar un trabajador
  const handleEdit = (IDtrabajador) => {
    const trabajador = data.find((trabajador) => trabajador._id === IDtrabajador);
    setSelectedTrabajador(trabajador);
    setShowEditModal(true);  // Abre el modal de edición
  };

  // Función para cerrar el modal de edición
  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setSelectedTrabajador(null);  // Limpia el trabajador seleccionado
  };

  // Función para eliminar un trabajador
  const handleDelete = async (IDtrabajador) => {
    try {
      const response = await clienteAxios.delete(`/trabajadores/recursos-humanos/${IDtrabajador}`);

      alert(response.data.mensaje);

      // Recargar la lista de trabajadores
      const updatedResponse = await clienteAxios.get("/trabajadores/recursos-humanos");
      setData(updatedResponse.data);
      setFilteredData(updatedResponse.data);
    } catch (error) {
      console.error("Error al eliminar el trabajador:", error);
      alert("Ocurrió un error al intentar eliminar el trabajador.");
    }
  };

  // Funciones para mostrar el cuadro de confirmación
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

  return (

    <>
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
              <strong>{trabajador.nombre}</strong>
              <strong
                className={trabajador.confirmado ? "email-confirmado" : "email-no-confirmado"}
                title={trabajador.confirmado ? "Confirmado" : "No confirmado"}
              >
                {trabajador.email}
              </strong>
              <div>
                <button onClick={() => handleEdit(trabajador._id)}>Editar</button>
                <button onClick={() => openConfirmDialog(trabajador._id)}>Eliminar</button>
              </div>
            </li>
          ))
        ) : (
          <p className="no-results">No se encontraron trabajadores</p>
        )}
      </ul>

      {showModal && (
        <AgregarUsuarioTrabajador onClose={handleModalToggle} onAdd={handleAdd} />
      )}

      {showDialog && (
        <ConfirmDialog onConfirm={confirmDelete} onCancel={closeConfirmDialog} />
      )}

      {showEditModal && (
        <ActualizarTrabajador
          trabajadorId={selectedTrabajador?._id}
          onClose={handleCloseEditModal}
          onUpdate={handleAdd}  // Recargar los datos después de actualizar
        />
      )}
    </>

  );
}
