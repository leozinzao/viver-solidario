# Viver Solidário App

Aplicação web/mobile inspirada na ONG Viver — desenvolvida para divulgar eventos, campanhas de doação (financeira e física), oportunidades de voluntariado e facilitar a gestão interna da ONG.

🎥 [Clique aqui para ver a demonstração do projeto no Google Drive](https://drive.google.com/drive/u/0/folders/1wH5g9WqVU6XCyS0yxyqVmzMOAhmWn70p)


---

## 1. ✨ Funcionalidades (até 03/06/2025)

| Área                 | Descrição                                                                                       |
|----------------------|------------------------------------------------------------------------------------------------|
| Dashboard            | Destaques da ONG, próximos eventos, campanhas ativas, atalhos de participação                  |
| Doações              | Doações financeiras (Pix, PayPal, PicPay) e físicas (cadastro, status, histórico, gestão admin) |
| Eventos              | Lista dos eventos mais recentes, detalhes e links para artigos oficiais                        |
| Voluntariado         | Grupos de trabalho (Acolhida, Artesanato, Brechó, Cozinha, etc.) + formulário Trabalhe Conosco |
| Perfil / Impacto     | Área do usuário/voluntário, histórico de doações, visualização de impacto                      |
| Administração (Admin)| Painel para gestão de doações, voluntários, usuários e estatísticas                            |
| Autenticação         | Login seguro, controle de permissões para admins e usuários comuns                             |
| Termos & Privacidade | Páginas dedicadas para Política de Privacidade e Termos de Uso                                 |

---

## 2. 🏗️ Stack Tecnológica

- **Frontend:** React (TypeScript), TailwindCSS, React Query
- **Backend:** Node.js + Express, Supabase (PostgreSQL, autenticação, storage)
- **Infraestrutura:** Deploy em Vercel/Netlify; Supabase gerenciado na nuvem
- **APIs:** RESTful, documentadas com Swagger

---

## 3. 🚧 Evolução do Projeto (até 03/06/2025)

- Estrutura inicial do frontend web/mobile criada, com componentes reutilizáveis
- Backend REST estruturado com autenticação, rotas para eventos, doações, voluntários e usuários
- Integração com Supabase para dados, autenticação e storage de arquivos
- Cadastro e listagem de doações físicas e financeiras funcionando
- Telas de login, dashboard, eventos, voluntariado, perfil e administração implementadas
- Criação das páginas de termos de uso e política de privacidade
- Documentação inicial das APIs com Swagger
- Estrutura de permissões para usuários comuns e administradores
- Pipeline de deploy automatizado para frontend

---

## 4. 📂 Estrutura de pastas

```
src/
├─ components/            
│   └─ ui/                
├─ context/              
├─ pages/               
│   └─ Index.tsx          
├─ screens/               
└─ assets/                
```

---

## 5. 📈 Próximos Passos & Melhorias Futuras

- Implementação de notificações (e-mail/push) para eventos e status de doações
- Chat integrado para contato direto entre doador e ONG
- Relatórios e gráficos no painel admin para transparência e prestação de contas
- Gamificação (badges, ranking de voluntários/doadores)
- Mapa de pontos de coleta e eventos com geolocalização
- Testes automatizados e cobertura de código
- Mais recursos de acessibilidade

---

## 6. 📜 Histórico de Commits

Acompanhe a evolução do projeto através dos [commits no GitHub](https://github.com/leozinzao/viver-solidario/commits/main).

---
