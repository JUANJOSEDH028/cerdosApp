// Página de gestión de gastos directos
import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import gastoDirectoService from '../../services/gasto-directo.service';
import loteService from '../../services/lote.service';
import GastoDirectoForm from '../../components/Gastos/GastoDirectoForm';
import type { GastoDirecto, Lote } from '../../types';

export default function GastosDirectosPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const loteIdParam = searchParams.get('lote');

  const [gastos, setGastos] = useState<GastoDirecto[]>([]);
  const [lotes, setLotes] = useState<Lote[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [filtroLote, setFiltroLote] = useState<string>(loteIdParam || '');

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    if (filtroLote) {
      loadGastos();
    }
  }, [filtroLote]);

  const loadData = async () => {
    try {
      setLoading(true);
      const lotesData = await loteService.getAll('activo');
      setLotes(lotesData);
      if (lotesData.length > 0 && !filtroLote) {
        setFiltroLote(lotesData[0].id);
      } else if (filtroLote) {
        await loadGastos();
      }
    } catch (err) {
      console.error('Error:', err);
      setError('Error al cargar datos');
    } finally {
      setLoading(false);
    }
  };

  const loadGastos = async () => {
    if (!filtroLote) return;
    try {
      setLoading(true);
      setError(null);
      const data = await gastoDirectoService.getByLote(filtroLote);
      setGastos(data);
    } catch (err) {
      console.error('Error:', err);
      setError('Error al cargar gastos');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (data: any) => {
    try {
      setSubmitting(true);
      setError(null);
      await gastoDirectoService.create(data);
      alert('✅ Gasto directo registrado exitosamente');
      setShowForm(false);
      loadGastos();
    } catch (err: any) {
      console.error('Error:', err);
      setError(err.response?.data?.detail || 'Error al registrar el gasto');
    } finally {
      setSubmitting(false);
    }
  };

  const totalLote = gastos.reduce((sum, g) => sum + g.monto, 0);

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
            <span className="text-gray-900">Directos</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Gastos Directos</h1>
          <p className="text-gray-600 mt-1">Gastos asignados específicamente a un lote</p>
        </div>
        {!showForm && (
          <button
            onClick={() => setShowForm(true)}
            className="inline-flex items-center px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700"
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
          <GastoDirectoForm
            onSubmit={handleSubmit}
            lotes={lotes}
            loading={submitting}
            initialLoteId={filtroLote}
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
              <span className="text-sm font-medium text-gray-700">Filtrar por lote:</span>
              <select
                value={filtroLote}
                onChange={(e) => setFiltroLote(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg"
              >
                {lotes.map((lote) => (
                  <option key={lote.id} value={lote.id}>
                    {lote.numero_lote}
                  </option>
                ))}
              </select>
              {!loading && (
                <span className="ml-auto text-sm font-semibold text-orange-600">
                  Total: ${totalLote.toLocaleString()}
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
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600"></div>
              </div>
            ) : gastos.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🎯</div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No hay gastos registrados</h3>
                <p className="text-gray-600">Registra el primer gasto directo de este lote</p>
              </div>
            ) : (
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Fecha</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Concepto</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tipo</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Monto</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Observaciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {gastos.map((gasto) => (
                    <tr key={gasto.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm text-gray-900">
                        {new Date(gasto.fecha).toLocaleDateString('es-ES')}
                      </td>
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

