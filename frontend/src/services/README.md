# Servicios de API - Documentación

Esta carpeta contiene todos los servicios HTTP para comunicarse con el backend usando Axios.

## 📁 Estructura

```
services/
├── api.client.ts              # Cliente base de Axios configurado
├── corrales.service.ts        # Gestión de corrales
├── alimentos.service.ts       # Gestión de alimentos
├── lotes.service.ts           # Gestión de lotes
├── consumo-alimento.service.ts # Registro de consumo
├── mortalidad.service.ts      # Registro de mortalidad
├── cosechas.service.ts        # Registro de cosechas/ventas
├── gastos-directos.service.ts # Gastos directos por lote
├── gastos-mensuales.service.ts # Gastos mensuales compartidos
├── reportes.service.ts        # Cálculos y reportes
└── index.ts                   # Exportación centralizada
```

## 🚀 Uso Básico

### Importación

```typescript
// Opción 1: Importar servicios individuales
import { lotesService, corralesService } from '@/services';

// Opción 2: Importar todo
import * as services from '@/services';

// Opción 3: Importar un servicio específico
import { reportesService } from '@/services/reportes.service';
```

## 📋 Ejemplos de Uso

### 1. Gestión de Corrales

```typescript
import { corralesService } from '@/services';

// Obtener todos los corrales
const corrales = await corralesService.getAll();

// Obtener solo corrales activos
const activos = await corralesService.getActivos();

// Crear un nuevo corral
const nuevoCorral = await corralesService.create({
  nombre: 'Corral 1',
  area_m2: 150.5,
  activo: true
});

// Actualizar un corral
const actualizado = await corralesService.update(corralId, {
  area_m2: 160.0
});

// Eliminar un corral
await corralesService.delete(corralId);
```

### 2. Gestión de Lotes

```typescript
import { lotesService } from '@/services';

// Obtener todos los lotes activos
const lotesActivos = await lotesService.getActivos();

// Crear un nuevo lote
const nuevoLote = await lotesService.create({
  numero_lote: 'LOTE-001-2024',
  fecha_inicio: '2024-11-01',
  animales_iniciales: 100,
  peso_promedio_inicial: 25.5,
  cantidad_machos: 60,
  cantidad_hembras: 40,
  costo_lechones: 15000000,
  corrales_ids: [corralId1, corralId2],
  observaciones: 'Lote premium'
});

// Obtener detalle completo de un lote
const detalle = await lotesService.getById(loteId);
console.log(detalle.area_total_m2);
console.log(detalle.animales_actuales);
console.log(detalle.corrales_asignados);

// Cerrar un lote (después de la última cosecha)
await lotesService.cerrar(loteId);
```

### 3. Registro de Consumo de Alimento

```typescript
import { consumoAlimentoService } from '@/services';

// Registrar consumo
const consumo = await consumoAlimentoService.create({
  lote_id: loteId,
  alimento_id: alimentoId,
  fecha: '2024-11-15',
  cantidad_bultos: 5.5,
  observaciones: 'Consumo semanal'
});

// Obtener todo el consumo de un lote
const consumoPorLote = await consumoAlimentoService.getByLote(loteId);
```

### 4. Registro de Cosechas

```typescript
import { cosechasService } from '@/services';

// Registrar una cosecha parcial
const cosecha = await cosechasService.create({
  lote_id: loteId,
  fecha: '2024-12-15',
  tipo: 'cabezas',
  cantidad_animales: 30,
  peso_total_kg: 3450.5,
  es_ultima_cosecha: false,
  observaciones: 'Primera cosecha'
});

// Registrar la última cosecha (cierra el lote automáticamente)
await cosechasService.create({
  lote_id: loteId,
  fecha: '2024-12-20',
  tipo: 'colas',
  cantidad_animales: 65,
  peso_total_kg: 6800.0,
  es_ultima_cosecha: true
});

// Calcular totales de cosecha
const totales = await cosechasService.getTotalesByLote(loteId);
console.log(`Vendidos: ${totales.animales} animales`);
console.log(`Peso total: ${totales.peso_kg} kg`);
```

### 5. Gastos Mensuales

```typescript
import { gastosMensualesService } from '@/services';

// Registrar gasto mensual
const gasto = await gastosMensualesService.create({
  mes: 11,
  anio: 2024,
  concepto: 'Arriendo Granja',
  monto: 2500000,
  tipo: 'arriendo',
  observaciones: 'Pago mensual'
});

// Obtener gastos de un mes
const gastosNoviembre = await gastosMensualesService.getByMesAnio(2024, 11);

// Calcular total del mes
const total = await gastosMensualesService.getTotalByMes(2024, 11);
console.log(`Total gastado en noviembre: $${total}`);
```

### 6. Reportes y Cálculos

