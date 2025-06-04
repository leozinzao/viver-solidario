
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
  const { minhasDoacoes, isLoading } = useDoacoesFisicas();
  const { categorias, loading: loadingCategorias } = useCategoriasDoacoes();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('todas');
  const [selectedStatus, setSelectedStatus] = useState('todos');
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Debug logs
  console.log('ListaDoacoesFisicas: Usuário atual:', user?.id);
  console.log('ListaDoacoesFisicas: Minhas doações recebidas:', minhasDoacoes);
  console.log('ListaDoacoesFisicas: Quantidade de doações:', minhasDoacoes.length);

  const filteredDoacoes = minhasDoacoes.filter(doacao => {
    const matchesSearch = doacao.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doacao.descricao?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'todas' || doacao.categoria_id === selectedCategory;
    const matchesStatus = selectedStatus === 'todos' || doacao.status === selectedStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  console.log('ListaDoacoesFisicas: Doações após filtro:', filteredDoacoes);

  const getStatusStats = () => {
    const stats = {
      cadastrada: minhasDoacoes.filter(d => d.status === 'cadastrada').length,
      disponivel: minhasDoacoes.filter(d => d.status === 'disponivel').length,
      reservada: minhasDoacoes.filter(d => d.status === 'reservada').length,
      entregue: minhasDoacoes.filter(d => d.status === 'entregue').length,
      total: minhasDoacoes.length
    };
    console.log('ListaDoacoesFisicas: Estatísticas calculadas:', stats);
    return stats;
  };

  const stats = getStatusStats();

  if (isLoading || loadingCategorias) {
    console.log('ListaDoacoesFisicas: Carregando dados...');
    return (
      <div className="space-y-6 p-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardContent className="p-6">
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-3"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50/50 to-white">
      <div className="container mx-auto px-4 py-6 pb-24 space-y-6">
        {/* Header */}
        <Card className="shadow-sm border-yellow-200/50">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center text-xl font-semibold">
              <Heart className="mr-3 h-6 w-6 text-viver-yellow" />
              Minhas Doações para a ONG Viver
            </CardTitle>
            <p className="text-gray-600 mt-2">
              Doe itens físicos para a ONG Viver e acompanhe o status das suas doações.
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            
            {/* Debug info para desenvolvimento */}
            {process.env.NODE_ENV === 'development' && (
              <div className="bg-gray-100 p-3 rounded-lg text-xs">
                <p>DEBUG - Usuário: {user?.id}</p>
                <p>DEBUG - Total doações: {minhasDoacoes.length}</p>
                <p>DEBUG - Após filtros: {filteredDoacoes.length}</p>
              </div>
            )}
            
            {/* Estatísticas */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-yellow-50 p-4 rounded-xl border border-yellow-200">
                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-yellow-600" />
                  <div>
                    <span className="text-lg font-semibold text-yellow-800">
                      {stats.cadastrada + stats.disponivel + stats.reservada}
                    </span>
                    <p className="text-sm text-yellow-700">Em andamento</p>
                  </div>
                </div>
              </div>
              <div className="bg-green-50 p-4 rounded-xl border border-green-200">
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <div>
                    <span className="text-lg font-semibold text-green-800">
                      {stats.entregue}
                    </span>
                    <p className="text-sm text-green-700">Entregues</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Filtros */}
            <div className="space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Buscar suas doações..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 h-12"
                />
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="h-12">
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
                
                <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                  <SelectTrigger className="h-12">
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
                  className="w-full bg-viver-yellow hover:bg-viver-yellow/90 text-black h-12 font-semibold"
                >
                  <Plus className="h-5 w-5 mr-2" />
                  Nova Doação
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Lista de doações */}
        {filteredDoacoes.length === 0 ? (
          <Card className="shadow-sm">
            <CardContent className="p-8 text-center">
              <Package className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 mb-6 text-lg">
                {searchTerm || selectedCategory !== 'todas' || selectedStatus !== 'todos'
                  ? 'Nenhuma doação encontrada com os filtros aplicados.'
                  : 'Você ainda não fez nenhuma doação. Seja o primeiro a contribuir!'}
              </p>
              {!searchTerm && selectedCategory === 'todas' && selectedStatus === 'todos' && (
                <Button
                  onClick={() => setIsDialogOpen(true)}
                  className="bg-viver-yellow hover:bg-viver-yellow/90 text-black h-12 px-8"
                >
                  <Plus className="h-5 w-5 mr-2" />
                  Fazer minha primeira doação
                </Button>
              )}
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
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
    </div>
  );
};

export default ListaDoacoesFisicas;
