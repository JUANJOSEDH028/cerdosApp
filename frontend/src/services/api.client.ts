// Cliente base de Axios configurado para conectar con el backend FastAPI
// Este archivo centraliza la configuración de todas las peticiones HTTP

import axios from 'axios';
import { API_URL } from '../config/api.config';

// Crear instancia de Axios con configuración base
const apiClient = axios.create({
  baseURL: API_URL,                    // http://localhost:8000/api
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,                      // 10 segundos de timeout
});

// Interceptor para requests (opcional - para agregar tokens, logs, etc.)
apiClient.interceptors.request.use(
  (config) => {
    // Aquí podrías agregar tokens de autenticación en el futuro
    // config.headers.Authorization = `Bearer ${token}`;
    
    // No mostrar logs para peticiones de keep-alive
    const isKeepAlive = config.headers?.['X-Keep-Alive'] === 'true';
    if (!isKeepAlive) {
      console.log('📤 Request:', config.method?.toUpperCase(), config.url);
    }
    
    return config;
  },
  (error) => {
    console.error('❌ Request Error:', error);
    return Promise.reject(error);
  }
);

// Interceptor para responses (opcional - para manejo de errores global)
apiClient.interceptors.response.use(
  (response) => {
    // No mostrar logs para peticiones de keep-alive
    const isKeepAlive = response.config.headers?.['X-Keep-Alive'] === 'true';
    if (!isKeepAlive) {
      console.log('✅ Response:', response.status, response.config.url);
    }
    return response;
  },
  (error) => {
    // No mostrar logs de error para peticiones de keep-alive
    const isKeepAlive = error.config?.headers?.['X-Keep-Alive'] === 'true';
    if (!isKeepAlive) {
      console.error('❌ Response Error:', error.response?.status, error.message);
      
      // Manejo de errores comunes
      if (error.response?.status === 404) {
        console.error('Recurso no encontrado');
      } else if (error.response?.status === 422) {
        console.error('Error de validación:', error.response.data);
      } else if (error.response?.status === 500) {
        console.error('Error del servidor');
      }
    }
    
    return Promise.reject(error);
  }
);

export default apiClient;