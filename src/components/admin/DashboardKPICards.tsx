
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
  // Buscar total de usuários no sistema
  const { data: totalUsuarios = 0 } = useQuery({
    queryKey: ['dashboard-total-usuarios'],
    queryFn: async () => {
      const { data, error } = await supabase.auth.admin.listUsers();
      if (error) {
        console.error('Erro ao buscar usuários:', error);
        return 0;
      }
      return data.users.length;
    },
  });

  // Buscar total de eventos
  const { data: totalEventos = 0 } = useQuery({
    queryKey: ['dashboard-total-eventos'],
    queryFn: async () => {
      const { count } = await supabase
        .from('eventos')
        .select('id', { count: 'exact', head: true });
      
      return count || 0;
    },
  });

  // Buscar total de depoimentos
  const { data: totalDepoimentos = 0 } = useQuery({
    queryKey: ['dashboard-total-depoimentos'],
    queryFn: async () => {
      const { count } = await supabase
        .from('testimonials')
        .select('id', { count: 'exact', head: true });
      
      return count || 0;
    },
  });

  // Buscar impacto total (somar todas as doações)
  const { data: impactoTotal = 0 } = useQuery({
    queryKey: ['dashboard-impacto-total'],
    queryFn: async () => {
      const { count } = await supabase
        .from('doacoes_fisicas_novas')
        .select('id', { count: 'exact', head: true })
        .eq('status', 'recebida');
      
      return count || 0;
    },
  });

  const dashboardKpis = [
    {
      title: "Usuários Totais",
      value: totalUsuarios,
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      change: "Cadastrados",
      trend: "up" as const,
      description: "Total no sistema",
      tooltip: "Número total de usuários cadastrados no sistema (voluntários, doadores, administradores)."
    },
    {
      title: "Eventos",
      value: totalEventos,
      icon: Calendar,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      change: "Cadastrados",
      trend: "up" as const,
      description: "Total de eventos",
      tooltip: "Número total de eventos cadastrados no sistema da ONG."
    },
    {
      title: "Depoimentos",
      value: totalDepoimentos,
      icon: MessageSquare,
      color: "text-green-600",
      bgColor: "bg-green-50",
      change: "Publicados",
      trend: "up" as const,
      description: "Histórias compartilhadas",
      tooltip: "Depoimentos e histórias compartilhadas pelos beneficiados da ONG."
    },
    {
      title: "Impacto Total",
      value: impactoTotal,
      icon: Heart,
      color: "text-red-600",
      bgColor: "bg-red-50",
      change: "Doações finalizadas",
      trend: "up" as const,
      description: "Doações recebidas",
      tooltip: "Total de doações que foram recebidas e efetivamente contribuíram para o impacto social."
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
