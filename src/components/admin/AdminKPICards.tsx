
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Package, 
  Users, 
  Calendar,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertTriangle,
  TrendingDown
} from 'lucide-react';
import { useDoacoesFisicasAdmin } from '@/hooks/useDoacoesFisicasAdmin';

interface KPICardProps {
  title: string;
  value: number | string;
  icon: React.ElementType;
  color: string;
  bgColor: string;
  change?: string;
  trend?: 'up' | 'down' | 'neutral';
  description?: string;
}

const KPICard: React.FC<KPICardProps> = ({ 
  title, 
  value, 
  icon: Icon, 
  color, 
  bgColor, 
  change, 
  trend,
  description 
}) => (
  <Card className={`${bgColor} border-0 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden`}>
    <CardContent className="p-4">
      <div className="flex items-start justify-between">
        {/* Conteúdo principal */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-3">
            <div className={`p-2 rounded-lg ${bgColor} border ${color.replace('text-', 'border-')}`}>
              <Icon className={`h-5 w-5 ${color}`} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-gray-600 uppercase tracking-wide">
                {title}
              </p>
            </div>
          </div>
          
          {/* Valor principal */}
          <div className="mb-3">
            <p className={`text-2xl font-bold ${color} leading-none mb-1`}>
              {value}
            </p>
            {description && (
              <p className="text-xs text-gray-500 leading-tight">
                {description}
              </p>
            )}
          </div>
          
          {/* Indicador de mudança */}
          {change && (
            <div className="flex items-center gap-1">
              {trend === 'up' && (
                <TrendingUp className="h-3 w-3 text-green-500" />
              )}
              {trend === 'down' && (
                <TrendingDown className="h-3 w-3 text-red-500" />
              )}
              {trend === 'neutral' && (
                <AlertTriangle className="h-3 w-3 text-orange-500" />
              )}
              <span className={`text-xs font-medium ${
                trend === 'up' ? 'text-green-600' : 
                trend === 'down' ? 'text-red-600' : 'text-orange-600'
              }`}>
                {change}
              </span>
            </div>
          )}
        </div>
      </div>
    </CardContent>
  </Card>
);

const AdminKPICards: React.FC = () => {
  const { stats, loading } = useDoacoesFisicasAdmin();

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Card key={i} className="animate-pulse border-0 shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="h-9 w-9 bg-gray-200 rounded-lg"></div>
                <div className="h-3 bg-gray-200 rounded w-20"></div>
              </div>
              <div className="h-8 bg-gray-200 rounded mb-2 w-16"></div>
              <div className="h-2 bg-gray-200 rounded w-24"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  const kpis = [
    {
      title: "Total de Doações",
      value: stats.total || 0,
      icon: Package,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      change: "+12% este mês",
      trend: "up" as const,
      description: "Doações registradas"
    },
    {
      title: "Aguardando",
      value: stats.cadastrada || 0,
      icon: Clock,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      change: "Requer atenção",
      trend: "neutral" as const,
      description: "Pendentes aprovação"
    },
    {
      title: "Aprovadas",
      value: stats.recebida || 0,
      icon: CheckCircle,
      color: "text-green-600",
      bgColor: "bg-green-50",
      change: "+8% semana",
      trend: "up" as const,
      description: "Doações finalizadas"
    },
    {
      title: "Usuários",
      value: "156",
      icon: Users,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      change: "+5 novos",
      trend: "up" as const,
      description: "Doadores ativos"
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
      {kpis.map((kpi, index) => (
        <KPICard key={index} {...kpi} />
      ))}
    </div>
  );
};

export default AdminKPICards;
