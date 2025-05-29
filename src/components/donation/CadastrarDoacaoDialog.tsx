import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useDoacoesFisicas } from '@/hooks/useDoacoesFisicas';

interface CadastrarDoacaoDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const CadastrarDoacaoDialog: React.FC<CadastrarDoacaoDialogProps> = ({
  isOpen,
  onOpenChange
}) => {
  const { categorias, createDoacao, isCreating } = useDoacoesFisicas();
  const [formData, setFormData] = useState({
    titulo: '',
    descricao: '',
    categoria_id: '',
    quantidade: 1,
    unidade: 'unidade',
    localizacao: '',
    endereco_coleta: '',
    observacoes: '',
  });

  // Debug das categorias
  console.log('Categorias recebidas:', categorias);
  
  // Filtro mais robusto para categorias válidas
  const categoriasValidas = categorias.filter(categoria => {
    const isValid = categoria && 
                   categoria.id && 
                   typeof categoria.id === 'string' && 
                   categoria.id.trim() !== '' &&
                   categoria.nome &&
                   categoria.nome.trim() !== '';
    
    if (!isValid) {
      console.log('Categoria inválida filtrada:', categoria);
    }
    
    return isValid;
  });

  console.log('Categorias válidas após filtro:', categoriasValidas);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.titulo || !formData.categoria_id) {
      return;
    }

    createDoacao(formData);
    
    // Reset form
    setFormData({
      titulo: '',
      descricao: '',
      categoria_id: '',
      quantidade: 1,
      unidade: 'unidade',
      localizacao: '',
      endereco_coleta: '',
      observacoes: '',
    });
    
    onOpenChange(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Cadastrar Nova Doação</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="titulo">Título da Doação</Label>
            <Input
              id="titulo"
              value={formData.titulo}
              onChange={(e) => setFormData({ ...formData, titulo: e.target.value })}
              placeholder="Ex: Arroz 5kg"
              required
            />
          </div>

          <div>
            <Label htmlFor="categoria">Categoria</Label>
            <Select
              value={formData.categoria_id}
              onValueChange={(value) => setFormData({ ...formData, categoria_id: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione uma categoria" />
              </SelectTrigger>
              <SelectContent>
                {categoriasValidas.map((categoria) => (
                  <SelectItem key={categoria.id} value={categoria.id}>
                    {categoria.nome}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label htmlFor="quantidade">Quantidade</Label>
              <Input
                id="quantidade"
                type="number"
                min="1"
                value={formData.quantidade}
                onChange={(e) => setFormData({ ...formData, quantidade: Number(e.target.value) })}
                required
              />
            </div>
            <div>
              <Label htmlFor="unidade">Unidade</Label>
              <Select
                value={formData.unidade}
                onValueChange={(value) => setFormData({ ...formData, unidade: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="unidade">Unidade(s)</SelectItem>
                  <SelectItem value="kg">Kg</SelectItem>
                  <SelectItem value="g">Gramas</SelectItem>
                  <SelectItem value="litro">Litro(s)</SelectItem>
                  <SelectItem value="pacote">Pacote(s)</SelectItem>
                  <SelectItem value="caixa">Caixa(s)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="descricao">Descrição</Label>
            <Textarea
              id="descricao"
              value={formData.descricao}
              onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
              placeholder="Descreva o item em mais detalhes..."
              rows={3}
            />
          </div>

          <div>
            <Label htmlFor="localizacao">Localização</Label>
            <Input
              id="localizacao"
              value={formData.localizacao}
              onChange={(e) => setFormData({ ...formData, localizacao: e.target.value })}
              placeholder="Cidade ou região"
            />
          </div>

          <div>
            <Label htmlFor="endereco_coleta">Endereço para Coleta</Label>
            <Input
              id="endereco_coleta"
              value={formData.endereco_coleta}
              onChange={(e) => setFormData({ ...formData, endereco_coleta: e.target.value })}
              placeholder="Endereço onde retirar a doação"
            />
          </div>

          <div>
            <Label htmlFor="observacoes">Observações</Label>
            <Textarea
              id="observacoes"
              value={formData.observacoes}
              onChange={(e) => setFormData({ ...formData, observacoes: e.target.value })}
              placeholder="Informações adicionais, horários de retirada, etc."
              rows={2}
            />
          </div>

          <div className="flex gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="flex-1"
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={isCreating}
              className="flex-1 bg-viver-yellow hover:bg-viver-yellow/90 text-black"
            >
              {isCreating ? 'Cadastrando...' : 'Cadastrar'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CadastrarDoacaoDialog;
