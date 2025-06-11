
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
          <CardContent className="p-5 flex items-center gap-4">
            {/* Ícone */}
            <div className={`p-3 rounded-xl ${bgColor} border ${color.replace('text-', 'border-')} shadow-sm flex-shrink-0`}>
              <Icon className={`h-6 w-6 ${color}`} />
            </div>
            
            {/* Conteúdo principal */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <p className="text-sm font-semibold text-gray-600 uppercase tracking-wider truncate">
                  {title}
                </p>
                {change && (
                  <div className="flex items-center gap-1">
                    {trend === TREND_UP && (
                      <TrendingUp className="h-4 w-4 text-green-500" />
                    )}
                    {trend === TREND_DOWN && (
                      <TrendingDown className="h-4 w-4 text-red-500" />
                    )}
                    {trend === TREND_NEUTRAL && (
                      <AlertTriangle className="h-4 w-4 text-orange-500" />
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
              
              <p className={`text-2xl lg:text-3xl font-bold ${color} leading-none mb-1`}>
                {value}
              </p>
              
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
      <div className="flex flex-col gap-4 mb-6 w-full">
        {Array.from({ length: 4 }).map((_, i) => (
          <Card key={i} className="w-full border-0 shadow-sm">
            <CardContent className="p-5 flex items-center gap-4 animate-pulse">
              <div className="h-12 w-12 bg-gray-200 rounded-xl flex-shrink-0"></div>
              <div className="flex-1">
                <div className="h-3 bg-gray-200 rounded mb-2 w-24"></div>
                <div className="h-6 bg-gray-200 rounded mb-1 w-16"></div>
                <div className="h-2 bg-gray-200 rounded w-20"></div>
              </div>
              <div className="flex items-center gap-1">
                <div className="h-4 w-4 bg-gray-200 rounded"></div>
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
      title: "Total de Doações",
      value: stats.total || 0,
      icon: Package,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      change: "+12% este mês",
      trend: TREND_UP,
      description: "Doações registradas",
      tooltip: "Número total de doações físicas registradas no sistema. Inclui todas as doações independente do status atual."
    },
    {
      title: "Aguardando",
      value: stats.cadastrada || 0,
      icon: Clock,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      change: "Requer atenção",
      trend: TREND_NEUTRAL,
      description: "Pendentes aprovação",
      tooltip: "Doações que foram cadastradas mas ainda não foram processadas pela equipe. Estas doações precisam de análise e aprovação."
    },
    {
      title: "Aprovadas",
      value: stats.recebida || 0,
      icon: CheckCircle,
      color: "text-green-600",
      bgColor: "bg-green-50",
      change: "+8% semana",
      trend: TREND_UP,
      description: "Doações finalizadas",
      tooltip: "Doações que foram aprovadas, recebidas e processadas com sucesso. Estas contribuem para o impacto social da ONG."
    },
    {
      title: "Usuários Ativos",
      value: "156",
      icon: Users,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      change: "+5 novos",
      trend: TREND_UP,
      description: "Doadores ativos",
      tooltip: "Número de usuários que fizeram pelo menos uma doação nos últimos 30 dias. Representa o engajamento da comunidade."
    }
  ];

  return (
    <div className="flex flex-col gap-4 mb-6 w-full">
      {kpis.map((kpi, index) => (
        <KPICard key={index} {...kpi} />
      ))}
    </div>
  );
};

export default AdminKPICards;
