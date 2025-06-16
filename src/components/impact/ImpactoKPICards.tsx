
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { 
  Gift,
  Users,
  MapPin,
  TrendingUp
} from 'lucide-react';
import { useEstatisticasImpacto } from '@/hooks/useEstatisticasImpacto';

interface ImpactoKPICardProps {
  title: string;
  value: number;
  icon: React.ElementType;
  color: string;
  bgColor: string;
  description: string;
  tooltip: string;
}

const ImpactoKPICard: React.FC<ImpactoKPICardProps> = ({ 
  title, 
  value, 
  icon: Icon, 
  color, 
  bgColor, 
  description,
  tooltip 
}) => (
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger asChild>
        <Card className={`${bgColor} border-0 shadow-md hover:shadow-lg transition-all duration-200`}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
                <p className={`text-3xl font-bold ${color} mb-2`}>{value.toLocaleString()}</p>
                <p className="text-sm text-gray-500">{description}</p>
              </div>
              <div className={`p-3 rounded-full ${color.replace('text-', 'bg-').replace('-600', '-100')} border-2 ${color.replace('text-', 'border-')}`}>
                <Icon className={`h-8 w-8 ${color}`} />
              </div>
            </div>
          </CardContent>
        </Card>
      </TooltipTrigger>
      <TooltipContent>
        <p className="text-sm max-w-xs">{tooltip}</p>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
);

const ImpactoKPICards: React.FC = () => {
  const { estatisticas, loading } = useEstatisticasImpacto();

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {Array.from({ length: 4 }).map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="h-4 bg-gray-200 rounded mb-2 w-24"></div>
                  <div className="h-8 bg-gray-200 rounded mb-2 w-16"></div>
                  <div className="h-3 bg-gray-200 rounded w-32"></div>
                </div>
                <div className="h-12 w-12 bg-gray-200 rounded-full"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  const kpis = [
    {
      title: "Doações Entregues",
      value: estatisticas.total_doacoes_entregues,
      icon: Gift,
      color: "text-green-600",
      bgColor: "bg-green-50",
      description: "Total finalizado",
      tooltip: "Número total de doações que foram entregues e impactaram beneficiários."
    },
    {
      title: "Pessoas Impactadas",
      value: estatisticas.total_pessoas_impactadas,
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      description: "Vidas transformadas",
      tooltip: "Total de pessoas que foram diretamente beneficiadas pelas doações entregues."
    },
    {
      title: "Localidades Atendidas",
      value: estatisticas.total_localidades_atendidas,
      icon: MapPin,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      description: "Regiões alcançadas",
      tooltip: "Número de localidades diferentes onde as doações foram entregues."
    },
    {
      title: "Taxa de Impacto",
      value: estatisticas.total_doacoes_entregues > 0 
        ? Math.round((estatisticas.total_pessoas_impactadas / estatisticas.total_doacoes_entregues) * 100) / 100
        : 0,
      icon: TrendingUp,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      description: "Pessoas por doação",
      tooltip: "Média de pessoas beneficiadas por cada doação entregue."
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {kpis.map((kpi, index) => (
        <ImpactoKPICard key={index} {...kpi} />
      ))}
    </div>
  );
};

export default ImpactoKPICards;
