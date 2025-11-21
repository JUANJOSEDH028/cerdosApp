# 🚀 Guía de Despliegue - Frontend en Vercel

## 📋 Prerequisitos

- Cuenta en [Vercel](https://vercel.com) (gratis)
- Proyecto en GitHub (o GitLab/Bitbucket)
- Backend desplegado en Render (ver `backend/DEPLOYMENT.md`)

---

## 🔧 Configuración Previa

### 1. Variables de Entorno

Crea un archivo `.env.production` en la raíz de `frontend/`:

```env
VITE_API_URL=https://tu-app-name.onrender.com/api
VITE_ENVIRONMENT=production
```

**⚠️ IMPORTANTE**: Reemplaza `tu-app-name.onrender.com` con la URL real de tu backend en Render.

### 2. Verificar Build Local

Antes de desplegar, asegúrate de que el build funciona:

```bash
cd frontend
npm install
npm run build
npm run preview
```

Si todo funciona correctamente, estás listo para desplegar.

---

## 🎯 Despliegue en Vercel

### Método 1: Desde el Dashboard (Recomendado)

1. **Sube tu código a GitHub**
```bash
git add .
git commit -m "Preparar para deployment en Vercel"
git push origin main
```

2. **Importar Proyecto en Vercel**
   - Ve a [Vercel Dashboard](https://vercel.com/dashboard)
   - Click en "Add New..." → "Project"
   - Importa tu repositorio de GitHub
   - Selecciona el repositorio `cerdos`

3. **Configurar el Proyecto**
   - **Framework Preset**: Vite (Vercel lo detectará automáticamente)
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build` (default)
   - **Output Directory**: `dist` (default)
   - **Install Command**: `npm install` (default)

4. **Variables de Entorno**
   En la sección "Environment Variables", agrega:
   
   | Name | Value | Environment |
   |------|-------|-------------|
   | `VITE_API_URL` | `https://tu-app.onrender.com/api` | Production |
   | `VITE_ENVIRONMENT` | `production` | Production |

   **⚠️ CRÍTICO**: Reemplaza `tu-app.onrender.com` con tu URL real de Render.

5. **Deploy**
   - Click en "Deploy"
   - Espera 2-5 minutos
   - ¡Tu app estará lista!

### Método 2: Desde la CLI de Vercel

1. **Instalar Vercel CLI**
```bash
npm install -g vercel
```

2. **Login**
```bash
vercel login
```

3. **Deploy**
```bash
cd frontend
vercel
```

4. **Configurar en el Wizard**
   - Project name: `cerdos-frontend` (o el que prefieras)
   - Framework: Vite
   - Root directory: `./` (ya estás en frontend)
   - Build command: `npm run build`
   - Output directory: `dist`

5. **Configurar Variables de Entorno**
```bash
vercel env add VITE_API_URL production
# Ingresa: https://tu-app.onrender.com/api

vercel env add VITE_ENVIRONMENT production
# Ingresa: production
```

6. **Deploy a Producción**
```bash
vercel --prod
```

---

## ✅ Verificar el Despliegue

Una vez desplegado, tu aplicación estará disponible en:
```
https://tu-proyecto.vercel.app
```

### Probar la Aplicación

1. **Página Principal**
   - Abre `https://tu-proyecto.vercel.app`
   - Deberías ver el Dashboard

2. **Verificar Conexión con Backend**
   - Abre las DevTools del navegador (F12)
   - Ve a la pestaña "Network"
   - Navega por la aplicación
   - Verifica que las peticiones a la API se hagan a tu backend en Render

3. **Probar Funcionalidades**
   - Crear un lote
   - Ver reportes
   - Registrar consumo

---

## 🔧 Configuración del Backend para CORS

**MUY IMPORTANTE**: Actualiza las variables de entorno en tu backend (Render):

1. Ve a tu servicio en Render
2. Actualiza la variable `CORS_ORIGINS`:
```
CORS_ORIGINS=https://tu-proyecto.vercel.app,https://tu-proyecto-git-main.vercel.app
```

**Nota**: Vercel genera múltiples URLs:
- URL de producción: `https://tu-proyecto.vercel.app`
- URL del branch: `https://tu-proyecto-git-main.vercel.app`
- URL de preview: `https://tu-proyecto-xxxxx.vercel.app`

Puedes agregar todas o usar `*` en desarrollo (NO recomendado en producción).

---

## 🌐 Dominio Personalizado (Opcional)

### Agregar Dominio Propio

Si tienes un dominio personalizado:

1. **En Vercel Dashboard**
   - Ve a tu proyecto
   - Settings → Domains
   - Click en "Add Domain"
   - Ingresa tu dominio (ej: `cerdos.tuempresa.com`)

2. **Configurar DNS**
   Vercel te dará instrucciones específicas:
   - Tipo A → IP de Vercel
   - O tipo CNAME → `cname.vercel-dns.com`

3. **Actualizar CORS**
   Agrega tu dominio personalizado a `CORS_ORIGINS` en el backend:
   ```
   CORS_ORIGINS=https://cerdos.tuempresa.com
   ```

---

## 🔄 Actualizaciones y Deploys

### Deploy Automático

Vercel despliega automáticamente cuando haces push a GitHub:

```bash
git add .
git commit -m "Actualización del frontend"
git push origin main
```

Vercel automáticamente:
1. Detecta el cambio
2. Ejecuta el build
3. Despliega la nueva versión
4. Provee una URL de preview

### Preview Deployments

Cada pull request obtiene su propia URL de preview:
- Útil para revisar cambios antes de mergear
- URLs automáticas como: `https://tu-proyecto-git-feature.vercel.app`

### Rollback

Si algo sale mal:
1. Ve a tu proyecto en Vercel
2. Deployments
3. Encuentra el deploy anterior que funcionaba
4. Click en "..." → "Promote to Production"

---

## 🐛 Troubleshooting

### Error: "API request failed"

**Problema**: El frontend no puede conectarse al backend

**Soluciones**:
1. Verifica que `VITE_API_URL` esté configurada correctamente
2. Verifica que el backend esté corriendo en Render
3. Verifica que CORS esté configurado correctamente en el backend
4. Abre DevTools → Console para ver errores específicos

### Error de CORS

**Síntoma**: En la consola del navegador:
```
Access to fetch at 'https://tu-backend.onrender.com/api/lotes' 
from origin 'https://tu-frontend.vercel.app' has been blocked by CORS policy
```

**Solución**:
1. Ve a Render → tu servicio → Environment
2. Actualiza `CORS_ORIGINS`:
   ```
   CORS_ORIGINS=https://tu-frontend.vercel.app
   ```
3. Guarda y espera a que el servicio se reinicie

### Build Failed

**Problema**: El build falla en Vercel

**Soluciones**:
1. Verifica los logs en Vercel Dashboard
2. Asegúrate de que `npm run build` funcione localmente
3. Verifica que todas las dependencias estén en `package.json`
4. Verifica los errores de TypeScript/ESLint

### Variables de Entorno no Funcionan

**Recuerda**:
- Las variables deben empezar con `VITE_`
- Después de agregar/cambiar variables, redeploy
- Las variables solo se leen en build time, no en runtime

---

## 📊 Analytics (Opcional)

Vercel provee analytics gratuitos:

1. **Activar Analytics**
   - Ve a tu proyecto en Vercel
   - Analytics → Enable

2. **Métricas Incluidas**
   - Page views
   - Visitors únicos
   - Top pages
   - Devices
   - Browsers
   - Locations

---

## ⚡ Performance

### Optimizaciones Automáticas de Vercel

Vercel automáticamente:
- ✅ Comprime assets (Gzip/Brotli)
- ✅ Optimiza imágenes
- ✅ Configura cache headers
- ✅ Provee CDN global
- ✅ SSL/HTTPS automático

### Mejoras Adicionales

El archivo `vercel.json` ya incluye:
- Rewrite rules para SPA routing
- Cache headers para assets

---

## 💰 Plan Free de Vercel

El plan free incluye:
- ✅ Deploys ilimitados
- ✅ 100 GB bandwidth por mes
- ✅ SSL automático (HTTPS)
- ✅ Auto-deploy desde GitHub
- ✅ Preview deployments
- ✅ Analytics básicos
- ✅ CDN global

---

## 🔐 Seguridad

### Headers de Seguridad (Opcional)

Puedes agregar headers de seguridad en `vercel.json`:

```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        }
      ]
    }
  ]
}
```

---

## 📚 Recursos Adicionales

- [Documentación oficial de Vercel](https://vercel.com/docs)
- [Guía de Vite en Vercel](https://vercel.com/docs/frameworks/vite)
- [Variables de entorno en Vercel](https://vercel.com/docs/concepts/projects/environment-variables)
- [Dominios personalizados](https://vercel.com/docs/concepts/projects/custom-domains)

---

## ✅ Checklist de Despliegue

Antes de desplegar, verifica:

- [ ] El backend está desplegado y funcionando en Render
- [ ] Tienes la URL del backend
- [ ] `npm run build` funciona localmente
- [ ] El código está en GitHub
- [ ] Configuraste `VITE_API_URL` en Vercel
- [ ] Actualizaste `CORS_ORIGINS` en el backend con la URL de Vercel
- [ ] Probaste la aplicación después del deploy
- [ ] Todas las rutas funcionan (SPA routing)
- [ ] Las peticiones al backend funcionan

---

## 🔗 Flujo Completo

1. ✅ **Backend en Render**: `https://cerdos-api.onrender.com`
2. ✅ **Frontend en Vercel**: `https://cerdos-app.vercel.app`
3. ✅ **CORS configurado**: Backend acepta peticiones del frontend
4. ✅ **Variables configuradas**: Frontend apunta al backend correcto

---

**¡Listo! Tu aplicación está en producción 🎉**

### URLs de tu Aplicación:
- **Frontend**: `https://tu-proyecto.vercel.app`
- **Backend**: `https://tu-app.onrender.com`
- **API Docs**: `https://tu-app.onrender.com/docs`

