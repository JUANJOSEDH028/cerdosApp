// Servicio para operaciones con Alimentos

import apiClient from './api.client';
import type { Alimento, AlimentoCreate, AlimentoUpdate } from '../types';

class AlimentoService {
  private readonly basePath = '/alimentos';

  // GET /api/alimentos
  async getAll(activo?: boolean): Promise<Alimento[]> {
    const params = activo !== undefined ? { activo } : {};
    const response = await apiClient.get<Alimento[]>(this.basePath, { params });
    return response.data;
  }

  // GET /api/alimentos/{id}
  async getById(id: string): Promise<Alimento> {
    const response = await apiClient.get<Alimento>(`${this.basePath}/${id}`);
    return response.data;
  }

  // POST /api/alimentos
  async create(data: AlimentoCreate): Promise<Alimento> {
    const response = await apiClient.post<Alimento>(this.basePath, data);
    return response.data;
  }

  // PATCH /api/alimentos/{id}
  async update(id: string, data: AlimentoUpdate): Promise<Alimento> {
    const response = await apiClient.patch<Alimento>(`${this.basePath}/${id}`, data);
    return response.data;
  }

  // DELETE /api/alimentos/{id}
  async delete(id: string): Promise<void> {
    await apiClient.delete(`${this.basePath}/${id}`);
  }
}

export default new AlimentoService();