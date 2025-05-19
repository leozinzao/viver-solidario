
import React, { useState } from 'react';
import {
  Dialog, DialogContent, DialogDescription, 
  DialogHeader, DialogTitle, DialogFooter
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { useUpdateTestimonial } from '@/hooks/useTestimonials';

interface TestimonialEditProps {
  testimonial: any;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const TestimonialEdit: React.FC<TestimonialEditProps> = ({
  testimonial,
  open,
  onOpenChange
}) => {
  const [title, setTitle] = useState(testimonial.titulo);
  const [content, setContent] = useState(testimonial.conteudo);
  const [author, setAuthor] = useState(testimonial.autor_nome);
  const [role, setRole] = useState(testimonial.autor_cargo || '');
  const [published, setPublished] = useState(testimonial.publicado);

  const updateTestimonial = useUpdateTestimonial();
  
  const handleSave = async () => {
    await updateTestimonial.mutateAsync({
      id: testimonial.id,
      testimonial: {
        titulo: title,
        conteudo: content,
        autor_nome: author,
        autor_cargo: role,
        publicado: published
      }
    });
    
    onOpenChange(false);
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Editar Depoimento</DialogTitle>
          <DialogDescription>
            Edite os detalhes do depoimento abaixo.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="edit-title">Título</Label>
            <Input
              id="edit-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="edit-content">Conteúdo</Label>
            <Textarea
              id="edit-content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={5}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="edit-author">Autor</Label>
            <Input
              id="edit-author"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="edit-role">Função/Cargo</Label>
            <Input
              id="edit-role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <Label htmlFor="edit-published">Publicado</Label>
            <Switch
              id="edit-published"
              checked={published}
              onCheckedChange={setPublished}
            />
          </div>
        </div>
        <DialogFooter className="gap-2 sm:gap-0">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button 
            onClick={handleSave}
            disabled={updateTestimonial.isPending}
          >
            {updateTestimonial.isPending ? 'Salvando...' : 'Salvar alterações'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default TestimonialEdit;
