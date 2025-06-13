
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Truck, Package } from 'lucide-react';
import { useCategoriasDoacoes } from '@/hooks/useCategoriasDoacoes';

interface FormularioDoacaoFisicaProps {
  onSubmit: (dados: any) => Promise<boolean>;
  isSubmitting: boolean;
  onCancel: () => void;
}

const FormularioDoacaoFisica: React.FC<FormularioDoacaoFisicaProps> = ({
  onSubmit,
  isSubmitting,
  onCancel
}) => {
  const { categorias } = useCategoriasDoacoes();
  
  const [formData, setFormData] = useState({
    titulo: '',
    descricao: '',
    categoria_id: '',
    quantidade: 1,
    unidade: 'unidade',
    localizacao: '',
    endereco_coleta: '',
    tipo_entrega: 'retirada',
    endereco_entrega: '',
    observacoes: '',
    observacoes_entrega: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.titulo || !formData.categoria_id) {
      return;
    }

    // Validar campos obrigatórios baseado no tipo de entrega
    if (formData.tipo_entrega === 'retirada' && !formData.endereco_coleta) {
      return;
    }
    
    if (formData.tipo_entrega === 'entrega_doador' && !formData.endereco_entrega) {
      return;
    }

    const sucesso = await onSubmit(formData);
    
    if (sucesso) {
      // Reset form
      setFormData({
        titulo: '',
        descricao: '',
        categoria_id: '',
        quantidade: 1,
        unidade: 'unidade',
        localizacao: '',
        endereco_coleta: '',
        tipo_entrega: 'retirada',
        endereco_entrega: '',
        observacoes: '',
        observacoes_entrega: '',
      });
    }
  };

  return (
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
            {categorias
              .filter((categoria) => categoria.id && categoria.id.trim() !== '')
              .map((categoria) => (
                <SelectItem key={categoria.id} value={categoria.id}>
                  {categoria.nome}
                </SelectItem>
              ))
            }
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
        <Label htmlFor="localizacao">Sua Cidade</Label>
        <Input
          id="localizacao"
          value={formData.localizacao}
          onChange={(e) => setFormData({ ...formData, localizacao: e.target.value })}
          placeholder="Ex: Londrina, Centro"
        />
      </div>

      {/* Tipo de Entrega */}
      <div className="space-y-3">
        <Label>Como será a entrega?</Label>
        <RadioGroup
          value={formData.tipo_entrega}
          onValueChange={(value) => setFormData({ ...formData, tipo_entrega: value })}
          className="space-y-2"
        >
          <div className="flex items-center space-x-2 p-3 border rounded-lg">
            <RadioGroupItem value="retirada" id="retirada" />
            <div className="flex items-center gap-2">
              <Package className="h-4 w-4 text-viver-yellow" />
              <Label htmlFor="retirada" className="flex-1 cursor-pointer">
                A ONG retira no meu endereço
              </Label>
            </div>
          </div>
          <div className="flex items-center space-x-2 p-3 border rounded-lg">
            <RadioGroupItem value="entrega_doador" id="entrega_doador" />
            <div className="flex items-center gap-2">
              <Truck className="h-4 w-4 text-viver-yellow" />
              <Label htmlFor="entrega_doador" className="flex-1 cursor-pointer">
                Eu entrego na sede da ONG
              </Label>
            </div>
          </div>
        </RadioGroup>
      </div>

      {/* Endereço baseado no tipo de entrega */}
      {formData.tipo_entrega === 'retirada' && (
        <div>
          <Label htmlFor="endereco_coleta">Endereço para Retirada</Label>
          <Input
            id="endereco_coleta"
            value={formData.endereco_coleta}
            onChange={(e) => setFormData({ ...formData, endereco_coleta: e.target.value })}
            placeholder="Endereço onde a ONG pode retirar a doação"
            required
          />
        </div>
      )}

      {formData.tipo_entrega === 'entrega_doador' && (
        <div>
          <Label htmlFor="endereco_entrega">Endereço da ONG para Entrega</Label>
          <Input
            id="endereco_entrega"
            value={formData.endereco_entrega}
            onChange={(e) => setFormData({ ...formData, endereco_entrega: e.target.value })}
            placeholder="Endereço da sede da ONG onde você vai entregar"
            required
          />
        </div>
      )}

      <div>
        <Label htmlFor="observacoes">Observações Gerais</Label>
        <Textarea
          id="observacoes"
          value={formData.observacoes}
          onChange={(e) => setFormData({ ...formData, observacoes: e.target.value })}
          placeholder="Informações adicionais sobre a doação..."
          rows={2}
        />
      </div>

      <div>
        <Label htmlFor="observacoes_entrega">Observações sobre Entrega</Label>
        <Textarea
          id="observacoes_entrega"
          value={formData.observacoes_entrega}
          onChange={(e) => setFormData({ ...formData, observacoes_entrega: e.target.value })}
          placeholder="Horários disponíveis, instruções especiais..."
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
          onClick={onCancel}
          className="flex-1"
        >
          Cancelar
        </Button>
        <Button
          type="submit"
          disabled={isSubmitting}
          className="flex-1 bg-viver-yellow hover:bg-viver-yellow/90 text-black"
        >
          {isSubmitting ? 'Cadastrando...' : 'Doar para ONG Viver'}
        </Button>
      </div>
    </form>
  );
};

export default FormularioDoacaoFisica;
