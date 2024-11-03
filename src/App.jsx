import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AppLayout from './layouts/AppLayout';
import DashboardView from './views/DashboardView';
import DashboardUsuario from './layouts/DashboardUsuario';
import MiCuenta from './viewsPrivate/MiCuenta';
import Ajustes from './viewsPrivate/Ajustes';
import { AuthProvider } from './config/AuthContext';
import PrivateRoute from './config/PrivateRoutes';

import CrearCuenta from './views/CrearCuenta';
import OlvidePassword from './views/OlvidePassword';
import Login from './views/Login';

// Importa tus componentes de cada sección
import RecursosHumanos from './viewsMenu3Puntos/RecursosHumanos';
import ClientesYVentas from './viewsMenu3Puntos/ClientesYVentas';
import ProveedoresYAbastecimiento from './viewsMenu3Puntos/ProveedoresYAbastecimiento';
import ProductosYServicios from './viewsMenu3Puntos/ProductosYServicios';
import Finanzas from './viewsMenu3Puntos/Finanzas';
import OperacionesYLogistica from './viewsMenu3Puntos/OperacionesYLogistica';
import DocumentacionYCumplimiento from './viewsMenu3Puntos/DocumentacionYCumplimiento';
import TecnologiaEInfraestructura from './viewsMenu3Puntos/TecnologiaEInfraestructura';
import MarketingYRelacionesPublicas from './viewsMenu3Puntos/MarketingYRelacionesPublicas';
import GestionDeCalidad from './viewsMenu3Puntos/GestionDeCalidad';

const App = () => {
    return (
        <BrowserRouter>
            <AuthProvider>
                <Routes>
                    {/* Rutas públicas */}
                    <Route path="/" element={<AppLayout />}>
                        <Route index element={<DashboardView />} />
                        <Route path="crear-cuenta" element={<CrearCuenta />} />
                        <Route path="login" element={<Login />} />
                        <Route path="olvide-password" element={<OlvidePassword />} />
                    </Route>

                    {/* Rutas privadas */}
                    <Route element={<PrivateRoute />}>
                        <Route element={<DashboardUsuario />}>
                            <Route path="/mi-cuenta" element={<MiCuenta />} />
                            <Route path="/ajustes" element={<Ajustes />} />
                            <Route path="/recursos-humanos" element={<RecursosHumanos />} />
                            <Route path="/clientes-y-ventas" element={<ClientesYVentas />} />
                            <Route path="/proveedores-y-abastecimiento" element={<ProveedoresYAbastecimiento />} />
                            <Route path="/productos-y-servicios" element={<ProductosYServicios />} />
                            <Route path="/finanzas" element={<Finanzas />} />
                            <Route path="/operaciones-y-logistica" element={<OperacionesYLogistica />} />
                            <Route path="/documentacion-y-cumplimiento" element={<DocumentacionYCumplimiento />} />
                            <Route path="/tecnologia-e-infraestructura" element={<TecnologiaEInfraestructura />} />
                            <Route path="/marketing-y-relaciones-publicas" element={<MarketingYRelacionesPublicas />} />
                            <Route path="/gestion-de-calidad" element={<GestionDeCalidad />} />
                        </Route>
                    </Route>
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    );
};

export default App;
