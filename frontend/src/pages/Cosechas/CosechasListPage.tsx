// Página de listado de cosechas
import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import cosechaService from '../../services/cosecha.service';
import loteService from '../../services/lote.service';
import CosechasTable from '../../components/Cosechas/CosechasTable';
import type { Cosecha, Lote } from '../../types';

export default function CosechasListPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const loteIdParam = searchParams.get('lote');

  const [cosechas, setCosechas] = useState<Cosecha[]>([]);
  const [lotes, setLotes] = useState<Lote[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filtroLote, setFiltroLote] = useState<string>(loteIdParam || 'todos');

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    loadCosechas();
  }, [filtroLote]);

  const loadData = async () => {
    try {
      setLoading(true);
      const lotesData = await loteService.getAll();
      setLotes(lotesData);
      await loadCosechas();
    } catch (err) {
      console.error('Error al cargar datos:', err);
      setError('Error al cargar los datos');
    } finally {
      setLoading(false);
    }
  };

  const loadCosechas = async () => {
    try {
      setLoading(true);
      setError(null);

      // Si hay un filtro de lote, cargar solo ese lote
      if (filtroLote && filtroLote !== 'todos') {
        const data = await cosechaService.getByLote(filtroLote);
        setCosechas(data);
      } else {
        // Por ahora cargar todas (el backend no tiene un getAll general)
        // Tendríamos que cargar por cada lote activo
        // Para simplificar, mostrar mensaje si no hay lote seleccionado
        if (lotes.length > 0) {
          // Cargar cosechas del primer lote por defecto
          const primerLote = lotes[0];
          const data = await cosechaService.getByLote(primerLote.id);
          setCosechas(data);
          setFiltroLote(primerLote.id);
        } else {
          setCosechas([]);
        }
      }
    } catch (err) {
      console.error('Error al cargar cosechas:', err);
      setError('Error al cargar las cosechas');
    } finally {
      setLoading(false);
    }
  };

  const handleFiltroChange = (loteId: string) => {
    setFiltroLote(loteId);
    if (loteId === 'todos') {
      searchParams.delete('lote');
    } else {
      searchParams.set('lote', loteId);
    }
    setSearchParams(searchParams);
  };

  const loteSeleccionado = lotes.find(l => l.id === filtroLote);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Cosechas y Ventas</h1>
          <p className="text-gray-600 mt-1">Registro histórico de ventas de animales</p>
        </div>
        <Link
          to="/cosechas/nueva"
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Nueva Cosecha
        </Link>
      </div>

      {/* Filtros */}
      <div className="bg-white rounded-lg shadow p-4">
        <div className="flex items-center space-x-4">
          <span className="text-sm font-medium text-gray-700">Filtrar por lote:</span>
          <select
            value={filtroLote}
            onChange={(e) => handleFiltroChange(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {lotes.map((lote) => (
              <option key={lote.id} value={lote.id}>
                {lote.numero_lote} ({lote.estado})
              </option>
            ))}
          </select>

          {loteSeleccionado && (
            <div className="ml-auto flex items-center space-x-4 text-sm">
              <div>
                <span className="text-gray-600">Animales Iniciales:</span>
                <span className="ml-2 font-semibold text-gray-900">
                  {loteSeleccionado.animales_iniciales}
                </span>
              </div>
              <div>
                <span className="text-gray-600">Peso Inicial:</span>
                <span className="ml-2 font-semibold text-gray-900">
                  {loteSeleccionado.peso_promedio_inicial} kg
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center">
            <svg className="w-5 h-5 text-red-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            <span className="text-sm text-red-800">{error}</span>
            <button
              onClick={loadData}
              className="ml-auto text-sm text-red-600 hover:text-red-800 font-medium"
            >
              Reintentar
            </button>
          </div>
        </div>
      )}

      {/* Información del lote seleccionado */}
      {loteSeleccionado && cosechas.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg shadow p-4">
            <p className="text-sm text-gray-600">Total Cosechado</p>
            <p className="text-2xl font-bold text-blue-600 mt-1">
              {cosechas.reduce((sum, c) => sum + c.cantidad_animales, 0)}
            </p>
            <p className="text-xs text-gray-500 mt-1">animales vendidos</p>
          </div>

          <div className="bg-white rounded-lg shadow p-4">
            <p className="text-sm text-gray-600">Peso Total Vendido</p>
            <p className="text-2xl font-bold text-green-600 mt-1">
              {cosechas.reduce((sum, c) => sum + c.peso_total_kg, 0).toLocaleString()}
            </p>
            <p className="text-xs text-gray-500 mt-1">kg</p>
          </div>

          <div className="bg-white rounded-lg shadow p-4">
            <p className="text-sm text-gray-600">Peso Promedio</p>
            <p className="text-2xl font-bold text-purple-600 mt-1">
              {(cosechas.reduce((sum, c) => sum + c.peso_total_kg, 0) / 
                cosechas.reduce((sum, c) => sum + c.cantidad_animales, 0)).toFixed(2)}
            </p>
            <p className="text-xs text-gray-500 mt-1">kg/animal</p>
          </div>

          <div className="bg-white rounded-lg shadow p-4">
            <p className="text-sm text-gray-600">Ganancia de Peso</p>
            <p className="text-2xl font-bold text-orange-600 mt-1">
              {((cosechas.reduce((sum, c) => sum + c.peso_total_kg, 0) / 
                cosechas.reduce((sum, c) => sum + c.cantidad_animales, 0)) - 
                loteSeleccionado.peso_promedio_inicial).toFixed(2)}
            </p>
            <p className="text-xs text-gray-500 mt-1">kg promedio</p>
          </div>
        </div>
      )}

      {/* Tabla */}
      <div className="bg-white rounded-lg shadow">
        <CosechasTable cosechas={cosechas} loading={loading} />
      </div>

      {/* Información */}
      {cosechas.length > 0 && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start">
            <svg className="w-5 h-5 text-blue-600 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            <div className="text-sm text-blue-800">
              <p className="font-medium mb-1">Tipos de Cosecha:</p>
              <ul className="list-disc list-inside space-y-1">
                <li><strong>Cabezas:</strong> Mejores animales, mayor peso</li>
                <li><strong>Media:</strong> Animales promedio</li>
                <li><strong>Colas:</strong> Animales más pequeños</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

