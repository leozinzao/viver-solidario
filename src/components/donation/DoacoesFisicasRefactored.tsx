
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Heart, Plus, Search, Package, Clock, CheckCircle, TrendingUp } from 'lucide-react';
import { useDoacoesFisicasRefactored } from '@/hooks/useDoacoesFisicasRefactored';
import DoacaoCard from './DoacaoCard';
import CadastrarDoacaoDialog from './CadastrarDoacaoDialog';
import { useAuth } from '@/context/AuthContext';

const DoacoesFisicasRefactored: React.FC = () => {
  const { isAuthenticated, user } = useAuth();
  const { 
    doacoes, 
    categorias, 
    loading, 
    estatisticas,
    carregarDoacoes 
  } = useDoacoesFisicasRefactored();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('todas');
  const [selectedStatus, setSelectedStatus] = useState('todos');
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const filteredDoacoes = doacoes.filter(doacao => {
    const matchesSearch = doacao.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doacao.descricao?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'todas' || doacao.categoria_id === selectedCategory;
    const matchesStatus = selectedStatus === 'todos' || doacao.status === selectedStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const handleFilterChange = () => {
    const filtros: any = {};
    
    if (selectedCategory !== 'todas') {
      filtros.categoria_id = selectedCategory;
    }
    
    if (selectedStatus !== 'todos') {
      filtros.status = selectedStatus;
    }
    
    if (user) {
      filtros.doador_id = user.id;
    }
    
    carregarDoacoes(filtros);
  };

  React.useEffect(() => {
    handleFilterChange();
  }, [selectedCategory, selectedStatus, user]);

  if (loading) {
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
      {/* Header com Estatísticas */}
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
          
          {/* Estatísticas Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-blue-600" />
                <div>
                  <span className="text-sm font-medium text-blue-800 block">Total</span>
                  <span className="text-lg font-bold text-blue-900">{estatisticas.total}</span>
                </div>
              </div>
            </div>
            
            <div className="bg-green-50 p-3 rounded-lg border border-green-200">
              <div className="flex items-center gap-2">
                <Package className="h-4 w-4 text-green-600" />
                <div>
                  <span className="text-sm font-medium text-green-800 block">Disponível</span>
                  <span className="text-lg font-bold text-green-900">{estatisticas.disponivel}</span>
                </div>
              </div>
            </div>
            
            <div className="bg-yellow-50 p-3 rounded-lg border border-yellow-200">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-yellow-600" />
                <div>
                  <span className="text-sm font-medium text-yellow-800 block">Reservada</span>
                  <span className="text-lg font-bold text-yellow-900">{estatisticas.reservada}</span>
                </div>
              </div>
            </div>
            
            <div className="bg-emerald-50 p-3 rounded-lg border border-emerald-200">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-emerald-600" />
                <div>
                  <span className="text-sm font-medium text-emerald-800 block">Entregue</span>
                  <span className="text-lg font-bold text-emerald-900">{estatisticas.entregue}</span>
                </div>
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
            <DoacaoCard key={doacao.id} doacao={doacao} />
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

export default DoacoesFisicasRefactored;
