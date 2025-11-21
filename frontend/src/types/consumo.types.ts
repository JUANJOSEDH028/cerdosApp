// Tipos para el módulo de Consumo de Alimento

// Interface principal
export interface ConsumoAlimento {
    id: string;
    lote_id: string;
    alimento_id: string;
    fecha: string;                     // Fecha ISO: "2024-11-15"
    cantidad_bultos: number;           // Puede tener decimales
    observaciones: string | null;
    created_at: string;
    updated_at: string;
  }
  
  // Para CREAR un registro de consumo
  export interface ConsumoAlimentoCreate {
    lote_id: string;
    alimento_id: string;
    fecha: string;
    cantidad_bultos: number;
    observaciones?: string;
  }
  
  // Para ACTUALIZAR un registro de consumo
  export interface ConsumoAlimentoUpdate {
    alimento_id?: string;
    fecha?: string;
    cantidad_bultos?: number;
    observaciones?: string;
  }