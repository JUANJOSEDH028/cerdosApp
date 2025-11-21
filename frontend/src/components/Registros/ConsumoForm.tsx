// Formulario para registrar consumo de alimento
import { useState } from 'react';
import type { ConsumoAlimentoCreate, Lote, Alimento } from '../../types';

interface ConsumoFormProps {
  onSubmit: (data: ConsumoAlimentoCreate) => void;
  lotes: Lote[];
  alimentos: Alimento[];
  loading?: boolean;
  initialLoteId?: string;
}

export default function ConsumoForm({ 
  onSubmit, 
  lotes, 
  alimentos, 
  loading, 
  initialLoteId 
}: ConsumoFormProps) {
  const [formData, setFormData] = useState<ConsumoAlimentoCreate>({
    lote_id: initialLoteId || '',
    alimento_id: '',
    fecha: new Date().toISOString().split('T')[0],
    cantidad_bultos: 0,
    observaciones: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newErrors: Record<string, string> = {};
    
    if (!formData.lote_id) newErrors.lote_id = 'Selecciona un lote';
    if (!formData.alimento_id) newErrors.alimento_id = 'Selecciona un alimento';
    if (!formData.fecha) newErrors.fecha = 'Requerido';
    if (formData.cantidad_bultos <= 0) newErrors.cantidad_bultos = 'Debe ser mayor a 0';
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    onSubmit(formData);
  };

  const alimentoSeleccionado = alimentos.find(a => a.id === formData.alimento_id);
  const totalKg = alimentoSeleccionado 
    ? (formData.cantidad_bultos * alimentoSeleccionado.peso_bulto_kg).toFixed(2)
    : 0;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Registro de Consumo</h3>
        
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
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
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
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                errors.fecha ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.fecha && (
              <p className="mt-1 text-sm text-red-600">{errors.fecha}</p>
            )}
          </div>

          {/* Alimento */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Alimento *
            </label>
            <select
              value={formData.alimento_id}
              onChange={(e) => setFormData({ ...formData, alimento_id: e.target.value })}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                errors.alimento_id ? 'border-red-500' : 'border-gray-300'
              }`}
            >
              <option value="">Seleccionar alimento...</option>
              {alimentos.filter(a => a.activo).map(alimento => (
                <option key={alimento.id} value={alimento.id}>
                  {alimento.nombre} ({alimento.tipo})
                </option>
              ))}
            </select>
            {errors.alimento_id && (
              <p className="mt-1 text-sm text-red-600">{errors.alimento_id}</p>
            )}
          </div>

          {/* Cantidad de Bultos */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Cantidad de Bultos *
            </label>
            <input
              type="number"
              step="0.5"
              value={formData.cantidad_bultos || ''}
              onChange={(e) => setFormData({ ...formData, cantidad_bultos: Number(e.target.value) })}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                errors.cantidad_bultos ? 'border-red-500' : 'border-gray-300'
              }`}
              min="0.5"
            />
            {errors.cantidad_bultos && (
              <p className="mt-1 text-sm text-red-600">{errors.cantidad_bultos}</p>
            )}
            {alimentoSeleccionado && formData.cantidad_bultos > 0 && (
              <p className="mt-1 text-sm text-blue-600">
                Total: {totalKg} kg
              </p>
            )}
          </div>
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
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            placeholder="Notas adicionales..."
          />
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
          className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Guardando...' : 'Registrar Consumo'}
        </button>
      </div>
    </form>
  );
}

