
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
  // Buscar usuários ativos (voluntários + doadores)
  const { data: totalUsuarios = 0 } = useQuery({
    queryKey: ['dashboard-usuarios'],
    queryFn: async () => {
      const [voluntarios, doadores] = await Promise.all([
        supabase.from('voluntarios').select('id', { count: 'exact', head: true }),
        supabase.from('doadores').select('id', { count: 'exact', head: true })
      ]);
      
      const countVoluntarios = voluntarios.count || 0;
      const countDoadores = doadores.count || 0;
      
      return countVoluntarios + countDoadores;
    },
  });

  // Buscar eventos
  const { data: totalEventos = 0 } = useQuery({
    queryKey: ['dashboard-eventos'],
    queryFn: async () => {
      const { count } = await supabase
        .from('eventos')
        .select('id', { count: 'exact', head: true });
      
      return count || 0;
    },
  });

  // Buscar notificações como proxy para depoimentos/mensagens
  const { data: totalNotificacoes = 0 } = useQuery({
    queryKey: ['dashboard-notificacoes'],
    queryFn: async () => {
      const { count } = await supabase
        .from('notificacoes_doacoes')
        .select('id', { count: 'exact', head: true });
      
      return count || 0;
    },
  });

  // Calcular doações totais para impacto
  const { data: impactoTotal = 0 } = useQuery({
    queryKey: ['dashboard-impacto'],
    queryFn: async () => {
      const [doacoesFisicas, doacoesFinanceiras] = await Promise.all([
        supabase.from('doacoes_fisicas_novas').select('id', { count: 'exact', head: true }),
        supabase.from('doacoes').select('id', { count: 'exact', head: true })
      ]);
      
      const countFisicas = doacoesFisicas.count || 0;
      const countFinanceiras = doacoesFinanceiras.count || 0;
      
      return countFisicas + countFinanceiras;
    },
  });

  const dashboardKpis = [
    {
      title: "Usuários Cadastrados",
      value: totalUsuarios,
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      change: "Total no sistema",
      trend: "up" as const,
      description: "Voluntários e doadores",
      tooltip: "Número total de usuários cadastrados no sistema (voluntários + doadores)."
    },
    {
      title: "Eventos Cadastrados",
      value: totalEventos,
      icon: Calendar,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      change: "Eventos ativos",
      trend: "up" as const,
      description: "Total de eventos",
      tooltip: "Total de eventos cadastrados no sistema da ONG."
    },
    {
      title: "Notificações",
      value: totalNotificacoes,
      icon: MessageSquare,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      change: "Sistema ativo",
      trend: "up" as const,
      description: "Comunicações do sistema",
      tooltip: "Notificações enviadas pelo sistema para comunicação com usuários."
    },
    {
      title: "Impacto Total",
      value: impactoTotal,
      icon: Heart,
      color: "text-red-600",
      bgColor: "bg-red-50",
      change: "Doações processadas",
      trend: "up" as const,
      description: "Total de doações",
      tooltip: "Número total de doações (físicas e financeiras) processadas pela ONG."
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
