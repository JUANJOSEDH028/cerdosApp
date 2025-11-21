// Tipos para el módulo de Cosechas (Ventas)

// Tipos de cosecha
export type TipoCosecha = 'cabezas' | 'colas' | 'media';

// Interface principal
export interface Cosecha {
  id: string;
  lote_id: string;
  fecha: string;
  tipo: TipoCosecha;
  cantidad_animales: number;
  peso_total_kg: number;             // Peso real de planta
  es_ultima_cosecha: boolean;        // Si es true, cierra el lote
  observaciones: string | null;
  created_at: string;
  updated_at: string;
}

// Para CREAR una cosecha
export interface CosechaCreate {
  lote_id: string;
  fecha: string;
  tipo: TipoCosecha;
  cantidad_animales: number;
  peso_total_kg: number;
  es_ultima_cosecha: boolean;
  observaciones?: string;
}

// Para ACTUALIZAR una cosecha
export interface CosechaUpdate {
  fecha?: string;
  tipo?: TipoCosecha;
  cantidad_animales?: number;
  peso_total_kg?: number;
  es_ultima_cosecha?: boolean;
  observaciones?: string;
}