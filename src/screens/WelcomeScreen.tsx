
import React from 'react';
import { Button } from '@/components/ui/button';

interface WelcomeScreenProps {
  onEnterApp: () => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onEnterApp }) => {
  return (
    <div className="flutter-screen flex flex-col items-center justify-center p-6 bg-gradient-to-b from-viver-yellow/20 to-white dark:from-viver-yellow/10 dark:to-background">
      <div className="mb-8 flex flex-col items-center">
        <div className="w-40 h-40 mb-4">
          <img 
            src="/lovable-uploads/faca4f99-20c6-4b35-bcc4-bf561ee25dc9.png" 
            alt="Logo ONG Viver"
            className="w-full h-full object-contain"
          />
        </div>
        <p className="text-center text-muted-foreground max-w-xs">APOIO À CRIANÇA E ADOLESCENTE COM CÂNCER</p>
      </div>
      
      <div className="space-y-4 w-full max-w-xs">
        <div className="bg-white p-4 rounded-lg shadow-md dark:bg-card">
          <h2 className="font-semibold mb-2 text-center">Nosso Trabalho</h2>
          <p className="text-sm text-center text-muted-foreground">
            Atuamos na assistência social para crianças e adolescentes com câncer e suas famílias.
          </p>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow-md dark:bg-card">
          <h2 className="font-semibold mb-2 text-center">Nossa Missão</h2>
          <p className="text-sm text-center text-muted-foreground">
            Proporcionar apoio e assistência às crianças e adolescentes com câncer, buscando melhorar sua qualidade de vida.
          </p>
        </div>
      </div>
      
      <div className="mt-10 w-full max-w-xs space-y-4">
        <Button 
          onClick={onEnterApp} 
          className="w-full py-6 text-lg bg-viver-yellow text-black hover:bg-viver-yellow/90"
        >
          Entrar no App
        </Button>
        
        <div className="flex justify-center space-x-4">
          <Button variant="outline" size="sm">Sobre Nós</Button>
          <Button variant="outline" size="sm">Contato</Button>
        </div>
      </div>
      
      <footer className="mt-auto pt-6 text-xs text-center text-muted-foreground">
        <p>ONG Viver © {new Date().getFullYear()}</p>
        <p>Apoio à criança e adolescente com câncer</p>
      </footer>
    </div>
  );
};

export default WelcomeScreen;
