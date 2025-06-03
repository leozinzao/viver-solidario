
import React from 'react';
import { TrendingUp, Package, Clock, CheckCircle } from 'lucide-react';
import { useEstatisticasDoacoes } from '@/hooks/useEstatisticasDoacoes';

const EstatisticasDoacoes: React.FC = () => {
  const { estatisticas } = useEstatisticasDoacoes();

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
        <div className="flex items-center gap-2">
          <TrendingUp className="h-4 w-4 text-blue-600" />
          <div>
            <span className="text-sm font-medium text-blue-800 block">Total</span>
            <span className="text-lg font-bold text-blue-900">{estatisticas.total}</span>
          </div>
        </div>
      </div>
      
      <div className="bg-green-50 p-3 rounded-lg border border-green-200">
        <div className="flex items-center gap-2">
          <Package className="h-4 w-4 text-green-600" />
          <div>
            <span className="text-sm font-medium text-green-800 block">Disponível</span>
            <span className="text-lg font-bold text-green-900">{estatisticas.disponivel}</span>
          </div>
        </div>
      </div>
      
      <div className="bg-yellow-50 p-3 rounded-lg border border-yellow-200">
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4 text-yellow-600" />
          <div>
            <span className="text-sm font-medium text-yellow-800 block">Reservada</span>
            <span className="text-lg font-bold text-yellow-900">{estatisticas.reservada}</span>
          </div>
        </div>
      </div>
      
      <div className="bg-emerald-50 p-3 rounded-lg border border-emerald-200">
        <div className="flex items-center gap-2">
          <CheckCircle className="h-4 w-4 text-emerald-600" />
          <div>
            <span className="text-sm font-medium text-emerald-800 block">Entregue</span>
            <span className="text-lg font-bold text-emerald-900">{estatisticas.entregue}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EstatisticasDoacoes;
