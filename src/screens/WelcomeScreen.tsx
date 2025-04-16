
import React from 'react';
import { Button } from '@/components/ui/button';

interface WelcomeScreenProps {
  onEnterApp: () => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onEnterApp }) => {
  return (
    <div className="flutter-screen flex flex-col items-center justify-center p-6 bg-gradient-to-b from-viver-green/20 to-white dark:from-viver-green/10 dark:to-background">
      <div className="mb-8 flex flex-col items-center">
        <div className="w-32 h-32 rounded-full bg-viver-green/20 flex items-center justify-center mb-4">
          <span className="text-viver-green text-4xl font-bold">VIVER</span>
        </div>
        <h1 className="text-3xl font-bold mb-2 text-viver-green">ONG Viver</h1>
        <p className="text-center text-muted-foreground">Transformando vidas há mais de 20 anos</p>
      </div>
      
      <div className="space-y-4 w-full max-w-xs">
        <div className="bg-white p-4 rounded-lg shadow-md dark:bg-card">
          <h2 className="font-semibold mb-2 text-center">Nosso Trabalho</h2>
          <p className="text-sm text-center text-muted-foreground">
            Atuamos na assistência social para crianças e adolescentes em situação de vulnerabilidade social.
          </p>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow-md dark:bg-card">
          <h2 className="font-semibold mb-2 text-center">Nossa Missão</h2>
          <p className="text-sm text-center text-muted-foreground">
            Proporcionar oportunidades de desenvolvimento e transformação social através de projetos socioeducativos.
          </p>
        </div>
      </div>
      
      <div className="mt-10 w-full max-w-xs space-y-4">
        <Button 
          onClick={onEnterApp} 
          className="w-full py-6 text-lg bg-viver-green hover:bg-viver-green/90"
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
        <p>Criciúma/SC - Transformando vidas com amor</p>
      </footer>
    </div>
  );
};

export default WelcomeScreen;
