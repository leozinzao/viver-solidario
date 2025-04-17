
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Heart, MonetizationOn } from '@/components/icons';

const DonationsScreen: React.FC = () => {
  return (
    <div className="flutter-screen bg-background p-4 relative">
      <h1 className="text-2xl font-bold mb-6 text-viver-yellow text-center">Doações</h1>
      
      <Card className="flutter-card bg-viver-yellow/10 border-viver-yellow mb-6">
        <CardContent className="p-4">
          <h3 className="font-semibold text-viver-yellow mb-2 flex items-center">
            <MonetizationOn className="mr-2 h-5 w-5" />
            Doação Financeira
          </h3>
          <p className="text-sm mb-4">Sua contribuição financeira ajuda a manter nossos projetos e impactar mais vidas.</p>
          <Button className="w-full bg-viver-yellow hover:bg-viver-yellow/90 text-black">
            Doar Agora
          </Button>
        </CardContent>
      </Card>
      
      <h2 className="text-xl font-semibold mb-3">Campanhas Ativas</h2>
      
      <div className="space-y-4">
        <Card className="flutter-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <Heart className="mr-2 h-5 w-5 text-viver-yellow" />
              Campanha de Apoio
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center mt-2">
              <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                <div className="bg-viver-yellow h-2.5 rounded-full" style={{ width: '75%' }}></div>
              </div>
              <span className="ml-2 text-sm text-muted-foreground">75%</span>
            </div>
            <div className="flex justify-between mt-2 text-sm">
              <span>Meta: R$ 20.000</span>
              <span>Arrecadado: R$ 15.000</span>
            </div>
            <p className="text-sm mt-3">Arrecadação para compra de medicamentos e materiais de apoio para crianças em tratamento.</p>
            <Button className="w-full mt-3 bg-viver-yellow hover:bg-viver-yellow/90 text-black">
              Contribuir
            </Button>
          </CardContent>
        </Card>
        
        <Card className="flutter-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <Heart className="mr-2 h-5 w-5 text-viver-yellow-medium" />
              Alimentos Especiais
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center mt-2">
              <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                <div className="bg-viver-yellow-medium h-2.5 rounded-full" style={{ width: '30%' }}></div>
              </div>
              <span className="ml-2 text-sm text-muted-foreground">30%</span>
            </div>
            <div className="flex justify-between mt-2 text-sm">
              <span>Meta: 500kg</span>
              <span>Recebidos: 150kg</span>
            </div>
            <p className="text-sm mt-3">Arrecadação de alimentos especiais para crianças em tratamento de câncer.</p>
            <Button className="w-full mt-3 bg-viver-yellow-medium hover:bg-viver-yellow-medium/90 text-black">
              Contribuir
            </Button>
          </CardContent>
        </Card>
        
        <Card className="flutter-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <Heart className="mr-2 h-5 w-5 text-viver-yellow" />
              Material de Conforto
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center mt-2">
              <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                <div className="bg-viver-yellow h-2.5 rounded-full" style={{ width: '50%' }}></div>
              </div>
              <span className="ml-2 text-sm text-muted-foreground">50%</span>
            </div>
            <div className="flex justify-between mt-2 text-sm">
              <span>Meta: 300 kits</span>
              <span>Recebidos: 150 kits</span>
            </div>
            <p className="text-sm mt-3">Arrecadação de material de conforto para crianças durante internações hospitalares.</p>
            <Button className="w-full mt-3 bg-viver-yellow hover:bg-viver-yellow/90 text-black">
              Contribuir
            </Button>
          </CardContent>
        </Card>
      </div>
      
      <h2 className="text-xl font-semibold my-3">Pontos de Coleta</h2>
      <Card className="flutter-card mb-20">
        <CardContent className="p-4">
          <p className="text-sm mb-2">Entregue suas doações nos seguintes pontos:</p>
          <ul className="text-sm list-disc list-inside space-y-1">
            <li>Sede da ONG Viver - Rua Principal, 123</li>
            <li>Hospital Infantil - Ala de Oncologia</li>
            <li>Shopping Center - Praça de Eventos</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default DonationsScreen;
