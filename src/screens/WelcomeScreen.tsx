
import React from 'react';
import { Button } from "@/components/ui/button";

interface WelcomeScreenProps {
  onEnterApp: () => void;
  onLogin: () => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onEnterApp, onLogin }) => {
  return (
    <div className="flutter-screen p-4 bg-white flex flex-col justify-center items-center">
      <div className="w-32 h-32 mb-6 rounded-full bg-viver-yellow/10 flex items-center justify-center">
        <img 
          src="/lovable-uploads/faca4f99-20c6-4b35-bcc4-bf561ee25dc9.png" 
          alt="ONG Viver"
          className="w-24 h-24 object-contain"
        />
      </div>
      
      <h1 className="text-2xl font-bold text-center text-viver-yellow mb-2">ONG Viver</h1>
      <p className="text-center text-muted-foreground mb-8">Transformando vidas através da solidariedade</p>
      
      <div className="space-y-2 w-full max-w-xs">
        <Button 
          className="w-full bg-viver-yellow hover:bg-viver-yellow/90 text-black"
          onClick={onEnterApp}
        >
          Entrar como visitante
        </Button>
        
        <Button 
          variant="outline" 
          className="w-full border-viver-yellow text-viver-yellow hover:bg-viver-yellow/10"
          onClick={onLogin}
        >
          Login
        </Button>
      </div>
      
      <p className="text-xs text-muted-foreground text-center mt-8">
        Versão 1.0.0
      </p>
    </div>
  );
};

export default WelcomeScreen;
