
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import { useNavigation } from '@/context/NavigationContext';
import { 
  GraduationCap, 
  Calendar as CalendarIcon, 
  Heart, 
  DollarSign, 
  Handshake,
  LogIn,
  Users,
  TrendingUp
} from "lucide-react";

const HomeScreen: React.FC = () => {
  const { isAuthenticated, user } = useAuth();
  const { navigateToScreen } = useNavigation();

  const handleLoginClick = () => {
    navigateToScreen('login');
  };

  const stats = [
    { label: 'Famílias Assistidas', value: '150+', icon: Users },
    { label: 'Voluntários Ativos', value: '80+', icon: Handshake },
    { label: 'Doações Recebidas', value: 'R$ 45.000', icon: DollarSign },
    { label: 'Impacto Social', value: '95%', icon: TrendingUp },
  ];

  return (
    <div className="flutter-screen bg-gradient-to-b from-viver-yellow/10 to-white dark:from-solidario-purple/10 dark:to-background p-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-8 animate-fade-in">
        <div className="flex items-center gap-3">
          <div className="w-14 h-14 rounded-full bg-viver-yellow/20 flex items-center justify-center shadow-lg backdrop-blur-xl">
            <img 
              src="/lovable-uploads/faca4f99-20c6-4b35-bcc4-bf561ee25dc9.png" 
              alt="Logo ONG Viver" 
              className="h-10 w-10 object-contain"
            />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-viver-yellow drop-shadow-md">ONG Viver</h1>
            {isAuthenticated && user && (
              <p className="text-sm text-muted-foreground">Bem-vindo, {user.name}!</p>
            )}
          </div>
        </div>
        
        {!isAuthenticated && (
          <Button 
            onClick={handleLoginClick}
            className="bg-viver-yellow hover:bg-viver-yellow/90 text-black shadow-md transition-transform hover:scale-105 animate-fade-in flex items-center gap-2" 
            size="lg"
          >
            <LogIn className="h-5 w-5" />
            Entrar
          </Button>
        )}
      </div>
      
      {/* Hero Banner */}
      <div className="rounded-2xl overflow-hidden h-44 mb-8 relative shadow-xl glass-morphism animate-fade-in">
        <div className="absolute inset-0 bg-gradient-to-tr from-viver-yellow/20 to-solidario-purple/10 z-10" />
        <div className="w-full h-full flex items-center justify-center z-20 relative">
          <img 
            src="/lovable-uploads/faca4f99-20c6-4b35-bcc4-bf561ee25dc9.png" 
            alt="Logo ONG Viver"
            className="h-24 object-contain opacity-20"
          />
        </div>
        <div className="absolute inset-0 flex flex-col justify-end p-6 z-30">
          <h2 className="text-solidario-purple text-xl font-bold mb-1 drop-shadow animate-fade-in">
            Apoio à criança e adolescente com câncer
          </h2>
          <p className="text-black/80 text-md animate-fade-in delay-100">
            Juntos fazemos a diferença
          </p>
        </div>
      </div>

      {/* Estatísticas */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        {stats.map((stat, index) => (
          <Card key={stat.label} className="flutter-card glass-morphism animate-scale-in hover:scale-105">
            <CardContent className="p-4 text-center">
              <div className="w-12 h-12 rounded-full bg-viver-yellow/20 flex items-center justify-center mb-2 mx-auto">
                <stat.icon className="h-6 w-6 text-viver-yellow" />
              </div>
              <h3 className="font-bold text-lg text-viver-yellow">{stat.value}</h3>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {/* Destaques */}
      <h2 className="text-lg font-semibold mb-3 text-solidario-purple/90 animate-fade-in">Destaques</h2>
      <div className="space-y-4 mb-6">
        <Card className="flutter-card flex items-center border-l-4 border-l-viver-yellow bg-white/60 animate-enter glass-morphism hover:scale-105 transition-transform cursor-pointer">
          <div className="mr-4 bg-viver-yellow/30 p-3 rounded-full shadow-md">
            <GraduationCap className="w-6 h-6 text-viver-yellow" />
          </div>
          <div>
            <h3 className="font-semibold">Novo Programa de Apoio</h3>
            <p className="text-sm text-muted-foreground">Inscrições abertas para o Projeto Viver Feliz</p>
          </div>
        </Card>
        <Card className="flutter-card flex items-center border-l-4 border-l-viver-yellow-medium bg-white/60 animate-enter glass-morphism hover:scale-105 transition-transform cursor-pointer">
          <div className="mr-4 bg-viver-yellow-medium/30 p-3 rounded-full shadow-md">
            <CalendarIcon className="w-6 h-6 text-viver-yellow-medium" />
          </div>
          <div>
            <h3 className="font-semibold">Próximo Evento</h3>
            <p className="text-sm text-muted-foreground">Festival Beneficente - 15/06</p>
          </div>
        </Card>
        <Card className="flutter-card flex items-center border-l-4 border-l-viver-yellow bg-white/60 animate-enter glass-morphism hover:scale-105 transition-transform cursor-pointer">
          <div className="mr-4 bg-viver-yellow/30 p-3 rounded-full shadow-md">
            <DollarSign className="w-6 h-6 text-viver-yellow" />
          </div>
          <div>
            <h3 className="font-semibold">Campanha Ativa</h3>
            <p className="text-sm text-muted-foreground">Doação para Tratamento - 30% arrecadado</p>
          </div>
        </Card>
      </div>
      
      {/* Como Participar */}
      <h2 className="text-lg font-semibold my-5 text-solidario-purple/90 animate-fade-in delay-100">Como Participar</h2>
      <div className="grid grid-cols-2 gap-4 mb-6">
        <Card 
          className="flutter-card hover:shadow-xl transition-shadow bg-white/70 glass-morphism animate-scale-in hover:scale-105 cursor-pointer"
          onClick={() => navigateToScreen('volunteer')}
        >
          <CardContent className="p-4 text-center flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-viver-yellow/20 flex items-center justify-center mb-2">
              <Handshake className="h-7 w-7 text-viver-yellow" />
            </div>
            <h3 className="font-medium text-sm">Seja Voluntário</h3>
          </CardContent>
        </Card>
        <Card 
          className="flutter-card hover:shadow-xl transition-shadow bg-white/70 glass-morphism animate-scale-in hover:scale-105 cursor-pointer"
          onClick={() => navigateToScreen('donations')}
        >
          <CardContent className="p-4 text-center flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-viver-yellow/20 flex items-center justify-center mb-2">
              <Heart className="h-7 w-7 text-viver-yellow" />
            </div>
            <h3 className="font-medium text-sm">Faça uma Doação</h3>
          </CardContent>
        </Card>
      </div>
      
      {/* Notícias Recentes */}
      <Card className="flutter-card glass-morphism mb-6 animate-fade-in">
        <CardHeader className="pb-2">
          <CardTitle className="text-base text-solidario-purple font-semibold">Notícias Recentes</CardTitle>
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
      
      {/* CTA principal */}
      <Button 
        className="w-full bg-solidario-purple hover:bg-solidario-purple/80 text-white text-lg shadow-lg animate-fade-in transition-transform hover:scale-105"
        onClick={() => navigateToScreen('events')}
      >
        Conheça Nosso Trabalho
      </Button>
    </div>
  );
};

export default HomeScreen;
