import axios from 'axios';

const clienteAxios = axios.create({
    baseURL: import.meta.env.DEV 
        ? import.meta.env.VITE_URL_EN_LOCAL 
        : import.meta.env.VITE_URL_EN_PROD
});


// Interceptor para agregar el token al encabezado de cada solicitud
clienteAxios.interceptors.request.use(
    (config) => {
      // Obtener el token desde localStorage
      const token = localStorage.getItem('token');
      
      if (token) {
        // Si el token existe, añadirlo al encabezado Authorization con Bearer
        config.headers.Authorization = `Bearer ${token}`;
      }
  
      return config;
    },
    (error) => {
      // Manejo de errores en caso de que algo falle al configurar la solicitud
      return Promise.reject(error);
    }
  );




export default clienteAxios;
