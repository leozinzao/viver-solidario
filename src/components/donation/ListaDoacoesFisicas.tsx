
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Heart, Plus, Search, Filter } from 'lucide-react';
import { useDoacoesFisicas } from '@/hooks/useDoacoesFisicas';
import DoacaoFisicaCard from './DoacaoFisicaCard';
import CadastrarDoacaoDialog from './CadastrarDoacaoDialog';
import { useAuth } from '@/context/AuthContext';

const ListaDoacoesFisicas: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const { doacoes, categorias, loading, reservarDoacao, isReserving } = useDoacoesFisicas();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('todas');
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const filteredDoacoes = doacoes.filter(doacao => {
    const matchesSearch = doacao.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doacao.descricao?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'todas' || doacao.categoria_id === selectedCategory;
    return matchesSearch && matchesCategory;
  });

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
      {/* Header */}
      <Card className="flutter-card">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center text-lg">
            <Heart className="mr-2 h-5 w-5 text-viver-yellow" />
            Doações Físicas Disponíveis
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-gray-700">
            Encontre doações de itens físicos em sua região e ajude quem precisa.
          </p>
          
          {/* Filtros */}
          <div className="flex flex-col gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Buscar doações..."
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
            <Heart className="h-12 w-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500">
              {searchTerm || selectedCategory !== 'todas'
                ? 'Nenhuma doação encontrada com os filtros aplicados.'
                : 'Ainda não há doações disponíveis. Seja o primeiro a doar!'}
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {filteredDoacoes.map((doacao) => (
            <DoacaoFisicaCard
              key={doacao.id}
              doacao={doacao}
              onReservar={reservarDoacao}
              isReserving={isReserving}
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
