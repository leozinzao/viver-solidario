
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar } from 'lucide-react';

const EventsScreen: React.FC = () => {
  const events = [
    {
      id: 1,
      title: 'Distribuição de Alimentos',
      location: 'Praça Central',
      date: '15 de Junho, 9h-12h',
      description: 'Entrega de cestas básicas para famílias cadastradas'
    },
    {
      id: 2,
      title: 'Mutirão de Limpeza',
      location: 'Parque Municipal',
      date: '20 de Junho, 8h-12h',
      description: 'Ação voluntária para limpeza e preservação ambiental'
    },
    {
      id: 3,
      title: 'Workshop de Reciclagem',
      location: 'Centro Comunitário',
      date: '25 de Junho, 14h-17h',
      description: 'Aprenda técnicas de reciclagem e reaproveitamento de materiais'
    }
  ];

  return (
    <div className="flutter-screen p-4 space-y-4">
      <h1 className="text-2xl font-bold text-center mb-6">Próximos Eventos</h1>
      
      {events.map((event) => (
        <Card key={event.id} className="flutter-card">
          <CardHeader className="flex flex-row items-center gap-4 pb-2">
            <div className="p-2 rounded-full bg-solidario-purple/10 text-solidario-purple">
              <Calendar size={24} />
            </div>
            <div>
              <CardTitle className="text-lg">{event.title}</CardTitle>
              <CardDescription>{event.date}</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <p className="font-medium text-sm">Local: {event.location}</p>
            <p className="text-sm text-muted-foreground mt-1">{event.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default EventsScreen;
