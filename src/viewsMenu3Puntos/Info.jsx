import React from 'react';
import './Info.css';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import srcIMG from '../img/websitejosechirinos.png';


const Info = () => {
    const mensaje = "No se puede mostrar más contenido de la aplicación sin autorización de José Chirinos.";
    const correo = "josechirinos11@gmail.com";
    const telefono = "+34 662936645";
    const website = "https://portfolio-josechirinos-henna.vercel.app/";
    const website2 = "Si la vida te da oportunidades, aprovéchalas. Si no te las da, créalas.";
    //const srcIMG = "../img/websitejosechirinos.png"; // Asegúrate de tener la imagen de vista previa

    return (
        <motion.div
            className="info-container"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <div className="info-content">

                <CardContainer
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, type: 'spring' }}
                >
                    <BrowserFrame>
                        <BrowserHeader>
                            <BrowserControls>
                                <ControlButton red />
                                <ControlButton yellow />
                                <ControlButton green />
                            </BrowserControls>
                            <UrlBar>{website2}</UrlBar>
                        </BrowserHeader>
                        <IframeContainer
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                        >
                            <div className="info-card">
                                <p className="info-message">{mensaje}</p>
                                <div className="info-contact">
                                    <p>Correo: {correo}</p>
                                    <p>Teléfono: {telefono}</p>
                                </div>
                            </div>
                        </IframeContainer>
                    </BrowserFrame>
                    <ShineEffect />
                    <GlowEffect />
                </CardContainer>


                {/* Componente WebPreviewCard integrado aquí */}
                <CardContainer
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, type: 'spring' }}
                >
                    <BrowserFrame>
                        <BrowserHeader>
                            <BrowserControls>
                                <ControlButton red />
                                <ControlButton yellow />
                                <ControlButton green />
                            </BrowserControls>
                            <UrlBar>{website}</UrlBar>
                        </BrowserHeader>
                        <IframeContainer
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                        >
                            <div className="info-card">
                            <a href={website} target="_blank" rel="noopener noreferrer">
                                <img
                                    src={srcIMG} // Asegúrate de tener la imagen de vista previa
                                    alt="Vista previa del sitio"
                                    className="info-thumbnail"
                                />
                            </a>
                            </div>
                        </IframeContainer>
                    </BrowserFrame>
                    <ShineEffect />
                    <GlowEffect />
                </CardContainer>
            </div>
        </motion.div>
    );
};

// Estilos con styled-components (integrados aquí)
const CardContainer = styled(motion.div)`
    position: relative;
    max-width: 800px; /* Ajusta este valor según necesites */
    margin: 2rem auto;
    border-radius: 20px;
    background: rgba(25, 25, 25, 0.8);
    backdrop-filter: blur(15px);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
    overflow: hidden;
    transform-style: preserve-3d;
    perspective: 1000px;
    cursor: pointer;
    transition: transform 0.3s ease;

    &:hover {
        transform: scale(1.02) rotateZ(0.5deg);

        &:before {
            opacity: 0.8;
        }
    }
`;

const BrowserFrame = styled.div`
    position: relative;
    padding: 12px;
    background: #2a2a2a;
    border-radius: 12px;
`;

const BrowserHeader = styled.div`
    display: flex;
    align-items: center;
    padding: 12px;
    background: #363636;
    border-radius: 8px 8px 0 0;
`;

const BrowserControls = styled.div`
    display: flex;
    gap: 8px;
    margin-right: 12px;
`;

const ControlButton = styled.div`
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: ${props => props.red ? '#ff5f56' : props.yellow ? '#ffbd2e' : '#27c93f'};
`;

const UrlBar = styled.div`
    flex: 1;
    padding: 6px 15px;
    background: #1f1f1f;
    border-radius: 20px;
    color: #888;
    font-family: 'Fira Code', monospace;
    font-size: 0.9em;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
`;

const IframeContainer = styled(motion.div)`
    position: relative;
    height: 500px; /* Ajusta este valor según necesites */
    border-radius: 0 0 12px 12px;
    overflow: hidden;
    transform: translateZ(0);
    box-shadow: inset 0 0 20px rgba(0, 0, 0, 0.3);

    iframe {
        transform: scale(0.98);
        transform-origin: top left;
        width: 100%;
        height: 100%;
        border: none;
        border-radius: '0 0 12px 12px';
    }
`;

const ShineEffect = styled.div`
    position: absolute;
    top: 0;
    left: -100%;
    width: 50%;
    height: 100%;
    background: linear-gradient(
        to right,
        rgba(255, 255, 255, 0) 0%,
        rgba(255, 255, 255, 0.1) 50%,
        rgba(255, 255, 255, 0) 100%
    );
    transition: all 0.8s ease;

    ${CardContainer}:hover & {
        left: 150%;
    }
`;

const GlowEffect = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background: radial-gradient(
        circle at 50% 50%,
        rgba(100, 150, 255, 0.1),
        rgba(100, 150, 255, 0) 70%
    );
    pointer-events: none;
`;

export default Info;