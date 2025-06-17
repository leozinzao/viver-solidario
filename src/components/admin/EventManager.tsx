
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useEventos } from '@/hooks/useEventos';
import { CalendarDays, Plus, Edit, Trash2, ExternalLink, RefreshCw } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Alert, AlertDescription } from '@/components/ui/alert';
import EventForm from './EventForm';
import { toast } from '@/hooks/use-toast';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

const EventManager: React.FC = () => {
  const { eventosQuery, excluirEvento, carregandoExcluir } = useEventos();
  const { data: eventosData, isLoading, error, refetch } = eventosQuery;
  
  const [showEventForm, setShowEventForm] = useState(false);
  const [deletingEvent, setDeletingEvent] = useState<any>(null);

  const eventos = eventosData?.eventos || [];

  console.log('EventManager - Estado atual:', {
    eventosData,
    isLoading,
    error: error?.message,
    eventos: eventos.length
  });

  const formatDate = (dateString: string | null) => {
    if (!dateString) return null;
    try {
      return format(new Date(dateString), 'dd/MM/yyyy', { locale: ptBR });
    } catch (e) {
      console.error('Erro ao formatar data:', e);
      return 'Data inválida';
    }
  };

  const handleDeleteEvent = async () => {
    if (deletingEvent) {
      try {
        await excluirEvento(deletingEvent.id);
        setDeletingEvent(null);
      } catch (error) {
        console.error('Erro ao excluir evento:', error);
      }
    }
  };

  const isEventFuture = (dateString: string | null) => {
    if (!dateString) return false;
    return new Date(dateString) > new Date();
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-2 text-viver-yellow" />
          <p className="text-muted-foreground">Carregando eventos...</p>
        </div>
      </div>
    );
  }

  if (error) {
    console.error('Erro detalhado ao carregar eventos:', error);
    
    return (
      <div className="space-y-4">
        <Alert variant="destructive">
          <AlertDescription>
            <strong>Erro ao carregar eventos:</strong>
            <br />
            {error instanceof Error ? error.message : 'Erro desconhecido'}
            <br />
            <small className="text-muted-foreground mt-2 block">
              Verifique o console do navegador para mais detalhes.
            </small>
          </AlertDescription>
        </Alert>
        
        <div className="text-center">
          <Button onClick={() => refetch()} variant="outline">
            <RefreshCw className="h-4 w-4 mr-2" />
            Tentar novamente
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">Gestão de Eventos</h2>
          <p className="text-gray-600">Organize e gerencie todos os eventos da ONG Viver</p>
          {eventos.length > 0 && (
            <p className="text-sm text-muted-foreground mt-1">
              Total de eventos: {eventosData?.total || eventos.length}
            </p>
          )}
        </div>
        <Button 
          onClick={() => setShowEventForm(true)}
          className="bg-viver-yellow hover:bg-viver-yellow/90 text-black font-medium"
        >
          <Plus className="h-4 w-4 mr-2" />
          Criar Novo Evento
        </Button>
      </div>

      {eventos && eventos.length === 0 ? (
        <div className="text-center p-12 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50">
          <CalendarDays className="h-16 w-16 mx-auto mb-4 text-gray-400" />
          <h3 className="text-xl font-medium text-gray-700 mb-2">
            Nenhum evento cadastrado
          </h3>
          <p className="text-gray-500 max-w-md mx-auto mb-4">
            Comece criando o primeiro evento da organização.
          </p>
          <Button 
            onClick={() => setShowEventForm(true)}
            className="bg-viver-yellow hover:bg-viver-yellow/90 text-black"
          >
            <Plus className="h-4 w-4 mr-2" />
            Criar Primeiro Evento
          </Button>
        </div>
      ) : (
        <div className="grid gap-4">
          {eventos?.map((evento) => (
            <Card key={evento.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg mb-2">{evento.titulo}</CardTitle>
                    <div className="flex items-center gap-4">
                      {evento.data_inicio && (
                        <Badge 
                          variant={isEventFuture(evento.data_inicio) ? "default" : "secondary"}
                          className={isEventFuture(evento.data_inicio) ? "bg-green-100 text-green-800" : ""}
                        >
                          {isEventFuture(evento.data_inicio) ? "Próximo" : "Realizado"}
                        </Badge>
                      )}
                      {evento.data_inicio && (
                        <span className="text-sm text-muted-foreground">
                          {formatDate(evento.data_inicio)}
                          {evento.data_fim && evento.data_fim !== evento.data_inicio && 
                            ` até ${formatDate(evento.data_fim)}`
                          }
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {evento.link && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => window.open(evento.link!, '_blank')}
                      >
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    )}
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-red-600 hover:text-red-700"
                      onClick={() => setDeletingEvent(evento)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              
              {evento.resumo && (
                <CardContent className="pt-0">
                  <p className="text-sm text-gray-700 leading-relaxed">{evento.resumo}</p>
                </CardContent>
              )}
            </Card>
          ))}
        </div>
      )}

      {/* Form Dialog */}
      <EventForm 
        open={showEventForm} 
        onOpenChange={setShowEventForm} 
      />

      {/* Delete Confirmation Dialog */}
      <Dialog open={!!deletingEvent} onOpenChange={(open) => !open && setDeletingEvent(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmar exclusão</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted-foreground">
            Tem certeza que deseja excluir o evento "{deletingEvent?.titulo}"?
            Esta ação não pode ser desfeita.
          </p>
          <DialogFooter className="gap-2 sm:justify-end">
            <Button variant="outline" onClick={() => setDeletingEvent(null)}>
              Cancelar
            </Button>
            <Button 
              variant="destructive" 
              onClick={handleDeleteEvent}
              disabled={carregandoExcluir}
            >
              {carregandoExcluir ? 'Excluindo...' : 'Excluir'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EventManager;
