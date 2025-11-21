// Componente Sidebar - Navegación lateral
import { NavLink } from 'react-router-dom';
import { 
  HomeIcon, 
  CubeIcon, 
  ClipboardDocumentListIcon,
  TruckIcon,
  CurrencyDollarIcon,
  ChartBarIcon
} from '@heroicons/react/24/outline';

interface NavItem {
  name: string;
  path: string;
  icon: React.ComponentType<{ className?: string }>;
}

const navigation: NavItem[] = [
  { name: 'Dashboard', path: '/', icon: HomeIcon },
  { name: 'Lotes', path: '/lotes', icon: CubeIcon },
  { name: 'Registros', path: '/registros', icon: ClipboardDocumentListIcon },
  { name: 'Cosechas', path: '/cosechas', icon: TruckIcon },
  { name: 'Gastos', path: '/gastos', icon: CurrencyDollarIcon },
  { name: 'Reportes', path: '/reportes', icon: ChartBarIcon },
];

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  return (
    <>
      {/* Overlay para móvil */}
      {isOpen && (
        <div
          className="fixed inset-0 z-20 bg-black bg-opacity-50 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 z-30 h-full w-64 bg-gray-900 text-white
          transform transition-transform duration-300 ease-in-out
          lg:translate-x-0 lg:static lg:z-0
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        {/* Logo / Título */}
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-800">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
              <span className="text-xl font-bold">🐷</span>
            </div>
            <span className="text-lg font-semibold">Cerdos App</span>
          </div>
          {/* Botón cerrar en móvil */}
          <button
            onClick={onClose}
            className="lg:hidden text-gray-400 hover:text-white"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Navegación */}
        <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
          {navigation.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              onClick={() => onClose()}
              className={({ isActive }) =>
                `flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors
                ${
                  isActive
                    ? 'bg-green-600 text-white'
                    : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                }`
              }
            >
              <item.icon className="w-5 h-5 mr-3" />
              {item.name}
            </NavLink>
          ))}
        </nav>

        {/* Footer del sidebar */}
        <div className="p-4 border-t border-gray-800">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center">
              <span className="text-sm font-medium">U</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">Usuario</p>
              <p className="text-xs text-gray-400 truncate">usuario@granja.com</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}

