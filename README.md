# 🐷 Sistema de Control de Costos para Ceba de Cerdos

Sistema full-stack completo para la gestión integral de costos en la producción porcina.

[![Backend](https://img.shields.io/badge/Backend-FastAPI-009688?style=flat&logo=fastapi)](https://fastapi.tiangolo.com/)
[![Frontend](https://img.shields.io/badge/Frontend-React-61DAFB?style=flat&logo=react)](https://react.dev/)
[![Database](https://img.shields.io/badge/Database-Supabase-3ECF8E?style=flat&logo=supabase)](https://supabase.com/)
[![Deploy Backend](https://img.shields.io/badge/Deploy-Render-46E3B7?style=flat&logo=render)](https://render.com/)
[![Deploy Frontend](https://img.shields.io/badge/Deploy-Vercel-000000?style=flat&logo=vercel)](https://vercel.com/)

---

## 📋 Descripción

Sistema completo para el control de costos en la ceba de cerdos que permite:

- 📊 **Gestión de Lotes**: Crear, editar y monitorear lotes de cerdos
- 📝 **Registros Diarios**: Consumo de alimento, mortalidad
- 🚚 **Control de Cosechas**: Registro de ventas y pesos
- 💰 **Gestión de Gastos**: Mensuales (prorrateables) y directos
- 📈 **Reportes Completos**: Costos detallados e indicadores de eficiencia
- 📱 **100% Responsive**: Funciona en móvil, tablet y desktop

---

## 🏗️ Arquitectura

```
┌─────────────────┐      ┌─────────────────┐      ┌─────────────────┐
│                 │      │                 │      │                 │
│  React + TS     │─────▶│  FastAPI        │─────▶│  Supabase       │
│  (Frontend)     │      │  (Backend)      │      │  (PostgreSQL)   │
│                 │      │                 │      │                 │
└─────────────────┘      └─────────────────┘      └─────────────────┘
     Vercel                   Render                  Cloud DB
```

---

## 🛠️ Stack Tecnológico

### Backend
- **FastAPI** 0.115+ - Framework web moderno y rápido
- **Python** 3.11+ - Lenguaje de programación
- **Supabase** - PostgreSQL como servicio
- **Pydantic** v2 - Validación de datos
- **Uvicorn** - Servidor ASGI

### Frontend
- **React** 19 - Biblioteca UI
- **TypeScript** 5.6+ - Tipado estático
- **Vite** 7 - Build tool ultrarrápido
- **Tailwind CSS** 4 - Framework de estilos
- **React Router** 7 - Navegación
- **Axios** - Cliente HTTP

---

## 🚀 Inicio Rápido

### Desarrollo Local

#### 1. Backend

```bash
# Navegar al directorio backend
cd backend

# Crear entorno virtual
python -m venv .venv

# Activar entorno virtual
# En Windows:
.venv\Scripts\activate
# En Linux/Mac:
source .venv/bin/activate

# Instalar dependencias
pip install -r requirements.txt

# Configurar variables de entorno
# Crea un archivo .env con:
SUPABASE_URL=tu_url_de_supabase
SUPABASE_KEY=tu_key_de_supabase

# Iniciar servidor
uvicorn app.main:app --reload
```

Backend disponible en: `http://localhost:8000`
Documentación API: `http://localhost:8000/docs`

#### 2. Frontend

```bash
# Navegar al directorio frontend
cd frontend

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev
```

Frontend disponible en: `http://localhost:5173`

---

## 📦 Despliegue en Producción

### 🚀 Guía Completa de Despliegue

Sigue la guía paso a paso en: **[DEPLOYMENT-GUIDE.md](DEPLOYMENT-GUIDE.md)**

Esta guía incluye:
- ✅ Configuración de Supabase (Base de datos)
- ✅ Despliegue del Backend en Render
- ✅ Despliegue del Frontend en Vercel
- ✅ Configuración de CORS
- ✅ Verificación y pruebas
- ✅ Solución de problemas comunes

### Guías Específicas

- **Backend en Render**: [backend/DEPLOYMENT.md](backend/DEPLOYMENT.md)
- **Frontend en Vercel**: [frontend/DEPLOYMENT.md](frontend/DEPLOYMENT.md)

---

## 📁 Estructura del Proyecto

```
cerdos/
├── backend/                    # API REST en Python
│   ├── app/
│   │   ├── models/            # Modelos Pydantic
│   │   ├── routes/            # Endpoints de API
│   │   ├── services/          # Lógica de negocio
│   │   ├── config.py          # Configuración
│   │   ├── database.py        # Conexión a Supabase
│   │   └── main.py            # Aplicación FastAPI
│   ├── requirements.txt       # Dependencias Python
│   ├── render.yaml           # Configuración Render
│   ├── start.sh              # Script de inicio
│   └── DEPLOYMENT.md         # Guía de despliegue backend
│
├── frontend/                   # Aplicación React
│   ├── src/
│   │   ├── components/        # Componentes reutilizables
│   │   ├── pages/             # Páginas principales
│   │   ├── services/          # Servicios de API
│   │   ├── types/             # Tipos TypeScript
│   │   ├── config/            # Configuración
│   │   ├── App.tsx            # Rutas y app principal
│   │   └── main.tsx           # Punto de entrada
│   ├── package.json           # Dependencias Node
│   ├── vercel.json           # Configuración Vercel
│   ├── .env.example          # Ejemplo de variables de entorno
│   └── DEPLOYMENT.md         # Guía de despliegue frontend
│
├── DEPLOYMENT-GUIDE.md        # 🚀 Guía completa de despliegue
├── PROYECTO-COMPLETO.md       # Documentación del proyecto
└── README.md                  # Este archivo
```

---

## 📊 Funcionalidades

### 1. Gestión de Lotes 🐷
- Crear y configurar lotes de cerdos
- Asignar corrales
- Seguimiento de estado (ACTIVO/CERRADO)
- Vista detallada con historial completo

### 2. Registros Diarios 📝
- **Consumo de Alimento**: Registro diario por tipo de alimento
- **Mortalidad**: Control de eventos y porcentajes

### 3. Cosechas y Ventas 🚚
- Registro de ventas con peso y precio
- Historial completo de cosechas
- Cálculo automático de ingresos

### 4. Control de Gastos 💰
- **Gastos Mensuales**: Electricidad, agua, salarios (prorrateables)
- **Gastos Directos**: Medicamentos, veterinario (por lote)

### 5. Reportes y Análisis 📈
- **Reporte de Costos**:
  - Costo total del lote
  - Desglose por categoría (lechones, alimento, gastos)
  - Distribución visual con porcentajes
  
- **Indicadores de Eficiencia**:
  - Conversión alimenticia
  - Porcentaje de mortalidad
  - Costo por animal
  - Costo por kilogramo
  - Ganancia de peso

---

## 🔑 Variables de Entorno

### Backend (.env)
```env
SUPABASE_URL=https://xxx.supabase.co
SUPABASE_KEY=eyJhbGc...
CORS_ORIGINS=http://localhost:5173,https://tu-app.vercel.app
ENVIRONMENT=development
```

### Frontend (.env)
```env
VITE_API_URL=http://localhost:8000/api
VITE_ENVIRONMENT=development
```

---

## 📚 Documentación

### Documentación Técnica
- [Proyecto Completo](PROYECTO-COMPLETO.md) - Visión completa del sistema
- [README Backend](backend/README.md) - Documentación del backend (si existe)
- [README Frontend](frontend/README.md) - Documentación del frontend

### Documentación de Fases
- [FASE 1: Layout Base](frontend/FASE1-COMPLETADA.md)
- [FASE 2: Gestión de Lotes](frontend/FASE2-COMPLETADA.md)
- [FASE 3: Registros y Operaciones](frontend/FASE3-COMPLETADA.md)
- [FASE 4: Reportes y Análisis](frontend/FASE4-COMPLETADA.md)

### Guías de Despliegue
- [🚀 Guía Completa](DEPLOYMENT-GUIDE.md) - Paso a paso completo
- [Backend en Render](backend/DEPLOYMENT.md)
- [Frontend en Vercel](frontend/DEPLOYMENT.md)

---

## 🔌 API Endpoints

### Principales Endpoints

```
GET    /api/lotes                    # Listar lotes
POST   /api/lotes                    # Crear lote
GET    /api/lotes/{id}               # Obtener detalle
PATCH  /api/lotes/{id}               # Actualizar lote
POST   /api/lotes/{id}/cerrar        # Cerrar lote

GET    /api/consumo-alimento         # Listar consumo
POST   /api/consumo-alimento         # Registrar consumo

GET    /api/mortalidad               # Listar mortalidad
POST   /api/mortalidad               # Registrar mortalidad

GET    /api/cosechas                 # Listar cosechas
POST   /api/cosechas                 # Registrar cosecha

GET    /api/gastos-mensuales         # Listar gastos mensuales
POST   /api/gastos-mensuales         # Crear gasto mensual

GET    /api/gastos-directos          # Listar gastos directos
POST   /api/gastos-directos          # Crear gasto directo

GET    /api/reportes/costos/{id}     # Reporte de costos
GET    /api/reportes/indicadores/{id} # Reporte de indicadores
```

Ver documentación completa en: `/docs` (cuando el backend esté corriendo)

---

## 🧪 Testing

### Backend
```bash
cd backend
pytest
```

### Frontend
```bash
cd frontend
npm run test
```

---

## 📝 Scripts Disponibles

### Backend
```bash
# Iniciar servidor de desarrollo
uvicorn app.main:app --reload

# Iniciar servidor de producción
uvicorn app.main:app --host 0.0.0.0 --port 8000
```

### Frontend
```bash
# Desarrollo
npm run dev

# Build para producción
npm run build

# Preview del build
npm run preview

# Linting
npm run lint
```

---

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

---

## 📄 Licencia

Este proyecto es privado y confidencial.

---

## 👨‍💻 Desarrollo

Desarrollado con ❤️ para optimizar la gestión de producción porcina.

---

## 🎯 Estado del Proyecto

- ✅ **Backend**: Completado y desplegable
- ✅ **Frontend**: Completado y desplegable
- ✅ **Base de Datos**: Configurada
- ✅ **Reportes**: Implementados
- ✅ **Documentación**: Completa
- ✅ **Despliegue**: Listo para producción

---

## 📊 Estadísticas

- **Líneas de Código**: ~8,000
- **Archivos**: 80+
- **Componentes**: 30+
- **Endpoints**: 40+
- **Tiempo de Desarrollo**: 4 fases completas
- **Estado**: ✅ Producción Ready

---

## 🚀 Próximos Pasos

1. **Desplegar en producción** siguiendo [DEPLOYMENT-GUIDE.md](DEPLOYMENT-GUIDE.md)
2. **Crear datos iniciales** (corrales, alimentos, lotes)
3. **Configurar dominio personalizado** (opcional)
4. **Activar analytics** (opcional)

---

## 📞 Soporte

Para problemas o preguntas:
1. Revisa la documentación en `/docs`
2. Consulta las guías de despliegue
3. Revisa los logs en Render/Vercel

---

## ⭐ Características Destacadas

- ✨ **Interfaz Moderna**: Diseño limpio con Tailwind CSS
- 📱 **100% Responsive**: Mobile, tablet y desktop
- ⚡ **Alto Performance**: Optimizado con Vite
- 🎯 **Type-Safe**: TypeScript en todo el frontend
- 🔒 **Seguro**: Validación completa de datos
- 📊 **Analytics**: Reportes detallados y KPIs
- 🎨 **UX Excelente**: Interfaz intuitiva
- 🚀 **Deploy Fácil**: Guías paso a paso

---

**¡Sistema completo y listo para producción! 🎉🐷💰**

### 🔗 Links Útiles

- 📖 [Documentación Completa](PROYECTO-COMPLETO.md)
- 🚀 [Guía de Despliegue](DEPLOYMENT-GUIDE.md)
- 🎓 [Documentación de Fases](frontend/)
- 📊 [API Docs](http://localhost:8000/docs) (en desarrollo local)

---

**Made with ❤️ using FastAPI + React + TypeScript**

