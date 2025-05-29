
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/components/ui/use-toast';

interface AlimentosDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const AlimentosDialog: React.FC<AlimentosDialogProps> = ({ isOpen, onOpenChange }) => {
  const [tipoItem, setTipoItem] = useState('');
  const [nomeItem, setNomeItem] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [unidade, setUnidade] = useState('');
  const [validade, setValidade] = useState('');
  const [observacoes, setObservacoes] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!tipoItem || !nomeItem || !quantidade) {
      toast({
        title: "Campos obrigatórios",
        description: "Preencha todos os campos obrigatórios.",
        variant: "destructive"
      });
      return;
    }

    // Aqui você pode implementar o envio dos dados
    toast({
      title: "Doação registrada",
      description: "Obrigado pela sua doação de alimentos!"
    });

    // Limpar formulário
    setTipoItem('');
    setNomeItem('');
    setQuantidade('');
    setUnidade('');
    setValidade('');
    setObservacoes('');
    onOpenChange(false);
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

          <Button 
            type="submit" 
            className="w-full bg-viver-yellow hover:bg-viver-yellow/90 text-black"
          >
            Registrar Doação
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AlimentosDialog;
