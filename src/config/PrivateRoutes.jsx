// PrivateRoute.js
import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import AuthContext from './AuthContext'; // Asegúrate de importar correctamente

const PrivateRoute = () => {
    const { token } = useContext(AuthContext); // Usa el contexto para obtener el token

    // Si hay token, renderiza la ruta privada; si no, redirige a login
    return token ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
