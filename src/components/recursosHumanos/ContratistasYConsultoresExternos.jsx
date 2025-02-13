import React, { useState, useRef, useEffect } from 'react';
import './ContratistasYConsultoresExternos.css';

const ContratistasYConsultoresExternos = () => {
    const [modalInfo, setModalInfo] = useState(null);
    const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });
    const listRef = useRef(null);

    const handleItemMouseOver = (contratista, index) => {
        setModalInfo(contratista);

        if (listRef.current) {
            const item = listRef.current.children[index];
            if (item) {
                const rect = item.getBoundingClientRect();
                const top = rect.top + window.scrollY; // Ajusta la posición vertical
                const left = rect.right + 10; // Ajusta la posición horizontal (a la derecha del elemento)

                setModalPosition({ top, left });
            }
        }
    };


    const handleItemMouseOut = () => {
        setModalInfo(null);
    };

    const handleModalClick = (nombre, pais, ciudad) => {
        alert(`Solicite permiso para accesar a la información de ${nombre} (Dirección: ${ciudad}, ${pais}) al creador de la aplicación al correo JOSECHIRINOS11@gmail.com o al whatsapp +34 662936645, en nombre JOSE CHIRINOS.`);
    };

    const contratistas = [
        { nombre: "ArcelorMittal España", pais: "España", ciudad: "Asturias" },
        { nombre: "Acerinox", pais: "España", ciudad: "Cádiz" },
        { nombre: "Sidenor", pais: "España", ciudad: "Cantabria" },
        { nombre: "Megasa Siderúrgica", pais: "España", ciudad: "Galicia" },
        { nombre: "Grupo Gonvarri", pais: "España", ciudad: "Navarra" },
        { nombre: "Gestamp", pais: "España", ciudad: "País Vasco" },
        { nombre: "Hierros y Aceros de Asturias", pais: "España", ciudad: "Asturias" },
        { nombre: "Fundiciones del Estanda", pais: "España", ciudad: "Vizcaya" },
        { nombre: "La Farga Lacambra", pais: "España", ciudad: "Barcelona" },
        { nombre: "Metalúrgica del Ebro", pais: "España", ciudad: "Zaragoza" },
        { nombre: "Talleres Alegría", pais: "España", ciudad: "Madrid" },
        { nombre: "Industrias Metálicas Riera", pais: "España", ciudad: "Gerona" },
        { nombre: "Aceros Inoxidables del Norte", pais: "España", ciudad: "Santander" },
        { nombre: "Aluminios Cortizo", pais: "España", ciudad: "La Coruña" },
        { nombre: "Extrusiones de Aluminio", pais: "España", ciudad: "Alicante" },
        { nombre: "Fundiciones de Precisión", pais: "España", ciudad: "Valencia" },
        { nombre: "Mecanizados y Montajes", pais: "España", ciudad: "Sevilla" },
        { nombre: "Construcciones Metálicas", pais: "España", ciudad: "Málaga" },
        { nombre: "Ingeniería y Diseño", pais: "España", ciudad: "Murcia" },
        { nombre: "Montajes Industriales", pais: "España", ciudad: "Granada" }
    ];

    return (
        <div className="contratistas-container">
            <ul className="contratistas-list" ref={listRef}>
                {contratistas.map((contratista, index) => (
                    <li
                        key={contratista.nombre}
                        className="contratista-item"
                        onMouseOver={() => handleItemMouseOver(contratista, index)}
                        onMouseOut={handleItemMouseOut}
                    >
                        <div className="contratista-info">
                            <h3 className="contratista-nombre">{contratista.nombre}</h3>
                            <p className="contratista-ubicacion">{contratista.ciudad}, {contratista.pais}</p>
                        </div>
                    </li>
                ))}
            </ul>
            {modalInfo && (
                <div className="contratista-modal" style={{ top: modalPosition.top, left: modalPosition.left }}>
                    <h3 className="modal-nombre">{modalInfo.nombre}</h3>
                    <p className="modal-ubicacion">{modalInfo.ciudad}, {modalInfo.pais}</p>
                    <button className="modal-button" onClick={() => handleModalClick(modalInfo.nombre, modalInfo.pais, modalInfo.ciudad)}>Solicitar Permiso</button>
                </div>
            )}
        </div>
    );
};

export default ContratistasYConsultoresExternos;