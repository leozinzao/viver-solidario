
import { validationService } from './doacoesFisicas/validationService';
import { doacaoCrudService } from './doacoesFisicas/doacaoCrudService';
import { categoriaService } from './doacoesFisicas/categoriaService';
import { estatisticasService } from './doacoesFisicas/estatisticasService';
import { dataPreparationService } from './doacoesFisicas/dataPreparationService';
import type { DoacaoFisica, Categoria, FiltrosDoacoes, ContadoresDoacoes } from '@/types/doacoesFisicas';

export { DoacaoFisica, Categoria };

export const doacoesFisicasService = {
  // Criar nova doação física
  async criarDoacao(dadosDoacao: any): Promise<DoacaoFisica> {
    console.log('Service: Dados recebidos para criação:', dadosDoacao);

    // Validar dados básicos
    validationService.validateDoacaoData(dadosDoacao);

    // Validações condicionais baseadas no tipo de entrega
    validationService.validateTipoEntrega(dadosDoacao);

    // Preparar dados para inserção
    const dadosParaInserir = dataPreparationService.prepareDataForInsertion(dadosDoacao);

    return doacaoCrudService.criarDoacao(dadosParaInserir);
  },

  // Listar doações físicas
  async listarDoacoes(filtros?: FiltrosDoacoes): Promise<DoacaoFisica[]> {
    return doacaoCrudService.listarDoacoes(filtros);
  },

  // Buscar doação por ID
  async buscarPorId(id: string): Promise<DoacaoFisica | null> {
    return doacaoCrudService.buscarPorId(id);
  },

  // Atualizar status da doação
  async atualizarStatus(id: string, status: string, usuarioId?: string): Promise<DoacaoFisica> {
    return doacaoCrudService.atualizarStatus(id, status, usuarioId);
  },

  // Excluir doação
  async excluirDoacao(id: string): Promise<void> {
    return doacaoCrudService.excluirDoacao(id);
  },

  // Listar categorias de doações
  async listarCategorias(): Promise<Categoria[]> {
    return categoriaService.listarCategorias();
  },

  // Contar doações por status
  async contarDoacoesPorStatus(doadorId?: string): Promise<ContadoresDoacoes> {
    return estatisticasService.contarDoacoesPorStatus(doadorId);
  }
};
