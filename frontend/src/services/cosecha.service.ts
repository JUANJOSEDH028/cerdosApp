// Servicio para operaciones con Cosechas (Ventas)

import apiClient from './api.client';
import type { Cosecha, CosechaCreate, CosechaUpdate } from '../types';

class CosechaService {
  private readonly basePath = '/cosechas';

  // GET /api/cosechas/lote/{lote_id} - Obtener cosechas de un lote
  async getByLote(loteId: string): Promise<Cosecha[]> {
    const response = await apiClient.get<Cosecha[]>(`${this.basePath}/lote/${loteId}`);
    return response.data;
  }

  // POST /api/cosechas - Registrar cosecha
  // IMPORTANTE: Si es_ultima_cosecha = true, el lote se cierra automáticamente
  async create(data: CosechaCreate): Promise<Cosecha> {
    const response = await apiClient.post<Cosecha>(this.basePath, data);
    return response.data;
  }

  // PATCH /api/cosechas/{id} - Actualizar cosecha
  async update(id: string, data: CosechaUpdate): Promise<Cosecha> {
    const response = await apiClient.patch<Cosecha>(`${this.basePath}/${id}`, data);
    return response.data;
  }

  // DELETE /api/cosechas/{id} - Eliminar cosecha
  async delete(id: string): Promise<void> {
    await apiClient.delete(`${this.basePath}/${id}`);
  }
}

export default new CosechaService();