// Hook para mantener activo el backend con peticiones periódicas
import { useEffect, useRef } from 'react';
import apiClient from '../services/api.client';

/**
 * Hook que hace peticiones periódicas al endpoint de health para mantener
 * activo el backend de Render (plan free se duerme después de 15 min de inactividad)
 * 
 * @param intervalMinutes - Intervalo en minutos entre cada petición (default: 3)
 * @param enabled - Si el keep-alive está habilitado (default: true)
 */
export function useKeepAlive(intervalMinutes: number = 3, enabled: boolean = true) {
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    if (!enabled) {
      return;
    }

    // Función para hacer ping al backend
    const pingBackend = async () => {
      try {
        // Hacer petición silenciosa al health endpoint
        await apiClient.get('/health', {
          // No mostrar logs en consola para esta petición
          headers: {
            'X-Keep-Alive': 'true'
          }
        });
        
        console.log('🏓 Keep-alive ping enviado al backend');
      } catch (error) {
        // Silenciar errores del keep-alive para no molestar al usuario
        console.debug('Keep-alive ping falló (puede ser temporal):', error);
      }
    };

    // Hacer un ping inmediato al cargar
    pingBackend();

    // Configurar intervalo
    const intervalMs = intervalMinutes * 60 * 1000;
    intervalRef.current = setInterval(pingBackend, intervalMs);

    console.log(`✅ Keep-alive activado: ping cada ${intervalMinutes} minuto${intervalMinutes !== 1 ? 's' : ''}`);

    // Cleanup: limpiar intervalo cuando el componente se desmonte
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        console.log('🛑 Keep-alive desactivado');
      }
    };
  }, [intervalMinutes, enabled]);
}

