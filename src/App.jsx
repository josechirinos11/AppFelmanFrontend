import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AppLayout from './layouts/AppLayout'
import DashboardView from './views/DashboardView'
import DashboardUsuario from './layouts/DashboardUsuario'
import MiCuenta from './viewsPrivate/MiCuenta';
import Ajustes from './viewsPrivate/Ajustes';
import {AuthProvider} from './config/AuthContext';
import PrivateRoute from './config/PrivateRoutes';

import CrearCuenta from './views/CrearCuenta'
import OlvidePassword from './views/OlvidePassword'
import Login from './views/Login'





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
                        </Route>
                    </Route>



                </Routes>


            </AuthProvider>
        </BrowserRouter>
    )
};

export default App;