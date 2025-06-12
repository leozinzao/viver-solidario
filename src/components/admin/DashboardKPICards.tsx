
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { 
  Users, 
  Calendar,
  TrendingUp,
  Heart,
  MessageSquare,
  Gift,
  CheckCircle,
  AlertTriangle
} from 'lucide-react';

interface KPICardProps {
  title: string;
  value: number | string;
  icon: React.ElementType;
  color: string;
  bgColor: string;
  change?: string;
  trend?: "up" | "down" | "neutral";
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
          <CardContent className="p-4 flex items-center gap-4">
            <div className={`p-3 rounded-full ${bgColor} border-2 ${color.replace('text-', 'border-')} shadow-md flex-shrink-0`}>
              <Icon className={`h-8 w-8 ${color}`} />
            </div>
            
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-900 mb-1">
                {title}
              </p>
              
              <div className="flex items-center gap-2 mb-1">
                <span className={`text-3xl font-bold ${color} leading-none`}>
                  {value}
                </span>
                {change && (
                  <div className="flex items-center gap-1">
                    {trend === "up" && <TrendingUp className="h-4 w-4 text-green-500" />}
                    {trend === "down" && <TrendingUp className="h-4 w-4 text-red-500 rotate-180" />}
                    {trend === "neutral" && <AlertTriangle className="h-4 w-4 text-orange-500" />}
                    <span className={`text-xs font-medium ${
                      trend === "up" ? 'text-green-600' : 
                      trend === "down" ? 'text-red-600' : 'text-orange-600'
                    }`}>
                      {change}
                    </span>
                  </div>
                )}
              </div>
              
              {description && (
                <p className="text-sm text-gray-600 leading-tight">
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

const DashboardKPICards: React.FC = () => {
  // Dados simulados para o dashboard geral
  const dashboardKpis = [
    {
      title: "Usuários Ativos",
      value: 342,
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      change: "+12% este mês",
      trend: "up" as const,
      description: "Total de usuários ativos",
      tooltip: "Número de usuários que acessaram o sistema nos últimos 30 dias."
    },
    {
      title: "Eventos Realizados",
      value: 25,
      icon: Calendar,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      change: "+3 este mês",
      trend: "up" as const,
      description: "Eventos realizados",
      tooltip: "Total de eventos organizados pela ONG no período atual."
    },
    {
      title: "Depoimentos",
      value: 89,
      icon: MessageSquare,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      change: "+7 novos",
      trend: "up" as const,
      description: "Depoimentos coletados",
      tooltip: "Depoimentos de beneficiários e voluntários sobre o trabalho da ONG."
    },
    {
      title: "Impacto Social",
      value: "98%",
      icon: Heart,
      color: "text-red-600",
      bgColor: "bg-red-50",
      change: "Satisfação",
      trend: "up" as const,
      description: "Índice de satisfação",
      tooltip: "Porcentagem de satisfação dos beneficiários com os serviços prestados."
    }
  ];

  return (
    <div className="flex flex-col gap-3 mb-6 w-full">
      {dashboardKpis.map((kpi, index) => (
        <KPICard key={index} {...kpi} />
      ))}
    </div>
  );
};

export default DashboardKPICards;
