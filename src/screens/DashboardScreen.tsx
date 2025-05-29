
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';

// Import icons directly from lucide-react
import { 
  GraduationCap, 
  Calendar as CalendarIcon, 
  Heart, 
  DollarSign, 
  Handshake,
  LogIn,
  Users,
  TrendingUp,
  Gift,
  MapPin,
  Phone,
  Mail
} from "lucide-react";

const DashboardScreen: React.FC = () => {
  const { isAuthenticated } = useAuth();

  const handleLoginClick = () => {
    // Usar a função global para navegar
    if (typeof window !== 'undefined' && (window as any).navigateTo) {
      (window as any).navigateTo('login');
    }
  };

  const handleNavigate = (screen: string) => {
    if (typeof window !== 'undefined' && (window as any).navigateTo) {
      (window as any).navigateTo(screen);
    }
  };

  return (
    <div className="flutter-screen bg-gradient-to-b from-viver-yellow/10 to-white p-4">
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
          <h1 className="text-3xl font-bold text-viver-yellow drop-shadow-md">ONG Viver</h1>
        </div>
        
        {/* Só mostrar botão de login se não estiver autenticado */}
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
      
      {/* Hero Banner com foto da instituição */}
      <div className="rounded-2xl overflow-hidden h-48 mb-8 relative shadow-xl animate-fade-in">
        <div className="absolute inset-0 bg-gradient-to-tr from-black/40 to-black/20 z-10" />
        <div 
          className="w-full h-full bg-cover bg-center"
          style={{
            backgroundImage: `url('/lovable-uploads/644dc858-b963-4312-a22e-38983c64e833.png')`
          }}
        />
        <div className="absolute inset-0 flex flex-col justify-end p-6 z-20">
          <h2 className="text-white text-xl font-bold mb-1 drop-shadow-lg animate-fade-in">
            Apoio à criança e adolescente com câncer
          </h2>
          <p className="text-white/90 text-md animate-fade-in delay-100">
            Juntos fazemos a diferença
          </p>
          <div className="flex gap-2 mt-3">
            <Button 
              onClick={() => handleNavigate('donations')}
              className="bg-viver-yellow hover:bg-viver-yellow/90 text-black text-sm px-4 py-2"
            >
              <Heart className="h-4 w-4 mr-1" />
              Doar
            </Button>
            <Button 
              onClick={() => handleNavigate('volunteer')}
              className="bg-viver-yellow-medium hover:bg-viver-yellow-medium/90 text-black text-sm px-4 py-2"
            >
              <Handshake className="h-4 w-4 mr-1" />
              Voluntariar
            </Button>
          </div>
        </div>
      </div>

      {/* Estatísticas */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <Card className="flutter-card bg-gradient-to-br from-viver-yellow/20 to-viver-yellow/10 border-viver-yellow/30">
          <CardContent className="p-4 text-center">
            <Users className="h-8 w-8 text-viver-yellow mx-auto mb-2" />
            <div className="text-2xl font-bold text-viver-yellow">500+</div>
            <div className="text-sm text-gray-600">Famílias assistidas</div>
          </CardContent>
        </Card>
        <Card className="flutter-card bg-gradient-to-br from-viver-yellow-medium/20 to-viver-yellow-medium/10 border-viver-yellow-medium/30">
          <CardContent className="p-4 text-center">
            <TrendingUp className="h-8 w-8 text-viver-yellow-medium mx-auto mb-2" />
            <div className="text-2xl font-bold text-viver-yellow-medium">15+</div>
            <div className="text-sm text-gray-600">Anos de atuação</div>
          </CardContent>
        </Card>
      </div>
      
      {/* Destaques */}
      <h2 className="text-lg font-semibold mb-3 text-gray-800 animate-fade-in">Destaques</h2>
      <div className="space-y-4 mb-6">
        <Card 
          className="flutter-card flex items-center border-l-4 border-l-viver-yellow bg-white hover:shadow-lg transition-all cursor-pointer"
          onClick={() => handleNavigate('events')}
        >
          <div className="mr-4 bg-viver-yellow/20 p-3 rounded-full">
            <CalendarIcon className="w-6 h-6 text-viver-yellow" />
          </div>
          <div>
            <h3 className="font-semibold">Próximos Eventos</h3>
            <p className="text-sm text-muted-foreground">Veja nossa programação e participe</p>
          </div>
        </Card>
        
        <Card 
          className="flutter-card flex items-center border-l-4 border-l-viver-yellow-medium bg-white hover:shadow-lg transition-all cursor-pointer"
          onClick={() => handleNavigate('donations')}
        >
          <div className="mr-4 bg-viver-yellow-medium/20 p-3 rounded-full">
            <Gift className="w-6 h-6 text-viver-yellow-medium" />
          </div>
          <div>
            <h3 className="font-semibold">Campanha Ativa</h3>
            <p className="text-sm text-muted-foreground">Doação para Tratamento - 75% arrecadado</p>
          </div>
        </Card>
      </div>
      
      {/* Como Participar */}
      <h2 className="text-lg font-semibold mb-4 text-gray-800 animate-fade-in delay-100">Como Participar</h2>
      <div className="grid grid-cols-2 gap-4 mb-6">
        <Card 
          className="flutter-card hover:shadow-xl transition-all bg-gradient-to-br from-viver-yellow/10 to-viver-yellow/5 border-viver-yellow/20 cursor-pointer group"
          onClick={() => handleNavigate('volunteer')}
        >
          <CardContent className="p-4 text-center">
            <div className="w-12 h-12 rounded-full bg-viver-yellow/20 flex items-center justify-center mb-3 mx-auto group-hover:bg-viver-yellow/30 transition-colors">
              <Handshake className="h-7 w-7 text-viver-yellow" />
            </div>
            <h3 className="font-semibold text-sm mb-1">Seja Voluntário</h3>
            <p className="text-xs text-gray-600">Doe seu tempo e talento</p>
          </CardContent>
        </Card>
        
        <Card 
          className="flutter-card hover:shadow-xl transition-all bg-gradient-to-br from-viver-yellow-medium/10 to-viver-yellow-medium/5 border-viver-yellow-medium/20 cursor-pointer group"
          onClick={() => handleNavigate('donations')}
        >
          <CardContent className="p-4 text-center">
            <div className="w-12 h-12 rounded-full bg-viver-yellow-medium/20 flex items-center justify-center mb-3 mx-auto group-hover:bg-viver-yellow-medium/30 transition-colors">
              <Heart className="h-7 w-7 text-viver-yellow-medium" />
            </div>
            <h3 className="font-semibold text-sm mb-1">Faça uma Doação</h3>
            <p className="text-xs text-gray-600">Contribua financeiramente</p>
          </CardContent>
        </Card>
      </div>

      {/* Informações da ONG */}
      <Card className="flutter-card mb-6 animate-fade-in">
        <CardHeader className="pb-2">
          <CardTitle className="text-base text-gray-800 font-semibold">Sobre a ONG Viver</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-sm text-gray-700 leading-relaxed">
            A ONG Viver atua há mais de 15 anos oferecendo apoio integral a crianças e adolescentes 
            com câncer e suas famílias, proporcionando suporte emocional, social e material.
          </p>
          
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm">
              <MapPin className="h-4 w-4 text-viver-yellow" />
              <span>Rua Bernardo Sayão, 319, Jd. Petrópolis</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Phone className="h-4 w-4 text-viver-yellow" />
              <span>(43) 3025-5545</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Mail className="h-4 w-4 text-viver-yellow" />
              <span>contato@ongviver.org.br</span>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* CTA principal */}
      <Button 
        className="w-full bg-viver-yellow hover:bg-viver-yellow/90 text-black text-lg shadow-lg animate-fade-in transition-transform hover:scale-105 mb-4"
        onClick={() => window.open("https://www.ongviver.org.br", "_blank")}
      >
        Conheça Nosso Trabalho
      </Button>
    </div>
  );
};

export default DashboardScreen;
