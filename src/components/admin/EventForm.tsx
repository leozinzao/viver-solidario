
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { useEventos } from '@/hooks/useEventos';
import { CalendarDays, X } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface EventFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const EventForm: React.FC<EventFormProps> = ({ open, onOpenChange }) => {
  const [formData, setFormData] = useState({
    titulo: '',
    resumo: '',
    link: '',
    data_inicio: '',
    data_fim: ''
  });

  const { criarEvento, carregandoCriar } = useEventos();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.titulo) {
      toast({
        title: "Erro",
        description: "O título do evento é obrigatório",
        variant: "destructive"
      });
      return;
    }

    try {
      await criarEvento({
        titulo: formData.titulo,
        resumo: formData.resumo || null,
        link: formData.link || null,
        data_inicio: formData.data_inicio || null,
        data_fim: formData.data_fim || null
      });

      // Reset form
      setFormData({
        titulo: '',
        resumo: '',
        link: '',
        data_inicio: '',
        data_fim: ''
      });

      onOpenChange(false);
    } catch (error) {
      console.error('Erro ao criar evento:', error);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-viver-yellow">
            <CalendarDays className="h-5 w-5" />
            Criar Novo Evento
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="titulo">Título *</Label>
            <Input
              id="titulo"
              value={formData.titulo}
              onChange={(e) => handleInputChange('titulo', e.target.value)}
              placeholder="Digite o título do evento"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="resumo">Resumo</Label>
            <Textarea
              id="resumo"
              value={formData.resumo}
              onChange={(e) => handleInputChange('resumo', e.target.value)}
              placeholder="Descreva brevemente o evento"
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="link">Link para mais informações</Label>
            <Input
              id="link"
              type="url"
              value={formData.link}
              onChange={(e) => handleInputChange('link', e.target.value)}
              placeholder="https://exemplo.com"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="data_inicio">Data de Início</Label>
              <Input
                id="data_inicio"
                type="date"
                value={formData.data_inicio}
                onChange={(e) => handleInputChange('data_inicio', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="data_fim">Data de Fim</Label>
              <Input
                id="data_fim"
                type="date"
                value={formData.data_fim}
                onChange={(e) => handleInputChange('data_fim', e.target.value)}
              />
            </div>
          </div>

          <DialogFooter className="gap-2 sm:justify-end">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => onOpenChange(false)}
            >
              <X className="h-4 w-4 mr-2" />
              Cancelar
            </Button>
            <Button 
              type="submit" 
              className="bg-viver-yellow hover:bg-viver-yellow/90 text-black"
              disabled={carregandoCriar}
            >
              <CalendarDays className="h-4 w-4 mr-2" />
              {carregandoCriar ? 'Criando...' : 'Criar Evento'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EventForm;
