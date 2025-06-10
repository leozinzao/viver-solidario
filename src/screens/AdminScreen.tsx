
import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import { UserRole, Permission, hasPermission } from '@/lib/permissions';
import TestimonialManager from '@/components/admin/TestimonialManager';
import DoacoesFisicasAdmin from '@/components/admin/DoacoesFisicasAdmin';
import UserManagement from '@/components/admin/UserManagement';
import AdminDashboard from '@/components/admin/AdminDashboard';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { 
  ShieldAlert, 
  Users, 
  Settings, 
  CalendarDays, 
  MessageSquare,
  Package,
  AlertTriangle,
  BarChart3,
  Heart
} from 'lucide-react';

const AdminScreen: React.FC = () => {
  const { user, checkAdminAccess } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');
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
    <div className="flutter-screen p-4 bg-gray-50 min-h-screen">
      {/* Header aprimorado */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-viver-yellow/20 flex items-center justify-center">
              <Heart className="h-6 w-6 text-viver-yellow" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Painel Administrativo</h1>
              <p className="text-sm text-gray-600 mt-1">
                <strong>ONG Viver</strong> • Logado como: <span className="text-viver-yellow font-medium">{user.name}</span> ({user.role})
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
              Sistema Ativo
            </div>
          </div>
        </div>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        {/* Navegação aprimorada */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-2">
          <TabsList className="w-full justify-start overflow-x-auto bg-transparent p-0 h-auto">
            <TabsTrigger 
              value="dashboard" 
              className="data-[state=active]:bg-viver-yellow data-[state=active]:text-black rounded-md px-4 py-3 flex items-center gap-2 text-sm font-medium transition-all"
            >
              <BarChart3 className="h-4 w-4" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger 
              value="doacoes" 
              className="data-[state=active]:bg-viver-yellow data-[state=active]:text-black rounded-md px-4 py-3 flex items-center gap-2 text-sm font-medium transition-all"
            >
              <Package className="h-4 w-4" />
              Doações Físicas
            </TabsTrigger>
            <TabsTrigger 
              value="testimonials" 
              className="data-[state=active]:bg-viver-yellow data-[state=active]:text-black rounded-md px-4 py-3 flex items-center gap-2 text-sm font-medium transition-all"
            >
              <MessageSquare className="h-4 w-4" />
              Depoimentos
            </TabsTrigger>
            <TabsTrigger 
              value="events"
              className="data-[state=active]:bg-viver-yellow data-[state=active]:text-black rounded-md px-4 py-3 flex items-center gap-2 text-sm font-medium transition-all"  
            >
              <CalendarDays className="h-4 w-4" />
              Eventos
            </TabsTrigger>
            {hasPermission(user.role, Permission.MANAGE_USERS) && (
              <TabsTrigger 
                value="users"
                className="data-[state=active]:bg-viver-yellow data-[state=active]:text-black rounded-md px-4 py-3 flex items-center gap-2 text-sm font-medium transition-all"  
              >
                <Users className="h-4 w-4" />
                Usuários
              </TabsTrigger>
            )}
            <TabsTrigger 
              value="settings"
              className="data-[state=active]:bg-viver-yellow data-[state=active]:text-black rounded-md px-4 py-3 flex items-center gap-2 text-sm font-medium transition-all"  
            >
              <Settings className="h-4 w-4" />
              Configurações
            </TabsTrigger>
          </TabsList>
        </div>
        
        {/* Conteúdo das abas */}
        <TabsContent value="dashboard" className="p-0">
          <AdminDashboard />
        </TabsContent>
        
        <TabsContent value="doacoes" className="p-0">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <DoacoesFisicasAdmin />
          </div>
        </TabsContent>
        
        <TabsContent value="testimonials" className="p-0">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <TestimonialManager />
          </div>
        </TabsContent>
        
        <TabsContent value="events" className="p-0">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">Gerenciamento de Eventos</h2>
                <p className="text-gray-600 text-sm mt-1">Organize e gerencie eventos da ONG Viver</p>
              </div>
              <Button className="bg-viver-yellow hover:bg-viver-yellow/90 text-black">
                <CalendarDays className="h-4 w-4 mr-2" />
                Adicionar Evento
              </Button>
            </div>
            <div className="text-center p-12 text-muted-foreground border-2 border-dashed border-gray-300 rounded-lg bg-gray-50">
              <CalendarDays className="h-12 w-12 mx-auto mb-4 text-gray-400" />
              <h3 className="text-lg font-medium text-gray-700 mb-2">
                Gerenciamento de Eventos
              </h3>
              <p className="text-sm text-gray-500">
                Funcionalidade em desenvolvimento para criação e gerenciamento de eventos.
              </p>
            </div>
          </div>
        </TabsContent>
        
        {hasPermission(user.role, Permission.MANAGE_USERS) && (
          <TabsContent value="users" className="p-0">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <UserManagement />
            </div>
          </TabsContent>
        )}
        
        <TabsContent value="settings" className="p-0">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">Configurações do Sistema</h2>
                <p className="text-gray-600 text-sm mt-1">Gerencie configurações globais da plataforma</p>
              </div>
            </div>
            <div className="text-center p-12 text-muted-foreground border-2 border-dashed border-gray-300 rounded-lg bg-gray-50">
              <Settings className="h-12 w-12 mx-auto mb-4 text-gray-400" />
              <h3 className="text-lg font-medium text-gray-700 mb-2">
                Configurações do Sistema
              </h3>
              <p className="text-sm text-gray-500">
                Área para configurações avançadas do sistema e personalização da ONG.
              </p>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminScreen;
