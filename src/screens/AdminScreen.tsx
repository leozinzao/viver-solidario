
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
  Heart
} from 'lucide-react';

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
      <div className="min-h-screen p-4">
        <div className="flex items-center justify-center min-h-[200px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-viver-yellow mx-auto mb-2"></div>
            <p className="text-gray-600 text-sm">Verificando permissões...</p>
          </div>
        </div>
      </div>
    );
  }
  
  if (!user || hasAccess === false) {
    return (
      <div className="min-h-screen p-4">
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
    <div className="min-h-screen bg-gray-50 p-2 sm:p-4">
      {/* Header mobile-first */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6 mb-4 sm:mb-6">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-viver-yellow/20 flex items-center justify-center">
              <Heart className="h-5 w-5 sm:h-6 sm:w-6 text-viver-yellow" />
            </div>
            <div className="flex-1 min-w-0">
              <h1 className="text-lg sm:text-2xl font-bold text-gray-900 truncate">Painel Admin</h1>
              <p className="text-xs sm:text-sm text-gray-600 truncate">
                <strong>ONG Viver</strong> • {user.name} ({user.role})
              </p>
            </div>
          </div>
          
          <div className="flex justify-center sm:justify-end">
            <div className="px-2 sm:px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium flex items-center gap-1">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              Sistema Ativo
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
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4 sm:space-y-6">
        {/* Navegação horizontal mobile-friendly */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-1 sm:p-2">
          <TabsList className="w-full justify-start overflow-x-auto bg-transparent p-0 h-auto flex gap-1 scrollbar-hide">
            <TabsTrigger 
              value="dashboard" 
              className="data-[state=active]:bg-viver-yellow data-[state=active]:text-black rounded-md px-2 sm:px-4 py-2 sm:py-3 flex items-center gap-1 sm:gap-2 text-xs sm:text-sm font-medium transition-all hover:bg-gray-100 whitespace-nowrap"
            >
              <BarChart3 className="h-3 w-3 sm:h-4 sm:w-4" />
              <span className="hidden sm:inline">Dashboard</span>
            </TabsTrigger>
            <TabsTrigger 
              value="doacoes" 
              className="data-[state=active]:bg-viver-yellow data-[state=active]:text-black rounded-md px-2 sm:px-4 py-2 sm:py-3 flex items-center gap-1 sm:gap-2 text-xs sm:text-sm font-medium transition-all hover:bg-gray-100 whitespace-nowrap"
            >
              <Package className="h-3 w-3 sm:h-4 sm:w-4" />
              <span className="hidden sm:inline">Doações</span>
            </TabsTrigger>
            <TabsTrigger 
              value="testimonials" 
              className="data-[state=active]:bg-viver-yellow data-[state=active]:text-black rounded-md px-2 sm:px-4 py-2 sm:py-3 flex items-center gap-1 sm:gap-2 text-xs sm:text-sm font-medium transition-all hover:bg-gray-100 whitespace-nowrap"
            >
              <MessageSquare className="h-3 w-3 sm:h-4 sm:w-4" />
              <span className="hidden sm:inline">Depoimentos</span>
            </TabsTrigger>
            <TabsTrigger 
              value="events"
              className="data-[state=active]:bg-viver-yellow data-[state=active]:text-black rounded-md px-2 sm:px-4 py-2 sm:py-3 flex items-center gap-1 sm:gap-2 text-xs sm:text-sm font-medium transition-all hover:bg-gray-100 whitespace-nowrap"  
            >
              <CalendarDays className="h-3 w-3 sm:h-4 sm:w-4" />
              <span className="hidden sm:inline">Eventos</span>
            </TabsTrigger>
            {hasPermission(user.role, Permission.MANAGE_USERS) && (
              <TabsTrigger 
                value="users"
                className="data-[state=active]:bg-viver-yellow data-[state=active]:text-black rounded-md px-2 sm:px-4 py-2 sm:py-3 flex items-center gap-1 sm:gap-2 text-xs sm:text-sm font-medium transition-all hover:bg-gray-100 whitespace-nowrap"  
              >
                <Users className="h-3 w-3 sm:h-4 sm:w-4" />
                <span className="hidden sm:inline">Usuários</span>
              </TabsTrigger>
            )}
            <TabsTrigger 
              value="settings"
              className="data-[state=active]:bg-viver-yellow data-[state=active]:text-black rounded-md px-2 sm:px-4 py-2 sm:py-3 flex items-center gap-1 sm:gap-2 text-xs sm:text-sm font-medium transition-all hover:bg-gray-100 whitespace-nowrap"  
            >
              <Settings className="h-3 w-3 sm:h-4 sm:w-4" />
              <span className="hidden sm:inline">Config</span>
            </TabsTrigger>
          </TabsList>
        </div>
        
        {/* Conteúdo das abas */}
        <TabsContent value="dashboard" className="p-0">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
            <div className="text-center p-6 sm:p-12">
              <BarChart3 className="h-12 w-12 sm:h-16 sm:w-16 mx-auto mb-4 text-viver-yellow" />
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
                Dashboard Principal
              </h3>
              <p className="text-sm sm:text-base text-gray-600">
                Visão geral das métricas e KPIs principais do sistema estão exibidos acima.
              </p>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="doacoes" className="p-0">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-3 sm:p-6">
            <DoacoesFisicasAdmin />
          </div>
        </TabsContent>
        
        <TabsContent value="testimonials" className="p-0">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-3 sm:p-6">
            <TestimonialManager />
          </div>
        </TabsContent>
        
        <TabsContent value="events" className="p-0">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-3 sm:p-6">
            <div className="flex flex-col gap-4 sm:gap-6">
              <div className="flex flex-col sm:flex-row justify-between gap-4">
                <div>
                  <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-1">Eventos</h2>
                  <p className="text-sm sm:text-base text-gray-600">Organize e gerencie eventos da ONG Viver</p>
                </div>
                <Button className="bg-viver-yellow hover:bg-viver-yellow/90 text-black flex items-center gap-2" size="sm">
                  <CalendarDays className="h-4 w-4" />
                  <span className="text-sm">Adicionar Evento</span>
                </Button>
              </div>
              <div className="text-center p-8 sm:p-12 text-muted-foreground border-2 border-dashed border-gray-300 rounded-lg bg-gray-50">
                <CalendarDays className="h-8 w-8 sm:h-12 sm:w-12 mx-auto mb-4 text-gray-400" />
                <h3 className="text-base sm:text-lg font-medium text-gray-700 mb-2">
                  Gerenciamento de Eventos
                </h3>
                <p className="text-sm sm:text-base text-gray-500">
                  Funcionalidade em desenvolvimento para criação e gerenciamento de eventos.
                </p>
              </div>
            </div>
          </div>
        </TabsContent>
        
        {hasPermission(user.role, Permission.MANAGE_USERS) && (
          <TabsContent value="users" className="p-0">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-3 sm:p-6">
              <UserManagement />
            </div>
          </TabsContent>
        )}
        
        <TabsContent value="settings" className="p-0">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-3 sm:p-6">
            <div className="flex flex-col gap-4 sm:gap-6">
              <div>
                <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-1">Configurações</h2>
                <p className="text-sm sm:text-base text-gray-600">Gerencie configurações globais da plataforma</p>
              </div>
              <div className="text-center p-8 sm:p-12 text-muted-foreground border-2 border-dashed border-gray-300 rounded-lg bg-gray-50">
                <Settings className="h-8 w-8 sm:h-12 sm:w-12 mx-auto mb-4 text-gray-400" />
                <h3 className="text-base sm:text-lg font-medium text-gray-700 mb-2">
                  Configurações do Sistema
                </h3>
                <p className="text-sm sm:text-base text-gray-500">
                  Área para configurações avançadas do sistema e personalização da ONG.
                </p>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminScreen;
