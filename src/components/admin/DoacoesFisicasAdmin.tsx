import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Pagination } from '@/components/ui/pagination';
import { 
  Search, 
  Filter, 
  Download, 
  MoreHorizontal, 
  Eye, 
  Check, 
  X, 
  Clock,
  Package,
  CheckCircle,
  XCircle,
  AlertTriangle,
  User,
  Calendar,
  MapPin,
  Phone,
  Mail,
  Trash2,
  RefreshCw
} from 'lucide-react';
import { useDoacoesFisicasAdmin } from '@/hooks/useDoacoesFisicasAdmin';
import DetalheDoacaoDialog from './DetalheDoacaoDialog';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

const DoacoesFisicasAdmin: React.FC = () => {
  const { 
    doacoes, 
    categorias, 
    loading, 
    updateStatus, 
    deleteDonation, 
    isUpdating, 
    isDeleting,
    stats 
  } = useDoacoesFisicasAdmin();

  const [selectedDoacao, setSelectedDoacao] = useState<any>(null);
  const [showDetalhes, setShowDetalhes] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  // Filtrar doações
  const filteredDoacoes = doacoes.filter(doacao => {
    const matchesSearch = !searchTerm || 
      doacao.doadores?.nome?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doacao.titulo?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doacao.descricao?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || doacao.status === statusFilter;
    const matchesCategory = categoryFilter === 'all' || doacao.categoria_id === categoryFilter;
    
    return matchesSearch && matchesStatus && matchesCategory;
  });

  // Paginação
  const totalPages = Math.ceil(filteredDoacoes.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedDoacoes = filteredDoacoes.slice(startIndex, startIndex + itemsPerPage);

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      cadastrada: { label: 'Pendente', variant: 'secondary' as const, icon: Clock },
      aceita: { label: 'Aceita', variant: 'default' as const, icon: CheckCircle },
      recebida: { label: 'Recebida', variant: 'default' as const, icon: Package },
      cancelada: { label: 'Cancelada', variant: 'destructive' as const, icon: XCircle },
    };

    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.cadastrada;
    const Icon = config.icon;
    
    return (
      <Badge variant={config.variant} className="flex items-center gap-1">
        <Icon className="h-3 w-3" />
        {config.label}
      </Badge>
    );
  };

  const handleStatusUpdate = async (doacaoId: string, newStatus: string) => {
    try {
      await updateStatus(doacaoId, newStatus);
    } catch (error) {
      console.error('Erro ao atualizar status:', error);
    }
  };

  const handleDeleteDoacao = async (doacaoId: string) => {
    if (window.confirm('Tem certeza que deseja deletar esta doação? Esta ação não pode ser desfeita.')) {
      try {
        await deleteDonation(doacaoId);
      } catch (error) {
        console.error('Erro ao deletar doação:', error);
      }
    }
  };

  const handleVerDetalhes = (doacao: any) => {
    setSelectedDoacao(doacao);
    setShowDetalhes(true);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-viver-yellow mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando doações...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header com estatísticas em cards circulares */}
      <div className="flex flex-col gap-3 mb-6 w-full">
        {/* Card Pendentes */}
        <Card className="bg-orange-50 w-full border-0 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="p-3 rounded-full bg-orange-50 border-2 border-orange-600 shadow-md flex-shrink-0">
              <Clock className="h-8 w-8 text-orange-600" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-900 mb-1">Pendentes</p>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-3xl font-bold text-orange-600 leading-none">
                  {stats.cadastrada || 0}
                </span>
                <div className="flex items-center gap-1">
                  <AlertTriangle className="h-4 w-4 text-orange-500" />
                  <span className="text-xs font-medium text-orange-600">
                    Aguardando aprovação
                  </span>
                </div>
              </div>
              <p className="text-sm text-gray-600 leading-tight">
                Aguardando aprovação
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Card Aprovadas */}
        <Card className="bg-blue-50 w-full border-0 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="p-3 rounded-full bg-blue-50 border-2 border-blue-600 shadow-md flex-shrink-0">
              <CheckCircle className="h-8 w-8 text-blue-600" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-900 mb-1">Aprovadas</p>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-3xl font-bold text-blue-600 leading-none">
                  {stats.aceita || 0}
                </span>
                <div className="flex items-center gap-1">
                  <CheckCircle className="h-4 w-4 text-blue-500" />
                  <span className="text-xs font-medium text-blue-600">
                    Aceitas pela ONG
                  </span>
                </div>
              </div>
              <p className="text-sm text-gray-600 leading-tight">
                Aceitas pela ONG
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Card Recebidas */}
        <Card className="bg-green-50 w-full border-0 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="p-3 rounded-full bg-green-50 border-2 border-green-600 shadow-md flex-shrink-0">
              <Package className="h-8 w-8 text-green-600" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-900 mb-1">Recebidas</p>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-3xl font-bold text-green-600 leading-none">
                  {stats.recebida || 0}
                </span>
                <div className="flex items-center gap-1">
                  <Package className="h-4 w-4 text-green-500" />
                  <span className="text-xs font-medium text-green-600">
                    Finalizadas
                  </span>
                </div>
              </div>
              <p className="text-sm text-gray-600 leading-tight">
                Finalizadas
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Card Total */}
        <Card className="bg-purple-50 w-full border-0 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="p-3 rounded-full bg-purple-50 border-2 border-purple-600 shadow-md flex-shrink-0">
              <Package className="h-8 w-8 text-purple-600" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-900 mb-1">Total</p>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-3xl font-bold text-purple-600 leading-none">
                  {stats.total || 0}
                </span>
                <div className="flex items-center gap-1">
                  <Package className="h-4 w-4 text-purple-500" />
                  <span className="text-xs font-medium text-purple-600">
                    Todas as doações
                  </span>
                </div>
              </div>
              <p className="text-sm text-gray-600 leading-tight">
                Todas as doações
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filtros e busca */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Lista de Doações Físicas</span>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Exportar
              </Button>
              <Button variant="outline" size="sm">
                <RefreshCw className="h-4 w-4 mr-2" />
                Atualizar
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Barra de busca e filtros */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Buscar por nome, título ou descrição..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filtrar por status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os status</SelectItem>
                <SelectItem value="cadastrada">Pendentes</SelectItem>
                <SelectItem value="aceita">Aceitas</SelectItem>
                <SelectItem value="recebida">Recebidas</SelectItem>
                <SelectItem value="cancelada">Canceladas</SelectItem>
              </SelectContent>
            </Select>

            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filtrar por categoria" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas as categorias</SelectItem>
                {categorias.map((categoria) => (
                  <SelectItem key={categoria.id} value={categoria.id}>
                    {categoria.nome}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Lista de doações */}
          {filteredDoacoes.length === 0 ? (
            <Alert>
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                {searchTerm || statusFilter !== 'all' || categoryFilter !== 'all' 
                  ? 'Nenhuma doação encontrada com os filtros aplicados.'
                  : 'Nenhuma doação física cadastrada ainda.'
                }
              </AlertDescription>
            </Alert>
          ) : (
            <div className="space-y-4">
              {paginatedDoacoes.map((doacao) => (
                <Card key={doacao.id} className="border border-gray-200 hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold text-lg">{doacao.titulo}</h3>
                          {getStatusBadge(doacao.status)}
                        </div>
                        
                        <p className="text-gray-600 text-sm line-clamp-2">
                          {doacao.descricao}
                        </p>
                        
                        <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                          <div className="flex items-center gap-1">
                            <User className="h-4 w-4" />
                            <span>{doacao.doadores?.nome || 'Nome não informado'}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            <span>{format(new Date(doacao.created_at), 'dd/MM/yyyy', { locale: ptBR })}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            <span>{doacao.endereco_coleta || 'Endereço não informado'}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex flex-col gap-2">
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleVerDetalhes(doacao)}
                          >
                            <Eye className="h-4 w-4 mr-1" />
                            Ver
                          </Button>
                          
                          {doacao.status === 'cadastrada' && (
                            <>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleStatusUpdate(doacao.id, 'aceita')}
                                disabled={isUpdating}
                                className="text-green-600 border-green-600 hover:bg-green-50"
                              >
                                <Check className="h-4 w-4 mr-1" />
                                Aceitar
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleStatusUpdate(doacao.id, 'cancelada')}
                                disabled={isUpdating}
                                className="text-red-600 border-red-600 hover:bg-red-50"
                              >
                                <X className="h-4 w-4 mr-1" />
                                Rejeitar
                              </Button>
                            </>
                          )}
                          
                          {doacao.status === 'aceita' && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleStatusUpdate(doacao.id, 'recebida')}
                              disabled={isUpdating}
                              className="text-blue-600 border-blue-600 hover:bg-blue-50"
                            >
                              <Package className="h-4 w-4 mr-1" />
                              Marcar como Recebida
                            </Button>
                          )}
                          
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDeleteDoacao(doacao.id)}
                            disabled={isDeleting}
                            className="text-red-600 border-red-600 hover:bg-red-50"
                          >
                            <Trash2 className="h-4 w-4 mr-1" />
                            Deletar
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* Paginação */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-6">
              <Pagination
                page={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            </div>
          )}
        </CardContent>
      </Card>

      {/* Dialog de detalhes */}
      {selectedDoacao && (
        <DetalheDoacaoDialog
          doacao={selectedDoacao}
          isOpen={showDetalhes}
          onOpenChange={setShowDetalhes}
          onStatusUpdate={handleStatusUpdate}
          isUpdating={isUpdating}
        />
      )}
    </div>
  );
};

export default DoacoesFisicasAdmin;
