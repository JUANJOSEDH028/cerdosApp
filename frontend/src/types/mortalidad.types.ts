// Tipos para el módulo de Mortalidad

// Interface principal
export interface Mortalidad {
    id: string;
    lote_id: string;
    fecha: string;
    cantidad: number;                  // Número de animales muertos
    peso_promedio_kg: number | null;   // Puede ser null
    causa: string | null;
    observaciones: string | null;
    created_at: string;
    updated_at: string;
  }
  
  // Para CREAR un registro de mortalidad
  export interface MortalidadCreate {
    lote_id: string;
    fecha: string;
    cantidad: number;
    peso_promedio_kg?: number;
    causa?: string;
    observaciones?: string;
  }
  
  // Para ACTUALIZAR un registro de mortalidad
  export interface MortalidadUpdate {
    fecha?: string;
    cantidad?: number;
    peso_promedio_kg?: number;
    causa?: string;
    observaciones?: string;
  }