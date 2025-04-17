
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Event, MonetizationOn, GraduationCap, Handshake } from '@/components/icons';
import { Button } from '@/components/ui/button';

const DashboardScreen: React.FC = () => {
  return (
    <div className="flutter-screen bg-background p-4">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center">
          <img 
            src="/lovable-uploads/faca4f99-20c6-4b35-bcc4-bf561ee25dc9.png" 
            alt="Logo ONG Viver" 
            className="h-10 w-10 object-contain mr-2"
          />
          <h1 className="text-2xl font-bold text-viver-yellow">ONG Viver</h1>
        </div>
      </div>
      
      <div className="rounded-xl overflow-hidden h-40 mb-6 relative">
        <div className="w-full h-full bg-viver-yellow/20 flex items-center justify-center">
          <img 
            src="/lovable-uploads/faca4f99-20c6-4b35-bcc4-bf561ee25dc9.png" 
            alt="Logo ONG Viver"
            className="h-20 object-contain opacity-20"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent flex flex-col justify-end p-4">
          <h2 className="text-black font-bold text-lg">Apoio à criança e adolescente com câncer</h2>
          <p className="text-black/90 text-sm">Juntos fazemos a diferença</p>
        </div>
      </div>
      
      <h2 className="text-lg font-semibold mb-3">Destaques</h2>
      
      <div className="space-y-4">
        <Card className="flutter-card flex items-center border-l-4 border-l-viver-yellow">
          <div className="mr-4 bg-viver-yellow/20 p-3 rounded-full">
            <GraduationCap className="w-6 h-6 text-viver-yellow" />
          </div>
          <div>
            <h3 className="font-semibold">Novo Programa de Apoio</h3>
            <p className="text-sm text-muted-foreground">Inscrições abertas para o Projeto Viver Feliz</p>
          </div>
        </Card>
        
        <Card className="flutter-card flex items-center border-l-4 border-l-viver-yellow-medium">
          <div className="mr-4 bg-viver-yellow-medium/20 p-3 rounded-full">
            <Event className="w-6 h-6 text-viver-yellow-medium" />
          </div>
          <div>
            <h3 className="font-semibold">Próximo Evento</h3>
            <p className="text-sm text-muted-foreground">Festival Beneficente - 15/06</p>
          </div>
        </Card>
        
        <Card className="flutter-card flex items-center border-l-4 border-l-viver-yellow">
          <div className="mr-4 bg-viver-yellow/20 p-3 rounded-full">
            <MonetizationOn className="w-6 h-6 text-viver-yellow" />
          </div>
          <div>
            <h3 className="font-semibold">Campanha Ativa</h3>
            <p className="text-sm text-muted-foreground">Doação para Tratamento - 30% arrecadado</p>
          </div>
        </Card>
      </div>
      
      <h2 className="text-lg font-semibold my-4">Como Participar</h2>
      
      <div className="grid grid-cols-2 gap-3 mb-6">
        <Card className="flutter-card">
          <CardContent className="p-3 text-center">
            <div className="mx-auto w-12 h-12 rounded-full bg-viver-yellow/10 flex items-center justify-center mb-2">
              <Handshake className="h-6 w-6 text-viver-yellow" />
            </div>
            <h3 className="font-medium text-sm">Seja Voluntário</h3>
          </CardContent>
        </Card>
        
        <Card className="flutter-card">
          <CardContent className="p-3 text-center">
            <div className="mx-auto w-12 h-12 rounded-full bg-viver-yellow/10 flex items-center justify-center mb-2">
              <MonetizationOn className="h-6 w-6 text-viver-yellow" />
            </div>
            <h3 className="font-medium text-sm">Faça uma Doação</h3>
          </CardContent>
        </Card>
      </div>
      
      <Card className="flutter-card mb-4">
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Notícias Recentes</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div>
            <h4 className="font-medium text-sm">Nova Parceria Firmada</h4>
            <p className="text-xs text-muted-foreground">A ONG Viver firma parceria com hospital local para ampliar atendimentos.</p>
            <p className="text-xs text-right mt-1 text-muted-foreground">há 3 dias</p>
          </div>
          
          <div>
            <h4 className="font-medium text-sm">Visita de Autoridades</h4>
            <p className="text-xs text-muted-foreground">Secretaria de Saúde visita projetos da ONG Viver.</p>
            <p className="text-xs text-right mt-1 text-muted-foreground">há 1 semana</p>
          </div>
        </CardContent>
      </Card>
      
      <Button className="w-full bg-viver-yellow hover:bg-viver-yellow/90 text-black">
        Conheça Nosso Trabalho
      </Button>
    </div>
  );
};

export default DashboardScreen;
