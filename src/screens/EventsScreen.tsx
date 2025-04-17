
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, Event } from '@/components/icons';
import { Button } from '@/components/ui/button';

const EventsScreen: React.FC = () => {
  const events = [
    {
      id: 1,
      title: 'Festival Beneficente',
      location: 'Sede da ONG Viver',
      date: '15 de Junho, 16h-22h',
      description: 'Venha participar do nosso festival beneficente. Toda a renda será revertida para os projetos da ONG.'
    },
    {
      id: 2,
      title: 'Roda de Conversa',
      location: 'Centro Comunitário',
      date: '20 de Junho, 14h-17h',
      description: 'Roda de conversa sobre enfrentamento do câncer infantojuvenil com profissionais da área da saúde.'
    },
    {
      id: 3,
      title: 'Bazar Beneficente',
      location: 'Shopping Local',
      date: '25 de Junho, 9h-18h',
      description: 'Bazar com produtos novos e usados a preços acessíveis. Toda a renda será destinada aos nossos projetos.'
    }
  ];

  return (
    <div className="flutter-screen p-4 space-y-4">
      <h1 className="text-2xl font-bold text-center mb-6 text-viver-yellow">Eventos</h1>
      
      {events.map((event) => (
        <Card key={event.id} className="flutter-card border-t-4 border-t-viver-yellow">
          <CardHeader className="flex flex-row items-center gap-4 pb-2">
            <div className="p-2 rounded-full bg-viver-yellow/10 text-viver-yellow">
              <Event size={24} />
            </div>
            <div>
              <CardTitle className="text-lg">{event.title}</CardTitle>
              <CardDescription className="flex items-center">
                <Calendar className="mr-1 h-3 w-3" /> {event.date}
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <p className="font-medium text-sm">Local: {event.location}</p>
            <p className="text-sm text-muted-foreground mt-1">{event.description}</p>
            <div className="flex gap-2 mt-4">
              <Button className="flex-1 bg-viver-yellow hover:bg-viver-yellow/90 text-black">
                Participar
              </Button>
              <Button variant="outline" className="flex-1">
                Mais Detalhes
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default EventsScreen;
