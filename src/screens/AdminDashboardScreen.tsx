
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import { useNavigation } from '@/context/NavigationContext';
import DashboardKPICards from '@/components/admin/DashboardKPICards';
import AdminNotifications from '@/components/admin/notifications/AdminNotifications';
import { 
  Heart, 
  Package, 
  Users, 
  MessageSquare,
  Settings,
  BarChart3,
  ArrowRight
} from 'lucide-react';

const AdminDashboardScreen: React.FC = () => {
  const { user } = useAuth();
  const { navigateToScreen } = useNavigation();

  const quickActions = [
    {
      title: 'Gerenciar Doações',
      description: 'Visualize e gerencie todas as doações físicas',
      icon: Package,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      onClick: () => navigateToScreen('admin-doacoes')
    },
    {
      title: 'Gerenciar Usuários',
      description: 'Controle usuários e permissões',
      icon: Users,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
      onClick: () => navigateToScreen('admin-usuarios')
    },
    {
      title: 'Moderar Depoimentos',
      description: 'Revise e publique depoimentos',
      icon: MessageSquare,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200',
      onClick: () => navigateToScreen('admin-depoimentos')
    },
    {
      title: 'Configurações',
      description: 'Ajustes gerais do sistema',
      icon: Settings,
      color: 'text-gray-600',
      bgColor: 'bg-gray-50',
      borderColor: 'border-gray-200',
      onClick: () => navigateToScreen('admin-configuracoes')
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-viver-yellow/20 to-viver-yellow/40 flex items-center justify-center">
              <Heart className="h-8 w-8 text-viver-yellow" />
            </div>
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900">Dashboard Administrativo</h1>
              <p className="text-gray-600">
                Bem-vindo, <strong>{user?.name}</strong> • ONG Viver
              </p>
            </div>
            <div className="px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              Sistema Operacional
            </div>
          </div>
        </div>

        {/* Notificações */}
        <AdminNotifications />
        
        {/* KPIs */}
        <DashboardKPICards />
        
        {/* Ações Rápidas */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-6 w-6 text-viver-yellow" />
              Ações Rápidas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {quickActions.map((action, index) => {
                const IconComponent = action.icon;
                return (
                  <Card 
                    key={index} 
                    className={`${action.bgColor} ${action.borderColor} border hover:shadow-lg transition-all duration-200 cursor-pointer group`}
                    onClick={action.onClick}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4">
                        <div className={`w-14 h-14 rounded-lg ${action.bgColor} border ${action.borderColor} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                          <IconComponent className={`h-7 w-7 ${action.color}`} />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900 mb-2">{action.title}</h3>
                          <p className="text-sm text-gray-600">{action.description}</p>
                        </div>
                        <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-gray-600 transition-colors" />
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboardScreen;
