// src/components/ActualizarTrabajador.jsx
import React, { useState, useEffect } from "react";
import clienteAxios from "../config/axios";
import "../css/ActualizarTrabajador.css"
import "../css/RecursosHumanos.css"; // Asegúrate de que los estilos sean los adecuados

const ActualizarTrabajador = ({ trabajadorId, onClose, onUpdate }) => {
  const [trabajador, setTrabajador] = useState({
    nombre: "",
    email: "",
    password: "",
    identificacion: "",
    puesto: "",
    salario: "",
    telefono: "",
  });
  const [loading, setLoading] = useState(true); // Estado para manejar la carga de datos

  // Obtener los datos del trabajador para editar
  useEffect(() => {
    const fetchTrabajador = async () => {
      try {
        const response = await clienteAxios.get(`/trabajadores/recursos-humanos/${trabajadorId}`);
        const data = response.data;
  
        // Asegurar que todos los campos tengan valores válidos
        setTrabajador({
          nombre: data.nombre || "",
          email: data.email || "",
          password: "", // No cargar la contraseña
          identificacion: data.identificacion || "",
          puesto: data.puesto || "",
          salario: data.salario ? String(data.salario) : "", // Convertir salario a string
          telefono: data.telefono || "",
        });
        setLoading(false);
      } catch (error) {
        console.error("Error al obtener trabajador:", error);
      }
    };
  
    if (trabajadorId) {
      fetchTrabajador();
    }
  }, [trabajadorId]);
  

  // Manejo del formulario de actualización
  const handleChange = (e) => {
    const { name, value } = e.target;
    setTrabajador({ ...trabajador, [name]: value });
  };

  // Manejo de la actualización
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await clienteAxios.put(
        `/trabajadores/recursos-humanos/${trabajadorId}`,
        trabajador
      );
      console.log("Trabajador actualizado:", response.data);
      onUpdate(); // Llamar a la función para actualizar la lista
      onClose();  // Cerrar el modal
    } catch (error) {
      console.error("Error al actualizar trabajador:", error);
      alert("Ocurrió un error al intentar actualizar el trabajador.");
    }
  };

  if (loading) {
    return <div>Cargando...</div>; // Muestra un mensaje mientras los datos se cargan
  }

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Actualizar Trabajador</h2>
        <form onSubmit={handleUpdate}>
          <label htmlFor="nombre">
            Nombre:
            <input
              type="text"
              id="nombre"
              name="nombre"
              value={trabajador.nombre}
              onChange={handleChange}
            />
          </label>
          <label htmlFor="email">
            Email:
            <input
              type="email"
              id="email"
              name="email"
              value={trabajador.email}
              onChange={handleChange}
              autoComplete="username"
            />
          </label>
          <label htmlFor="password">
            Contraseña:
            <input
              type="password"
              id="password"
              name="password"
              value={trabajador.password}
              onChange={handleChange}
              autoComplete="new-password" // O "current-password", según el caso
            />
          </label>
          <label htmlFor="identificacion">
            Identificación:
            <input
              type="text"
              id="identificacion"
              name="identificacion"
              value={trabajador.identificacion}
              onChange={handleChange}
            />
          </label>
          <label htmlFor="puesto">
            Puesto:
            <input
              type="text"
              id="puesto"
              name="puesto"
              value={trabajador.puesto}
              onChange={handleChange}
            />
          </label>
          <label htmlFor="salario">
            Salario:
            <input
              type="number"
              id="salario"
              name="salario"
              value={trabajador.salario}
              onChange={handleChange}
            />
          </label>
          <label htmlFor="telefono">
            Teléfono:
            <input
              type="text"
              id="telefono"
              name="telefono"
              value={trabajador.telefono}
              onChange={handleChange}
            />
          </label>
          <div className="modal-buttons">
            <button type="submit">Actualizar</button>
            <button type="button" onClick={onClose}>
              Cancelar
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};

export default ActualizarTrabajador;
