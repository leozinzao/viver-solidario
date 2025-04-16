
import React from 'react';
import { Button } from "@/components/ui/button";
import { Plus } from '@/components/icons';

const DonationsScreen: React.FC = () => {
  return (
    <div className="flutter-screen bg-background p-4 relative">
      <h1 className="text-2xl font-bold mb-6 text-foreground">Doações</h1>
      
      <div className="space-y-4">
        <div className="flutter-card">
          <h3 className="font-semibold">Campanha de Agasalhos</h3>
          <div className="flex justify-between items-center mt-2">
            <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
              <div className="bg-solidario-purple h-2.5 rounded-full" style={{ width: '75%' }}></div>
            </div>
            <span className="ml-2 text-sm text-muted-foreground">75%</span>
          </div>
          <div className="flex justify-between mt-2 text-sm">
            <span>Meta: 200 peças</span>
            <span>Recebidas: 150 peças</span>
          </div>
          <Button className="w-full mt-3 bg-solidario-purple hover:bg-solidario-purple/90">
            Doar agora
          </Button>
        </div>
        
        <div className="flutter-card">
          <h3 className="font-semibold">Alimentos Não-Perecíveis</h3>
          <div className="flex justify-between items-center mt-2">
            <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
              <div className="bg-solidario-orange h-2.5 rounded-full" style={{ width: '30%' }}></div>
            </div>
            <span className="ml-2 text-sm text-muted-foreground">30%</span>
          </div>
          <div className="flex justify-between mt-2 text-sm">
            <span>Meta: 500kg</span>
            <span>Recebidos: 150kg</span>
          </div>
          <Button className="w-full mt-3 bg-solidario-orange hover:bg-solidario-orange/90">
            Doar agora
          </Button>
        </div>
        
        <div className="flutter-card">
          <h3 className="font-semibold">Campanha de Brinquedos</h3>
          <div className="flex justify-between items-center mt-2">
            <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
              <div className="bg-solidario-teal h-2.5 rounded-full" style={{ width: '50%' }}></div>
            </div>
            <span className="ml-2 text-sm text-muted-foreground">50%</span>
          </div>
          <div className="flex justify-between mt-2 text-sm">
            <span>Meta: 300 brinquedos</span>
            <span>Recebidos: 150 brinquedos</span>
          </div>
          <Button className="w-full mt-3 bg-solidario-teal hover:bg-solidario-teal/90">
            Doar agora
          </Button>
        </div>
      </div>
      
      <div className="absolute bottom-20 right-4">
        <Button className="h-14 w-14 rounded-full bg-solidario-purple hover:bg-solidario-purple/90 shadow-lg">
          <Plus className="h-6 w-6" />
        </Button>
      </div>
    </div>
  );
};

export default DonationsScreen;
