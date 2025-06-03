
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart, Plus, Gift } from 'lucide-react';
import { useDoacoesFisicasOptimized } from '@/hooks/useDoacoesFisicasOptimized';
import FormularioDoacaoOtimizado from './FormularioDoacaoOtimizado';
import { useAuth } from '@/context/AuthContext';

const DoacoesFisicasOtimizadas: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const { criarDoacao, submitting } = useDoacoesFisicasOptimized();
  const [showForm, setShowForm] = useState(false);

  const handleSubmit = async (dadosDoacao: any): Promise<boolean> => {
    const sucesso = await criarDoacao(dadosDoacao);
    if (sucesso) {
      setShowForm(false);
    }
    return sucesso;
  };

  if (!isAuthenticated) {
    return (
      <Card className="flutter-card">
        <CardContent className="p-6 text-center">
          <Heart className="h-12 w-12 text-viver-yellow mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">Faça sua doação para a ONG Viver</h3>
          <p className="text-gray-600 mb-4">
            Conecte-se para fazer doações físicas e ajudar nossa comunidade
          </p>
          <Button 
            onClick={() => window.location.href = '/auth'}
            className="bg-viver-yellow hover:bg-viver-yellow/90 text-black"
          >
            Entrar para Doar
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {!showForm ? (
        <>
          {/* Header */}
          <Card className="flutter-card">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center text-xl">
                <Heart className="mr-2 h-6 w-6 text-viver-yellow" />
                Doações Físicas - ONG Viver
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700">
                Doe itens físicos para ajudar famílias em situação de vulnerabilidade social. 
                Sua generosidade faz a diferença! 💛
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-yellow-50 rounded-lg">
                  <Gift className="h-8 w-8 text-viver-yellow mx-auto mb-2" />
                  <h4 className="font-semibold">Alimentos</h4>
                  <p className="text-sm text-gray-600">Cestas básicas, produtos não-perecíveis</p>
                </div>
                <div className="text-center p-4 bg-yellow-50 rounded-lg">
                  <Gift className="h-8 w-8 text-viver-yellow mx-auto mb-2" />
                  <h4 className="font-semibold">Roupas</h4>
                  <p className="text-sm text-gray-600">Vestuário para todas as idades</p>
                </div>
                <div className="text-center p-4 bg-yellow-50 rounded-lg">
                  <Gift className="h-8 w-8 text-viver-yellow mx-auto mb-2" />
                  <h4 className="font-semibold">Outros</h4>
                  <p className="text-sm text-gray-600">Brinquedos, móveis, utensílios</p>
                </div>
              </div>

              <div className="text-center">
                <Button
                  onClick={() => setShowForm(true)}
                  className="bg-viver-yellow hover:bg-viver-yellow/90 text-black text-lg px-8 py-3"
                  size="lg"
                >
                  <Plus className="h-5 w-5 mr-2" />
                  Fazer uma Doação
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Informações sobre como funciona */}
          <Card className="flutter-card">
            <CardContent className="p-6">
              <h3 className="font-semibold mb-4">Como funciona?</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="bg-viver-yellow text-black rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">1</div>
                  <p className="text-sm">Cadastre sua doação preenchendo o formulário</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-viver-yellow text-black rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">2</div>
                  <p className="text-sm">Escolha se você entrega na ONG ou se preferimos retirar</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-viver-yellow text-black rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">3</div>
                  <p className="text-sm">Nossa equipe entrará em contato para coordenar a entrega</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-viver-yellow text-black rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">4</div>
                  <p className="text-sm">Sua doação chegará a quem mais precisa! 💛</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </>
      ) : (
        <Card className="flutter-card">
          <CardHeader>
            <CardTitle className="flex items-center text-lg">
              <Heart className="mr-2 h-5 w-5 text-viver-yellow" />
              Nova Doação Física
            </CardTitle>
          </CardHeader>
          <CardContent>
            <FormularioDoacaoOtimizado
              onSubmit={handleSubmit}
              isSubmitting={submitting}
              onCancel={() => setShowForm(false)}
            />
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default DoacoesFisicasOtimizadas;
