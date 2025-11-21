// Página de gestión de gastos mensuales
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import gastoMensualService from '../../services/gastoMensual.service';
import GastoMensualForm from '../../components/Gastos/GastoMensualForm';
import type { GastoMensual } from '../../types';

export default function GastosMensualesPage() {
  const navigate = useNavigate();
  const [gastos, setGastos] = useState<GastoMensual[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);

  const hoy = new Date();
  const [filtroAnio, setFiltroAnio] = useState(hoy.getFullYear());
  const [filtroMes, setFiltroMes] = useState(hoy.getMonth() + 1);

  useEffect(() => {
    loadGastos();
  }, [filtroAnio, filtroMes]);

  const loadGastos = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await gastoMensualService.getByPeriodo(filtroAnio, filtroMes);
      setGastos(data);
    } catch (err) {
      console.error('Error al cargar gastos:', err);
      setError('Error al cargar los gastos mensuales');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (data: any) => {
    try {
      setSubmitting(true);
      setError(null);
      await gastoMensualService.create(data);
      alert('✅ Gasto mensual registrado exitosamente');
      setShowForm(false);
      loadGastos();
    } catch (err: any) {
      console.error('Error:', err);
      setError(err.response?.data?.detail || 'Error al registrar el gasto');
    } finally {
      setSubmitting(false);
    }
  };

  const meses = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];

  const totalMes = gastos.reduce((sum, g) => sum + g.monto, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center space-x-2 text-sm text-gray-600 mb-2">
            <button onClick={() => navigate('/gastos')} className="hover:text-gray-900">
              Gastos
            </button>
            <span>/</span>
            <span className="text-gray-900">Mensuales</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Gastos Mensuales</h1>
          <p className="text-gray-600 mt-1">Gastos compartidos que se prorratean entre lotes</p>
        </div>
        {!showForm && (
          <button
            onClick={() => setShowForm(true)}
            className="inline-flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Nuevo Gasto
          </button>
        )}
      </div>

      {/* Formulario */}
      {showForm && (
        <div>
          <GastoMensualForm
            onSubmit={handleSubmit}
            loading={submitting}
          />
          {!submitting && (
            <button
              onClick={() => setShowForm(false)}
              className="mt-4 text-gray-600 hover:text-gray-900"
            >
              ← Cancelar y volver a la lista
            </button>
          )}
        </div>
      )}

      {/* Filtros y Lista */}
      {!showForm && (
        <>
          {/* Filtros */}
          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center space-x-4">
              <span className="text-sm font-medium text-gray-700">Período:</span>
              <select
                value={filtroMes}
                onChange={(e) => setFiltroMes(Number(e.target.value))}
                className="px-4 py-2 border border-gray-300 rounded-lg"
              >
                {meses.map((mes, idx) => (
                  <option key={idx} value={idx + 1}>{mes}</option>
                ))}
              </select>
              <select
                value={filtroAnio}
                onChange={(e) => setFiltroAnio(Number(e.target.value))}
                className="px-4 py-2 border border-gray-300 rounded-lg"
              >
                {[2024, 2025, 2026].map(anio => (
                  <option key={anio} value={anio}>{anio}</option>
                ))}
              </select>
              {!loading && (
                <span className="ml-auto text-sm font-semibold text-purple-600">
                  Total: ${totalMes.toLocaleString()}
                </span>
              )}
            </div>
          </div>

          {/* Error */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <span className="text-sm text-red-800">{error}</span>
            </div>
          )}

          {/* Tabla */}
          <div className="bg-white rounded-lg shadow overflow-hidden">
            {loading ? (
              <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
              </div>
            ) : gastos.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">📅</div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No hay gastos registrados</h3>
                <p className="text-gray-600">Registra el primer gasto de este mes</p>
              </div>
            ) : (
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Concepto</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tipo</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Monto</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Observaciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {gastos.map((gasto) => (
                    <tr key={gasto.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">{gasto.concepto}</td>
                      <td className="px-6 py-4 text-sm text-gray-600 capitalize">{gasto.tipo}</td>
                      <td className="px-6 py-4 text-sm font-semibold text-gray-900 text-right">
                        ${gasto.monto.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {gasto.observaciones || '-'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </>
      )}
    </div>
  );
}

