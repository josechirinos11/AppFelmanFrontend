// NavMenu.jsx
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation  } from 'react-router-dom';
import { FaSearch, FaEllipsisV, FaChevronDown, FaChevronRight, FaBars } from 'react-icons/fa';
import { CgMenuRound } from "react-icons/cg";
import '../css/NavMenu.css'; 
import felmanImage from '../img/felman.png';
import usuarioIMG from '../img/usuario.png';
import { useAuth } from '../config/AuthContext';
import menuItems from '../config/menuItems';


const NavMenu = () => {
  const navigate = useNavigate(); // Inicializar useNavigate solo una vez
  const { logout } = useAuth();
  const UserLocalstorage = localStorage.getItem('usuario');
  // convertir a objeto lo que esta la cadena de texto
  const usuarioObjeto = UserLocalstorage ? JSON.parse(UserLocalstorage) : null;

  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isOptionsMenuOpen, setIsOptionsMenuOpen] = useState(false);
  const [openDropdowns, setOpenDropdowns] = useState<{ [key: number]: boolean }>({});

  const optionsMenuRef = useRef<HTMLDivElement | null>(null); // Referencia para el menú de opciones
  const logoRef = useRef<HTMLDivElement | null>(null); // Referencia para el logo

  const toggleProfileMenu = () => setIsProfileMenuOpen(!isProfileMenuOpen);
  const toggleOptionsMenu = () => setIsOptionsMenuOpen(!isOptionsMenuOpen);
  
  const toggleDropdown = (index: number) => {
    setOpenDropdowns((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  // Manejar la navegación a diferentes rutas según el ítem
  const handleItemBoton = (title: string, item: string) => {
    console.log('REDIRIGUIENDO COMPONENTE:', title, '-', item);
    
    switch (title) {
      case 'Recursos Humanos':
        
        navigate('/recursos-humanos', { state: { informacion: item } });
        break;
      case 'Clientes y Ventas':
        navigate('/clientes-y-ventas', { state: { informacion: item } });
        break;
      case 'Proveedores y Abastecimiento':
        navigate('/proveedores-y-abastecimiento', { state: { informacion: item } });
        break;
      case 'Productos y Servicios':
        navigate('/productos-y-servicios', { state: { informacion: item } });
        break;
      case 'Finanzas':
        navigate('/finanzas', { state: { informacion: item } });
        break;
      case 'Operaciones y Logística':
        navigate('/operaciones-y-logistica', { state: { informacion: item } });
        break;
      case 'Documentación y Cumplimiento':
        navigate('/documentacion-y-cumplimiento', { state: { informacion: item } });
        break;
      case 'Tecnología e Infraestructura':
        navigate('/tecnologia-e-infraestructura', { state: { informacion: item } });
        break;
      case 'Marketing y Relaciones Públicas':
        navigate('/marketing-y-relaciones-publicas', { state: { informacion: item } });
        break;
      case 'Gestión de Calidad':
        navigate('/gestion-de-calidad', { state: { informacion: item } });
        break;
      default:
        console.log('No hay ruta definida para este ítem.');
    }
    setIsOptionsMenuOpen(false);
  };

  
  const HandleSetting = () => {
    
    navigate('/ajustes');
   
  };

  const HandleCerrarSesion = () => {
    console.log('Cerrando sesión');
    logout();
  };
    // Efecto para cerrar el menú al hacer clic fuera de él
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        // Si el menú de opciones está abierto y el clic se hace fuera de él, ciérralo
        if (isOptionsMenuOpen && optionsMenuRef.current && !optionsMenuRef.current.contains(event.target as Node)) {
          setIsOptionsMenuOpen(false);
          setOpenDropdowns({}); // Cerrar todos los dropdowns
        }


         // Si el menú de perfil está abierto y el clic se hace fuera de él, ciérralo
    if (isProfileMenuOpen && logoRef.current && !logoRef.current.contains(event.target as Node)) {
      setIsProfileMenuOpen(false);
    }


      };
  
      // Agrega el listener
      document.addEventListener('mousedown', handleClickOutside);
      
      // Limpieza del listener al desmontar el componente
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [isOptionsMenuOpen, isProfileMenuOpen]);

  return (
    <nav className="nav-menu">
      <div className="logo" onClick={toggleProfileMenu} ref={logoRef}>
        <img src={felmanImage} alt="Logo" className="logo-image" />
        {isProfileMenuOpen && (
          <div className="profile-menu">
            <img src={usuarioIMG} alt="User" className="profile-image" />
            <p>Cargo del Usuario</p>
            <p>{usuarioObjeto?.nombreUSER}</p>
            <p>{usuarioObjeto?.emailUSER}</p>
            <button  className="felman-button" onClick={HandleSetting}>Ajustes</button>
            <button  className="felman-button" onClick={HandleCerrarSesion}>Cerrar Sesión</button>
          </div>
        )}
      </div>

      <div className="search-bar">
        <input type="text" placeholder="Buscar..." />
        <FaSearch className="search-icon custom-icon" />
      </div>

     {/* Botón de opciones con menú desplegable */}
     <div className="options-menu" ref={optionsMenuRef}> {/* Asignar la referencia aquí */}
        <FaBars onClick={toggleOptionsMenu} className="options-icon custom-icon" />
        {isOptionsMenuOpen && (
          <div className="dropdown-menu">
            {menuItems.map((menuItem, index) => (
              <div key={index} className="dropdown-item">
                <button onClick={() => toggleDropdown(index)} className="dropdown-toggle">
                  {menuItem.title} {openDropdowns[index] ? <FaChevronDown /> : <FaChevronRight />}
                </button>
                {openDropdowns[index] && (
                  <div className="sub-dropdown-menu">
                    {menuItem.items.map((item, subIndex) => (
                      <button
                        onClick={() => handleItemBoton(menuItem.title, item)}
                        key={subIndex}
                        className="sub-dropdown-item"
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavMenu;
