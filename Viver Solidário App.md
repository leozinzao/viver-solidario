Aplicação web/mobile inspirada na ONG Viver — desenvolvida para divulgar eventos, programas, campanhas de doação e oportunidades de voluntariado.


#1. - ✨ Funcionalidades

Área	Descrição
Dashboard	Destaques da ONG, próximos eventos, campanhas ativas e atalhos de participação
Doações	Todas as formas de apoiar (Pix, PayPal, PicPay, produtos, eventos, cofres etc.)
Eventos	Lista dos eventos mais recentes com link para os artigos oficiais
Voluntariado	Grupos de trabalho (Acolhida, Artesanato, Brechó, Cozinha, etc.) + Trabalhe Conosco
Perfil / Impacto	Área reservada ao usuário (ou staff)      

#2 - 📂 Estrutura de pastas

src/
├─ components/            
│   └─ ui/                
├─ context/              
├─ pages/               
│   └─ Index.tsx          
├─ screens/               
└─ assets/                

#3 - 🚀 Instalação

clone
git clone https://github.com/leozinzao/viver-solidario.git
cd viver-solidario

dependências
pnpm i            # ou npm install / yarn

ambiente de dev
pnpm dev          # abre em http://localhost:5173

#4 - 🛠 Scripts úteis

Comando	Ação
pnpm dev	Inicia o servidor Vite com HMR
pnpm build	Gera a versão de produção (dist/)
pnpm preview	Servidor local para testar o build
pnpm lint	ESLint + TypeScript
pnpm format	Prettier





MIT © 2025 – Projeto acadêmico sem fins lucrativos inspirado na ONG Viver.
