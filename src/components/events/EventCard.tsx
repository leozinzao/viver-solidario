
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, ExternalLink, Camera, Clock } from 'lucide-react';

interface EventCardProps {
  evento: {
    titulo: string;
    resumo: string;
    link: string;
    data_inicio?: string;
    data_fim?: string;
    fotos_videos_link?: string;
  };
}

const EventCard: React.FC<EventCardProps> = ({ evento }) => {
  const formatDate = (dateString?: string) => {
    if (!dateString) return null;
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  const isEventFuture = (dateString?: string) => {
    if (!dateString) return false;
    return new Date(dateString) > new Date();
  };

  const eventStatus = isEventFuture(evento.data_inicio) ? 'Próximo evento' : 'Evento realizado';
  const statusColor = isEventFuture(evento.data_inicio) ? 'text-green-600' : 'text-blue-600';

  return (
    <Card className="flutter-card hover:shadow-lg transition-all duration-200 hover:scale-105">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3 flex-1">
            <Calendar className="h-6 w-6 shrink-0 text-viver-yellow mt-1" />
            <div>
              <CardTitle className="text-lg leading-tight mb-1">{evento.titulo}</CardTitle>
              <div className="flex items-center gap-2 text-sm">
                <Clock className="h-4 w-4" />
                <span className={`font-medium ${statusColor}`}>{eventStatus}</span>
              </div>
            </div>
          </div>
        </div>
        
        {(evento.data_inicio || evento.data_fim) && (
          <div className="text-sm text-muted-foreground bg-gray-50 rounded-lg p-2 mt-2">
            <strong>Data:</strong> {evento.data_inicio && formatDate(evento.data_inicio)}
            {evento.data_inicio && evento.data_fim && evento.data_fim !== evento.data_inicio && 
              ` até ${formatDate(evento.data_fim)}`
            }
          </div>
        )}
      </CardHeader>
      
      <CardContent className="space-y-4">
        <p className="text-sm text-gray-700 leading-relaxed">{evento.resumo}</p>
        
        <div className="flex flex-col gap-2">
          <Button
            variant="default"
            size="sm"
            className="w-full bg-viver-yellow hover:bg-viver-yellow/90 text-black"
            onClick={() => window.open(evento.link, "_blank")}
          >
            <ExternalLink className="h-4 w-4 mr-2" />
            Mais Informações
          </Button>
          
          {evento.fotos_videos_link && (
            <Button
              variant="outline"
              size="sm"
              className="w-full border-viver-yellow text-viver-yellow hover:bg-viver-yellow/10"
              onClick={() => window.open(evento.fotos_videos_link, "_blank")}
            >
              <Camera className="h-4 w-4 mr-2" />
              Fotos e Vídeos
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default EventCard;
