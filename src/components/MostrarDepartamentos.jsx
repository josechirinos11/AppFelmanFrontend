import React, { useState, useEffect } from "react";
import clienteAxios from "../config/axios";
import { useAuth } from "../config/AuthContext";

const MostrarDepartamentos = () => {
  const {setDepartamentoUSER, departamentosUSER, usuario } = useAuth(); // Extraer del contexto
  const [departamentosUsuarioBD, setDepartamentoUsuarioBD] = useState([]);

  // Cargar datos iniciales
  useEffect(() => {
    const fetchTrabajador = async () => {
      try {
        const response = await clienteAxios.get(
          `/usuarios/recursos-humanos/${usuario.idUSER}`
        );
        const data = response.data;

        if (data) {
          setDepartamentoUsuarioBD(data.departamentos);
        } else {
          console.error("No se encontró trabajador");
        }
      } catch (error) {
        console.error("Error al obtener trabajador:", error);
      }
    };

    fetchTrabajador();
  }, [usuario.idUSER]);

  // Manejar selección de categorías
  const handleCategoriaChange = (title) => {
    setDepartamentoUsuarioBD((prevDepartamentos) =>
      prevDepartamentos.map((categoria) =>
        categoria.title === title
          ? {
              ...categoria,
              items: categoria.items.map((item) => ({
                ...item,
                active: !categoria.items.some((item) => item.active), // Alterna todos los items
              })),
            }
          : categoria
      )
    );
  };

  // Manejar selección de items
  const handleItemChange = (categoriaTitle, itemId) => {
    setDepartamentoUsuarioBD((prevDepartamentos) =>
      prevDepartamentos.map((categoria) =>
        categoria.title === categoriaTitle
          ? {
              ...categoria,
              items: categoria.items.map((item) =>
                item._id === itemId ? { ...item, active: !item.active } : item
              ),
            }
          : categoria
      )
    );
  };

  const actualizarDepartamentos = async () => {
    console.log(departamentosUsuarioBD)
    
    setDepartamentoUSER(departamentosUsuarioBD)
            localStorage.setItem('departamentos', JSON.stringify(departamentosUsuarioBD)); // Guarda en localStorage

   
    try {
      const response = await clienteAxios.put(
        `/usuarios/recursos-humanos/departamentos/${usuario.idUSER}`,
        departamentosUsuarioBD
      );
      console.log("Datos actualizado:", response.data);
     
   
    } catch (error) {
      console.error("Error al actualizar trabajador:", error);
      alert("Ocurrió un error al intentar actualizar el trabajador.");
    }

    window.location.reload()

  }

  return (
    <div>
      <h2>Departamentos a Gestionar</h2>
      <form className="form-container">
        {departamentosUsuarioBD.map((categoria) => (
          <div key={categoria._id} style={{ marginBottom: "20px" }}>
            <label>
              <input
                type="checkbox"
                checked={categoria.items.some((item) => item.active)}
                onChange={() => handleCategoriaChange(categoria.title)}
              />
              {categoria.title}
            </label>
            <div style={{ marginLeft: "20px" }}>
              {categoria.items.map((item) => (
                <label key={item._id} style={{ display: "block" }}>
                  <input
                    type="checkbox"
                    checked={item.active}
                    onChange={() =>
                      handleItemChange(categoria.title, item._id)
                    }
                  />
                  {item.name}
                </label>
              ))}
            </div>
          </div>
        ))}
        <button
          className="recursos-button"
          type="button"
          onClick={actualizarDepartamentos}
        >
          Actualizar
        </button>
      </form>
    </div>
  );
};

export default MostrarDepartamentos;
