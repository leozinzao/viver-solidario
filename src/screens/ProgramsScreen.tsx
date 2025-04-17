
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { GraduationCap } from '@/components/icons';
import { Button } from '@/components/ui/button';

const ProgramsScreen: React.FC = () => {
  const programs = [
    {
      id: 1,
      title: 'Apoio ao Tratamento',
      description: 'Acompanhamento durante o tratamento de câncer, com suporte emocional e material.',
      participants: '120 crianças',
      location: 'Hospitais parceiros'
    },
    {
      id: 2,
      title: 'Atividades Recreativas',
      description: 'Atividades lúdicas e culturais para crianças e adolescentes em tratamento.',
      participants: '45 jovens',
      location: 'Sede ONG Viver e Hospitais'
    },
    {
      id: 3,
      title: 'Acompanhamento Familiar',
      description: 'Suporte psicossocial para famílias de crianças em tratamento oncológico.',
      participants: '75 famílias',
      location: 'Diversos bairros'
    }
  ];

  return (
    <div className="flutter-screen p-4 space-y-4">
      <h1 className="text-2xl font-bold text-center mb-6 text-viver-yellow">Nossos Programas</h1>
      
      {programs.map((program) => (
        <Card key={program.id} className="flutter-card border-l-4 border-l-viver-yellow">
          <CardHeader className="flex flex-row items-center gap-4 pb-2">
            <div className="p-2 rounded-full bg-viver-yellow/10 text-viver-yellow">
              <GraduationCap size={24} />
            </div>
            <div>
              <CardTitle className="text-lg">{program.title}</CardTitle>
              <CardDescription>{program.participants}</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-3">{program.description}</p>
            <p className="text-xs font-medium">Local: {program.location}</p>
            <Button className="w-full mt-4 bg-viver-yellow hover:bg-viver-yellow/90 text-black">
              Saiba mais
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ProgramsScreen;
