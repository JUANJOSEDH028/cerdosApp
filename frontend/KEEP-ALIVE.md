# 🏓 Keep-Alive System

Sistema implementado para mantener activo el backend en Render (plan Free).

---

## 🎯 Problema

Render Free duerme los servicios después de **15 minutos de inactividad**. Cuando un usuario intenta usar la app después de ese tiempo:
- Primera petición tarda **30-60 segundos** (cold start)
- Mala experiencia de usuario

---

## ✅ Solución

Implementamos un sistema de **keep-alive** que hace peticiones periódicas al backend para mantenerlo activo.

---

## 🔧 Implementación

### 1. Custom Hook: `useKeepAlive.ts`

Ubicación: `frontend/src/hooks/useKeepAlive.ts`

```typescript
// Uso básico
useKeepAlive(3, true);  // Ping cada 3 minutos, habilitado

// Parámetros:
// - intervalMinutes: Intervalo en minutos (default: 3)
// - enabled: Si está habilitado (default: true)
```

**Características**:
- ✅ Hace ping al endpoint `/health`
- ✅ No bloquea la UI
- ✅ Logs silenciosos (no molesta al usuario)
- ✅ Auto-cleanup cuando el componente se desmonta
- ✅ Primer ping inmediato al cargar

### 2. Integración en MainLayout

Ubicación: `frontend/src/components/Layout/MainLayout.tsx`

```typescript
export default function MainLayout() {
  // Mantener activo el backend con peticiones cada 3 minutos
  useKeepAlive(3, true);
  
  // ... resto del componente
}
```

**¿Por qué en MainLayout?**
- Se ejecuta mientras el usuario use la app
- No se ejecuta múltiples veces (un solo punto de entrada)
- Cubre todas las páginas de la aplicación

### 3. API Client Modificado

Ubicación: `frontend/src/services/api.client.ts`

**Cambios**:
- Detecta peticiones de keep-alive con header `X-Keep-Alive: true`
- No muestra logs para estas peticiones
- No muestra errores en consola del usuario

```typescript
// En el hook
await apiClient.get('/health', {
  headers: {
    'X-Keep-Alive': 'true'
  }
});
```

---

## ⏰ Configuración de Intervalos

### Intervalo Recomendado: 3 minutos

**¿Por qué 3 minutos?**
- Render duerme después de 15 min de inactividad
- 3 minutos = 5 pings antes de que se duerma
- Balance entre mantener activo y no saturar

### Otros Intervalos Posibles

```typescript
useKeepAlive(1, true);   // Cada 1 minuto (muy frecuente)
useKeepAlive(5, true);   // Cada 5 minutos (menos frecuente)
useKeepAlive(10, true);  // Cada 10 minutos (riesgoso, cerca del límite)
```

---

## 📊 Consumo de Recursos

### Plan Free de Render
- **Límite**: 750 horas/mes
- **Con keep-alive cada 3 min**:
  - 20 peticiones/hora
  - 480 peticiones/día
  - ~14,400 peticiones/mes
- **Tamaño de petición**: ~100 bytes
- **Impacto**: Mínimo

### ¿Afecta el límite de horas?
**No**. El límite es de **tiempo corriendo**, no de peticiones.

---

## 🔍 Monitoreo

### Logs en Navegador

Cuando está activo, verás en la consola:

```
✅ Keep-alive activado: ping cada 3 minutos
🏓 Keep-alive ping enviado al backend
```

### Logs en Render

En el backend (Render logs) verás:

```
GET /health HTTP/1.1" 200 OK
```

---

## 🎛️ Configuración

### Habilitar/Deshabilitar

```typescript
// Habilitado (default)
useKeepAlive(3, true);

// Deshabilitado
useKeepAlive(3, false);
```

### Cambiar Intervalo

```typescript
// Cambiar a 5 minutos
useKeepAlive(5, true);
```

---

## 🧪 Testing

### En Desarrollo Local

```bash
cd frontend
npm run dev
```

Abre la consola del navegador y verás:
```
✅ Keep-alive activado: ping cada 3 minutos
🏓 Keep-alive ping enviado al backend
```

### En Producción

1. Abre https://cerdos-app.vercel.app
2. Abre DevTools → Console
3. Verás los logs de keep-alive
4. Ve a Network tab y filtra por `/health`
5. Verás una petición cada 3 minutos

---

## 🚨 Troubleshooting

### El backend se sigue durmiendo

**Posibles causas**:
1. Usuario cerró la pestaña del navegador
2. Intervalo muy largo (>10 min)
3. Backend tiene otros problemas

**Solución**:
- Reducir intervalo a 2-3 minutos
- Verificar logs de Render

### Muchos logs en consola

**Solución**: Los logs están configurados para ser silenciosos con `console.debug`. Si ves muchos, verifica que `X-Keep-Alive` esté en los headers.

### Error en peticiones de keep-alive

**No afecta**: Los errores de keep-alive se capturan silenciosamente y no interrumpen la app.

---

## 📈 Mejoras Futuras

### Posibles Optimizaciones

1. **Detección de Inactividad**:
   - Pausar keep-alive si usuario está inactivo
   - Usar `document.visibilityState`

2. **Adaptive Interval**:
   - Aumentar intervalo en horarios de baja actividad
   - Reducir intervalo en horarios pico

3. **Service Worker**:
   - Implementar con Service Worker para mayor confiabilidad
   - Keep-alive incluso si el usuario cierra la pestaña

4. **Backend Webhook**:
   - Notificar al backend cuando hay usuarios activos
   - Backend puede auto-hibernar cuando no hay usuarios

---

## 🔐 Seguridad

### ¿Es Seguro?

**Sí**. El endpoint `/health` es público y solo retorna:

```json
{
  "status": "healthy",
  "database": "connected",
  "environment": "production"
}
```

No expone información sensible ni permite operaciones.

---

## 💡 Alternativas

Si no quieres usar keep-alive desde el frontend:

### 1. UptimeRobot (Externo)
- Servicio gratuito de monitoreo
- Hace ping cada 5 minutos
- No consume recursos del frontend
- URL: https://uptimerobot.com

### 2. Cron-job.org (Externo)
- Servicio de cron jobs gratuito
- Configurable
- URL: https://cron-job.org

### 3. Upgrade a Render Paid
- $7/mes
- No se duerme nunca
- Mejor performance

---

## ✅ Conclusión

El sistema de keep-alive implementado:
- ✅ Mantiene el backend activo
- ✅ Mejora la experiencia de usuario
- ✅ No impacta performance
- ✅ Logs silenciosos
- ✅ Fácil de configurar
- ✅ Auto-cleanup

**Estado**: ✅ Implementado y funcionando en producción

---

**Última actualización**: 2024-11-21

