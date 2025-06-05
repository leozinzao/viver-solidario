
# Diagrama de Entidade-Relacionamento (DER) - Viver Solidário

## Diagrama Principal do Banco de Dados

```mermaid
erDiagram
    voluntarios {
        uuid id PK
        text nome
        text email UK
        text telefone
        text role
        boolean ativo
        text senha_hash
        date nascimento
        text theme
    }

    doadores {
        uuid id PK
        text nome
        text email
        text telefone
        text documento
        text endereco
        timestamp created_at
    }

    categorias_doacoes {
        uuid id PK
        text nome
        text descricao
        text cor
        text icone
        timestamp created_at
    }

    doacoes_fisicas_novas {
        uuid id PK
        uuid doador_id FK
        uuid beneficiario_id FK
        uuid categoria_id FK
        text titulo
        text descricao
        numeric quantidade
        text unidade
        text status
        text tipo_entrega
        text endereco_coleta
        text endereco_entrega
        text localizacao
        text observacoes
        text observacoes_entrega
        timestamp data_disponivel
        timestamp data_reserva
        timestamp data_entrega
        integer avaliacao_doador
        integer avaliacao_beneficiario
        text comentario_avaliacao
        text[] fotos
        timestamp created_at
        timestamp updated_at
    }

    doacoes {
        uuid id PK
        uuid doador_id FK
        integer forma_id FK
        text descricao
        numeric valor
        timestamp data
    }

    formas_de_doacao {
        integer id PK
        text nome
        text descricao
    }

    eventos {
        uuid id PK
        text titulo
        text resumo
        text link
        date data_inicio
        date data_fim
        timestamp created_at
    }

    pontos_de_coleta {
        uuid id PK
        text nome
        text endereco
        text telefone
        timestamp created_at
    }

    atividades_voluntarias {
        uuid id PK
        text nome
        text descricao
        numeric horas_prev
        date data
    }

    voluntarios_atividades {
        uuid voluntario_id FK
        uuid atividade_id FK
        numeric horas
        date data_part
    }

    eventos_voluntarios {
        uuid id PK
        text nome
        text descricao
        date data
        text local
    }

    voluntarios_eventos {
        uuid voluntario_id FK
        uuid evento_id FK
        numeric horas
    }

    mensagens_doacoes {
        uuid id PK
        uuid remetente_id FK
        uuid destinatario_id FK
        uuid doacao_id FK
        text mensagem
        boolean lida
        timestamp created_at
    }

    notificacoes_doacoes {
        uuid id PK
        uuid usuario_id FK
        uuid doacao_id FK
        text tipo
        text titulo
        text mensagem
        boolean lida
        timestamp created_at
    }

    admin_actions {
        uuid id PK
        uuid admin_id FK
        text action_type
        text target_type
        uuid target_id
        text description
        jsonb metadata
        timestamp created_at
    }

    brecho_do_bem {
        uuid id PK
        uuid doador_id FK
        text item
        text status
        numeric valor_estimado
        timestamp data
    }

    cofrinhos {
        uuid id PK
        uuid ponto_id FK
        text status
        numeric valor
        date data_coleta
    }

    cupons_fiscais {
        uuid id PK
        uuid doador_id FK
        text numero
        numeric valor
        timestamp data
    }

    doacoes_produtos_servicos {
        uuid id PK
        uuid doador_id FK
        text descricao
        timestamp data
    }

    %% Relacionamentos principais
    doacoes_fisicas_novas ||--o{ doadores : "doador_id"
    doacoes_fisicas_novas ||--o{ doadores : "beneficiario_id"
    doacoes_fisicas_novas ||--|| categorias_doacoes : "categoria_id"
    
    doacoes ||--o{ doadores : "doador_id"
    doacoes ||--|| formas_de_doacao : "forma_id"
    
    voluntarios_atividades ||--|| voluntarios : "voluntario_id"
    voluntarios_atividades ||--|| atividades_voluntarias : "atividade_id"
    
    voluntarios_eventos ||--|| voluntarios : "voluntario_id"
    voluntarios_eventos ||--|| eventos_voluntarios : "evento_id"
    
    mensagens_doacoes ||--|| doacoes_fisicas_novas : "doacao_id"
    mensagens_doacoes ||--o{ voluntarios : "remetente_id"
    mensagens_doacoes ||--o{ voluntarios : "destinatario_id"
    
    notificacoes_doacoes ||--o{ doacoes_fisicas_novas : "doacao_id"
    notificacoes_doacoes ||--|| voluntarios : "usuario_id"
    
    brecho_do_bem ||--o{ doadores : "doador_id"
    cofrinhos ||--o{ pontos_de_coleta : "ponto_id"
    cupons_fiscais ||--o{ doadores : "doador_id"
    doacoes_produtos_servicos ||--o{ doadores : "doador_id"
```

## Entidades Principais e Suas Funções

### 1. Gestão de Usuários
- **voluntarios**: Usuários do sistema (doadores, voluntários, administradores)
- **doadores**: Perfil específico de doadores com informações adicionais

### 2. Sistema de Doações
- **doacoes_fisicas_novas**: Doações de itens físicos (principal módulo)
- **categorias_doacoes**: Classificação das doações físicas
- **doacoes**: Doações financeiras
- **formas_de_doacao**: Métodos de pagamento (PIX, PayPal, etc.)

### 3. Sistema de Voluntariado
- **atividades_voluntarias**: Atividades disponíveis para voluntários
- **voluntarios_atividades**: Relacionamento voluntário-atividade
- **eventos_voluntarios**: Eventos específicos de voluntariado
- **voluntarios_eventos**: Participação em eventos

### 4. Sistema de Comunicação
- **mensagens_doacoes**: Comunicação entre usuários sobre doações
- **notificacoes_doacoes**: Notificações do sistema

### 5. Gestão Administrativa
- **admin_actions**: Log de ações administrativas
- **eventos**: Eventos e campanhas da ONG
- **pontos_de_coleta**: Locais para coleta de doações

### 6. Módulos Específicos
- **brecho_do_bem**: Doações para o brechó da ONG
- **cofrinhos**: Gestão de cofrinhos de coleta
- **cupons_fiscais**: Controle de cupons fiscais
- **doacoes_produtos_servicos**: Doações de produtos e serviços

## Relacionamentos Importantes

1. **Um doador pode fazer múltiplas doações** (físicas e financeiras)
2. **Uma doação física pode ter um beneficiário** (quem recebe)
3. **Voluntários podem participar de múltiplas atividades e eventos**
4. **Doações físicas podem gerar mensagens** entre doador e beneficiário
5. **Sistema de notificações** vinculado às doações
6. **Logs administrativos** para auditoria de ações

## Status e Fluxos

### Status de Doações Físicas:
- `disponivel` → `reservada` → `entregue`
- Possibilidade de `cancelada` em qualquer etapa

### Tipos de Usuários (role):
- `donor`: Doador comum
- `volunteer`: Voluntário
- `internal`: Funcionário interno
- `admin`: Administrador completo

Este diagrama representa a estrutura completa do banco de dados do sistema Viver Solidário, mostrando todas as entidades e seus relacionamentos.
