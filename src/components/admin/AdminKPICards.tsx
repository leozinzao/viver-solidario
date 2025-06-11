
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
        <Card className={`${bgColor} min-h-[150px] border-0 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden flex`}>
          <CardContent className="p-4 flex flex-col justify-between h-full w-full">
            {/* Header com ícone e título */}
            <div className="flex items-center gap-3 mb-3">
              <div className={`p-2.5 rounded-xl ${bgColor} border ${color.replace('text-', 'border-')} shadow-sm`}>
                <Icon className={`h-5 w-5 ${color}`} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-gray-600 uppercase tracking-wider truncate">
                  {title}
                </p>
              </div>
            </div>
            
            {/* Valor principal */}
            <div className="flex-1 flex flex-col justify-center mb-3">
              <p className={`text-3xl font-bold ${color} leading-none mb-1 truncate`}>
                {value}
              </p>
              {description && (
                <p className="text-xs text-gray-500 leading-tight truncate">
                  {description}
                </p>
              )}
            </div>
            
            {/* Indicador de mudança */}
            {change && (
              <div className="flex items-center gap-2 pt-2 border-t border-gray-100">
                {trend === TREND_UP && (
                  <TrendingUp className="h-3.5 w-3.5 text-green-500 flex-shrink-0" />
                )}
                {trend === TREND_DOWN && (
                  <TrendingDown className="h-3.5 w-3.5 text-red-500 flex-shrink-0" />
                )}
                {trend === TREND_NEUTRAL && (
                  <AlertTriangle className="h-3.5 w-3.5 text-orange-500 flex-shrink-0" />
                )}
                <span className={`text-xs font-medium truncate ${
                  trend === TREND_UP ? 'text-green-600' : 
                  trend === TREND_DOWN ? 'text-red-600' : 'text-orange-600'
                }`}>
                  {change}
                </span>
              </div>
            )}
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6 items-stretch">
        {Array.from({ length: 4 }).map((_, i) => (
          <Card key={i} className="min-h-[150px] border-0 shadow-sm flex">
            <CardContent className="p-4 flex flex-col justify-between h-full w-full animate-pulse">
              <div className="flex items-center gap-3 mb-3">
                <div className="h-9 w-9 bg-gray-200 rounded-xl"></div>
                <div className="h-3 bg-gray-200 rounded w-20"></div>
              </div>
              <div className="flex-1 flex flex-col justify-center mb-3">
                <div className="h-8 bg-gray-200 rounded mb-2 w-16"></div>
                <div className="h-2 bg-gray-200 rounded w-24"></div>
              </div>
              <div className="flex items-center gap-2 pt-2 border-t border-gray-100">
                <div className="h-3 w-3 bg-gray-200 rounded"></div>
                <div className="h-2 bg-gray-200 rounded w-16"></div>
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
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6 items-stretch">
      {kpis.map((kpi, index) => (
        <KPICard key={index} {...kpi} />
      ))}
    </div>
  );
};

export default AdminKPICards;
