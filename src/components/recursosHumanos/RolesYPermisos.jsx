import React from 'react';
import './RolesYPermisos.css'; // Importa el archivo de estilos CSS
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserShield, faHandshake, faTruck, faBoxes, faMoneyBill, faTools, faFileAlt, faLaptop, faBullhorn, faCheckCircle } from '@fortawesome/free-solid-svg-icons';

const RolesYPermisos = () => {

    const handleCardClick = (rol) => {
        alert(`Solicite permiso para accesar a ${rol} al creador de la aplicación al correo JOSECHIRINOS11@gmail.com o al whatsapp +34 662936645, en nombre JOSE CHIRINOS.`);
    };

    const roles = [
        { nombre: 'Recursos Humanos', icono: faUserShield },
        { nombre: 'Clientes y Ventas', icono: faHandshake },
        { nombre: 'Proveedores y Abastecimiento', icono: faTruck },
        { nombre: 'Productos y Servicios', icono: faBoxes },
        { nombre: 'Finanzas', icono: faMoneyBill },
        { nombre: 'Operaciones y Logística', icono: faTools },
        { nombre: 'Documentación y Cumplimiento', icono: faFileAlt },
        { nombre: 'Tecnología e Infraestructura', icono: faLaptop },
        { nombre: 'Marketing y Relaciones Públicas', icono: faBullhorn },
        { nombre: 'Gestión de Calidad', icono: faCheckCircle }
    ];

    return (
        <div className="roles-container">
            {roles.map((rol) => (
                <div key={rol.nombre} className="rol-card" onClick={() => handleCardClick(rol.nombre)}>
                    <FontAwesomeIcon icon={rol.icono} size="3x" className="rol-icon" />
                    <h3 className="rol-title">{rol.nombre}</h3>
                </div>
            ))}
        </div>
    );
};

export default RolesYPermisos;