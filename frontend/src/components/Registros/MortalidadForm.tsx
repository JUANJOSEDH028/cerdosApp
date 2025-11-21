// Formulario para registrar mortalidad
import { useState } from 'react';
import type { MortalidadCreate, Lote } from '../../types';

interface MortalidadFormProps {
  onSubmit: (data: MortalidadCreate) => void;
  lotes: Lote[];
  loading?: boolean;
  initialLoteId?: string;
}

export default function MortalidadForm({ 
  onSubmit, 
  lotes, 
  loading, 
  initialLoteId 
}: MortalidadFormProps) {
  const [formData, setFormData] = useState<MortalidadCreate>({
    lote_id: initialLoteId || '',
    fecha: new Date().toISOString().split('T')[0],
    cantidad: 0,
    peso_promedio_kg: undefined,
    causa: '',
    observaciones: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newErrors: Record<string, string> = {};
    
    if (!formData.lote_id) newErrors.lote_id = 'Selecciona un lote';
    if (!formData.fecha) newErrors.fecha = 'Requerido';
    if (formData.cantidad <= 0) newErrors.cantidad = 'Debe ser mayor a 0';
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Registro de Mortalidad</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Lote */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Lote *
            </label>
            <select
              value={formData.lote_id}
              onChange={(e) => setFormData({ ...formData, lote_id: e.target.value })}
              disabled={!!initialLoteId}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent ${
                errors.lote_id ? 'border-red-500' : 'border-gray-300'
              } ${initialLoteId ? 'bg-gray-100' : ''}`}
            >
              <option value="">Seleccionar lote...</option>
              {lotes.filter(l => l.estado === 'activo').map(lote => (
                <option key={lote.id} value={lote.id}>
                  {lote.numero_lote}
                </option>
              ))}
            </select>
            {errors.lote_id && (
              <p className="mt-1 text-sm text-red-600">{errors.lote_id}</p>
            )}
          </div>

          {/* Fecha */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Fecha *
            </label>
            <input
              type="date"
              value={formData.fecha}
              onChange={(e) => setFormData({ ...formData, fecha: e.target.value })}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent ${
                errors.fecha ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.fecha && (
              <p className="mt-1 text-sm text-red-600">{errors.fecha}</p>
            )}
          </div>

          {/* Cantidad */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Cantidad de Animales *
            </label>
            <input
              type="number"
              value={formData.cantidad || ''}
              onChange={(e) => setFormData({ ...formData, cantidad: Number(e.target.value) })}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent ${
                errors.cantidad ? 'border-red-500' : 'border-gray-300'
              }`}
              min="1"
            />
            {errors.cantidad && (
              <p className="mt-1 text-sm text-red-600">{errors.cantidad}</p>
            )}
          </div>

          {/* Peso Promedio (Opcional) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Peso Promedio (kg)
            </label>
            <input
              type="number"
              step="0.1"
              value={formData.peso_promedio_kg || ''}
              onChange={(e) => setFormData({ ...formData, peso_promedio_kg: e.target.value ? Number(e.target.value) : undefined })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              placeholder="Opcional"
              min="0.1"
            />
          </div>
        </div>

        {/* Causa */}
        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Causa
          </label>
          <input
            type="text"
            value={formData.causa}
            onChange={(e) => setFormData({ ...formData, causa: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            placeholder="Ej: Enfermedad respiratoria"
          />
        </div>

        {/* Observaciones */}
        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Observaciones
          </label>
          <textarea
            value={formData.observaciones}
            onChange={(e) => setFormData({ ...formData, observaciones: e.target.value })}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            placeholder="Detalles adicionales..."
          />
        </div>
      </div>

      {/* Alerta */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <div className="flex items-start">
          <svg className="w-5 h-5 text-yellow-600 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          <p className="text-sm text-yellow-800">
            Este registro se descontará del total de animales del lote.
          </p>
        </div>
      </div>

      {/* Botones */}
      <div className="flex justify-end space-x-4">
        <button
          type="button"
          onClick={() => window.history.back()}
          className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
          disabled={loading}
        >
          Cancelar
        </button>
        <button
          type="submit"
          disabled={loading || Object.keys(errors).length > 0}
          className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Guardando...' : 'Registrar Mortalidad'}
        </button>
      </div>
    </form>
  );
}

