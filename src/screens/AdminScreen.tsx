
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
      {/* Header aprimorado - layout horizontal */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-8">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 rounded-full bg-viver-yellow/20 flex items-center justify-center">
              <Heart className="h-8 w-8 text-viver-yellow" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Painel Administrativo</h1>
              <p className="text-lg text-gray-600">
                <strong>ONG Viver</strong> • Logado como: <span className="text-viver-yellow font-medium">{user.name}</span> ({user.role})
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              Sistema Ativo
            </div>
          </div>
        </div>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
        {/* Navegação horizontal */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-3">
          <TabsList className="w-full justify-start overflow-x-auto bg-transparent p-0 h-auto flex gap-2">
            <TabsTrigger 
              value="dashboard" 
              className="data-[state=active]:bg-viver-yellow data-[state=active]:text-black rounded-lg px-6 py-4 flex items-center gap-3 text-sm font-medium transition-all hover:bg-gray-100"
            >
              <BarChart3 className="h-5 w-5" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger 
              value="doacoes" 
              className="data-[state=active]:bg-viver-yellow data-[state=active]:text-black rounded-lg px-6 py-4 flex items-center gap-3 text-sm font-medium transition-all hover:bg-gray-100"
            >
              <Package className="h-5 w-5" />
              Doações Físicas
            </TabsTrigger>
            <TabsTrigger 
              value="testimonials" 
              className="data-[state=active]:bg-viver-yellow data-[state=active]:text-black rounded-lg px-6 py-4 flex items-center gap-3 text-sm font-medium transition-all hover:bg-gray-100"
            >
              <MessageSquare className="h-5 w-5" />
              Depoimentos
            </TabsTrigger>
            <TabsTrigger 
              value="events"
              className="data-[state=active]:bg-viver-yellow data-[state=active]:text-black rounded-lg px-6 py-4 flex items-center gap-3 text-sm font-medium transition-all hover:bg-gray-100"  
            >
              <CalendarDays className="h-5 w-5" />
              Eventos
            </TabsTrigger>
            {hasPermission(user.role, Permission.MANAGE_USERS) && (
              <TabsTrigger 
                value="users"
                className="data-[state=active]:bg-viver-yellow data-[state=active]:text-black rounded-lg px-6 py-4 flex items-center gap-3 text-sm font-medium transition-all hover:bg-gray-100"  
              >
                <Users className="h-5 w-5" />
                Usuários
              </TabsTrigger>
            )}
            <TabsTrigger 
              value="settings"
              className="data-[state=active]:bg-viver-yellow data-[state=active]:text-black rounded-lg px-6 py-4 flex items-center gap-3 text-sm font-medium transition-all hover:bg-gray-100"  
            >
              <Settings className="h-5 w-5" />
              Configurações
            </TabsTrigger>
          </TabsList>
        </div>
        
        {/* Conteúdo das abas */}
        <TabsContent value="dashboard" className="p-0">
          <AdminDashboard />
        </TabsContent>
        
        <TabsContent value="doacoes" className="p-0">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
            <DoacoesFisicasAdmin />
          </div>
        </TabsContent>
        
        <TabsContent value="testimonials" className="p-0">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
            <TestimonialManager />
          </div>
        </TabsContent>
        
        <TabsContent value="events" className="p-0">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-2">Gerenciamento de Eventos</h2>
                <p className="text-gray-600 text-lg">Organize e gerencie eventos da ONG Viver</p>
              </div>
              <Button className="bg-viver-yellow hover:bg-viver-yellow/90 text-black flex items-center gap-2">
                <CalendarDays className="h-5 w-5" />
                Adicionar Evento
              </Button>
            </div>
            <div className="text-center p-16 text-muted-foreground border-2 border-dashed border-gray-300 rounded-lg bg-gray-50">
              <CalendarDays className="h-16 w-16 mx-auto mb-6 text-gray-400" />
              <h3 className="text-xl font-medium text-gray-700 mb-3">
                Gerenciamento de Eventos
              </h3>
              <p className="text-gray-500 text-lg">
                Funcionalidade em desenvolvimento para criação e gerenciamento de eventos.
              </p>
            </div>
          </div>
        </TabsContent>
        
        {hasPermission(user.role, Permission.MANAGE_USERS) && (
          <TabsContent value="users" className="p-0">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
              <UserManagement />
            </div>
          </TabsContent>
        )}
        
        <TabsContent value="settings" className="p-0">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-2">Configurações do Sistema</h2>
                <p className="text-gray-600 text-lg">Gerencie configurações globais da plataforma</p>
              </div>
            </div>
            <div className="text-center p-16 text-muted-foreground border-2 border-dashed border-gray-300 rounded-lg bg-gray-50">
              <Settings className="h-16 w-16 mx-auto mb-6 text-gray-400" />
              <h3 className="text-xl font-medium text-gray-700 mb-3">
                Configurações do Sistema
              </h3>
              <p className="text-gray-500 text-lg">
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
