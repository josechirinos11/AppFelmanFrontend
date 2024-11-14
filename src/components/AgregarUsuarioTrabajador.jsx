import React, { useState } from "react";
import clienteAxios from "../config/axios"; // Importa la configuración de axios
import "../css/RecursosHumanos.css"; // Asegúrate de que los estilos sean los adecuados
import { useAuth } from '../config/AuthContext';

const AgregarUsuarioTrabajador = ({ onClose, onAdd }) => {
    const { usuario } = useAuth(); // Extraer la función login del contexto
    console.log('desde modal:  .....    ',usuario)
  const [newTrabajador, setNewTrabajador] = useState({
    "nombre" : "trabajador No 8",
    "email" : "No8@correo.com",
    "password" : "123456",
    "usuarioId": usuario.idUSER
  });
 

  // Manejar el cambio en los campos del formulario
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTrabajador((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Función para agregar trabajador al servidor
  const handleAgregar = async () => {
    try {
      const response = await clienteAxios.post(
        "/trabajadores/recursos-humanos",
        newTrabajador
      );
      console.log("Trabajador agregado:", response.data);
      onAdd(); // Llama a onAdd para actualizar la lista de trabajadores
      onClose(); // Cierra el modal después de agregar el trabajador
    } catch (error) {
      console.error("Error al agregar trabajador:", error);
    }
  };

  return (
    <div className="modal-overlay">
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
