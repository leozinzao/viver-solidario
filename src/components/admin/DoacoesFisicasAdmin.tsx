
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Search, 
  Filter, 
  Clock, 
  CheckCircle, 
  XCircle, 
  Heart,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Package,
  Download,
  AlertCircle,
  Trash2,
  Eye,
  Edit,
  Check,
  X
} from 'lucide-react';
import { useDoacoesFisicasAdmin } from '@/hooks/useDoacoesFisicasAdmin';
import DetalheDoacaoDialog from './DetalheDoacaoDialog';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

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
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('todas');
  const [selectedStatus, setSelectedStatus] = useState('todas');
  const [selectedDoacao, setSelectedDoacao] = useState(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const filteredDoacoes = doacoes.filter(doacao => {
    const matchesSearch = 
      doacao.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doacao.descricao?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doacao.doadores?.nome?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === 'todas' || doacao.categoria_id === selectedCategory;
    const matchesStatus = selectedStatus === 'todas' || doacao.status === selectedStatus;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'cadastrada':
        return { 
          label: 'Pendente', 
          color: 'bg-orange-100 text-orange-800 border-orange-200', 
          icon: Clock,
          dotColor: 'bg-orange-500'
        };
      case 'aceita':
        return { 
          label: 'Aprovada', 
          color: 'bg-blue-100 text-blue-800 border-blue-200', 
          icon: Heart,
          dotColor: 'bg-blue-500'
        };
      case 'recebida':
        return { 
          label: 'Recebida', 
          color: 'bg-green-100 text-green-800 border-green-200', 
          icon: CheckCircle,
          dotColor: 'bg-green-500'
        };
      case 'cancelada':
        return { 
          label: 'Cancelada', 
          color: 'bg-red-100 text-red-800 border-red-200', 
          icon: XCircle,
          dotColor: 'bg-red-500'
        };
      default:
        return { 
          label: status, 
          color: 'bg-gray-100 text-gray-800 border-gray-200', 
          icon: Package,
          dotColor: 'bg-gray-500'
        };
    }
  };

  const getCategoryIcon = (categoria: any) => {
    if (categoria?.icone) {
      // Mapear ícones baseado no nome/tipo
      const iconMap: { [key: string]: React.ElementType } = {
        'package': Package,
        'heart': Heart,
        'clothes': Package, // Pode ser substituído por ícone específico
        'food': Package, // Pode ser substituído por ícone específico
      };
      return iconMap[categoria.icone] || Package;
    }
    return Package;
  };

  const handleStatusUpdate = async (doacaoId: string, newStatus: string, observacoes?: string) => {
    try {
      await updateStatus(doacaoId, newStatus, observacoes);
    } catch (error) {
      console.error('Erro ao atualizar status:', error);
    }
  };

  const handleDeleteDonation = async (doacaoId: string) => {
    try {
      await deleteDonation(doacaoId);
    } catch (error) {
      console.error('Erro ao deletar doação:', error);
    }
  };

  const handleViewDetails = (doacao: any) => {
    setSelectedDoacao(doacao);
    setIsDetailOpen(true);
  };

  if (loading) {
    return (
      <div className="space-y-6">
        {/* Skeleton dos indicadores */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 bg-gray-200 rounded-lg"></div>
                  <div className="flex-1">
                    <div className="h-6 bg-gray-200 rounded mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-20"></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {/* Skeleton da tabela */}
        <Card>
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="h-10 bg-gray-200 rounded"></div>
              <div className="h-64 bg-gray-200 rounded"></div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Indicadores - Layout melhorado */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-l-4 border-l-orange-500 hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Pendentes</p>
                <p className="text-3xl font-bold text-orange-600">{stats.cadastrada || 0}</p>
                <p className="text-xs text-gray-500 mt-1">Aguardando aprovação</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center">
                <Clock className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-blue-500 hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Aprovadas</p>
                <p className="text-3xl font-bold text-blue-600">{stats.aceita || 0}</p>
                <p className="text-xs text-gray-500 mt-1">Aceitas pela ONG</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                <Heart className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500 hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Recebidas</p>
                <p className="text-3xl font-bold text-green-600">{stats.recebida || 0}</p>
                <p className="text-xs text-gray-500 mt-1">Finalizadas</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500 hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Total</p>
                <p className="text-3xl font-bold text-purple-600">{stats.total || 0}</p>
                <p className="text-xs text-gray-500 mt-1">Todas as doações</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
                <Package className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filtros e Busca - Layout melhorado */}
      <Card className="border-0 shadow-md">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Filter className="h-5 w-5 text-viver-yellow" />
              Filtros e Busca
            </CardTitle>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <Download className="h-4 w-4" />
                Exportar
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
            <div className="md:col-span-5">
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                Buscar doações
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Buscar por título, descrição ou nome do doador..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <div className="md:col-span-3">
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                Categoria
              </label>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Todas" />
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

            <div className="md:col-span-3">
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                Status
              </label>
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="Todos" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todas">Todos os status</SelectItem>
                  <SelectItem value="cadastrada">Pendentes</SelectItem>
                  <SelectItem value="aceita">Aprovadas</SelectItem>
                  <SelectItem value="recebida">Recebidas</SelectItem>
                  <SelectItem value="cancelada">Canceladas</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="md:col-span-1">
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('todas');
                  setSelectedStatus('todas');
                }}
              >
                Limpar
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Lista de Doações - Layout melhorado */}
      <Card className="border-0 shadow-md">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5 text-viver-yellow" />
              Gerenciar Doações Físicas
            </CardTitle>
            <div className="bg-gray-100 px-3 py-1 rounded-full">
              <span className="text-sm font-medium text-gray-700">
                {filteredDoacoes.length} doações encontradas
              </span>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead className="font-semibold">Tipo</TableHead>
                  <TableHead className="font-semibold">Doação</TableHead>
                  <TableHead className="font-semibold">Doador</TableHead>
                  <TableHead className="font-semibold">Local</TableHead>
                  <TableHead className="font-semibold">Status</TableHead>
                  <TableHead className="font-semibold">Data</TableHead>
                  <TableHead className="font-semibold">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredDoacoes.map((doacao) => {
                  const statusConfig = getStatusConfig(doacao.status);
                  const StatusIcon = statusConfig.icon;
                  const CategoryIcon = getCategoryIcon(doacao.categorias_doacoes);
                  
                  return (
                    <TableRow key={doacao.id} className="hover:bg-gray-50 transition-colors">
                      <TableCell>
                        <div className="flex items-center justify-center">
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                            doacao.categorias_doacoes?.cor ? 
                            `bg-${doacao.categorias_doacoes.cor}-100` : 
                            'bg-gray-100'
                          }`}>
                            <CategoryIcon className={`h-5 w-5 ${
                              doacao.categorias_doacoes?.cor ? 
                              `text-${doacao.categorias_doacoes.cor}-600` : 
                              'text-gray-600'
                            }`} />
                          </div>
                        </div>
                      </TableCell>
                      
                      <TableCell>
                        <div className="space-y-1">
                          <p className="font-medium text-gray-900">{doacao.titulo}</p>
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <span className="font-medium">{doacao.quantidade} {doacao.unidade}</span>
                            {doacao.categorias_doacoes && (
                              <>
                                <span>•</span>
                                <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                                  {doacao.categorias_doacoes.nome}
                                </span>
                              </>
                            )}
                          </div>
                        </div>
                      </TableCell>
                      
                      <TableCell>
                        <div className="space-y-1">
                          <p className="font-medium text-gray-900">
                            {doacao.doadores?.nome || 'Não informado'}
                          </p>
                          {doacao.telefone_doador && (
                            <div className="flex items-center gap-1 text-sm text-gray-600">
                              <Phone className="h-3 w-3" />
                              <span className="truncate">{doacao.telefone_doador}</span>
                            </div>
                          )}
                          {doacao.email_doador && (
                            <div className="flex items-center gap-1 text-sm text-gray-600">
                              <Mail className="h-3 w-3" />
                              <span className="truncate">{doacao.email_doador}</span>
                            </div>
                          )}
                        </div>
                      </TableCell>
                      
                      <TableCell>
                        <div className="flex items-center gap-1 text-sm text-gray-600">
                          <MapPin className="h-4 w-4 text-gray-400 flex-shrink-0" />
                          <span className="truncate">
                            {doacao.localizacao || doacao.endereco_coleta || 'Não informado'}
                          </span>
                        </div>
                      </TableCell>
                      
                      <TableCell>
                        <Badge 
                          className={`${statusConfig.color} border flex items-center gap-2 w-fit px-3 py-1`}
                        >
                          <div className={`w-2 h-2 rounded-full ${statusConfig.dotColor}`}></div>
                          <StatusIcon className="h-3 w-3" />
                          {statusConfig.label}
                        </Badge>
                      </TableCell>
                      
                      <TableCell>
                        <div className="flex items-center gap-1 text-sm text-gray-600">
                          <Calendar className="h-3 w-3" />
                          {format(new Date(doacao.created_at), 'dd/MM/yy', { locale: ptBR })}
                        </div>
                      </TableCell>
                      
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleViewDetails(doacao)}
                            className="h-8 w-8 p-0"
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          
                          {doacao.status === 'cadastrada' && (
                            <>
                              <Button
                                size="sm"
                                onClick={() => handleStatusUpdate(doacao.id, 'aceita')}
                                disabled={isUpdating}
                                className="h-8 w-8 p-0 bg-green-600 hover:bg-green-700 text-white"
                              >
                                <Check className="h-4 w-4" />
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleStatusUpdate(doacao.id, 'cancelada')}
                                disabled={isUpdating}
                                className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </>
                          )}
                          
                          {doacao.status === 'aceita' && (
                            <Button
                              size="sm"
                              onClick={() => handleStatusUpdate(doacao.id, 'recebida')}
                              disabled={isUpdating}
                              className="h-8 w-8 p-0 bg-blue-600 hover:bg-blue-700 text-white"
                            >
                              <CheckCircle className="h-4 w-4" />
                            </Button>
                          )}
                          
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button
                                size="sm"
                                variant="outline"
                                disabled={isDeleting}
                                className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Tem certeza que deseja excluir permanentemente a doação "{doacao.titulo}"? 
                                  Esta ação não pode ser desfeita.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => handleDeleteDonation(doacao.id)}
                                  className="bg-red-600 hover:bg-red-700"
                                >
                                  Excluir
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
          
          {filteredDoacoes.length === 0 && (
            <div className="text-center py-12">
              <Package className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Nenhuma doação encontrada
              </h3>
              <p className="text-gray-500 max-w-md mx-auto">
                {searchTerm || selectedCategory !== 'todas' || selectedStatus !== 'todas' 
                  ? 'Tente ajustar os filtros para encontrar mais doações.'
                  : 'Ainda não há doações físicas cadastradas no sistema.'
                }
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Dialog de Detalhes */}
      {selectedDoacao && (
        <DetalheDoacaoDialog
          doacao={selectedDoacao}
          isOpen={isDetailOpen}
          onOpenChange={setIsDetailOpen}
          onStatusUpdate={handleStatusUpdate}
          isUpdating={isUpdating}
        />
      )}
    </div>
  );
};

export default DoacoesFisicasAdmin;
