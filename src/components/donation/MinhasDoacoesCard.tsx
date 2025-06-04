
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { DoacaoFisica } from '@/types/doacoesFisicas';
import { 
  Clock, 
  CheckCircle, 
  XCircle, 
  Calendar,
  MapPin,
  Package,
  Heart
} from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface MinhasDoacoesCardProps {
  doacao: DoacaoFisica;
}

const MinhasDoacoesCard: React.FC<MinhasDoacoesCardProps> = ({ doacao }) => {
  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'disponivel':
        return {
          label: 'Disponível',
          color: 'bg-green-100 text-green-800 border-green-200',
          icon: Heart,
          description: 'Disponível para reserva'
        };
      case 'reservada':
        return {
          label: 'Reservada',
          color: 'bg-yellow-100 text-yellow-800 border-yellow-200',
          icon: Heart,
          description: 'Reservada - aguardando retirada'
        };
      case 'entregue':
        return {
          label: 'Entregue',
          color: 'bg-green-100 text-green-800 border-green-200',
          icon: CheckCircle,
          description: 'Doação entregue com sucesso'
        };
      case 'cancelada':
        return {
          label: 'Cancelada',
          color: 'bg-red-100 text-red-800 border-red-200',
          icon: XCircle,
          description: 'Doação cancelada'
        };
      default:
        return {
          label: status,
          color: 'bg-gray-100 text-gray-800 border-gray-200',
          icon: Package,
          description: ''
        };
    }
  };

  const statusConfig = getStatusConfig(doacao.status);
  const StatusIcon = statusConfig.icon;

  return (
    <Card className="flutter-card hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-3">
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900 mb-1">{doacao.titulo}</h3>
            <p className="text-sm text-gray-600 mb-2">
              {doacao.quantidade} {doacao.unidade}
            </p>
            {doacao.descricao && (
              <p className="text-sm text-gray-700 mb-2">{doacao.descricao}</p>
            )}
          </div>
          
          <Badge className={`${statusConfig.color} border flex items-center gap-1`}>
            <StatusIcon className="h-3 w-3" />
            {statusConfig.label}
          </Badge>
        </div>

        <div className="space-y-2 text-sm text-gray-600">
          {doacao.localizacao && (
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-gray-400" />
              <span>{doacao.localizacao}</span>
            </div>
          )}
          
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-gray-400" />
            <span>
              Cadastrada em {format(new Date(doacao.created_at), 'dd/MM/yyyy', { locale: ptBR })}
            </span>
          </div>

          {doacao.data_reserva && (
            <div className="flex items-center gap-2">
              <Heart className="h-4 w-4 text-viver-yellow" />
              <span>
                Reservada em {format(new Date(doacao.data_reserva), 'dd/MM/yyyy', { locale: ptBR })}
              </span>
            </div>
          )}

          {doacao.data_entrega && (
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span>
                Entregue em {format(new Date(doacao.data_entrega), 'dd/MM/yyyy', { locale: ptBR })}
              </span>
            </div>
          )}
        </div>

        <div className="mt-3 p-2 bg-gray-50 rounded text-xs text-gray-600">
          {statusConfig.description}
        </div>

        {doacao.observacoes && (
          <div className="mt-3 p-2 bg-blue-50 rounded border border-blue-200">
            <p className="text-sm text-blue-800 font-medium mb-1">Observações:</p>
            <p className="text-sm text-blue-700">{doacao.observacoes}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MinhasDoacoesCard;
