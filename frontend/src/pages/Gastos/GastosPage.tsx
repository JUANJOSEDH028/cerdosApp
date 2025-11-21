// Página principal de gastos - Hub de navegación
import { Link } from 'react-router-dom';

export default function GastosPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Gestión de Gastos</h1>
        <p className="text-gray-600 mt-1">Gastos mensuales compartidos y gastos directos por lote</p>
      </div>

      {/* Grid de opciones */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Gastos Mensuales */}
        <Link
          to="/gastos/mensuales"
          className="block p-6 bg-purple-50 border-2 border-purple-200 rounded-lg hover:border-purple-400 transition-all"
        >
          <div className="flex items-center mb-4">
            <div className="text-4xl mr-4">📅</div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Gastos Mensuales</h3>
              <p className="text-sm text-gray-600">Compartidos entre lotes</p>
            </div>
          </div>
          <p className="text-sm text-gray-600 mb-4">
            Gastos que se prorratean automáticamente: arriendo, servicios, nómina, etc.
          </p>
          <div className="flex items-center text-sm font-medium text-purple-700">
            <span>Ver gastos mensuales</span>
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </Link>

        {/* Gastos Directos */}
        <Link
          to="/gastos/directos"
          className="block p-6 bg-orange-50 border-2 border-orange-200 rounded-lg hover:border-orange-400 transition-all"
        >
          <div className="flex items-center mb-4">
            <div className="text-4xl mr-4">🎯</div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Gastos Directos</h3>
              <p className="text-sm text-gray-600">Asignados a lotes específicos</p>
            </div>
          </div>
          <p className="text-sm text-gray-600 mb-4">
            Gastos específicos de un lote: flete, inmunocastración, tratamientos, etc.
          </p>
          <div className="flex items-center text-sm font-medium text-orange-700">
            <span>Ver gastos directos</span>
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </Link>
      </div>

      {/* Información sobre tipos de gastos */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Diferencia entre tipos de gastos</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Gastos Mensuales */}
          <div>
            <h4 className="font-medium text-purple-900 mb-2 flex items-center">
              <span className="mr-2">📅</span> Gastos Mensuales
            </h4>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start">
                <span className="text-purple-600 mr-2">•</span>
                <span><strong>Compartidos</strong> entre todos los lotes activos</span>
              </li>
              <li className="flex items-start">
                <span className="text-purple-600 mr-2">•</span>
                <span><strong>Prorrateo automático</strong> según área y tiempo</span>
              </li>
              <li className="flex items-start">
                <span className="text-purple-600 mr-2">•</span>
                <span><strong>Ejemplos:</strong> Arriendo, servicios (luz, agua), nómina, medicamentos generales</span>
              </li>
              <li className="flex items-start">
                <span className="text-purple-600 mr-2">•</span>
                <span><strong>Fórmula especial</strong> para arriendo (incluye factor tiempo)</span>
              </li>
            </ul>
          </div>

          {/* Gastos Directos */}
          <div>
            <h4 className="font-medium text-orange-900 mb-2 flex items-center">
              <span className="mr-2">🎯</span> Gastos Directos
            </h4>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start">
                <span className="text-orange-600 mr-2">•</span>
                <span><strong>Específicos</strong> de un lote en particular</span>
              </li>
              <li className="flex items-start">
                <span className="text-orange-600 mr-2">•</span>
                <span><strong>100% del costo</strong> se asigna a ese lote</span>
              </li>
              <li className="flex items-start">
                <span className="text-orange-600 mr-2">•</span>
                <span><strong>Ejemplos:</strong> Flete de ese lote, inmunocastración, tratamientos especiales</span>
              </li>
              <li className="flex items-start">
                <span className="text-orange-600 mr-2">•</span>
                <span><strong>No se prorratea</strong> - asignación directa</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Ejemplo visual */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <svg className="w-5 h-5 text-blue-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"/>
            <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd"/>
          </svg>
          Ejemplo Práctico
        </h3>
        <div className="text-sm text-gray-700 space-y-2">
          <p>
            <strong>Arriendo $3,000,000/mes</strong> (Gasto Mensual) → Se divide entre 3 lotes activos según su área y tiempo
          </p>
          <p className="pl-4">
            • Lote A (100m², 30 días): $1,200,000<br/>
            • Lote B (80m², 25 días): $800,000<br/>
            • Lote C (60m², 30 días): $1,000,000
          </p>
          <p className="mt-4">
            <strong>Flete $500,000</strong> (Gasto Directo del Lote A) → Todo el monto va solo al Lote A
          </p>
        </div>
      </div>
    </div>
  );
}

