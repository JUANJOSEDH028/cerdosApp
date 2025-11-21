// Componente para mostrar indicadores de eficiencia
import type { IndicadoresLote } from '../../types';

interface IndicadoresCardProps {
  indicadores: IndicadoresLote;
}

export default function IndicadoresCard({ indicadores }: IndicadoresCardProps) {
  return (
    <div className="space-y-6">
      {/* KPIs Principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Conversión Alimenticia */}
        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-lg shadow p-6 text-white">
          <p className="text-sm opacity-90 mb-2">Conversión Alimenticia</p>
          <p className="text-3xl font-bold">{indicadores.alimento.conversion_alimenticia}</p>
          <p className="text-xs opacity-75 mt-2">kg alimento / kg ganado</p>
        </div>

        {/* Mortalidad */}
        <div className={`rounded-lg shadow p-6 text-white ${
          indicadores.animales.porcentaje_mortalidad > 5 
            ? 'bg-gradient-to-br from-red-500 to-red-600' 
            : 'bg-gradient-to-br from-yellow-500 to-yellow-600'
        }`}>
          <p className="text-sm opacity-90 mb-2">Mortalidad</p>
          <p className="text-3xl font-bold">{indicadores.animales.porcentaje_mortalidad}%</p>
          <p className="text-xs opacity-75 mt-2">
            {indicadores.animales.mortalidad} de {indicadores.animales.iniciales} animales
          </p>
        </div>

        {/* Costo por Animal */}
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg shadow p-6 text-white">
          <p className="text-sm opacity-90 mb-2">Costo por Animal</p>
          <p className="text-3xl font-bold">${indicadores.costos.costo_por_animal.toLocaleString()}</p>
          <p className="text-xs opacity-75 mt-2">vendidos: {indicadores.animales.vendidos}</p>
        </div>

        {/* Costo por Kg */}
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg shadow p-6 text-white">
          <p className="text-sm opacity-90 mb-2">Costo por Kg</p>
          <p className="text-3xl font-bold">${indicadores.costos.costo_por_kg_producido.toLocaleString()}</p>
          <p className="text-xs opacity-75 mt-2">producido: {indicadores.pesos.total_vendido_kg.toLocaleString()} kg</p>
        </div>
      </div>

      {/* Indicadores de Animales */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Indicadores de Animales</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <p className="text-sm text-gray-600 mb-2">Animales Iniciales</p>
            <p className="text-3xl font-bold text-gray-900">{indicadores.animales.iniciales}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-2">Vendidos</p>
            <p className="text-3xl font-bold text-green-600">{indicadores.animales.vendidos}</p>
            <p className="text-xs text-gray-500 mt-1">
              {((indicadores.animales.vendidos / indicadores.animales.iniciales) * 100).toFixed(1)}% del total
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-2">Mortalidad</p>
            <p className="text-3xl font-bold text-red-600">{indicadores.animales.mortalidad}</p>
            <p className="text-xs text-gray-500 mt-1">
              {indicadores.animales.porcentaje_mortalidad}% del total
            </p>
          </div>
        </div>
      </div>

      {/* Indicadores de Peso */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Indicadores de Peso</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm text-gray-600">Peso Inicial Promedio</span>
              <span className="text-xl font-bold text-gray-900">
                {indicadores.pesos.inicial_promedio_kg} kg
              </span>
            </div>
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm text-gray-600">Peso Final Promedio</span>
              <span className="text-xl font-bold text-gray-900">
                {indicadores.pesos.final_promedio_kg} kg
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-900">Ganancia Promedio</span>
              <span className="text-2xl font-bold text-green-600">
                {indicadores.pesos.ganancia_promedio_kg} kg
              </span>
            </div>
          </div>

          <div className="flex items-center justify-center">
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-2">Total Producido</p>
              <p className="text-4xl font-bold text-blue-600">
                {indicadores.pesos.total_vendido_kg.toLocaleString()}
              </p>
              <p className="text-sm text-gray-500 mt-2">kilogramos</p>
            </div>
          </div>
        </div>
      </div>

      {/* Indicadores de Alimento */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Indicadores de Alimento</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="text-center p-6 bg-green-50 rounded-lg">
            <p className="text-sm text-gray-600 mb-2">Total Consumido</p>
            <p className="text-4xl font-bold text-green-600">
              {indicadores.alimento.total_consumido_kg.toLocaleString()}
            </p>
            <p className="text-sm text-gray-500 mt-2">kilogramos</p>
          </div>

          <div className="text-center p-6 bg-blue-50 rounded-lg">
            <p className="text-sm text-gray-600 mb-2">Conversión Alimenticia</p>
            <p className="text-4xl font-bold text-blue-600">
              {indicadores.alimento.conversion_alimenticia}
            </p>
            <p className="text-sm text-gray-500 mt-2">
              kg alimento / kg ganancia
            </p>
            <p className="text-xs text-gray-400 mt-2">
              {indicadores.alimento.conversion_alimenticia < 2.5 ? '✅ Excelente' :
               indicadores.alimento.conversion_alimenticia < 3.0 ? '👍 Bueno' :
               indicadores.alimento.conversion_alimenticia < 3.5 ? '⚠️ Regular' : '❌ Mejorable'}
            </p>
          </div>
        </div>
      </div>

      {/* Indicadores de Costos */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Indicadores de Costos</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600 mb-2">Costo Total</p>
            <p className="text-2xl font-bold text-gray-900">
              ${indicadores.costos.costo_total.toLocaleString()}
            </p>
          </div>

          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-gray-600 mb-2">Costo por Animal</p>
            <p className="text-2xl font-bold text-blue-600">
              ${indicadores.costos.costo_por_animal.toLocaleString()}
            </p>
          </div>

          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <p className="text-sm text-gray-600 mb-2">Costo por Kg</p>
            <p className="text-2xl font-bold text-purple-600">
              ${indicadores.costos.costo_por_kg_producido.toLocaleString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

