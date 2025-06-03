
import React, { useState, useRef } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Upload } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/context/AuthContext';
import { doacaoUnificadaService } from '@/services/doacaoUnificadaService';

interface BrechoDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const BrechoDialog: React.FC<BrechoDialogProps> = ({ isOpen, onOpenChange }) => {
  const { toast } = useToast();
  const { user } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [tipoRoupa, setTipoRoupa] = useState('');
  const [tamanho, setTamanho] = useState('');
  const [estado, setEstado] = useState('');
  const [descricao, setDescricao] = useState('');
  const [foto, setFoto] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFoto(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast({
        title: "Erro",
        description: "Você precisa estar logado para fazer uma doação.",
        variant: "destructive"
      });
      return;
    }
    
    if (!tipoRoupa || !tamanho || !estado) {
      toast({
        title: "Campos obrigatórios",
        description: "Preencha todos os campos obrigatórios.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      await doacaoUnificadaService.criarDoacaoBrecho({
        tipoRoupa,
        tamanho,
        estado,
        descricao,
        foto: foto || undefined
      }, user.id);

      toast({
        title: "Doação registrada com sucesso!",
        description: "Sua doação foi cadastrada no sistema de doações físicas."
      });

      // Limpar formulário
      setTipoRoupa('');
      setTamanho('');
      setEstado('');
      setDescricao('');
      setFoto(null);
      setPreviewUrl('');
      onOpenChange(false);
    } catch (error) {
      console.error('Erro ao registrar doação:', error);
      toast({
        title: "Erro ao registrar doação",
        description: "Ocorreu um erro. Tente novamente.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-viver-yellow">Doar para o Brechó do Bem</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="tipo">Tipo de Item *</Label>
            <Select value={tipoRoupa} onValueChange={setTipoRoupa}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione o tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="camiseta">Camiseta</SelectItem>
                <SelectItem value="calca">Calça</SelectItem>
                <SelectItem value="vestido">Vestido</SelectItem>
                <SelectItem value="blusa">Blusa</SelectItem>
                <SelectItem value="saia">Saia</SelectItem>
                <SelectItem value="calcado">Calçado</SelectItem>
                <SelectItem value="acessorio">Acessório</SelectItem>
                <SelectItem value="brinquedo">Brinquedo</SelectItem>
                <SelectItem value="livro">Livro</SelectItem>
                <SelectItem value="outro">Outro</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="tamanho">Tamanho *</Label>
            <Select value={tamanho} onValueChange={setTamanho}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione o tamanho" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pp">PP</SelectItem>
                <SelectItem value="p">P</SelectItem>
                <SelectItem value="m">M</SelectItem>
                <SelectItem value="g">G</SelectItem>
                <SelectItem value="gg">GG</SelectItem>
                <SelectItem value="xgg">XGG</SelectItem>
                <SelectItem value="infantil-0-2">Infantil 0-2 anos</SelectItem>
                <SelectItem value="infantil-2-4">Infantil 2-4 anos</SelectItem>
                <SelectItem value="infantil-4-6">Infantil 4-6 anos</SelectItem>
                <SelectItem value="infantil-6-8">Infantil 6-8 anos</SelectItem>
                <SelectItem value="infantil-8-10">Infantil 8-10 anos</SelectItem>
                <SelectItem value="infantil-10-12">Infantil 10-12 anos</SelectItem>
                <SelectItem value="na">Não se aplica</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="estado">Estado de Conservação *</Label>
            <Select value={estado} onValueChange={setEstado}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione o estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="novo">Novo com etiqueta</SelectItem>
                <SelectItem value="semi-novo">Semi-novo</SelectItem>
                <SelectItem value="usado-bom">Usado em bom estado</SelectItem>
                <SelectItem value="usado-regular">Usado em estado regular</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="descricao">Descrição</Label>
            <Textarea
              id="descricao"
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              placeholder="Descreva o item (cor, marca, características especiais...)"
            />
          </div>

          <div>
            <Label>Foto do Item (opcional)</Label>
            <div className="space-y-2">
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => fileInputRef.current?.click()}
                  className="flex items-center gap-2"
                >
                  <Upload className="w-4 h-4" />
                  Selecionar Foto
                </Button>
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFotoChange}
                className="hidden"
              />
              {previewUrl && (
                <div className="mt-2">
                  <img
                    src={previewUrl}
                    alt="Preview"
                    className="w-32 h-32 object-cover rounded-md border"
                  />
                </div>
              )}
            </div>
          </div>

          <div className="bg-yellow-50 p-3 rounded border border-yellow-200">
            <p className="text-sm text-yellow-800">
              💛 Sua doação será registrada no sistema de doações físicas e você poderá acompanhar o status.
            </p>
          </div>

          <Button 
            type="submit" 
            disabled={isSubmitting}
            className="w-full bg-viver-yellow hover:bg-viver-yellow/90 text-black"
          >
            {isSubmitting ? 'Registrando...' : 'Registrar Doação'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default BrechoDialog;
