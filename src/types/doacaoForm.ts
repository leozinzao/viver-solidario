
// Tipos específicos para formulários de doação
export interface DadosDoacaoForm {
  titulo: string;
  descricao?: string;
  categoria_id: string;
  quantidade: number;
  unidade: 'unidade' | 'kg' | 'g' | 'litro' | 'pacote' | 'caixa';
  localizacao?: string;
  endereco_coleta?: string;
  tipo_entrega: 'retirada' | 'entrega_doador';
  endereco_entrega?: string;
  observacoes?: string;
  observacoes_entrega?: string;
}

// Dados completos para inserção no banco (inclui campos automáticos)
export interface DadosDoacaoCompleta extends DadosDoacaoForm {
  doador_id: string;
  status: 'cadastrada' | 'disponivel' | 'reservada' | 'entregue' | 'cancelada';
  id?: string;
  created_at?: string;
  updated_at?: string;
}

// Resposta da API com dados relacionados
export interface DoacaoComRelacoes {
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
  status: string;
  endereco_coleta?: string;
  tipo_entrega: string;
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

// Resultado de operações de criação
export interface ResultadoCriacaoDoacao {
  sucesso: boolean;
  doacao?: DoacaoComRelacoes;
  erro?: string;
}
