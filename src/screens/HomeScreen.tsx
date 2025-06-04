
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, Calendar, Users, Gift } from "lucide-react";
import { useNavigation } from "@/context/NavigationContext";

const HomeScreen: React.FC = () => {
  const { navigateToScreen } = useNavigation();

  const handleNavigateToPhysicalDonations = () => {
    console.log('🎯 HomeScreen: Navegando para doações físicas');
    navigateToScreen('doacoes-fisicas');
  };

  return (
    <div className="flutter-screen bg-background p-4">
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

        {/* Test Button - Remover após teste */}
        <Card className="bg-green-50 border-green-200">
          <CardContent className="p-4 text-center">
            <h3 className="font-semibold text-green-800 mb-2">🧪 Teste do Novo Layout</h3>
            <p className="text-sm text-green-700 mb-3">
              Clique no botão abaixo para testar o novo layout streamlined de doações físicas
            </p>
            <Button
              onClick={handleNavigateToPhysicalDonations}
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              ✨ Testar Novo Layout de Doações
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default HomeScreen;
