import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import { UserRole, Permission, hasPermission } from '@/lib/permissions';
import TestimonialManager from '@/components/admin/TestimonialManager';
import DoacoesFisicasAdmin from '@/components/admin/DoacoesFisicasAdmin';
import UserManagement from '@/components/admin/UserManagement';
import AdminKPICards from '@/components/admin/AdminKPICards';
import AdminSearchAndFilters from '@/components/admin/AdminSearchAndFilters';
import AdminNotifications from '@/components/admin/AdminNotifications';
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
  Heart,
  Home
} from 'lucide-react';
import AdminNavigation from '@/components/admin/AdminNavigation';

const AdminScreen: React.FC = () => {
  const { user, checkAdminAccess } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [hasAccess, setHasAccess] = useState<boolean | null>(null);
  const [isChecking, setIsChecking] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    search: '',
    status: '',
    dateRange: '',
    category: ''
  });

  // Detectar se está sendo usado como página web
  const isWebPage = window.location.pathname === '/admin';

  useEffect(() => {
    const verifyAccess = async () => {
      if (!user) {
        setHasAccess(false);
        setIsChecking(false);
        return;
      }

      try {
        const hasRolePermission = hasPermission(user.role, Permission.ACCESS_ADMIN_PANEL);
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

  const handleFiltersChange = (newFilters: typeof filters) => {
    setFilters(newFilters);
    console.log('Filtros atualizados:', newFilters);
  };

  const handleExport = () => {
    console.log('Exportando dados...');
    // Implementar lógica de exportação
  };

  const handleRefresh = () => {
    console.log('Atualizando dados...');
    // Implementar lógica de refresh
  };

  if (isChecking) {
    return (
      <div className="min-h-screen p-4 bg-gray-50">
        {isWebPage && <AdminNavigation />}
        <div className="flex items-center justify-center min-h-[200px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-viver-yellow mx-auto mb-4"></div>
            <p className="text-gray-600">Verificando suas permissões...</p>
            <p className="text-sm text-gray-500 mt-1">Aguarde um momento</p>
          </div>
        </div>
      </div>
    );
  }
  
  if (!user || hasAccess === false) {
    return (
      <div className="min-h-screen p-4 bg-gray-50">
        {isWebPage && <AdminNavigation />}
        <div className="max-w-2xl mx-auto mt-8">
          <Alert variant="destructive" className="mb-4">
            <ShieldAlert className="h-5 w-5" />
            <AlertTitle className="text-lg font-semibold">Acesso Restrito ao Painel Administrativo</AlertTitle>
            <AlertDescription className="mt-2">
              Você não possui as permissões necessárias para acessar esta área do sistema. 
              {user && (
                <div className="mt-3 p-3 bg-red-50 rounded-md text-sm">
                  <strong>Informações da sua conta:</strong>
                  <br />• <strong>Nível de acesso:</strong> {user.role}
                  <br />• <strong>Email:</strong> {user.email}
                </div>
              )}
            </AlertDescription>
          </Alert>
          
          {user && user.role === UserRole.donor && (
            <Alert className="border-orange-200 bg-orange-50">
              <AlertTriangle className="h-5 w-5 text-orange-600" />
              <AlertTitle className="text-orange-800">Como obter acesso administrativo?</AlertTitle>
              <AlertDescription className="text-orange-700 mt-2">
                Para ter acesso ao painel administrativo, você precisa ser promovido a <strong>voluntário</strong> ou <strong>administrador</strong>. 
                <br />
                <br />
                Entre em contato com a equipe da <strong>ONG Viver</strong> para solicitar essa promoção.
              </AlertDescription>
            </Alert>
          )}
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-50 p-4">
      {isWebPage && <AdminNavigation />}
      {/* Container principal com largura máxima aumentada */}
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header melhorado */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-viver-yellow/20 to-viver-yellow/40 flex items-center justify-center">
                <Heart className="h-8 w-8 text-viver-yellow" />
              </div>
              <div className="flex-1 min-w-0">
                <h1 className="text-3xl font-bold text-gray-900">Painel Administrativo</h1>
                <div className="flex items-center gap-4 mt-2">
                  <p className="text-gray-600">
                    <strong>ONG Viver</strong> • {user.name}
                  </p>
                  <span className="px-3 py-1 bg-viver-yellow/20 text-viver-yellow rounded-full text-sm font-medium">
                    {user.role}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="flex justify-between items-center">
              <div className="text-sm text-gray-500">
                Última atualização: {new Date().toLocaleString('pt-BR')}
              </div>
              <div className="px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                Sistema Operacional
              </div>
            </div>
          </div>
        </div>

        {/* KPIs - apenas no dashboard */}
        {activeTab === 'dashboard' && <AdminKPICards />}
        
        {/* Notificações - apenas no dashboard */}
        {activeTab === 'dashboard' && <AdminNotifications />}
        
        {/* Busca e filtros globais */}
        <AdminSearchAndFilters
          onFiltersChange={handleFiltersChange}
          onExport={handleExport}
          onRefresh={handleRefresh}
          showFilters={showFilters}
          onToggleFilters={() => setShowFilters(!showFilters)}
        />
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          {/* Navegação melhorada - tabs horizontais ocupando toda largura */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <TabsList className="w-full justify-start bg-transparent p-2 h-auto flex flex-wrap gap-1">
              <TabsTrigger 
                value="dashboard" 
                className="data-[state=active]:bg-viver-yellow data-[state=active]:text-black rounded-md px-6 py-3 flex items-center gap-2 font-medium transition-all hover:bg-gray-100 flex-1 md:flex-none min-w-0"
              >
                <Home className="h-4 w-4" />
                <span className="hidden sm:inline">Dashboard</span>
              </TabsTrigger>
              <TabsTrigger 
                value="doacoes" 
                className="data-[state=active]:bg-viver-yellow data-[state=active]:text-black rounded-md px-6 py-3 flex items-center gap-2 font-medium transition-all hover:bg-gray-100 flex-1 md:flex-none min-w-0"
              >
                <Package className="h-4 w-4" />
                <span className="hidden sm:inline">Gestão de Doações</span>
              </TabsTrigger>
              <TabsTrigger 
                value="testimonials" 
                className="data-[state=active]:bg-viver-yellow data-[state=active]:text-black rounded-md px-6 py-3 flex items-center gap-2 font-medium transition-all hover:bg-gray-100 flex-1 md:flex-none min-w-0"
              >
                <MessageSquare className="h-4 w-4" />
                <span className="hidden sm:inline">Depoimentos</span>
              </TabsTrigger>
              <TabsTrigger 
                value="events"
                className="data-[state=active]:bg-viver-yellow data-[state=active]:text-black rounded-md px-6 py-3 flex items-center gap-2 font-medium transition-all hover:bg-gray-100 flex-1 md:flex-none min-w-0"  
              >
                <CalendarDays className="h-4 w-4" />
                <span className="hidden sm:inline">Eventos</span>
              </TabsTrigger>
              {hasPermission(user.role, Permission.MANAGE_USERS) && (
                <TabsTrigger 
                  value="users"
                  className="data-[state=active]:bg-viver-yellow data-[state=active]:text-black rounded-md px-6 py-3 flex items-center gap-2 font-medium transition-all hover:bg-gray-100 flex-1 md:flex-none min-w-0"  
                >
                  <Users className="h-4 w-4" />
                  <span className="hidden sm:inline">Usuários</span>
                </TabsTrigger>
              )}
              <TabsTrigger 
                value="settings"
                className="data-[state=active]:bg-viver-yellow data-[state=active]:text-black rounded-md px-6 py-3 flex items-center gap-2 font-medium transition-all hover:bg-gray-100 flex-1 md:flex-none min-w-0"  
              >
                <Settings className="h-4 w-4" />
                <span className="hidden sm:inline">Configurações</span>
              </TabsTrigger>
            </TabsList>
          </div>
          
          {/* Conteúdo das abas */}
          <TabsContent value="dashboard" className="p-0">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
              <div className="text-center">
                <BarChart3 className="h-20 w-20 mx-auto mb-6 text-viver-yellow" />
                <h3 className="text-2xl font-semibold text-gray-900 mb-3">
                  Bem-vindo ao Dashboard Principal
                </h3>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Aqui você encontra uma visão geral completa das métricas e indicadores principais do sistema. 
                  Use os KPIs acima e as notificações para acompanhar as atividades da ONG.
                </p>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="doacoes" className="p-0">
            <DoacoesFisicasAdmin />
          </TabsContent>
          
          <TabsContent value="testimonials" className="p-0">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <TestimonialManager />
            </div>
          </TabsContent>
          
          <TabsContent value="events" className="p-0">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex flex-col gap-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-2xl font-semibold text-gray-900 mb-2">Gestão de Eventos</h2>
                    <p className="text-gray-600">Organize e gerencie todos os eventos da ONG Viver</p>
                  </div>
                  <Button className="bg-viver-yellow hover:bg-viver-yellow/90 text-black font-medium">
                    <CalendarDays className="h-4 w-4 mr-2" />
                    Criar Novo Evento
                  </Button>
                </div>
                <div className="text-center p-12 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50">
                  <CalendarDays className="h-16 w-16 mx-auto mb-4 text-gray-400" />
                  <h3 className="text-xl font-medium text-gray-700 mb-2">
                    Módulo de Eventos em Desenvolvimento
                  </h3>
                  <p className="text-gray-500 max-w-md mx-auto">
                    Em breve você poderá criar, editar e gerenciar todos os eventos da organização através desta interface.
                  </p>
                </div>
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
              <div className="flex flex-col gap-6">
                <div>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-2">Configurações do Sistema</h2>
                  <p className="text-gray-600">Gerencie configurações globais e personalizações da plataforma</p>
                </div>
                <div className="text-center p-12 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50">
                  <Settings className="h-16 w-16 mx-auto mb-4 text-gray-400" />
                  <h3 className="text-xl font-medium text-gray-700 mb-2">
                    Área de Configurações
                  </h3>
                  <p className="text-gray-500 max-w-md mx-auto">
                    Funcionalidades avançadas de configuração e personalização do sistema estarão disponíveis em breve.
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminScreen;
