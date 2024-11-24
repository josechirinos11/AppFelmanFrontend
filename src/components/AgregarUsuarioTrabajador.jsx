import React, { useState } from "react";
import clienteAxios from "../config/axios"; // Importa la configuración de axios
import "../css/global.css"; // Asegúrate de que los estilos sean los adecuados
import { useAuth } from '../config/AuthContext';


const AgregarUsuarioTrabajador = ({ onClose, onAdd }) => {
   
    const { usuario } = useAuth(); // Extraer la función login del contexto
    const usuarioContexto = usuario || JSON.parse(localStorage.getItem('usuario'));
   
    const [newTrabajador, setNewTrabajador] = useState({
      "nombre": "trabajador No",
      "email": "No@correo.com",
      "password": "123456",
      "usuarioId": usuarioContexto.idUSER,
      "rol": []  // Aquí agregamos los roles al estado del trabajador
    });
 
  // Lista de roles disponibles
  const roles = [
    'Recursos Humanos',
    'Clientes y Ventas',
    'Proveedores y Abastecimiento',
    'Productos y Servicios',
    'Finanzas',
    'Operaciones y Logística',
    'Documentación y Cumplimiento',
    'Tecnología e Infraestructura',
    'Marketing y Relaciones Públicas',
    'Gestión de Calidad'
  ];


  // Manejar el cambio en los campos del formulario
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTrabajador((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Manejar el cambio en los roles seleccionados
  const handleRoleChange = (role) => {
    setNewTrabajador((prev) => {
      const alreadySelected = prev.rol.includes(role);
      return {
        ...prev,
        rol: alreadySelected
          ? prev.rol.filter((r) => r !== role) // Eliminar el rol si ya está seleccionado
          : [...prev.rol, role], // Agregar el rol si no está seleccionado
      };
    });
  };



  
  // Función para agregar trabajador al servidor
  const handleAgregar = async () => {
console.log(newTrabajador)
    try {
      const response = await clienteAxios.post(
        "/trabajadores/recursos-humanos",
        newTrabajador
      );
      
      if (!response.data.email) {
        alert("Ya tienes agregado un trabajador con ese correo.");
      } 
      
      

      onAdd(); // Llama a onAdd para actualizar la lista de trabajadores
      onClose(); // Cierra el modal después de agregar el trabajador
    } catch (error) {
      console.error("Error al agregar trabajador:", error);
    }
  };
  const handleOverlayClick = (e) => {
    // Verifica si el clic ocurrió fuera del modal-container
    if (e.target.classList.contains('modal-overlay')) {
      onClose();
    }
  };
  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-container">
        <h2>Agregar Nuevo Trabajador</h2>
        <form>
          <div className="modal-input-container">
            <label htmlFor="nombre">Nombre:</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              value={newTrabajador.nombre}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="modal-input-container">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={newTrabajador.email}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="modal-input-container">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={newTrabajador.password}
              onChange={handleInputChange}
              required
            />
          </div>

          {/* Sección de roles */}
          <div className="modal-input-container">
            <label>Roles:</label>
            <div className="roles-container">
              {roles.map((role) => (
                <label key={role}>
                  <input
                    type="checkbox"
                    checked={newTrabajador.rol.includes(role)}
                   
                    onChange={() => handleRoleChange(role)}
                  />
                  {role}
                </label>
              ))}
            </div>
          </div>

          <div className="modal-buttons">
            <button
              type="button"
              className="modal-button"
              onClick={handleAgregar}
            >
              Agregar
            </button>
            <button
              type="button"
              className="modal-button"
              onClick={onClose}
            >
              Salir
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AgregarUsuarioTrabajador;
