
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
  AlertTriangle,
  Bell,
  Activity
} from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';

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
  // Buscar total de voluntários
  const { data: totalVoluntarios = 0 } = useQuery({
    queryKey: ['dashboard-voluntarios'],
    queryFn: async () => {
      const { count } = await supabase
        .from('voluntarios')
        .select('id', { count: 'exact', head: true });
      
      return count || 0;
    },
  });

  // Buscar total de doadores
  const { data: totalDoadores = 0 } = useQuery({
    queryKey: ['dashboard-doadores'],
    queryFn: async () => {
      const { count } = await supabase
        .from('doadores')
        .select('id', { count: 'exact', head: true });
      
      return count || 0;
    },
  });

  // Buscar eventos ativos/futuros
  const { data: eventosAtivos = 0 } = useQuery({
    queryKey: ['dashboard-eventos-ativos'],
    queryFn: async () => {
      const { count } = await supabase
        .from('eventos')
        .select('id', { count: 'exact', head: true })
        .gte('data_inicio', new Date().toISOString().split('T')[0]);
      
      return count || 0;
    },
  });

  // Buscar atividades voluntárias cadastradas
  const { data: atividadesVoluntarias = 0 } = useQuery({
    queryKey: ['dashboard-atividades'],
    queryFn: async () => {
      const { count } = await supabase
        .from('atividades_voluntarias')
        .select('id', { count: 'exact', head: true });
      
      return count || 0;
    },
  });

  const dashboardKpis = [
    {
      title: "Voluntários",
      value: totalVoluntarios,
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      change: "Ativos no sistema",
      trend: "up" as const,
      description: "Voluntários cadastrados",
      tooltip: "Número total de voluntários cadastrados e ativos no sistema da ONG."
    },
    {
      title: "Doadores",
      value: totalDoadores,
      icon: Gift,
      color: "text-green-600",
      bgColor: "bg-green-50",
      change: "Registrados",
      trend: "up" as const,
      description: "Doadores no sistema",
      tooltip: "Pessoas que já fizeram ou se cadastraram para fazer doações para a ONG."
    },
    {
      title: "Eventos Ativos",
      value: eventosAtivos,
      icon: Calendar,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      change: "Programados",
      trend: "neutral" as const,
      description: "Eventos futuros",
      tooltip: "Eventos programados ou em andamento no sistema."
    },
    {
      title: "Atividades",
      value: atividadesVoluntarias,
      icon: Activity,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      change: "Disponíveis",
      trend: "up" as const,
      description: "Atividades voluntárias",
      tooltip: "Total de atividades voluntárias disponíveis para participação."
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
