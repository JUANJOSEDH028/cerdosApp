# 🔧 Comandos Útiles

Referencia rápida de comandos para desarrollo y deployment.

---

## 🐍 Backend (Python/FastAPI)

### Desarrollo Local

```bash
# Ir al directorio backend
cd backend

# Crear entorno virtual
python -m venv .venv

# Activar entorno virtual
# Windows:
.venv\Scripts\activate
# Linux/Mac:
source .venv/bin/activate

# Instalar dependencias
pip install -r requirements.txt

# Iniciar servidor de desarrollo
uvicorn app.main:app --reload

# Iniciar en puerto específico
uvicorn app.main:app --reload --port 8000

# Ver logs detallados
uvicorn app.main:app --reload --log-level debug
```

### Testing

```bash
# Ejecutar tests (cuando se implementen)
pytest

# Con coverage
pytest --cov=app tests/
```

### Dependencias

```bash
# Agregar nueva dependencia
pip install nombre-paquete

# Actualizar requirements.txt
pip freeze > requirements.txt

# Verificar versiones instaladas
pip list
```

---

## ⚛️ Frontend (React/TypeScript)

### Desarrollo Local

```bash
# Ir al directorio frontend
cd frontend

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# Iniciar en puerto específico
npm run dev -- --port 3000
```

### Build

```bash
# Build para producción
npm run build

# Preview del build
npm run preview

# Build con análisis
npm run build -- --mode production
```

### Linting y Formatting

```bash
# Ejecutar ESLint
npm run lint

# Fix automático de errores
npm run lint -- --fix
```

### Testing

```bash
# Ejecutar tests (cuando se implementen)
npm run test

# Tests en modo watch
npm run test -- --watch

# Coverage
npm run test -- --coverage
```

---

## 🗄️ Base de Datos (Supabase)

### SQL útiles

```sql
-- Ver todas las tablas
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public';

-- Contar registros en cada tabla
SELECT 'corrales' as tabla, COUNT(*) FROM corrales
UNION ALL
SELECT 'alimentos', COUNT(*) FROM alimentos
UNION ALL
SELECT 'lotes', COUNT(*) FROM lotes;

-- Limpiar una tabla
TRUNCATE TABLE nombre_tabla CASCADE;

-- Eliminar todos los datos (CUIDADO)
TRUNCATE TABLE corrales CASCADE;
TRUNCATE TABLE alimentos CASCADE;
TRUNCATE TABLE lotes CASCADE;
-- ... resto de tablas
```

### Backup Manual

```bash
# Desde Supabase Dashboard:
# Settings → Database → Connection string
# Usar con pg_dump para backup local
```

---

## 🚀 Deployment

### Git

```bash
# Verificar estado
git status

# Agregar cambios
git add .

# Commit
git commit -m "Descripción de cambios"

# Push a GitHub
git push origin main

# Ver último commit
git log -1

# Ver commits recientes
git log --oneline -5
```

### Render (Backend)

```bash
# No hay CLI, todo desde Dashboard
# Pero puedes ver logs:
# Dashboard → Servicio → Logs

# Para forzar redeploy:
# Dashboard → Manual Deploy → Deploy
```

### Vercel (Frontend)

```bash
# Instalar Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy desde local
cd frontend
vercel

# Deploy a producción
vercel --prod

# Ver logs
vercel logs

# Ver deployments
vercel ls

# Ver variables de entorno
vercel env ls
```

---

## 🔧 Utilidades

### Verificar Instalaciones

```bash
# Python
python --version

# Node
node --version

# npm
npm --version

# Git
git --version
```

### Verificar Servicios

```bash
# Verificar backend local
curl http://localhost:8000/health

# Verificar backend en Render
curl https://tu-app.onrender.com/health

# Verificar frontend local
curl http://localhost:5173

# Ver todos los puertos en uso (Windows)
netstat -ano | findstr :8000
netstat -ano | findstr :5173

# Ver todos los puertos en uso (Linux/Mac)
lsof -i :8000
lsof -i :5173
```

### Limpiar y Resetear

```bash
# Backend: Limpiar cache de Python
cd backend
find . -type d -name __pycache__ -exec rm -rf {} +
# Windows:
for /d /r . %d in (__pycache__) do @if exist "%d" rd /s /q "%d"

# Frontend: Limpiar node_modules y cache
cd frontend
rm -rf node_modules
rm -rf dist
rm package-lock.json
npm install
# Windows:
rmdir /s /q node_modules
rmdir /s /q dist
del package-lock.json
npm install
```

