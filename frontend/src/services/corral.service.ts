// Servicio para operaciones con Corrales
// Cada función hace una llamada HTTP específica al backend

import apiClient from './api.client';
import type { Corral, CorralCreate, CorralUpdate } from '../types';

// Clase que agrupa todas las operaciones de Corrales
class CorralService {
  // Ruta base para este recurso
  private readonly basePath = '/corrales';

  // GET /api/corrales - Listar todos los corrales
  // Parámetro opcional: activo (true/false)
  async getAll(activo?: boolean): Promise<Corral[]> {
    const params = activo !== undefined ? { activo } : {};
    const response = await apiClient.get<Corral[]>(this.basePath, { params });
    return response.data;
  }

  // GET /api/corrales/{id} - Obtener un corral por ID
  async getById(id: string): Promise<Corral> {
    const response = await apiClient.get<Corral>(`${this.basePath}/${id}`);
    return response.data;
  }

  // POST /api/corrales - Crear un nuevo corral
  async create(data: CorralCreate): Promise<Corral> {
    const response = await apiClient.post<Corral>(this.basePath, data);
    return response.data;
  }

  // PATCH /api/corrales/{id} - Actualizar un corral
  async update(id: string, data: CorralUpdate): Promise<Corral> {
    const response = await apiClient.patch<Corral>(`${this.basePath}/${id}`, data);
    return response.data;
  }

  // DELETE /api/corrales/{id} - Eliminar un corral
  async delete(id: string): Promise<void> {
    await apiClient.delete(`${this.basePath}/${id}`);
  }
}

// Exportar una instancia única del servicio (Singleton)
export default new CorralService();