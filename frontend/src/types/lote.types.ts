// Tipos para el módulo de Lotes

// Estado del lote
export type EstadoLote = 'activo' | 'cerrado';

// Interface principal de Lote
export interface Lote {
  id: string;
  numero_lote: string;               // Ej: "LOTE-001-2024"
  fecha_inicio: string;              // Fecha en formato ISO: "2024-11-01"
  fecha_cierre: string | null;       // null si está activo
  animales_iniciales: number;
  peso_promedio_inicial: number;
  cantidad_machos: number;
  cantidad_hembras: number;
  costo_lechones: number;
  estado: EstadoLote;
  observaciones: string | null;      // Puede ser null
  created_at: string;
  updated_at: string;
}

// Lote con detalles adicionales (lo que devuelve GET /lotes/{id})
export interface LoteDetalle extends Lote {
  area_total_m2: number;             // Suma de áreas de corrales
  corrales_asignados: CorralAsignado[];
  animales_actuales: number;         // Después de mortalidad y ventas
  total_mortalidad: number;
  total_vendidos: number;
}

// Corral asignado a un lote
export interface CorralAsignado {
  id: string;
  corral_id: string;
  corral_nombre: string;
  corral_area_m2: number;
  fecha_asignacion: string;
  fecha_liberacion: string | null;
}

// Para CREAR un lote
export interface LoteCreate {
  numero_lote: string;
  fecha_inicio: string;
  animales_iniciales: number;
  peso_promedio_inicial: number;
  cantidad_machos: number;
  cantidad_hembras: number;
  costo_lechones: number;
  observaciones?: string;            // Opcional al crear
  corrales_ids: string[];            // Array de UUIDs de corrales
}

// Para ACTUALIZAR un lote
export interface LoteUpdate {
  numero_lote?: string;
  fecha_inicio?: string;
  animales_iniciales?: number;
  peso_promedio_inicial?: number;
  cantidad_machos?: number;
  cantidad_hembras?: number;
  costo_lechones?: number;
  observaciones?: string;
}