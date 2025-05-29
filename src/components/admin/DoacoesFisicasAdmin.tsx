
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
  Trash2
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
        return { label: 'Cadastrada', color: 'bg-blue-100 text-blue-800', icon: Clock };
      case 'aceita':
        return { label: 'Aceita', color: 'bg-yellow-100 text-yellow-800', icon: Heart };
      case 'recebida':
        return { label: 'Recebida', color: 'bg-green-100 text-green-800', icon: CheckCircle };
      case 'cancelada':
        return { label: 'Cancelada', color: 'bg-red-100 text-red-800', icon: XCircle };
      default:
        return { label: status, color: 'bg-gray-100 text-gray-800', icon: Package };
    }
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
      <div className="space-y-4">
        <div className="grid grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-4">
                <div className="h-8 bg-gray-200 rounded w-1/2 mb-2"></div>
                <div className="h-6 bg-gray-200 rounded w-1/3"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Dashboard com Estatísticas */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-blue-500" />
              <div>
                <p className="text-2xl font-bold text-blue-600">{stats.cadastrada || 0}</p>
                <p className="text-sm text-gray-600">Aguardando</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Heart className="h-5 w-5 text-yellow-500" />
              <div>
                <p className="text-2xl font-bold text-yellow-600">{stats.aceita || 0}</p>
                <p className="text-sm text-gray-600">Aceitas</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <div>
                <p className="text-2xl font-bold text-green-600">{stats.recebida || 0}</p>
                <p className="text-sm text-gray-600">Recebidas</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Package className="h-5 w-5 text-gray-500" />
              <div>
                <p className="text-2xl font-bold text-gray-600">{stats.total || 0}</p>
                <p className="text-sm text-gray-600">Total</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filtros e Busca */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filtros e Busca
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
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
            
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Categoria" />
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
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todas">Todos os status</SelectItem>
                <SelectItem value="cadastrada">Cadastrada</SelectItem>
                <SelectItem value="aceita">Aceita</SelectItem>
                <SelectItem value="recebida">Recebida</SelectItem>
                <SelectItem value="cancelada">Cancelada</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline" className="w-full md:w-auto">
              <Download className="h-4 w-4 mr-2" />
              Exportar
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Tabela de Doações */}
      <Card>
        <CardHeader>
          <CardTitle>Gerenciar Doações ({filteredDoacoes.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Doação</TableHead>
                  <TableHead>Doador</TableHead>
                  <TableHead>Local</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Data</TableHead>
                  <TableHead>Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredDoacoes.map((doacao) => {
                  const statusConfig = getStatusConfig(doacao.status);
                  const StatusIcon = statusConfig.icon;
                  
                  return (
                    <TableRow key={doacao.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{doacao.titulo}</p>
                          <p className="text-sm text-gray-600">
                            {doacao.quantidade} {doacao.unidade}
                          </p>
                          {doacao.categorias_doacoes && (
                            <p className="text-xs text-gray-500">
                              {doacao.categorias_doacoes.nome}
                            </p>
                          )}
                        </div>
                      </TableCell>
                      
                      <TableCell>
                        <div>
                          <p className="font-medium">{doacao.doadores?.nome || 'N/A'}</p>
                          {doacao.telefone_doador && (
                            <div className="flex items-center gap-1 text-sm text-gray-600">
                              <Phone className="h-3 w-3" />
                              {doacao.telefone_doador}
                            </div>
                          )}
                          {doacao.email_doador && (
                            <div className="flex items-center gap-1 text-sm text-gray-600">
                              <Mail className="h-3 w-3" />
                              {doacao.email_doador}
                            </div>
                          )}
                        </div>
                      </TableCell>
                      
                      <TableCell>
                        <div className="flex items-center gap-1 text-sm">
                          <MapPin className="h-3 w-3 text-gray-400" />
                          {doacao.localizacao || 'Não informado'}
                        </div>
                      </TableCell>
                      
                      <TableCell>
                        <Badge className={`${statusConfig.color} flex items-center gap-1 w-fit`}>
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
                        <div className="flex gap-2 flex-wrap">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleViewDetails(doacao)}
                          >
                            Ver
                          </Button>
                          
                          {doacao.status === 'cadastrada' && (
                            <Button
                              size="sm"
                              className="bg-viver-yellow hover:bg-viver-yellow/90 text-black"
                              onClick={() => handleStatusUpdate(doacao.id, 'aceita')}
                              disabled={isUpdating}
                            >
                              Aceitar
                            </Button>
                          )}
                          
                          {doacao.status === 'aceita' && (
                            <Button
                              size="sm"
                              className="bg-green-600 hover:bg-green-700 text-white"
                              onClick={() => handleStatusUpdate(doacao.id, 'recebida')}
                              disabled={isUpdating}
                            >
                              Recebida
                            </Button>
                          )}
                          
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button
                                size="sm"
                                variant="destructive"
                                disabled={isDeleting}
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
            <div className="text-center py-8">
              <Package className="h-12 w-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500">
                Nenhuma doação encontrada com os filtros aplicados.
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
