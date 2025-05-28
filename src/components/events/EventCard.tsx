
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, ExternalLink } from 'lucide-react';

interface EventCardProps {
  evento: {
    titulo: string;
    resumo: string;
    link: string;
    data_inicio?: string;
    data_fim?: string;
  };
}

const EventCard: React.FC<EventCardProps> = ({ evento }) => {
  const formatDate = (dateString?: string) => {
    if (!dateString) return null;
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  return (
    <Card className="flutter-card hover:shadow-lg transition-shadow">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-start gap-2 text-lg">
          <Calendar className="h-6 w-6 shrink-0 text-viver-yellow mt-1"/> 
          <span className="leading-tight">{evento.titulo}</span>
        </CardTitle>
        {(evento.data_inicio || evento.data_fim) && (
          <div className="text-sm text-muted-foreground">
            {evento.data_inicio && formatDate(evento.data_inicio)}
            {evento.data_inicio && evento.data_fim && ' - '}
            {evento.data_fim && evento.data_fim !== evento.data_inicio && formatDate(evento.data_fim)}
          </div>
        )}
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-sm text-gray-700">{evento.resumo}</p>
        <a
          href={evento.link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-sm font-semibold text-viver-yellow hover:text-viver-yellow/80 transition-colors"
        >
          <ExternalLink className="h-4 w-4" />
          Saiba mais
        </a>
      </CardContent>
    </Card>
  );
};

export default EventCard;
