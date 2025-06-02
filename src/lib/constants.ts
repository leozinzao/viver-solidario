
// Constantes para padronização de status e tipos
export const STATUS_DOACAO = {
  DISPONIVEL: 'disponivel',
  RESERVADA: 'reservada', 
  ENTREGUE: 'entregue',
  CANCELADA: 'cancelada'
} as const;

export const ROLES_USUARIO = {
  ADMIN: 'admin',
  INTERNAL: 'internal',
  VOLUNTEER: 'volunteer',
  DONOR: 'donor',
  VISITOR: 'visitor'
} as const;

export const TIPOS_NOTIFICACAO = {
  NOVA_DOACAO: 'nova_doacao',
  DOACAO_RESERVADA: 'doacao_reservada',
  DOACAO_ENTREGUE: 'doacao_entregue',
  EVENTO_CRIADO: 'evento_criado',
  LEMBRETE_EVENTO: 'lembrete_evento'
} as const;

export const UNIDADES_MEDIDA = {
  UNIDADE: 'unidade',
  KG: 'kg',
  LITRO: 'litro',
  CAIXA: 'caixa',
  PACOTE: 'pacote',
  METRO: 'metro'
} as const;

// Mensagens padronizadas de erro
export const ERROR_MESSAGES = {
  UNAUTHORIZED: 'Acesso não autorizado',
  FORBIDDEN: 'Permissão negada',
  NOT_FOUND: 'Recurso não encontrado',
  VALIDATION_ERROR: 'Dados inválidos fornecidos',
  SERVER_ERROR: 'Erro interno do servidor',
  DUPLICATE_ENTRY: 'Registro já existe',
  INVALID_CREDENTIALS: 'Credenciais inválidas'
} as const;

// Mensagens de sucesso
export const SUCCESS_MESSAGES = {
  CREATED: 'Criado com sucesso',
  UPDATED: 'Atualizado com sucesso',
  DELETED: 'Removido com sucesso',
  OPERATION_SUCCESS: 'Operação realizada com sucesso'
} as const;
