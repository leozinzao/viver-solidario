
import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import { UserRole, Permission, hasPermission } from '@/lib/permissions';
import TestimonialManager from '@/components/admin/TestimonialManager';
import DoacoesFisicasAdmin from '@/components/admin/DoacoesFisicasAdmin';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { 
  ShieldAlert, 
  Users, 
  Settings, 
  CalendarDays, 
  MessageSquare,
  Package,
  AlertTriangle
} from 'lucide-react';

const AdminScreen: React.FC = () => {
  const { user, checkAdminAccess } = useAuth();
  const [activeTab, setActiveTab] = useState('doacoes');
  const [hasAccess, setHasAccess] = useState<boolean | null>(null);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const verifyAccess = async () => {
      if (!user) {
        setHasAccess(false);
        setIsChecking(false);
        return;
      }

      try {
        // Verificar se tem permissão básica baseada no role
        const hasRolePermission = hasPermission(user.role, Permission.ACCESS_ADMIN_PANEL);
        
        // Verificar no banco de dados também
        const hasDbAccess = await checkAdminAccess();
        
        const finalAccess = hasRolePermission || hasDbAccess;
        setHasAccess(finalAccess);
        
        console.log('Verificação de acesso admin:', {
          userRole: user.role,
          hasRolePermission,
          hasDbAccess,
          finalAccess
        });
      } catch (error) {
        console.error('Erro ao verificar acesso admin:', error);
        setHasAccess(false);
      } finally {
        setIsChecking(false);
      }
    };

    verifyAccess();
  }, [user, checkAdminAccess]);

  if (isChecking) {
    return (
      <div className="flutter-screen p-4">
        <div className="flex items-center justify-center min-h-[200px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-viver-yellow mx-auto mb-2"></div>
            <p className="text-gray-600">Verificando permissões...</p>
          </div>
        </div>
      </div>
    );
  }
  
  if (!user || hasAccess === false) {
    return (
      <div className="flutter-screen p-4">
        <Alert variant="destructive">
          <ShieldAlert className="h-4 w-4" />
          <AlertTitle>Acesso Restrito</AlertTitle>
          <AlertDescription>
            Você não possui permissão para acessar esta área. 
            {user && (
              <div className="mt-2 text-sm">
                <strong>Seu nível de acesso:</strong> {user.role}
                <br />
                <strong>Email:</strong> {user.email}
              </div>
            )}
          </AlertDescription>
        </Alert>
        
        {user && user.role === UserRole.donor && (
          <Alert className="mt-4">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Informação</AlertTitle>
            <AlertDescription>
              Para ter acesso ao painel administrativo, você precisa ser promovido a voluntário ou administrador interno. 
              Entre em contato com a equipe da ONG Viver.
            </AlertDescription>
          </Alert>
        )}
      </div>
    );
  }
  
  return (
    <div className="flutter-screen p-4">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Painel Administrativo - ONG Viver</h1>
          <p className="text-sm text-gray-600 mt-1">
            Logado como: <strong>{user.name}</strong> ({user.role})
          </p>
        </div>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <div className="border-b">
          <TabsList className="w-full justify-start overflow-x-auto bg-transparent p-0">
            <TabsTrigger 
              value="doacoes" 
              className="data-[state=active]:border-b-2 data-[state=active]:border-viver-yellow rounded-none px-4 py-2"
            >
              <Package className="h-4 w-4 mr-2" />
              Doações Físicas
            </TabsTrigger>
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
            {hasPermission(user.role, Permission.MANAGE_USERS) && (
              <TabsTrigger 
                value="users"
                className="data-[state=active]:border-b-2 data-[state=active]:border-viver-yellow rounded-none px-4 py-2"  
              >
                <Users className="h-4 w-4 mr-2" />
                Usuários
              </TabsTrigger>
            )}
            <TabsTrigger 
              value="settings"
              className="data-[state=active]:border-b-2 data-[state=active]:border-viver-yellow rounded-none px-4 py-2"  
            >
              <Settings className="h-4 w-4 mr-2" />
              Configurações
            </TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="doacoes" className="p-0">
          <DoacoesFisicasAdmin />
        </TabsContent>
        
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
        
        {hasPermission(user.role, Permission.MANAGE_USERS) && (
          <TabsContent value="users" className="p-0 border rounded-lg bg-card shadow-sm">
            <div className="p-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Gerenciamento de Usuários</h2>
                <Button>Adicionar Usuário</Button>
              </div>
              <div className="text-center p-8 text-muted-foreground border border-dashed rounded-md">
                Área para gerenciamento de usuários e permissões.
                <br />
                <span className="text-sm">Conteúdo a ser adicionado.</span>
              </div>
            </div>
          </TabsContent>
        )}
        
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
