// Tipos para el módulo de Reportes (Cálculos de Costos e Indicadores)

// ===== CÁLCULO DE COSTOS =====

// Detalle de alimento por tipo
export interface DetalleAlimentoTipo {
    costo: number;
    kg: number;
    bultos: number;
  }
  
  // Detalle completo de alimento
  export interface DetalleAlimento {
    costo_total: number;
    kg_total: number;
    detalle: {
      preiniciador: DetalleAlimentoTipo;
      levante: DetalleAlimentoTipo;
      engorde: DetalleAlimentoTipo;
    };
  }
  
  // Detalle de gastos directos por tipo
  export interface DetalleGastosDirectos {
    total: number;
    detalle: {
      flete: number;
      inmunocastracion: number;
      [key: string]: number;           // Permite otros tipos dinámicos
    };
  }
  
  // Metadata del prorrateo mensual
  export interface MetadataProrrateo {
    area_lote_m2: number;
    dias_activos: number;
    dias_mes: number;
    suma_areas_activas_m2: number;
  }
  
  // Detalle de un gasto prorrateado
  export interface DetalleGastoProrrateado {
    tipo: string;
    monto_total: number;
    monto_prorrateado: number;
  }
  
  // Gastos prorrateados por mes
  export interface GastosProrrateoMes {
    total: number;
    detalle: {
      [concepto: string]: DetalleGastoProrrateado;
    };
    metadata: MetadataProrrateo;
  }
  
  // Respuesta completa del cálculo de costos
  export interface CostosLote {
    lote_id: string;
    numero_lote: string;
    fecha_inicio: string;
    fecha_cierre: string | null;
    costo_total: number;
    detalle_costos: {
      lechones: number;
      alimento: number;
      gastos_directos: number;
      gastos_prorrateados: number;
    };
    detalle_alimento: DetalleAlimento;
    detalle_gastos_directos: DetalleGastosDirectos;
    detalle_gastos_prorrateados: {
      [periodo: string]: GastosProrrateoMes;  // Ej: "2024-11", "2024-12"
    };
  }
  
  // ===== INDICADORES DE EFICIENCIA =====
  
  // Indicadores de animales
  export interface IndicadoresAnimales {
    iniciales: number;
    mortalidad: number;
    vendidos: number;
    porcentaje_mortalidad: number;
  }
  
  // Indicadores de pesos
  export interface IndicadoresPesos {
    inicial_promedio_kg: number;
    final_promedio_kg: number;
    ganancia_promedio_kg: number;
    total_vendido_kg: number;
  }
  
  // Indicadores de alimento
  export interface IndicadoresAlimento {
    total_consumido_kg: number;
    conversion_alimenticia: number;    // kg alimento / kg ganancia
  }
  
  // Indicadores de costos
  export interface IndicadoresCostos {
    costo_total: number;
    costo_por_animal: number;
    costo_por_kg_producido: number;
  }
  
  // Respuesta completa de indicadores
  export interface IndicadoresLote {
    lote_id: string;
    numero_lote: string;
    animales: IndicadoresAnimales;
    pesos: IndicadoresPesos;
    alimento: IndicadoresAlimento;
    costos: IndicadoresCostos;
  }
  
  // ===== PRORRATEO MENSUAL =====
  
  export interface ProrrateoMensual {
    lote_id: string;
    numero_lote: string;
    anio: number;
    mes: number;
    gastos_prorrateados: GastosProrrateoMes;
  }