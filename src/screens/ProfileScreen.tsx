
import React from 'react';
import { useTheme } from '@/context/ThemeContext';
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { History, User, LogOut, Moon, Edit } from '@/components/icons';

const ProfileScreen: React.FC = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <div className="flutter-screen bg-background p-4">
      <h1 className="text-2xl font-bold mb-6 text-foreground">Perfil</h1>
      
      <div className="flex items-center justify-center mb-8">
        <div className="relative">
          <div className="w-24 h-24 rounded-full bg-solidario-purple/20 flex items-center justify-center">
            <User className="w-12 h-12 text-solidario-purple" />
          </div>
          <button className="absolute bottom-0 right-0 bg-solidario-purple rounded-full p-1 border-2 border-background">
            <Edit className="w-4 h-4 text-white" />
          </button>
        </div>
        <div className="ml-4">
          <h2 className="text-xl font-semibold">Nome do Usuário</h2>
          <p className="text-sm text-muted-foreground">usuario@email.com</p>
        </div>
      </div>
      
      <div className="space-y-3">
        <div className="flutter-card">
          <div className="flex items-center">
            <div className="mr-3 p-2 bg-solidario-purple/10 rounded-full">
              <History className="w-5 h-5 text-solidario-purple" />
            </div>
            <div>
              <h3 className="font-medium">Histórico de Ações</h3>
              <p className="text-xs text-muted-foreground">Visualize suas atividades recentes</p>
            </div>
          </div>
        </div>
        
        <div className="flutter-card">
          <div className="flex items-center">
            <div className="mr-3 p-2 bg-solidario-purple/10 rounded-full">
              <Edit className="w-5 h-5 text-solidario-purple" />
            </div>
            <div>
              <h3 className="font-medium">Editar Dados</h3>
              <p className="text-xs text-muted-foreground">Atualize suas informações pessoais</p>
            </div>
          </div>
        </div>
        
        <div className="flutter-card">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="mr-3 p-2 bg-solidario-purple/10 rounded-full">
                <Moon className="w-5 h-5 text-solidario-purple" />
              </div>
              <div>
                <h3 className="font-medium">Modo Escuro</h3>
                <p className="text-xs text-muted-foreground">Alternar tema de exibição</p>
              </div>
            </div>
            <Switch 
              checked={isDarkMode}
              onCheckedChange={toggleTheme}
              className="data-[state=checked]:bg-solidario-purple"
            />
          </div>
        </div>
        
        <div className="flutter-card">
          <div className="flex items-center text-solidario-red">
            <div className="mr-3 p-2 bg-solidario-red/10 rounded-full">
              <LogOut className="w-5 h-5 text-solidario-red" />
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
