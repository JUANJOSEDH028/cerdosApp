// Componente para seleccionar un lote para ver sus reportes
import { useState, useEffect } from 'react';
import type { Lote } from '../../types';
import loteService from '../../services/lote.service';

interface LoteSelectorProps {
  onSelect: (loteId: string) => void;
  selectedLoteId?: string;
}

export default function LoteSelector({ onSelect, selectedLoteId }: LoteSelectorProps) {
  const [lotes, setLotes] = useState<Lote[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadLotes();
  }, []);

  const loadLotes = async () => {
    try {
      setLoading(true);
      const data = await loteService.getAll();
      setLotes(data);
      
      // Si hay lotes y no hay uno seleccionado, seleccionar el primero
      if (data.length > 0 && !selectedLoteId) {
        onSelect(data[0].id);
      }
    } catch (error) {
      console.error('Error al cargar lotes:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="h-10 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  if (lotes.length === 0) {
    return (
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
        <p className="text-yellow-800">
          No hay lotes disponibles. Crea un lote primero para ver reportes.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <label htmlFor="lote-select" className="block text-sm font-medium text-gray-700 mb-2">
        Seleccionar Lote
      </label>
      <select
        id="lote-select"
        value={selectedLoteId || ''}
        onChange={(e) => onSelect(e.target.value)}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
      >
        <option value="">Seleccione un lote</option>
        {lotes.map((lote) => (
          <option key={lote.id} value={lote.id}>
            {lote.numero_lote} - {lote.fecha_inicio}
            {lote.estado === 'cerrado' ? ' (CERRADO)' : ' (ACTIVO)'}
            {' - '}{lote.animales_iniciales} animales
          </option>
        ))}
      </select>
    </div>
  );
}

