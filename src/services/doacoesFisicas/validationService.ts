
import { validateData, doacaoFisicaSchema } from '@/lib/validation';

export const validationService = {
  // Validar dados básicos da doação
  validateDoacaoData(dadosDoacao: any) {
    const dadosParaValidacao = {
      titulo: dadosDoacao.titulo,
      descricao: dadosDoacao.descricao,
      categoria_id: dadosDoacao.categoria_id,
      quantidade: dadosDoacao.quantidade,
      unidade: dadosDoacao.unidade,
      endereco_coleta: dadosDoacao.endereco_coleta,
      observacoes: dadosDoacao.observacoes
    };

    console.log('Service: Dados para validação:', dadosParaValidacao);

    const validation = validateData(doacaoFisicaSchema, dadosParaValidacao);
    
    if (!validation.success) {
      console.error('Service: Erro de validação:', validation);
      throw new Error(`Dados de doação inválidos: ${validation.error}`);
    }

    return validation.data;
  },

  // Validações condicionais baseadas no tipo de entrega
  validateTipoEntrega(dadosDoacao: any) {
    if (dadosDoacao.tipo_entrega === 'retirada' && !dadosDoacao.endereco_coleta?.trim()) {
      throw new Error('Endereço para retirada é obrigatório quando a ONG retira no seu endereço');
    }
    
    if (dadosDoacao.tipo_entrega === 'entrega_doador' && !dadosDoacao.endereco_entrega?.trim()) {
      throw new Error('Endereço de entrega é obrigatório quando você entrega na sede da ONG');
    }
  }
};
