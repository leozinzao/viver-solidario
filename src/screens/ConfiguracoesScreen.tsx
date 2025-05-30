
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from "@/components/ui/switch";
import { ArrowLeft, Bell, Globe, Palette, Database } from '@/components/icons';
import { useNavigation } from '@/context/NavigationContext';
import { useTheme } from '@/context/ThemeContext';

const ConfiguracoesScreen: React.FC = () => {
  const { navigateToScreen } = useNavigation();
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <div className="flutter-screen bg-gradient-to-b from-viver-yellow/5 to-white p-4 min-h-screen">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8 animate-fade-in">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigateToScreen('profile')}
          className="hover:bg-viver-yellow/10"
        >
          <ArrowLeft className="h-5 w-5 text-viver-yellow" />
        </Button>
        <h1 className="text-2xl font-bold text-viver-yellow">Configurações</h1>
      </div>

      {/* Seção de Aparência */}
      <Card className="flutter-card mb-6 animate-fade-in bg-white/90 backdrop-blur-sm shadow-lg">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg text-gray-800 font-semibold flex items-center gap-2">
            <Palette className="h-5 w-5 text-viver-yellow" />
            Aparência
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium text-gray-800">Modo Escuro</h3>
              <p className="text-sm text-gray-600">Alternar entre tema claro e escuro</p>
            </div>
            <Switch 
              checked={isDarkMode}
              onCheckedChange={toggleTheme}
              className="data-[state=checked]:bg-viver-yellow"
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium text-gray-800">Tamanho da Fonte</h3>
              <p className="text-sm text-gray-600">Ajustar tamanho do texto</p>
            </div>
            <Button variant="outline" size="sm">Padrão</Button>
          </div>
        </CardContent>
      </Card>

      {/* Seção de Notificações */}
      <Card className="flutter-card mb-6 animate-fade-in bg-white/90 backdrop-blur-sm shadow-lg">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg text-gray-800 font-semibold flex items-center gap-2">
            <Bell className="h-5 w-5 text-viver-yellow" />
            Notificações
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium text-gray-800">Notificações Push</h3>
              <p className="text-sm text-gray-600">Receber notificações no dispositivo</p>
            </div>
            <Switch defaultChecked className="data-[state=checked]:bg-viver-yellow" />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium text-gray-800">Eventos</h3>
              <p className="text-sm text-gray-600">Notificações sobre novos eventos</p>
            </div>
            <Switch defaultChecked className="data-[state=checked]:bg-viver-yellow" />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium text-gray-800">Campanhas</h3>
              <p className="text-sm text-gray-600">Atualizações sobre campanhas ativas</p>
            </div>
            <Switch defaultChecked className="data-[state=checked]:bg-viver-yellow" />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium text-gray-800">Voluntariado</h3>
              <p className="text-sm text-gray-600">Oportunidades de voluntariado</p>
            </div>
            <Switch defaultChecked className="data-[state=checked]:bg-viver-yellow" />
          </div>
        </CardContent>
      </Card>

      {/* Seção de Idioma */}
      <Card className="flutter-card mb-6 animate-fade-in bg-white/90 backdrop-blur-sm shadow-lg">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg text-gray-800 font-semibold flex items-center gap-2">
            <Globe className="h-5 w-5 text-viver-yellow" />
            Idioma e Região
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium text-gray-800">Idioma</h3>
              <p className="text-sm text-gray-600">Idioma da interface</p>
            </div>
            <Button variant="outline" size="sm">Português (BR)</Button>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium text-gray-800">Fuso Horário</h3>
              <p className="text-sm text-gray-600">Configurar fuso horário local</p>
            </div>
            <Button variant="outline" size="sm">GMT-3</Button>
          </div>
        </CardContent>
      </Card>

      {/* Seção de Dados */}
      <Card className="flutter-card mb-6 animate-fade-in bg-white/90 backdrop-blur-sm shadow-lg">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg text-gray-800 font-semibold flex items-center gap-2">
            <Database className="h-5 w-5 text-viver-yellow" />
            Dados e Privacidade
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium text-gray-800">Cache de Dados</h3>
              <p className="text-sm text-gray-600">Limpar cache local do aplicativo</p>
            </div>
            <Button variant="outline" size="sm" className="border-viver-yellow text-viver-yellow hover:bg-viver-yellow/10">
              Limpar
            </Button>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium text-gray-800">Dados Offline</h3>
              <p className="text-sm text-gray-600">Sincronizar dados para uso offline</p>
            </div>
            <Switch defaultChecked className="data-[state=checked]:bg-viver-yellow" />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium text-gray-800">Backup Automático</h3>
              <p className="text-sm text-gray-600">Backup automático dos dados</p>
            </div>
            <Switch defaultChecked className="data-[state=checked]:bg-viver-yellow" />
          </div>
        </CardContent>
      </Card>

      {/* Botões de Ação */}
      <div className="space-y-3 animate-fade-in">
        <Button 
          variant="outline" 
          className="w-full border-viver-yellow text-viver-yellow hover:bg-viver-yellow/10"
          onClick={() => window.open('/politica', '_blank')}
        >
          Política de Privacidade
        </Button>
        <Button 
          variant="outline" 
          className="w-full border-viver-yellow text-viver-yellow hover:bg-viver-yellow/10"
          onClick={() => window.open('/termos', '_blank')}
        >
          Termos de Uso
        </Button>
        <Button 
          variant="outline" 
          className="w-full border-viver-yellow-medium text-viver-yellow-medium hover:bg-viver-yellow-medium/10"
        >
          Sobre o App
        </Button>
      </div>

      {/* Versão do App */}
      <div className="text-center mt-8 text-sm text-gray-500 animate-fade-in">
        <p>Viver Solidário v1.0.0</p>
        <p>© 2025 Todos os direitos reservados</p>
      </div>
    </div>
  );
};

export default ConfiguracoesScreen;
