// Formulario para registrar cosecha (venta)
import { useState } from 'react';
import type { CosechaCreate, Lote, TipoCosecha } from '../../types';

interface CosechaFormProps {
  onSubmit: (data: CosechaCreate) => void;
  lotes: Lote[];
  loading?: boolean;
  initialLoteId?: string;
}

export default function CosechaForm({ 
  onSubmit, 
  lotes, 
  loading, 
  initialLoteId 
}: CosechaFormProps) {
  const [formData, setFormData] = useState<CosechaCreate>({
    lote_id: initialLoteId || '',
    fecha: new Date().toISOString().split('T')[0],
    tipo: 'media',
    cantidad_animales: 0,
    peso_total_kg: 0,
    es_ultima_cosecha: false,
    observaciones: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newErrors: Record<string, string> = {};
    
    if (!formData.lote_id) newErrors.lote_id = 'Selecciona un lote';
    if (!formData.fecha) newErrors.fecha = 'Requerido';
    if (formData.cantidad_animales <= 0) newErrors.cantidad_animales = 'Debe ser mayor a 0';
    if (formData.peso_total_kg <= 0) newErrors.peso_total_kg = 'Debe ser mayor a 0';
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    onSubmit(formData);
  };

  const pesoPromedio = formData.cantidad_animales > 0 
    ? (formData.peso_total_kg / formData.cantidad_animales).toFixed(2)
    : 0;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Registro de Cosecha</h3>
        
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
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
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
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.fecha ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.fecha && (
              <p className="mt-1 text-sm text-red-600">{errors.fecha}</p>
            )}
          </div>

          {/* Tipo de Cosecha */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tipo de Cosecha *
            </label>
            <select
              value={formData.tipo}
              onChange={(e) => setFormData({ ...formData, tipo: e.target.value as TipoCosecha })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="cabezas">Cabezas (Mejores)</option>
              <option value="media">Media (Promedio)</option>
              <option value="colas">Colas (Menores)</option>
            </select>
          </div>

          {/* Cantidad de Animales */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Cantidad de Animales *
            </label>
            <input
              type="number"
              value={formData.cantidad_animales || ''}
              onChange={(e) => setFormData({ ...formData, cantidad_animales: Number(e.target.value) })}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.cantidad_animales ? 'border-red-500' : 'border-gray-300'
              }`}
              min="1"
            />
            {errors.cantidad_animales && (
              <p className="mt-1 text-sm text-red-600">{errors.cantidad_animales}</p>
            )}
          </div>

          {/* Peso Total */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Peso Total (kg) *
            </label>
            <input
              type="number"
              step="0.1"
              value={formData.peso_total_kg || ''}
              onChange={(e) => setFormData({ ...formData, peso_total_kg: Number(e.target.value) })}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.peso_total_kg ? 'border-red-500' : 'border-gray-300'
              }`}
              min="0.1"
            />
            {errors.peso_total_kg && (
              <p className="mt-1 text-sm text-red-600">{errors.peso_total_kg}</p>
            )}
            {formData.cantidad_animales > 0 && formData.peso_total_kg > 0 && (
              <p className="mt-1 text-sm text-blue-600">
                Peso promedio: {pesoPromedio} kg/animal
              </p>
            )}
          </div>
        </div>

        {/* Última Cosecha */}
        <div className="mt-6">
          <label className="flex items-center space-x-3">
            <input
              type="checkbox"
              checked={formData.es_ultima_cosecha}
              onChange={(e) => setFormData({ ...formData, es_ultima_cosecha: e.target.checked })}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <span className="text-sm font-medium text-gray-700">
              Esta es la última cosecha del lote
            </span>
          </label>
          {formData.es_ultima_cosecha && (
            <p className="mt-2 text-sm text-yellow-600">
              ⚠️ El lote se cerrará automáticamente después de registrar esta cosecha
            </p>
          )}
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
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Notas sobre la venta, destino, etc..."
          />
        </div>
      </div>

      {/* Información */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start">
          <svg className="w-5 h-5 text-blue-600 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
          <p className="text-sm text-blue-800">
            Los animales vendidos se descontarán del total disponible del lote.
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
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Guardando...' : 'Registrar Cosecha'}
        </button>
      </div>
    </form>
  );
}

