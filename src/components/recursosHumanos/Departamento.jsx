import React, { useEffect, useState } from 'react';
import clienteAxios from '../../config/axios';
import { useLocation } from 'react-router-dom';
import './Departamento.css'; // Importa el archivo de estilos CSS
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faHandshake, faTruck, faBoxes, faMoneyBill, faTools, faFileAlt, faLaptop, faBullhorn, faCheckCircle } from '@fortawesome/free-solid-svg-icons';


const Departamento = () => {
    const location = useLocation();
    const { informacion } = location.state || {};
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            if (informacion === "Departamentos") {
                try {
                    const response = await clienteAxios.get('/departamentos/items');
                    setData(response.data);
                } catch (error) {
                    console.error("Error al obtener los datos de departamentos:", error);
                }
            }
        };

        fetchData();
    }, [informacion]);

    const handleCardClick = (submenu) => {
        alert(`Solicite permiso para accesar a ${submenu} al creador de la aplicación al correo JOSECHIRINOS11@gmail.com o al whatsapp +34 662936645, en nombre JOSE CHIRINOS.`);
    };

    const departamentos = [
        { nombre: "Recursos Humanos", icono: faUsers, submenus: ["Empleados", "Departamentos", "Roles y permisos", "Contratistas y consultores externos"] },
        { nombre: "Clientes y Ventas", icono: faHandshake, submenus: ["Clientes", "Prospectos", "Contratos y acuerdos", "Pedidos y órdenes", "Facturación y cobros"] },
        { nombre: "Proveedores y Abastecimiento", icono: faTruck, submenus: ["Proveedores", "Contratos", "Pedidos de compra", "Pagos y cuentas a pagar"] },
        { nombre: "Productos y Servicios", icono: faBoxes, submenus: ["Inventario de productos", "Servicios ofrecidos", "Gestión de precios", "Categorías y variantes"] },
        { nombre: "Finanzas", icono: faMoneyBill, submenus: ["Cuentas por cobrar", "Movimientos de caja", "Presupuestos y previsiones", "Impuestos y cumplimiento"] },
        { nombre: "Operaciones y Logística", icono: faTools, submenus: ["Inventario", "Proyectos y tareas", "Gestión de flota", "Mantenimiento de equipos"] },
        { nombre: "Documentación y Cumplimiento", icono: faFileAlt, submenus: ["Documentos legales", "Políticas de cumplimiento", "Documentación de procesos", "Registros de auditoría"] },
        { nombre: "Tecnología e Infraestructura", icono: faLaptop, submenus: ["Sistemas y plataformas", "Equipos tecnológicos", "Red de TI", "Soporte técnico"] },
        { nombre: "Marketing y Relaciones Públicas", icono: faBullhorn, submenus: ["Campañas publicitarias", "Leads y oportunidades", "Colaboradores externos", "Redes sociales"] },
        { nombre: "Gestión de Calidad", icono: faCheckCircle, submenus: ["Estándares de calidad", "Control de calidad", "Procesos de mejora continua"] },
    ];

    return (
        <div className="departamento-container">
            {departamentos.map((departamento) => (
                <div key={departamento.nombre} className="departamento-card">
                    <FontAwesomeIcon icon={departamento.icono} size="3x" className="departamento-icon" />
                    <h3 className="departamento-title">{departamento.nombre}</h3>
                    <ul className="departamento-submenu">
                        {departamento.submenus.map((submenu) => (
                            <li key={submenu} className="departamento-submenu-item" onClick={() => handleCardClick(submenu)}>
                                {submenu}
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
};

export default Departamento;