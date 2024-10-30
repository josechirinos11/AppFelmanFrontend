import { useState } from 'react';
import { Link, useNavigate  } from 'react-router-dom';
import Alerta from '../components/Alerta';
import clienteAxios from '../config/axios';
import felmanImage from '../img/felman.png';

export default function Login() {
 
    const [email, setEmail] = useState('jose@jose.com');
    const [password, setPassword] = useState('123456');
   

    const [errorInput, setErrorInput] = useState({
     
        email: false,
        password: false,
      
    });

    const [alerta, setAlerta] = useState({});
    const [cargando, setCargando] = useState(false); // Nuevo estado para controlar la carga
    const navigate = useNavigate(); // Inicializar useNavigate

    const handleSubmit = async (e) => {
        e.preventDefault();
                // Activar estado de carga
                setCargando(true);
        // Resetear los errores
        setErrorInput({
           
            email: false,
            password: false,
           
        });

        // Verificaciones de campos vacíos
      

        if (email.trim() === '') {
            setAlerta({ msg: 'Email está vacío', error: true });
            setErrorInput((prev) => ({ ...prev, email: true }));
            setCargando(false); // Desactivar carga
            return;
        }
        if (password.trim() === '') {
            setAlerta({ msg: 'Password está vacío', error: true });
            setErrorInput((prev) => ({
                ...prev,
                password: true,
                repetirPassword: true,
            }));
            setCargando(false); // Desactivar carga
            return;
        }

        

     


        // Si no hay errores, limpiar alerta
        setAlerta({});

        // Crear el usuario en la API
        try {
            await clienteAxios.post('/usuarios/login', { email, password });
            setAlerta({
                msg: 'Cargando datos...............',
                error: false,
            });
           
                navigate('/'); // Cambiar a la ruta de inicio de sesión
           
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
                            right: '10px',               // Posicionado hacia la derecha
                            textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)' // Sombra suave
                        }}
                    >
                        login
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

                    <div className="my-5">
                        <label className="uppercase text-gray-600 block text-xl font-bold">
                            Password
                        </label>
                        <input
                            type="password"
                            placeholder="Tu Password"
                            className={`${errorInput.password ? 'bg-red-300' : 'bg-gray-50'} border w-full p-3 mt-3 rounded-xl`}
                            value={password}
                            autoComplete="new-password"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>



                    <div className="flex justify-center">
                        <input
                            type="submit"
                            value={cargando ? 'Cargando datos...' : 'Iniciar Sesion'} // Cambiar el texto del botón
                            className={`bg-red-500 w-1/2 py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-red-600 ${cargando ? 'opacity-50 cursor-not-allowed' : ''}`} // Inhabilitar el botón
                            disabled={cargando} // Agregar esta línea para inhabilitar el botón
                       />
                    </div>
                </form>

                <div className="flex justify-center">
                    {msg && <Alerta alerta={alerta} />}
                </div>

                <nav className="mt-10 lg:flex lg:justify-between">
                    <Link className="block text-center my-5 text-gray-500" to="/crear-cuenta">
                        Crear Cuenta
                    </Link>
                    <Link className="block text-center my-5 text-gray-500" to="/olvide-password">
                        Olvidé mi Password
                    </Link>
                </nav>
            </div>
        </>
    );
}
