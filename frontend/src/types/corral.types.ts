// Tipos para el módulo de Corrales
// Basado en el modelo del backend

// Interface que representa un corral en la base de datos
export interface Corral {
    id: string;                    // UUID del corral
    nombre: string;                // Ej: "Corral 1"
    area_m2: number;               // Área en metros cuadrados
    activo: boolean;               // Si está activo o no
    created_at: string;            // Fecha de creación (ISO string)
    updated_at: string;            // Fecha de actualización (ISO string)
  }
  
  // Interface para CREAR un corral (sin id, created_at, updated_at)
  export interface CorralCreate {
    nombre: string;
    area_m2: number;
    activo: boolean;
  }
  
  // Interface para ACTUALIZAR un corral (todos los campos opcionales)
  export interface CorralUpdate {
    nombre?: string;               // El ? significa "opcional"
    area_m2?: number;
    activo?: boolean;
  }