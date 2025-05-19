
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/context/AuthContext';
import { Permission, hasPermission } from '@/lib/permissions';
import TestimonialManager from '@/components/admin/TestimonialManager';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { ShieldAlert } from 'lucide-react';

const AdminScreen: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('testimonials');
  
  if (!user || !hasPermission(user.role as any, Permission.ACCESS_ADMIN_PANEL)) {
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
      <h1 className="text-2xl font-bold mb-6">Painel Administrativo</h1>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="w-full justify-start">
          <TabsTrigger value="testimonials">Depoimentos</TabsTrigger>
          <TabsTrigger value="events">Eventos</TabsTrigger>
          <TabsTrigger value="users">Usuários</TabsTrigger>
          <TabsTrigger value="settings">Configurações</TabsTrigger>
        </TabsList>
        
        <TabsContent value="testimonials">
          <TestimonialManager />
        </TabsContent>
        
        <TabsContent value="events">
          <div className="text-center p-8 text-muted-foreground">
            Gerenciamento de eventos será implementado em breve.
          </div>
        </TabsContent>
        
        <TabsContent value="users">
          <div className="text-center p-8 text-muted-foreground">
            Gerenciamento de usuários será implementado em breve.
          </div>
        </TabsContent>
        
        <TabsContent value="settings">
          <div className="text-center p-8 text-muted-foreground">
            Configurações do sistema serão implementadas em breve.
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminScreen;
