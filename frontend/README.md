# 🐷 Sistema de Control de Costos para Ceba de Cerdos - Frontend

Sistema completo para la gestión y control de costos en la producción porcina, construido con React, TypeScript y Tailwind CSS.

---

## 🎯 Descripción

Este es el frontend del Sistema de Control de Costos para Ceba de Cerdos, una aplicación web moderna y responsive que permite:

- 📊 Gestión completa de lotes de cerdos
- 📝 Registro diario de consumo de alimento y mortalidad
- 🚚 Control de cosechas y ventas
- 💰 Gestión de gastos mensuales y directos
- 📈 Reportes detallados de costos e indicadores de eficiencia

---

## 🛠️ Tecnologías

- **React 19** - Biblioteca UI
- **TypeScript** - Tipado estático
- **Vite 7** - Herramienta de build
- **React Router DOM** - Navegación
- **Axios** - Cliente HTTP
- **Tailwind CSS 4** - Estilos
- **Heroicons** - Iconos
- **ESLint** - Linter

---

## 📁 Estructura del Proyecto

```
frontend/
├── src/
│   ├── components/         # Componentes reutilizables
│   │   ├── Layout/         # Layout principal (Sidebar, Header, MainLayout)
│   │   ├── Lotes/          # Componentes de lotes
│   │   ├── Registros/      # Componentes de registros diarios
│   │   ├── Cosechas/       # Componentes de cosechas
│   │   ├── Gastos/         # Componentes de gastos
│   │   └── Reportes/       # Componentes de reportes
│   │
│   ├── pages/              # Páginas principales
│   │   ├── Dashboard.tsx
│   │   ├── Lotes/          # Páginas de gestión de lotes
│   │   ├── Registros/      # Páginas de registros diarios
│   │   ├── Cosechas/       # Páginas de cosechas
│   │   ├── Gastos/         # Páginas de gastos
│   │   └── Reportes/       # Páginas de reportes
│   │
│   ├── services/           # Servicios de API
│   │   ├── api.client.ts   # Cliente Axios base
│   │   ├── lote.service.ts
│   │   ├── corral.service.ts
│   │   ├── alimento.service.ts
│   │   ├── consumo-alimento.service.ts
│   │   ├── mortalidad.service.ts
│   │   ├── cosecha.service.ts
│   │   ├── gasto-directo.service.ts
│   │   ├── gasto-mensual.service.ts
│   │   ├── reporte.service.ts
│   │   └── index.ts        # Exportaciones centralizadas
│   │
│   ├── types/              # Definiciones de tipos TypeScript
│   │   └── index.ts
│   │
│   ├── config/             # Configuración
│   │   └── api.config.ts   # URL del backend
│   │
│   ├── App.tsx             # Componente principal y rutas
│   ├── main.tsx            # Punto de entrada
│   └── index.css           # Estilos globales
│
├── public/                 # Recursos estáticos
├── .vscode/                # Configuración de VS Code
├── index.html              # HTML base
├── package.json            # Dependencias
├── tsconfig.json           # Configuración TypeScript
├── vite.config.ts          # Configuración Vite
├── tailwind.config.js      # Configuración Tailwind
├── postcss.config.js       # Configuración PostCSS
└── eslint.config.js        # Configuración ESLint
```

---

## 🚀 Instalación y Configuración

### Requisitos Previos
- Node.js 18+ 
- npm o yarn

### Pasos de Instalación

1. **Navegar al directorio frontend**
```bash
cd frontend
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Configurar la URL del backend**

Editar `src/config/api.config.ts`:
```typescript
export const API_URL = 'http://localhost:8000/api';
```

4. **Iniciar el servidor de desarrollo**
```bash
npm run dev
```

El frontend estará disponible en: `http://localhost:5173`

---

## 🎨 Módulos del Sistema

### 1. 🏠 Dashboard
Vista principal con resumen de la operación:
- Tarjetas de estadísticas clave
- Lista de lotes activos con progreso
- Acciones rápidas
- Alertas y recordatorios

**Ruta**: `/`

---

### 2. 🐷 Gestión de Lotes

#### Listar Lotes
- Vista de todos los lotes (activos y cerrados)
- Filtros por estado
- Tabla con información resumida
- Acciones: ver detalle, editar, cerrar

**Ruta**: `/lotes`

#### Crear Lote
- Formulario con validación
- Selección de corrales
- Configuración inicial del lote
- Validaciones de negocio

**Ruta**: `/lotes/nuevo`

#### Detalle del Lote
- Información completa del lote
- Historial de registros
- Edición de datos
- Cierre de lote

**Ruta**: `/lotes/:id`

---

### 3. 📝 Registros Diarios

