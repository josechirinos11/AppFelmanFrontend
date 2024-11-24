import React, { useState, useEffect } from "react";
import clienteAxios from "../config/axios";
import "../css/ActualizarTrabajador.css";
import "../css/RecursosHumanos.css";
import { useAuth } from "../config/AuthContext";

const ActualizarTrabajador = ({ trabajadorId, onClose, onUpdate }) => {
  const { setDepartamentoUSER } = useAuth(); // Extraer la función login del contexto
  const [campos, setCampos] = useState([]); // Campos del modelo
  const [trabajador, setTrabajador] = useState({}); // Datos del trabajador
  const [loading, setLoading] = useState(true); // Estado para manejar la carga de datos


    // Lista de roles disponibles
    const roles = [
      "Recursos Humanos",
      "Clientes y Ventas",
      "Proveedores y Abastecimiento",
      "Productos y Servicios",
      "Finanzas",
      "Operaciones y Logística",
      "Documentación y Cumplimiento",
      "Tecnología e Infraestructura",
      "Marketing y Relaciones Públicas",
      "Gestión de Calidad",
    ];

  // Obtener los campos del modelo
  useEffect(() => {
    const fetchCampos = async () => {
      try {
        const response = await clienteAxios.get("/trabajadores/campos");
        setCampos(response.data); // Guardar los campos en el estado
        console.log(response.data); // Guardar los campos en el estado
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
        const { departamentos, ...restoDeCamposActualizado } = restoDeCampos;
        setTrabajador(restoDeCamposActualizado); // Establecer solo los campos requeridos
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

  // Manejo de cambios en los checkboxes de roles
  const handleRoleChange = (role) => {
    setTrabajador((prev) => {
      const currentRoles = prev.rol || [];
      const isRoleSelected = currentRoles.includes(role);

      // Agregar o quitar el rol según su estado
      const updatedRoles = isRoleSelected
        ? currentRoles.filter((r) => r !== role)
        : [...currentRoles, role];

      return { ...prev, rol: updatedRoles };
    });
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
  const handleOverlayClick = (e) => {
    // Verifica si el clic ocurrió fuera del modal-container
    if (e.target.classList.contains('modal')) {
      onClose(); // Cerrar el modal
    }
  };

  return (
    <div className="modal"  onClick={handleOverlayClick}>
      <div className="modal-content">
        <h2>Actualizar Trabajador</h2>
        <form onSubmit={handleUpdate}>
          {campos
            .filter((campo) => campo !== "departamentos") // Excluye 'Departamentos'
            .map((campo) => (
              <div key={campo}>
                {campo === "rol" ? ( // Si el campo es "rol", mostrar checkboxes
                  <div>
                    <label>Roles:</label>
                    <div className="roles-container">
                      {roles.map((role) => (
                        <label key={role}>
                          <input
                            type="checkbox"
                            checked={trabajador.rol?.includes(role) || false}
                            onChange={() => handleRoleChange(role)}
                          />
                          {role}
                        </label>
                      ))}
                    </div>
                  </div>
                ) : (
                  // Otros campos como input text
                  <label htmlFor={campo}>
                    {campo.charAt(0).toUpperCase() + campo.slice(1)}:
                    <input
                      type="text"
                      id={campo}
                      name={campo}
                      value={trabajador[campo] || ""}
                      onChange={handleChange}
                    />
                  </label>
                )}
              </div>
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