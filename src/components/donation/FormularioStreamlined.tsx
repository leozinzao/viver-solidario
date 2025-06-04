
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Card, CardContent } from '@/components/ui/card';
import { Truck, Package, MapPin, Heart, Info, CheckCircle } from 'lucide-react';
import { useCategoriasDoacoes } from '@/hooks/useCategoriasDoacoes';

interface FormularioStreamlinedProps {
  onSubmit: (dados: any) => Promise<boolean>;
  isSubmitting: boolean;
  onCancel: () => void;
}

const ENDERECO_ONG = "Rua Bernardo Sayão, 319 - Jd. Petrópolis - Londrina/PR";

const FormularioStreamlined: React.FC<FormularioStreamlinedProps> = ({
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
    
    if (!formData.titulo || !formData.categoria_id) {
      return;
    }

    // Validar campos obrigatórios baseado no tipo de entrega
    if (formData.tipo_entrega === 'retirada' && !formData.endereco_coleta) {
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
        tipo_entrega: 'entrega_doador',
        endereco_entrega: ENDERECO_ONG,
        observacoes: '',
        observacoes_entrega: '',
      });
    }
  };

  const handleTipoEntregaChange = (value: string) => {
    setFormData({ 
      ...formData, 
      tipo_entrega: value,
      endereco_entrega: value === 'entrega_doador' ? ENDERECO_ONG : ''
    });
  };

  const isFormValid = formData.titulo && formData.categoria_id && 
    (formData.tipo_entrega !== 'retirada' || formData.endereco_coleta);

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Informações Básicas */}
      <Card className="border-viver-yellow/20">
        <CardContent className="p-6 space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <Heart className="h-5 w-5 text-viver-yellow" />
            <h3 className="font-semibold text-lg">O que você quer doar?</h3>
          </div>

          <div className="grid gap-4">
            <div>
              <Label htmlFor="titulo" className="flex items-center gap-2">
                Descrição da doação *
                <Info className="h-4 w-4 text-gray-400" />
              </Label>
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

            <div className="grid grid-cols-2 gap-4">
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
              <Label htmlFor="descricao">Detalhes adicionais</Label>
              <Textarea
                id="descricao"
                value={formData.descricao}
                onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
                placeholder="Descreva o item em mais detalhes..."
                rows={2}
                className="mt-1"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Forma de Entrega */}
      <Card className="border-viver-yellow/20">
        <CardContent className="p-6 space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <Truck className="h-5 w-5 text-viver-yellow" />
            <h3 className="font-semibold text-lg">Como será a entrega?</h3>
          </div>

          <RadioGroup
            value={formData.tipo_entrega}
            onValueChange={handleTipoEntregaChange}
            className="space-y-4"
          >
            <div className="flex items-center space-x-3 p-4 border-2 rounded-lg hover:bg-yellow-50 hover:border-viver-yellow/50 transition-colors">
              <RadioGroupItem value="entrega_doador" id="entrega_doador" />
              <div className="flex items-center gap-3 flex-1">
                <Package className="h-5 w-5 text-viver-yellow" />
                <div>
                  <Label htmlFor="entrega_doador" className="cursor-pointer font-medium">
                    Eu entrego na sede da ONG Viver
                  </Label>
                  <p className="text-sm text-gray-600">Você leva a doação até nossa sede</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-3 p-4 border-2 rounded-lg hover:bg-yellow-50 hover:border-viver-yellow/50 transition-colors">
              <RadioGroupItem value="retirada" id="retirada" />
              <div className="flex items-center gap-3 flex-1">
                <Truck className="h-5 w-5 text-viver-yellow" />
                <div>
                  <Label htmlFor="retirada" className="cursor-pointer font-medium">
                    A ONG retira no meu endereço
                  </Label>
                  <p className="text-sm text-gray-600">Nossa equipe vai até você</p>
                </div>
              </div>
            </div>
          </RadioGroup>

          {/* Endereço da ONG - quando escolher entrega */}
          {formData.tipo_entrega === 'entrega_doador' && (
            <div className="bg-gradient-to-r from-viver-yellow/10 to-yellow-100 p-4 rounded-lg border-l-4 border-viver-yellow">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-viver-yellow mt-0.5" />
                <div>
                  <Label className="font-semibold text-gray-800">📍 Endereço da ONG Viver:</Label>
                  <p className="text-gray-700 mt-1">{ENDERECO_ONG}</p>
                  <p className="text-sm text-gray-600 mt-2">
                    <CheckCircle className="h-4 w-4 inline mr-1 text-green-600" />
                    Horário de funcionamento: Segunda a Sexta, 8h às 17h
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Endereço de retirada - quando escolher retirada */}
          {formData.tipo_entrega === 'retirada' && (
            <div className="space-y-3">
              <Label htmlFor="endereco_coleta" className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                Seu endereço para retirada *
              </Label>
              <Input
                id="endereco_coleta"
                value={formData.endereco_coleta}
                onChange={(e) => setFormData({ ...formData, endereco_coleta: e.target.value })}
                placeholder="Digite seu endereço completo"
                required
                className="mt-1"
              />
              <p className="text-sm text-gray-600">
                Nossa equipe entrará em contato para agendar a retirada
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Informações Adicionais */}
      <Card className="border-gray-200">
        <CardContent className="p-6 space-y-4">
          <h3 className="font-semibold text-lg">Informações Adicionais (opcional)</h3>

          <div className="grid gap-4">
            <div>
              <Label htmlFor="localizacao">Sua Cidade/Bairro</Label>
              <Input
                id="localizacao"
                value={formData.localizacao}
                onChange={(e) => setFormData({ ...formData, localizacao: e.target.value })}
                placeholder="Ex: Londrina, Centro"
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="observacoes">Observações sobre a doação</Label>
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
          </div>
        </CardContent>
      </Card>

      {/* Aviso */}
      <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-4 rounded-lg border border-yellow-200">
        <p className="text-sm text-gray-700 text-center">
          💛 <strong>Sua doação será analisada pela equipe da ONG Viver.</strong> 
          <br />Você receberá atualizações sobre o status da sua doação.
        </p>
      </div>

      {/* Botões */}
      <div className="flex gap-3 pt-2">
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
          disabled={isSubmitting || !isFormValid}
          className="flex-1 bg-viver-yellow hover:bg-viver-yellow/90 text-black font-medium"
        >
          {isSubmitting ? 'Cadastrando...' : '💛 Fazer Doação'}
        </Button>
      </div>
    </form>
  );
};

export default FormularioStreamlined;
