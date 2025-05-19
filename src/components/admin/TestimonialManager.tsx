
import React, { useState } from 'react';
import { useTestimonials, useToggleTestimonialPublish, useDeleteTestimonial } from '@/hooks/useTestimonials';
import { Button } from '@/components/ui/button';
import { 
  Table, TableBody, TableCaption, TableCell, 
  TableHead, TableHeader, TableRow 
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { 
  Dialog, DialogContent, DialogDescription, 
  DialogHeader, DialogTitle, DialogFooter 
} from '@/components/ui/dialog';
import { Eye, Edit, Trash2, Check, X } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import TestimonialEdit from './TestimonialEdit';
import { Pagination } from '@/components/ui/pagination';

const TestimonialManager: React.FC = () => {
  const [page, setPage] = useState(1);
  const pageSize = 10;
  const { data, isLoading, isError } = useTestimonials(page, pageSize);
  const testimonials = data?.testimonials || [];
  const pagination = data?.pagination;
  
  const togglePublish = useToggleTestimonialPublish();
  const deleteTestimonial = useDeleteTestimonial();
  
  const [viewingTestimonial, setViewingTestimonial] = useState<any>(null);
  const [editingTestimonial, setEditingTestimonial] = useState<any>(null);
  const [deletingTestimonial, setDeletingTestimonial] = useState<any>(null);
  
  const handleApprove = async (id: string) => {
    await togglePublish.mutateAsync({ id, publicado: true });
  };
  
  const handleDisapprove = async (id: string) => {
    await togglePublish.mutateAsync({ id, publicado: false });
  };
  
  const handleDelete = async () => {
    if (deletingTestimonial) {
      await deleteTestimonial.mutateAsync(deletingTestimonial.id);
      setDeletingTestimonial(null);
    }
  };
  
  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), 'dd/MM/yyyy', { locale: ptBR });
    } catch (e) {
      return 'Data inválida';
    }
  };

  if (isLoading) {
    return <div className="text-center py-8">Carregando depoimentos...</div>;
  }
  
  if (isError) {
    return <div className="text-center py-8 text-destructive">Erro ao carregar depoimentos.</div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Gerenciar Depoimentos</h2>
      </div>
      
      <Table>
        <TableCaption>Lista de depoimentos enviados à ONG</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Título</TableHead>
            <TableHead>Autor</TableHead>
            <TableHead>Data</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {testimonials.length === 0 && (
            <TableRow>
              <TableCell colSpan={5} className="text-center">
                Nenhum depoimento encontrado
              </TableCell>
            </TableRow>
          )}
          {testimonials.map((testimonial: any) => (
            <TableRow key={testimonial.id}>
              <TableCell className="font-medium">{testimonial.titulo}</TableCell>
              <TableCell>{testimonial.autor_nome}</TableCell>
              <TableCell>{formatDate(testimonial.criado_em)}</TableCell>
              <TableCell>
                {testimonial.publicado ? (
                  <Badge className="bg-green-500">Publicado</Badge>
                ) : (
                  <Badge variant="outline">Pendente</Badge>
                )}
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button 
                    variant="outline" 
                    size="icon"
                    onClick={() => setViewingTestimonial(testimonial)}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="icon"
                    onClick={() => setEditingTestimonial(testimonial)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  {testimonial.publicado ? (
                    <Button 
                      variant="outline" 
                      size="icon"
                      onClick={() => handleDisapprove(testimonial.id)}
                      disabled={togglePublish.isPending}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  ) : (
                    <Button 
                      variant="outline" 
                      size="icon"
                      className="bg-green-500/10 hover:bg-green-500/20 text-green-500"
                      onClick={() => handleApprove(testimonial.id)}
                      disabled={togglePublish.isPending}
                    >
                      <Check className="h-4 w-4" />
                    </Button>
                  )}
                  <Button 
                    variant="outline" 
                    size="icon"
                    className="bg-red-500/10 hover:bg-red-500/20 text-red-500"
                    onClick={() => setDeletingTestimonial(testimonial)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      
      {pagination && pagination.pages > 1 && (
        <Pagination
          className="justify-center"
          page={page}
          totalPages={pagination.pages}
          onPageChange={setPage}
        />
      )}
      
      {/* View Dialog */}
      <Dialog open={!!viewingTestimonial} onOpenChange={(open) => !open && setViewingTestimonial(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>{viewingTestimonial?.titulo}</DialogTitle>
            <DialogDescription>
              Por {viewingTestimonial?.autor_nome}
              {viewingTestimonial?.autor_cargo && ` - ${viewingTestimonial.autor_cargo}`}
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <p className="whitespace-pre-wrap">{viewingTestimonial?.conteudo}</p>
          </div>
          <DialogFooter>
            <div className="flex w-full justify-between">
              <span className="text-xs text-muted-foreground">
                Enviado em {viewingTestimonial && formatDate(viewingTestimonial.criado_em)}
              </span>
              <Badge className={viewingTestimonial?.publicado ? 'bg-green-500' : 'bg-muted'}>
                {viewingTestimonial?.publicado ? 'Publicado' : 'Não publicado'}
              </Badge>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Edit Dialog */}
      {editingTestimonial && (
        <TestimonialEdit
          testimonial={editingTestimonial}
          open={!!editingTestimonial}
          onOpenChange={(open) => !open && setEditingTestimonial(null)}
        />
      )}
      
      {/* Delete Dialog */}
      <Dialog open={!!deletingTestimonial} onOpenChange={(open) => !open && setDeletingTestimonial(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmar exclusão</DialogTitle>
            <DialogDescription>
              Tem certeza que deseja excluir o depoimento "{deletingTestimonial?.titulo}"?
              Esta ação não pode ser desfeita.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2 sm:justify-end">
            <Button variant="outline" onClick={() => setDeletingTestimonial(null)}>Cancelar</Button>
            <Button 
              variant="destructive" 
              onClick={handleDelete}
              disabled={deleteTestimonial.isPending}
            >
              {deleteTestimonial.isPending ? 'Excluindo...' : 'Excluir'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TestimonialManager;
