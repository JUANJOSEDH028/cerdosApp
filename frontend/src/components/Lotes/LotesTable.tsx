// Componente de tabla de lotes
import { Link } from 'react-router-dom';
import type { Lote } from '../../types';

interface LotesTableProps {
  lotes: Lote[];
  loading?: boolean;
}

export default function LotesTable({ lotes, loading }: LotesTableProps) {
  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    );
  }

  if (lotes.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">🐷</div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">No hay lotes</h3>
        <p className="text-gray-600 mb-4">Comienza creando tu primer lote</p>
        <Link
          to="/lotes/nuevo"
          className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
        >
          <span className="mr-2">+</span> Crear Lote
        </Link>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Número de Lote
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Fecha Inicio
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Animales
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Peso Inicial
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Estado
            </th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Acciones
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {lotes.map((lote) => (
            <tr key={lote.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap">
                <Link 
                  to={`/lotes/${lote.id}`}
                  className="text-sm font-medium text-green-600 hover:text-green-900"
                >
                  {lote.numero_lote}
                </Link>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {new Date(lote.fecha_inicio).toLocaleDateString('es-ES')}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {lote.animales_iniciales}
                <span className="text-gray-500 ml-1">
                  ({lote.cantidad_machos}M / {lote.cantidad_hembras}H)
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {lote.peso_promedio_inicial} kg
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span
                  className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    lote.estado === 'activo'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  {lote.estado === 'activo' ? 'Activo' : 'Cerrado'}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <Link
                  to={`/lotes/${lote.id}`}
                  className="text-green-600 hover:text-green-900 mr-4"
                >
                  Ver
                </Link>
                {lote.estado === 'activo' && (
                  <Link
                    to={`/lotes/${lote.id}/editar`}
                    className="text-blue-600 hover:text-blue-900"
                  >
                    Editar
                  </Link>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

