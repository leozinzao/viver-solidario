
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Heart } from 'lucide-react';
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
    telefone: '',
    email: '',
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
      telefone: '',
      email: '',
    });
    
    onOpenChange(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Heart className="h-5 w-5 text-viver-yellow" />
            Doar para a ONG Viver
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="titulo">O que você quer doar?</Label>
            <Input
              id="titulo"
              value={formData.titulo}
              onChange={(e) => setFormData({ ...formData, titulo: e.target.value })}
              placeholder="Ex: Arroz 5kg, Roupas infantis..."
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

          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label htmlFor="telefone">Seu Telefone</Label>
              <Input
                id="telefone"
                value={formData.telefone}
                onChange={(e) => setFormData({ ...formData, telefone: e.target.value })}
                placeholder="(11) 99999-9999"
              />
            </div>
            <div>
              <Label htmlFor="email">Seu Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="seu@email.com"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="localizacao">Sua Cidade</Label>
            <Input
              id="localizacao"
              value={formData.localizacao}
              onChange={(e) => setFormData({ ...formData, localizacao: e.target.value })}
              placeholder="Ex: Londrina, Centro"
            />
          </div>

          <div>
            <Label htmlFor="endereco_coleta">Endereço para Retirada</Label>
            <Input
              id="endereco_coleta"
              value={formData.endereco_coleta}
              onChange={(e) => setFormData({ ...formData, endereco_coleta: e.target.value })}
              placeholder="Endereço onde a ONG pode retirar a doação"
            />
          </div>

          <div>
            <Label htmlFor="observacoes">Observações</Label>
            <Textarea
              id="observacoes"
              value={formData.observacoes}
              onChange={(e) => setFormData({ ...formData, observacoes: e.target.value })}
              placeholder="Horários disponíveis, informações adicionais..."
              rows={2}
            />
          </div>

          <div className="bg-yellow-50 p-3 rounded border border-yellow-200">
            <p className="text-sm text-yellow-800">
              💛 Sua doação será analisada pela equipe da ONG Viver. 
              Você receberá atualizações sobre o status da sua doação.
            </p>
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
              {isCreating ? 'Cadastrando...' : 'Doar para ONG Viver'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CadastrarDoacaoDialog;
