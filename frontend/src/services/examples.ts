/**
 * EJEMPLOS DE USO DE LOS SERVICIOS
 * 
 * Este archivo contiene ejemplos prácticos de cómo usar cada servicio.
 * Puedes copiar y adaptar estos ejemplos en tus componentes.
 */

import {
  corralesService,
  alimentosService,
  lotesService,
  consumoAlimentoService,
  mortalidadService,
  cosechasService,
  gastosDirectosService,
  gastosMensualesService,
  reportesService,
} from './index';

// ==============================================
// EJEMPLO 1: Flujo completo de creación de lote
// ==============================================

export async function ejemploCrearLoteCompleto() {
  // 1. Obtener corrales disponibles
  const corrales = await corralesService.getActivos();
  const corralesIds = corrales.slice(0, 2).map(c => c.id); // Seleccionar 2 corrales

  // 2. Crear el lote
  const nuevoLote = await lotesService.create({
    numero_lote: `LOTE-${Date.now()}`,
    fecha_inicio: new Date().toISOString().split('T')[0],
    animales_iniciales: 100,
    peso_promedio_inicial: 25.5,
    cantidad_machos: 60,
    cantidad_hembras: 40,
    costo_lechones: 15000000,
    corrales_ids: corralesIds,
    observaciones: 'Lote de ejemplo'
  });

  console.log('✅ Lote creado:', nuevoLote.numero_lote);
  return nuevoLote;
}

// ==============================================
// EJEMPLO 2: Registrar consumo de alimento
// ==============================================

export async function ejemploRegistrarConsumo(loteId: string) {
  // 1. Obtener alimentos disponibles
  const alimentos = await alimentosService.getActivos();
  
  // 2. Filtrar por tipo
  const preiniciador = alimentos.find(a => a.tipo === 'preiniciador');
  
  if (!preiniciador) {
    throw new Error('No hay alimento preiniciador disponible');
  }

  // 3. Registrar consumo
  const consumo = await consumoAlimentoService.create({
    lote_id: loteId,
    alimento_id: preiniciador.id,
    fecha: new Date().toISOString().split('T')[0],
    cantidad_bultos: 5,
    observaciones: 'Consumo semanal'
  });

  console.log('✅ Consumo registrado:', consumo);
  return consumo;
}

// ==============================================
// EJEMPLO 3: Registrar mortalidad
// ==============================================

export async function ejemploRegistrarMortalidad(loteId: string) {
  const mortalidad = await mortalidadService.create({
    lote_id: loteId,
    fecha: new Date().toISOString().split('T')[0],
    cantidad: 2,
    peso_promedio_kg: 30.5,
    causa: 'Enfermedad respiratoria',
    observaciones: 'Se aplicó tratamiento preventivo al resto'
  });

  console.log('⚠️  Mortalidad registrada:', mortalidad);
  return mortalidad;
}

// ==============================================
// EJEMPLO 4: Realizar cosecha y cerrar lote
// ==============================================

export async function ejemploCosecharLote(loteId: string) {
  // 1. Primera cosecha (cabezas)
  const cosecha1 = await cosechasService.create({
    lote_id: loteId,
    fecha: new Date().toISOString().split('T')[0],
    tipo: 'cabezas',
    cantidad_animales: 35,
    peso_total_kg: 4200,
    es_ultima_cosecha: false,
    observaciones: 'Mejores animales'
  });
  console.log('📦 Primera cosecha:', cosecha1);

  // 2. Segunda cosecha (media)
  const cosecha2 = await cosechasService.create({
    lote_id: loteId,
    fecha: new Date().toISOString().split('T')[0],
    tipo: 'media',
    cantidad_animales: 40,
    peso_total_kg: 4500,
    es_ultima_cosecha: false,
    observaciones: 'Animales promedio'
  });
  console.log('📦 Segunda cosecha:', cosecha2);

  // 3. Última cosecha (colas) - esto cierra el lote automáticamente
  const cosechaFinal = await cosechasService.create({
    lote_id: loteId,
    fecha: new Date().toISOString().split('T')[0],
    tipo: 'colas',
    cantidad_animales: 20,
    peso_total_kg: 2000,
    es_ultima_cosecha: true,
    observaciones: 'Última cosecha - cierre de lote'
  });
  console.log('📦 Cosecha final:', cosechaFinal);

  // 4. Calcular totales
  const totales = await cosechasService.getTotalesByLote(loteId);
  console.log('📊 Totales vendidos:', totales);

  return { cosecha1, cosecha2, cosechaFinal, totales };
}

// ==============================================
// EJEMPLO 5: Registrar gastos de un lote
// ==============================================

