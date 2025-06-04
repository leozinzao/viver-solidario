
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Card, CardContent } from '@/components/ui/card';
import { Truck, Package, MapPin, Heart } from 'lucide-react';
import { useCategoriasDoacoes } from '@/hooks/useCategoriasDoacoes';

interface FormularioDoacaoOtimizadoProps {
  onSubmit: (dados: any) => Promise<boolean>;
  isSubmitting: boolean;
  onCancel: () => void;
}

const ENDERECO_ONG = "📍 Rua Bernardo Sayão, 319 - Jd. Petrópolis - Londrina/PR";

const FormularioDoacaoOtimizado: React.FC<FormularioDoacaoOtimizadoProps> = ({
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
    tipo_entrega: 'entrega_doador',
    endereco_entrega: ENDERECO_ONG,
    observacoes: '',
    observacoes_entrega: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    console.log('Formulario: Dados do formulário antes da validação:', formData);
    
    if (!formData.titulo || !formData.categoria_id) {
      console.error('Formulario: Campos obrigatórios não preenchidos');
      return;
    }

    // Validar campos obrigatórios baseado no tipo de entrega
    if (formData.tipo_entrega === 'retirada' && !formData.endereco_coleta) {
      console.error('Formulario: Endereço de coleta obrigatório para retirada');
      return;
    }

    console.log('Formulario: Enviando dados para criação:', formData);
    const sucesso = await onSubmit(formData);
    
    if (sucesso) {
      console.log('Formulario: Doação criada com sucesso, resetando formulário');
      // Reset form
      setFormData({
        titulo: '',
        descricao: '',
        categoria_id: '',
        quantidade: 1,
        unidade: 'unidade',
        localizacao: '',
        endereco_coleta: '',
        tipo_entrega: 'entrega_doador',
        endereco_entrega: ENDERECO_ONG,
        observacoes: '',
        observacoes_entrega: '',
      });
    } else {
      console.error('Formulario: Falha ao criar doação');
    }
  };

  const handleTipoEntregaChange = (value: string) => {
    console.log('Formulario: Mudando tipo de entrega para:', value);
    setFormData({ 
      ...formData, 
      tipo_entrega: value,
      endereco_entrega: value === 'entrega_doador' ? ENDERECO_ONG : ''
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Informações Básicas */}
      <Card>
        <CardContent className="p-4 space-y-4">
          <div className="flex items-center gap-2 mb-3">
            <Heart className="h-5 w-5 text-viver-yellow" />
            <h3 className="font-semibold">Informações da Doação</h3>
          </div>

          <div>
            <Label htmlFor="titulo">O que você quer doar? *</Label>
            <Input
              id="titulo"
              value={formData.titulo}
              onChange={(e) => setFormData({ ...formData, titulo: e.target.value })}
              placeholder="Ex: Arroz 5kg, Roupas infantis, Brinquedos..."
              required
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="categoria">Categoria *</Label>
            <Select
              value={formData.categoria_id}
              onValueChange={(value) => setFormData({ ...formData, categoria_id: value })}
            >
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Selecione uma categoria" />
              </SelectTrigger>
              <SelectContent>
                {categorias.map((categoria) => (
                  <SelectItem key={categoria.id} value={categoria.id}>
                    {categoria.nome}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label htmlFor="quantidade">Quantidade *</Label>
              <Input
                id="quantidade"
                type="number"
                min="1"
                value={formData.quantidade}
                onChange={(e) => setFormData({ ...formData, quantidade: Number(e.target.value) })}
                required
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="unidade">Unidade</Label>
              <Select
                value={formData.unidade}
                onValueChange={(value) => setFormData({ ...formData, unidade: value })}
              >
                <SelectTrigger className="mt-1">
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
              rows={2}
              className="mt-1"
            />
          </div>
        </CardContent>
      </Card>

      {/* Forma de Entrega */}
      <Card>
        <CardContent className="p-4 space-y-4">
          <div className="flex items-center gap-2 mb-3">
            <Truck className="h-5 w-5 text-viver-yellow" />
            <h3 className="font-semibold">Como será a entrega?</h3>
          </div>

          <RadioGroup
            value={formData.tipo_entrega}
            onValueChange={handleTipoEntregaChange}
            className="space-y-3"
          >
            <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-gray-50">
              <RadioGroupItem value="entrega_doador" id="entrega_doador" />
              <div className="flex items-center gap-2 flex-1">
                <Package className="h-4 w-4 text-viver-yellow" />
                <Label htmlFor="entrega_doador" className="cursor-pointer">
                  Eu entrego na sede da ONG Viver
                </Label>
              </div>
            </div>
            <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-gray-50">
              <RadioGroupItem value="retirada" id="retirada" />
              <div className="flex items-center gap-2 flex-1">
                <Truck className="h-4 w-4 text-viver-yellow" />
                <Label htmlFor="retirada" className="cursor-pointer">
                  A ONG retira no meu endereço
                </Label>
              </div>
            </div>
          </RadioGroup>

          {/* Endereço da ONG - quando escolher entrega */}
          {formData.tipo_entrega === 'entrega_doador' && (
            <div className="bg-viver-yellow/10 p-3 rounded-lg border border-viver-yellow/20">
              <div className="flex items-center gap-2 mb-2">
                <MapPin className="h-4 w-4 text-viver-yellow" />
                <Label className="font-medium">Endereço da ONG Viver:</Label>
              </div>
              <p className="text-sm text-gray-700">{ENDERECO_ONG}</p>
            </div>
          )}

          {/* Endereço de retirada - quando escolher retirada */}
          {formData.tipo_entrega === 'retirada' && (
            <div>
              <Label htmlFor="endereco_coleta">Seu endereço para retirada *</Label>
              <Input
                id="endereco_coleta"
                value={formData.endereco_coleta}
                onChange={(e) => setFormData({ ...formData, endereco_coleta: e.target.value })}
                placeholder="Digite seu endereço completo"
                required
                className="mt-1"
              />
            </div>
          )}
        </CardContent>
      </Card>

      {/* Informações Adicionais */}
      <Card>
        <CardContent className="p-4 space-y-4">
          <h3 className="font-semibold">Informações Adicionais</h3>

          <div>
            <Label htmlFor="localizacao">Sua Cidade</Label>
            <Input
              id="localizacao"
              value={formData.localizacao}
              onChange={(e) => setFormData({ ...formData, localizacao: e.target.value })}
              placeholder="Ex: Londrina, Centro"
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="observacoes">Observações</Label>
            <Textarea
              id="observacoes"
              value={formData.observacoes}
              onChange={(e) => setFormData({ ...formData, observacoes: e.target.value })}
              placeholder="Informações importantes sobre a doação..."
              rows={2}
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="observacoes_entrega">Horários e instruções especiais</Label>
            <Textarea
              id="observacoes_entrega"
              value={formData.observacoes_entrega}
              onChange={(e) => setFormData({ ...formData, observacoes_entrega: e.target.value })}
              placeholder="Horários disponíveis, instruções especiais..."
              rows={2}
              className="mt-1"
            />
          </div>
        </CardContent>
      </Card>

      {/* Aviso */}
      <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
        <p className="text-sm text-yellow-800 text-center">
          💛 Sua doação será analisada pela equipe da ONG Viver. 
          Você receberá atualizações sobre o status da sua doação.
        </p>
      </div>

      {/* Botões */}
      <div className="flex gap-3">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          className="flex-1"
          disabled={isSubmitting}
        >
          Cancelar
        </Button>
        <Button
          type="submit"
          disabled={isSubmitting || !formData.titulo || !formData.categoria_id}
          className="flex-1 bg-viver-yellow hover:bg-viver-yellow/90 text-black"
        >
          {isSubmitting ? 'Cadastrando...' : 'Fazer Doação'}
        </Button>
      </div>
    </form>
  );
};

export default FormularioDoacaoOtimizado;
