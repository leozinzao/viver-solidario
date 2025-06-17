
# Diagramas Técnicos Complementares

## 1. Fluxo de Autenticação
```mermaid
sequenceDiagram
    participant U as Usuário
    participant F as Frontend
    participant S as Supabase Auth
    participant D as Database
    
    U->>F: Login (email/senha)
    F->>S: signInWithPassword()
    S-->>F: JWT + Refresh Token
    F->>D: Query com JWT
    D->>D: Valida JWT + RLS
    D-->>F: Dados filtrados
    F-->>U: Interface atualizada
```

## 2. Fluxo de Doação
```mermaid
stateDiagram-v2
    [*] --> Cadastrada: Doador cria doação
    Cadastrada --> Aceita: Admin aprova
    Cadastrada --> Cancelada: Admin/Doador cancela
    Aceita --> Recebida: ONG confirma recebimento
    Aceita --> Cancelada: Admin cancela
    Recebida --> [*]: Processo finalizado
    Cancelada --> [*]: Processo finalizado
```

## 3. Arquitetura de Dados
```mermaid
erDiagram
    voluntarios ||--o{ admin_actions : "admin_id"
    voluntarios ||--o{ doacoes_fisicas_novas : "doador_id"
    voluntarios ||--o{ mensagens_doacoes : "remetente_id"
    voluntarios ||--o{ notificacoes_doacoes : "usuario_id"
    
    doacoes_fisicas_novas ||--|| categorias_doacoes : "categoria_id"
    doacoes_fisicas_novas ||--o{ mensagens_doacoes : "doacao_id"
    doacoes_fisicas_novas ||--o{ notificacoes_doacoes : "doacao_id"
    
    doadores ||--o{ doacoes_fisicas_novas : "beneficiario_id"
```

## 4. Pipeline de Deployment
```mermaid
flowchart TD
    A[Código no Lovable] --> B[Build Automático]
    B --> C[Testes Unitários]
    C --> D{Testes OK?}
    D -->|Sim| E[Deploy Staging]
    D -->|Não| F[Notificar Desenvolvedor]
    E --> G[Migrations Database]
    G --> H[Deploy Produção]
    H --> I[Health Check]
    I --> J{Sistema OK?}
    J -->|Sim| K[Deploy Concluído]
    J -->|Não| L[Rollback Automático]
```

## 5. Estrutura de Permissões
```mermaid
graph TD
    A[Usuário Autenticado] --> B{Verificar Role}
    B -->|donor| C[Ver próprias doações]
    B -->|volunteer| D[Participar eventos]
    B -->|internal| E[Gerenciar doações]
    B -->|admin| F[Acesso total]
    
    C --> G[RLS Policy: doador_id = auth.uid()]
    D --> H[RLS Policy: participar eventos]
    E --> I[RLS Policy: is_admin() OR is_internal()]
    F --> J[RLS Policy: is_admin()]
```
