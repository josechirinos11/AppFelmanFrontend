import React, { useState, useEffect } from "react";
import clienteAxios from "../config/axios";
import "../css/ActualizarTrabajador.css";
import "../css/RecursosHumanos.css";

const ActualizarTrabajador = ({ trabajadorId, onClose, onUpdate }) => {
  const [campos, setCampos] = useState([]); // Campos del modelo
  const [trabajador, setTrabajador] = useState({}); // Datos del trabajador
  const [loading, setLoading] = useState(true); // Estado para manejar la carga de datos

  // Obtener los campos del modelo
  useEffect(() => {
    const fetchCampos = async () => {
      try {
        const response = await clienteAxios.get("/trabajadores/campos");
        setCampos(response.data); // Guardar los campos en el estado
      } catch (error) {
        console.error("Error al obtener los campos del modelo:", error);
      }
    };

    const fetchTrabajador = async () => {
      try {
        const response = await clienteAxios.get(
          `/trabajadores/recursos-humanos/${trabajadorId}`
        );
        const data = response.data;

        // Eliminar el campo `password` del objeto antes de establecer el estado
        const { password, ...restoDeCampos } = data;
  
        setTrabajador(restoDeCampos); // Establecer solo los campos requeridos
      } catch (error) {
        console.error("Error al obtener trabajador:", error);
      }
    };

    if (trabajadorId) {
      fetchCampos();
      fetchTrabajador();
      setLoading(false);
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
      onClose(); // Cerrar el modal
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
          {campos.map((campo) => (
            <label htmlFor={campo} key={campo}>
              {campo.charAt(0).toUpperCase() + campo.slice(1)}:
              <input
                type="text"
                id={campo}
                name={campo}
                value={trabajador[campo] || ""}
                onChange={handleChange}
              />
            </label>
          ))}
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
