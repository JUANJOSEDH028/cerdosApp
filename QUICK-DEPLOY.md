# ⚡ Guía Rápida de Despliegue

Para usuarios con experiencia. Si eres nuevo, usa [DEPLOYMENT-GUIDE.md](DEPLOYMENT-GUIDE.md).

---

## 🎯 Resumen en 4 Pasos

### 1️⃣ Supabase (Base de Datos)

```bash
# 1. Crear cuenta en supabase.com
# 2. Crear proyecto
# 3. Ejecutar SQL desde DEPLOYMENT-GUIDE.md (Fase 1.3)
# 4. Copiar URL y anon key
```

### 2️⃣ Render (Backend)

```bash
# 1. Crear cuenta en render.com con GitHub
# 2. New Web Service → Conectar repositorio
# 3. Configurar:
Root Directory: backend
Build: pip install -r requirements.txt
Start: uvicorn app.main:app --host 0.0.0.0 --port $PORT
Plan: Free

# 4. Variables de entorno:
SUPABASE_URL=https://xxx.supabase.co
SUPABASE_KEY=eyJhbGc...
CORS_ORIGINS=*
ENVIRONMENT=production
PYTHON_VERSION=3.11.0

# 5. Deploy
# 6. Copiar URL: https://xxx.onrender.com
```

### 3️⃣ Vercel (Frontend)

```bash
# 1. Crear cuenta en vercel.com con GitHub
# 2. Import Project → Seleccionar repositorio
# 3. Configurar:
Framework: Vite
Root Directory: frontend
Build: npm run build
Output: dist

# 4. Variables de entorno:
VITE_API_URL=https://xxx.onrender.com/api
VITE_ENVIRONMENT=production

# 5. Deploy
# 6. Copiar URL: https://xxx.vercel.app
```

### 4️⃣ Conectar (CORS)

```bash
# En Render → Environment → Editar CORS_ORIGINS:
CORS_ORIGINS=https://xxx.vercel.app,https://xxx-git-main.vercel.app

# Guardar y esperar reinicio (30 seg)
```

---

## ✅ Verificación

```bash
# Backend
curl https://xxx.onrender.com/health
# Debe retornar: {"status":"healthy","database":"connected"}

# Frontend
# Abrir https://xxx.vercel.app
# Abrir DevTools → Network
# Navegar en la app
# Verificar que peticiones a API funcionen (status 200)
```

---

## 🔧 Variables de Entorno

### Backend (Render)
```env
SUPABASE_URL=https://xxx.supabase.co
SUPABASE_KEY=eyJhbGc...
CORS_ORIGINS=https://xxx.vercel.app
ENVIRONMENT=production
PYTHON_VERSION=3.11.0
```

### Frontend (Vercel)
```env
VITE_API_URL=https://xxx.onrender.com/api
VITE_ENVIRONMENT=production
```

---

## 📝 SQL para Supabase

Ejecuta en SQL Editor de Supabase:

```sql
-- Corrales
CREATE TABLE corrales (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nombre VARCHAR(100) NOT NULL,
    capacidad INTEGER NOT NULL CHECK (capacidad > 0),
    activo BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Alimentos
CREATE TABLE alimentos (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nombre VARCHAR(100) NOT NULL,
    tipo VARCHAR(50) NOT NULL CHECK (tipo IN ('PREINICIADOR', 'LEVANTE', 'ENGORDE')),
    costo_por_kg DECIMAL(10,2) NOT NULL CHECK (costo_por_kg >= 0),
    activo BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Lotes
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

-- Lotes-Corrales (tabla intermedia)
CREATE TABLE lotes_corrales (
    lote_id UUID NOT NULL REFERENCES lotes(id) ON DELETE CASCADE,
    corral_id UUID NOT NULL REFERENCES corrales(id) ON DELETE CASCADE,
    PRIMARY KEY (lote_id, corral_id)
);

-- Consumo Alimento
CREATE TABLE consumo_alimento (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    lote_id UUID NOT NULL REFERENCES lotes(id) ON DELETE CASCADE,
    alimento_id UUID NOT NULL REFERENCES alimentos(id) ON DELETE RESTRICT,
    cantidad_kg DECIMAL(10,2) NOT NULL CHECK (cantidad_kg > 0),
    fecha DATE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Mortalidad
CREATE TABLE mortalidad (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    lote_id UUID NOT NULL REFERENCES lotes(id) ON DELETE CASCADE,
    cantidad INTEGER NOT NULL CHECK (cantidad > 0),
    fecha DATE NOT NULL,
    observaciones TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Cosechas
CREATE TABLE cosechas (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    lote_id UUID NOT NULL REFERENCES lotes(id) ON DELETE CASCADE,
    peso_total_kg DECIMAL(10,2) NOT NULL CHECK (peso_total_kg > 0),
    precio_venta DECIMAL(12,2) NOT NULL CHECK (precio_venta >= 0),
    fecha DATE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Gastos Mensuales
CREATE TABLE gastos_mensuales (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    mes VARCHAR(7) NOT NULL,
    tipo VARCHAR(50) NOT NULL CHECK (tipo IN ('ELECTRICIDAD', 'AGUA', 'SALARIOS', 'ALQUILER', 'INSUMOS', 'MANTENIMIENTO', 'OTROS')),
    monto DECIMAL(12,2) NOT NULL CHECK (monto >= 0),
    descripcion TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Gastos Directos
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

-- Índices
CREATE INDEX idx_lotes_estado ON lotes(estado);
CREATE INDEX idx_consumo_lote ON consumo_alimento(lote_id);
CREATE INDEX idx_mortalidad_lote ON mortalidad(lote_id);
CREATE INDEX idx_cosechas_lote ON cosechas(lote_id);
CREATE INDEX idx_gastos_directos_lote ON gastos_directos(lote_id);
```

---

## 🐛 Troubleshooting Rápido

| Problema | Solución |
|----------|----------|
| CORS error | Actualizar `CORS_ORIGINS` en Render con URL de Vercel |
| Backend dormido | Normal en plan free. Primera petición tarda 30-60s |
| Build failed Vercel | Verificar que `npm run build` funcione localmente |
| DB no conecta | Verificar `SUPABASE_URL` y `SUPABASE_KEY` en Render |

---

## 📚 Guías Completas

- [DEPLOYMENT-GUIDE.md](DEPLOYMENT-GUIDE.md) - Guía paso a paso con screenshots
- [backend/DEPLOYMENT.md](backend/DEPLOYMENT.md) - Detalles del backend
- [frontend/DEPLOYMENT.md](frontend/DEPLOYMENT.md) - Detalles del frontend

---

## ⏱️ Tiempo Estimado

- **Base de Datos**: 10-15 min
- **Backend**: 15-20 min  
- **Frontend**: 10-15 min
- **Verificación**: 5-10 min

**Total**: ~45-60 minutos

---

## 💰 Costo

Todo es **GRATIS** con los planes free de:
- ✅ Supabase Free: 500MB DB, 2GB storage
- ✅ Render Free: 750 horas/mes
- ✅ Vercel Free: 100GB bandwidth/mes

---

**¡Tu app estará lista en menos de 1 hora! 🚀**

