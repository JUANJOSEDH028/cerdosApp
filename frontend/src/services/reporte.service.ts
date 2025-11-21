// Servicio para operaciones con Reportes (Cálculos y Análisis)

import apiClient from './api.client';
import type { CostosLote, IndicadoresLote, ProrrateoMensual } from '../types';

class ReporteService {
  private readonly basePath = '/reportes';

  // GET /api/reportes/lote/{lote_id}/costos
  // Obtiene el cálculo completo de costos de un lote
  async getCostosLote(loteId: string): Promise<CostosLote> {
    const response = await apiClient.get<CostosLote>(`${this.basePath}/lote/${loteId}/costos`);
    return response.data;
  }

  // GET /api/reportes/lote/{lote_id}/indicadores
  // Obtiene los indicadores de eficiencia de un lote
  async getIndicadoresLote(loteId: string): Promise<IndicadoresLote> {
    const response = await apiClient.get<IndicadoresLote>(`${this.basePath}/lote/${loteId}/indicadores`);
    return response.data;
  }

  // GET /api/reportes/lote/{lote_id}/prorrateo/{anio}/{mes}
  // Obtiene el detalle del prorrateo de un mes específico
  async getProrrateoMensual(loteId: string, anio: number, mes: number): Promise<ProrrateoMensual> {
    const response = await apiClient.get<ProrrateoMensual>(
      `${this.basePath}/lote/${loteId}/prorrateo/${anio}/${mes}`
    );
    return response.data;
  }
}

export default new ReporteService();