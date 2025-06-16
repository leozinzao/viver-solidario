
export interface DoacaoFisica {
  id: string;
  titulo: string;
  descricao?: string;
  categoria_id: string;
  categoria?: {
    nome: string;
    cor?: string;
    icone?: string;
  };
  quantidade: number;
  unidade: string;
  status: 'cadastrada' | 'aceita' | 'recebida' | 'entregue' | 'cancelada';
  endereco_coleta: string;
  tipo_entrega: 'retirada' | 'entrega_doador';
  endereco_entrega?: string;
  observacoes?: string;
  observacoes_entrega?: string;
  doador_id: string;
  doador?: {
    nome: string;
    email: string;
  };
  beneficiario_id?: string;
  reservado_por?: {
    nome: string;
    email: string;
  };
  localizacao?: string;
  data_entrega?: string;
  data_reserva?: string;
  created_at: string;
  updated_at: string;
  
  // Novos campos para impacto
  tipo_beneficiario?: 'pessoa_fisica' | 'familia' | 'instituicao' | 'ong';
  pessoas_impactadas?: number;
  localidade_entrega?: string;
  observacoes_impacto?: string;
  responsavel_ong_id?: string;
  data_aceita?: string;
  observacoes_ong?: string;
}

export interface Categoria {
  id: string;
  nome: string;
  descricao?: string;
  cor?: string;
  icone?: string;
}

export interface ContadoresDoacoes {
  total: number;
  cadastrada: number;
  aceita: number;
  recebida: number;
  entregue: number;
  cancelada: number;
}

export interface FiltrosDoacoes {
  status?: string;
  categoria_id?: string;
  doador_id?: string;
  page?: number;
  limit?: number;
}

export interface EstatisticasImpacto {
  total_doacoes_entregues: number;
  total_pessoas_impactadas: number;
  total_localidades_atendidas: number;
  por_categoria: Array<{
    categoria: string;
    quantidade_doacoes: number;
    pessoas_impactadas: number;
  }>;
  por_tipo_beneficiario: Array<{
    tipo: string;
    quantidade: number;
    pessoas_impactadas: number;
  }>;
}
