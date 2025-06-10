
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Calendar, Package, User } from 'lucide-react';
import { DoacaoFisica } from '@/hooks/useDoacoesFisicas';

interface DoacaoFisicaCardProps {
  doacao: DoacaoFisica;
  onReservar: (id: string) => void;
  isReserving: boolean;
}

const DoacaoFisicaCard: React.FC<DoacaoFisicaCardProps> = ({
  doacao,
  onReservar,
  isReserving
}) => {
  const formatDate = (dateString?: string) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'disponivel': return 'bg-blue-100 text-blue-800';
      case 'reservada': return 'bg-yellow-100 text-yellow-800';
      case 'entregue': return 'bg-green-100 text-green-800';
      case 'cancelada': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'disponivel': return 'Disponível';
      case 'reservada': return 'Reservada';
      case 'entregue': return 'Entregue';
      case 'cancelada': return 'Cancelada';
      default: return status;
    }
  };

  return (
    <Card className="flutter-card hover:shadow-lg transition-all duration-200 hover:scale-105">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3 flex-1">
            <div className="w-12 h-12 rounded-lg bg-viver-yellow/20 flex items-center justify-center shrink-0">
              <Package className="h-6 w-6 text-viver-yellow" />
            </div>
            <div className="flex-1">
              <CardTitle className="text-lg leading-tight mb-1">{doacao.titulo}</CardTitle>
              <div className="flex items-center gap-2 mb-2">
                <Badge className={getStatusColor(doacao.status)}>
                  {getStatusText(doacao.status)}
                </Badge>
                {doacao.categorias_doacoes && (
                  <Badge variant="outline" style={{ borderColor: doacao.categorias_doacoes.cor }}>
                    {doacao.categorias_doacoes.nome}
                  </Badge>
                )}
              </div>
            </div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {doacao.descricao && (
          <p className="text-sm text-gray-700 leading-relaxed">{doacao.descricao}</p>
        )}
        
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="flex items-center gap-2">
            <Package className="h-4 w-4 text-viver-yellow" />
            <span>{doacao.quantidade} {doacao.unidade}</span>
          </div>
          
          {doacao.localizacao && (
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-viver-yellow" />
              <span className="truncate">{doacao.localizacao}</span>
            </div>
          )}
          
          {doacao.data_disponivel && (
            <div className="flex items-center gap-2 col-span-2">
              <Calendar className="h-4 w-4 text-viver-yellow" />
              <span>Disponível desde {formatDate(doacao.data_disponivel)}</span>
            </div>
          )}
        </div>

        {doacao.observacoes && (
          <div className="text-xs text-gray-600 bg-gray-50 rounded-lg p-2">
            <strong>Observações:</strong> {doacao.observacoes}
          </div>
        )}
        
        {doacao.status === 'disponivel' && (
          <Button
            className="w-full bg-viver-yellow hover:bg-viver-yellow/90 text-black"
            onClick={() => onReservar(doacao.id)}
            disabled={isReserving}
          >
            <User className="h-4 w-4 mr-2" />
            {isReserving ? 'Reservando...' : 'Reservar Doação'}
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default DoacaoFisicaCard;
