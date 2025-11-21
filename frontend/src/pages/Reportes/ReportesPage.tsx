// Página principal de reportes
import { useState } from 'react';
import { ChartBarIcon, CurrencyDollarIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';

export default function ReportesPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Reportes</h1>
          <p className="text-gray-600 mt-2">
            Análisis de costos e indicadores de eficiencia
          </p>
        </div>
      </div>

      {/* Opciones de Reportes */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Reporte de Costos */}
        <Link
          to="/reportes/costos"
          className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow p-6 group"
        >
          <div className="flex items-center space-x-4 mb-4">
            <div className="bg-green-100 p-3 rounded-lg group-hover:bg-green-200 transition-colors">
              <CurrencyDollarIcon className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Reporte de Costos</h2>
          </div>
          <p className="text-gray-600 mb-4">
            Visualiza el desglose detallado de todos los costos del lote, incluyendo:
          </p>
          <ul className="space-y-2 text-sm text-gray-700">
            <li className="flex items-center">
              <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
              Costo de lechones
            </li>
            <li className="flex items-center">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
              Costo de alimento (desglosado por tipo)
            </li>
            <li className="flex items-center">
              <span className="w-2 h-2 bg-orange-500 rounded-full mr-2"></span>
              Gastos directos del lote
            </li>
            <li className="flex items-center">
              <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
              Gastos mensuales prorrateados
            </li>
          </ul>
          <div className="mt-6 text-green-600 font-medium group-hover:text-green-700">
            Ver Reporte →
          </div>
        </Link>

        {/* Reporte de Indicadores */}
        <Link
          to="/reportes/indicadores"
          className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow p-6 group"
        >
          <div className="flex items-center space-x-4 mb-4">
            <div className="bg-blue-100 p-3 rounded-lg group-hover:bg-blue-200 transition-colors">
              <ChartBarIcon className="w-8 h-8 text-blue-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Indicadores de Eficiencia</h2>
          </div>
          <p className="text-gray-600 mb-4">
            Analiza los indicadores de rendimiento del lote, como:
          </p>
          <ul className="space-y-2 text-sm text-gray-700">
            <li className="flex items-center">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
              Conversión alimenticia
            </li>
            <li className="flex items-center">
              <span className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></span>
              Porcentaje de mortalidad
            </li>
            <li className="flex items-center">
              <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
              Ganancia de peso promedio
            </li>
            <li className="flex items-center">
              <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
              Costo por animal y por kg producido
            </li>
          </ul>
          <div className="mt-6 text-blue-600 font-medium group-hover:text-blue-700">
            Ver Indicadores →
          </div>
        </Link>
      </div>

      {/* Información Adicional */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-2">💡 Información</h3>
        <p className="text-blue-800 text-sm">
          Los reportes se calculan automáticamente en base a todos los registros del lote:
          consumo de alimento, mortalidad, cosechas, y gastos. Para obtener reportes precisos,
          asegúrate de mantener actualizados todos los registros diarios.
        </p>
      </div>
    </div>
  );
}

