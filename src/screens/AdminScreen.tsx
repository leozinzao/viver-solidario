
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import { UserRole, Permission, hasPermission } from '@/lib/permissions';
import TestimonialManager from '@/components/admin/TestimonialManager';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { ShieldAlert, Users, Settings, Database, ServerCog } from 'lucide-react';

const AdminScreen: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('testimonials');
  
  if (!user || !hasPermission(user.role, Permission.ACCESS_ADMIN_PANEL)) {
    return (
      <div className="flutter-screen p-4">
        <Alert variant="destructive">
          <ShieldAlert className="h-4 w-4" />
          <AlertTitle>Acesso Restrito</AlertTitle>
          <AlertDescription>
            Você não possui permissão para acessar esta área.
          </AlertDescription>
        </Alert>
      </div>
    );
  }
  
  // Verifica se é um administrador de nível superior
  const isFullAdmin = user.role === UserRole.admin;
  
  return (
    <div className="flutter-screen p-4">
      <h1 className="text-2xl font-bold mb-6">Painel Administrativo</h1>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="w-full justify-start overflow-x-auto">
          <TabsTrigger value="testimonials">Depoimentos</TabsTrigger>
          <TabsTrigger value="events">Eventos</TabsTrigger>
          <TabsTrigger value="users">Usuários</TabsTrigger>
          {isFullAdmin && <TabsTrigger value="system">Sistema</TabsTrigger>}
          {isFullAdmin && <TabsTrigger value="database">Banco de Dados</TabsTrigger>}
          <TabsTrigger value="settings">Configurações</TabsTrigger>
        </TabsList>
        
        <TabsContent value="testimonials">
          <TestimonialManager />
        </TabsContent>
        
        <TabsContent value="events">
          <div className="flex flex-col space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Gerenciamento de Eventos</h2>
              <Button>Adicionar Evento</Button>
            </div>
            <div className="text-center p-8 text-muted-foreground">
              Gerenciamento de eventos será implementado em breve.
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="users">
          <div className="flex flex-col space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Gerenciamento de Usuários</h2>
              {isFullAdmin && <Button>Adicionar Usuário</Button>}
            </div>
            <div className="flex items-center justify-center p-12 border rounded-md">
              <div className="text-center">
                <Users className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-medium mb-2">Gerenciamento de Usuários</h3>
                <p className="text-muted-foreground mb-4 max-w-md">
                  Aqui você poderá gerenciar usuários, atribuir papéis e permissões.
                </p>
                {isFullAdmin && (
                  <Button variant="outline">Configurar Permissões</Button>
                )}
              </div>
            </div>
          </div>
        </TabsContent>
        
        {isFullAdmin && (
          <TabsContent value="system">
            <div className="flex flex-col space-y-4">
              <h2 className="text-xl font-semibold">Configurações do Sistema</h2>
              <div className="flex items-center justify-center p-12 border rounded-md">
                <div className="text-center">
                  <ServerCog className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium mb-2">Administração do Sistema</h3>
                  <p className="text-muted-foreground mb-4 max-w-md">
                    Configure parâmetros avançados do sistema, incluindo serviços, APIs e integração com serviços externos.
                  </p>
                  <Button variant="outline">Configurações Avançadas</Button>
                </div>
              </div>
            </div>
          </TabsContent>
        )}
        
        {isFullAdmin && (
          <TabsContent value="database">
            <div className="flex flex-col space-y-4">
              <h2 className="text-xl font-semibold">Gerenciamento de Banco de Dados</h2>
              <div className="flex items-center justify-center p-12 border rounded-md">
                <div className="text-center">
                  <Database className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium mb-2">Administração de Dados</h3>
                  <p className="text-muted-foreground mb-4 max-w-md">
                    Gerencie dados do banco, execute backups e recuperações, monitore desempenho.
                  </p>
                  <div className="flex space-x-2 justify-center">
                    <Button variant="outline">Backup</Button>
                    <Button variant="outline">Relatórios</Button>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        )}
        
        <TabsContent value="settings">
          <div className="flex flex-col space-y-4">
            <h2 className="text-xl font-semibold">Configurações do Sistema</h2>
            <div className="flex items-center justify-center p-12 border rounded-md">
              <div className="text-center">
                <Settings className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-medium mb-2">Preferências do Sistema</h3>
                <p className="text-muted-foreground mb-4 max-w-md">
                  Configure as preferências gerais do sistema, como notificações, temas e opções de exibição.
                </p>
                <Button variant="outline">Editar Configurações</Button>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminScreen;
