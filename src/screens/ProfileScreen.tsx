
import React from 'react';
import { useTheme } from '@/context/ThemeContext';
import { useAuth } from '@/context/AuthContext';
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { History, User, LogOut, Moon, Edit, Settings, Shield, Lock } from '@/components/icons';

const ProfileScreen: React.FC = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const { user, logout, hasPermission } = useAuth();

  const getUserRoleBadge = () => {
    if (!user) return null;
    
    switch (user.role) {
      case 'internal':
        return <Badge className="bg-viver-yellow text-black">Acesso Interno</Badge>;
      case 'volunteer':
        return <Badge className="bg-green-500">Voluntário</Badge>;
      case 'donor':
        return <Badge className="bg-blue-500">Doador</Badge>;
      default:
        return <Badge className="bg-gray-500">Visitante</Badge>;
    }
  };

  return (
    <div className="flutter-screen bg-background p-4">
      <h1 className="text-2xl font-bold mb-6 text-foreground">Perfil</h1>
      
      <div className="flex items-center justify-center mb-8">
        <div className="relative">
          <div className="w-24 h-24 rounded-full bg-viver-yellow/20 flex items-center justify-center">
            <User className="w-12 h-12 text-viver-yellow" />
          </div>
          <button className="absolute bottom-0 right-0 bg-viver-yellow rounded-full p-1 border-2 border-background">
            <Edit className="w-4 h-4 text-black" />
          </button>
        </div>
        <div className="ml-4">
          <h2 className="text-xl font-semibold">{user?.name || 'Nome do Usuário'}</h2>
          <p className="text-sm text-muted-foreground">{user?.email || 'usuario@email.com'}</p>
          <div className="mt-1">{getUserRoleBadge()}</div>
        </div>
      </div>
      
      <div className="space-y-3">
        <div className="flutter-card">
          <div className="flex items-center">
            <div className="mr-3 p-2 bg-viver-yellow/10 rounded-full">
              <History className="w-5 h-5 text-viver-yellow" />
            </div>
            <div>
              <h3 className="font-medium">Histórico de Ações</h3>
              <p className="text-xs text-muted-foreground">Visualize suas atividades recentes</p>
            </div>
          </div>
        </div>
        
        <div className="flutter-card">
          <div className="flex items-center">
            <div className="mr-3 p-2 bg-viver-yellow/10 rounded-full">
              <Edit className="w-5 h-5 text-viver-yellow" />
            </div>
            <div>
              <h3 className="font-medium">Editar Dados</h3>
              <p className="text-xs text-muted-foreground">Atualize suas informações pessoais</p>
            </div>
          </div>
        </div>
        
        {hasPermission('internal') && (
          <div className="flutter-card border-l-4 border-l-viver-yellow">
            <div className="flex items-center">
              <div className="mr-3 p-2 bg-viver-yellow/10 rounded-full">
                <Shield className="w-5 h-5 text-viver-yellow" />
              </div>
              <div>
                <h3 className="font-medium">Painel Administrativo</h3>
                <p className="text-xs text-muted-foreground">Acesso às funções administrativas</p>
              </div>
            </div>
          </div>
        )}
        
        {hasPermission(['internal', 'volunteer']) && (
          <div className="flutter-card border-l-4 border-l-viver-yellow">
            <div className="flex items-center">
              <div className="mr-3 p-2 bg-viver-yellow/10 rounded-full">
                <Lock className="w-5 h-5 text-viver-yellow" />
              </div>
              <div>
                <h3 className="font-medium">Área Restrita</h3>
                <p className="text-xs text-muted-foreground">Acesso a documentos e informações restritas</p>
              </div>
            </div>
          </div>
        )}
        
        {hasPermission('internal') && (
          <div className="flutter-card">
            <div className="flex items-center">
              <div className="mr-3 p-2 bg-viver-yellow/10 rounded-full">
                <Settings className="w-5 h-5 text-viver-yellow" />
              </div>
              <div>
                <h3 className="font-medium">Configurações do Sistema</h3>
                <p className="text-xs text-muted-foreground">Ajustes e parametrizações internas</p>
              </div>
            </div>
          </div>
        )}
        
        <div className="flutter-card">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="mr-3 p-2 bg-viver-yellow/10 rounded-full">
                <Moon className="w-5 h-5 text-viver-yellow" />
              </div>
              <div>
                <h3 className="font-medium">Modo Escuro</h3>
                <p className="text-xs text-muted-foreground">Alternar tema de exibição</p>
              </div>
            </div>
            <Switch 
              checked={isDarkMode}
              onCheckedChange={toggleTheme}
              className="data-[state=checked]:bg-viver-yellow"
            />
          </div>
        </div>
        
        <div className="flutter-card">
          <div className="flex items-center text-red-500" onClick={logout}>
            <div className="mr-3 p-2 bg-red-500/10 rounded-full">
              <LogOut className="w-5 h-5 text-red-500" />
            </div>
            <div>
              <h3 className="font-medium">Sair</h3>
              <p className="text-xs opacity-70">Encerrar sessão no aplicativo</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-8 text-center">
        <p className="text-xs text-muted-foreground">Viver Solidário v1.0.0</p>
      </div>
    </div>
  );
};

export default ProfileScreen;
