// Tipos para el módulo de Alimentos

// Tipos permitidos de alimento (como Enum en Python)
export type TipoAlimento = 'preiniciador' | 'levante' | 'engorde';

// Interface principal de Alimento
export interface Alimento {
  id: string;
  nombre: string;                    // Ej: "Preiniciador Premium"
  tipo: TipoAlimento;                // Solo puede ser uno de los 3 tipos
  costo_por_bulto: number;           // Precio del bulto
  peso_bulto_kg: number;             // Default: 40 kg
  activo: boolean;
  created_at: string;
  updated_at: string;
}

// Para CREAR un alimento
export interface AlimentoCreate {
  nombre: string;
  tipo: TipoAlimento;
  costo_por_bulto: number;
  peso_bulto_kg: number;
  activo: boolean;
}

// Para ACTUALIZAR un alimento
export interface AlimentoUpdate {
  nombre?: string;
  tipo?: TipoAlimento;
  costo_por_bulto?: number;
  peso_bulto_kg?: number;
  activo?: boolean;
}