
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Impact } from '@/components/icons';

const ImpactScreen: React.FC = () => {
  const impactData = [
    { id: 1, title: 'Crianças Atendidas', value: '350+', period: 'anualmente' },
    { id: 2, title: 'Famílias Apoiadas', value: '120+', period: 'mensalmente' },
    { id: 3, title: 'Voluntários Ativos', value: '85', period: 'atualmente' },
    { id: 4, title: 'Anos de Existência', value: '20+', period: 'desde 2003' }
  ];

  const successStories = [
    {
      id: 1,
      name: 'Maria',
      age: 16,
      story: 'Participante do Projeto Vida Viver desde os 12 anos, desenvolveu habilidades em design gráfico e hoje trabalha como jovem aprendiz em uma agência de publicidade.',
      year: '2023'
    },
    {
      id: 2,
      name: 'Carlos',
      age: 19,
      story: 'Integrou o programa de mentoria profissional, recebeu bolsa de estudos e hoje cursa Engenharia em uma universidade federal.',
      year: '2022'
    }
  ];

  return (
    <div className="flutter-screen p-4 space-y-6">
      <h1 className="text-2xl font-bold text-center mb-6 text-viver-green">Nosso Impacto</h1>
      
      <div className="grid grid-cols-2 gap-4">
        {impactData.map((item) => (
          <Card key={item.id} className="flutter-card">
            <CardContent className="p-4 text-center">
              <h3 className="text-sm text-muted-foreground">{item.title}</h3>
              <p className="text-3xl font-bold text-viver-green mt-2">{item.value}</p>
              <p className="text-xs text-muted-foreground">{item.period}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <h2 className="text-xl font-semibold mt-4 mb-3">Histórias de Sucesso</h2>
      
      {successStories.map((story) => (
        <Card key={story.id} className="flutter-card border-l-4 border-l-viver-yellow">
          <CardHeader className="flex flex-row items-center gap-4 pb-2">
            <div className="p-2 rounded-full bg-viver-yellow/10 text-viver-yellow">
              <Impact size={24} />
            </div>
            <div>
              <CardTitle className="text-lg">{story.name}, {story.age} anos</CardTitle>
              <p className="text-xs text-muted-foreground">{story.year}</p>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm">{story.story}</p>
          </CardContent>
        </Card>
      ))}
      
      <h2 className="text-xl font-semibold mt-4 mb-3">Nossos Parceiros</h2>
      <Card className="flutter-card">
        <CardContent className="p-4">
          <p className="text-sm mb-4">Contamos com o apoio de diversas organizações e empresas que acreditam no nosso trabalho:</p>
          <div className="flex flex-wrap justify-center gap-4">
            <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center text-xs">Parceiro 1</div>
            <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center text-xs">Parceiro 2</div>
            <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center text-xs">Parceiro 3</div>
            <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center text-xs">Parceiro 4</div>
            <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center text-xs">Parceiro 5</div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ImpactScreen;