#### Hub de Registros
Vista central con acceso a:
- Registro de consumo de alimento
- Registro de mortalidad
- Estadísticas rápidas

**Ruta**: `/registros`

#### Consumo de Alimento
- Formulario de registro diario
- Selección de lote y tipo de alimento
- Cantidad en kilogramos
- Historial de consumo

**Ruta**: `/registros/consumo`

#### Mortalidad
- Registro de eventos de mortalidad
- Cantidad y fecha
- Observaciones opcionales
- Historial de mortalidad

**Ruta**: `/registros/mortalidad`

---

### 4. 🚚 Cosechas

#### Listar Cosechas
- Tabla de todas las cosechas
- Información de peso y valor
- Filtros y búsqueda
- Acciones de edición/eliminación

**Ruta**: `/cosechas`

#### Nueva Cosecha
- Formulario de registro de venta
- Peso total en kilogramos
- Precio de venta
- Fecha de cosecha

**Ruta**: `/cosechas/nueva`

---

### 5. 💰 Gastos

#### Hub de Gastos
Vista central con acceso a:
- Gastos mensuales
- Gastos directos
- Resumen de gastos

**Ruta**: `/gastos`

#### Gastos Mensuales
- Registro de gastos prorrateables
- Tipos: electricidad, agua, salarios, alquiler, etc.
- Cálculo automático de prorrateo por lote
- Lista y gestión de gastos mensuales

**Ruta**: `/gastos/mensuales`

#### Gastos Directos
- Registro de gastos específicos del lote
- Tipos: medicamentos, veterinario, transporte, mantenimiento, etc.
- Asignación directa a un lote
- Lista y gestión de gastos directos

**Ruta**: `/gastos/directos`

---

### 6. 📊 Reportes

#### Hub de Reportes
Vista principal con opciones:
- Reporte de costos
- Reporte de indicadores

**Ruta**: `/reportes`

#### Reporte de Costos
Análisis detallado de costos por lote:
- **Costo Total del Lote**
- **Desglose de Costos**:
  - Lechones
  - Alimento (por tipo: preiniciador, levante, engorde)
  - Gastos directos
  - Gastos mensuales prorrateados
- **Visualización**: Barras de progreso con porcentajes

**Ruta**: `/reportes/costos`

#### Reporte de Indicadores
Métricas de eficiencia y rendimiento:
- **KPIs Principales**:
  - Conversión alimenticia
  - Porcentaje de mortalidad
  - Costo por animal
  - Costo por kilogramo
- **Indicadores de Animales**: Iniciales, vendidos, mortalidad
- **Indicadores de Peso**: Inicial, final, ganancia, total producido
- **Indicadores de Alimento**: Consumo total, conversión
- **Indicadores de Costos**: Total, por animal, por kg

**Ruta**: `/reportes/indicadores`

---

## 🔌 Integración con Backend

### API Base
```typescript
const API_URL = 'http://localhost:8000/api';
```

### Servicios Disponibles

| Servicio | Endpoint Base | Métodos |
|----------|---------------|---------|
| Lotes | `/lotes` | GET, POST, PATCH, DELETE |
| Corrales | `/corrales` | GET, POST, PATCH, DELETE |
| Alimentos | `/alimentos` | GET, POST, PATCH, DELETE |
| Consumo | `/consumo-alimento` | GET, POST, PATCH, DELETE |
| Mortalidad | `/mortalidad` | GET, POST, PATCH, DELETE |
| Cosechas | `/cosechas` | GET, POST, PATCH, DELETE |
| Gastos Directos | `/gastos-directos` | GET, POST, PATCH, DELETE |
| Gastos Mensuales | `/gastos-mensuales` | GET, POST, PATCH, DELETE |
| Reportes | `/reportes` | GET (costos, indicadores) |

### Cliente Axios
Configurado con:
- Interceptores de request/response
- Timeout de 10 segundos
- Manejo centralizado de errores
- Logging de peticiones

---

## 📦 Scripts Disponibles

```bash
# Desarrollo
npm run dev              # Inicia servidor de desarrollo

# Build
npm run build            # Compila para producción

# Preview
npm run preview          # Preview del build de producción

# Linting
npm run lint             # Ejecuta ESLint
```

---

## 🎨 Guía de Estilos

### Colores Principales
- **Verde** (`green-500/600`): Acciones principales, datos positivos
- **Azul** (`blue-500/600`): Información, enlaces
- **Amarillo** (`yellow-500/600`): Advertencias
- **Rojo** (`red-500/600`): Errores, alertas críticas
- **Púrpura** (`purple-500/600`): Reportes, métricas especiales

