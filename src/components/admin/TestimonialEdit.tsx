
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
  const [nome, setNome] = useState(testimonial.nome);
  const [depoimento, setDepoimento] = useState(testimonial.depoimento);
  const [aprovado, setAprovado] = useState(testimonial.aprovado);

  const updateTestimonial = useUpdateTestimonial();
  
  const handleSave = async () => {
    await updateTestimonial.mutateAsync({
      id: testimonial.id,
      nome,
      depoimento,
      aprovado
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
            <Label htmlFor="edit-nome">Nome</Label>
            <Input
              id="edit-nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="edit-depoimento">Depoimento</Label>
            <Textarea
              id="edit-depoimento"
              value={depoimento}
              onChange={(e) => setDepoimento(e.target.value)}
              rows={5}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <Label htmlFor="edit-aprovado">Aprovado</Label>
            <Switch
              id="edit-aprovado"
              checked={aprovado}
              onCheckedChange={setAprovado}
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
