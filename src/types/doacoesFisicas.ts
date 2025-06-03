
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
  status: 'disponivel' | 'reservada' | 'entregue' | 'cancelada';
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
  disponivel: number;
  reservada: number;
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
