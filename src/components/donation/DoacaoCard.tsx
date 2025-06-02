
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { DoacaoFisica } from '@/services/doacoesFisicasService';
import { 
  Clock, 
  CheckCircle, 
  XCircle, 
  Calendar,
  MapPin,
  Package,
  Heart,
  User
} from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface DoacaoCardProps {
  doacao: DoacaoFisica;
}

const DoacaoCard: React.FC<DoacaoCardProps> = ({ doacao }) => {
  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'disponivel':
        return {
          label: 'Disponível',
          color: 'bg-green-100 text-green-800 border-green-200',
          icon: Package,
          description: 'Doação disponível para interessados'
        };
      case 'reservada':
        return {
          label: 'Reservada',
          color: 'bg-yellow-100 text-yellow-800 border-yellow-200',
          icon: Clock,
          description: 'Doação reservada - aguardando retirada/entrega'
        };
      case 'entregue':
        return {
          label: 'Entregue',
          color: 'bg-emerald-100 text-emerald-800 border-emerald-200',
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
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-semibold text-gray-900">{doacao.titulo}</h3>
              {doacao.categoria && (
                <Badge variant="outline" className="text-xs">
                  {doacao.categoria.nome}
                </Badge>
              )}
            </div>
            
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
              Criada em {format(new Date(doacao.created_at), 'dd/MM/yyyy', { locale: ptBR })}
            </span>
          </div>

          {doacao.doador && (
            <div className="flex items-center gap-2">
              <User className="h-4 w-4 text-gray-400" />
              <span>Doador: {doacao.doador.nome}</span>
            </div>
          )}

          {doacao.reservado_por && (
            <div className="flex items-center gap-2">
              <Heart className="h-4 w-4 text-viver-yellow" />
              <span>Reservado por: {doacao.reservado_por.nome}</span>
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

        {/* Informações sobre tipo de entrega */}
        <div className="mt-3 p-2 bg-gray-50 rounded text-xs">
          <p className="font-medium text-gray-700">
            Tipo de entrega: {doacao.tipo_entrega === 'retirada' ? 'Retirada no local' : 'Entrega pelo doador'}
          </p>
          {doacao.endereco_coleta && doacao.tipo_entrega === 'retirada' && (
            <p className="text-gray-600 mt-1">Local: {doacao.endereco_coleta}</p>
          )}
          {doacao.endereco_entrega && doacao.tipo_entrega === 'entrega_doador' && (
            <p className="text-gray-600 mt-1">Entrega em: {doacao.endereco_entrega}</p>
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

        {doacao.observacoes_entrega && (
          <div className="mt-3 p-2 bg-purple-50 rounded border border-purple-200">
            <p className="text-sm text-purple-800 font-medium mb-1">Observações sobre entrega:</p>
            <p className="text-sm text-purple-700">{doacao.observacoes_entrega}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default DoacaoCard;
