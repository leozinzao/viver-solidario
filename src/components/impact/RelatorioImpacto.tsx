
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Download, Calendar, MapPin, Users, Gift } from 'lucide-react';
import { useEstatisticasImpacto } from '@/hooks/useEstatisticasImpacto';
import ImpactoKPICards from './ImpactoKPICards';
import GraficosImpacto from './GraficosImpacto';

const RelatorioImpacto: React.FC = () => {
  const { estatisticas, loading } = useEstatisticasImpacto();

  const handleExportarRelatorio = () => {
    const dadosRelatorio = {
      data_geracao: new Date().toISOString(),
      estatisticas: estatisticas
    };
    
    const blob = new Blob([JSON.stringify(dadosRelatorio, null, 2)], {
      type: 'application/json'
    });
    
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `relatorio-impacto-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-64 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-96 mb-6"></div>
        </div>
        <ImpactoKPICards />
        <GraficosImpacto />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header do Relatório */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Relatório de Impacto Social
          </h1>
          <p className="text-gray-600">
            Acompanhe o impacto real das doações da ONG Viver na comunidade
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="outline" className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            Atualizado em tempo real
          </Badge>
          <Button 
            onClick={handleExportarRelatorio}
            variant="outline"
            className="flex items-center gap-2"
          >
            <Download className="h-4 w-4" />
            Exportar Relatório
          </Button>
        </div>
      </div>

      {/* KPIs de Impacto */}
      <ImpactoKPICards />

      {/* Gráficos de Impacto */}
      <GraficosImpacto />

      {/* Resumo Detalhado */}
      <Card>
        <CardHeader>
          <CardTitle>Resumo do Impacto</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="flex items-center gap-3 p-4 bg-green-50 rounded-lg">
              <Gift className="h-8 w-8 text-green-600" />
              <div>
                <p className="text-sm text-green-700 font-medium">Doações Finalizadas</p>
                <p className="text-2xl font-bold text-green-800">
                  {estatisticas.total_doacoes_entregues}
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg">
              <Users className="h-8 w-8 text-blue-600" />
              <div>
                <p className="text-sm text-blue-700 font-medium">Pessoas Beneficiadas</p>
                <p className="text-2xl font-bold text-blue-800">
                  {estatisticas.total_pessoas_impactadas}
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-4 bg-purple-50 rounded-lg">
              <MapPin className="h-8 w-8 text-purple-600" />
              <div>
                <p className="text-sm text-purple-700 font-medium">Localidades Atendidas</p>
                <p className="text-2xl font-bold text-purple-800">
                  {estatisticas.total_localidades_atendidas}
                </p>
              </div>
            </div>
          </div>

          {/* Lista de Categorias com Maior Impacto */}
          {estatisticas.por_categoria.length > 0 && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-3">Categorias com Maior Impacto</h3>
              <div className="space-y-2">
                {estatisticas.por_categoria
                  .sort((a, b) => b.pessoas_impactadas - a.pessoas_impactadas)
                  .slice(0, 5)
                  .map((categoria, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium">{categoria.categoria}</p>
                        <p className="text-sm text-gray-600">
                          {categoria.quantidade_doacoes} doações entregues
                        </p>
                      </div>
                      <Badge variant="secondary">
                        {categoria.pessoas_impactadas} pessoas
                      </Badge>
                    </div>
                  ))
                }
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default RelatorioImpacto;
