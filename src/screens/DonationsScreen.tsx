import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, MonetizationOn } from "@/components/icons";

const DonationsScreen: React.FC = () => {
  return (
    <div className="flutter-screen bg-background p-4 relative">
      <h1 className="text-2xl font-bold mb-6 text-viver-yellow text-center">
        Como apoiar
      </h1>

      {/* ----------- PIX ----------- */}
      <Card className="flutter-card bg-viver-yellow/10 border-viver-yellow mb-6">
        <CardContent className="p-4">
          <h3 className="font-semibold text-viver-yellow mb-2 flex items-center">
            <MonetizationOn className="mr-2 h-5 w-5" />
            Doação via Pix
          </h3>
          <p className="text-sm mb-4">
            O Pix é a forma mais rápida de apoiar a Viver em suas demandas
            financeiras.
          </p>
          <Button className="w-full bg-viver-yellow hover:bg-viver-yellow/90 text-black">
            Copiar Chave Pix
          </Button>
        </CardContent>
      </Card>

      {/* ----------- DOAÇÃO ONLINE ----------- */}
      <Card className="flutter-card mb-6">
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
          <Button className="w-full bg-viver-yellow hover:bg-viver-yellow/90 text-black">
            Doe pelo PayPal
          </Button>
          <Button className="w-full bg-viver-yellow-medium hover:bg-viver-yellow-medium/90 text-black">
            Doe pelo PicPay
          </Button>
        </CardContent>
      </Card>

      {/* ----------- CONTA DE LUZ / CARNÊ ----------- */}
      <Card className="flutter-card mb-6">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center text-lg">
            <Heart className="mr-2 h-5 w-5 text-viver-yellow" />
            Conta de Luz / Carnê Solidário
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm mb-4">
            Contribua com valores a partir de R$ 15,00 mensais. Deixe seus dados
            e entraremos em contato.
          </p>
          <Button className="w-full bg-viver-yellow hover:bg-viver-yellow/90 text-black">
            Preencher Formulário
          </Button>
        </CardContent>
      </Card>

      {/* ----------- PRODUTOS E SERVIÇOS ----------- */}
      <Card className="flutter-card mb-6">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center text-lg">
            <Heart className="mr-2 h-5 w-5 text-viver-yellow-medium" />
            Doar Produtos ou Serviços
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm mb-4">
            A Viver precisa de diversos itens e serviços em seu dia-a-dia. Entre
            em contato e faça a diferença.
          </p>
          <Button className="w-full bg-viver-yellow-medium hover:bg-viver-yellow-medium/90 text-black">
            Entrar em Contato
          </Button>
        </CardContent>
      </Card>

      {/* ----------- NOTA PARANÁ ----------- */}
      <Card className="flutter-card mb-6">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center text-lg">
            <Heart className="mr-2 h-5 w-5 text-viver-yellow" />
            Cupons Fiscais (Nota Paraná)
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <p className="text-sm">
            Ajude doando cupons sem CPF ou solicitando uma urna para seu
            estabelecimento.
          </p>
          <Button className="w-full bg-viver-yellow hover:bg-viver-yellow/90 text-black">
            Locais com Urnas
          </Button>
          <Button className="w-full bg-viver-yellow-medium hover:bg-viver-yellow-medium/90 text-black">
            Solicitar Urna
          </Button>
        </CardContent>
      </Card>

      {/* ----------- BRECHÓ DO BEM ----------- */}
      <Card className="flutter-card mb-6">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center text-lg">
            <Heart className="mr-2 h-5 w-5 text-viver-yellow" />
            Brechó do Bem
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-sm">
            Doe roupas, calçados, acessórios, livros e brinquedos em bom estado
            e ajude a gerar recursos para a instituição.
          </p>

          <p className="text-sm font-semibold">Locais de entrega:</p>
          <ul className="text-sm list-disc list-inside space-y-1">
            <li>
              <a
                href="https://www.google.com/maps?q=Rua+Ataulpho+de+Paiva,+234"
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                Rua Ataulpho de Paiva, 234, Jd. Monções
              </a>{" "}
              — seg-sex 8h30 – 12h
            </li>
            <li>
              <a
                href="https://www.google.com/maps?q=Rua+Bernardo+Sayão,+319"
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                Rua Bernardo Sayão, 319, Jd. Petrópolis
              </a>{" "}
              — seg-sex 8h30 – 12h
            </li>
          </ul>

          <Button className="w-full bg-viver-yellow hover:bg-viver-yellow/90 text-black">
            Seguir no Instagram
          </Button>
        </CardContent>
      </Card>

      {/* ----------- LACRES E TAMPINHAS ----------- */}
      <Card className="flutter-card mb-6">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center text-lg">
            <Heart className="mr-2 h-5 w-5 text-viver-yellow-medium" />
            Lacres & Tampinhas
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm mb-4">
            Doe lacres de alumínio e tampinhas plásticas ou promova a coleta na
            sua empresa ou condomínio.
          </p>
          <p className="text-sm">
            Você pode trazer sua doação na 
            <a
              href="https://www.google.com/maps?q=Rua+Bernardo+Sayão,+319"
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
            >
              Sede da Viver – Rua Bernardo Sayão, 319, Jd. Petrópolis
            </a>
            , seg-sex 8h30 – 17h.
          </p>
          <Button className="w-full mt-3 bg-viver-yellow-medium hover:bg-viver-yellow-medium/90 text-black">
            Solicitar Material de Apoio
          </Button>
        </CardContent>
      </Card>

      {/* ----------- EVENTOS & CAMPANHAS ----------- */}
      <Card className="flutter-card mb-6">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center text-lg">
            <MonetizationOn className="mr-2 h-5 w-5 text-viver-yellow" />
            Eventos & Campanhas
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <p className="text-sm">
            Participe de ações como Pizzada, Feijoada, McDia Feliz ou torne-se
            patrocinador.
          </p>
          <Button className="w-full bg-viver-yellow hover:bg-viver-yellow/90 text-black">
            Instagram
          </Button>
          <Button className="w-full bg-viver-yellow-medium hover:bg-viver-yellow-medium/90 text-black">
            Facebook
          </Button>
        </CardContent>
      </Card>

      {/* ----------- COFRINHOS ----------- */}
      <Card className="flutter-card mb-6">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center text-lg">
            <Heart className="mr-2 h-5 w-5 text-viver-yellow" />
            Cofrinhos da Viver
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm mb-4">
            Deposite suas moedas ou solicite um cofrinho para seu
            estabelecimento.
          </p>
          <Button className="w-full bg-viver-yellow hover:bg-viver-yellow/90 text-black">
            Solicitar Cofrinho
          </Button>
        </CardContent>
      </Card>

      {/* ----------- CESTAS & LEITE ----------- */}
      <Card className="flutter-card mb-6">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center text-lg">
            <Heart className="mr-2 h-5 w-5 text-viver-yellow-medium" />
            Cestas Básicas & Leite
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm">
            Doe alimentos não perecíveis e leite integral. Sua doação garante
            alimento mensal às famílias assistidas.
          </p>
        </CardContent>
      </Card>

      {/* ----------- ARTESANATO & PRODUTOS ----------- */}
      <Card className="flutter-card mb-20">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center text-lg">
            <Heart className="mr-2 h-5 w-5 text-viver-yellow" />
            Artesanato & Produtos Institucionais
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm">
            Adquira peças artesanais e produtos personalizados no Brechó do Bem.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default DonationsScreen;
