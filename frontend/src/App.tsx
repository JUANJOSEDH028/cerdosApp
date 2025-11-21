// App.tsx - Configuración de rutas y aplicación principal
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './components/Layout/MainLayout';
import Dashboard from './pages/Dashboard';

// Páginas de Lotes
import LotesListPage from './pages/Lotes/LotesListPage';
import LoteCreatePage from './pages/Lotes/LoteCreatePage';
import LoteDetailPage from './pages/Lotes/LoteDetailPage';

// Páginas de Registros
import RegistrosPage from './pages/Registros/RegistrosPage';
import ConsumoPage from './pages/Registros/ConsumoPage';
import MortalidadPage from './pages/Registros/MortalidadPage';

// Páginas de Cosechas
import CosechasListPage from './pages/Cosechas/CosechasListPage';
import CosechaPage from './pages/Cosechas/CosechaPage';

// Páginas de Gastos
import GastosPage from './pages/Gastos/GastosPage';
import GastosMensualesPage from './pages/Gastos/GastosMensualesPage';
import GastosDirectosPage from './pages/Gastos/GastosDirectosPage';

// Páginas de Reportes
import ReportesPage from './pages/Reportes/ReportesPage';
import ReporteCostosPage from './pages/Reportes/ReporteCostosPage';
import ReporteIndicadoresPage from './pages/Reportes/ReporteIndicadoresPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Dashboard />} />
          
          {/* Rutas de Lotes */}
          <Route path="lotes">
            <Route index element={<LotesListPage />} />
            <Route path="nuevo" element={<LoteCreatePage />} />
            <Route path=":id" element={<LoteDetailPage />} />
          </Route>
          
          {/* Rutas de Registros */}
          <Route path="registros">
            <Route index element={<RegistrosPage />} />
            <Route path="consumo" element={<ConsumoPage />} />
            <Route path="mortalidad" element={<MortalidadPage />} />
          </Route>
          
          {/* Rutas de Cosechas */}
          <Route path="cosechas">
            <Route index element={<CosechasListPage />} />
            <Route path="nueva" element={<CosechaPage />} />
          </Route>
          
          {/* Rutas de Gastos */}
          <Route path="gastos">
            <Route index element={<GastosPage />} />
            <Route path="mensuales" element={<GastosMensualesPage />} />
            <Route path="directos" element={<GastosDirectosPage />} />
          </Route>
          
          {/* Rutas de Reportes */}
          <Route path="reportes">
            <Route index element={<ReportesPage />} />
            <Route path="costos" element={<ReporteCostosPage />} />
            <Route path="indicadores" element={<ReporteIndicadoresPage />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
