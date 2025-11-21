# 🚀 Guía de Despliegue - Backend en Render

## 📋 Prerequisitos

- Cuenta en [Render](https://render.com) (gratis)
- Proyecto en GitHub (o GitLab/Bitbucket)
- Cuenta en [Supabase](https://supabase.com) con la base de datos configurada

---

## 🔧 Configuración Previa

### 1. Base de Datos en Supabase

Asegúrate de tener todas las tablas creadas en Supabase:
- `corrales`
- `alimentos`
- `lotes`
- `lotes_corrales` (tabla intermedia)
- `consumo_alimento`
- `mortalidad`
- `cosechas`
- `gastos_mensuales`
- `gastos_directos`

### 2. Obtener Credenciales de Supabase

Ve a tu proyecto en Supabase:
1. Settings → API
2. Copia la **Project URL** (SUPABASE_URL)
3. Copia la **anon/public key** (SUPABASE_KEY)

---

## 🎯 Despliegue en Render

### Método 1: Usando render.yaml (Recomendado)

1. **Sube tu código a GitHub**
```bash
git add .
git commit -m "Preparar para deployment en Render"
git push origin main
```

2. **Conecta tu repositorio en Render**
   - Ve a [Render Dashboard](https://dashboard.render.com)
   - Click en "New +" → "Blueprint"
   - Conecta tu repositorio de GitHub
   - Render detectará automáticamente el archivo `render.yaml`

3. **Configura las Variables de Entorno**
   En el dashboard de Render, configura:
   - `SUPABASE_URL`: Tu URL de Supabase
   - `SUPABASE_KEY`: Tu anon key de Supabase
   - `CORS_ORIGINS`: URLs del frontend (ej: `https://tu-app.vercel.app`)
   - `ENVIRONMENT`: `production`

4. **Deploy**
   - Click en "Apply"
   - Render automáticamente construirá y desplegará tu app

### Método 2: Manual desde el Dashboard

1. **Crear un nuevo Web Service**
   - Ve a [Render Dashboard](https://dashboard.render.com)
   - Click en "New +" → "Web Service"
   - Conecta tu repositorio

2. **Configurar el Servicio**
   - **Name**: `cerdos-api` (o el nombre que prefieras)
   - **Region**: Oregon (o el más cercano)
   - **Branch**: `main`
   - **Root Directory**: `backend`
   - **Runtime**: Python 3
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`

3. **Plan**
   - Selecciona el plan Free (o el que prefieras)

4. **Variables de Entorno**
   Agrega las siguientes variables:
   ```
   SUPABASE_URL=https://tu-proyecto.supabase.co
   SUPABASE_KEY=tu-anon-key-aqui
   CORS_ORIGINS=https://tu-frontend.vercel.app
   ENVIRONMENT=production
   PYTHON_VERSION=3.11.0
   ```

5. **Configuración Avanzada** (opcional)
   - **Health Check Path**: `/health`
   - **Auto-Deploy**: Yes (para deploys automáticos)

6. **Crear el Servicio**
   - Click en "Create Web Service"
   - Espera a que el deploy termine (5-10 minutos)

---

## ✅ Verificar el Despliegue

Una vez desplegado, tu API estará disponible en:
```
https://tu-app-name.onrender.com
```

### Probar los Endpoints

1. **Endpoint raíz**
```bash
curl https://tu-app-name.onrender.com/
```

Respuesta esperada:
```json
{
  "message": "Sistema de Control de Costos - Ceba de Cerdos",
  "status": "online",
  "version": "0.1.0",
  "docs": "/docs"
}
```

2. **Health Check**
```bash
curl https://tu-app-name.onrender.com/health
```

Respuesta esperada:
```json
{
  "status": "healthy",
  "database": "connected",
  "environment": "production"
}
```

3. **Documentación Interactiva**
Visita: `https://tu-app-name.onrender.com/docs`

---

## 🔒 Consideraciones de Seguridad

### CORS (Importante)

Actualiza la variable `CORS_ORIGINS` con las URLs exactas de tu frontend:
```
CORS_ORIGINS=https://tu-app.vercel.app,https://www.tu-app.vercel.app
```

### Variables de Entorno

- ✅ **Nunca** subas el archivo `.env` al repositorio
- ✅ Usa el archivo `.env.example` como plantilla
- ✅ Configura todas las variables sensibles en el dashboard de Render

---

## 📊 Monitoreo

### Logs en Tiempo Real

En el dashboard de Render:
1. Ve a tu servicio
2. Click en "Logs"
3. Verás todos los logs en tiempo real

### Métricas

Render provee métricas gratuitas:
- CPU usage
- Memory usage
- Request count
- Response time

---

## 🔄 Actualizaciones

### Deploy Automático

Si configuraste Auto-Deploy:
```bash
git add .
git commit -m "Actualización del backend"
git push origin main
```

Render automáticamente detectará el cambio y desplegará la nueva versión.

### Deploy Manual

En el dashboard de Render:
1. Ve a tu servicio
2. Click en "Manual Deploy"
3. Selecciona "Clear build cache & deploy" si hay problemas

---

## 🐛 Troubleshooting

### El servicio no inicia

**Verificar**:
- Las variables de entorno están configuradas
- El `requirements.txt` está en la raíz de `backend/`
- El comando de inicio es correcto

### Error de Base de Datos

**Verificar**:
- SUPABASE_URL es correcto
- SUPABASE_KEY es correcto
- La IP de Render está permitida en Supabase (por defecto, Supabase permite todas las IPs)

### Error de CORS

**Verificar**:
- `CORS_ORIGINS` incluye la URL exacta del frontend (con https://)
- No hay espacios extra en la variable

### Logs

Para ver logs detallados:
```bash
# En el dashboard de Render, los logs muestran:
- Peticiones HTTP
- Errores de la aplicación
- Conexiones a la base de datos
```

---

## 💰 Plan Free de Render

El plan free incluye:
- ✅ 750 horas de servicio por mes
- ✅ 512 MB RAM
- ✅ SSL automático (HTTPS)
- ✅ Auto-deploy desde GitHub
- ⚠️ El servicio se "duerme" después de 15 minutos de inactividad
- ⚠️ Primera petición después de "dormir" puede tomar 30-60 segundos

### Mantener el Servicio Activo

Puedes usar un servicio de "ping" gratuito como:
- [UptimeRobot](https://uptimerobot.com)
- [Cron-job.org](https://cron-job.org)

Configura un ping cada 10 minutos a:
```
https://tu-app-name.onrender.com/health
```

---

## 📚 Recursos Adicionales

- [Documentación oficial de Render](https://render.com/docs)
- [Guía de FastAPI en Render](https://render.com/docs/deploy-fastapi)
- [Variables de entorno en Render](https://render.com/docs/environment-variables)

---

## ✅ Checklist de Despliegue

Antes de desplegar, verifica:

- [ ] Todas las tablas existen en Supabase
- [ ] Tienes las credenciales de Supabase (URL y KEY)
- [ ] El código está en GitHub
- [ ] `requirements.txt` está actualizado
- [ ] Configuraste las variables de entorno en Render
- [ ] Probaste el endpoint `/health` después del deploy
- [ ] Actualizaste `CORS_ORIGINS` con la URL del frontend
- [ ] Probaste algunos endpoints de la API

---

**¡Listo! Tu backend está en producción 🎉**

