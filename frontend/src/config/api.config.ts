// Configuración de la API del backend
// Este archivo centraliza la URL base para todas las llamadas HTTP

// URL base del backend FastAPI (desde variables de entorno o default)
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://cerdosapp.onrender.com/api';

// URL base para los endpoints de la API
export const API_URL = API_BASE_URL;