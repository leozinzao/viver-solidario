
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, Calendar, Users, Gift, ArrowRight } from "lucide-react";
import { useNavigation } from "@/context/NavigationContext";

const HomeScreen: React.FC = () => {
  const { navigateToScreen, currentScreen } = useNavigation();

  console.log('🏠 HomeScreen: Renderizado - Tela atual:', currentScreen);

  const handleNavigateToPhysicalDonations = () => {
    console.log('🎯 HomeScreen: Botão clicado - Navegando para doações físicas');
    navigateToScreen('doacoes-fisicas');
  };

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-2xl font-bold text-center text-viver-yellow mb-4">
        Bem-vindo à ONG Viver
      </h1>
      
      {/* Hero Card */}
      <Card className="bg-gradient-to-r from-viver-yellow/10 to-yellow-50 border-viver-yellow/20">
        <CardContent className="p-4 text-center">
          <Heart className="h-10 w-10 text-viver-yellow mx-auto mb-3" />
          <h2 className="text-lg font-semibold mb-2">Transformando Vidas</h2>
          <p className="text-gray-600 text-sm mb-4">
            Sua doação faz a diferença na vida de famílias em situação de vulnerabilidade social
          </p>
          <Button
            onClick={handleNavigateToPhysicalDonations}
            className="bg-viver-yellow hover:bg-viver-yellow/90 text-black font-medium w-full"
          >
            <Gift className="h-4 w-4 mr-2" />
            Fazer Doação Física
          </Button>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 gap-3">
        <Card className="hover:shadow-md transition-shadow cursor-pointer" 
              onClick={() => navigateToScreen('donations')}>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-viver-yellow/10 rounded-full flex items-center justify-center">
                <Heart className="h-5 w-5 text-viver-yellow" />
              </div>
              <div className="flex-1">
                <h3 className="font-medium">Como Apoiar</h3>
                <p className="text-sm text-gray-600">Descubra formas de contribuir</p>
              </div>
              <ArrowRight className="h-4 w-4 text-gray-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => navigateToScreen('events')}>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <Calendar className="h-5 w-5 text-blue-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-medium">Eventos</h3>
                <p className="text-sm text-gray-600">Participe das campanhas</p>
              </div>
              <ArrowRight className="h-4 w-4 text-gray-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => navigateToScreen('volunteer')}>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <Users className="h-5 w-5 text-green-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-medium">Voluntariado</h3>
                <p className="text-sm text-gray-600">Doe seu tempo</p>
              </div>
              <ArrowRight className="h-4 w-4 text-gray-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Teste do layout streamlined */}
      <Card className="bg-gradient-to-r from-green-100 to-emerald-100 border-green-400">
        <CardContent className="p-4 text-center">
          <h3 className="font-bold text-green-800 mb-2">🧪 Teste do Novo Layout</h3>
          <p className="text-sm text-green-700 mb-3">
            Teste o novo layout de doações físicas
          </p>
          <Button
            onClick={handleNavigateToPhysicalDonations}
            className="bg-green-600 hover:bg-green-700 text-white w-full"
          >
            ✨ Testar Layout Streamlined
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default HomeScreen;
