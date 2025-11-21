// Página Dashboard - Vista principal con resumen
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

// Componente de tarjeta estadística
function StatCard({ 
  title, 
  value, 
  icon, 
  trend, 
  color = 'blue' 
}: { 
  title: string; 
  value: string | number; 
  icon: string; 
  trend?: string;
  color?: 'blue' | 'green' | 'yellow' | 'red';
}) {
  const colorClasses = {
    blue: 'bg-blue-500',
    green: 'bg-green-500',
    yellow: 'bg-yellow-500',
    red: 'bg-red-500',
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-2">{value}</p>
          {trend && (
            <p className="text-sm text-gray-500 mt-2">{trend}</p>
          )}
        </div>
        <div className={`${colorClasses[color]} rounded-full p-3`}>
          <span className="text-2xl">{icon}</span>
        </div>
      </div>
    </div>
  );
}

export default function Dashboard() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simular carga de datos
    setTimeout(() => setLoading(false), 500);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Encabezado */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-1">Resumen general de la operación</p>
      </div>

      {/* Tarjetas de estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Lotes Activos"
          value="3"
          icon="🐷"
          trend="+1 este mes"
          color="blue"
        />
        <StatCard
          title="Animales Totales"
          value="287"
          icon="📊"
          trend="En 3 lotes"
          color="green"
        />
        <StatCard
          title="Próxima Cosecha"
          value="15 días"
          icon="🚚"
          trend="Lote 001-2024"
          color="yellow"
        />
        <StatCard
          title="Mortalidad Prom."
          value="2.3%"
          icon="⚠️"
          trend="Mes actual"
          color="red"
        />
      </div>

      {/* Secciones principales */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Lotes Activos */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Lotes Activos</h2>
              <Link 
                to="/lotes" 
                className="text-sm text-green-600 hover:text-green-700 font-medium"
              >
                Ver todos →
              </Link>
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {[
                { id: '001-2024', animales: 100, dias: 45, progreso: 60 },
                { id: '002-2024', animales: 95, dias: 30, progreso: 40 },
                { id: '003-2024', animales: 92, dias: 15, progreso: 20 },
              ].map((lote) => (
                <div key={lote.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-gray-900">Lote {lote.id}</span>
                    <span className="text-sm text-gray-500">{lote.dias} días</span>
                  </div>
                  <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
                    <span>{lote.animales} animales</span>
                    <span>{lote.progreso}% completo</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-green-600 h-2 rounded-full transition-all"
                      style={{ width: `${lote.progreso}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Acciones Rápidas */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Acciones Rápidas</h2>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-2 gap-4">
              <Link
                to="/lotes/nuevo"
                className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-gray-300 rounded-lg hover:border-green-500 hover:bg-green-50 transition-colors group"
              >
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-3 group-hover:bg-green-200">
                  <span className="text-2xl">➕</span>
                </div>
                <span className="text-sm font-medium text-gray-700 group-hover:text-green-700">
                  Nuevo Lote
                </span>
              </Link>

              <Link
                to="/registros/consumo"
                className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors group"
              >
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-3 group-hover:bg-blue-200">
                  <span className="text-2xl">🌾</span>
                </div>
                <span className="text-sm font-medium text-gray-700 group-hover:text-blue-700">
                  Registrar Consumo
                </span>
              </Link>

              <Link
                to="/cosechas/nueva"
                className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-gray-300 rounded-lg hover:border-yellow-500 hover:bg-yellow-50 transition-colors group"
              >
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mb-3 group-hover:bg-yellow-200">
                  <span className="text-2xl">🚚</span>
                </div>
                <span className="text-sm font-medium text-gray-700 group-hover:text-yellow-700">
                  Nueva Cosecha
                </span>
              </Link>

              <Link
                to="/reportes"
                className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-gray-300 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition-colors group"
              >
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-3 group-hover:bg-purple-200">
                  <span className="text-2xl">📊</span>
                </div>
                <span className="text-sm font-medium text-gray-700 group-hover:text-purple-700">
                  Ver Reportes
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Alertas y notificaciones */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <svg className="w-5 h-5 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-yellow-800">Recordatorios</h3>
            <div className="mt-2 text-sm text-yellow-700">
              <ul className="list-disc pl-5 space-y-1">
                <li>Lote 001-2024: Próxima cosecha en 15 días</li>
                <li>Registrar consumo de alimento del día</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

