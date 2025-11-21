// Componente para mostrar el resumen de costos de un lote
import type { CostosLote } from '../../types';

interface CostosLoteCardProps {
  costos: CostosLote;
}

export default function CostosLoteCard({ costos }: CostosLoteCardProps) {
  const porcentajes = {
    lechones: (costos.detalle_costos.lechones / costos.costo_total) * 100,
    alimento: (costos.detalle_costos.alimento / costos.costo_total) * 100,
    directos: (costos.detalle_costos.gastos_directos / costos.costo_total) * 100,
    prorrateados: (costos.detalle_costos.gastos_prorrateados / costos.costo_total) * 100,
  };

  return (
    <div className="space-y-6">
      {/* Costo Total */}
      <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-lg shadow-lg p-6 text-white">
        <h3 className="text-lg font-medium mb-2">Costo Total del Lote</h3>
        <p className="text-4xl font-bold">${costos.costo_total.toLocaleString()}</p>
        <p className="text-sm opacity-90 mt-2">
          {costos.numero_lote} • {costos.fecha_inicio} 
          {costos.fecha_cierre && ` - ${costos.fecha_cierre}`}
        </p>
      </div>

      {/* Desglose de Costos */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Desglose de Costos</h3>
        
        <div className="space-y-4">
          {/* Lechones */}
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">Lechones</span>
              <span className="text-sm font-semibold text-gray-900">
                ${costos.detalle_costos.lechones.toLocaleString()} ({porcentajes.lechones.toFixed(1)}%)
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all"
                style={{ width: `${porcentajes.lechones}%` }}
              />
            </div>
          </div>

          {/* Alimento */}
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">Alimento</span>
              <span className="text-sm font-semibold text-gray-900">
                ${costos.detalle_costos.alimento.toLocaleString()} ({porcentajes.alimento.toFixed(1)}%)
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-green-600 h-2 rounded-full transition-all"
                style={{ width: `${porcentajes.alimento}%` }}
              />
            </div>
          </div>

          {/* Gastos Directos */}
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">Gastos Directos</span>
              <span className="text-sm font-semibold text-gray-900">
                ${costos.detalle_costos.gastos_directos.toLocaleString()} ({porcentajes.directos.toFixed(1)}%)
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-orange-600 h-2 rounded-full transition-all"
                style={{ width: `${porcentajes.directos}%` }}
              />
            </div>
          </div>

          {/* Gastos Prorrateados */}
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">Gastos Prorrateados</span>
              <span className="text-sm font-semibold text-gray-900">
                ${costos.detalle_costos.gastos_prorrateados.toLocaleString()} ({porcentajes.prorrateados.toFixed(1)}%)
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-purple-600 h-2 rounded-full transition-all"
                style={{ width: `${porcentajes.prorrateados}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Detalle de Alimento */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Detalle de Alimento</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <p className="text-sm text-gray-600 mb-1">Total Consumido</p>
            <p className="text-2xl font-bold text-green-600">
              {costos.detalle_alimento.kg_total.toLocaleString()} kg
            </p>
          </div>
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-gray-600 mb-1">Costo Total</p>
            <p className="text-2xl font-bold text-blue-600">
              ${costos.detalle_alimento.costo_total.toLocaleString()}
            </p>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <p className="text-sm text-gray-600 mb-1">Costo por Kg</p>
            <p className="text-2xl font-bold text-purple-600">
              ${(costos.detalle_alimento.costo_total / costos.detalle_alimento.kg_total).toFixed(0)}
            </p>
          </div>
        </div>

        <div className="space-y-3">
          {costos.detalle_alimento.detalle.preiniciador && (
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
              <span className="font-medium text-gray-900">Preiniciador</span>
              <div className="text-right">
                <p className="text-sm font-semibold text-gray-900">
                  {costos.detalle_alimento.detalle.preiniciador.kg} kg
                </p>
                <p className="text-xs text-gray-500">
                  ${costos.detalle_alimento.detalle.preiniciador.costo.toLocaleString()}
                </p>
              </div>
            </div>
          )}
          {costos.detalle_alimento.detalle.levante && (
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
              <span className="font-medium text-gray-900">Levante</span>
              <div className="text-right">
                <p className="text-sm font-semibold text-gray-900">
                  {costos.detalle_alimento.detalle.levante.kg} kg
                </p>
                <p className="text-xs text-gray-500">
                  ${costos.detalle_alimento.detalle.levante.costo.toLocaleString()}
                </p>
              </div>
            </div>
          )}
          {costos.detalle_alimento.detalle.engorde && (
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
              <span className="font-medium text-gray-900">Engorde</span>
              <div className="text-right">
                <p className="text-sm font-semibold text-gray-900">
                  {costos.detalle_alimento.detalle.engorde.kg} kg
                </p>
                <p className="text-xs text-gray-500">
                  ${costos.detalle_alimento.detalle.engorde.costo.toLocaleString()}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Detalle de Gastos Directos */}
      {costos.detalle_gastos_directos.total > 0 && (
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Gastos Directos</h3>
          <div className="space-y-2">
            {Object.entries(costos.detalle_gastos_directos.detalle).map(([tipo, monto]) => (
              <div key={tipo} className="flex justify-between items-center p-3 bg-orange-50 rounded">
                <span className="font-medium text-gray-900 capitalize">{tipo}</span>
                <span className="text-sm font-semibold text-gray-900">
                  ${monto.toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

