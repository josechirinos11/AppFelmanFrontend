// NavMenu.jsx
import React, { useState } from 'react';
import { FaSearch, FaEllipsisV } from 'react-icons/fa'; // Importa los íconos necesarios
import '../css/NavMenu.css'; // Para estilos personalizados
import felmanImage from '../img/felman.png';
import usuarioIMG from '../img/usuario.png'
import { useAuth } from '../config/AuthContext';

const NavMenu = () => {
  const { logout } = useAuth(); // Extraer la función login del contexto
  const UserLocalstorage = localStorage.getItem('usuario')
// Convertir la cadena JSON de nuevo a un objeto
const usuarioObjeto = UserLocalstorage ? JSON.parse(UserLocalstorage) : null;
console.log(usuarioObjeto)

  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isOptionsMenuOpen, setIsOptionsMenuOpen] = useState(false);

  // Funciones para abrir/cerrar los menús
  const toggleProfileMenu = () => setIsProfileMenuOpen(!isProfileMenuOpen);
  const toggleOptionsMenu = () => setIsOptionsMenuOpen(!isOptionsMenuOpen);


  const HandleCerrarSesion = () => {
    console.log('Cerrarndo sesion')
    logout()
    
};

  return (
    <nav className="nav-menu ">
      {/* Logo con menú desplegable */}

 
      <div className="logo" onClick={toggleProfileMenu}>
        <img src={felmanImage} alt="Logo" className="logo-image" />
        {isProfileMenuOpen && (
          <div className="profile-menu">
            <img src={usuarioIMG} alt="User" className="profile-image" />
            <p>Cargo del Usuario</p>
            <p>{usuarioObjeto.nombreUSER}</p>
            <p>{usuarioObjeto.emailUSER}</p>
            <button>Setting</button>
            <button onClick={HandleCerrarSesion}>Cerrar Sesion</button>
          </div>
        )}
      </div>

      {/* Barra de búsqueda */}
      <div className="search-bar">
        <input type="text" placeholder="Buscar..." />
        <FaSearch className="search-icon" />
      </div>

      {/* Botón de opciones con menú desplegable */}
      <div className="options-menu">
        <FaEllipsisV onClick={toggleOptionsMenu} className="options-icon" />
        {isOptionsMenuOpen && (
          <div className="dropdown-menu">
            <button>Item 1</button>
            <button>Item 2</button>
            <button>Item 3</button>
            <button>Item 4</button>
            <button>Item 5</button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavMenu;
