import axios from 'axios';

const clienteAxios = axios.create({
    baseURL: import.meta.env.DEV 
        ? import.meta.env.VITE_URL_EN_LOCAL 
        : import.meta.env.VITE_URL_EN_PROD
});

export default clienteAxios;
