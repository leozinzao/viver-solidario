
# Roteiro de Apresentação Técnica – DER Sistema Viver Solidário

## 1. Introdução Técnica (2 min)
**"Boa [tarde/noite]. Agora vou apresentar a arquitetura técnica do sistema Viver Solidário, focando no modelo de dados, fluxos e decisões técnicas que garantem escalabilidade e segurança."**

---

## 2. Visão Geral da Arquitetura (3 min)
**"Nosso sistema utiliza PostgreSQL com Supabase, React + TypeScript no frontend, e foi modelado pensando em:**
- **Rastreabilidade completa** de todas as operações
- **Segurança** com Row Level Security (RLS)
- **Flexibilidade** para crescimento da ONG"

**Tecnologias principais:**
- Backend: PostgreSQL + Supabase (RLS, Auth, Real-time)
- Frontend: React + TypeScript + Tailwind CSS
- Identificadores: UUIDs para todas as tabelas (segurança + distribuição)

---

## 3. DER - Entidades Principais (5 min)

### **Gestão de Usuários**
**"Separamos usuários em duas tabelas principais:**
- `voluntarios`: Todos os usuários do sistema (role: donor, volunteer, internal, admin)
- `doadores`: Perfil específico para quem faz doações físicas (documento, endereço)"

**"Essa separação permite flexibilidade - um voluntário pode também ser doador."**

### **Sistema de Doações (Core do Sistema)**
**"A tabela central é `doacoes_fisicas_novas`:**
- Relaciona doador → beneficiário → categoria
- Status: disponível → aceita → recebida (ou cancelada)
- Campos essenciais: título, quantidade, tipo_entrega, endereços
- Avaliações bidirecionais (doador e beneficiário)"

### **Categorização**
**"`categorias_doacoes` organiza os tipos aceitos:**
- Alimentos, roupas, móveis, eletrônicos, etc.
- Cor e ícone para identificação visual
- Facilita filtros e relatórios"

---

## 4. Fluxo Técnico de Doações (4 min)
**"Vou mostrar um fluxo completo usando o DER:"**

### **Passo 1: Cadastro**
- Doador preenche formulário → INSERT em `doacoes_fisicas_novas`
- Status inicial: `'disponível'`
- `doador_id` preenchido, `beneficiario_id` NULL

### **Passo 2: Aprovação Admin**
- Admin lista doações pendentes
- Aceita doação → status `'aceita'`
- Pode reservar para beneficiário específico → preenche `beneficiario_id`

### **Passo 3: Finalização**
- Após entrega → status `'recebida'`
- Avaliações mútuas registradas na mesma tabela

**"Cada mudança gera:"**
- Registro em `admin_actions` (auditoria)
- Notificação em `notificacoes_doacoes`
- Possível mensagem em `mensagens_doacoes`

---

## 5. Segurança e RLS (3 min)
**"Implementamos Row Level Security para garantir que:**
- Doadores só veem suas próprias doações
- Admins têm acesso total
- Voluntários veem apenas o necessário para suas funções"

**Exemplo de política:**
```sql
CREATE POLICY "Doadores veem suas doações" 
  ON doacoes_fisicas_novas FOR SELECT 
  USING (doador_id = auth.uid());
```

**"Usamos funções Security Definer para evitar recursão infinita:"**
```sql
CREATE FUNCTION is_admin(user_id uuid) 
  RETURNS boolean SECURITY DEFINER;
```

---

## 6. Auditoria e Transparência (2 min)
**"Toda ação relevante é registrada:**
- `admin_actions`: Log completo de ações administrativas
- Metadados em JSONB para flexibilidade
- Compliance com LGPD e auditoria da ONG"

**"Isso permite responder perguntas como:**
- Quem aprovou esta doação?
- Quando o status foi alterado?
- Qual admin fez determinada ação?"

---

## 7. Comunicação no Sistema (2 min)
**"Temos dois tipos de comunicação:**

### **Mensagens Diretas**
- `mensagens_doacoes`: Chat entre doador e beneficiário
- Vinculadas a doações específicas
- Status de lida para UX

### **Notificações do Sistema**
- `notificacoes_doacoes`: Alertas automáticos
- Tipos: nova_doacao, status_alterado, mensagem_recebida
- Base para push notifications futuras"

---

## 8. Performance e Escalabilidade (2 min)
**"Otimizações implementadas:**
- Índices estratégicos nos campos mais consultados
- Paginação em todas as listagens
- Cache inteligente via React Query
- Queries otimizadas com JOINs mínimos"

**"Sistema preparado para:**
- Milhares de usuários simultâneos
- Crescimento orgânico sem reestruturação
- Adição de novos módulos (eventos, campanhas, etc.)"

---

## 9. Decisões Arquiteturais (2 min)
**"Principais decisões técnicas:**

### **UUIDs vs Auto-increment**
- ✅ UUIDs: Segurança, distribuição, API pública
- ❌ Auto-increment: Expõe volume, conflitos

### **Tabelas Separadas vs Herança**
- ✅ Separação: Flexibilidade, performance
- ❌ Herança: Complexidade, manutenção

### **RLS vs Filtros na Aplicação**
- ✅ RLS: Segurança garantida, performance
- ❌ Filtros app: Vulnerabilidades, overhead"

---

## 10. Demonstração Prática (3 min)
**"Agora vou mostrar como o DER se traduz em funcionalidades reais:"**

[Mostrar na tela:]
1. Cadastro de doação → INSERT na tabela
2. Listagem admin → JOIN com categorias e doadores
3. Atualização de status → UPDATE + logs automáticos
4. Notificações → Triggers e real-time

---

## 11. Roadmap Técnico (1 min)
**"Próximas evoluções planejadas:**
- Sistema de relatórios avançados
- Integração com APIs externas (CEP, pagamento)
- App mobile com sincronização offline
- Analytics de impacto social"

---

## 12. Perguntas e Encerramento (2 min)
**"Com essa arquitetura, garantimos:**
- ✅ Escalabilidade para crescimento da ONG
- ✅ Segurança dos dados dos usuários
- ✅ Transparência nas operações
- ✅ Facilidade de manutenção e evolução"

**"Estou à disposição para perguntas sobre implementação, performance, segurança ou sugestões de melhorias técnicas."**

---

## Dicas para Apresentação

### **Material de Apoio**
- Tenha o DER visual aberto/impresso
- Screenshots das principais telas
- Exemplos de queries SQL prontos

### **Durante a Apresentação**
- Aponte para tabelas específicas no DER
- Use exemplos reais de registros
- Relacione sempre regra de negócio → tabela/campo
- Demonstre domínio técnico com detalhes precisos

### **Se Perguntarem Sobre:**
- **Expansão**: "Estrutura modular permite adicionar novos módulos sem impacto"
- **Performance**: "Índices otimizados + cache + paginação"
- **Segurança**: "RLS + autenticação + logs de auditoria"
- **Manutenção**: "Código TypeScript + migrations versionadas"

### **Pontos de Destaque**
- Mencione que é um sistema real, em produção
- Enfatize as decisões técnicas pensadas para o futuro
- Mostre conhecimento das melhores práticas (RLS, UUIDs, etc.)
- Demonstre preocupação com UX e performance
