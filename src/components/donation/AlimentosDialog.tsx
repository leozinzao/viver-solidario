
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/context/AuthContext';
import { doacaoUnificadaService } from '@/services/doacaoUnificadaService';

interface AlimentosDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const AlimentosDialog: React.FC<AlimentosDialogProps> = ({ isOpen, onOpenChange }) => {
  const { toast } = useToast();
  const { user } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [tipoItem, setTipoItem] = useState('');
  const [nomeItem, setNomeItem] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [unidade, setUnidade] = useState('');
  const [validade, setValidade] = useState('');
  const [observacoes, setObservacoes] = useState('');

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
    
    if (!tipoItem || !nomeItem || !quantidade) {
      toast({
        title: "Campos obrigatórios",
        description: "Preencha todos os campos obrigatórios.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      await doacaoUnificadaService.criarDoacaoAlimentos({
        tipoItem,
        nomeItem,
        quantidade,
        unidade,
        validade,
        observacoes
      }, user.id);

      toast({
        title: "Doação registrada com sucesso!",
        description: "Sua doação de alimentos foi cadastrada no sistema de doações físicas."
      });

      // Limpar formulário
      setTipoItem('');
      setNomeItem('');
      setQuantidade('');
      setUnidade('');
      setValidade('');
      setObservacoes('');
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
          <DialogTitle className="text-viver-yellow">Doar Alimentos / Cesta Básica</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="tipo">Tipo de Doação *</Label>
            <Select value={tipoItem} onValueChange={setTipoItem}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione o tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="cesta-basica">Cesta Básica Completa</SelectItem>
                <SelectItem value="arroz">Arroz</SelectItem>
                <SelectItem value="feijao">Feijão</SelectItem>
                <SelectItem value="oleo">Óleo</SelectItem>
                <SelectItem value="acucar">Açúcar</SelectItem>
                <SelectItem value="sal">Sal</SelectItem>
                <SelectItem value="farinha">Farinha</SelectItem>
                <SelectItem value="macarrao">Macarrão</SelectItem>
                <SelectItem value="molho-tomate">Molho de Tomate</SelectItem>
                <SelectItem value="leite">Leite</SelectItem>
                <SelectItem value="cafe">Café</SelectItem>
                <SelectItem value="biscoito">Biscoito</SelectItem>
                <SelectItem value="enlatados">Enlatados</SelectItem>
                <SelectItem value="higiene">Produtos de Higiene</SelectItem>
                <SelectItem value="limpeza">Produtos de Limpeza</SelectItem>
                <SelectItem value="outro">Outro</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="nome">Nome do Item *</Label>
            <Input
              id="nome"
              value={nomeItem}
              onChange={(e) => setNomeItem(e.target.value)}
              placeholder="Ex: Arroz tipo 1, Feijão carioca..."
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <Label htmlFor="quantidade">Quantidade *</Label>
              <Input
                id="quantidade"
                value={quantidade}
                onChange={(e) => setQuantidade(e.target.value)}
                placeholder="Ex: 5"
              />
            </div>
            <div>
              <Label htmlFor="unidade">Unidade</Label>
              <Select value={unidade} onValueChange={setUnidade}>
                <SelectTrigger>
                  <SelectValue placeholder="Unidade" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="kg">Kg</SelectItem>
                  <SelectItem value="unidades">Unidades</SelectItem>
                  <SelectItem value="pacotes">Pacotes</SelectItem>
                  <SelectItem value="litros">Litros</SelectItem>
                  <SelectItem value="caixas">Caixas</SelectItem>
                  <SelectItem value="latas">Latas</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="validade">Data de Validade (opcional)</Label>
            <Input
              id="validade"
              type="date"
              value={validade}
              onChange={(e) => setValidade(e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="observacoes">Observações</Label>
            <Textarea
              id="observacoes"
              value={observacoes}
              onChange={(e) => setObservacoes(e.target.value)}
              placeholder="Informações adicionais sobre a doação..."
            />
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

export default AlimentosDialog;
