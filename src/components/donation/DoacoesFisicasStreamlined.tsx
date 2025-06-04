
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart, Plus, Gift, Truck, CheckCircle, Users, ArrowRight } from 'lucide-react';
import { useDoacoesFisicasStreamlined } from '@/hooks/useDoacoesFisicasStreamlined';
import FormularioStreamlined from './FormularioStreamlined';
import { useAuth } from '@/context/AuthContext';

const DoacoesFisicasStreamlined: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const { criarDoacao, isSubmitting } = useDoacoesFisicasStreamlined();
  const [showForm, setShowForm] = useState(false);

  console.log('🎯 DoacoesFisicasStreamlined: Componente renderizado');
  console.log('🔐 Usuário autenticado:', isAuthenticated);
  console.log('📝 Mostrar formulário:', showForm);

  const handleSubmit = async (dadosDoacao: any): Promise<boolean> => {
    console.log('📤 Enviando doação:', dadosDoacao);
    const sucesso = await criarDoacao(dadosDoacao);
    if (sucesso) {
      console.log('✅ Doação criada com sucesso, ocultando formulário');
      setShowForm(false);
    }
    return sucesso;
  };

  if (!isAuthenticated) {
    console.log('🚫 Usuário não autenticado, mostrando tela de login');
    return (
      <Card className="max-w-md mx-auto">
        <CardContent className="p-8 text-center space-y-4">
          <div className="w-16 h-16 bg-viver-yellow/20 rounded-full flex items-center justify-center mx-auto">
            <Heart className="h-8 w-8 text-viver-yellow" />
          </div>
          <h3 className="text-xl font-semibold">Faça sua doação para a ONG Viver</h3>
          <p className="text-gray-600">
            Conecte-se para fazer doações físicas e ajudar nossa comunidade
          </p>
          <Button 
            onClick={() => window.location.href = '/auth'}
            className="bg-viver-yellow hover:bg-viver-yellow/90 text-black font-medium w-full"
          >
            Entrar para Doar
          </Button>
        </CardContent>
      </Card>
    );
  }

  console.log('✨ Renderizando interface principal de doações físicas');

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {!showForm ? (
        <>
          {/* Header Principal */}
          <Card className="bg-gradient-to-r from-viver-yellow/10 to-yellow-50 border-viver-yellow/20">
            <CardHeader className="text-center pb-4">
              <CardTitle className="flex items-center justify-center gap-3 text-2xl">
                <Heart className="h-7 w-7 text-viver-yellow" />
                Doações Físicas - ONG Viver
              </CardTitle>
              <p className="text-gray-700 text-lg mt-2">
                Doe itens físicos para ajudar famílias em situação de vulnerabilidade social
              </p>
            </CardHeader>
            <CardContent className="text-center">
              <Button
                onClick={() => {
                  console.log('🎯 Botão clicado: Mostrar formulário');
                  setShowForm(true);
                }}
                className="bg-viver-yellow hover:bg-viver-yellow/90 text-black text-lg px-8 py-4 h-auto font-medium"
                size="lg"
              >
                <Plus className="h-5 w-5 mr-2" />
                Fazer uma Doação
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
            </CardContent>
          </Card>

          {/* Tipos de Doações */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="hover:shadow-lg transition-shadow border-yellow-200">
              <CardContent className="p-6 text-center space-y-3">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto">
                  <Gift className="h-6 w-6 text-orange-600" />
                </div>
                <h4 className="font-semibold text-lg">Alimentos</h4>
                <p className="text-sm text-gray-600">
                  Cestas básicas, produtos não-perecíveis, leite, frutas
                </p>
                <div className="flex items-center justify-center text-xs text-green-600">
                  <CheckCircle className="h-4 w-4 mr-1" />
                  Muito necessário
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow border-yellow-200">
              <CardContent className="p-6 text-center space-y-3">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                  <Gift className="h-6 w-6 text-blue-600" />
                </div>
                <h4 className="font-semibold text-lg">Roupas</h4>
                <p className="text-sm text-gray-600">
                  Vestuário para todas as idades, calçados, acessórios
                </p>
                <div className="flex items-center justify-center text-xs text-green-600">
                  <CheckCircle className="h-4 w-4 mr-1" />
                  Sempre aceito
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow border-yellow-200">
              <CardContent className="p-6 text-center space-y-3">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto">
                  <Gift className="h-6 w-6 text-purple-600" />
                </div>
                <h4 className="font-semibold text-lg">Outros</h4>
                <p className="text-sm text-gray-600">
                  Brinquedos, móveis, utensílios, livros, materiais
                </p>
                <div className="flex items-center justify-center text-xs text-blue-600">
                  <Users className="h-4 w-4 mr-1" />
                  Beneficia muitos
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Como Funciona */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Truck className="h-5 w-5 text-viver-yellow" />
                Como funciona o processo?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="text-center space-y-3">
                  <div className="w-10 h-10 bg-viver-yellow text-black rounded-full flex items-center justify-center text-lg font-bold mx-auto">1</div>
                  <h4 className="font-medium">Cadastre sua doação</h4>
                  <p className="text-sm text-gray-600">Preencha o formulário com os detalhes da sua doação</p>
                </div>
                <div className="text-center space-y-3">
                  <div className="w-10 h-10 bg-viver-yellow text-black rounded-full flex items-center justify-center text-lg font-bold mx-auto">2</div>
                  <h4 className="font-medium">Escolha a entrega</h4>
                  <p className="text-sm text-gray-600">Você entrega na ONG ou nós retiramos no seu endereço</p>
                </div>
                <div className="text-center space-y-3">
                  <div className="w-10 h-10 bg-viver-yellow text-black rounded-full flex items-center justify-center text-lg font-bold mx-auto">3</div>
                  <h4 className="font-medium">Coordenação</h4>
                  <p className="text-sm text-gray-600">Nossa equipe entra em contato para combinar detalhes</p>
                </div>
                <div className="text-center space-y-3">
                  <div className="w-10 h-10 bg-viver-yellow text-black rounded-full flex items-center justify-center text-lg font-bold mx-auto">4</div>
                  <h4 className="font-medium">Impacto positivo</h4>
                  <p className="text-sm text-gray-600">Sua doação chega a quem mais precisa! 💛</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Call to Action */}
          <Card className="bg-gradient-to-r from-viver-yellow/5 to-orange-50 border-viver-yellow/30">
            <CardContent className="p-6 text-center">
              <h3 className="text-lg font-semibold mb-2">Pronto para fazer a diferença?</h3>
              <p className="text-gray-600 mb-4">
                Cada doação conta e transforma vidas. Junte-se a nós nessa missão!
              </p>
              <Button
                onClick={() => setShowForm(true)}
                className="bg-viver-yellow hover:bg-viver-yellow/90 text-black font-medium"
              >
                <Heart className="h-4 w-4 mr-2" />
                Começar Doação
              </Button>
            </CardContent>
          </Card>
        </>
      ) : (
        <>
          {console.log('📝 Renderizando formulário de doação')}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="h-5 w-5 text-viver-yellow" />
                Nova Doação Física
              </CardTitle>
            </CardHeader>
            <CardContent>
              <FormularioStreamlined
                onSubmit={handleSubmit}
                isSubmitting={isSubmitting}
                onCancel={() => {
                  console.log('❌ Cancelando formulário');
                  setShowForm(false);
                }}
              />
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
};

export default DoacoesFisicasStreamlined;
