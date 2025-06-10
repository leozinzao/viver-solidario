
export const dataPreparationService = {
  // Preparar dados para inserção na tabela
  prepareDataForInsertion(dadosDoacao: any): any {
    console.log('DataPrep: Preparando dados para inserção:', dadosDoacao);

    // Garantir que campos obrigatórios estão presentes
    const dadosPreparados = {
      // Campos obrigatórios
      titulo: dadosDoacao.titulo?.trim() || '',
      quantidade: Number(dadosDoacao.quantidade) || 1,
      unidade: dadosDoacao.unidade || 'unidade',
      status: 'disponivel', // Status inicial correto
      doador_id: dadosDoacao.doador_id, // DEVE vir preenchido

      // Campos opcionais
      descricao: dadosDoacao.descricao?.trim() || null,
      categoria_id: dadosDoacao.categoria_id || null,
      localizacao: dadosDoacao.localizacao?.trim() || null,
      endereco_coleta: dadosDoacao.endereco_coleta?.trim() || null,
      tipo_entrega: dadosDoacao.tipo_entrega || 'retirada',
      endereco_entrega: dadosDoacao.endereco_entrega?.trim() || null,
      observacoes: dadosDoacao.observacoes?.trim() || null,
      observacoes_entrega: dadosDoacao.observacoes_entrega?.trim() || null,

      // Timestamps
      data_disponivel: new Date().toISOString(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    console.log('DataPrep: Dados preparados:', dadosPreparados);

    // Validar se doador_id foi preenchido
    if (!dadosPreparados.doador_id) {
      throw new Error('ID do doador é obrigatório para criar uma doação');
    }

    return dadosPreparados;
  }
};
