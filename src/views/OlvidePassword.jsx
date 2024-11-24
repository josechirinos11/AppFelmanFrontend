import { useState, useEffect } from 'react';
import { Link, useNavigate  } from 'react-router-dom';
import Alerta from '../components/Alerta';
import clienteAxios from '../config/axios';
import felmanImage from '../img/YouApp.png';

export default function OlvidePassword() {

    const [email, setEmail] = useState('jose@jose.com');


    const [errorInput, setErrorInput] = useState({
      
        email: false,
     
    });

    const [alerta, setAlerta] = useState({});
    const [cargando, setCargando] = useState(false); // Nuevo estado para controlar la carga

//para el scroll
useEffect(() => {
    const scrollToBottom = () => {
      const totalHeight = document.body.scrollHeight; // Altura total de la página
      const scrollDuration = 2000; // 2 segundos en milisegundos

      const startPosition = window.scrollY; // Posición actual
      const distance = totalHeight - startPosition; // Distancia hasta el final
      const startTime = performance.now(); // Momento inicial

      const step = (currentTime) => { // No necesitas tipos en JSX
        const elapsed = currentTime - startTime; // Tiempo transcurrido
        const progress = Math.min(elapsed / scrollDuration, 1); // Progreso en % (máximo 1)
        const easeInOutCubic = progress < 0.5
          ? 4 * progress * progress * progress
          : 1 - Math.pow(-2 * progress + 2, 3) / 2; // Función de suavizado

        window.scrollTo(0, startPosition + distance * easeInOutCubic); // Calcula posición actual

        if (elapsed < scrollDuration) {
          requestAnimationFrame(step); // Sigue animando si no ha terminado
        }
      };

      requestAnimationFrame(step); // Inicia la animación
    };

    scrollToBottom();
  }, []);


    const handleSubmit = async (e) => {
        e.preventDefault();
                // Activar estado de carga
                setCargando(true);
        // Resetear los errores
        setErrorInput({
 
            password: false,
       
        });

        // Verificaciones de campos vacíos
  

        if (email.trim() === '') {
            setAlerta({ msg: 'Email está vacío', error: true });
            setErrorInput((prev) => ({ ...prev, email: true }));
            setCargando(false); // Desactivar carga
            return;
        }

       

        // Si no hay errores, limpiar alerta
        setAlerta({});

        // Crear el usuario en la API
        try {
            await clienteAxios.post('/usuarios/olvide-password', { email});
            setAlerta({
                msg: 'Creado Correctamente, revisa tu email',
                error: false,
            });
            console.log(clienteAxios)
        } catch (error) {
            if (!error.response) {
                // Aquí se maneja el error de red
                setAlerta({
                    msg: 'No se puede conectar al servidor. Por favor, intenta más tarde.',
                    error: true,
                });
            } else {
                // Manejo de errores que vienen de la respuesta de la API
                setAlerta({
                    msg: error.response.data.msg,
                    error: true,
                });
            }
        } finally {
            // Desactivar carga al final
            setCargando(false);
        }
    };

    const { msg } = alerta;

    return (
        <>
            <div>
                <img
                    src={felmanImage}
                    alt="Descripción de la imagen"
                    className="object-cover"
                />
                  
            </div>

            <div
                className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white relative"
                style={{ boxShadow: '0 4px 20px rgba(255, 0, 0, 0.5)' }} // Sombra roja
            >
                <form onSubmit={handleSubmit} className="mb-5">
                    
                <label
                        className="block text-4xl font-semibold italic"
                        style={{
                            color: '#e20613',           // Color rojo similar al logo
                            fontFamily: 'sans-serif',   // Fuente sans-serif
                            
                            bottom: '10px',             // Posicionado hacia la parte inferior
                            right: '10px' ,               // Posicionado hacia la derecha
                            textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)' // Sombra suave
                        }}
                    >
                        Recuperar Password
                    </label>
                    <div className="my-5">
                        <label className="uppercase text-gray-600 block text-xl font-bold">
                            Email
                        </label>
                        <input
                            type="email"
                            placeholder="Email de Registro"
                            className={`${errorInput.email ? 'bg-red-300' : 'bg-gray-50'} border w-full p-3 mt-3 rounded-xl`}
                            value={email}
                            autoComplete="username" // Agrega el atributo autoComplete
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                   

                    

                    <div className="flex justify-center">
                        <input
                            type="submit"
                            value={cargando ? 've a tu correo...' : 'Seguir'} // Cambiar el texto del botón
                            className={`bg-red-500 w-1/2 py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-red-600 ${cargando ? 'opacity-50 cursor-not-allowed' : ''}`} // Inhabilitar el botón
                            disabled={cargando} // Agregar esta línea para inhabilitar el botón
                       />
                    </div>
                </form>

                <div className="flex justify-center">
                    {msg && <Alerta alerta={alerta} />}
                </div>

                <nav className="mt-10 lg:flex lg:justify-between">
                    <Link className="block text-center my-5 text-gray-500" to="/login">
                        ¿Ya tienes una cuenta? Inicia Sesión
                    </Link>
                    <Link className="block text-center my-5 text-gray-500" to="/crear-cuenta">
                        Crear Cuenta
                    </Link>
                </nav>
            </div>
        </>
    );
}
