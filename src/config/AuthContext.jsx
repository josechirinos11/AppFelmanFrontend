// AuthContext.js
import React, { createContext, useState, useEffect, useContext  } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem('token') || null);
    const [usuario, setUsuario] = useState(null); // Nuevo estado para guardar el usuario
    const navigate = useNavigate();

    // Guardar el token y la fecha de expiración al iniciar sesión
    const login = (token, expirationInMinutes, userData) => {
        console.log("Login llamado con:", token, expirationInMinutes, userData); // Agrega este log
        const expirationDate = new Date(Date.now() + expirationInMinutes * 60000);
        localStorage.setItem('token', token);
        localStorage.setItem('tokenExpiration', expirationDate);
        localStorage.setItem('usuario', JSON.stringify(userData)); // Guardar usuario en localStorage
        setToken(token);
        
        const {nombreUSER, emailUSER, idUSER} = userData
        console.log(nombreUSER);
        console.log(emailUSER);
        console.log(idUSER);
        setUsuario({nombreUSER, emailUSER, idUSER }); // Guarda la información del usuario
        console.log("Usuario context:  ", usuario); // Agrega este log
        navigate('/mi-cuenta'); // Redirige a la página deseada
    };
        // Nueva función para actualizar el usuario
        const updateUser = (userData) => {
            setUsuario({ nombre: userData.nombre, email: userData.email });
        };
      // Log el usuario después de que se actualiza
    useEffect(() => {
        console.log("Usuario context actualizado: ", usuario);
    }, [usuario]); // Solo se ejecuta cuando 'usuario' cambia
    // Eliminar el token y limpiar el estado al cerrar sesión
    const logout = () => {
        console.log('lo ultimo que lees')
        localStorage.removeItem('token');
        localStorage.removeItem('tokenExpiration');
        localStorage.removeItem('usuario');
        setToken(null);
        setUsuario(null); // Limpia la información del usuario
        navigate('/login'); // Redirige a la página de login
    };

    // Verificar la validez del token al cargar el componente
    useEffect(() => {
        const checkTokenExpiration = () => {
            const expirationDate = new Date(localStorage.getItem('tokenExpiration'));
            if (Date.now() > expirationDate) {
                logout(); // Si el token expiró, cerrar sesión
            }
        };

        checkTokenExpiration();
    }, []);

    return (
        <AuthContext.Provider value={{ token, login, logout, usuario, updateUser }}>
            {children}
        </AuthContext.Provider>
    );
};
// Este hook personalizado facilita el uso del contexto en cualquier componente
export const useAuth = () => useContext(AuthContext);
export default AuthContext;
