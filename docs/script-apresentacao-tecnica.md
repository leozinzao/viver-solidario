
# Script para Apresentação Técnica - DER Viver Solidário

## Slide 1: Título
**"Arquitetura de Banco de Dados - Sistema Viver Solidário"**
- "Hoje vamos mergulhar na arquitetura técnica do nosso sistema de gestão de doações"
- "Foco nos aspectos mais técnicos do DER e decisões arquiteturais"

---

## Slide 2: Visão Geral da Arquitetura
**"Stack Tecnológico"**
- "Utilizamos PostgreSQL como banco principal, hospedado no Supabase"
- "React + TypeScript no frontend com Tailwind CSS"
- "PWA com capacidades offline"
- "Row Level Security para isolamento de dados"

---

## Slide 3: Estratégia de Identificação
**"Por que UUIDs?"**
- "Todos os IDs primários utilizam UUID v4"
- "Vantagens: distribuição, segurança, unicidade global"
- "Evita problemas de colisão em sistemas distribuídos"
- "Melhor para APIs públicas - não expõe volume de dados"

---

## Slide 4: Entidades Principais
**"Separação de Responsabilidades"**
- "voluntarios: usuários do sistema com roles específicos"
- "doadores: perfil estendido para quem doa"
- "doacoes_fisicas_novas: core do sistema"
- "Separação clara evita problemas de herança de tabelas"

---

## Slide 5: Sistema de Doações (Core)
**"Máquina de Estados"**
- "Status: disponivel → aceita → recebida"
- "Possibilidade de cancelamento em qualquer estado"
- "Campos de auditoria: created_at, updated_at, data_entrega"
- "Relacionamentos opcionais para flexibilidade"

---

## Slide 6: Row Level Security (RLS)
**"Segurança a Nível de Linha"**
```sql
CREATE POLICY "Usuários podem ver seu próprio perfil" 
  ON public.voluntarios FOR SELECT 
  USING (id = auth.uid());
```
- "Cada linha tem suas próprias regras de acesso"
- "Performance superior a filtros na aplicação"
- "Segurança garantida mesmo com acesso direto ao banco"

---

## Slide 7: Funções de Segurança
**"Security Definer Functions"**
```sql
CREATE FUNCTION public.is_admin(user_id uuid)
RETURNS boolean SECURITY DEFINER AS $$
  SELECT EXISTS (SELECT 1 FROM voluntarios 
    WHERE id = user_id AND role IN ('admin', 'internal'));
$$;
```
- "Evita recursão infinita em políticas RLS"
- "Centraliza lógica de permissões"
- "Executa com privilégios elevados de forma segura"

---

## Slide 8: Sistema de Auditoria
**"Rastreabilidade Completa"**
- "admin_actions: log de todas as ações administrativas"
- "Metadados em JSONB para flexibilidade"
- "Compliance com LGPD e auditoria"
- "Possibilita análises de uso e debugging"

---

## Slide 9: Comunicação Entre Usuários
**"Mensagens e Notificações"**
- "mensagens_doacoes: chat entre doador e beneficiário"
- "notificacoes_doacoes: alertas do sistema"
- "Status de lida para UX otimizada"
- "Vinculação com doações específicas"

---

## Slide 10: Performance e Indexação
**"Otimização de Consultas"**
```sql
CREATE INDEX idx_doacoes_status ON doacoes_fisicas_novas(status);
CREATE INDEX idx_doacoes_doador ON doacoes_fisicas_novas(doador_id);
```
- "Índices estratégicos baseados nos filtros mais utilizados"
- "Paginação eficiente com LIMIT/OFFSET"
- "Cache inteligente via React Query"

---

## Slide 11: Autenticação e Autorização
**"Supabase Auth Integration"**
- "JWT tokens com refresh automático"
- "Integração nativa com políticas RLS"
- "Suporte a OAuth providers"
- "Roles granulares: donor, volunteer, internal, admin"

---

## Slide 12: Backup e Recovery
**"Estratégia de Continuidade"**
- "Point-in-time recovery com 7 dias de retenção"
- "Snapshots automáticos diários"
- "Replicação cross-region para disaster recovery"
- "RTO: 4 horas, RPO: 1 hora"

---

## Slide 13: Monitoramento
**"Observabilidade"**
- "PostgreSQL logs + Application logs"
- "Métricas de performance: query time < 200ms (P95)"
- "Alertas automáticos para thresholds"
- "Dashboard de saúde do sistema"

---

## Slide 14: Migrations e Versionamento
**"Controle de Mudanças"**
- "Migrations versionadas com timestamps"
- "Rollback automático em caso de erro"
- "Testes de migration em ambiente de staging"
- "Schema como código"

---

## Slide 15: Compliance e LGPD
**"Proteção de Dados"**
- "Campos de consentimento nas tabelas de usuários"
- "Funcionalidade de exclusão completa (right to be forgotten)"
- "Logs de acesso com retenção de 2 anos"
- "Criptografia TLS/SSL end-to-end"

---

## Slide 16: Escalabilidade
**"Crescimento Sustentável"**
- "Arquitetura suporta milhares de usuários simultâneos"
- "Pool de conexões otimizado (20 conexões)"
- "Read replicas para consultas pesadas"
- "Particionamento futuro para tabelas grandes"

---

## Slide 17: Roadmap Técnico
**"Próximos Passos"**
- "Implementação de cache Redis"
- "Testes automatizados (unit + integration)"
- "Event Sourcing para auditoria avançada"
- "CQRS para separação leitura/escrita"

---

## Slide 18: Métricas Atuais
**"KPIs Técnicos"**
- "Uptime: 99.9% target"
- "Page Load Time: < 3s (LCP)"
- "Database Response Time: < 200ms (P95)"
- "Error Rate: < 0.1%"

---

## Slide 19: Lições Aprendidas
**"Decisões Arquiteturais"**
- "UUIDs: complexidade inicial, benefícios a longo prazo"
- "RLS: curva de aprendizado, mas segurança superior"
- "Supabase: velocidade de desenvolvimento vs vendor lock-in"
- "TypeScript: overhead inicial, manutenibilidade excelente"

---

## Slide 20: Conclusão
**"Arquitetura Robusta e Escalável"**
- "DER bem estruturado com separação clara de responsabilidades"
- "Segurança por design com RLS e funções específicas"
- "Performance otimizada com índices estratégicos"
- "Pronto para crescimento e novos módulos"

---

## Perguntas e Respostas
**"Dúvidas Técnicas"**
- "Estou disponível para esclarecer qualquer aspecto técnico"
- "Podemos detalhar implementações específicas"
- "Discussão sobre alternativas arquiteturais"
