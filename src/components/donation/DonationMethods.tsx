
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart, MonetizationOn } from '@/components/icons';
import { toast } from '@/components/ui/use-toast';
import ContaLuzDialog from './ContaLuzDialog';

const DonationMethods: React.FC = () => {
  const [isContaLuzOpen, setIsContaLuzOpen] = useState(false);

  const copyPixKey = () => {
    navigator.clipboard.writeText("04.565.017/0001-47");
    toast({
      title: "Chave Pix copiada",
      description: "A chave Pix foi copiada para sua área de transferência."
    });
  };

  return (
    <div className="space-y-6">
      {/* PIX */}
      <Card className="flutter-card bg-viver-yellow/10 border-viver-yellow">
        <CardContent className="p-4">
          <h3 className="font-semibold text-viver-yellow mb-2 flex items-center">
            <MonetizationOn className="mr-2 h-5 w-5" />
            Doação via Pix
          </h3>
          <p className="text-sm mb-4">
            O Pix é a forma mais rápida de apoiar a Viver em suas demandas
            financeiras. Chave: <strong>04.565.017/0001-47</strong>
          </p>
          <Button className="w-full bg-viver-yellow hover:bg-viver-yellow/90 text-black" onClick={copyPixKey}>
            Copiar Chave Pix
          </Button>
        </CardContent>
      </Card>

      {/* Doação Online */}
      <Card className="flutter-card">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center text-lg">
            <MonetizationOn className="mr-2 h-5 w-5 text-viver-yellow" />
            Doação Online
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-sm">
            Clique em uma das opções abaixo e doe o valor que desejar.
          </p>
          <Button 
            className="w-full bg-viver-yellow hover:bg-viver-yellow/90 text-black"
            onClick={() => window.open("https://www.paypal.com/donate/?hosted_button_id=R3PPJ8XWS97KQ", "_blank")}
          >
            Doe pelo PayPal
          </Button>
          <Button 
            className="w-full bg-viver-yellow-medium hover:bg-viver-yellow-medium/90 text-black"
            onClick={() => window.open("https://app.picpay.com/payment?type=store&hash=fFSm3I4XiFgTJQfU", "_blank")}
          >
            Doe pelo PicPay
          </Button>
        </CardContent>
      </Card>

      {/* Conta de Luz / Carnê */}
      <Card className="flutter-card">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center text-lg">
            <Heart className="mr-2 h-5 w-5 text-viver-yellow" />
            Conta de Luz / Carnê Solidário
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm mb-4">
            As doações através da Conta de Luz (COPEL) e do Carnê Solidário são formas recorrentes de apoio à instituição com valores a partir de R$ 15,00 mensais.
          </p>
          <Button 
            className="w-full bg-viver-yellow hover:bg-viver-yellow/90 text-black"
            onClick={() => setIsContaLuzOpen(true)}
          >
            Preencher Formulário
          </Button>
        </CardContent>
      </Card>

      <ContaLuzDialog 
        isOpen={isContaLuzOpen}
        onOpenChange={setIsContaLuzOpen}
      />
    </div>
  );
};

export default DonationMethods;