export async function ejemploRegistrarGastos(loteId: string) {
  // 1. Gasto directo: Flete
  const flete = await gastosDirectosService.create({
    lote_id: loteId,
    fecha: new Date().toISOString().split('T')[0],
    concepto: 'Transporte a planta',
    tipo: 'flete',
    monto: 500000,
    observaciones: '3 viajes'
  });

  // 2. Gasto directo: Inmunocastración
  const inmuno = await gastosDirectosService.create({
    lote_id: loteId,
    fecha: new Date().toISOString().split('T')[0],
    concepto: 'Inmunocastración machos',
    tipo: 'inmunocastracion',
    monto: 1200000,
    observaciones: '60 machos x 2 dosis'
  });

  // 3. Calcular total de gastos directos
  const totalDirectos = await gastosDirectosService.getTotalByLote(loteId);

  console.log('💰 Gastos registrados:', { flete, inmuno, totalDirectos });
  return { flete, inmuno, totalDirectos };
}

// ==============================================
// EJEMPLO 6: Registrar gastos mensuales
// ==============================================

export async function ejemploRegistrarGastosMensuales() {
  const hoy = new Date();
  const mes = hoy.getMonth() + 1;
  const anio = hoy.getFullYear();

  // 1. Arriendo (se prorrateo con fórmula especial)
  const arriendo = await gastosMensualesService.create({
    mes,
    anio,
    concepto: 'Arriendo granja',
    tipo: 'arriendo',
    monto: 2500000,
    observaciones: 'Pago mensual'
  });

  // 2. Servicios
  const servicios = await gastosMensualesService.create({
    mes,
    anio,
    concepto: 'Luz y agua',
    tipo: 'servicios',
    monto: 800000
  });

  // 3. Nómina
  const nomina = await gastosMensualesService.create({
    mes,
    anio,
    concepto: 'Salarios personal',
    tipo: 'nomina',
    monto: 4000000,
    observaciones: '2 trabajadores'
  });

  // 4. Calcular total del mes
  const totalMes = await gastosMensualesService.getTotalByMes(anio, mes);

  console.log('📅 Gastos mensuales registrados:', { arriendo, servicios, nomina, totalMes });
  return { arriendo, servicios, nomina, totalMes };
}

// ==============================================
// EJEMPLO 7: Generar reporte completo de lote
// ==============================================

export async function ejemploReporteCompleto(loteId: string) {
  console.log('📊 Generando reporte completo...');

  // 1. Obtener costos detallados
  const costos = await reportesService.getCostosLote(loteId);
  
  console.log('\n💰 COSTOS TOTALES');
  console.log('═════════════════════════════════════════');
  console.log(`Total: $${costos.costo_total.toLocaleString()}`);
  console.log(`  - Lechones: $${costos.detalle_costos.lechones.toLocaleString()}`);
  console.log(`  - Alimento: $${costos.detalle_costos.alimento.toLocaleString()}`);
  console.log(`  - Gastos directos: $${costos.detalle_costos.gastos_directos.toLocaleString()}`);
  console.log(`  - Gastos prorrateados: $${costos.detalle_costos.gastos_prorrateados.toLocaleString()}`);

  console.log('\n🌾 DETALLE DE ALIMENTO');
  console.log('═════════════════════════════════════════');
  console.log(`Total: ${costos.detalle_alimento.kg_total} kg`);
  console.log(`  - Preiniciador: ${costos.detalle_alimento.detalle.preiniciador?.kg || 0} kg`);
  console.log(`  - Levante: ${costos.detalle_alimento.detalle.levante?.kg || 0} kg`);
  console.log(`  - Engorde: ${costos.detalle_alimento.detalle.engorde?.kg || 0} kg`);

  // 2. Obtener indicadores
  const indicadores = await reportesService.getIndicadoresLote(loteId);

  console.log('\n📈 INDICADORES DE EFICIENCIA');
  console.log('═════════════════════════════════════════');
  console.log(`Animales iniciales: ${indicadores.animales.iniciales}`);
  console.log(`Mortalidad: ${indicadores.animales.mortalidad} (${indicadores.animales.porcentaje_mortalidad}%)`);
  console.log(`Vendidos: ${indicadores.animales.vendidos}`);
  console.log(`\nPeso inicial promedio: ${indicadores.pesos.inicial_promedio_kg} kg`);
  console.log(`Peso final promedio: ${indicadores.pesos.final_promedio_kg} kg`);
  console.log(`Ganancia promedio: ${indicadores.pesos.ganancia_promedio_kg} kg`);
  console.log(`\nConversión alimenticia: ${indicadores.alimento.conversion_alimenticia}`);
  console.log(`\nCosto por animal: $${indicadores.costos.costo_por_animal.toLocaleString()}`);
  console.log(`Costo por kg producido: $${indicadores.costos.costo_por_kg_producido.toLocaleString()}`);

  return { costos, indicadores };
}

// ==============================================
// EJEMPLO 8: Consultar prorrateo mensual
// ==============================================

