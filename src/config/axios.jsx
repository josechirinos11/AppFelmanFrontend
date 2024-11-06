import axios from 'axios';

const clienteAxios = axios.create({
    baseURL: import.meta.env.DEV 
        ? import.meta.env.VITE_BACKEND_URL_LOCAL 
        : import.meta.env.VITE_BACKEND_URL_PROD
});

export default clienteAxios;
