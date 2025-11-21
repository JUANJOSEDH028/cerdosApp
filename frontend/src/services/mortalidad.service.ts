// Servicio para operaciones con Mortalidad

import apiClient from './api.client';
import type { Mortalidad, MortalidadCreate, MortalidadUpdate } from '../types';

class MortalidadService {
  private readonly basePath = '/mortalidad';

  // GET /api/mortalidad/lote/{lote_id} - Obtener mortalidad de un lote
  async getByLote(loteId: string): Promise<Mortalidad[]> {
    const response = await apiClient.get<Mortalidad[]>(`${this.basePath}/lote/${loteId}`);
    return response.data;
  }

  // POST /api/mortalidad - Registrar mortalidad
  async create(data: MortalidadCreate): Promise<Mortalidad> {
    const response = await apiClient.post<Mortalidad>(this.basePath, data);
    return response.data;
  }

  // PATCH /api/mortalidad/{id} - Actualizar registro
  async update(id: string, data: MortalidadUpdate): Promise<Mortalidad> {
    const response = await apiClient.patch<Mortalidad>(`${this.basePath}/${id}`, data);
    return response.data;
  }

  // DELETE /api/mortalidad/{id} - Eliminar registro
  async delete(id: string): Promise<void> {
    await apiClient.delete(`${this.basePath}/${id}`);
  }
}

export default new MortalidadService();