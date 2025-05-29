
import React, { useState } from 'react';
import { useNavigation } from '@/context/NavigationContext';
import { useTheme } from '@/context/ThemeContext';
import { useAuth } from '@/context/AuthContext';
import { ArrowLeft, Settings, Bell, Shield, Globe, Palette, Database } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Label } from '@/components/ui/label';
import { toast } from '@/components/ui/use-toast';

const ConfiguracoesScreen: React.FC = () => {
  const { navigateToScreen } = useNavigation();
  const { isDarkMode, toggleTheme } = useTheme();
  const { user } = useAuth();
  
  // Estados das configurações
  const [notificacoes, setNotificacoes] = useState({
    email: true,
    push: false,
    doacoes: true,
    eventos: true,
    newsletter: false
  });
  
  const [privacidade, setPrivacidade] = useState({
    perfilPublico: false,
    mostrarDoacoes: false,
    mostrarHorasVoluntarias: true
  });
  
  const [preferencias, setPreferencias] = useState({
    idioma: 'pt-BR',
    timezone: 'America/Sao_Paulo',
    formato24h: true
  });

  const salvarConfiguracoes = () => {
    // Aqui você salvaria as configurações no backend
    toast({
      title: "Configurações salvas",
      description: "Suas preferências foram atualizadas com sucesso.",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => navigateToScreen('profile')}
            className="hover:bg-viver-yellow/20"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex-1">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-viver-yellow to-orange-500 bg-clip-text text-transparent">
              Configurações
            </h1>
            <p className="text-muted-foreground">
              Personalize sua experiência no Viver Solidário
            </p>
          </div>
        </div>

        {/* Aparência */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Palette className="w-5 h-5" />
              Aparência
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="dark-mode">Modo Escuro</Label>
                <p className="text-sm text-muted-foreground">
                  Alternar entre tema claro e escuro
                </p>
              </div>
              <Switch 
                id="dark-mode"
                checked={isDarkMode}
                onCheckedChange={toggleTheme}
                className="data-[state=checked]:bg-viver-yellow"
              />
            </div>
            
            <Separator />
            
            <div className="space-y-2">
              <Label>Idioma</Label>
              <Select value={preferencias.idioma} onValueChange={(valor) => 
                setPreferencias(prev => ({ ...prev, idioma: valor }))
              }>
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pt-BR">Português (Brasil)</SelectItem>
                  <SelectItem value="en-US">English (US)</SelectItem>
                  <SelectItem value="es-ES">Español</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Notificações */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="w-5 h-5" />
              Notificações
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>Notificações por Email</Label>
                <p className="text-sm text-muted-foreground">
                  Receba atualizações importantes por email
                </p>
              </div>
              <Switch 
                checked={notificacoes.email}
                onCheckedChange={(checked) => 
                  setNotificacoes(prev => ({ ...prev, email: checked }))
                }
                className="data-[state=checked]:bg-viver-yellow"
              />
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between">
              <div>
                <Label>Notificações Push</Label>
                <p className="text-sm text-muted-foreground">
                  Notificações instantâneas no navegador
                </p>
              </div>
              <Switch 
                checked={notificacoes.push}
                onCheckedChange={(checked) => 
                  setNotificacoes(prev => ({ ...prev, push: checked }))
                }
                className="data-[state=checked]:bg-viver-yellow"
              />
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between">
              <div>
                <Label>Atualizações sobre Doações</Label>
                <p className="text-sm text-muted-foreground">
                  Notificações sobre suas doações e impacto
                </p>
              </div>
              <Switch 
                checked={notificacoes.doacoes}
                onCheckedChange={(checked) => 
                  setNotificacoes(prev => ({ ...prev, doacoes: checked }))
                }
                className="data-[state=checked]:bg-viver-yellow"
              />
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between">
              <div>
                <Label>Eventos e Atividades</Label>
                <p className="text-sm text-muted-foreground">
                  Novos eventos e oportunidades de voluntariado
                </p>
              </div>
              <Switch 
                checked={notificacoes.eventos}
                onCheckedChange={(checked) => 
                  setNotificacoes(prev => ({ ...prev, eventos: checked }))
                }
                className="data-[state=checked]:bg-viver-yellow"
              />
            </div>
          </CardContent>
        </Card>

        {/* Privacidade */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5" />
              Privacidade e Segurança
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>Perfil Público</Label>
                <p className="text-sm text-muted-foreground">
                  Permitir que outros usuários vejam seu perfil
                </p>
              </div>
              <Switch 
                checked={privacidade.perfilPublico}
                onCheckedChange={(checked) => 
                  setPrivacidade(prev => ({ ...prev, perfilPublico: checked }))
                }
                className="data-[state=checked]:bg-viver-yellow"
              />
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between">
              <div>
                <Label>Mostrar Histórico de Doações</Label>
                <p className="text-sm text-muted-foreground">
                  Exibir suas doações publicamente (sem valores)
                </p>
              </div>
              <Switch 
                checked={privacidade.mostrarDoacoes}
                onCheckedChange={(checked) => 
                  setPrivacidade(prev => ({ ...prev, mostrarDoacoes: checked }))
                }
                className="data-[state=checked]:bg-viver-yellow"
              />
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between">
              <div>
                <Label>Mostrar Horas Voluntárias</Label>
                <p className="text-sm text-muted-foreground">
                  Exibir suas horas de voluntariado no perfil
                </p>
              </div>
              <Switch 
                checked={privacidade.mostrarHorasVoluntarias}
                onCheckedChange={(checked) => 
                  setPrivacidade(prev => ({ ...prev, mostrarHorasVoluntarias: checked }))
                }
                className="data-[state=checked]:bg-viver-yellow"
              />
            </div>
          </CardContent>
        </Card>

        {/* Preferências Gerais */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="w-5 h-5" />
              Preferências Gerais
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Fuso Horário</Label>
              <Select value={preferencias.timezone} onValueChange={(valor) => 
                setPreferencias(prev => ({ ...prev, timezone: valor }))
              }>
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="America/Sao_Paulo">São Paulo (GMT-3)</SelectItem>
                  <SelectItem value="America/New_York">Nova York (GMT-4)</SelectItem>
                  <SelectItem value="Europe/London">Londres (GMT+0)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between">
              <div>
                <Label>Formato 24 Horas</Label>
                <p className="text-sm text-muted-foreground">
                  Usar formato 24h ao invés de AM/PM
                </p>
              </div>
              <Switch 
                checked={preferencias.formato24h}
                onCheckedChange={(checked) => 
                  setPreferencias(prev => ({ ...prev, formato24h: checked }))
                }
                className="data-[state=checked]:bg-viver-yellow"
              />
            </div>
          </CardContent>
        </Card>

        {/* Dados e Backup */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="w-5 h-5" />
              Dados e Backup
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Button variant="outline" className="w-full">
                Exportar Dados
              </Button>
              <Button variant="outline" className="w-full">
                Baixar Relatório
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              Seus dados são automaticamente salvos e sincronizados com segurança.
            </p>
          </CardContent>
        </Card>

        {/* Botão Salvar */}
        <div className="flex justify-end">
          <Button 
            onClick={salvarConfiguracoes}
            className="bg-viver-yellow hover:bg-viver-yellow/90 text-black"
          >
            Salvar Configurações
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ConfiguracoesScreen;
