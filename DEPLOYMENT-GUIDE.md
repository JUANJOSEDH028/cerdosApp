# 🚀 Guía Completa de Despliegue
## Sistema de Control de Costos para Ceba de Cerdos

Esta guía te llevará paso a paso para desplegar tu aplicación en producción.

---

## 📋 Resumen

- **Backend**: Render (FastAPI + Python)
- **Frontend**: Vercel (React + TypeScript)
- **Base de Datos**: Supabase (PostgreSQL)

---

## 🎯 Plan de Despliegue

### Fase 1: Preparar la Base de Datos (15 min)
### Fase 2: Desplegar el Backend (20 min)
### Fase 3: Desplegar el Frontend (15 min)
### Fase 4: Verificar y Probar (10 min)

**Tiempo Total Estimado**: 60 minutos

---

## 📊 Fase 1: Preparar la Base de Datos en Supabase

### 1.1 Crear Cuenta en Supabase

1. Ve a [supabase.com](https://supabase.com)
2. Click en "Start your project"
3. Crea una cuenta (GitHub, Google, o email)

### 1.2 Crear Proyecto

1. Click en "New Project"
2. Configura:
   - **Name**: `cerdos-produccion`
   - **Database Password**: (Genera una segura)
   - **Region**: Selecciona el más cercano
   - **Plan**: Free (suficiente para empezar)
3. Click en "Create new project"
4. Espera 2-3 minutos mientras Supabase configura todo

### 1.3 Crear las Tablas

1. En el dashboard de Supabase, ve a **SQL Editor**
2. Click en "New Query"
3. Copia y pega este SQL para crear todas las tablas:

```sql
-- Tabla: corrales
CREATE TABLE corrales (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nombre VARCHAR(100) NOT NULL,
    capacidad INTEGER NOT NULL CHECK (capacidad > 0),
    activo BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Tabla: alimentos
CREATE TABLE alimentos (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nombre VARCHAR(100) NOT NULL,
    tipo VARCHAR(50) NOT NULL CHECK (tipo IN ('PREINICIADOR', 'LEVANTE', 'ENGORDE')),
    costo_por_kg DECIMAL(10,2) NOT NULL CHECK (costo_por_kg >= 0),
    activo BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Tabla: lotes
CREATE TABLE lotes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    numero_lote VARCHAR(50) NOT NULL UNIQUE,
    cantidad_inicial INTEGER NOT NULL CHECK (cantidad_inicial > 0),
    peso_inicial_promedio DECIMAL(10,2) NOT NULL CHECK (peso_inicial_promedio > 0),
    costo_lechones DECIMAL(12,2) NOT NULL CHECK (costo_lechones >= 0),
    fecha_inicio DATE NOT NULL,
    fecha_cierre DATE,
    estado VARCHAR(20) NOT NULL DEFAULT 'ACTIVO' CHECK (estado IN ('ACTIVO', 'CERRADO')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Tabla intermedia: lotes_corrales
CREATE TABLE lotes_corrales (
    lote_id UUID NOT NULL REFERENCES lotes(id) ON DELETE CASCADE,
    corral_id UUID NOT NULL REFERENCES corrales(id) ON DELETE CASCADE,
    PRIMARY KEY (lote_id, corral_id)
);

-- Tabla: consumo_alimento
CREATE TABLE consumo_alimento (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    lote_id UUID NOT NULL REFERENCES lotes(id) ON DELETE CASCADE,
    alimento_id UUID NOT NULL REFERENCES alimentos(id) ON DELETE RESTRICT,
    cantidad_kg DECIMAL(10,2) NOT NULL CHECK (cantidad_kg > 0),
    fecha DATE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Tabla: mortalidad
CREATE TABLE mortalidad (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    lote_id UUID NOT NULL REFERENCES lotes(id) ON DELETE CASCADE,
    cantidad INTEGER NOT NULL CHECK (cantidad > 0),
    fecha DATE NOT NULL,
    observaciones TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Tabla: cosechas
CREATE TABLE cosechas (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    lote_id UUID NOT NULL REFERENCES lotes(id) ON DELETE CASCADE,
    peso_total_kg DECIMAL(10,2) NOT NULL CHECK (peso_total_kg > 0),
    precio_venta DECIMAL(12,2) NOT NULL CHECK (precio_venta >= 0),
    fecha DATE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Tabla: gastos_mensuales
CREATE TABLE gastos_mensuales (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    mes VARCHAR(7) NOT NULL,
    tipo VARCHAR(50) NOT NULL CHECK (tipo IN ('ELECTRICIDAD', 'AGUA', 'SALARIOS', 'ALQUILER', 'INSUMOS', 'MANTENIMIENTO', 'OTROS')),
    monto DECIMAL(12,2) NOT NULL CHECK (monto >= 0),
    descripcion TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Tabla: gastos_directos
CREATE TABLE gastos_directos (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    lote_id UUID NOT NULL REFERENCES lotes(id) ON DELETE CASCADE,
    tipo VARCHAR(50) NOT NULL CHECK (tipo IN ('MEDICAMENTOS', 'VETERINARIO', 'TRANSPORTE', 'MANTENIMIENTO', 'OTROS')),
    monto DECIMAL(12,2) NOT NULL CHECK (monto >= 0),
    fecha DATE NOT NULL,
    descripcion TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Índices para mejorar performance
CREATE INDEX idx_lotes_estado ON lotes(estado);
CREATE INDEX idx_consumo_lote ON consumo_alimento(lote_id);
CREATE INDEX idx_mortalidad_lote ON mortalidad(lote_id);
CREATE INDEX idx_cosechas_lote ON cosechas(lote_id);
CREATE INDEX idx_gastos_directos_lote ON gastos_directos(lote_id);
```

4. Click en "Run" o presiona Ctrl+Enter
5. Verifica que todo se creó correctamente

### 1.4 Obtener Credenciales

1. Ve a **Settings** → **API**
2. Copia y guarda:
   - **Project URL**: `https://xxx.supabase.co`
   - **anon/public key**: `eyJhbGc...` (key larga)

✅ **Fase 1 completada!**

---

## 🔧 Fase 2: Desplegar el Backend en Render

### 2.1 Preparar el Código

1. **Asegúrate de que el código esté en GitHub**:
```bash
cd backend
git add .
git commit -m "Preparar backend para deployment"
git push origin main
```

### 2.2 Crear Cuenta en Render

1. Ve a [render.com](https://render.com)
2. Click en "Get Started for Free"
3. Crea una cuenta con GitHub

### 2.3 Crear el Web Service

1. En el dashboard, click en "New +" → "Web Service"
2. Conecta tu repositorio de GitHub
3. Selecciona el repositorio `cerdos`

### 2.4 Configurar el Servicio

**Settings básicos**:
- **Name**: `cerdos-api` (o el nombre que prefieras)
- **Region**: Oregon (o el más cercano a ti)
- **Branch**: `main`
- **Root Directory**: `backend`
- **Runtime**: Python 3
- **Build Command**: `pip install -r requirements.txt`
- **Start Command**: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`

**Plan**:
- Selecciona **Free**

### 2.5 Variables de Entorno

En la sección "Environment Variables", click en "Add Environment Variable" y agrega:

| Key | Value |
|-----|-------|
| `SUPABASE_URL` | Tu URL de Supabase (de Fase 1) |
| `SUPABASE_KEY` | Tu anon key de Supabase (de Fase 1) |
| `CORS_ORIGINS` | `*` (temporalmente, lo cambiaremos después) |
| `ENVIRONMENT` | `production` |
| `PYTHON_VERSION` | `3.11.0` |

### 2.6 Configuración Avanzada (Opcional)

- **Health Check Path**: `/health`
- **Auto-Deploy**: Yes

### 2.7 Deploy

1. Click en "Create Web Service"
2. Espera 5-10 minutos mientras Render:
   - Clona tu código
   - Instala dependencias
   - Inicia el servidor
3. Verás logs en tiempo real

### 2.8 Verificar

Una vez completado, tu backend estará en:
```
https://cerdos-api.onrender.com
```

Prueba:
```bash
curl https://tu-app.onrender.com/health
```

Deberías ver:
```json
{
  "status": "healthy",
  "database": "connected",
  "environment": "production"
}
```

**Guarda esta URL**, la necesitarás para el frontend!

✅ **Fase 2 completada!**

---

## 🎨 Fase 3: Desplegar el Frontend en Vercel

### 3.1 Preparar Variables de Entorno

1. En tu proyecto local, crea `frontend/.env.production`:
```env
VITE_API_URL=https://tu-app.onrender.com/api
VITE_ENVIRONMENT=production
```

**⚠️ IMPORTANTE**: Reemplaza `tu-app.onrender.com` con tu URL real de Render.

2. Guarda el archivo (NO lo subas a Git, está en .gitignore)

### 3.2 Verificar Build Local

```bash
cd frontend
npm install
npm run build
```

Si hay errores, corrígelos antes de continuar.

### 3.3 Crear Cuenta en Vercel

1. Ve a [vercel.com](https://vercel.com)
2. Click en "Sign Up"
3. Crea una cuenta con GitHub

### 3.4 Importar Proyecto

1. En el dashboard de Vercel, click en "Add New..." → "Project"
2. Importa tu repositorio `cerdos` de GitHub
3. Vercel lo detectará automáticamente

### 3.5 Configurar el Proyecto

**Project Settings**:
- **Framework Preset**: Vite (auto-detectado)
- **Root Directory**: `frontend`
- **Build Command**: `npm run build` (default)
- **Output Directory**: `dist` (default)
- **Install Command**: `npm install` (default)

### 3.6 Variables de Entorno

En "Environment Variables", agrega:

| Name | Value | Environment |
|------|-------|-------------|
| `VITE_API_URL` | `https://tu-app.onrender.com/api` | Production |
| `VITE_ENVIRONMENT` | `production` | Production |

**⚠️ Reemplaza** `tu-app.onrender.com` con tu URL real de Render.

### 3.7 Deploy

1. Click en "Deploy"
2. Espera 2-5 minutos
3. Vercel te dará una URL como: `https://cerdos-app.vercel.app`

### 3.8 Probar

1. Abre la URL de Vercel en tu navegador
2. Deberías ver el Dashboard
3. Intenta navegar por la app

**Guarda esta URL**, la necesitarás para configurar CORS!

✅ **Fase 3 completada!**

---

## 🔗 Fase 4: Conectar Frontend y Backend

### 4.1 Actualizar CORS en el Backend

1. Ve a Render Dashboard
2. Selecciona tu servicio `cerdos-api`
3. Ve a "Environment"
4. Edita la variable `CORS_ORIGINS`:
   ```
   https://tu-app.vercel.app,https://tu-app-git-main.vercel.app
   ```
5. Guarda (esto reiniciará el servicio automáticamente)

### 4.2 Verificar Conexión

1. Abre tu app en Vercel
2. Abre las DevTools (F12)
3. Ve a la pestaña "Network"
4. Navega por la app (ej: ir a Lotes)
5. Verifica que:
   - Las peticiones se hacen a tu backend en Render
   - Las respuestas son exitosas (status 200)
   - No hay errores de CORS en la consola

### 4.3 Probar Funcionalidades

Prueba las funcionalidades principales:
- [ ] Dashboard carga correctamente
- [ ] Puedes ver la lista de lotes
- [ ] Puedes crear un lote (si tienes datos)
- [ ] Los reportes funcionan
- [ ] Todas las rutas funcionan correctamente

✅ **Fase 4 completada!**

---

## 🎉 ¡Despliegue Completado!

### 🔗 URLs de tu Aplicación

- **Frontend**: `https://tu-app.vercel.app`
- **Backend**: `https://tu-app.onrender.com`
- **API Docs**: `https://tu-app.onrender.com/docs`
- **Base de Datos**: Supabase Dashboard

---

## 📝 Post-Despliegue

### Datos Iniciales

Para que la app funcione completamente, necesitas crear datos iniciales:

1. **Corrales**: Crea al menos 2-3 corrales
2. **Alimentos**: Crea los 3 tipos (PREINICIADOR, LEVANTE, ENGORDE)
3. **Lote**: Crea un lote de prueba

Puedes hacerlo desde:
- La interfaz web (recomendado)
- La documentación interactiva de la API (`/docs`)

### Monitoreo

**Backend (Render)**:
- Ve a tu servicio → "Logs" para ver logs en tiempo real
- Ve a "Metrics" para ver CPU/Memory usage

**Frontend (Vercel)**:
- Ve a tu proyecto → "Deployments" para ver el historial
- Ve a "Analytics" para activar analytics (opcional)

**Base de Datos (Supabase)**:
- Ve a "Database" → "Tables" para ver/editar datos
- Ve a "API" → "Logs" para ver peticiones a la BD

---

## 🐛 Solución de Problemas Comunes

### Error de CORS

**Síntoma**: En la consola del navegador ves "blocked by CORS policy"

**Solución**:
1. Verifica que `CORS_ORIGINS` en Render incluya tu URL de Vercel
2. Verifica que la URL sea exacta (con https://, sin barra final)
3. Espera 30-60 segundos a que Render reinicie el servicio

### Backend "Dormido" (Render Free)

**Síntoma**: Primera petición tarda 30-60 segundos

**Solución**:
- Es normal en el plan free de Render
- El servicio se "duerme" después de 15 minutos sin uso
- Opción: Usar un servicio de ping como UptimeRobot

### Build Failed en Vercel

**Síntoma**: El deploy falla

**Solución**:
1. Lee los logs del build en Vercel
2. Verifica que `npm run build` funcione localmente
3. Verifica que todas las variables de entorno estén configuradas

### Base de Datos no Conecta

**Síntoma**: Backend responde pero dice "database: error"

**Solución**:
1. Verifica que `SUPABASE_URL` y `SUPABASE_KEY` sean correctos
2. Verifica que las tablas existan en Supabase
3. Ve a los logs de Render para ver el error específico

---

## 📚 Guías Detalladas

Para más información:
- [Backend en Render](backend/DEPLOYMENT.md)
- [Frontend en Vercel](frontend/DEPLOYMENT.md)

---

## 💰 Costos

Todo lo que usamos tiene un plan free generoso:

| Servicio | Plan Free |
|----------|-----------|
| **Supabase** | 500 MB database, 2GB storage, 50K MAU |
| **Render** | 750 horas/mes, 512MB RAM |
| **Vercel** | 100GB bandwidth/mes, deploys ilimitados |

**Costo Total**: $0 (Free) 🎉

---

## ✅ Checklist Final

- [ ] Base de datos creada en Supabase
- [ ] Backend desplegado en Render
- [ ] Frontend desplegado en Vercel
- [ ] CORS configurado correctamente
- [ ] Variables de entorno configuradas
- [ ] Conexión frontend-backend funciona
- [ ] Datos iniciales creados (corrales, alimentos)
- [ ] Todas las funcionalidades probadas

---

## 🎓 Siguientes Pasos

Ahora que tu app está en producción:

1. **Crea datos iniciales** (corrales, alimentos, lotes)
2. **Comparte la URL** con tu equipo
3. **Configura un dominio personalizado** (opcional)
4. **Activa analytics** en Vercel (opcional)
5. **Configura backups** en Supabase (opcional)

---

## 📞 Soporte

Si tienes problemas:
1. Revisa los logs en Render/Vercel
2. Revisa las guías detalladas
3. Revisa la documentación oficial:
   - [Render Docs](https://render.com/docs)
   - [Vercel Docs](https://vercel.com/docs)
   - [Supabase Docs](https://supabase.com/docs)

---

**¡Felicitaciones! Tu aplicación está en producción 🚀🎉**

