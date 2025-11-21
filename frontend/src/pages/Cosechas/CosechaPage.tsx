// Página para registrar cosecha
import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import loteService from '../../services/lote.service';
import cosechaService from '../../services/cosecha.service';
import CosechaForm from '../../components/Registros/CosechaForm';
import type { Lote } from '../../types';

export default function CosechaPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const loteIdParam = searchParams.get('lote');

  const [lotes, setLotes] = useState<Lote[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoadingData(true);
      const lotesData = await loteService.getAll('activo');
      setLotes(lotesData);
    } catch (err) {
      console.error('Error al cargar datos:', err);
      setError('No se pudieron cargar los lotes activos');
    } finally {
      setLoadingData(false);
    }
  };

  const handleSubmit = async (data: any) => {
    try {
      setLoading(true);
      setError(null);

      await cosechaService.create(data);

      if (data.es_ultima_cosecha) {
        alert('🚚 Cosecha registrada exitosamente. El lote ha sido cerrado.');
      } else {
        alert('🚚 Cosecha registrada exitosamente');
      }
      
      navigate('/cosechas');
    } catch (err: any) {
      console.error('Error al registrar cosecha:', err);
      setError(err.response?.data?.detail || 'Error al registrar la cosecha');
    } finally {
      setLoading(false);
    }
  };

  if (loadingData) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center space-x-2 text-sm text-gray-600 mb-2">
          <button onClick={() => navigate('/cosechas')} className="hover:text-gray-900">
            Cosechas
          </button>
          <span>/</span>
          <span className="text-gray-900">Nueva</span>
        </div>
        <h1 className="text-2xl font-bold text-gray-900">Registrar Cosecha</h1>
        <p className="text-gray-600 mt-1">Registra la venta de animales</p>
      </div>

      {/* Error */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-start">
            <svg className="w-5 h-5 text-red-600 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            <span className="text-sm text-red-800">{error}</span>
          </div>
        </div>
      )}

      {/* Formulario */}
      <CosechaForm
        onSubmit={handleSubmit}
        lotes={lotes}
        loading={loading}
        initialLoteId={loteIdParam || undefined}
      />
    </div>
  );
}

