// Tipos para el módulo de Gastos Mensuales (Compartidos)

// Tipos de gastos mensuales
export type TipoGastoMensual = 
  | 'arriendo' 
  | 'servicios' 
  | 'nomina' 
  | 'medicamentos' 
  | 'insumos' 
  | 'otros';

// Interface principal
export interface GastoMensual {
  id: string;
  mes: number;                       // 1-12
  anio: number;                      // Ej: 2024
  concepto: string;                  // Ej: "Arriendo Granja"
  monto: number;
  tipo: TipoGastoMensual;
  observaciones: string | null;
  created_at: string;
  updated_at: string;
}

// Para CREAR un gasto mensual
export interface GastoMensualCreate {
  mes: number;
  anio: number;
  concepto: string;
  monto: number;
  tipo: TipoGastoMensual;
  observaciones?: string;
}

// Para ACTUALIZAR un gasto mensual
export interface GastoMensualUpdate {
  mes?: number;
  anio?: number;
  concepto?: string;
  monto?: number;
  tipo?: TipoGastoMensual;
  observaciones?: string;
}