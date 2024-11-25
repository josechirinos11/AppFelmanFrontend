// AuthContext.js
import React, { createContext, useState, useEffect, useContext  } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
     // Estado para seleccionar el color de fondo
     const [vista, setVista] = useState('moderno'); // Por defecto, "claro"
    const [token, setToken] = useState(localStorage.getItem('token') || null);
    const [usuario, setUsuario] = useState(() => {
        const storedUsuario = localStorage.getItem('usuario');
        return storedUsuario ? JSON.parse(storedUsuario) : null;
    });

    const [departamentosUSER, setDepartamentoUSER] = useState([])
    
    const navigate = useNavigate();

    // Guardar el token y la fecha de expiración al iniciar sesión
    const login = (token, expirationInMinutes, userData) => {
       
        const expirationDate = new Date(Date.now() + expirationInMinutes * 60000);
        localStorage.setItem('token', token);
        localStorage.setItem('tokenExpiration', expirationDate);
        localStorage.setItem('usuario', JSON.stringify(userData)); // Guardar usuario en localStorage
        setToken(token);
        
        if (userData) {
            const { nombreUSER, emailUSER, idUSER, rolUSER, dptoUSER } = userData;

            // recreamos los departamentos de acuerdo a los roles del usuario
            const actualizarDepartamentos = (rolUSER, dptoUSER) => {
                // Mapeamos los departamentos
                return dptoUSER.map(depto => {
                  // Si el title del departamento está en los roles del usuario, actualizamos sus items
                  if (rolUSER.includes(depto.title)) {
                    return {
                      ...depto,
                      items: depto.items.map(item => ({
                        ...item,
                        active: true,  // Activamos todos los items si el título está en los roles
                      })),
                    };
                  }
              
                  // Si el title no está en los roles, dejamos los items desactivados
                  return {
                    ...depto,
                    items: depto.items.map(item => ({
                      ...item,
                      active: false, // Desactivamos los items si el título no está en los roles
                    })),
                  };
                });
              };
              const resultado = actualizarDepartamentos(rolUSER, dptoUSER);

              console.log(resultado)
              // guardamos los resultados en usuario
            setUsuario({ nombreUSER, emailUSER, idUSER, rolUSER, dptoUSER, resultado });
            
          } else {
            console.error("userData no está definido.");
          }
       
        
        
        navigate('/mi-cuenta'); // Redirige a la página deseada
    };
        // Nueva función para actualizar el usuario
        const updateUser = (userData) => {
            setUsuario({ nombre: userData.nombre, email: userData.email, rol: userData.rol, departamentos: userData.departamentos });
        };
    

    useEffect(() => {
        if (usuario) {
            localStorage.setItem('usuario', JSON.stringify(usuario));
        }
        
    }, [usuario]); // Solo se ejecuta cuando 'usuario' cambia



    // Eliminar el token y limpiar el estado al cerrar sesión
    const logout = () => {
        console.log('Se hace LOGOUT')
        localStorage.removeItem('token');
        localStorage.removeItem('tokenExpiration');
        localStorage.removeItem('usuario');
        localStorage.removeItem('departamentos');
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
        <AuthContext.Provider value={{
            
            token,
            login,
            logout,
            usuario, 
            updateUser, 
            setDepartamentoUSER, 
            departamentosUSER,
            vista,
            setVista
             }}>
            {children}
        </AuthContext.Provider>
    );
};
// Este hook personalizado facilita el uso del contexto en cualquier componente
export const useAuth = () => useContext(AuthContext);
export default AuthContext;
