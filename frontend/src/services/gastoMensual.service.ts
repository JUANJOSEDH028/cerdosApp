// Servicio para operaciones con Gastos Mensuales (Compartidos)

import apiClient from './api.client';
import type { GastoMensual, GastoMensualCreate, GastoMensualUpdate } from '../types';

class GastoMensualService {
  private readonly basePath = '/gastos-mensuales';

  // GET /api/gastos-mensuales - Listar gastos mensuales
  // Filtros opcionales: anio, mes
  async getAll(anio?: number, mes?: number): Promise<GastoMensual[]> {
    const params: any = {};
    if (anio) params.anio = anio;
    if (mes) params.mes = mes;
    
    const response = await apiClient.get<GastoMensual[]>(this.basePath, { params });
    return response.data;
  }

  // GET /api/gastos-mensuales/periodo/{anio}/{mes} - Gastos de un período
  async getByPeriodo(anio: number, mes: number): Promise<GastoMensual[]> {
    const response = await apiClient.get<GastoMensual[]>(`${this.basePath}/periodo/${anio}/${mes}`);
    return response.data;
  }

  // POST /api/gastos-mensuales - Registrar gasto mensual
  async create(data: GastoMensualCreate): Promise<GastoMensual> {
    const response = await apiClient.post<GastoMensual>(this.basePath, data);
    return response.data;
  }

  // PATCH /api/gastos-mensuales/{id} - Actualizar gasto
  async update(id: string, data: GastoMensualUpdate): Promise<GastoMensual> {
    const response = await apiClient.patch<GastoMensual>(`${this.basePath}/${id}`, data);
    return response.data;
  }

  // DELETE /api/gastos-mensuales/{id} - Eliminar gasto
  async delete(id: string): Promise<void> {
    await apiClient.delete(`${this.basePath}/${id}`);
  }
}

export default new GastoMensualService();