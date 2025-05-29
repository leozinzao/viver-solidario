
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Shield, Eye, Lock, Database, Mail } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const PrivacyPolicy = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-viver-yellow/10 via-white to-solidario-purple/10 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className="mb-4 hover:bg-gray-100"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar
          </Button>
        </div>

        <Card className="shadow-lg">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 w-16 h-16 rounded-full bg-gradient-to-br from-viver-yellow/20 to-viver-yellow/10 flex items-center justify-center">
              <Shield className="w-8 h-8 text-viver-yellow" />
            </div>
            <CardTitle className="text-3xl font-bold bg-gradient-to-r from-viver-yellow to-solidario-purple bg-clip-text text-transparent">
              Política de Privacidade
            </CardTitle>
            <p className="text-gray-600 mt-2">
              Última atualização: {new Date().toLocaleDateString('pt-BR')}
            </p>
          </CardHeader>
          
          <CardContent className="space-y-8">
            <section>
              <div className="flex items-center mb-4">
                <Eye className="w-6 h-6 text-viver-yellow mr-2" />
                <h2 className="text-xl font-semibold text-gray-800">1. Informações que Coletamos</h2>
              </div>
              <div className="ml-8 space-y-3 text-gray-600">
                <p>
                  Na ONG Viver, coletamos apenas as informações necessárias para oferecer nossos serviços de forma eficaz:
                </p>
                <ul className="list-disc ml-6 space-y-2">
                  <li><strong>Informações de Conta:</strong> Nome, e-mail e telefone quando você se cadastra</li>
                  <li><strong>Informações de Perfil:</strong> Suas preferências como doador ou voluntário</li>
                  <li><strong>Dados de Interação:</strong> Como você usa nossa plataforma para melhorar nossos serviços</li>
                  <li><strong>Informações de Doação:</strong> Histórico de contribuições para transparência</li>
                </ul>
              </div>
            </section>

            <section>
              <div className="flex items-center mb-4">
                <Database className="w-6 h-6 text-solidario-purple mr-2" />
                <h2 className="text-xl font-semibold text-gray-800">2. Como Usamos suas Informações</h2>
              </div>
              <div className="ml-8 space-y-3 text-gray-600">
                <p>Utilizamos suas informações para:</p>
                <ul className="list-disc ml-6 space-y-2">
                  <li>Gerenciar sua conta e perfil na plataforma</li>
                  <li>Processar e acompanhar suas doações</li>
                  <li>Conectar voluntários com oportunidades adequadas</li>
                  <li>Enviar atualizações sobre eventos e campanhas</li>
                  <li>Melhorar nossos serviços e experiência do usuário</li>
                  <li>Cumprir obrigações legais e regulamentares</li>
                </ul>
              </div>
            </section>

            <section>
              <div className="flex items-center mb-4">
                <Lock className="w-6 h-6 text-green-600 mr-2" />
                <h2 className="text-xl font-semibold text-gray-800">3. Proteção de Dados</h2>
              </div>
              <div className="ml-8 space-y-3 text-gray-600">
                <p>
                  Implementamos medidas técnicas e organizacionais adequadas para proteger suas informações:
                </p>
                <ul className="list-disc ml-6 space-y-2">
                  <li>Criptografia de dados em trânsito e em repouso</li>
                  <li>Acesso restrito apenas a pessoal autorizado</li>
                  <li>Monitoramento contínuo de segurança</li>
                  <li>Backups seguros e regulares</li>
                  <li>Auditorias periódicas de segurança</li>
                </ul>
              </div>
            </section>

            <section>
              <div className="flex items-center mb-4">
                <Mail className="w-6 h-6 text-blue-600 mr-2" />
                <h2 className="text-xl font-semibold text-gray-800">4. Compartilhamento de Informações</h2>
              </div>
              <div className="ml-8 space-y-3 text-gray-600">
                <p>
                  <strong>Não vendemos, alugamos ou compartilhamos</strong> suas informações pessoais com terceiros para fins comerciais.
                </p>
                <p>Podemos compartilhar informações apenas em casos específicos:</p>
                <ul className="list-disc ml-6 space-y-2">
                  <li>Com seu consentimento explícito</li>
                  <li>Para cumprir obrigações legais</li>
                  <li>Para proteger direitos, propriedade ou segurança</li>
                  <li>Com parceiros de confiança que nos ajudam a operar (sob acordos de confidencialidade)</li>
                </ul>
              </div>
            </section>

            <section>
              <div className="flex items-center mb-4">
                <Shield className="w-6 h-6 text-red-600 mr-2" />
                <h2 className="text-xl font-semibold text-gray-800">5. Seus Direitos</h2>
              </div>
              <div className="ml-8 space-y-3 text-gray-600">
                <p>Você tem direito a:</p>
                <ul className="list-disc ml-6 space-y-2">
                  <li>Acessar suas informações pessoais</li>
                  <li>Corrigir dados incorretos ou incompletos</li>
                  <li>Solicitar exclusão de suas informações</li>
                  <li>Revogar consentimentos dados anteriormente</li>
                  <li>Portabilidade de dados</li>
                  <li>Objetar ao processamento em certas circunstâncias</li>
                </ul>
              </div>
            </section>

            <section>
              <div className="flex items-center mb-4">
                <Mail className="w-6 h-6 text-viver-yellow mr-2" />
                <h2 className="text-xl font-semibold text-gray-800">6. Contato</h2>
              </div>
              <div className="ml-8 space-y-3 text-gray-600">
                <p>
                  Para exercer seus direitos ou esclarecer dúvidas sobre esta política, entre em contato:
                </p>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p><strong>E-mail:</strong> privacidade@ongviver.org.br</p>
                  <p><strong>Telefone:</strong> (11) 1234-5678</p>
                  <p><strong>Endereço:</strong> Rua da Solidariedade, 123 - São Paulo, SP</p>
                </div>
              </div>
            </section>

            <div className="border-t pt-6 mt-8">
              <p className="text-sm text-gray-500 text-center">
                Esta política pode ser atualizada periodicamente. A data da última atualização é sempre indicada no topo desta página.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
