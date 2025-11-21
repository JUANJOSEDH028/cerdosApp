// Tipos para el módulo de Gastos Directos (Asignables a un lote)

// Tipos de gastos directos
export type TipoGastoDirecto = 'flete' | 'inmunocastracion' | 'otro';

// Interface principal
export interface GastoDirecto {
  id: string;
  lote_id: string;
  fecha: string;
  concepto: string;
  tipo: TipoGastoDirecto;
  monto: number;
  observaciones: string | null;
  created_at: string;
  updated_at: string;
}

// Para CREAR un gasto directo
export interface GastoDirectoCreate {
  lote_id: string;
  fecha: string;
  concepto: string;
  tipo: TipoGastoDirecto;
  monto: number;
  observaciones?: string;
}

// Para ACTUALIZAR un gasto directo
export interface GastoDirectoUpdate {
  fecha?: string;
  concepto?: string;
  tipo?: TipoGastoDirecto;
  monto?: number;
  observaciones?: string;
}