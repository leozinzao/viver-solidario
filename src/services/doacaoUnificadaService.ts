
import { doacoesFisicasService } from './doacoesFisicasService';
import { useCategoriasDoacoes } from '@/hooks/useCategoriasDoacoes';

export const doacaoUnificadaService = {
  // Mapear dados do Brechó do Bem para o sistema unificado
  async criarDoacaoBrecho(dadosBrecho: {
    tipoRoupa: string;
    tamanho: string;
    estado: string;
    descricao: string;
    foto?: File;
  }, doadorId: string) {
    // Buscar categoria de "Roupas" ou criar uma genérica
    const categoriaRoupas = '123e4567-e89b-12d3-a456-426614174002'; // ID fixo para roupas

    const dadosUnificados = {
      titulo: `${dadosBrecho.tipoRoupa} - Tamanho ${dadosBrecho.tamanho}`,
      descricao: `${dadosBrecho.descricao}\nEstado: ${dadosBrecho.estado}`,
      categoria_id: categoriaRoupas,
      quantidade: 1,
      unidade: 'unidade',
      tipo_entrega: 'entrega_doador',
      endereco_entrega: 'Sede da ONG - Rua Bernardo Sayão, 319, Jd. Petrópolis',
      observacoes: 'Doação para o Brechó do Bem',
      doador_id: doadorId
    };

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
    // Buscar categoria de "Alimentos" ou criar uma genérica
    const categoriaAlimentos = '123e4567-e89b-12d3-a456-426614174001'; // ID fixo para alimentos

    const dadosUnificados = {
      titulo: dadosAlimentos.nomeItem,
      descricao: `Tipo: ${dadosAlimentos.tipoItem}\n${dadosAlimentos.observacoes}${dadosAlimentos.validade ? `\nValidade: ${dadosAlimentos.validade}` : ''}`,
      categoria_id: categoriaAlimentos,
      quantidade: Number(dadosAlimentos.quantidade) || 1,
      unidade: dadosAlimentos.unidade || 'unidade',
      tipo_entrega: 'entrega_doador',
      endereco_entrega: 'Sede da ONG - Rua Bernardo Sayão, 319, Jd. Petrópolis',
      observacoes: 'Doação de alimentos/cesta básica',
      doador_id: doadorId
    };

    return doacoesFisicasService.criarDoacao(dadosUnificados);
  }
};
