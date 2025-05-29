
import React, { useState, useEffect } from 'react';
import { useNavigation } from '@/context/NavigationContext';
import { useAuth } from '@/context/AuthContext';
import { ArrowLeft, Clock, Filter, Search } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface AcaoHistorico {
  id: string;
  tipo: string;
  descricao: string;
  data: string;
  status: 'sucesso' | 'pendente' | 'erro';
  detalhes?: string;
}

const HistoricoAcoesScreen: React.FC = () => {
  const { navigateToScreen } = useNavigation();
  const { user } = useAuth();
  const [acoes, setAcoes] = useState<AcaoHistorico[]>([]);
  const [filtroTipo, setFiltroTipo] = useState<string>('todos');
  const [busca, setBusca] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simular carregamento de dados do histórico
    const carregarHistorico = () => {
      const acoesSimuladas: AcaoHistorico[] = [
        {
          id: '1',
          tipo: 'login',
          descricao: 'Login realizado com sucesso',
          data: new Date().toISOString(),
          status: 'sucesso'
        },
        {
          id: '2',
          tipo: 'perfil',
          descricao: 'Dados do perfil atualizados',
          data: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
          status: 'sucesso'
        },
        {
          id: '3',
          tipo: 'doacao',
          descricao: 'Doação de R$ 50,00 realizada',
          data: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
          status: 'sucesso'
        },
        {
          id: '4',
          tipo: 'senha',
          descricao: 'Tentativa de alteração de senha',
          data: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
          status: 'erro',
          detalhes: 'Senha atual incorreta'
        },
        {
          id: '5',
          tipo: 'voluntariado',
          descricao: 'Inscrição em evento voluntário',
          data: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
          status: 'pendente'
        }
      ];
      
      setTimeout(() => {
        setAcoes(acoesSimuladas);
        setLoading(false);
      }, 1000);
    };

    carregarHistorico();
  }, []);

  const acoesFiltradasOrdenadas = acoes
    .filter(acao => {
      const matchTipo = filtroTipo === 'todos' || acao.tipo === filtroTipo;
      const matchBusca = acao.descricao.toLowerCase().includes(busca.toLowerCase());
      return matchTipo && matchBusca;
    })
    .sort((a, b) => new Date(b.data).getTime() - new Date(a.data).getTime());

  const formatarData = (dataISO: string) => {
    const data = new Date(dataISO);
    return data.toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'sucesso':
        return <Badge className="bg-green-100 text-green-800">Sucesso</Badge>;
      case 'pendente':
        return <Badge className="bg-yellow-100 text-yellow-800">Pendente</Badge>;
      case 'erro':
        return <Badge className="bg-red-100 text-red-800">Erro</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800">Desconhecido</Badge>;
    }
  };

  const getTipoIcon = (tipo: string) => {
    switch (tipo) {
      case 'login':
        return '🔐';
      case 'perfil':
        return '👤';
      case 'doacao':
        return '💝';
      case 'senha':
        return '🔑';
      case 'voluntariado':
        return '🤝';
      default:
        return '📋';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => navigateToScreen('profile')}
            className="hover:bg-viver-yellow/20"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex-1">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-viver-yellow to-orange-500 bg-clip-text text-transparent">
              Histórico de Ações
            </h1>
            <p className="text-muted-foreground">
              Visualize todas as suas atividades recentes
            </p>
          </div>
        </div>

        {/* Filtros */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="w-5 h-5" />
              Filtros
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Buscar</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    placeholder="Buscar por descrição..."
                    value={busca}
                    onChange={(e) => setBusca(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Tipo de Ação</label>
                <Select value={filtroTipo} onValueChange={setFiltroTipo}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todos">Todos os tipos</SelectItem>
                    <SelectItem value="login">Login</SelectItem>
                    <SelectItem value="perfil">Perfil</SelectItem>
                    <SelectItem value="doacao">Doação</SelectItem>
                    <SelectItem value="senha">Senha</SelectItem>
                    <SelectItem value="voluntariado">Voluntariado</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Lista de Ações */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Atividades Recentes ({acoesFiltradasOrdenadas.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="space-y-3">
                {[1, 2, 3, 4, 5].map(i => (
                  <div key={i} className="animate-pulse">
                    <div className="flex items-center gap-4 p-4">
                      <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                      <div className="flex-1 space-y-2">
                        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                        <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                      </div>
                      <div className="w-16 h-6 bg-gray-200 rounded"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : acoesFiltradasOrdenadas.length === 0 ? (
              <div className="text-center py-8">
                <div className="text-4xl mb-2">📋</div>
                <p className="text-muted-foreground">Nenhuma ação encontrada</p>
              </div>
            ) : (
              <div className="space-y-3">
                {acoesFiltradasOrdenadas.map((acao) => (
                  <div key={acao.id} className="flex items-center gap-4 p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center text-lg">
                      {getTipoIcon(acao.tipo)}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{acao.descricao}</p>
                      <p className="text-sm text-muted-foreground">
                        {formatarData(acao.data)}
                      </p>
                      {acao.detalhes && (
                        <p className="text-xs text-muted-foreground mt-1">
                          {acao.detalhes}
                        </p>
                      )}
                    </div>
                    <div>
                      {getStatusBadge(acao.status)}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default HistoricoAcoesScreen;
