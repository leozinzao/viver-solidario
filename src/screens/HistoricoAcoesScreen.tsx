
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Clock, Heart, Users, Calendar } from '@/components/icons';
import { useNavigation } from '@/context/NavigationContext';

const HistoricoAcoesScreen: React.FC = () => {
  const { navigateToScreen } = useNavigation();

  // Dados mockados para demonstração
  const historicoAcoes = [
    {
      id: 1,
      tipo: 'doacao',
      titulo: 'Doação para Tratamento de Maria',
      descricao: 'Doação de R$ 100,00 para ajudar no tratamento',
      data: '2025-01-29',
      valor: 'R$ 100,00',
      status: 'concluida',
      icon: Heart,
      color: 'text-viver-yellow'
    },
    {
      id: 2,
      tipo: 'voluntariado',
      titulo: 'Participação em Evento Beneficente',
      descricao: 'Ajudou na organização do evento de arrecadação',
      data: '2025-01-25',
      valor: '4 horas',
      status: 'concluida',
      icon: Users,
      color: 'text-viver-yellow'
    },
    {
      id: 3,
      tipo: 'evento',
      titulo: 'Inscrição no Workshop de Cuidados',
      descricao: 'Participou do workshop sobre cuidados com crianças em tratamento',
      data: '2025-01-20',
      valor: 'Participação',
      status: 'concluida',
      icon: Calendar,
      color: 'text-viver-yellow'
    },
    {
      id: 4,
      tipo: 'doacao',
      titulo: 'Doação de Alimentos',
      descricao: 'Doação de cestas básicas para famílias assistidas',
      data: '2025-01-15',
      valor: '5 cestas',
      status: 'concluida',
      icon: Heart,
      color: 'text-viver-yellow'
    },
    {
      id: 5,
      tipo: 'voluntariado',
      titulo: 'Acompanhamento Psicológico',
      descricao: 'Apoio emocional para família em tratamento',
      data: '2025-01-10',
      valor: '2 horas',
      status: 'pendente',
      icon: Users,
      color: 'text-viver-yellow'
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'concluida':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Concluída</Badge>;
      case 'pendente':
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Pendente</Badge>;
      case 'cancelada':
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Cancelada</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">Desconhecido</Badge>;
    }
  };

  const formatarData = (data: string) => {
    return new Date(data).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  return (
    <div className="flutter-screen bg-gradient-to-b from-viver-yellow/5 to-white p-4 min-h-screen">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8 animate-fade-in">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigateToScreen('profile')}
          className="hover:bg-viver-yellow/10"
        >
          <ArrowLeft className="h-5 w-5 text-viver-yellow" />
        </Button>
        <h1 className="text-2xl font-bold text-viver-yellow">Histórico de Ações</h1>
      </div>

      {/* Resumo */}
      <Card className="flutter-card mb-6 animate-fade-in bg-white/90 backdrop-blur-sm shadow-lg">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg text-gray-800 font-semibold">Resumo das Atividades</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-viver-yellow">5</div>
              <div className="text-sm text-gray-600">Total de Ações</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-viver-yellow">4</div>
              <div className="text-sm text-gray-600">Concluídas</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-viver-yellow-medium">R$ 100</div>
              <div className="text-sm text-gray-600">Total Doado</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Lista de Ações */}
      <div className="space-y-4 animate-fade-in">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Ações Recentes</h2>
        
        {historicoAcoes.map((acao, index) => (
          <Card 
            key={acao.id} 
            className="flutter-card bg-white/90 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-200 animate-scale-in"
            style={{animationDelay: `${index * 100}ms`}}
          >
            <CardContent className="p-4">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-viver-yellow/20 flex items-center justify-center flex-shrink-0">
                  <acao.icon className={`h-6 w-6 ${acao.color}`} />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-gray-800 text-sm leading-tight">{acao.titulo}</h3>
                    {getStatusBadge(acao.status)}
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-3 leading-relaxed">{acao.descricao}</p>
                  
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      <span>{formatarData(acao.data)}</span>
                    </div>
                    <div className="font-medium text-viver-yellow">
                      {acao.valor}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Botão para ver mais */}
      <div className="mt-8 text-center animate-fade-in">
        <Button 
          variant="outline" 
          className="border-viver-yellow text-viver-yellow hover:bg-viver-yellow/10"
        >
          Ver Histórico Completo
        </Button>
      </div>

      {/* Mensagem motivacional */}
      <Card className="flutter-card mt-6 animate-fade-in bg-gradient-to-br from-viver-yellow/10 to-viver-yellow-medium/10 border-viver-yellow/30">
        <CardContent className="p-4 text-center">
          <h3 className="font-semibold text-viver-yellow mb-2">Continue Fazendo a Diferença!</h3>
          <p className="text-sm text-gray-700">
            Cada ação sua contribui para um mundo melhor. Obrigado por fazer parte da nossa missão.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default HistoricoAcoesScreen;
