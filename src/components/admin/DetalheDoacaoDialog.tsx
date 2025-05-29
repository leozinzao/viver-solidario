
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { 
  Clock, 
  CheckCircle, 
  XCircle, 
  Heart,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Package,
  User,
  MessageSquare
} from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface DetalheDoacaoDialogProps {
  doacao: any;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onStatusUpdate: (id: string, status: string, observacoes?: string) => void;
  isUpdating: boolean;
}

const DetalheDoacaoDialog: React.FC<DetalheDoacaoDialogProps> = ({
  doacao,
  isOpen,
  onOpenChange,
  onStatusUpdate,
  isUpdating
}) => {
  const [observacoes, setObservacoes] = useState('');
  const [showObservacoes, setShowObservacoes] = useState(false);

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'cadastrada':
        return { label: 'Cadastrada', color: 'bg-blue-100 text-blue-800', icon: Clock };
      case 'aceita':
        return { label: 'Aceita', color: 'bg-yellow-100 text-yellow-800', icon: Heart };
      case 'recebida':
        return { label: 'Recebida', color: 'bg-green-100 text-green-800', icon: CheckCircle };
      case 'cancelada':
        return { label: 'Cancelada', color: 'bg-red-100 text-red-800', icon: XCircle };
      default:
        return { label: status, color: 'bg-gray-100 text-gray-800', icon: Package };
    }
  };

  const statusConfig = getStatusConfig(doacao.status);
  const StatusIcon = statusConfig.icon;

  const handleStatusUpdate = (newStatus: string) => {
    onStatusUpdate(doacao.id, newStatus, observacoes);
    setObservacoes('');
    setShowObservacoes(false);
  };

  const handleContactDoador = (type: 'phone' | 'email') => {
    if (type === 'phone' && doacao.telefone_doador) {
      window.open(`https://wa.me/55${doacao.telefone_doador.replace(/\D/g, '')}`, '_blank');
    } else if (type === 'email' && doacao.email_doador) {
      window.open(`mailto:${doacao.email_doador}`, '_blank');
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Package className="h-5 w-5 text-viver-yellow" />
            Detalhes da Doação
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Status e Título */}
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-xl font-semibold mb-2">{doacao.titulo}</h3>
              <p className="text-gray-600">
                {doacao.quantidade} {doacao.unidade}
              </p>
            </div>
            <Badge className={`${statusConfig.color} flex items-center gap-1`}>
              <StatusIcon className="h-4 w-4" />
              {statusConfig.label}
            </Badge>
          </div>

          {/* Descrição */}
          {doacao.descricao && (
            <div>
              <h4 className="font-medium mb-2">Descrição</h4>
              <p className="text-gray-700 bg-gray-50 p-3 rounded">{doacao.descricao}</p>
            </div>
          )}

          {/* Informações do Doador */}
          <div>
            <h4 className="font-medium mb-3 flex items-center gap-2">
              <User className="h-4 w-4" />
              Informações do Doador
            </h4>
            <div className="bg-gray-50 p-4 rounded space-y-3">
              <div>
                <p className="font-medium">{doacao.doadores?.nome || 'Nome não informado'}</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {doacao.telefone_doador && (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-gray-400" />
                      <span className="text-sm">{doacao.telefone_doador}</span>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleContactDoador('phone')}
                    >
                      WhatsApp
                    </Button>
                  </div>
                )}
                
                {doacao.email_doador && (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-gray-400" />
                      <span className="text-sm">{doacao.email_doador}</span>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleContactDoador('email')}
                    >
                      Email
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Localização */}
          {doacao.localizacao && (
            <div>
              <h4 className="font-medium mb-2 flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                Localização
              </h4>
              <p className="text-gray-700 bg-gray-50 p-3 rounded">{doacao.localizacao}</p>
            </div>
          )}

          {/* Endereço de Coleta */}
          {doacao.endereco_coleta && (
            <div>
              <h4 className="font-medium mb-2">Endereço para Coleta</h4>
              <p className="text-gray-700 bg-gray-50 p-3 rounded">{doacao.endereco_coleta}</p>
            </div>
          )}

          {/* Datas */}
          <div>
            <h4 className="font-medium mb-2 flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Cronologia
            </h4>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2 text-gray-600">
                <Clock className="h-3 w-3" />
                <span>Cadastrada em {format(new Date(doacao.created_at), 'dd/MM/yyyy às HH:mm', { locale: ptBR })}</span>
              </div>
              
              {doacao.data_aceita && (
                <div className="flex items-center gap-2 text-yellow-600">
                  <Heart className="h-3 w-3" />
                  <span>Aceita em {format(new Date(doacao.data_aceita), 'dd/MM/yyyy às HH:mm', { locale: ptBR })}</span>
                </div>
              )}
              
              {doacao.data_entrega && (
                <div className="flex items-center gap-2 text-green-600">
                  <CheckCircle className="h-3 w-3" />
                  <span>Recebida em {format(new Date(doacao.data_entrega), 'dd/MM/yyyy às HH:mm', { locale: ptBR })}</span>
                </div>
              )}
            </div>
          </div>

          {/* Observações da ONG */}
          {doacao.observacoes_ong && (
            <div>
              <h4 className="font-medium mb-2 flex items-center gap-2">
                <MessageSquare className="h-4 w-4" />
                Observações da ONG
              </h4>
              <p className="text-gray-700 bg-blue-50 p-3 rounded border border-blue-200">
                {doacao.observacoes_ong}
              </p>
            </div>
          )}

          {/* Observações do Doador */}
          {doacao.observacoes && (
            <div>
              <h4 className="font-medium mb-2">Observações do Doador</h4>
              <p className="text-gray-700 bg-gray-50 p-3 rounded">{doacao.observacoes}</p>
            </div>
          )}

          {/* Ações */}
          <div className="border-t pt-4">
            <h4 className="font-medium mb-3">Ações</h4>
            
            <div className="space-y-3">
              {doacao.status === 'cadastrada' && (
                <div className="flex gap-3">
                  <Button
                    className="flex-1 bg-viver-yellow hover:bg-viver-yellow/90 text-black"
                    onClick={() => handleStatusUpdate('aceita')}
                    disabled={isUpdating}
                  >
                    <Heart className="h-4 w-4 mr-2" />
                    Aceitar Doação
                  </Button>
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => setShowObservacoes(!showObservacoes)}
                  >
                    {showObservacoes ? 'Cancelar' : 'Cancelar Doação'}
                  </Button>
                </div>
              )}

              {doacao.status === 'aceita' && (
                <Button
                  className="w-full bg-green-600 hover:bg-green-700 text-white"
                  onClick={() => handleStatusUpdate('recebida')}
                  disabled={isUpdating}
                >
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Marcar como Recebida
                </Button>
              )}

              {showObservacoes && (
                <div className="space-y-3">
                  <div>
                    <Label htmlFor="observacoes">Observações (opcional)</Label>
                    <Textarea
                      id="observacoes"
                      value={observacoes}
                      onChange={(e) => setObservacoes(e.target.value)}
                      placeholder="Digite observações sobre o cancelamento..."
                      rows={3}
                    />
                  </div>
                  <Button
                    variant="destructive"
                    className="w-full"
                    onClick={() => handleStatusUpdate('cancelada')}
                    disabled={isUpdating}
                  >
                    <XCircle className="h-4 w-4 mr-2" />
                    Confirmar Cancelamento
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DetalheDoacaoDialog;
