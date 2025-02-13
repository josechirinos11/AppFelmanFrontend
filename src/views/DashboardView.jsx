
import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../config/AuthContext';

import felmanImage from '../img/logoReact.png';

export default function DashboardView() {
    const { token } = useContext(AuthContext);

    const navigate = useNavigate();

    useEffect(() => {
        // Leer el token desde localStorage al cargar el componente
       
        
        // Si el token existe, redirige al usuario a la página privada
        if (token) {
            navigate('/mi-cuenta'); // Ajusta la ruta según tus necesidades
        } else {
            // Si no hay token, puedes redirigir al usuario a la página de login o hacer algo más
            navigate('/crear-cuenta');
        }
    }, [token, navigate]);



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
                
                <div className="mt-10 flex justify-center">
                    <iframe
                        width="560"
                        height="315"
                        src="https://www.youtube.com/embed/MyWfatHnzNg?autoplay=1&controls=0&showinfo=0&loop=1&playlist=MyWfatHnzNg"
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
        
                    ></iframe>
                </div>
              

                <nav className="mt-10 lg:flex lg:justify-between">
                    <Link className="block font-bold text-center my-5 text-gray-900" to="/login">
                        ¿Ya tienes una cuenta? Inicia Sesión
                    </Link>
                    <Link className="block font-bold text-center my-5 text-gray-900" to="/crear-cuenta">
                        Crear Cuenta
                    </Link>
                </nav>
            </div>
        </>
    );
}
