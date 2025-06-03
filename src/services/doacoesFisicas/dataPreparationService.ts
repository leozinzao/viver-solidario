
export const dataPreparationService = {
  // Preparar dados para inserção
  prepareDataForInsertion(dadosDoacao: any) {
    return {
      titulo: dadosDoacao.titulo,
      descricao: dadosDoacao.descricao || null,
      categoria_id: dadosDoacao.categoria_id,
      quantidade: Number(dadosDoacao.quantidade),
      unidade: dadosDoacao.unidade,
      endereco_coleta: dadosDoacao.endereco_coleta || null,
      tipo_entrega: dadosDoacao.tipo_entrega || 'retirada',
      endereco_entrega: dadosDoacao.endereco_entrega || null,
      observacoes: dadosDoacao.observacoes || null,
      observacoes_entrega: dadosDoacao.observacoes_entrega || null,
      doador_id: dadosDoacao.doador_id,
      localizacao: dadosDoacao.localizacao || null,
      status: 'disponivel'
    };
  }
};
