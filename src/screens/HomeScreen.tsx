
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, Calendar, Users, Gift, Bug, ArrowRight } from "lucide-react";
import { useNavigation } from "@/context/NavigationContext";

const HomeScreen: React.FC = () => {
  const { navigateToScreen, currentScreen } = useNavigation();

  console.log('🏠 HomeScreen: Renderizado - Tela atual:', currentScreen);

  const handleNavigateToPhysicalDonations = () => {
    console.log('🎯 HomeScreen: Botão clicado - Navegando para doações físicas');
    console.log('🎯 HomeScreen: Tela atual antes da navegação:', currentScreen);
    navigateToScreen('doacoes-fisicas');
    
    // Log adicional após um pequeno delay
    setTimeout(() => {
      console.log('🎯 HomeScreen: Verificando navegação após 100ms');
    }, 100);
  };

  const forceNavigationTest = () => {
    console.log('🧪 HomeScreen: TESTE FORÇADO - Navegação direta');
    console.log('🧪 HomeScreen: Limpando possível cache de navegação');
    
    // Forçar mudança para home primeiro, depois para doacoes-fisicas
    navigateToScreen('home');
    setTimeout(() => {
      console.log('🧪 HomeScreen: Navegando para doacoes-fisicas após reset');
      navigateToScreen('doacoes-fisicas');
    }, 50);
  };

  return (
    <div className="flutter-screen bg-background p-4">
      {/* Debug Info */}
      <div className="bg-blue-100 border border-blue-300 p-3 rounded mb-4 text-center text-sm text-blue-800">
        📱 HOME SCREEN CARREGADA | Tela Atual: <strong>{currentScreen}</strong>
        <br />
        ⏰ {new Date().toLocaleTimeString()}
      </div>

      <h1 className="text-3xl font-bold mb-6 text-center text-viver-yellow">
        ONG Viver
      </h1>
      
      <div className="grid gap-6 mb-8">
        {/* Hero Card */}
        <Card className="bg-gradient-to-r from-viver-yellow/10 to-yellow-50 border-viver-yellow/20">
          <CardContent className="p-6 text-center">
            <Heart className="h-12 w-12 text-viver-yellow mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">Transformando Vidas</h2>
            <p className="text-gray-600 mb-4">
              Sua doação faz a diferença na vida de famílias em situação de vulnerabilidade social
            </p>
            <Button
              onClick={handleNavigateToPhysicalDonations}
              className="bg-viver-yellow hover:bg-viver-yellow/90 text-black font-medium"
            >
              <Gift className="h-4 w-4 mr-2" />
              Fazer Doação Física
            </Button>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="flutter-card hover:shadow-lg transition-shadow cursor-pointer" 
                onClick={() => navigateToScreen('donations')}>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center text-lg">
                <Heart className="mr-2 h-5 w-5 text-viver-yellow" />
                Como Apoiar
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                Descubra todas as formas de contribuir com nossa causa
              </p>
            </CardContent>
          </Card>

          <Card className="flutter-card hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => navigateToScreen('events')}>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center text-lg">
                <Calendar className="mr-2 h-5 w-5 text-viver-yellow" />
                Eventos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                Participe dos nossos eventos e campanhas
              </p>
            </CardContent>
          </Card>

          <Card className="flutter-card hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => navigateToScreen('volunteer')}>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center text-lg">
                <Users className="mr-2 h-5 w-5 text-viver-yellow" />
                Voluntariado
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                Doe seu tempo e ajude diretamente nossa comunidade
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Teste de Navegação - DESTAQUE */}
        <Card className="bg-gradient-to-r from-green-100 to-emerald-100 border-2 border-green-400">
          <CardContent className="p-6 text-center">
            <div className="flex items-center justify-center gap-2 mb-3">
              <Bug className="h-6 w-6 text-green-600" />
              <h3 className="font-bold text-green-800 text-lg">🧪 TESTE DO NOVO LAYOUT</h3>
            </div>
            <p className="text-sm text-green-700 mb-4">
              Clique nos botões abaixo para testar o novo layout streamlined de doações físicas
            </p>
            <div className="flex gap-3 justify-center flex-wrap">
              <Button
                onClick={handleNavigateToPhysicalDonations}
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                ✨ Teste Normal
                <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
              <Button
                onClick={forceNavigationTest}
                className="bg-orange-600 hover:bg-orange-700 text-white"
              >
                🔄 Teste Forçado
                <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
            <p className="text-xs text-green-600 mt-2">
              Verifique o console do navegador para logs detalhados
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default HomeScreen;
