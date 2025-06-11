
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Package, 
  Users, 
  Calendar,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertTriangle
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
}

const KPICard: React.FC<KPICardProps> = ({ 
  title, 
  value, 
  icon: Icon, 
  color, 
  bgColor, 
  change, 
  trend 
}) => (
  <Card className={`${bgColor} border-l-4 ${color.replace('text-', 'border-l-')}`}>
    <CardContent className="p-3 sm:p-6">
      <div className="flex items-center justify-between">
        <div className="flex-1 min-w-0">
          <p className="text-xs sm:text-sm font-medium text-gray-600 truncate">{title}</p>
          <p className={`text-xl sm:text-3xl font-bold ${color} truncate`}>{value}</p>
          {change && (
            <div className="flex items-center mt-1">
              <TrendingUp className={`h-3 w-3 sm:h-4 sm:w-4 mr-1 ${
                trend === 'up' ? 'text-green-500' : 
                trend === 'down' ? 'text-red-500' : 'text-gray-500'
              }`} />
              <span className="text-xs sm:text-sm text-gray-600 truncate">{change}</span>
            </div>
          )}
        </div>
        <div className={`p-2 sm:p-3 rounded-full ${bgColor} ml-2`}>
          <Icon className={`h-5 w-5 sm:h-8 sm:w-8 ${color}`} />
        </div>
      </div>
    </CardContent>
  </Card>
);

const AdminKPICards: React.FC = () => {
  const { stats, loading } = useDoacoesFisicasAdmin();

  if (loading) {
    return (
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mb-4 sm:mb-8">
        {Array.from({ length: 4 }).map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardContent className="p-3 sm:p-6">
              <div className="h-3 sm:h-4 bg-gray-200 rounded mb-2"></div>
              <div className="h-6 sm:h-8 bg-gray-200 rounded mb-2"></div>
              <div className="h-2 sm:h-3 bg-gray-200 rounded w-1/2"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  const kpis = [
    {
      title: "Total",
      value: stats.total || 0,
      icon: Package,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      change: "+12%",
      trend: "up" as const
    },
    {
      title: "Pendentes",
      value: stats.cadastrada || 0,
      icon: Clock,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      change: "Requer atenção",
      trend: "neutral" as const
    },
    {
      title: "Finalizadas",
      value: stats.recebida || 0,
      icon: CheckCircle,
      color: "text-green-600",
      bgColor: "bg-green-50",
      change: "+8%",
      trend: "up" as const
    },
    {
      title: "Usuários",
      value: "156",
      icon: Users,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      change: "+5 novos",
      trend: "up" as const
    }
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mb-4 sm:mb-8">
      {kpis.map((kpi, index) => (
        <KPICard key={index} {...kpi} />
      ))}
    </div>
  );
};

export default AdminKPICards;
