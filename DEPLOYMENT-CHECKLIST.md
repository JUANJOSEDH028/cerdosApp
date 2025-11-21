# ✅ Checklist de Despliegue

Usa esta lista para verificar cada paso del despliegue.

---

## 📋 Pre-Despliegue

### Preparación General
- [ ] Código está en GitHub/GitLab
- [ ] Tienes cuenta de email/GitHub para registros
- [ ] Tienes 1 hora disponible para el proceso completo

---

## 🗄️ Fase 1: Base de Datos (Supabase)

### Crear Cuenta y Proyecto
- [ ] Crear cuenta en [supabase.com](https://supabase.com)
- [ ] Crear nuevo proyecto
- [ ] Anotar nombre del proyecto: `________________`
- [ ] Guardar contraseña de la BD de forma segura
- [ ] Esperar 2-3 minutos a que el proyecto esté listo

### Crear Tablas
- [ ] Ir a SQL Editor
- [ ] Ejecutar script SQL de tablas (desde DEPLOYMENT-GUIDE.md o QUICK-DEPLOY.md)
- [ ] Verificar que no hay errores
- [ ] Confirmar que las 9 tablas se crearon:
  - [ ] `corrales`
  - [ ] `alimentos`
  - [ ] `lotes`
  - [ ] `lotes_corrales`
  - [ ] `consumo_alimento`
  - [ ] `mortalidad`
  - [ ] `cosechas`
  - [ ] `gastos_mensuales`
  - [ ] `gastos_directos`

### Obtener Credenciales
- [ ] Ir a Settings → API
- [ ] Copiar **Project URL**
  ```
  URL: _______________________________________________
  ```
- [ ] Copiar **anon/public key**
  ```
  KEY: _______________________________________________
  ```

---

## 🔧 Fase 2: Backend (Render)

### Crear Cuenta
- [ ] Crear cuenta en [render.com](https://render.com)
- [ ] Conectar cuenta de GitHub
- [ ] Autorizar acceso a repositorios

### Crear Web Service
- [ ] Click en "New +" → "Web Service"
- [ ] Seleccionar repositorio `cerdos`
- [ ] Configurar settings:
  - [ ] Name: `cerdos-api`
  - [ ] Region: `Oregon` (o el más cercano)
  - [ ] Branch: `main`
  - [ ] Root Directory: `backend`
  - [ ] Runtime: `Python 3`
  - [ ] Build Command: `pip install -r requirements.txt`
  - [ ] Start Command: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
  - [ ] Plan: `Free`

### Variables de Entorno
- [ ] Agregar `SUPABASE_URL` = (URL de Supabase)
- [ ] Agregar `SUPABASE_KEY` = (Key de Supabase)
- [ ] Agregar `CORS_ORIGINS` = `*` (temporalmente)
- [ ] Agregar `ENVIRONMENT` = `production`
- [ ] Agregar `PYTHON_VERSION` = `3.11.0`

### Configuración Avanzada (Opcional)
- [ ] Health Check Path: `/health`
- [ ] Auto-Deploy: `Yes`

### Deploy y Verificación
- [ ] Click en "Create Web Service"
- [ ] Esperar 5-10 minutos (observar logs)
- [ ] Anotar URL del backend:
  ```
  Backend URL: _______________________________________________
  ```
- [ ] Verificar que el servicio está "Live" (green)
- [ ] Probar endpoint de salud:
  - [ ] Abrir: `https://tu-app.onrender.com/health`
  - [ ] Debe retornar: `{"status":"healthy","database":"connected"}`
- [ ] Probar documentación:
  - [ ] Abrir: `https://tu-app.onrender.com/docs`
  - [ ] Debe mostrar Swagger UI

---

## 🎨 Fase 3: Frontend (Vercel)

### Crear Cuenta
- [ ] Crear cuenta en [vercel.com](https://vercel.com)
- [ ] Conectar cuenta de GitHub
- [ ] Autorizar acceso a repositorios

### Importar Proyecto
- [ ] Click en "Add New..." → "Project"
- [ ] Seleccionar repositorio `cerdos`
- [ ] Configurar settings:
  - [ ] Framework Preset: `Vite` (auto-detectado)
  - [ ] Root Directory: `frontend`
  - [ ] Build Command: `npm run build`
  - [ ] Output Directory: `dist`
  - [ ] Install Command: `npm install`

### Variables de Entorno
- [ ] Agregar `VITE_API_URL`:
  - Name: `VITE_API_URL`
  - Value: `https://tu-app.onrender.com/api` (URL de Render + `/api`)
  - Environment: `Production`
- [ ] Agregar `VITE_ENVIRONMENT`:
  - Name: `VITE_ENVIRONMENT`
  - Value: `production`
  - Environment: `Production`

### Deploy y Verificación
- [ ] Click en "Deploy"
- [ ] Esperar 2-5 minutos (observar logs)
- [ ] Anotar URL del frontend:
  ```
  Frontend URL: _______________________________________________
  ```
- [ ] Verificar que el deploy está "Ready" (green)
- [ ] Abrir la URL del frontend
- [ ] Verificar que se ve el Dashboard

---

## 🔗 Fase 4: Conectar Frontend y Backend

### Configurar CORS en Backend
- [ ] Ir a Render Dashboard
- [ ] Seleccionar servicio `cerdos-api`
- [ ] Ir a "Environment"
- [ ] Editar variable `CORS_ORIGINS`
- [ ] Cambiar valor a URLs de Vercel:
  ```
  https://tu-app.vercel.app,https://tu-app-git-main.vercel.app
  ```
- [ ] Guardar cambios
- [ ] Esperar 30-60 segundos a que reinicie

### Verificar Conexión
- [ ] Abrir frontend en Vercel
- [ ] Abrir DevTools del navegador (F12)
- [ ] Ir a pestaña "Network"
- [ ] Navegar en la app (ej: ir a Lotes)
- [ ] Verificar en Network:
  - [ ] Peticiones se hacen a tu backend en Render
  - [ ] Status codes son 200 (éxito)
  - [ ] No hay errores de CORS en Console

### Probar Funcionalidades
- [ ] Dashboard carga correctamente
- [ ] Puedes navegar por todas las secciones
- [ ] No hay errores en la consola del navegador
- [ ] Las rutas funcionan (ej: /lotes, /registros)

---

## 📊 Fase 5: Datos Iniciales

### Crear Corrales
- [ ] Ir a Corrales (puede ser desde la app o API docs)
- [ ] Crear al menos 2 corrales de ejemplo:
  - [ ] Corral 1: nombre, capacidad
  - [ ] Corral 2: nombre, capacidad

### Crear Alimentos
- [ ] Ir a Alimentos
- [ ] Crear los 3 tipos de alimento:
  - [ ] PREINICIADOR: nombre, costo/kg
  - [ ] LEVANTE: nombre, costo/kg
  - [ ] ENGORDE: nombre, costo/kg

### Crear Lote de Prueba (Opcional)
- [ ] Ir a "Nuevo Lote"
- [ ] Llenar formulario con datos de prueba
- [ ] Asignar corrales
- [ ] Crear lote
- [ ] Verificar que aparece en lista de lotes

---

## ✅ Post-Despliegue

### Documentación
- [ ] Anotar todas las URLs:
  - Frontend: `_______________________________________`
  - Backend: `_______________________________________`
  - API Docs: `_______________________________________`
  - Supabase: `_______________________________________`

### Seguridad
- [ ] Guardar credenciales de forma segura
- [ ] Verificar que `.env` NO está en Git
- [ ] Verificar que `CORS_ORIGINS` tiene las URLs correctas
- [ ] Cambiar contraseña de Supabase si es débil

### Monitoreo
- [ ] Configurar UptimeRobot (opcional, para mantener backend activo)
- [ ] Activar Analytics en Vercel (opcional)
- [ ] Revisar logs en Render periódicamente

### Compartir
- [ ] Compartir URL del frontend con el equipo
- [ ] Crear documentación de usuario (si aplica)
- [ ] Capacitar al equipo en uso del sistema

---

## 🎓 Recursos

### Documentación del Proyecto
- [ ] Leer [README.md](README.md) del proyecto
- [ ] Leer [PROYECTO-COMPLETO.md](PROYECTO-COMPLETO.md)
- [ ] Tener a mano [QUICK-DEPLOY.md](QUICK-DEPLOY.md) para referencia rápida

### Guías de Deployment
- [ ] Guardar link a [DEPLOYMENT-GUIDE.md](DEPLOYMENT-GUIDE.md)
- [ ] Guardar link a [backend/DEPLOYMENT.md](backend/DEPLOYMENT.md)
- [ ] Guardar link a [frontend/DEPLOYMENT.md](frontend/DEPLOYMENT.md)

### Soporte
- [ ] Anotar donde buscar logs:
  - Render: Dashboard → Servicio → Logs
  - Vercel: Dashboard → Proyecto → Deployments
  - Supabase: Dashboard → Logs
- [ ] Conocer troubleshooting común (ver guías)

---

## 🐛 Problemas Comunes

### Si algo falla:

#### Backend no inicia
- [ ] Verificar logs en Render
- [ ] Verificar que variables de entorno están configuradas
- [ ] Verificar que `requirements.txt` existe
- [ ] Verificar conexión a Supabase

#### Frontend no se ve
- [ ] Verificar logs de build en Vercel
- [ ] Verificar que `npm run build` funciona localmente
- [ ] Verificar que archivos están en `dist/`

#### Error de CORS
- [ ] Verificar que `CORS_ORIGINS` incluye URL exacta de Vercel
- [ ] Verificar que incluye `https://` (no `http://`)
- [ ] Verificar que no hay espacios extra
- [ ] Esperar a que Render reinicie (30-60 seg)

#### Database no conecta
- [ ] Verificar `SUPABASE_URL` en Render
- [ ] Verificar `SUPABASE_KEY` en Render
- [ ] Verificar que tablas existen en Supabase
- [ ] Ver logs en Render para error específico

---

## 🎉 Completado

### ¡Felicitaciones! Tu app está en producción

Tienes:
- ✅ Backend en Render
- ✅ Frontend en Vercel
- ✅ Base de datos en Supabase
- ✅ CORS configurado
- ✅ Sistema funcionando

### Siguientes Pasos
- [ ] Usar el sistema
- [ ] Crear lotes reales
- [ ] Analizar reportes
- [ ] Optimizar operación

---

**Total de tareas completadas: _____ / 120**

---

## 📝 Notas Adicionales

```
Fecha de despliegue: _______________
Tiempo total: _______________
Problemas encontrados: 

________________________________________________

________________________________________________

________________________________________________

Soluciones aplicadas:

________________________________________________

________________________________________________

________________________________________________
```

---

**¡Éxito en tu despliegue! 🚀🎉**