```typescript
import { reportesService } from '@/services';

// Obtener cálculo completo de costos
const costos = await reportesService.getCostosLote(loteId);
console.log(`Costo total: $${costos.costo_total}`);
console.log(`Lechones: $${costos.detalle_costos.lechones}`);
console.log(`Alimento: $${costos.detalle_costos.alimento}`);
console.log(`Gastos directos: $${costos.detalle_costos.gastos_directos}`);
console.log(`Gastos prorrateados: $${costos.detalle_costos.gastos_prorrateados}`);

// Detalle de alimento por tipo
console.log('Preiniciador:', costos.detalle_alimento.detalle.preiniciador);
console.log('Levante:', costos.detalle_alimento.detalle.levante);
console.log('Engorde:', costos.detalle_alimento.detalle.engorde);

// Obtener indicadores de eficiencia
const indicadores = await reportesService.getIndicadoresLote(loteId);
console.log(`Conversión alimenticia: ${indicadores.alimento.conversion_alimenticia}`);
console.log(`Mortalidad: ${indicadores.animales.porcentaje_mortalidad}%`);
console.log(`Costo por kg: $${indicadores.costos.costo_por_kg_producido}`);
console.log(`Costo por animal: $${indicadores.costos.costo_por_animal}`);

// Obtener reporte completo
const { costos: c, indicadores: i } = await reportesService.getReporteCompleto(loteId);

// Obtener prorrateo de un mes específico
const prorrateo = await reportesService.getProrrateoMensual(loteId, 2024, 11);
console.log(`Total prorrateado: $${prorrateo.gastos_prorrateados.total}`);
console.log('Metadata:', prorrateo.gastos_prorrateados.metadata);
```

## 🔧 Manejo de Errores

Todos los servicios lanzan errores que puedes capturar:

```typescript
import { lotesService } from '@/services';

try {
  const lote = await lotesService.getById(loteId);
  console.log(lote);
} catch (error) {
  if (axios.isAxiosError(error)) {
    if (error.response?.status === 404) {
      console.error('Lote no encontrado');
    } else if (error.response?.status === 400) {
      console.error('Datos inválidos:', error.response.data);
    } else {
      console.error('Error del servidor');
    }
  }
}
```

## 🎯 Uso en Componentes React

### Con Hooks

```typescript
import { useEffect, useState } from 'react';
import { lotesService, type Lote } from '@/services';

function LotesPage() {
  const [lotes, setLotes] = useState<Lote[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLotes = async () => {
      try {
        setLoading(true);
        const data = await lotesService.getActivos();
        setLotes(data);
      } catch (err) {
        setError('Error al cargar lotes');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchLotes();
  }, []);

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {lotes.map(lote => (
        <div key={lote.id}>{lote.numero_lote}</div>
      ))}
    </div>
  );
}
```

### Con React Query (Recomendado)

```typescript
import { useQuery } from '@tanstack/react-query';
import { lotesService } from '@/services';

function LotesPage() {
  const { data: lotes, isLoading, error } = useQuery({
    queryKey: ['lotes', 'activos'],
    queryFn: () => lotesService.getActivos(),
  });

  if (isLoading) return <div>Cargando...</div>;
  if (error) return <div>Error al cargar lotes</div>;

  return (
    <div>
      {lotes?.map(lote => (
        <div key={lote.id}>{lote.numero_lote}</div>
      ))}
    </div>
  );
}
```

## 🎨 TypeScript

Todos los servicios están completamente tipados:

```typescript
import { lotesService, type LoteCreate, type LoteDetalle } from '@/services';

// Los tipos se infieren automáticamente
const lote: LoteDetalle = await lotesService.getById(id);

// TypeScript te ayudará con autocompletado
const nuevoLote: LoteCreate = {
  numero_lote: 'LOTE-001',
  fecha_inicio: '2024-11-01',
  // TypeScript te mostrará qué campos faltan
};
```

## 🌐 Configuración del Backend

La URL del backend se configura en `src/config/api.config.ts`:

```typescript
export const API_BASE_URL = 'http://localhost:8000';
export const API_URL = `${API_BASE_URL}/api`;
```

## 📊 Interceptores

El cliente de Axios tiene interceptores configurados para:

- Logging de requests/responses en desarrollo
- Manejo centralizado de errores
- Preparación para autenticación futura (JWT tokens)

Puedes modificarlos en `api.client.ts`.

## 🔑 Autenticación (Preparado)

El cliente ya está preparado para agregar autenticación JWT:

```typescript
// En api.client.ts, descomenta estas líneas:
const token = localStorage.getItem('token');
if (token) {
  config.headers.Authorization = `Bearer ${token}`;
}
```

## 📝 Notas Importantes

1. **Fechas**: Todas las fechas deben estar en formato ISO: `"2024-11-15"`
2. **IDs**: Todos los IDs son UUIDs en formato string
3. **Decimales**: Los números decimales se manejan como `number` en TypeScript
4. **Opcionales**: Los campos opcionales usan `?` o pueden ser `null`
5. **Async/Await**: Todos los métodos son asíncronos, usa `await` o `.then()`

## 🚨 Validaciones Backend

Recuerda que el backend valida:
- `animales_iniciales = cantidad_machos + cantidad_hembras`
- Fechas en orden lógico
- Valores positivos en montos y cantidades
- IDs válidos para relaciones

## 🔗 URLs de Endpoints

Todos los servicios apuntan a `http://localhost:8000/api`:

- `/corrales`
- `/alimentos`
- `/lotes`
- `/consumo-alimento`
- `/mortalidad`
- `/cosechas`
- `/gastos-directos`
- `/gastos-mensuales`
- `/reportes/lote/{id}/costos`
- `/reportes/lote/{id}/indicadores`
- `/reportes/lote/{id}/prorrateo/{año}/{mes}`

