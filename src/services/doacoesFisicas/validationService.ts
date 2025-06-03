
import { validateData, doacaoFisicaSchema } from '@/lib/validation';

export const validationService = {
  // Validar dados básicos da doação
  validateDoacaoData(dadosDoacao: any): void {
    console.log('Validation: Validando dados básicos:', dadosDoacao);

    if (!dadosDoacao.titulo?.trim()) {
      throw new Error('Título é obrigatório');
    }

    if (!dadosDoacao.categoria_id) {
      throw new Error('Categoria é obrigatória');
    }

    if (!dadosDoacao.quantidade || dadosDoacao.quantidade <= 0) {
      throw new Error('Quantidade deve ser maior que zero');
    }

    // Validar com schema se disponível
    const validation = validateData(doacaoFisicaSchema, dadosDoacao);
    if (!validation.success) {
      console.error('Validation: Erro de schema:', validation.error);
      throw new Error(`Dados inválidos: ${validation.error}`);
    }

    console.log('Validation: Dados básicos válidos');
  },

  // Validar tipo de entrega específico
  validateTipoEntrega(dadosDoacao: any): void {
    console.log('Validation: Validando tipo de entrega:', dadosDoacao.tipo_entrega);

    if (dadosDoacao.tipo_entrega === 'retirada') {
      if (!dadosDoacao.endereco_coleta?.trim()) {
        throw new Error('Endereço para retirada é obrigatório');
      }
      
      // Validação básica de endereço
      const endereco = dadosDoacao.endereco_coleta.trim();
      if (endereco.length < 10) {
        console.warn('Validation: Endereço muito curto, pode estar incompleto');
      }
    } 
    else if (dadosDoacao.tipo_entrega === 'entrega_doador') {
      if (!dadosDoacao.endereco_entrega?.trim()) {
        throw new Error('Endereço de entrega é obrigatório');
      }
      
      // Validação básica de endereço
      const endereco = dadosDoacao.endereco_entrega.trim();
      if (endereco.length < 10) {
        console.warn('Validation: Endereço muito curto, pode estar incompleto');
      }
    }

    console.log('Validation: Tipo de entrega válido');
  }
};