### Componentes Base
- **Tarjetas**: `bg-white rounded-lg shadow p-6`
- **Botones**: Colores semánticos con estados hover
- **Formularios**: Validación visual con mensajes claros
- **Tablas**: Responsive con acciones inline

### Responsive Design
- Mobile first approach
- Breakpoints: `sm`, `md`, `lg`, `xl`
- Grid adaptativo
- Sidebar colapsable en móvil

---

## 🔐 Tipos TypeScript

Todos los tipos están centralizados en `src/types/index.ts`:

### Entidades Principales
- `Lote` / `LoteDetalle` / `LoteCreate` / `LoteUpdate`
- `Corral` / `CorralCreate` / `CorralUpdate`
- `Alimento` / `AlimentoCreate` / `AlimentoUpdate`
- `ConsumoAlimento` / `ConsumoAlimentoCreate` / `ConsumoAlimentoUpdate`
- `Mortalidad` / `MortalidadCreate` / `MortalidadUpdate`
- `Cosecha` / `CosechaCreate` / `CosechaUpdate`
- `GastoMensual` / `GastoMensualCreate` / `GastoMensualUpdate`
- `GastoDirecto` / `GastoDirectoCreate` / `GastoDirectoUpdate`

### Reportes
- `CostosLote`: Desglose completo de costos
- `IndicadoresLote`: Métricas de eficiencia

### Enums
- `EstadoLote`: `ACTIVO` | `CERRADO`
- `TipoAlimento`: `PREINICIADOR` | `LEVANTE` | `ENGORDE`
- `TipoGastoMensual`: `ELECTRICIDAD`, `AGUA`, `SALARIOS`, etc.
- `TipoGastoDirecto`: `MEDICAMENTOS`, `VETERINARIO`, `TRANSPORTE`, etc.

---

## 🚦 Estados de la Aplicación

### Loading States
- Spinners durante carga de datos
- Skeleton screens en listas
- Deshabilitación de botones durante submit

### Estados Vacíos
- Mensajes informativos
- Call-to-action para crear datos
- Ilustraciones amigables

### Manejo de Errores
- Alerts visuales con colores semánticos
- Mensajes descriptivos
- Sugerencias de acción

---

## 📚 Documentación de Fases

Cada fase del desarrollo está documentada:

- ✅ **FASE 1**: Layout Base → `FASE1-COMPLETADA.md`
- ✅ **FASE 2**: Vista de Lotes → `FASE2-COMPLETADA.md`
- ✅ **FASE 3**: Registros y Operaciones → `FASE3-COMPLETADA.md`
- ✅ **FASE 4**: Reportes y Análisis → `FASE4-COMPLETADA.md`

---

## 🐛 Problemas Conocidos y Soluciones

### TypeScript: verbatimModuleSyntax
**Problema**: Error de importación de tipos
**Solución**: Usar `import type { ... }` para importar solo tipos

### CSS Lint: Unknown at rule @tailwind
**Problema**: VS Code no reconoce directivas Tailwind
**Solución**: Configurar `.vscode/settings.json` con `"css.lint.unknownAtRules": "ignore"`

### Date Serialization
**Problema**: Backend no puede serializar objetos `date`
**Solución**: Usar `model_dump(mode="json")` en Pydantic

---

## 🌟 Características Destacadas

- ✨ **Interfaz Moderna**: Diseño limpio y profesional con Tailwind CSS
- 📱 **Responsive**: Funciona perfectamente en móvil, tablet y desktop
- ⚡ **Performance**: Optimizado con Vite y React 19
- 🎯 **Type-Safe**: 100% TypeScript para mejor DX
- 🔄 **Real-time**: Actualización automática de datos
- 📊 **Visualización**: Gráficos y métricas claras
- 🎨 **UX/UI**: Experiencia de usuario fluida y intuitiva
- 🛡️ **Validación**: Formularios con validación completa

---

## 🤝 Contribución

Este proyecto sigue las mejores prácticas de desarrollo:

1. **Código limpio**: Nombres descriptivos, funciones pequeñas
2. **Componentización**: Componentes reutilizables
3. **Separación de responsabilidades**: Lógica separada de UI
4. **Tipos estrictos**: TypeScript en modo estricto
5. **Linting**: ESLint configurado
6. **Documentación**: Código auto-documentado

---

## 📄 Licencia

Este proyecto es privado y confidencial.

---

## 👨‍💻 Desarrollo

Desarrollado con ❤️ para optimizar la gestión de producción porcina.

**Stack**: React + TypeScript + Tailwind CSS + Vite
**Backend**: FastAPI + Python + Supabase (PostgreSQL)

---

## 📞 Soporte

Para cualquier duda o problema, contactar al equipo de desarrollo.

---

**¡Sistema completo y funcional! 🎉🐷💰**
