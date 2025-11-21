// Formulario para crear/editar lotes
import { useState, useEffect } from 'react';
import type { LoteCreate, Corral } from '../../types';

interface LoteFormProps {
  onSubmit: (data: LoteCreate) => void;
  corrales: Corral[];
  loading?: boolean;
  initialData?: Partial<LoteCreate>;
  submitLabel?: string;
}

export default function LoteForm({
  onSubmit,
  corrales,
  loading = false,
  initialData,
  submitLabel = 'Crear Lote'
}: LoteFormProps) {
  const [formData, setFormData] = useState<LoteCreate>({
    numero_lote: initialData?.numero_lote || '',
    fecha_inicio: initialData?.fecha_inicio || new Date().toISOString().split('T')[0],
    animales_iniciales: initialData?.animales_iniciales || 0,
    peso_promedio_inicial: initialData?.peso_promedio_inicial || 0,
    cantidad_machos: initialData?.cantidad_machos || 0,
    cantidad_hembras: initialData?.cantidad_hembras || 0,
    costo_lechones: initialData?.costo_lechones || 0,
    observaciones: initialData?.observaciones || '',
    corrales_ids: initialData?.corrales_ids || [],
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  // Validar que machos + hembras = animales iniciales
  useEffect(() => {
    const total = formData.cantidad_machos + formData.cantidad_hembras;
    if (total !== formData.animales_iniciales && formData.animales_iniciales > 0) {
      setErrors(prev => ({
        ...prev,
        distribucion: `Machos (${formData.cantidad_machos}) + Hembras (${formData.cantidad_hembras}) debe ser igual a Animales Iniciales (${formData.animales_iniciales})`
      }));
    } else {
      setErrors(prev => {
        const { distribucion, ...rest } = prev;
        return rest;
      });
    }
  }, [formData.cantidad_machos, formData.cantidad_hembras, formData.animales_iniciales]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validaciones
    const newErrors: Record<string, string> = {};
    
    if (!formData.numero_lote) newErrors.numero_lote = 'Requerido';
    if (!formData.fecha_inicio) newErrors.fecha_inicio = 'Requerido';
    if (formData.animales_iniciales <= 0) newErrors.animales_iniciales = 'Debe ser mayor a 0';
    if (formData.peso_promedio_inicial <= 0) newErrors.peso_promedio_inicial = 'Debe ser mayor a 0';
    if (formData.costo_lechones <= 0) newErrors.costo_lechones = 'Debe ser mayor a 0';
    if (formData.corrales_ids.length === 0) newErrors.corrales_ids = 'Selecciona al menos un corral';
    if (formData.cantidad_machos + formData.cantidad_hembras !== formData.animales_iniciales) {
      newErrors.distribucion = 'La suma de machos y hembras debe ser igual a animales iniciales';
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    onSubmit(formData);
  };

  const handleCorralToggle = (corralId: string) => {
    setFormData(prev => ({
      ...prev,
      corrales_ids: prev.corrales_ids.includes(corralId)
        ? prev.corrales_ids.filter(id => id !== corralId)
        : [...prev.corrales_ids, corralId]
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Información básica */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Información Básica</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Número de Lote */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Número de Lote *
            </label>
            <input
              type="text"
              value={formData.numero_lote}
              onChange={(e) => setFormData({ ...formData, numero_lote: e.target.value })}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                errors.numero_lote ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Ej: LOTE-001-2024"
            />
            {errors.numero_lote && (
              <p className="mt-1 text-sm text-red-600">{errors.numero_lote}</p>
            )}
          </div>

          {/* Fecha de Inicio */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Fecha de Inicio *
            </label>
            <input
              type="date"
              value={formData.fecha_inicio}
              onChange={(e) => setFormData({ ...formData, fecha_inicio: e.target.value })}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                errors.fecha_inicio ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.fecha_inicio && (
              <p className="mt-1 text-sm text-red-600">{errors.fecha_inicio}</p>
            )}
          </div>
        </div>
      </div>

      {/* Animales */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Información de Animales</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Animales Iniciales */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Animales Iniciales *
            </label>
            <input
              type="number"
              value={formData.animales_iniciales || ''}
              onChange={(e) => setFormData({ ...formData, animales_iniciales: Number(e.target.value) })}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                errors.animales_iniciales ? 'border-red-500' : 'border-gray-300'
              }`}
              min="1"
            />
            {errors.animales_iniciales && (
              <p className="mt-1 text-sm text-red-600">{errors.animales_iniciales}</p>
            )}
          </div>

          {/* Cantidad Machos */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Machos *
            </label>
            <input
              type="number"
              value={formData.cantidad_machos || ''}
              onChange={(e) => setFormData({ ...formData, cantidad_machos: Number(e.target.value) })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              min="0"
            />
          </div>

          {/* Cantidad Hembras */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Hembras *
            </label>
            <input
              type="number"
              value={formData.cantidad_hembras || ''}
              onChange={(e) => setFormData({ ...formData, cantidad_hembras: Number(e.target.value) })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              min="0"
            />
          </div>
        </div>

        {errors.distribucion && (
          <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-600">{errors.distribucion}</p>
          </div>
        )}
      </div>

      {/* Costos y Pesos */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Costos y Pesos</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Peso Promedio Inicial */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Peso Promedio Inicial (kg) *
            </label>
            <input
              type="number"
              step="0.1"
              value={formData.peso_promedio_inicial || ''}
              onChange={(e) => setFormData({ ...formData, peso_promedio_inicial: Number(e.target.value) })}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                errors.peso_promedio_inicial ? 'border-red-500' : 'border-gray-300'
              }`}
              min="0.1"
            />
            {errors.peso_promedio_inicial && (
              <p className="mt-1 text-sm text-red-600">{errors.peso_promedio_inicial}</p>
            )}
          </div>

          {/* Costo Lechones */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Costo Lechones ($) *
            </label>
            <input
              type="number"
              value={formData.costo_lechones || ''}
              onChange={(e) => setFormData({ ...formData, costo_lechones: Number(e.target.value) })}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                errors.costo_lechones ? 'border-red-500' : 'border-gray-300'
              }`}
              min="1"
            />
            {errors.costo_lechones && (
              <p className="mt-1 text-sm text-red-600">{errors.costo_lechones}</p>
            )}
          </div>
        </div>
      </div>

      {/* Corrales */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Asignación de Corrales *
        </h3>
        
        {corrales.length === 0 ? (
          <p className="text-gray-600">No hay corrales disponibles</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {corrales.map((corral) => (
              <label
                key={corral.id}
                className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all ${
                  formData.corrales_ids.includes(corral.id)
                    ? 'border-green-500 bg-green-50'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                <input
                  type="checkbox"
                  checked={formData.corrales_ids.includes(corral.id)}
                  onChange={() => handleCorralToggle(corral.id)}
                  className="sr-only"
                />
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{corral.nombre}</p>
                  <p className="text-sm text-gray-500">{corral.area_m2} m²</p>
                </div>
                {formData.corrales_ids.includes(corral.id) && (
                  <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                )}
              </label>
            ))}
          </div>
        )}
        
        {errors.corrales_ids && (
          <p className="mt-2 text-sm text-red-600">{errors.corrales_ids}</p>
        )}
      </div>

      {/* Observaciones */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Observaciones</h3>
        
        <textarea
          value={formData.observaciones}
          onChange={(e) => setFormData({ ...formData, observaciones: e.target.value })}
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          placeholder="Notas adicionales sobre el lote..."
        />
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
          {loading ? 'Guardando...' : submitLabel}
        </button>
      </div>
    </form>
  );
}