---

## 🐛 Debug

### Backend

```bash
# Ver logs en tiempo real (local)
# Los logs aparecen automáticamente en la terminal donde corre uvicorn

# Agregar print debugging
# En cualquier archivo .py:
print(f"Debug: variable = {variable}")

# Usar logging
import logging
logging.basicConfig(level=logging.DEBUG)
logging.debug("Mensaje de debug")
```

### Frontend

```bash
# Ver logs del build
npm run build

# Revisar bundle size
npm run build
# Luego revisar dist/assets

# Debugging en navegador
# F12 → Console
# Ver Network tab para peticiones API
# Ver Application tab para localStorage/cookies
```

### Variables de Entorno

```bash
# Backend: Verificar .env
cd backend
cat .env  # Linux/Mac
type .env  # Windows

# Frontend: Verificar variables
cd frontend
cat .env  # Linux/Mac
type .env  # Windows

# IMPORTANTE: Las variables del frontend deben empezar con VITE_
```

---

## 📊 Monitoreo

### Verificar Estado de Servicios

```bash
# Backend en Render
curl https://tu-app.onrender.com/health
# Debe retornar: {"status":"healthy","database":"connected"}

# API docs
curl https://tu-app.onrender.com/docs
# O abrir en navegador

# Frontend en Vercel
curl -I https://tu-app.vercel.app
# Debe retornar: HTTP/2 200
```

### Logs

```bash
# Backend (Render)
# Dashboard → Servicio → Logs
# O via API (requiere auth):
# curl https://api.render.com/v1/services/srv-xxx/logs

# Frontend (Vercel)
vercel logs tu-proyecto

# Base de Datos (Supabase)
# Dashboard → Logs → Query Performance
```

---

## 🔄 Actualizaciones

### Actualizar Dependencias

```bash
# Backend
cd backend
pip list --outdated
pip install --upgrade nombre-paquete
pip freeze > requirements.txt

# Frontend
cd frontend
npm outdated
npm update nombre-paquete
npm install nombre-paquete@latest
```

### Deploy Nuevas Versiones

```bash
# 1. Hacer cambios en el código
# 2. Commit y push
git add .
git commit -m "Nuevas mejoras"
git push origin main

# 3. Auto-deploy en Render y Vercel
# (si tienes Auto-Deploy activado)

# 4. O manual en Vercel:
cd frontend
vercel --prod
```

---

## 💾 Backup

### Base de Datos

```bash
# Desde Supabase Dashboard:
# 1. SQL Editor
# 2. Ejecutar: SELECT * FROM tabla;
# 3. Export a CSV

# O usando connection string con pg_dump
```

### Código

```bash
# Git es tu backup principal
git push origin main

# Crear backup adicional
git clone tu-repo backup-fecha

# O comprimir proyecto
tar -czf backup-proyecto.tar.gz cerdos/
# Windows:
# Usar 7-Zip o WinRAR
```

---

## 🧪 Testing (Cuando se implemente)

### Backend

```bash
cd backend

# Ejecutar todos los tests
pytest

# Tests específicos
pytest tests/test_lotes.py

# Con output verbose
pytest -v

# Con coverage
pytest --cov=app --cov-report=html
```

### Frontend

```bash
cd frontend

# Ejecutar tests
npm test

# Watch mode
npm test -- --watch

# Coverage
npm test -- --coverage
```

---

## 📦 Instalación Completa desde Cero

```bash
# 1. Clonar repositorio
git clone [url-del-repo] cerdos
cd cerdos

# 2. Setup Backend
cd backend
python -m venv .venv
# Activar venv
pip install -r requirements.txt
# Configurar .env
uvicorn app.main:app --reload &

# 3. Setup Frontend (en otra terminal)
cd ../frontend
npm install
npm run dev

# 4. Abrir navegador
# Frontend: http://localhost:5173
# Backend: http://localhost:8000
# API Docs: http://localhost:8000/docs
```

---

## 🎯 Comandos Rápidos

```bash
# Desarrollo local completo (2 terminales)
# Terminal 1 (Backend):
cd backend && .venv\Scripts\activate && uvicorn app.main:app --reload

# Terminal 2 (Frontend):
cd frontend && npm run dev

# Build para producción
cd frontend && npm run build

# Deploy a Vercel
cd frontend && vercel --prod
```

---

**Para más información, consulta los archivos de documentación del proyecto** 📚

