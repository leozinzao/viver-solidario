
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Heart, Plus, Search, Package, Clock, CheckCircle } from 'lucide-react';
import { useDoacoesFisicas } from '@/hooks/useDoacoesFisicas';
import { useCategoriasDoacoes } from '@/hooks/useCategoriasDoacoes';
import MinhasDoacoesCard from './MinhasDoacoesCard';
import CadastrarDoacaoDialog from './CadastrarDoacaoDialog';
import { useAuth } from '@/context/AuthContext';

const ListaDoacoesFisicas: React.FC = () => {
  const { isAuthenticated, user } = useAuth();
  const { minhasDoacoes, isLoading, error } = useDoacoesFisicas();
  const { categorias, loading: loadingCategorias } = useCategoriasDoacoes();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('todas');
  const [selectedStatus, setSelectedStatus] = useState('todos');
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Debug logs melhorados
  console.log('🔍 ListaDoacoesFisicas: Usuário autenticado:', isAuthenticated);
  console.log('👤 ListaDoacoesFisicas: ID do usuário:', user?.id);
  console.log('📦 ListaDoacoesFisicas: Doações recebidas:', minhasDoacoes);
  console.log('📊 ListaDoacoesFisicas: Quantidade:', minhasDoacoes?.length || 0);
  console.log('⚠️ ListaDoacoesFisicas: Erro:', error);
  console.log('🔄 ListaDoacoesFisicas: Carregando:', isLoading);

  // Se houver erro, mostrar mensagem
  if (error) {
    console.error('❌ ListaDoacoesFisicas: Erro detectado:', error);
    return (
      <Card className="flutter-card">
        <CardContent className="p-6 text-center">
          <Package className="h-12 w-12 text-red-300 mx-auto mb-3" />
          <p className="text-red-500 mb-4">
            Erro ao carregar suas doações: {error.message}
          </p>
          <Button onClick={() => window.location.reload()} variant="outline">
            Tentar novamente
          </Button>
        </CardContent>
      </Card>
    );
  }

  const filteredDoacoes = minhasDoacoes.filter(doacao => {
    const matchesSearch = doacao.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doacao.descricao?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'todas' || doacao.categoria_id === selectedCategory;
    const matchesStatus = selectedStatus === 'todos' || doacao.status === selectedStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  console.log('🔎 ListaDoacoesFisicas: Doações após filtro:', filteredDoacoes);

  const getStatusStats = () => {
    const stats = {
      cadastrada: minhasDoacoes.filter(d => d.status === 'cadastrada').length,
      disponivel: minhasDoacoes.filter(d => d.status === 'disponivel').length,
      reservada: minhasDoacoes.filter(d => d.status === 'reservada').length,
      entregue: minhasDoacoes.filter(d => d.status === 'entregue').length,
      total: minhasDoacoes.length
    };
    console.log('📈 ListaDoacoesFisicas: Estatísticas:', stats);
    return stats;
  };

  const stats = getStatusStats();

  if (isLoading || loadingCategorias) {
    console.log('⏳ ListaDoacoesFisicas: Carregando dados...');
    return (
      <div className="space-y-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <Card key={i} className="flutter-card animate-pulse">
            <CardContent className="p-4">
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="flutter-card">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center text-lg">
            <Heart className="mr-2 h-5 w-5 text-viver-yellow" />
            Minhas Doações para a ONG Viver
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-gray-700">
            Doe itens físicos para a ONG Viver e acompanhe o status das suas doações.
          </p>
          
          {/* Debug info sempre visível para troubleshooting */}
          <div className="bg-blue-50 p-3 rounded text-xs border border-blue-200">
            <p className="font-semibold text-blue-800">Debug Info:</p>
            <p>👤 Usuário: {user?.id || 'Não logado'}</p>
            <p>📦 Total doações: {minhasDoacoes?.length || 0}</p>
            <p>🔄 Carregando: {isLoading ? 'Sim' : 'Não'}</p>
            <p>⚠️ Erro: {error ? 'Sim' : 'Não'}</p>
            <p>🔍 Após filtros: {filteredDoacoes?.length || 0}</p>
          </div>
          
          {/* Estatísticas */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-yellow-50 p-3 rounded-lg border border-yellow-200">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-yellow-600" />
                <span className="text-sm font-medium text-yellow-800">
                  {stats.cadastrada + stats.disponivel + stats.reservada} Em andamento
                </span>
              </div>
            </div>
            <div className="bg-green-50 p-3 rounded-lg border border-green-200">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span className="text-sm font-medium text-green-800">
                  {stats.entregue} Entregues
                </span>
              </div>
            </div>
          </div>
          
          {/* Filtros */}
          <div className="flex flex-col gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Buscar suas doações..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="flex gap-3">
              <div className="flex-1">
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="Todas as categorias" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todas">Todas as categorias</SelectItem>
                    {categorias.map((categoria) => (
                      <SelectItem key={categoria.id} value={categoria.id}>
                        {categoria.nome}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex-1">
                <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                  <SelectTrigger>
                    <SelectValue placeholder="Todos os status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todos">Todos os status</SelectItem>
                    <SelectItem value="cadastrada">Cadastrada</SelectItem>
                    <SelectItem value="disponivel">Disponível</SelectItem>
                    <SelectItem value="reservada">Reservada</SelectItem>
                    <SelectItem value="entregue">Entregue</SelectItem>
                    <SelectItem value="cancelada">Cancelada</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              {isAuthenticated && (
                <Button
                  onClick={() => setIsDialogOpen(true)}
                  className="bg-viver-yellow hover:bg-viver-yellow/90 text-black shrink-0"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Doar
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Lista de doações */}
      {filteredDoacoes.length === 0 ? (
        <Card className="flutter-card">
          <CardContent className="p-6 text-center">
            <Package className="h-12 w-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500 mb-4">
              {searchTerm || selectedCategory !== 'todas' || selectedStatus !== 'todos'
                ? 'Nenhuma doação encontrada com os filtros aplicados.'
                : 'Você ainda não fez nenhuma doação. Seja o primeiro a contribuir!'}
            </p>
            {!searchTerm && selectedCategory === 'todas' && selectedStatus === 'todos' && (
              <Button
                onClick={() => setIsDialogOpen(true)}
                className="bg-viver-yellow hover:bg-viver-yellow/90 text-black"
              >
                <Plus className="h-4 w-4 mr-2" />
                Fazer minha primeira doação
              </Button>
            )}
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {filteredDoacoes.map((doacao) => (
            <MinhasDoacoesCard
              key={doacao.id}
              doacao={doacao}
            />
          ))}
        </div>
      )}

      {/* Dialog para cadastrar doação */}
      {isAuthenticated && (
        <CadastrarDoacaoDialog
          isOpen={isDialogOpen}
          onOpenChange={setIsDialogOpen}
        />
      )}
    </div>
  );
};

export default ListaDoacoesFisicas;
