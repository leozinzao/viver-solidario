
import { validateData, doacaoFisicaSchema, enderecoSchema } from '@/lib/validation';

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
      
      // Validar endereço se schema disponível
      try {
        const validation = validateData(enderecoSchema, { endereco: dadosDoacao.endereco_coleta });
        if (!validation.success) {
          console.warn('Validation: Endereço pode ter formato inválido:', validation.error);
        }
      } catch (err) {
        console.log('Validation: Schema de endereço não disponível, pulando validação');
      }
    } 
    else if (dadosDoacao.tipo_entrega === 'entrega_doador') {
      if (!dadosDoacao.endereco_entrega?.trim()) {
        throw new Error('Endereço de entrega é obrigatório');
      }
      
      // Validar endereço se schema disponível  
      try {
        const validation = validateData(enderecoSchema, { endereco: dadosDoacao.endereco_entrega });
        if (!validation.success) {
          console.warn('Validation: Endereço pode ter formato inválido:', validation.error);
        }
      } catch (err) {
        console.log('Validation: Schema de endereço não disponível, pulando validação');
      }
    }

    console.log('Validation: Tipo de entrega válido');
  }
};
