
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Heart, Plus, Search, Package, Clock, CheckCircle, Gift, MapPin } from 'lucide-react';
import { useDoacoesFisicas } from '@/hooks/useDoacoesFisicas';
import CadastrarDoacaoDialog from './CadastrarDoacaoDialog';
import { useAuth } from '@/context/AuthContext';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

const DoacoesFisicasSimplificada: React.FC = () => {
  const { isAuthenticated, user } = useAuth();
  const { minhasDoacoes, isLoading, error } = useDoacoesFisicas();
  const [searchTerm, setSearchTerm] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  console.log('🎯 DoacoesFisicasSimplificada: Dados carregados:', {
    usuario: user?.id,
    doacoes: minhasDoacoes?.length || 0,
    carregando: isLoading,
    erro: !!error
  });

  const filteredDoacoes = minhasDoacoes.filter(doacao => 
    doacao.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doacao.descricao?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    const configs = {
      cadastrada: { label: 'Cadastrada', color: 'bg-blue-100 text-blue-800', icon: Clock },
      disponivel: { label: 'Disponível', color: 'bg-green-100 text-green-800', icon: Gift },
      reservada: { label: 'Reservada', color: 'bg-yellow-100 text-yellow-800', icon: Heart },
      entregue: { label: 'Entregue', color: 'bg-emerald-100 text-emerald-800', icon: CheckCircle },
      cancelada: { label: 'Cancelada', color: 'bg-red-100 text-red-800', icon: Package }
    };
    
    const config = configs[status] || configs.cadastrada;
    const Icon = config.icon;
    
    return (
      <Badge className={`${config.color} border-0 gap-1`}>
        <Icon className="h-3 w-3" />
        {config.label}
      </Badge>
    );
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-50 p-4">
        <div className="max-w-md mx-auto pt-20">
          <Card className="shadow-lg border-0">
            <CardContent className="p-8 text-center space-y-6">
              <div className="w-20 h-20 bg-gradient-to-br from-viver-yellow to-orange-400 rounded-full flex items-center justify-center mx-auto">
                <Heart className="h-10 w-10 text-white" />
              </div>
              <div className="space-y-2">
                <h1 className="text-2xl font-bold text-gray-900">Doações Físicas</h1>
                <p className="text-gray-600">
                  Faça login para ver suas doações e contribuir com a ONG Viver
                </p>
              </div>
              <Button 
                onClick={() => window.location.href = '/auth'}
                className="w-full bg-viver-yellow hover:bg-viver-yellow/90 text-black font-medium h-12"
              >
                Entrar para Doar
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-50 p-4">
        <div className="max-w-md mx-auto pt-20">
          <Card className="shadow-lg border-red-200">
            <CardContent className="p-8 text-center space-y-4">
              <Package className="h-16 w-16 text-red-400 mx-auto" />
              <h2 className="text-xl font-semibold text-red-800">Erro ao carregar</h2>
              <p className="text-red-600">{error.message}</p>
              <Button 
                onClick={() => window.location.reload()}
                variant="outline"
                className="border-red-300 text-red-700 hover:bg-red-50"
              >
                Tentar novamente
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-orange-50">
      {/* Header fixo */}
      <div className="sticky top-0 bg-white/80 backdrop-blur-md border-b border-yellow-200 z-10">
        <div className="max-w-4xl mx-auto p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-viver-yellow to-orange-400 rounded-full flex items-center justify-center">
                <Heart className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Minhas Doações</h1>
                <p className="text-sm text-gray-600">{minhasDoacoes.length} doações cadastradas</p>
              </div>
            </div>
            
            <Button
              onClick={() => setIsDialogOpen(true)}
              className="bg-gradient-to-r from-viver-yellow to-orange-400 hover:from-viver-yellow/90 hover:to-orange-400/90 text-black font-medium shadow-lg"
            >
              <Plus className="h-4 w-4 mr-2" />
              Nova Doação
            </Button>
          </div>
          
          {/* Busca */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Buscar suas doações..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 border-yellow-200 focus:border-viver-yellow"
            />
          </div>
        </div>
      </div>

      {/* Conteúdo */}
      <div className="max-w-4xl mx-auto p-4 space-y-6">
        {/* Loading */}
        {isLoading && (
          <div className="grid gap-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <Card key={i} className="animate-pulse">
                <CardContent className="p-6">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-3"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2 mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Lista vazia */}
        {!isLoading && filteredDoacoes.length === 0 && (
          <Card className="shadow-lg border-0">
            <CardContent className="p-12 text-center space-y-6">
              <div className="w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto">
                <Package className="h-12 w-12 text-gray-400" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-semibold text-gray-900">
                  {searchTerm ? 'Nenhuma doação encontrada' : 'Sua primeira doação!'}
                </h3>
                <p className="text-gray-600 max-w-md mx-auto">
                  {searchTerm 
                    ? 'Tente buscar por outro termo ou limpe o filtro.'
                    : 'Comece fazendo sua primeira doação para a ONG Viver e ajude famílias em necessidade.'
                  }
                </p>
              </div>
              {!searchTerm && (
                <Button
                  onClick={() => setIsDialogOpen(true)}
                  className="bg-gradient-to-r from-viver-yellow to-orange-400 hover:from-viver-yellow/90 hover:to-orange-400/90 text-black font-medium shadow-lg"
                  size="lg"
                >
                  <Heart className="h-4 w-4 mr-2" />
                  Fazer Primeira Doação
                </Button>
              )}
            </CardContent>
          </Card>
        )}

        {/* Lista de doações */}
        {!isLoading && filteredDoacoes.length > 0 && (
          <div className="grid gap-4">
            {filteredDoacoes.map((doacao) => (
              <Card key={doacao.id} className="hover:shadow-lg transition-all duration-200 border-0 shadow-md">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <h3 className="font-bold text-lg text-gray-900 mb-1">{doacao.titulo}</h3>
                      <p className="text-viver-yellow font-medium">{doacao.quantidade} {doacao.unidade}</p>
                    </div>
                    {getStatusBadge(doacao.status)}
                  </div>

                  {doacao.descricao && (
                    <p className="text-gray-700 mb-4 text-sm leading-relaxed">{doacao.descricao}</p>
                  )}

                  <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                    {doacao.localizacao && (
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4 text-gray-400" />
                        <span>{doacao.localizacao}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4 text-gray-400" />
                      <span>
                        {format(new Date(doacao.created_at), 'dd/MM/yyyy', { locale: ptBR })}
                      </span>
                    </div>
                  </div>

                  {doacao.observacoes && (
                    <div className="mt-4 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                      <p className="text-sm text-yellow-800">{doacao.observacoes}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Debug info (removível em produção) */}
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-4">
            <p className="text-xs text-blue-800 font-medium mb-2">Debug Info:</p>
            <div className="grid grid-cols-2 gap-2 text-xs text-blue-700">
              <span>👤 Usuário: {user?.id?.slice(0, 8)}...</span>
              <span>📦 Total: {minhasDoacoes?.length || 0}</span>
              <span>🔍 Filtradas: {filteredDoacoes?.length || 0}</span>
              <span>🔄 Loading: {isLoading ? 'Sim' : 'Não'}</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Dialog para cadastrar doação */}
      <CadastrarDoacaoDialog
        isOpen={isDialogOpen}
        onOpenChange={setIsDialogOpen}
      />
    </div>
  );
};

export default DoacoesFisicasSimplificada;
