
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { useEstatisticasImpacto } from '@/hooks/useEstatisticasImpacto';

const CORES = [
  '#3b82f6', // blue
  '#10b981', // emerald
  '#f59e0b', // amber
  '#ef4444', // red
  '#8b5cf6', // violet
  '#06b6d4', // cyan
  '#84cc16', // lime
  '#f97316', // orange
];

const GraficosImpacto: React.FC = () => {
  const { estatisticas, loading } = useEstatisticasImpacto();

  if (loading) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {Array.from({ length: 2 }).map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardHeader>
              <div className="h-6 bg-gray-200 rounded w-48"></div>
            </CardHeader>
            <CardContent>
              <div className="h-64 bg-gray-200 rounded"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  const dadosCategoria = estatisticas.por_categoria.map((item, index) => ({
    ...item,
    cor: CORES[index % CORES.length]
  }));

  const dadosTipoBeneficiario = estatisticas.por_tipo_beneficiario.map((item, index) => ({
    ...item,
    cor: CORES[index % CORES.length]
  }));

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Gráfico por Categoria */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            Impacto por Categoria
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dadosCategoria}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="categoria" 
                  angle={-45}
                  textAnchor="end"
                  height={60}
                  fontSize={12}
                />
                <YAxis />
                <Tooltip 
                  formatter={(value, name) => [
                    value, 
                    name === 'pessoas_impactadas' ? 'Pessoas Impactadas' : 'Doações'
                  ]}
                  labelFormatter={(label) => `Categoria: ${label}`}
                />
                <Bar 
                  dataKey="quantidade_doacoes" 
                  fill="#3b82f6" 
                  name="Doações"
                  radius={[4, 4, 0, 0]}
                />
                <Bar 
                  dataKey="pessoas_impactadas" 
                  fill="#10b981" 
                  name="Pessoas Impactadas"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Gráfico por Tipo de Beneficiário */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            Distribuição por Tipo de Beneficiário
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={dadosTipoBeneficiario}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ tipo, pessoas_impactadas }) => `${tipo}: ${pessoas_impactadas}`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="pessoas_impactadas"
                >
                  {dadosTipoBeneficiario.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.cor} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value, name) => [value, 'Pessoas Impactadas']}
                  labelFormatter={(label) => `Tipo: ${label}`}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GraficosImpacto;
