// Formulario para registrar gastos mensuales
import { useState } from 'react';
import type { GastoMensualCreate, TipoGastoMensual } from '../../types';

interface GastoMensualFormProps {
  onSubmit: (data: GastoMensualCreate) => void;
  loading?: boolean;
}

const tiposGasto: { value: TipoGastoMensual; label: string }[] = [
  { value: 'arriendo', label: 'Arriendo' },
  { value: 'servicios', label: 'Servicios (Luz, Agua)' },
  { value: 'nomina', label: 'Nómina' },
  { value: 'medicamentos', label: 'Medicamentos' },
  { value: 'insumos', label: 'Insumos' },
  { value: 'otros', label: 'Otros' },
];

export default function GastoMensualForm({ onSubmit, loading }: GastoMensualFormProps) {
  const hoy = new Date();
  const [formData, setFormData] = useState<GastoMensualCreate>({
    mes: hoy.getMonth() + 1,
    anio: hoy.getFullYear(),
    concepto: '',
    tipo: 'servicios',
    monto: 0,
    observaciones: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newErrors: Record<string, string> = {};
    
    if (!formData.concepto) newErrors.concepto = 'Requerido';
    if (formData.monto <= 0) newErrors.monto = 'Debe ser mayor a 0';
    if (formData.mes < 1 || formData.mes > 12) newErrors.mes = 'Mes inválido';
    if (formData.anio < 2020) newErrors.anio = 'Año inválido';
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    onSubmit(formData);
  };

  const meses = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Gasto Mensual</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Período */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Mes *
            </label>
            <select
              value={formData.mes}
              onChange={(e) => setFormData({ ...formData, mes: Number(e.target.value) })}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                errors.mes ? 'border-red-500' : 'border-gray-300'
              }`}
            >
              {meses.map((mes, index) => (
                <option key={index} value={index + 1}>
                  {mes}
                </option>
              ))}
            </select>
            {errors.mes && (
              <p className="mt-1 text-sm text-red-600">{errors.mes}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Año *
            </label>
            <input
              type="number"
              value={formData.anio}
              onChange={(e) => setFormData({ ...formData, anio: Number(e.target.value) })}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                errors.anio ? 'border-red-500' : 'border-gray-300'
              }`}
              min="2020"
            />
            {errors.anio && (
              <p className="mt-1 text-sm text-red-600">{errors.anio}</p>
            )}
          </div>

          {/* Tipo */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tipo *
            </label>
            <select
              value={formData.tipo}
              onChange={(e) => setFormData({ ...formData, tipo: e.target.value as TipoGastoMensual })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
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
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
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
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                errors.concepto ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Ej: Arriendo Granja Principal"
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
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="Notas adicionales..."
          />
        </div>
      </div>

      {/* Info sobre prorrateo */}
      <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
        <div className="flex items-start">
          <svg className="w-5 h-5 text-purple-600 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
          <p className="text-sm text-purple-800">
            Los gastos mensuales se prorratean automáticamente entre todos los lotes activos según su área y tiempo de ocupación.
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
          className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Guardando...' : 'Registrar Gasto'}
        </button>
      </div>
    </form>
  );
}

