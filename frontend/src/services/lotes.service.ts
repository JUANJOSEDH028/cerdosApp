// Servicio para operaciones con Lotes

import apiClient from './api.client';
import type { Lote, LoteDetalle, LoteCreate, LoteUpdate, EstadoLote } from '../types';

class LoteService {
  private readonly basePath = '/lotes';

  // GET /api/lotes - Listar lotes con filtro opcional por estado
  async getAll(estado?: EstadoLote): Promise<Lote[]> {
    const params = estado ? { estado } : {};
    const response = await apiClient.get<Lote[]>(this.basePath, { params });
    return response.data;
  }

  // GET /api/lotes/{id} - Obtener lote con detalles completos
  async getById(id: string): Promise<LoteDetalle> {
    const response = await apiClient.get<LoteDetalle>(`${this.basePath}/${id}`);
    return response.data;
  }

  // POST /api/lotes - Crear un nuevo lote y asignar corrales
  async create(data: LoteCreate): Promise<Lote> {
    const response = await apiClient.post<Lote>(this.basePath, data);
    return response.data;
  }

  // PATCH /api/lotes/{id} - Actualizar un lote
  async update(id: string, data: LoteUpdate): Promise<Lote> {
    const response = await apiClient.patch<Lote>(`${this.basePath}/${id}`, data);
    return response.data;
  }

  // POST /api/lotes/{id}/cerrar - Cerrar lote manualmente
  async cerrar(id: string): Promise<Lote> {
    const response = await apiClient.post<Lote>(`${this.basePath}/${id}/cerrar`);
    return response.data;
  }
}

export default new LoteService();