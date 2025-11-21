// Formulario para registrar gastos directos
import { useState } from 'react';
import type { GastoDirectoCreate, Lote, TipoGastoDirecto } from '../../types';

interface GastoDirectoFormProps {
  onSubmit: (data: GastoDirectoCreate) => void;
  lotes: Lote[];
  loading?: boolean;
  initialLoteId?: string;
}

const tiposGasto: { value: TipoGastoDirecto; label: string }[] = [
  { value: 'flete', label: 'Flete' },
  { value: 'inmunocastracion', label: 'Inmunocastración' },
  { value: 'otro', label: 'Otro' },
];

export default function GastoDirectoForm({ 
  onSubmit, 
  lotes, 
  loading, 
  initialLoteId 
}: GastoDirectoFormProps) {
  const [formData, setFormData] = useState<GastoDirectoCreate>({
    lote_id: initialLoteId || '',
    fecha: new Date().toISOString().split('T')[0],
    concepto: '',
    tipo: 'flete',
    monto: 0,
    observaciones: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newErrors: Record<string, string> = {};
    
    if (!formData.lote_id) newErrors.lote_id = 'Selecciona un lote';
    if (!formData.concepto) newErrors.concepto = 'Requerido';
    if (!formData.fecha) newErrors.fecha = 'Requerido';
    if (formData.monto <= 0) newErrors.monto = 'Debe ser mayor a 0';
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Gasto Directo</h3>
        
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
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent ${
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
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent ${
                errors.fecha ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.fecha && (
              <p className="mt-1 text-sm text-red-600">{errors.fecha}</p>
            )}
          </div>

          {/* Tipo */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tipo *
            </label>
            <select
              value={formData.tipo}
              onChange={(e) => setFormData({ ...formData, tipo: e.target.value as TipoGastoDirecto })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            >
              {tiposGasto.map((tipo) => (
                <option key={tipo.value} value={tipo.value}>
                  {tipo.label}
                </option>
              ))}
            </select>
          </div>

          {/* Monto */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Monto ($) *
            </label>
            <input
              type="number"
              value={formData.monto || ''}
              onChange={(e) => setFormData({ ...formData, monto: Number(e.target.value) })}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent ${
                errors.monto ? 'border-red-500' : 'border-gray-300'
              }`}
              min="1"
            />
            {errors.monto && (
              <p className="mt-1 text-sm text-red-600">{errors.monto}</p>
            )}
          </div>

          {/* Concepto */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Concepto *
            </label>
            <input
              type="text"
              value={formData.concepto}
              onChange={(e) => setFormData({ ...formData, concepto: e.target.value })}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent ${
                errors.concepto ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Ej: Transporte a planta"
            />
            {errors.concepto && (
              <p className="mt-1 text-sm text-red-600">{errors.concepto}</p>
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
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            placeholder="Detalles adicionales..."
          />
        </div>
      </div>

      {/* Info */}
      <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
        <div className="flex items-start">
          <svg className="w-5 h-5 text-orange-600 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
          <p className="text-sm text-orange-800">
            Los gastos directos se asignan específicamente a un lote y se suman directamente a su costo total.
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
          disabled={loading}
          className="px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Guardando...' : 'Registrar Gasto'}
        </button>
      </div>
    </form>
  );
}

