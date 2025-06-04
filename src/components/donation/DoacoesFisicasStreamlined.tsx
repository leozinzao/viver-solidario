
import React, { useState, useEffect } from 'react';
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

  useEffect(() => {
    console.log('🎯 DoacoesFisicasStreamlined: Componente MONTADO!');
    console.log('🎯 DoacoesFisicasStreamlined: Timestamp:', new Date().toISOString());
    console.log('🔐 DoacoesFisicasStreamlined: Usuário autenticado:', isAuthenticated);
    
    return () => {
      console.log('🎯 DoacoesFisicasStreamlined: Componente DESMONTADO');
    };
  }, []);

  const handleSubmit = async (dadosDoacao: any): Promise<boolean> => {
    console.log('📤 DoacoesFisicasStreamlined: Enviando doação:', dadosDoacao);
    const sucesso = await criarDoacao(dadosDoacao);
    if (sucesso) {
      console.log('✅ DoacoesFisicasStreamlined: Doação criada com sucesso, ocultando formulário');
      setShowForm(false);
    }
    return sucesso;
  };

  if (!isAuthenticated) {
    console.log('🚫 DoacoesFisicasStreamlined: Usuário não autenticado, mostrando tela de login');
    return (
      <div className="p-4">
        <Card className="max-w-md mx-auto">
          <CardContent className="p-6 text-center space-y-4">
            <div className="w-16 h-16 bg-viver-yellow/20 rounded-full flex items-center justify-center mx-auto">
              <Heart className="h-8 w-8 text-viver-yellow" />
            </div>
            <h3 className="text-xl font-semibold">Faça sua doação para a ONG Viver</h3>
            <p className="text-gray-600 text-sm">
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
      </div>
    );
  }

  console.log('✨ DoacoesFisicasStreamlined: Renderizando interface principal de doações físicas');

  return (
    <div className="p-4 space-y-4">
      {/* Header com indicador visual */}
      <div className="bg-green-100 border-2 border-green-400 p-3 rounded-lg text-center">
        <div className="text-sm font-bold text-green-800">
          ✅ NOVO LAYOUT: DoacoesFisicasStreamlined
        </div>
        <div className="text-xs text-green-600 mt-1">
          Layout mobile otimizado carregado! 🎉
        </div>
      </div>

      {!showForm ? (
        <>
          {/* Header Principal */}
          <Card className="bg-gradient-to-r from-viver-yellow/10 to-yellow-50 border-viver-yellow/20">
            <CardHeader className="text-center pb-3">
              <CardTitle className="flex items-center justify-center gap-2 text-xl">
                <Heart className="h-6 w-6 text-viver-yellow" />
                Doações Físicas
              </CardTitle>
              <p className="text-gray-700 text-sm">
                Doe itens físicos para ajudar famílias em situação de vulnerabilidade
              </p>
            </CardHeader>
            <CardContent className="text-center">
              <Button
                onClick={() => {
                  console.log('🎯 DoacoesFisicasStreamlined: Botão clicado - Mostrar formulário');
                  setShowForm(true);
                }}
                className="bg-viver-yellow hover:bg-viver-yellow/90 text-black font-medium w-full"
              >
                <Plus className="h-4 w-4 mr-2" />
                Fazer uma Doação
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </CardContent>
          </Card>

          {/* Tipos de Doações */}
          <div className="space-y-3">
            <h3 className="font-semibold text-lg text-center">Tipos de Doações</h3>
            
            <Card className="hover:shadow-md transition-shadow border-orange-200">
              <CardContent className="p-4 text-center space-y-2">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto">
                  <Gift className="h-6 w-6 text-orange-600" />
                </div>
                <h4 className="font-semibold">Alimentos</h4>
                <p className="text-sm text-gray-600">
                  Cestas básicas, produtos não-perecíveis, leite, frutas
                </p>
                <div className="flex items-center justify-center text-xs text-green-600">
                  <CheckCircle className="h-4 w-4 mr-1" />
                  Muito necessário
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow border-blue-200">
              <CardContent className="p-4 text-center space-y-2">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                  <Gift className="h-6 w-6 text-blue-600" />
                </div>
                <h4 className="font-semibold">Roupas</h4>
                <p className="text-sm text-gray-600">
                  Vestuário para todas as idades, calçados, acessórios
                </p>
                <div className="flex items-center justify-center text-xs text-green-600">
                  <CheckCircle className="h-4 w-4 mr-1" />
                  Sempre aceito
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow border-purple-200">
              <CardContent className="p-4 text-center space-y-2">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto">
                  <Gift className="h-6 w-6 text-purple-600" />
                </div>
                <h4 className="font-semibold">Outros</h4>
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
              <CardTitle className="flex items-center gap-2 text-lg">
                <Truck className="h-5 w-5 text-viver-yellow" />
                Como funciona?
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-viver-yellow text-black rounded-full flex items-center justify-center text-sm font-bold">1</div>
                  <div>
                    <h4 className="font-medium text-sm">Cadastre sua doação</h4>
                    <p className="text-xs text-gray-600">Preencha o formulário com os detalhes</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-viver-yellow text-black rounded-full flex items-center justify-center text-sm font-bold">2</div>
                  <div>
                    <h4 className="font-medium text-sm">Escolha a entrega</h4>
                    <p className="text-xs text-gray-600">Você entrega ou nós retiramos</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-viver-yellow text-black rounded-full flex items-center justify-center text-sm font-bold">3</div>
                  <div>
                    <h4 className="font-medium text-sm">Coordenação</h4>
                    <p className="text-xs text-gray-600">Nossa equipe entra em contato</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-viver-yellow text-black rounded-full flex items-center justify-center text-sm font-bold">4</div>
                  <div>
                    <h4 className="font-medium text-sm">Impacto positivo</h4>
                    <p className="text-xs text-gray-600">Sua doação chega a quem mais precisa! 💛</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Call to Action */}
          <Card className="bg-gradient-to-r from-viver-yellow/5 to-orange-50 border-viver-yellow/30">
            <CardContent className="p-4 text-center">
              <h3 className="font-semibold mb-2">Pronto para fazer a diferença?</h3>
              <p className="text-gray-600 text-sm mb-3">
                Cada doação conta e transforma vidas. Junte-se a nós!
              </p>
              <Button
                onClick={() => setShowForm(true)}
                className="bg-viver-yellow hover:bg-viver-yellow/90 text-black font-medium w-full"
              >
                <Heart className="h-4 w-4 mr-2" />
                Começar Doação
              </Button>
            </CardContent>
          </Card>
        </>
      ) : (
        <>
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
                  console.log('❌ DoacoesFisicasStreamlined: Cancelando formulário');
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
