
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Handshake, Calendar } from '@/components/icons';
import { Button } from '@/components/ui/button';

const VolunteerScreen: React.FC = () => {
  const opportunities = [
    {
      id: 1,
      title: 'Apoio Escolar',
      description: 'Ajude crianças com dificuldades escolares através de reforço pedagógico.',
      schedule: 'Seg, Qua - 14h às 17h',
      commitment: 'Mínimo 4h semanais'
    },
    {
      id: 2,
      title: 'Oficina de Artes',
      description: 'Conduza oficinas de artes visuais para desenvolver habilidades criativas em crianças.',
      schedule: 'Ter, Qui - 9h às 11h',
      commitment: 'Mínimo 4h semanais'
    },
    {
      id: 3,
      title: 'Mentoria Profissional',
      description: 'Oriente jovens em início de carreira com mentoria profissional.',
      schedule: 'Sáb - 9h às 12h',
      commitment: 'Mínimo 3h semanais'
    }
  ];

  return (
    <div className="flutter-screen p-4 space-y-4">
      <h1 className="text-2xl font-bold text-center mb-6 text-viver-green">Seja Voluntário</h1>
      
      <Card className="flutter-card bg-viver-green/10 border-viver-green mb-6">
        <CardContent className="p-4">
          <h3 className="font-semibold text-viver-green mb-2">Por que ser voluntário?</h3>
          <p className="text-sm">Ao voluntariar na ONG Viver, você contribui diretamente para o desenvolvimento de crianças e adolescentes, além de adquirir experiências transformadoras.</p>
          <Button className="w-full mt-4 bg-viver-green hover:bg-viver-green/90">
            Cadastre-se como voluntário
          </Button>
        </CardContent>
      </Card>
      
      <h2 className="text-xl font-semibold mb-3">Oportunidades Abertas</h2>
      
      {opportunities.map((opportunity) => (
        <Card key={opportunity.id} className="flutter-card">
          <CardHeader className="flex flex-row items-center gap-4 pb-2">
            <div className="p-2 rounded-full bg-viver-green/10 text-viver-green">
              <Handshake size={24} />
            </div>
            <div>
              <CardTitle className="text-lg">{opportunity.title}</CardTitle>
              <CardDescription className="flex items-center">
                <Calendar className="mr-1 h-3 w-3" /> {opportunity.schedule}
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-2">{opportunity.description}</p>
            <p className="text-xs font-medium">Compromisso: {opportunity.commitment}</p>
            <Button variant="outline" className="w-full mt-4 border-viver-green text-viver-green hover:bg-viver-green/10">
              Inscrever-se
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default VolunteerScreen;
