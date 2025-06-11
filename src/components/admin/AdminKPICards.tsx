
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
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

// Constants para evitar strings mágicas
const TREND_UP = "up" as const;
const TREND_DOWN = "down" as const;
const TREND_NEUTRAL = "neutral" as const;

interface KPICardProps {
  title: string;
  value: number | string;
  icon: React.ElementType;
  color: string;
  bgColor: string;
  change?: string;
  trend?: typeof TREND_UP | typeof TREND_DOWN | typeof TREND_NEUTRAL;
  description?: string;
  tooltip?: string;
}

const KPICard: React.FC<KPICardProps> = ({ 
  title, 
  value, 
  icon: Icon, 
  color, 
  bgColor, 
  change, 
  trend,
  description,
  tooltip 
}) => (
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger asChild>
        <Card className={`${bgColor} w-full border-0 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden`}>
          <CardContent className="p-4 flex items-center gap-3">
            {/* Ícone */}
            <div className={`p-2 rounded-lg ${bgColor} border ${color.replace('text-', 'border-')} shadow-sm flex-shrink-0`}>
              <Icon className={`h-5 w-5 ${color}`} />
            </div>
            
            {/* Conteúdo principal */}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-900 mb-1">
                {title}
              </p>
              
              <div className="flex items-center gap-2 mb-1">
                <span className={`text-2xl font-bold ${color} leading-none`}>
                  {value}
                </span>
                {change && (
                  <div className="flex items-center gap-1">
                    {trend === TREND_UP && (
                      <TrendingUp className="h-3 w-3 text-green-500" />
                    )}
                    {trend === TREND_DOWN && (
                      <TrendingDown className="h-3 w-3 text-red-500" />
                    )}
                    {trend === TREND_NEUTRAL && (
                      <AlertTriangle className="h-3 w-3 text-orange-500" />
                    )}
                    <span className={`text-xs font-medium ${
                      trend === TREND_UP ? 'text-green-600' : 
                      trend === TREND_DOWN ? 'text-red-600' : 'text-orange-600'
                    }`}>
                      {change}
                    </span>
                  </div>
                )}
              </div>
              
              {description && (
                <p className="text-xs text-gray-500 leading-tight">
                  {description}
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </TooltipTrigger>
      {tooltip && (
        <TooltipContent side="top" className="max-w-xs">
          <p className="text-sm">{tooltip}</p>
        </TooltipContent>
      )}
    </Tooltip>
  </TooltipProvider>
);

const AdminKPICards: React.FC = () => {
  const { stats, loading } = useDoacoesFisicasAdmin();

  if (loading) {
    return (
      <div className="space-y-3 mb-6 w-full">
        {Array.from({ length: 4 }).map((_, i) => (
          <Card key={i} className="w-full border-0 shadow-sm">
            <CardContent className="p-4 flex items-center gap-3 animate-pulse">
              <div className="h-9 w-9 bg-gray-200 rounded-lg flex-shrink-0"></div>
              <div className="flex-1">
                <div className="h-3 bg-gray-200 rounded mb-2 w-24"></div>
                <div className="h-6 bg-gray-200 rounded mb-1 w-16"></div>
                <div className="h-2 bg-gray-200 rounded w-20"></div>
              </div>
              <div className="flex items-center gap-1">
                <div className="h-3 w-3 bg-gray-200 rounded"></div>
                <div className="h-2 bg-gray-200 rounded w-12"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  const kpis = [
    {
      title: "Pendentes",
      value: stats.cadastrada || 0,
      icon: Clock,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      change: "Aguardando aprovação",
      trend: TREND_NEUTRAL,
      description: "Aguardando aprovação",
      tooltip: "Doações que foram cadastradas mas ainda não foram processadas pela equipe. Estas doações precisam de análise e aprovação."
    },
    {
      title: "Aprovadas",
      value: stats.aceita || 0,
      icon: CheckCircle,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      change: "Aceitas pela ONG",
      trend: TREND_UP,
      description: "Aceitas pela ONG",
      tooltip: "Doações que foram aprovadas pela equipe da ONG e estão aguardando a coleta ou entrega."
    },
    {
      title: "Recebidas",
      value: stats.recebida || 0,
      icon: Package,
      color: "text-green-600",
      bgColor: "bg-green-50",
      change: "Finalizadas",
      trend: TREND_UP,
      description: "Finalizadas",
      tooltip: "Doações que foram aprovadas, recebidas e processadas com sucesso. Estas contribuem para o impacto social da ONG."
    },
    {
      title: "Total",
      value: stats.total || 0,
      icon: TrendingUp,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      change: "Todas as doações",
      trend: TREND_UP,
      description: "Todas as doações",
      tooltip: "Número total de doações físicas registradas no sistema. Inclui todas as doações independente do status atual."
    }
  ];

  return (
    <div className="space-y-3 mb-6 w-full">
      {kpis.map((kpi, index) => (
        <KPICard key={index} {...kpi} />
      ))}
    </div>
  );
};

export default AdminKPICards;
