import { useState, useEffect } from "react";
import clienteAxios from "../config/axios";
import menuItems from "../config/menuItems";
import { useAuth } from '../config/AuthContext';



export default function Ajustes() {
  const UserLocalstorage = localStorage.getItem("usuario");
  const usuarioObjeto = UserLocalstorage ? JSON.parse(UserLocalstorage) : null;
  const { usuario } = useAuth(); // Extraer la función login del contexto
  const usuarioContexto = usuario || JSON.parse(localStorage.getItem('usuario'));

  // Estado del formulario
  const [formDatosCuenta, setFormDatosCuenta] = useState({
    nombreUSER: usuarioObjeto?.nombreUSER || "",
    emailUSER: usuarioObjeto?.emailUSER || "",
  });

  // Estados para Vista y Departamentos
  const [vista, setVista] = useState("claro");
  const [categoriasSeleccionadas, setCategoriasSeleccionadas] = useState({});
  const [itemsSeleccionados, setItemsSeleccionados] = useState({});

  // Sincronización inicial con localStorage
  useEffect(() => {
    // buscamos informacion del usuario y



    if (usuarioObjeto) {
      setFormDatosCuenta({
        nombreUSER: usuarioObjeto.nombreUSER,
        emailUSER: usuarioObjeto.emailUSER,
      });

      // Inicializa categoriasSeleccionadas con false para todas las categorías
      const initialCategoriasSeleccionadas = menuItems.reduce((acc, categoria) => {
        acc[categoria.title] = true; // Por defecto, todas las categorías no están seleccionadas
        return acc;
      }, {});
      setCategoriasSeleccionadas(initialCategoriasSeleccionadas);
    }
  }, []);

  // Funciones para actualizar
  const actualizarDatosCuenta = async () => {
    if (!formDatosCuenta.nombreUSER || !formDatosCuenta.emailUSER) {
      alert("Todos los campos son obligatorios");
      return;
    }

    try {
      await clienteAxios.put("/api/usuario", formDatosCuenta);
      alert("Datos de cuenta actualizados correctamente");
    } catch (error) {
      console.error(error);
      alert("Hubo un error al actualizar los datos de cuenta");
    }
  };

  const actualizarVista = () => {
    alert(`Vista actualizada a: ${vista}`);
  };

  const actualizarDepartamentos = () => {
    const seleccionados = Object.keys(itemsSeleccionados).reduce(
      (acc, categoria) => [
        ...acc,
        ...itemsSeleccionados[categoria].map((item) => `${categoria}: ${item}`),
      ],
      []
    );
    alert(`Departamentos seleccionados:\n${seleccionados.join("\n")}`);
  };

  // Manejar selección de categorías
  const handleCategoriaChange = (title) => {
    setCategoriasSeleccionadas((prevState) => {
      const newState = { ...prevState };
      newState[title] = !newState[title];  // Alterna el estado de la categoría
      return newState;
    });
  };

  // Manejar selección de items
  const handleItemChange = (title, item) => {
    setItemsSeleccionados((prevState) => {
      const items = prevState[title] || [];
      const newItems = items.includes(item)
        ? items.filter((i) => i !== item) // Si ya está, lo elimina
        : [...items, item]; // Si no está, lo agrega

      const newState = {
        ...prevState,
        [title]: newItems,
      };

      // Después de actualizar los items, verificamos si la categoría debe marcarse o desmarcarse
      setCategoriasSeleccionadas((prevCategoriaState) => {
        const updatedCategorias = { ...prevCategoriaState };
        updatedCategorias[title] = newItems.length > 0; // Si hay items seleccionados, marcar la categoría
        return updatedCategorias;
      });

      return newState;
    });
  };

  return (
    <div className="recursos-container">
      <h1 className="recursos-title">Ajustes</h1>

      {/* Formulario Datos de Cuenta */}
      <div>
        <h2>Datos de Cuenta</h2>
        <form>
          <label>Nombre</label>
          <input
            type="text"
            value={formDatosCuenta.nombreUSER}
            onChange={(e) =>
              setFormDatosCuenta({ ...formDatosCuenta, nombreUSER: e.target.value })
            }
            className="recursos-input"
          />
          <label>Email</label>
          <input
            type="email"
            value={formDatosCuenta.emailUSER}
            onChange={(e) =>
              setFormDatosCuenta({ ...formDatosCuenta, emailUSER: e.target.value })
            }
            className="recursos-input"
          />
          <button
            className="recursos-button"
            type="button"
            onClick={actualizarDatosCuenta}
          >
            Actualizar
          </button>
        </form>
      </div>

      {/* Formulario Vista */}
      <form className="form-container">
        <h2>Vista</h2>
        <div className="form-group">
          {["claro", "oscuro", "moderno"].map((tema) => (
            <label key={tema}>
              <input
                type="radio"
                value={tema}
                checked={vista === tema}
                onChange={(e) => setVista(e.target.value)}
              />
              {tema.charAt(0).toUpperCase() + tema.slice(1)}
            </label>
          ))}
        </div>
        <button
          type="button"
          className="recursos-button"
          onClick={actualizarVista}
        >
          Actualizar
        </button>
      </form>

      {/* Formulario Departamentos a Gestionar */}
      <div>
        <h2>Departamentos a Gestionar</h2>
        <form>
          {/* Mapeo de Categorías */}
          {menuItems.map((categoria) => (
            <div key={categoria.title} style={{ marginBottom: "20px" }}>
              <label>
                <input
                  type="checkbox"
                  checked={!!categoriasSeleccionadas[categoria.title]}
                  onChange={() => handleCategoriaChange(categoria.title)}
                />
                {categoria.title}
              </label>

              {/* Mapeo de Items cuando la Categoría está seleccionada */}
              {categoriasSeleccionadas[categoria.title] && (
                <div style={{ marginLeft: "20px" }}>
                  {categoria.items.map((item) => (
                    <label key={item} style={{ display: "block" }}>
                      <input
                        type="checkbox"
                        checked={itemsSeleccionados[categoria.title]?.includes(item)}
                        onChange={() => handleItemChange(categoria.title, item)}
                      />
                      {item}
                    </label>
                  ))}
                </div>
              )}
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
    </div>
  );
}