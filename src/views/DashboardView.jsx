import { useState } from 'react';
import { Link } from 'react-router-dom';
import Alerta from '../components/Alerta';
import clienteAxios from '../config/axios';
import felmanImage from '../img/felman.png';

export default function DashboardView() {
    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repetirPassword, setRepetirPassword] = useState('');

    const [errorInput, setErrorInput] = useState({
        nombre: false,
        email: false,
        password: false,
        repetirPassword: false,
    });

    const [alerta, setAlerta] = useState({});

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Resetear los errores
        setErrorInput({
            nombre: false,
            email: false,
            password: false,
            repetirPassword: false,
        });

        // Verificaciones de campos vacíos
        if (nombre.trim() === '') {
            setAlerta({ msg: 'Nombre está vacío', error: true });
            setErrorInput((prev) => ({ ...prev, nombre: true }));
            return;
        }

        if (email.trim() === '') {
            setAlerta({ msg: 'Email está vacío', error: true });
            setErrorInput((prev) => ({ ...prev, email: true }));
            return;
        }

        if (password.trim() === '' || repetirPassword.trim() === '') {
            setAlerta({ msg: 'Password está vacío', error: true });
            setErrorInput((prev) => ({
                ...prev,
                password: true,
                repetirPassword: true,
            }));
            return;
        }

        if (password !== repetirPassword) {
            setAlerta({ msg: 'Los Password no son iguales', error: true });
            setErrorInput({ password: true, repetirPassword: true });
            return;
        }

        if (password.length < 6) {
            setAlerta({
                msg: 'El Password es muy corto, agrega mínimo 6 caracteres',
                error: true,
            });
            setErrorInput({ password: true, repetirPassword: true });
            return;
        }

        // Si no hay errores, limpiar alerta
        setAlerta({});

        // Crear el usuario en la API
        try {
            await clienteAxios.post('/usuarios', { nombre, email, password });
            setAlerta({
                msg: 'Creado Correctamente, revisa tu email',
                error: false,
            });
        } catch (error) {
            setAlerta({
                msg: error.response.data.msg,
                error: true,
            });
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
                    <div className="my-5">
                        <label className="uppercase text-gray-600 block text-xl font-bold">
                            Nombre
                        </label>
                        <input
                            type="text"
                            placeholder="Tu Nombre"
                            className={`${errorInput.nombre ? 'bg-red-300' : 'bg-gray-50'} border w-full p-3 mt-3 rounded-xl`}
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                        />
                    </div>

                    <div className="my-5">
                        <label className="uppercase text-gray-600 block text-xl font-bold">
                            Email
                        </label>
                        <input
                            type="email"
                            placeholder="Email de Registro"
                            className={`${errorInput.email ? 'bg-red-300' : 'bg-gray-50'} border w-full p-3 mt-3 rounded-xl`}
                            value={email}
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
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <div className="my-5">
                        <label className="uppercase text-gray-600 block text-xl font-bold">
                            Repetir Password
                        </label>
                        <input
                            type="password"
                            placeholder="Repite tu Password"
                            className={`${errorInput.repetirPassword ? 'bg-red-300' : 'bg-gray-50'} border w-full p-3 mt-3 rounded-xl`}
                            value={repetirPassword}
                            onChange={(e) => setRepetirPassword(e.target.value)}
                        />
                    </div>

                    <div className="flex justify-center">
                        <input
                            type="submit"
                            value="Crear Cuenta"
                            className="bg-red-500 w-1/2 py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-red-600"
                        />
                    </div>
                </form>

                <div className="flex justify-center">
                    {msg && <Alerta alerta={alerta} />}
                </div>

                <nav className="mt-10 lg:flex lg:justify-between">
                    <Link className="block text-center my-5 text-gray-500" to="/">
                        ¿Ya tienes una cuenta? Inicia Sesión
                    </Link>
                    <Link className="block text-center my-5 text-gray-500" to="/olvide-password">
                        Olvidé mi Password
                    </Link>
                </nav>
            </div>
        </>
    );
}
