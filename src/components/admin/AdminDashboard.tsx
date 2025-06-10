
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Package, 
  Users, 
  Heart, 
  TrendingUp, 
  Clock, 
  CheckCircle,
  Calendar,
  MessageSquare
} from 'lucide-react';
import { useDoacoesFisicasAdmin } from '@/hooks/useDoacoesFisicasAdmin';

const AdminDashboard: React.FC = () => {
  const { stats, loading } = useDoacoesFisicasAdmin();

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-6">
                <div className="h-6 bg-gray-200 rounded w-1/2 mb-3"></div>
                <div className="h-8 bg-gray-200 rounded w-1/3"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  const dashboardStats = [
    {
      title: 'Total de Doações',
      value: stats.total || 0,
      icon: Package,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      description: 'Doações cadastradas no sistema'
    },
    {
      title: 'Aguardando Análise',
      value: stats.cadastrada || 0,
      icon: Clock,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-200',
      description: 'Doações pendentes de análise'
    },
    {
      title: 'Aceitas pela ONG',
      value: stats.aceita || 0,
      icon: Heart,
      color: 'text-viver-yellow',
      bgColor: 'bg-yellow-50',
      borderColor: 'border-yellow-200',
      description: 'Doações aceitas e aguardando retirada'
    },
    {
      title: 'Finalizadas',
      value: stats.recebida || 0,
      icon: CheckCircle,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
      description: 'Doações recebidas com sucesso'
    }
  ];

  const recentActivities = [
    {
      icon: Package,
      title: 'Nova doação cadastrada',
      description: 'Roupas de inverno - João Silva',
      time: '2 min atrás',
      color: 'text-blue-600'
    },
    {
      icon: Heart,
      title: 'Doação aceita',
      description: 'Alimentos não perecíveis - Maria Santos',
      time: '15 min atrás',
      color: 'text-viver-yellow'
    },
    {
      icon: CheckCircle,
      title: 'Doação finalizada',
      description: 'Brinquedos educativos - Pedro Costa',
      time: '1 hora atrás',
      color: 'text-green-600'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Header com boas-vindas - horizontal e espaçoso */}
      <Card className="bg-gradient-to-r from-viver-yellow/10 to-viver-yellow/5 border-viver-yellow/20">
        <CardContent className="p-8">
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 rounded-full bg-viver-yellow/20 flex items-center justify-center">
              <Heart className="h-8 w-8 text-viver-yellow" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Bem-vindo ao Painel da ONG Viver
              </h2>
              <p className="text-gray-600 text-lg">
                Gerencie doações, usuários e acompanhe o impacto da sua organização
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Estatísticas principais - layout horizontal */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {dashboardStats.map((stat, index) => {
          const IconComponent = stat.icon;
          return (
            <Card key={index} className={`${stat.bgColor} ${stat.borderColor} border hover:shadow-lg transition-all duration-200`}>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className={`w-16 h-16 rounded-xl ${stat.bgColor} border ${stat.borderColor} flex items-center justify-center`}>
                    <IconComponent className={`h-8 w-8 ${stat.color}`} />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-600 mb-1">
                      {stat.title}
                    </p>
                    <p className={`text-3xl font-bold ${stat.color} mb-2`}>
                      {stat.value}
                    </p>
                    <p className="text-sm text-gray-500 leading-relaxed">
                      {stat.description}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Grid horizontal com informações adicionais */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Atividades Recentes */}
        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-3 text-xl">
              <TrendingUp className="h-6 w-6 text-viver-yellow" />
              Atividades Recentes
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentActivities.map((activity, index) => {
              const IconComponent = activity.icon;
              return (
                <div key={index} className="flex items-center gap-4 p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                  <div className="w-12 h-12 rounded-full bg-white border flex items-center justify-center shrink-0">
                    <IconComponent className={`h-5 w-5 ${activity.color}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900 mb-1">
                      {activity.title}
                    </p>
                    <p className="text-gray-600 text-sm mb-1">
                      {activity.description}
                    </p>
                    <p className="text-gray-400 text-xs">
                      {activity.time}
                    </p>
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>

        {/* Resumo Mensal */}
        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-3 text-xl">
              <Calendar className="h-6 w-6 text-viver-yellow" />
              Resumo do Mês
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                  <Package className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-blue-600 mb-1">
                    {Math.floor((stats.total || 0) * 0.7)}
                  </p>
                  <p className="text-sm text-blue-800">Doações este mês</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4 p-4 bg-green-50 rounded-lg border border-green-200">
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                  <Heart className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-green-600 mb-1">
                    {Math.floor((stats.recebida || 0) * 0.8)}
                  </p>
                  <p className="text-sm text-green-800">Famílias atendidas</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Meta mensal</span>
                <span className="font-medium">75%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div className="bg-viver-yellow h-3 rounded-full" style={{ width: '75%' }}></div>
              </div>
              <p className="text-sm text-gray-500 leading-relaxed">
                Você está atingindo 75% da meta de doações deste mês
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Ações Rápidas - layout horizontal */}
      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-3 text-xl">
            <MessageSquare className="h-6 w-6 text-viver-yellow" />
            Ações Rápidas
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center gap-4 p-6 border border-gray-200 rounded-lg hover:shadow-md transition-all duration-200 cursor-pointer group">
              <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Package className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900 mb-1">Gerenciar Doações</h3>
                <p className="text-sm text-gray-600">
                  Visualize e gerencie todas as doações físicas
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-4 p-6 border border-gray-200 rounded-lg hover:shadow-md transition-all duration-200 cursor-pointer group">
              <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Users className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900 mb-1">Usuários</h3>
                <p className="text-sm text-gray-600">
                  Gerenciar usuários e voluntários
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-4 p-6 border border-gray-200 rounded-lg hover:shadow-md transition-all duration-200 cursor-pointer group">
              <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center group-hover:scale-110 transition-transform">
                <MessageSquare className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900 mb-1">Depoimentos</h3>
                <p className="text-sm text-gray-600">
                  Moderar e publicar depoimentos
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;
