
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { GraduationCap } from '@/components/icons';
import { Button } from '@/components/ui/button';

const ProgramsScreen: React.FC = () => {
  const programs = [
    {
      id: 1,
      title: 'Projeto Viver Feliz',
      description: 'Atividades socioeducativas para crianças e adolescentes em contraturno escolar.',
      participants: '120 crianças',
      location: 'Sede ONG Viver'
    },
    {
      id: 2,
      title: 'Projeto Vida Viver',
      description: 'Oficinas profissionalizantes para jovens em situação de vulnerabilidade social.',
      participants: '45 jovens',
      location: 'Centro Comunitário'
    },
    {
      id: 3,
      title: 'Acompanhamento Familiar',
      description: 'Suporte psicossocial para famílias em situação de vulnerabilidade.',
      participants: '75 famílias',
      location: 'Diversos bairros'
    }
  ];

  return (
    <div className="flutter-screen p-4 space-y-4">
      <h1 className="text-2xl font-bold text-center mb-6 text-viver-green">Nossos Programas</h1>
      
      {programs.map((program) => (
        <Card key={program.id} className="flutter-card border-l-4 border-l-viver-green">
          <CardHeader className="flex flex-row items-center gap-4 pb-2">
            <div className="p-2 rounded-full bg-viver-green/10 text-viver-green">
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
            <Button className="w-full mt-4 bg-viver-green hover:bg-viver-green/90">
              Saiba mais
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ProgramsScreen;
