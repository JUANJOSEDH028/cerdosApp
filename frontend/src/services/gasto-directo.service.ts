// Servicio para operaciones con Gastos Directos (Asignables a lotes)

import apiClient from './api.client';
import type { GastoDirecto, GastoDirectoCreate, GastoDirectoUpdate } from '../types';

class GastoDirectoService {
  private readonly basePath = '/gastos-directos';

  // GET /api/gastos-directos/lote/{lote_id} - Obtener gastos de un lote
  async getByLote(loteId: string): Promise<GastoDirecto[]> {
    const response = await apiClient.get<GastoDirecto[]>(`${this.basePath}/lote/${loteId}`);
    return response.data;
  }

  // POST /api/gastos-directos - Registrar gasto directo
  async create(data: GastoDirectoCreate): Promise<GastoDirecto> {
    const response = await apiClient.post<GastoDirecto>(this.basePath, data);
    return response.data;
  }

  // PATCH /api/gastos-directos/{id} - Actualizar gasto
  async update(id: string, data: GastoDirectoUpdate): Promise<GastoDirecto> {
    const response = await apiClient.patch<GastoDirecto>(`${this.basePath}/${id}`, data);
    return response.data;
  }

  // DELETE /api/gastos-directos/{id} - Eliminar gasto
  async delete(id: string): Promise<void> {
    await apiClient.delete(`${this.basePath}/${id}`);
  }
}

export default new GastoDirectoService();