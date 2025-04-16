
import React from 'react';
import { Campaign, Event, MonetizationOn } from '@/components/icons';

const DashboardScreen: React.FC = () => {
  return (
    <div className="flutter-screen bg-background p-4">
      <h1 className="text-2xl font-bold mb-6 text-foreground">Início</h1>
      
      <div className="space-y-4">
        <div className="flutter-card flex items-center">
          <div className="mr-4 bg-solidario-purple/20 p-3 rounded-full">
            <Event className="w-6 h-6 text-solidario-purple" />
          </div>
          <div>
            <h3 className="font-semibold">Próximo Evento</h3>
            <p className="text-sm text-muted-foreground">Campanha de Inverno - 20/07</p>
          </div>
        </div>
        
        <div className="flutter-card flex items-center">
          <div className="mr-4 bg-solidario-orange/20 p-3 rounded-full">
            <Campaign className="w-6 h-6 text-solidario-orange" />
          </div>
          <div>
            <h3 className="font-semibold">Campanhas em Andamento</h3>
            <p className="text-sm text-muted-foreground">3 campanhas ativas</p>
          </div>
        </div>
        
        <div className="flutter-card flex items-center">
          <div className="mr-4 bg-solidario-teal/20 p-3 rounded-full">
            <MonetizationOn className="w-6 h-6 text-solidario-teal" />
          </div>
          <div>
            <h3 className="font-semibold">Total de Doações Realizadas</h3>
            <p className="text-sm text-muted-foreground">R$ 15.230,00</p>
          </div>
        </div>
        
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Últimas Atualizações</h2>
          <div className="flutter-card">
            <h3 className="font-medium">Obrigado por sua doação!</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Sua contribuição de roupas ajudou 5 famílias em situação de vulnerabilidade.
            </p>
            <p className="text-xs text-right mt-2 text-muted-foreground">há 2 dias</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardScreen;