export async function ejemploProrrateoMensual(loteId: string, anio: number, mes: number) {
  const prorrateo = await reportesService.getProrrateoMensual(loteId, anio, mes);

  console.log(`\n📊 PRORRATEO ${anio}-${mes.toString().padStart(2, '0')}`);
  console.log('═════════════════════════════════════════');
  console.log(`Total prorrateado: $${prorrateo.gastos_prorrateados.total.toLocaleString()}`);
  console.log('\nMetadata:');
  console.log(`  - Área del lote: ${prorrateo.gastos_prorrateados.metadata.area_lote_m2} m²`);
  console.log(`  - Días activos: ${prorrateo.gastos_prorrateados.metadata.dias_activos} días`);
  console.log(`  - Días del mes: ${prorrateo.gastos_prorrateados.metadata.dias_mes} días`);
  console.log(`  - Suma áreas activas: ${prorrateo.gastos_prorrateados.metadata.suma_areas_activas_m2} m²`);

  console.log('\nDetalle por concepto:');
  Object.entries(prorrateo.gastos_prorrateados.detalle).forEach(([concepto, detalle]) => {
    console.log(`  - ${concepto}:`);
    console.log(`      Tipo: ${detalle.tipo}`);
    console.log(`      Monto total: $${detalle.monto_total.toLocaleString()}`);
    console.log(`      Monto prorrateado: $${detalle.monto_prorrateado.toLocaleString()}`);
  });

  return prorrateo;
}

// ==============================================
// EJEMPLO 9: Dashboard de lotes activos
// ==============================================

export async function ejemploDashboardLotes() {
  console.log('🏠 DASHBOARD DE LOTES ACTIVOS');
  console.log('═════════════════════════════════════════\n');

  // 1. Obtener todos los lotes activos
  const lotesActivos = await lotesService.getActivos();

  // 2. Obtener detalle de cada lote
  for (const lote of lotesActivos) {
    const detalle = await lotesService.getById(lote.id);
    
    console.log(`📦 ${detalle.numero_lote}`);
    console.log(`   Inicio: ${detalle.fecha_inicio}`);
    console.log(`   Animales: ${detalle.animales_actuales}/${detalle.animales_iniciales}`);
    console.log(`   Área: ${detalle.area_total_m2} m²`);
    console.log(`   Mortalidad: ${detalle.total_mortalidad}`);
    console.log(`   Vendidos: ${detalle.total_vendidos}`);
    console.log(`   Corrales: ${detalle.corrales_asignados?.length || 0}`);
    console.log('');
  }

  return lotesActivos;
}

// ==============================================
// EJEMPLO 10: Flujo completo de inicio a fin
// ==============================================

export async function ejemploFlujCompleto() {
  console.log('🚀 INICIANDO FLUJO COMPLETO');
  console.log('═════════════════════════════════════════\n');

  try {
    // 1. Crear lote
    console.log('1️⃣  Creando lote...');
    const lote = await ejemploCrearLoteCompleto();

    // 2. Registrar gastos mensuales
    console.log('\n2️⃣  Registrando gastos mensuales...');
    await ejemploRegistrarGastosMensuales();

    // 3. Simular periodo de engorde
    console.log('\n3️⃣  Registrando consumo de alimento...');
    await ejemploRegistrarConsumo(lote.id);

    // 4. Registrar mortalidad (si hay)
    console.log('\n4️⃣  Registrando mortalidad...');
    await ejemploRegistrarMortalidad(lote.id);

    // 5. Registrar gastos directos
    console.log('\n5️⃣  Registrando gastos directos...');
    await ejemploRegistrarGastos(lote.id);

    // 6. Realizar cosechas
    console.log('\n6️⃣  Realizando cosechas...');
    await ejemploCosecharLote(lote.id);

    // 7. Generar reporte final
    console.log('\n7️⃣  Generando reporte final...');
    await ejemploReporteCompleto(lote.id);

    console.log('\n✅ FLUJO COMPLETADO EXITOSAMENTE');
    return lote;

  } catch (error) {
    console.error('❌ Error en el flujo:', error);
    throw error;
  }
}

// ==============================================
// EJEMPLO DE USO EN COMPONENTE REACT
// ==============================================

/**
 * Ejemplo de uso en un componente React con hooks
 * 
 * import { useEffect, useState } from 'react';
 * import { lotesService, type Lote } from '@/services';
 * 
 * export function LotesComponent() {
 *   const [lotes, setLotes] = useState<Lote[]>([]);
 *   const [loading, setLoading] = useState(true);
 * 
 *   useEffect(() => {
 *     loadLotes();
 *   }, []);
 * 
 *   const loadLotes = async () => {
 *     try {
 *       const data = await lotesService.getActivos();
 *       setLotes(data);
 *     } catch (error) {
 *       console.error('Error:', error);
 *     } finally {
 *       setLoading(false);
 *     }
 *   };
 * 
 *   const handleCrear = async (formData) => {
 *     try {
 *       await lotesService.create(formData);
 *       await loadLotes(); // Recargar
 *     } catch (error) {
 *       console.error('Error al crear:', error);
 *     }
 *   };
 * 
 *   if (loading) return <div>Cargando...</div>;
 * 
 *   return (
 *     <div>
 *       {lotes.map(lote => (
 *         <div key={lote.id}>{lote.numero_lote}</div>
 *       ))}
 *     </div>
 *   );
 * }
 */

