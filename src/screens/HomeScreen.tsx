
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import { useNavigation } from '@/context/NavigationContext';
import { 
  Calendar as CalendarIcon, 
  Heart, 
  DollarSign, 
  Handshake,
  LogIn,
  Users,
  TrendingUp,
  ExternalLink,
  ArrowRight,
  MapPin,
  Phone
} from "lucide-react";

const HomeScreen: React.FC = () => {
  const { isAuthenticated, user } = useAuth();
  const { navigateToScreen } = useNavigation();

  const handleLoginClick = () => {
    navigateToScreen('login');
  };

  const stats = [
    { label: 'Famílias Assistidas', value: '150+', icon: Users, color: 'text-blue-600' },
    { label: 'Voluntários Ativos', value: '80+', icon: Handshake, color: 'text-green-600' },
    { label: 'Doações Recebidas', value: 'R$ 45.000', icon: DollarSign, color: 'text-yellow-600' },
    { label: 'Impacto Social', value: '95%', icon: TrendingUp, color: 'text-purple-600' },
  ];

  const quickActions = [
    {
      title: 'Eventos',
      description: 'Veja nossos próximos eventos',
      icon: CalendarIcon,
      action: () => navigateToScreen('events'),
      color: 'bg-blue-50 hover:bg-blue-100 border-blue-200'
    },
    {
      title: 'Doações',
      description: 'Faça uma doação hoje',
      icon: Heart,
      action: () => navigateToScreen('donations'),
      color: 'bg-red-50 hover:bg-red-100 border-red-200'
    },
    {
      title: 'Voluntariado',
      description: 'Seja um voluntário',
      icon: Handshake,
      action: () => navigateToScreen('volunteer'),
      color: 'bg-green-50 hover:bg-green-100 border-green-200'
    }
  ];

  return (
    <div className="flutter-screen bg-gradient-to-b from-viver-yellow/5 to-white p-4 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-6 animate-fade-in">
        <div className="flex items-center gap-3">
          <div className="w-16 h-16 rounded-full bg-viver-yellow/20 flex items-center justify-center shadow-lg backdrop-blur-xl">
            <img 
              src="/lovable-uploads/faca4f99-20c6-4b35-bcc4-bf561ee25dc9.png" 
              alt="Logo ONG Viver" 
              className="h-12 w-12 object-contain"
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
            className="bg-viver-yellow hover:bg-viver-yellow/90 text-black shadow-md transition-all hover:scale-105 flex items-center gap-2" 
            size="lg"
          >
            <LogIn className="h-5 w-5" />
            Entrar
          </Button>
        )}
      </div>
      
      {/* Hero Banner com Informações da Instituição */}
      <div className="rounded-2xl overflow-hidden mb-8 relative shadow-xl animate-fade-in">
        <div className="bg-gradient-to-br from-viver-yellow/20 via-solidario-purple/10 to-viver-yellow/30 p-8">
          <div className="grid md:grid-cols-2 gap-6 items-center">
            <div>
              <h2 className="text-2xl font-bold text-solidario-purple mb-3">
                Apoio à criança e adolescente com câncer
              </h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                Há mais de 20 anos, a ONG Viver trabalha oferecendo apoio integral às famílias que enfrentam o câncer infantojuvenil, proporcionando assistência social, psicológica e material.
              </p>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-viver-yellow" />
                  <span>Rua Bernardo Sayão, 319 - Jd. Petrópolis, Londrina/PR</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-viver-yellow" />
                  <span>(43) 3025-2050</span>
                </div>
              </div>
            </div>
            <div className="flex justify-center">
              <img 
                src="/lovable-uploads/faca4f99-20c6-4b35-bcc4-bf561ee25dc9.png" 
                alt="Logo ONG Viver"
                className="h-32 object-contain opacity-80"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Estatísticas */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        {stats.map((stat, index) => (
          <Card key={stat.label} className="flutter-card glass-morphism animate-scale-in hover:scale-105 transition-all duration-200">
            <CardContent className="p-4 text-center">
              <div className="w-12 h-12 rounded-full bg-white/80 flex items-center justify-center mb-3 mx-auto shadow-sm">
                <stat.icon className={`h-6 w-6 ${stat.color}`} />
              </div>
              <h3 className="font-bold text-xl text-viver-yellow">{stat.value}</h3>
              <p className="text-xs text-muted-foreground leading-tight">{stat.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {/* Ações Rápidas */}
      <h2 className="text-xl font-semibold mb-4 text-solidario-purple/90">Como Participar</h2>
      <div className="grid gap-4 mb-8">
        {quickActions.map((action, index) => (
          <Card 
            key={action.title}
            className={`flutter-card transition-all duration-200 hover:scale-105 cursor-pointer ${action.color} border animate-enter`}
            onClick={action.action}
            style={{animationDelay: `${index * 100}ms`}}
          >
            <CardContent className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-white/80 flex items-center justify-center shadow-sm">
                  <action.icon className="h-6 w-6 text-solidario-purple" />
                </div>
                <div>
                  <h3 className="font-semibold text-solidario-purple">{action.title}</h3>
                  <p className="text-sm text-gray-600">{action.description}</p>
                </div>
              </div>
              <ArrowRight className="h-5 w-5 text-solidario-purple/60" />
            </CardContent>
          </Card>
        ))}
      </div>
      
      {/* Destaques Recentes */}
      <Card className="flutter-card glass-morphism mb-8 animate-fade-in">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg text-solidario-purple font-semibold flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Últimas Notícias
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="border-l-4 border-l-viver-yellow pl-4">
            <h4 className="font-medium text-sm mb-1">Nova Parceria Firmada</h4>
            <p className="text-xs text-muted-foreground mb-2">A ONG Viver firma parceria com hospital local para ampliar atendimentos especializados.</p>
            <span className="text-xs text-viver-yellow font-medium">há 3 dias</span>
          </div>
          <div className="border-l-4 border-l-viver-yellow-medium pl-4">
            <h4 className="font-medium text-sm mb-1">Campanha de Inverno 2025</h4>
            <p className="text-xs text-muted-foreground mb-2">Arrecadação de agasalhos já atingiu 60% da meta estabelecida.</p>
            <span className="text-xs text-viver-yellow-medium font-medium">há 1 semana</span>
          </div>
        </CardContent>
      </Card>
      
      {/* Links Institucionais */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <Button 
          variant="outline"
          className="h-auto p-4 border-viver-yellow hover:bg-viver-yellow/10 transition-all hover:scale-105"
          onClick={() => window.open("https://www.ongviver.org.br", "_blank")}
        >
          <div className="text-center">
            <ExternalLink className="h-5 w-5 mx-auto mb-1 text-viver-yellow" />
            <span className="text-sm font-medium text-viver-yellow">Site Oficial</span>
          </div>
        </Button>
        <Button 
          variant="outline"
          className="h-auto p-4 border-solidario-purple hover:bg-solidario-purple/10 transition-all hover:scale-105"
          onClick={() => window.open("https://www.instagram.com/ongviver", "_blank")}
        >
          <div className="text-center">
            <Heart className="h-5 w-5 mx-auto mb-1 text-solidario-purple" />
            <span className="text-sm font-medium text-solidario-purple">Instagram</span>
          </div>
        </Button>
      </div>
      
      {/* CTA principal */}
      <Button 
        className="w-full bg-solidario-purple hover:bg-solidario-purple/90 text-white text-lg py-6 shadow-lg animate-fade-in transition-all hover:scale-105"
        onClick={() => navigateToScreen('events')}
      >
        <CalendarIcon className="h-6 w-6 mr-2" />
        Conheça Nossos Eventos
      </Button>
    </div>
  );
};

export default HomeScreen;
