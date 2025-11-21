// Página de detalle de lote
import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import loteService from '../../services/lote.service';
import type { LoteDetalle } from '../../types';

export default function LoteDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [lote, setLote] = useState<LoteDetalle | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [cerrando, setCerrando] = useState(false);

  useEffect(() => {
    if (id) {
      loadLote();
    }
  }, [id]);

  const loadLote = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await loteService.getById(id!);
      setLote(data);
    } catch (err) {
      setError('Error al cargar el lote');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCerrarLote = async () => {
    if (!confirm('¿Estás seguro de cerrar este lote? Esta acción no se puede deshacer.')) {
      return;
    }

    try {
      setCerrando(true);
      await loteService.cerrar(id!);
      alert('Lote cerrado exitosamente');
      loadLote(); // Recargar datos
    } catch (err) {
      alert('Error al cerrar el lote');
      console.error(err);
    } finally {
      setCerrando(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    );
  }

  if (error || !lote) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
        <p className="text-red-800 mb-4">{error || 'Lote no encontrado'}</p>
        <button
          onClick={() => navigate('/lotes')}
          className="text-red-600 hover:text-red-800 font-medium"
        >
          Volver a Lotes
        </button>
      </div>
    );
  }

  const diasActivo = lote.fecha_cierre
    ? Math.floor((new Date(lote.fecha_cierre).getTime() - new Date(lote.fecha_inicio).getTime()) / (1000 * 60 * 60 * 24))
    : Math.floor((new Date().getTime() - new Date(lote.fecha_inicio).getTime()) / (1000 * 60 * 60 * 24));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center space-x-2 text-sm text-gray-600 mb-2">
            <button onClick={() => navigate('/lotes')} className="hover:text-gray-900">
              Lotes
            </button>
            <span>/</span>
            <span className="text-gray-900">{lote.numero_lote}</span>
          </div>
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold text-gray-900">{lote.numero_lote}</h1>
            <span
              className={`px-3 py-1 text-sm font-semibold rounded-full ${
                lote.estado === 'activo'
                  ? 'bg-green-100 text-green-800'
                  : 'bg-gray-100 text-gray-800'
              }`}
            >
              {lote.estado === 'activo' ? 'Activo' : 'Cerrado'}
            </span>
          </div>
        </div>
        
        <div className="flex space-x-3">
          {lote.estado === 'activo' && (
            <>
              <Link
                to={`/lotes/${id}/editar`}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Editar
              </Link>
              <button
                onClick={handleCerrarLote}
                disabled={cerrando}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50"
              >
                {cerrando ? 'Cerrando...' : 'Cerrar Lote'}
              </button>
            </>
          )}
        </div>
      </div>

      {/* Estadísticas principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-sm text-gray-600">Animales Actuales</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">{lote.animales_actuales}</p>
          <p className="text-sm text-gray-500 mt-1">de {lote.animales_iniciales} iniciales</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-sm text-gray-600">Mortalidad</p>
          <p className="text-3xl font-bold text-red-600 mt-2">{lote.total_mortalidad}</p>
          <p className="text-sm text-gray-500 mt-1">
            {((lote.total_mortalidad / lote.animales_iniciales) * 100).toFixed(1)}% del total
          </p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-sm text-gray-600">Vendidos</p>
          <p className="text-3xl font-bold text-green-600 mt-2">{lote.total_vendidos}</p>
          <p className="text-sm text-gray-500 mt-1">
            {((lote.total_vendidos / lote.animales_iniciales) * 100).toFixed(1)}% del total
          </p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-sm text-gray-600">Días Activo</p>
          <p className="text-3xl font-bold text-blue-600 mt-2">{diasActivo}</p>
          <p className="text-sm text-gray-500 mt-1">desde el inicio</p>
        </div>
      </div>

      {/* Información detallada */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Información General */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Información General</h2>
          <dl className="space-y-3">
            <div className="flex justify-between">
              <dt className="text-sm text-gray-600">Fecha de Inicio:</dt>
              <dd className="text-sm font-medium text-gray-900">
                {new Date(lote.fecha_inicio).toLocaleDateString('es-ES')}
              </dd>
            </div>
            {lote.fecha_cierre && (
              <div className="flex justify-between">
                <dt className="text-sm text-gray-600">Fecha de Cierre:</dt>
                <dd className="text-sm font-medium text-gray-900">
                  {new Date(lote.fecha_cierre).toLocaleDateString('es-ES')}
                </dd>
              </div>
            )}
            <div className="flex justify-between">
              <dt className="text-sm text-gray-600">Peso Inicial Promedio:</dt>
              <dd className="text-sm font-medium text-gray-900">{lote.peso_promedio_inicial} kg</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-sm text-gray-600">Distribución:</dt>
              <dd className="text-sm font-medium text-gray-900">
                {lote.cantidad_machos}M / {lote.cantidad_hembras}H
              </dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-sm text-gray-600">Costo Lechones:</dt>
              <dd className="text-sm font-medium text-gray-900">
                ${lote.costo_lechones.toLocaleString()}
              </dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-sm text-gray-600">Área Total:</dt>
              <dd className="text-sm font-medium text-gray-900">{lote.area_total_m2} m²</dd>
            </div>
          </dl>
        </div>

        {/* Corrales Asignados */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Corrales Asignados</h2>
          {lote.corrales_asignados && lote.corrales_asignados.length > 0 ? (
            <div className="space-y-3">
              {lote.corrales_asignados.map((asignacion: any) => (
                <div key={asignacion.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">{asignacion.corral_nombre}</p>
                    <p className="text-sm text-gray-500">{asignacion.corral_area_m2} m²</p>
                  </div>
                  <span className="text-xs text-gray-500">
                    {new Date(asignacion.fecha_asignacion).toLocaleDateString('es-ES', { month: 'short', day: 'numeric' })}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600">No hay corrales asignados</p>
          )}
        </div>
      </div>

      {/* Observaciones */}
      {lote.observaciones && (
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Observaciones</h2>
          <p className="text-gray-700">{lote.observaciones}</p>
        </div>
      )}

      {/* Acciones rápidas */}
      {lote.estado === 'activo' && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Acciones Rápidas</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link
              to={`/registros/consumo?lote=${id}`}
              className="flex flex-col items-center p-4 bg-white rounded-lg hover:shadow-md transition-shadow"
            >
              <span className="text-3xl mb-2">🌾</span>
              <span className="text-sm font-medium text-gray-900">Registrar Consumo</span>
            </Link>
            <Link
              to={`/registros/mortalidad?lote=${id}`}
              className="flex flex-col items-center p-4 bg-white rounded-lg hover:shadow-md transition-shadow"
            >
              <span className="text-3xl mb-2">⚠️</span>
              <span className="text-sm font-medium text-gray-900">Registrar Mortalidad</span>
            </Link>
            <Link
              to={`/cosechas/nueva?lote=${id}`}
              className="flex flex-col items-center p-4 bg-white rounded-lg hover:shadow-md transition-shadow"
            >
              <span className="text-3xl mb-2">🚚</span>
              <span className="text-sm font-medium text-gray-900">Nueva Cosecha</span>
            </Link>
            <Link
              to={`/reportes?lote=${id}`}
              className="flex flex-col items-center p-4 bg-white rounded-lg hover:shadow-md transition-shadow"
            >
              <span className="text-3xl mb-2">📊</span>
              <span className="text-sm font-medium text-gray-900">Ver Reportes</span>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

