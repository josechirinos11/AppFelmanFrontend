import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AppLayout from './layouts/AppLayout'
import DashboardView from './views/DashboardView'

import CrearCuenta from './views/CrearCuenta'
import OlvidePassword from './views/OlvidePassword'
import Login from './views/Login'





const App = () => {
    return (
        <BrowserRouter>
            <Routes>

                <Route path="/" element={<AppLayout />}>
                    <Route index element={<DashboardView />} />
                    <Route path="crear-cuenta" element={<CrearCuenta />} />
                    <Route path="login" element={<Login />} />
                    <Route path="olvide-password" element={<OlvidePassword />} />
                </Route>


            </Routes>
        </BrowserRouter>
    )
  };
  
  export default App;