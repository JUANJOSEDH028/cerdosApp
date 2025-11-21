// Página principal de registros - Hub de navegación
import { Link } from 'react-router-dom';

export default function RegistrosPage() {
  const registros = [
    {
      tipo: 'consumo',
      titulo: 'Consumo de Alimento',
      descripcion: 'Registrar consumo diario de alimento por lote',
      icono: '🌾',
      color: 'green',
      link: '/registros/consumo',
    },
    {
      tipo: 'mortalidad',
      titulo: 'Mortalidad',
      descripcion: 'Registrar pérdidas de animales',
      icono: '⚠️',
      color: 'red',
      link: '/registros/mortalidad',
    },
    {
      tipo: 'cosecha',
      titulo: 'Cosechas',
      descripcion: 'Registrar ventas de animales',
      icono: '🚚',
      color: 'blue',
      link: '/cosechas',
    },
  ];

  const colorClasses = {
    green: 'bg-green-50 border-green-200 hover:border-green-400',
    red: 'bg-red-50 border-red-200 hover:border-red-400',
    blue: 'bg-blue-50 border-blue-200 hover:border-blue-400',
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Registros Diarios</h1>
        <p className="text-gray-600 mt-1">Consumo de alimento, mortalidad y cosechas</p>
      </div>

      {/* Grid de opciones */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {registros.map((registro) => (
          <Link
            key={registro.tipo}
            to={registro.link}
            className={`block p-6 border-2 rounded-lg transition-all ${
              colorClasses[registro.color as keyof typeof colorClasses]
            }`}
          >
            <div className="flex items-center mb-4">
              <div className="text-4xl mr-4">{registro.icono}</div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {registro.titulo}
                </h3>
              </div>
            </div>
            <p className="text-sm text-gray-600">{registro.descripcion}</p>
            <div className="mt-4 flex items-center text-sm font-medium text-gray-700">
              <span>Registrar ahora</span>
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </Link>
        ))}
      </div>

      {/* Información útil */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Información</h3>
        <div className="space-y-3 text-sm text-gray-700">
          <div className="flex items-start">
            <span className="text-green-600 mr-2">•</span>
            <p><strong>Consumo de Alimento:</strong> Registra el consumo diario o semanal de alimento por lote. Se calcula automáticamente el total en kg.</p>
          </div>
          <div className="flex items-start">
            <span className="text-red-600 mr-2">•</span>
            <p><strong>Mortalidad:</strong> Registra pérdidas de animales. Los animales se descuentan automáticamente del lote.</p>
          </div>
          <div className="flex items-start">
            <span className="text-blue-600 mr-2">•</span>
            <p><strong>Cosechas:</strong> Registra ventas de animales (cabezas, media, colas). Si es la última cosecha, el lote se cierra automáticamente.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

