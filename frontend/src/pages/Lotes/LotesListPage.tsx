// Página de listado de lotes
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import loteService from '../../services/lote.service';
import LotesTable from '../../components/Lotes/LotesTable';
import type { Lote, EstadoLote } from '../../types';

export default function LotesListPage() {
  const [lotes, setLotes] = useState<Lote[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filtroEstado, setFiltroEstado] = useState<EstadoLote | 'todos'>('todos');

  useEffect(() => {
    loadLotes();
  }, [filtroEstado]);

  const loadLotes = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const estado = filtroEstado === 'todos' ? undefined : filtroEstado;
      const data = await loteService.getAll(estado);
      setLotes(data);
    } catch (err) {
      setError('Error al cargar los lotes');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Gestión de Lotes</h1>
          <p className="text-gray-600 mt-1">Administra los lotes de producción</p>
        </div>
        <Link
          to="/lotes/nuevo"
          className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Nuevo Lote
        </Link>
      </div>

      {/* Filtros */}
      <div className="bg-white rounded-lg shadow p-4">
        <div className="flex items-center space-x-4">
          <span className="text-sm font-medium text-gray-700">Filtrar por estado:</span>
          <div className="flex space-x-2">
            {(['todos', 'activo', 'cerrado'] as const).map((estado) => (
              <button
                key={estado}
                onClick={() => setFiltroEstado(estado)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  filtroEstado === estado
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {estado === 'todos' ? 'Todos' : estado === 'activo' ? 'Activos' : 'Cerrados'}
              </button>
            ))}
          </div>
          
          {!loading && (
            <span className="ml-auto text-sm text-gray-600">
              {lotes.length} lote{lotes.length !== 1 ? 's' : ''}
            </span>
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
              onClick={loadLotes}
              className="ml-auto text-sm text-red-600 hover:text-red-800 font-medium"
            >
              Reintentar
            </button>
          </div>
        </div>
      )}

      {/* Tabla */}
      <div className="bg-white rounded-lg shadow">
        <LotesTable lotes={lotes} loading={loading} />
      </div>
    </div>
  );
}

