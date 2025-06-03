
import { doacoesFisicasService } from './doacoesFisicasService';

export const doacaoUnificadaService = {
  // Mapear dados do Brechó do Bem para o sistema unificado
  async criarDoacaoBrecho(dadosBrecho: {
    tipoRoupa: string;
    tamanho: string;
    estado: string;
    descricao: string;
    foto?: File;
  }, doadorId: string) {
    console.log('Criando doação Brechó:', dadosBrecho);

    // Buscar a categoria de roupas existente ou usar a primeira disponível
    const categorias = await doacoesFisicasService.listarCategorias();
    console.log('Categorias disponíveis:', categorias);
    
    // Procurar por categoria de roupas
    let categoriaRoupas = categorias.find(cat => 
      cat.nome.toLowerCase().includes('roupa') || 
      cat.nome.toLowerCase().includes('vestuário') ||
      cat.nome.toLowerCase().includes('têxtil')
    );
    
    // Se não encontrar categoria específica, usar a primeira disponível
    if (!categoriaRoupas && categorias.length > 0) {
      categoriaRoupas = categorias[0];
      console.log('Usando primeira categoria disponível:', categoriaRoupas);
    }
    
    if (!categoriaRoupas) {
      throw new Error('Nenhuma categoria encontrada. Verifique se existem categorias cadastradas.');
    }

    const dadosUnificados = {
      titulo: `${dadosBrecho.tipoRoupa} - Tamanho ${dadosBrecho.tamanho}`,
      descricao: `${dadosBrecho.descricao}\nEstado: ${dadosBrecho.estado}`,
      categoria_id: categoriaRoupas.id,
      quantidade: 1,
      unidade: 'unidade',
      tipo_entrega: 'entrega_doador',
      endereco_entrega: 'Sede da ONG - Rua Bernardo Sayão, 319, Jd. Petrópolis',
      observacoes: 'Doação para o Brechó do Bem',
      doador_id: doadorId
    };

    console.log('Dados unificados Brechó:', dadosUnificados);
    return doacoesFisicasService.criarDoacao(dadosUnificados);
  },

  // Mapear dados de Alimentos para o sistema unificado
  async criarDoacaoAlimentos(dadosAlimentos: {
    tipoItem: string;
    nomeItem: string;
    quantidade: string;
    unidade: string;
    validade?: string;
    observacoes: string;
  }, doadorId: string) {
    console.log('Criando doação Alimentos:', dadosAlimentos);

    // Buscar a categoria de alimentos existente ou usar a primeira disponível
    const categorias = await doacoesFisicasService.listarCategorias();
    console.log('Categorias disponíveis:', categorias);
    
    // Procurar por categoria de alimentos
    let categoriaAlimentos = categorias.find(cat => 
      cat.nome.toLowerCase().includes('alimento') || 
      cat.nome.toLowerCase().includes('comida') ||
      cat.nome.toLowerCase().includes('cesta') ||
      cat.nome.toLowerCase().includes('básica')
    );
    
    // Se não encontrar categoria específica, usar a primeira disponível
    if (!categoriaAlimentos && categorias.length > 0) {
      categoriaAlimentos = categorias[0];
      console.log('Usando primeira categoria disponível:', categoriaAlimentos);
    }
    
    if (!categoriaAlimentos) {
      throw new Error('Nenhuma categoria encontrada. Verifique se existem categorias cadastradas.');
    }

    const dadosUnificados = {
      titulo: dadosAlimentos.nomeItem,
      descricao: `Tipo: ${dadosAlimentos.tipoItem}\n${dadosAlimentos.observacoes}${dadosAlimentos.validade ? `\nValidade: ${dadosAlimentos.validade}` : ''}`,
      categoria_id: categoriaAlimentos.id,
      quantidade: Number(dadosAlimentos.quantidade) || 1,
      unidade: dadosAlimentos.unidade || 'unidade',
      tipo_entrega: 'entrega_doador',
      endereco_entrega: 'Sede da ONG - Rua Bernardo Sayão, 319, Jd. Petrópolis',
      observacoes: 'Doação de alimentos/cesta básica',
      doador_id: doadorId
    };

    console.log('Dados unificados Alimentos:', dadosUnificados);
    return doacoesFisicasService.criarDoacao(dadosUnificados);
  }
};
