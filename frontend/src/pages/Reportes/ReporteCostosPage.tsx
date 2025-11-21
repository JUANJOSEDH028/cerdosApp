// Página para ver el reporte de costos de un lote
import { useState, useEffect } from 'react';
import { ArrowLeftIcon, ArrowPathIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';
import type { CostosLote } from '../../types';
import reporteService from '../../services/reporte.service';
import LoteSelector from '../../components/Reportes/LoteSelector';
import CostosLoteCard from '../../components/Reportes/CostosLoteCard';

export default function ReporteCostosPage() {
  const [selectedLoteId, setSelectedLoteId] = useState<string>('');
  const [costos, setCostos] = useState<CostosLote | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    if (selectedLoteId) {
      loadCostos();
    }
  }, [selectedLoteId]);

  const loadCostos = async () => {
    if (!selectedLoteId) return;

    try {
      setLoading(true);
      setError('');
      const data = await reporteService.getCostosLote(selectedLoteId);
      setCostos(data);
    } catch (err) {
      console.error('Error al cargar costos:', err);
      setError('Error al cargar el reporte de costos. Por favor intenta nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <Link
            to="/reportes"
            className="inline-flex items-center text-green-600 hover:text-green-700 mb-2"
          >
            <ArrowLeftIcon className="w-4 h-4 mr-1" />
            Volver a Reportes
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Reporte de Costos</h1>
          <p className="text-gray-600 mt-2">
            Desglose detallado de costos por lote
          </p>
        </div>
        
        {selectedLoteId && (
          <button
            onClick={loadCostos}
            disabled={loading}
            className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-400"
          >
            <ArrowPathIcon className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
            <span>Actualizar</span>
          </button>
        )}
      </div>

      {/* Selector de Lote */}
      <LoteSelector 
        onSelect={setSelectedLoteId} 
        selectedLoteId={selectedLoteId}
      />

      {/* Error */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-800">{error}</p>
        </div>
      )}

      {/* Loading */}
      {loading && (
        <div className="bg-white rounded-lg shadow p-12">
          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
            <p className="text-gray-600">Calculando costos...</p>
          </div>
        </div>
      )}

      {/* Costos */}
      {!loading && costos && (
        <CostosLoteCard costos={costos} />
      )}

      {/* Sin Datos */}
      {!loading && !costos && !error && selectedLoteId && (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-12 text-center">
          <p className="text-gray-600">
            No se pudo calcular el reporte de costos para este lote.
          </p>
        </div>
      )}
    </div>
  );
}

