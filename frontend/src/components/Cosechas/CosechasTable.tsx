// Componente de tabla de cosechas
import { Link } from 'react-router-dom';
import type { Cosecha } from '../../types';

interface CosechasTableProps {
  cosechas: Cosecha[];
  loading?: boolean;
}

export default function CosechasTable({ cosechas, loading }: CosechasTableProps) {
  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (cosechas.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">🚚</div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">No hay cosechas registradas</h3>
        <p className="text-gray-600 mb-4">Registra tu primera venta de animales</p>
        <Link
          to="/cosechas/nueva"
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <span className="mr-2">+</span> Registrar Cosecha
        </Link>
      </div>
    );
  }

  const tipoBadgeColor = (tipo: string) => {
    switch (tipo) {
      case 'cabezas':
        return 'bg-green-100 text-green-800';
      case 'media':
        return 'bg-blue-100 text-blue-800';
      case 'colas':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const tipoLabel = (tipo: string) => {
    switch (tipo) {
      case 'cabezas':
        return 'Cabezas';
      case 'media':
        return 'Media';
      case 'colas':
        return 'Colas';
      default:
        return tipo;
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Fecha
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Lote
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Tipo
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Animales
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Peso Total (kg)
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Peso Promedio
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Última
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {cosechas.map((cosecha) => {
            const pesoPromedio = (cosecha.peso_total_kg / cosecha.cantidad_animales).toFixed(2);
            
            return (
              <tr key={cosecha.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {new Date(cosecha.fecha).toLocaleDateString('es-ES')}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {/* Aquí podrías mostrar el número de lote si lo incluyes en la respuesta */}
                  <span className="text-gray-500">Ver lote</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${tipoBadgeColor(cosecha.tipo)}`}>
                    {tipoLabel(cosecha.tipo)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {cosecha.cantidad_animales}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {cosecha.peso_total_kg.toLocaleString()} kg
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {pesoPromedio} kg/animal
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {cosecha.es_ultima_cosecha ? (
                    <span className="text-yellow-600 font-medium">✓ Sí</span>
                  ) : (
                    <span className="text-gray-400">No</span>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* Resumen */}
      <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
        <div className="grid grid-cols-3 gap-4 text-sm">
          <div>
            <span className="text-gray-600">Total Animales:</span>
            <span className="ml-2 font-semibold text-gray-900">
              {cosechas.reduce((sum, c) => sum + c.cantidad_animales, 0)}
            </span>
          </div>
          <div>
            <span className="text-gray-600">Peso Total:</span>
            <span className="ml-2 font-semibold text-gray-900">
              {cosechas.reduce((sum, c) => sum + c.peso_total_kg, 0).toLocaleString()} kg
            </span>
          </div>
          <div>
            <span className="text-gray-600">Peso Promedio General:</span>
            <span className="ml-2 font-semibold text-gray-900">
              {(cosechas.reduce((sum, c) => sum + c.peso_total_kg, 0) / 
                cosechas.reduce((sum, c) => sum + c.cantidad_animales, 0)).toFixed(2)} kg
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

