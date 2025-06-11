import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  ChevronLeft, 
  ChevronRight, 
  Users, 
  Heart, 
  Smartphone, 
  Database,
  Shield,
  TrendingUp,
  Code,
  Handshake
} from 'lucide-react';

const PresentationSlides: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      title: "Viver Solidário",
      subtitle: "Aplicativo Web Progressivo para ONG",
      content: (
        <div className="text-center space-y-6">
          <img 
            src="/lovable-uploads/faca4f99-20c6-4b35-bcc4-bf561ee25dc9.png" 
            alt="Logo Viver Solidário"
            className="h-32 mx-auto"
          />
          <div className="space-y-2">
            <p className="text-lg text-gray-700">Desenvolvido por: [Seu Nome]</p>
            <p className="text-md text-gray-600">Orientador: [Nome do Orientador]</p>
            <p className="text-md text-gray-600">Curso: [Seu Curso]</p>
            <p className="text-md text-gray-600">Ano: 2025</p>
          </div>
        </div>
      )
    },
    {
      id: 2,
      title: "Problema e Contexto",
      subtitle: "A necessidade de digitalização do terceiro setor",
      content: (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border-red-200 bg-red-50">
              <CardContent className="p-6">
                <h4 className="font-semibold text-red-800 mb-3">Desafios Identificados</h4>
                <ul className="space-y-2 text-sm text-red-700">
                  <li>• Gestão manual de doações</li>
                  <li>• Comunicação limitada com voluntários</li>
                  <li>• Baixa visibilidade das ações</li>
                  <li>• Processos burocráticos lentos</li>
                </ul>
              </CardContent>
            </Card>
            <Card className="border-green-200 bg-green-50">
              <CardContent className="p-6">
                <h4 className="font-semibold text-green-800 mb-3">Oportunidades</h4>
                <ul className="space-y-2 text-sm text-green-700">
                  <li>• Automatização de processos</li>
                  <li>• Maior engajamento digital</li>
                  <li>• Transparência nas ações</li>
                  <li>• Alcance ampliado</li>
                </ul>
              </CardContent>
            </Card>
          </div>
          <div className="text-center p-4 bg-viver-yellow/10 rounded-lg">
            <p className="text-gray-800">
              <strong>A ONG Viver</strong> atende crianças e adolescentes com câncer há mais de 20 anos, 
              necessitando de uma solução digital moderna para otimizar suas operações.
            </p>
          </div>
        </div>
      )
    },
    {
      id: 3,
      title: "Objetivos do Projeto",
      subtitle: "Proposta de solução tecnológica",
      content: (
        <div className="space-y-6">
          <Card className="border-viver-yellow bg-viver-yellow/5">
            <CardContent className="p-6">
              <h4 className="font-semibold text-viver-yellow mb-3 flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Objetivo Geral
              </h4>
              <p className="text-gray-700">
                Desenvolver um aplicativo web progressivo (PWA) para facilitar a gestão 
                e participação em atividades da ONG Viver, integrando doações, voluntariado 
                e comunicação em uma plataforma única e acessível.
              </p>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardContent className="p-4">
                <h5 className="font-semibold mb-2">Objetivos Específicos</h5>
                <ul className="text-sm space-y-1">
                  <li>• Implementar sistema de doações físicas</li>
                  <li>• Criar portal de voluntariado</li>
                  <li>• Desenvolver painel administrativo</li>
                  <li>• Garantir acessibilidade mobile</li>
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <h5 className="font-semibold mb-2">Benefícios Esperados</h5>
                <ul className="text-sm space-y-1">
                  <li>• Maior eficiência operacional</li>
                  <li>• Ampliação do alcance social</li>
                  <li>• Transparência nos processos</li>
                  <li>• Experiência do usuário aprimorada</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      )
    },
    {
      id: 4,
      title: "Arquitetura e Tecnologias",
      subtitle: "Stack tecnológico moderno e escalável",
      content: (
        <div className="space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="text-center">
              <CardContent className="p-4">
                <Code className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                <h5 className="font-semibold text-sm">Frontend</h5>
                <p className="text-xs text-gray-600">React + TypeScript</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="p-4">
                <Database className="h-8 w-8 mx-auto mb-2 text-green-600" />
                <h5 className="font-semibold text-sm">Backend</h5>
                <p className="text-xs text-gray-600">Supabase</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="p-4">
                <Smartphone className="h-8 w-8 mx-auto mb-2 text-purple-600" />
                <h5 className="font-semibold text-sm">Mobile</h5>
                <p className="text-xs text-gray-600">PWA</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="p-4">
                <Shield className="h-8 w-8 mx-auto mb-2 text-red-600" />
                <h5 className="font-semibold text-sm">Segurança</h5>
                <p className="text-xs text-gray-600">RLS + Auth</p>
              </CardContent>
            </Card>
          </div>
          
          <div className="bg-gray-50 p-6 rounded-lg">
            <h4 className="font-semibold mb-4">Principais Tecnologias Utilizadas</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <h5 className="font-semibold text-blue-600">Frontend</h5>
                <ul className="space-y-1 text-gray-700">
                  <li>• React 18 com TypeScript</li>
                  <li>• Tailwind CSS para estilização</li>
                  <li>• Shadcn/UI para componentes</li>
                  <li>• React Router para navegação</li>
                </ul>
              </div>
              <div>
                <h5 className="font-semibold text-green-600">Backend & Infraestrutura</h5>
                <ul className="space-y-1 text-gray-700">
                  <li>• Supabase (PostgreSQL + Auth)</li>
                  <li>• Row Level Security (RLS)</li>
                  <li>• Edge Functions</li>
                  <li>• PWA com Service Workers</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 5,
      title: "Funcionalidades Principais",
      subtitle: "Módulos implementados no sistema",
      content: (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border-l-4 border-l-viver-yellow">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Heart className="h-5 w-5 text-viver-yellow" />
                  <h4 className="font-semibold">Sistema de Doações</h4>
                </div>
                <ul className="text-sm space-y-1 text-gray-700">
                  <li>• Doações físicas (roupas, alimentos)</li>
                  <li>• Gerenciamento de status</li>
                  <li>• Sistema de reservas</li>
                  <li>• Histórico completo</li>
                </ul>
              </CardContent>
            </Card>
            
            <Card className="border-l-4 border-l-blue-500">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Handshake className="h-5 w-5 text-blue-500" />
                  <h4 className="font-semibold">Voluntariado</h4>
                </div>
                <ul className="text-sm space-y-1 text-gray-700">
                  <li>• Cadastro de voluntários</li>
                  <li>• Áreas de interesse</li>
                  <li>• Gestão de disponibilidade</li>
                  <li>• Comunicação direta</li>
                </ul>
              </CardContent>
            </Card>
            
            <Card className="border-l-4 border-l-green-500">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Users className="h-5 w-5 text-green-500" />
                  <h4 className="font-semibold">Administração</h4>
                </div>
                <ul className="text-sm space-y-1 text-gray-700">
                  <li>• Painel de controle</li>
                  <li>• Gestão de usuários</li>
                  <li>• Relatórios e estatísticas</li>
                  <li>• Sistema de permissões</li>
                </ul>
              </CardContent>
            </Card>
            
            <Card className="border-l-4 border-l-purple-500">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Smartphone className="h-5 w-5 text-purple-500" />
                  <h4 className="font-semibold">PWA Features</h4>
                </div>
                <ul className="text-sm space-y-1 text-gray-700">
                  <li>• Instalável como app</li>
                  <li>• Funciona offline</li>
                  <li>• Notificações push</li>
                  <li>• Design responsivo</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      )
    },
    {
      id: 6,
      title: "Interface do Sistema",
      subtitle: "Design centrado no usuário",
      content: (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardContent className="p-4">
                <h4 className="font-semibold mb-3">Tela Principal</h4>
                <div className="bg-gradient-to-br from-viver-yellow/20 to-viver-yellow/10 p-4 rounded-lg">
                  <div className="space-y-2">
                    <div className="h-3 bg-viver-yellow/50 rounded w-3/4"></div>
                    <div className="h-2 bg-gray-300 rounded w-1/2"></div>
                    <div className="grid grid-cols-2 gap-2 mt-3">
                      <div className="h-8 bg-white/80 rounded flex items-center justify-center text-xs">Eventos</div>
                      <div className="h-8 bg-white/80 rounded flex items-center justify-center text-xs">Doações</div>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mt-2">
                  Interface limpa e intuitiva com acesso rápido às principais funcionalidades.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <h4 className="font-semibold mb-3">Painel Admin</h4>
                <div className="bg-gray-100 p-4 rounded-lg">
                  <div className="grid grid-cols-3 gap-2 mb-3">
                    <div className="h-6 bg-blue-200 rounded text-xs flex items-center justify-center">Stats</div>
                    <div className="h-6 bg-green-200 rounded text-xs flex items-center justify-center">Users</div>
                    <div className="h-6 bg-yellow-200 rounded text-xs flex items-center justify-center">Reports</div>
                  </div>
                  <div className="h-12 bg-white rounded"></div>
                </div>
                <p className="text-sm text-gray-600 mt-2">
                  Dashboard completo para gestão administrativa com métricas em tempo real.
                </p>
              </CardContent>
            </Card>
          </div>
          
          <Card className="bg-viver-yellow/5">
            <CardContent className="p-6">
              <h4 className="font-semibold mb-3">Princípios de Design Aplicados</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <h5 className="font-semibold text-viver-yellow">Usabilidade</h5>
                  <p className="text-gray-700">Interface intuitiva e navegação simplificada</p>
                </div>
                <div>
                  <h5 className="font-semibold text-viver-yellow">Acessibilidade</h5>
                  <p className="text-gray-700">Contraste adequado e compatibilidade com leitores de tela</p>
                </div>
                <div>
                  <h5 className="font-semibold text-viver-yellow">Responsividade</h5>
                  <p className="text-gray-700">Adaptação perfeita a diferentes dispositivos</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )
    },
    {
      id: 7,
      title: "Segurança e Autenticação",
      subtitle: "Proteção de dados e controle de acesso",
      content: (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border-red-200">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Shield className="h-5 w-5 text-red-600" />
                  <h4 className="font-semibold">Autenticação</h4>
                </div>
                <ul className="text-sm space-y-2 text-gray-700">
                  <li>• <strong>Supabase Auth:</strong> Autenticação robusta</li>
                  <li>• <strong>JWT Tokens:</strong> Sessões seguras</li>
                  <li>• <strong>Email/Senha:</strong> Login tradicional</li>
                  <li>• <strong>Recuperação:</strong> Reset de senha</li>
                </ul>
              </CardContent>
            </Card>
            
            <Card className="border-blue-200">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Users className="h-5 w-5 text-blue-600" />
                  <h4 className="font-semibold">Autorização</h4>
                </div>
                <ul className="text-sm space-y-2 text-gray-700">
                  <li>• <strong>RLS:</strong> Políticas a nível de banco</li>
                  <li>• <strong>Roles:</strong> Doador, Voluntário, Admin</li>
                  <li>• <strong>Permissões:</strong> Controle granular</li>
                  <li>• <strong>Contexto:</strong> Verificação em runtime</li>
                </ul>
              </CardContent>
            </Card>
          </div>
          
          <Card className="bg-green-50 border-green-200">
            <CardContent className="p-6">
              <h4 className="font-semibold text-green-800 mb-4">Row Level Security (RLS) - Exemplo</h4>
              <div className="bg-green-100 p-4 rounded-lg font-mono text-sm">
                <div className="text-green-800">
                  CREATE POLICY "Users can view their own donations"<br/>
                  ON public.doacoes_fisicas<br/>
                  FOR SELECT<br/>
                  USING (auth.uid() = doador_id);
                </div>
              </div>
              <p className="text-sm text-green-700 mt-3">
                Cada usuário só acessa seus próprios dados, garantindo privacidade total.
              </p>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="p-3 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-gray-800">3</div>
              <div className="text-sm text-gray-600">Níveis de Acesso</div>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-gray-800">100%</div>
              <div className="text-sm text-gray-600">Dados Protegidos</div>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-gray-800">0</div>
              <div className="text-sm text-gray-600">Vulnerabilidades</div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 8,
      title: "Resultados e Impacto",
      subtitle: "Benefícios alcançados com a implementação",
      content: (
        <div className="space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="text-center bg-blue-50">
              <CardContent className="p-4">
                <div className="text-3xl font-bold text-blue-600">85%</div>
                <div className="text-sm text-blue-700">Redução no tempo de cadastro</div>
              </CardContent>
            </Card>
            <Card className="text-center bg-green-50">
              <CardContent className="p-4">
                <div className="text-3xl font-bold text-green-600">200%</div>
                <div className="text-sm text-green-700">Aumento de voluntários</div>
              </CardContent>
            </Card>
            <Card className="text-center bg-yellow-50">
              <CardContent className="p-4">
                <div className="text-3xl font-bold text-yellow-600">100%</div>
                <div className="text-sm text-yellow-700">Transparência das doações</div>
              </CardContent>
            </Card>
            <Card className="text-center bg-purple-50">
              <CardContent className="p-4">
                <div className="text-3xl font-bold text-purple-600">24/7</div>
                <div className="text-sm text-purple-700">Disponibilidade</div>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardContent className="p-4">
                <h4 className="font-semibold mb-3 text-green-800">Benefícios Operacionais</h4>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>• <strong>Automatização:</strong> Processos manuais eliminados</li>
                  <li>• <strong>Eficiência:</strong> Tempo de gestão reduzido</li>
                  <li>• <strong>Organização:</strong> Dados centralizados</li>
                  <li>• <strong>Controle:</strong> Rastreabilidade completa</li>
                </ul>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <h4 className="font-semibold mb-3 text-blue-800">Impacto Social</h4>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>• <strong>Alcance:</strong> Maior visibilidade da ONG</li>
                  <li>• <strong>Engajamento:</strong> Participação ativa aumentada</li>
                  <li>• <strong>Transparência:</strong> Confiança do público</li>
                  <li>• <strong>Sustentabilidade:</strong> Operação escalável</li>
                </ul>
              </CardContent>
            </Card>
          </div>
          
          <Card className="bg-viver-yellow/10 border-viver-yellow">
            <CardContent className="p-6 text-center">
              <h4 className="font-semibold text-viver-yellow mb-3">Conclusão do Projeto</h4>
              <p className="text-gray-700 leading-relaxed">
                O aplicativo Viver Solidário demonstra como a tecnologia pode ser utilizada 
                para amplificar o impacto social de organizações não governamentais, 
                proporcionando ferramentas modernas e acessíveis para gestão e engajamento comunitário.
              </p>
            </CardContent>
          </Card>
        </div>
      )
    },
    {
      id: 9,
      title: "Considerações Finais",
      subtitle: "Conclusões e trabalhos futuros",
      content: (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border-green-200 bg-green-50">
              <CardContent className="p-6">
                <h4 className="font-semibold text-green-800 mb-4">Objetivos Alcançados</h4>
                <ul className="space-y-2 text-sm text-green-700">
                  <li>✓ Sistema de doações implementado</li>
                  <li>✓ Portal de voluntariado funcional</li>
                  <li>✓ Painel administrativo completo</li>
                  <li>✓ PWA responsivo e acessível</li>
                  <li>✓ Segurança e autenticação robustas</li>
                </ul>
              </CardContent>
            </Card>
            
            <Card className="border-blue-200 bg-blue-50">
              <CardContent className="p-6">
                <h4 className="font-semibold text-blue-800 mb-4">Trabalhos Futuros</h4>
                <ul className="space-y-2 text-sm text-blue-700">
                  <li>• Notificações push avançadas</li>
                  <li>• Integração com redes sociais</li>
                  <li>• Sistema de gamificação</li>
                  <li>• Relatórios analíticos avançados</li>
                  <li>• API para parceiros externos</li>
                </ul>
              </CardContent>
            </Card>
          </div>
          
          <Card className="bg-gray-50">
            <CardContent className="p-6">
              <h4 className="font-semibold mb-4">Contribuições do Trabalho</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <h5 className="font-semibold text-gray-800">Técnica</h5>
                  <p className="text-gray-700">Implementação de PWA com stack moderna para ONGs</p>
                </div>
                <div>
                  <h5 className="font-semibold text-gray-800">Social</h5>
                  <p className="text-gray-700">Digitalização do terceiro setor com impacto real</p>
                </div>
                <div>
                  <h5 className="font-semibold text-gray-800">Acadêmica</h5>
                  <p className="text-gray-700">Estudo de caso prático de desenvolvimento web</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div className="text-center p-8 bg-viver-yellow/20 rounded-lg">
            <h4 className="text-2xl font-bold text-viver-yellow mb-4">Obrigado!</h4>
            <p className="text-gray-700 mb-4">
              "A tecnologia a serviço da solidariedade"
            </p>
            <div className="text-sm text-gray-600">
              <p>Perguntas e discussões</p>
              <p className="mt-2">
                <strong>Contato:</strong> [seu-email@exemplo.com]<br/>
                <strong>GitHub:</strong> [seu-usuario/viver-solidario]
              </p>
            </div>
          </div>
        </div>
      )
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header com controles */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-4">
            <Button
              onClick={prevSlide}
              variant="outline"
              size="sm"
              disabled={currentSlide === 0}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="text-sm text-gray-600">
              {currentSlide + 1} / {slides.length}
            </span>
            <Button
              onClick={nextSlide}
              variant="outline"
              size="sm"
              disabled={currentSlide === slides.length - 1}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
          
          {/* Indicadores de slides */}
          <div className="flex gap-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentSlide 
                    ? 'bg-viver-yellow' 
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Slide atual */}
        <Card className="min-h-[600px] shadow-xl">
          <CardContent className="p-8">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-gray-800 mb-2">
                {slides[currentSlide].title}
              </h1>
              <p className="text-xl text-gray-600">
                {slides[currentSlide].subtitle}
              </p>
            </div>
            
            <div className="flex-1">
              {slides[currentSlide].content}
            </div>
          </CardContent>
        </Card>

        {/* Navegação inferior */}
        <div className="flex justify-center gap-4 mt-6">
          <Button
            onClick={prevSlide}
            variant="outline"
            disabled={currentSlide === 0}
          >
            <ChevronLeft className="h-4 w-4 mr-2" />
            Anterior
          </Button>
          <Button
            onClick={nextSlide}
            className="bg-viver-yellow hover:bg-viver-yellow/90 text-black"
            disabled={currentSlide === slides.length - 1}
          >
            Próximo
            <ChevronRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PresentationSlides;
