// Servicio para operaciones con Consumo de Alimento

import apiClient from './api.client';
import type { ConsumoAlimento, ConsumoAlimentoCreate, ConsumoAlimentoUpdate } from '../types';

class ConsumoAlimentoService {
  private readonly basePath = '/consumo-alimento';

  // GET /api/consumo-alimento/lote/{lote_id} - Obtener consumo de un lote
  async getByLote(loteId: string): Promise<ConsumoAlimento[]> {
    const response = await apiClient.get<ConsumoAlimento[]>(`${this.basePath}/lote/${loteId}`);
    return response.data;
  }

  // POST /api/consumo-alimento - Registrar consumo
  async create(data: ConsumoAlimentoCreate): Promise<ConsumoAlimento> {
    const response = await apiClient.post<ConsumoAlimento>(this.basePath, data);
    return response.data;
  }

  // PATCH /api/consumo-alimento/{id} - Actualizar consumo
  async update(id: string, data: ConsumoAlimentoUpdate): Promise<ConsumoAlimento> {
    const response = await apiClient.patch<ConsumoAlimento>(`${this.basePath}/${id}`, data);
    return response.data;
  }

  // DELETE /api/consumo-alimento/{id} - Eliminar registro
  async delete(id: string): Promise<void> {
    await apiClient.delete(`${this.basePath}/${id}`);
  }
}

export default new ConsumoAlimentoService();