
-- Remove tabelas não utilizadas no sistema atual

-- Primeiro, remover tabelas que têm foreign keys
DROP TABLE IF EXISTS voluntarios_atividades CASCADE;
DROP TABLE IF EXISTS voluntarios_eventos CASCADE;
DROP TABLE IF EXISTS doacoes CASCADE;
DROP TABLE IF EXISTS doacoes_fisicas CASCADE;
DROP TABLE IF EXISTS brecho_do_bem CASCADE;
DROP TABLE IF EXISTS cofrinhos CASCADE;
DROP TABLE IF EXISTS cupons_fiscais CASCADE;
DROP TABLE IF EXISTS doacoes_produtos_servicos CASCADE;

-- Depois, remover tabelas independentes
DROP TABLE IF EXISTS atividades_voluntarias CASCADE;
DROP TABLE IF EXISTS eventos_voluntarios CASCADE;
DROP TABLE IF EXISTS formas_de_doacao CASCADE;
DROP TABLE IF EXISTS pontos_de_coleta CASCADE;
DROP TABLE IF EXISTS users CASCADE;

-- Comentário: Mantemos apenas as tabelas ativas:
-- - voluntarios (autenticação e usuários)
-- - doadores (perfis de doadores)
-- - categorias_doacoes (categorias para doações)
-- - doacoes_fisicas_novas (sistema principal de doações)
-- - admin_actions (logs administrativos)
-- - eventos (sistema de eventos)
-- - notificacoes_doacoes (notificações)
-- - mensagens_doacoes (comunicação entre usuários)
