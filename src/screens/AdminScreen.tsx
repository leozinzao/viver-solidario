
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import { UserRole, Permission, hasPermission } from '@/lib/permissions';
import TestimonialManager from '@/components/admin/TestimonialManager';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { 
  ShieldAlert, 
  Users, 
  Settings, 
  CalendarDays, 
  MessageSquare 
} from 'lucide-react';

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
  
  return (
    <div className="flutter-screen p-4">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Painel Administrativo</h1>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <div className="border-b">
          <TabsList className="w-full justify-start overflow-x-auto bg-transparent p-0">
            <TabsTrigger 
              value="testimonials" 
              className="data-[state=active]:border-b-2 data-[state=active]:border-viver-yellow rounded-none px-4 py-2"
            >
              <MessageSquare className="h-4 w-4 mr-2" />
              Depoimentos
            </TabsTrigger>
            <TabsTrigger 
              value="events"
              className="data-[state=active]:border-b-2 data-[state=active]:border-viver-yellow rounded-none px-4 py-2"  
            >
              <CalendarDays className="h-4 w-4 mr-2" />
              Eventos
            </TabsTrigger>
            <TabsTrigger 
              value="users"
              className="data-[state=active]:border-b-2 data-[state=active]:border-viver-yellow rounded-none px-4 py-2"  
            >
              <Users className="h-4 w-4 mr-2" />
              Usuários
            </TabsTrigger>
            <TabsTrigger 
              value="settings"
              className="data-[state=active]:border-b-2 data-[state=active]:border-viver-yellow rounded-none px-4 py-2"  
            >
              <Settings className="h-4 w-4 mr-2" />
              Configurações
            </TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="testimonials" className="p-0 border rounded-lg bg-card shadow-sm">
          <div className="p-4">
            <TestimonialManager />
          </div>
        </TabsContent>
        
        <TabsContent value="events" className="p-0 border rounded-lg bg-card shadow-sm">
          <div className="p-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Gerenciamento de Eventos</h2>
              <Button>Adicionar Evento</Button>
            </div>
            <div className="text-center p-8 text-muted-foreground border border-dashed rounded-md">
              Área para gerenciamento de eventos.
              <br />
              <span className="text-sm">Conteúdo a ser adicionado.</span>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="users" className="p-0 border rounded-lg bg-card shadow-sm">
          <div className="p-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Gerenciamento de Usuários</h2>
              <Button>Adicionar Usuário</Button>
            </div>
            <div className="text-center p-8 text-muted-foreground border border-dashed rounded-md">
              Área para gerenciamento de usuários.
              <br />
              <span className="text-sm">Conteúdo a ser adicionado.</span>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="settings" className="p-0 border rounded-lg bg-card shadow-sm">
          <div className="p-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Configurações</h2>
            </div>
            <div className="text-center p-8 text-muted-foreground border border-dashed rounded-md">
              Área para configurações do sistema.
              <br />
              <span className="text-sm">Conteúdo a ser adicionado.</span>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminScreen;
