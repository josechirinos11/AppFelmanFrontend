import { useState, useEffect } from "react";
import clienteAxios from "../config/axios";
import menuItems from "../config/menuItems";
import { useAuth } from '../config/AuthContext';
import ActualizarTrabajador from "../components/ActualizarTrabajador";
import MostrarDepartamentos from "../components/MostrarDepartamentos";
import "../css/global.css"

export default function Ajustes() {
  const { departamentosUSER, vista, setVista, usuario } = useAuth(); // Extraer la vista del contexto
  const UserLocalstorage = localStorage.getItem("usuario");
  const usuarioObjeto = UserLocalstorage ? JSON.parse(UserLocalstorage) : null;
  const [departamentos, setDepartamentos] = useState([]);
  const [formDatosCuenta, setFormDatosCuenta] = useState({
    nombreUSER: usuarioObjeto?.nombreUSER || "",
    emailUSER: usuarioObjeto?.emailUSER || "",
  });
  const [categoriasSeleccionadas, setCategoriasSeleccionadas] = useState({});
  const [campos, setCampos] = useState([])
  const [trabajador, setTrabajador] = useState({})
  const [departamentosUsuarioBD,setDepartamentoUsuarioBD] = useState([])

  


 



  useEffect(() => {

    const fetchData = async () => {
      try {
        const response = await clienteAxios.get("/trabajadores/campos");
        setCampos(response.data);
     
      } catch (error) {
        console.error("Error al obtener los campos del modelo:", error);
      }
    };

    const fetchTrabajador = async () => {
      try {
        const response = await clienteAxios.get(`/usuarios/recursos-humanos/${usuario.idUSER}`);
        const data = response.data;

        if (data) {
          setDepartamentoUsuarioBD(data.departamentos)

         
          
          const { password, ...restoDeCampos } = data;
          const { departamentos, ...restoDeCamposActualizado } = restoDeCampos;
          setTrabajador(restoDeCamposActualizado); // Establecer solo los campos requeridos
          
        } else {
          console.error("No se encontró trabajador");
        }
      } catch (error) {
        console.error("Error al obtener trabajador:", error);
      }
    };

    fetchData();
    fetchTrabajador()
    
  }, []);  // Sincronización de la carga de campos


  // Aplicar el tema al cambiar 'vista'
  useEffect(() => {
    const temaVariables = {
      claro: {
        '--bg-color': 'var(--bg-color-claro)',
        '--bg-2doPiso':'var(--bg-2doPiso-claro)',
        '--bg-3erPiso':'var(--bg-3erPiso-claro)',
        '--bg-4toPiso':'var(--bg-4toPiso-claro)',
        '--color-text':'var(--color-text-claro)',
        '--bg-recursos-container': 'var(--bg-2doPiso-claro)',
        '--form-bg': 'var(--form-bg-claro)',
        '--form-border': 'var(--form-border-claro)',
        '--form-text': 'var(--form-text-claro)',
        '--c-b': 'var(--c-b-claro)',
        '--c-shadow': 'var(--c-shadow-claro)',
        '--c-primary':'var(--c-primary-claro)',
        '--c-primary-hover':'var(--c-primary-hover-claro)',
        '--text-color':'var(--text-color-claro)',
      },
      oscuro: {
        '--bg-color': 'var(--bg-color-oscuro)',
        '--bg-recursos-container': 'var(--bg-2doPiso-oscuro)',
        '--bg-2doPiso':'var(--bg-2doPiso-oscuro)',
        '--bg-3erPiso':'var(--bg-3erPiso-oscuro)',
        '--bg-4toPiso':'var(--bg-4toPiso-oscuro)',
        '--color-text':'var(--color-text-oscuro)',
        '--form-bg': 'var(--form-bg-oscuro)',
        '--form-border': 'var(--form-border-oscuro)',
        '--form-text': 'var(--form-text-oscuro)',
        '--c-b': 'var(--c-b-oscuro)',
        '--c-shadow': 'var(--c-shadow-oscuro)',
        '--c-primary':'var(--c-primary-oscuro)',
        '--c-primary-hover':'var(--c-primary-hover-oscuro)',
        '--text-color':'var(--text-color-oscuro)',
       
      },
      moderno: {
        '--bg-color': 'var(--bg-3erPiso-moderno)',
        '--bg-recursos-container': 'var(--bg-2doPiso-moderno)',
        '--bg-2doPiso':'var(--bg-2doPiso-moderno)',
        '--bg-3erPiso':'var(--bg-3erPiso-moderno)',
        '--bg-4toPiso':'var(--bg-4toPiso-moderno)',
        '--color-text':'var(--color-text-moderno)',
        '--form-bg': 'var(--form-bg-moderno)',
        '--form-border': 'var(--form-border-moderno)',
        '--form-text': 'var(--form-text-moderno)',
        '--c-b': 'var(--c-b-moderno)',
        '--c-shadow': 'var(--c-shadow-moderno)',
        '--c-primary':'var(--c-primary-moderno)',
        '--c-primary-hover':'var(--c-primary-hover-moderno)',
        '--text-color':'var(--text-color-moderno)',
      },
    };

    const variables = temaVariables[vista];
    if (variables) {
      for (const [variable, valor] of Object.entries(variables)) {
        document.documentElement.style.setProperty(variable, valor);
      }
    }
  }, [vista]); // Aplica el tema cuando 'vista' cambia

  // Función para actualizar datos de cuenta
// Manejo del formulario de actualización


  // Función para manejar el cambio de tema
  const handleVistaChange = (e) => {
    setVista(e.target.value); // Actualiza el estado de vista con la opción seleccionada
  };

  


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
        `/usuarios/recursos-humanos/${usuario.idUSER}`,
        trabajador
      );
      console.log("Trabajador actualizado:", response.data);
      alert("Se actualizaron los datos.");
   
    } catch (error) {
      console.error("Error al actualizar trabajador:", error);
      alert("Ocurrió un error al intentar actualizar el trabajador.");
    }
  };

  return (
    <div className="recursos-container ">
      <h1 className="recursos-title">Ajustes</h1>

      {/* Formulario Datos de Cuenta */}
      <div className="actualizar-modal ">

       
        <form className="form-container" onSubmit={handleUpdate}>
        <h2>Datos de Cuenta</h2>
          {campos
            .filter(campo => campo !== 'departamentos')  // Excluye 'departamentos'
            .map((campo) => (
              <label htmlFor={campo} key={campo}>
                {campo.charAt(0).toUpperCase() + campo.slice(1)}:
                <input
                  type="text"
                  id={campo}
                  name={campo}
                  value={trabajador[campo] || ""}
                  onChange={handleChange}
                  className={`input ${['Confirmado', 'Rol'].includes(campo.charAt(0).toUpperCase() + campo.slice(1)) ? 'input-disabled' : ''}`}
                  disabled={['Confirmado', 'Rol'].includes(campo.charAt(0).toUpperCase() + campo.slice(1))}

                />
              </label>
            ))}



          <button
            className="recursos-button"
           type="submit"
          
          >
            Actualizar
          </button>
        </form>
      </div>

      {/* Formulario Vista */}
      <form className="form-container ">
        <h2>Vista</h2>
        <div className="form-group">
          {["claro", "oscuro", "moderno"].map((tema) => (
            <label key={tema}>
              <input
                type="radio"
                value={tema}
                checked={vista === tema}
                onChange={handleVistaChange} // Actualiza el estado con la opción seleccionada
              />
              {tema.charAt(0).toUpperCase() + tema.slice(1)}
            </label>
          ))}
        </div>
      </form>

      {/* Formulario Departamentos a Gestionar */}
      {usuario?.rolUSER[0] === "Administrador" ? <MostrarDepartamentos /> : <h1>No eres administrado</h1>}
     
    </div>
  );
}
