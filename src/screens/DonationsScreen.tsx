
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Heart, MonetizationOn } from "@/components/icons";
import { Gift } from "lucide-react";
import DonationMethods from "@/components/donation/DonationMethods";
import PhysicalDonations from "@/components/donation/PhysicalDonations";

const DonationsScreen: React.FC = () => {
  const [activeTab, setActiveTab] = useState("financial");

  return (
    <div className="flutter-screen bg-background p-4 relative">
      <h1 className="text-2xl font-bold mb-6 text-viver-yellow text-center">
        Como apoiar
      </h1>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="financial" className="text-xs">
            <MonetizationOn className="h-4 w-4 mr-1" />
            Financeira
          </TabsTrigger>
          <TabsTrigger value="physical" className="text-xs">
            <Gift className="h-4 w-4 mr-1" />
            Física
          </TabsTrigger>
          <TabsTrigger value="services" className="text-xs">
            <Heart className="h-4 w-4 mr-1" />
            Serviços
          </TabsTrigger>
        </TabsList>

        <TabsContent value="financial">
          <DonationMethods />
        </TabsContent>

        <TabsContent value="physical">
          <PhysicalDonations />
        </TabsContent>

        <TabsContent value="services">
          <div className="space-y-6">
            {/* Produtos e Serviços */}
            <Card className="flutter-card">
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

            {/* Nota Paraná */}
            <Card className="flutter-card">
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

            {/* Cofrinhos */}
            <Card className="flutter-card">
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

            {/* Eventos & Campanhas */}
            <Card className="flutter-card mb-20">
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
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DonationsScreen;
