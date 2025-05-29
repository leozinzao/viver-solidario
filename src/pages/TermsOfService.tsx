
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, FileText, Users, Heart, AlertCircle, Scale } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const TermsOfService = () => {
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
            <div className="mx-auto mb-4 w-16 h-16 rounded-full bg-gradient-to-br from-solidario-purple/20 to-solidario-purple/10 flex items-center justify-center">
              <FileText className="w-8 h-8 text-solidario-purple" />
            </div>
            <CardTitle className="text-3xl font-bold bg-gradient-to-r from-viver-yellow to-solidario-purple bg-clip-text text-transparent">
              Termos de Uso
            </CardTitle>
            <p className="text-gray-600 mt-2">
              Última atualização: {new Date().toLocaleDateString('pt-BR')}
            </p>
          </CardHeader>
          
          <CardContent className="space-y-8">
            <section>
              <div className="flex items-center mb-4">
                <Heart className="w-6 h-6 text-red-500 mr-2" />
                <h2 className="text-xl font-semibold text-gray-800">1. Sobre a ONG Viver</h2>
              </div>
              <div className="ml-8 space-y-3 text-gray-600">
                <p>
                  A ONG Viver é uma organização sem fins lucrativos dedicada a transformar vidas através da solidariedade. 
                  Nossa plataforma conecta doadores, voluntários e beneficiários em uma rede de apoio mútuo.
                </p>
                <p>
                  Ao usar nossos serviços, você concorda com estes termos e se compromete a usar a plataforma de forma ética e responsável.
                </p>
              </div>
            </section>

            <section>
              <div className="flex items-center mb-4">
                <Users className="w-6 h-6 text-viver-yellow mr-2" />
                <h2 className="text-xl font-semibold text-gray-800">2. Cadastro e Conta</h2>
              </div>
              <div className="ml-8 space-y-3 text-gray-600">
                <p>Para usar nossa plataforma, você deve:</p>
                <ul className="list-disc ml-6 space-y-2">
                  <li>Ser maior de 18 anos ou ter autorização legal</li>
                  <li>Fornecer informações verdadeiras e precisas</li>
                  <li>Manter seus dados atualizados</li>
                  <li>Proteger suas credenciais de acesso</li>
                  <li>Notificar-nos sobre qualquer uso não autorizado</li>
                  <li>Usar apenas uma conta por pessoa</li>
                </ul>
              </div>
            </section>

            <section>
              <div className="flex items-center mb-4">
                <Heart className="w-6 h-6 text-green-600 mr-2" />
                <h2 className="text-xl font-semibold text-gray-800">3. Doações</h2>
              </div>
              <div className="ml-8 space-y-3 text-gray-600">
                <p>Ao fazer doações através da plataforma:</p>
                <ul className="list-disc ml-6 space-y-2">
                  <li>Você confirma que tem direito legal sobre os recursos doados</li>
                  <li>As doações são voluntárias e não reembolsáveis</li>
                  <li>Você receberá comprovantes para todas as transações</li>
                  <li>Garantimos transparência no uso dos recursos</li>
                  <li>Fornecemos relatórios regulares sobre o impacto das doações</li>
                  <li>Respeitamos sua privacidade sobre doações anônimas</li>
                </ul>
              </div>
            </section>

            <section>
              <div className="flex items-center mb-4">
                <Users className="w-6 h-6 text-blue-600 mr-2" />
                <h2 className="text-xl font-semibold text-gray-800">4. Trabalho Voluntário</h2>
              </div>
              <div className="ml-8 space-y-3 text-gray-600">
                <p>Para participar como voluntário:</p>
                <ul className="list-disc ml-6 space-y-2">
                  <li>Você deve se comprometer com as atividades que aceitar</li>
                  <li>Respeitar os horários e locais estabelecidos</li>
                  <li>Tratar beneficiários e outros voluntários com respeito</li>
                  <li>Seguir as diretrizes e políticas da organização</li>
                  <li>Comunicar eventuais impedimentos com antecedência</li>
                  <li>Participar de treinamentos quando necessário</li>
                </ul>
              </div>
            </section>

            <section>
              <div className="flex items-center mb-4">
                <AlertCircle className="w-6 h-6 text-orange-600 mr-2" />
                <h2 className="text-xl font-semibold text-gray-800">5. Conduta e Responsabilidades</h2>
              </div>
              <div className="ml-8 space-y-3 text-gray-600">
                <p>É proibido usar nossa plataforma para:</p>
                <ul className="list-disc ml-6 space-y-2">
                  <li>Atividades ilegais ou fraudulentas</li>
                  <li>Discriminação ou assédio de qualquer tipo</li>
                  <li>Spam ou comunicações não solicitadas</li>
                  <li>Violação de direitos de propriedade intelectual</li>
                  <li>Tentativas de comprometer a segurança da plataforma</li>
                  <li>Uso comercial não autorizado</li>
                </ul>
              </div>
            </section>

            <section>
              <div className="flex items-center mb-4">
                <Scale className="w-6 h-6 text-purple-600 mr-2" />
                <h2 className="text-xl font-semibold text-gray-800">6. Limitação de Responsabilidade</h2>
              </div>
              <div className="ml-8 space-y-3 text-gray-600">
                <p>A ONG Viver:</p>
                <ul className="list-disc ml-6 space-y-2">
                  <li>Atua como facilitadora entre doadores, voluntários e beneficiários</li>
                  <li>Não se responsabiliza por ações de terceiros na plataforma</li>
                  <li>Mantém transparência sobre o uso de recursos</li>
                  <li>Não garante resultados específicos das ações realizadas</li>
                  <li>Reserva-se o direito de suspender contas que violem estes termos</li>
                </ul>
              </div>
            </section>

            <section>
              <div className="flex items-center mb-4">
                <FileText className="w-6 h-6 text-gray-600 mr-2" />
                <h2 className="text-xl font-semibold text-gray-800">7. Modificações</h2>
              </div>
              <div className="ml-8 space-y-3 text-gray-600">
                <p>
                  Podemos atualizar estes termos periodicamente. Notificaremos sobre mudanças significativas 
                  através da plataforma ou por e-mail. O uso continuado dos serviços após as modificações 
                  constitui aceitação dos novos termos.
                </p>
              </div>
            </section>

            <section>
              <div className="flex items-center mb-4">
                <Heart className="w-6 h-6 text-viver-yellow mr-2" />
                <h2 className="text-xl font-semibold text-gray-800">8. Contato</h2>
              </div>
              <div className="ml-8 space-y-3 text-gray-600">
                <p>
                  Para dúvidas sobre estes termos ou nossa missão, entre em contato:
                </p>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p><strong>E-mail:</strong> contato@ongviver.org.br</p>
                  <p><strong>Telefone:</strong> (11) 1234-5678</p>
                  <p><strong>Endereço:</strong> Rua da Solidariedade, 123 - São Paulo, SP</p>
                  <p><strong>CNPJ:</strong> 12.345.678/0001-90</p>
                </div>
              </div>
            </section>

            <div className="border-t pt-6 mt-8">
              <p className="text-sm text-gray-500 text-center">
                Ao usar nossa plataforma, você concorda com estes termos e nossa missão de transformar vidas através da solidariedade.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TermsOfService;
