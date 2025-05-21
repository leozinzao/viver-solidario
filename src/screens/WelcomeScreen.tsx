
import React from 'react';
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

interface WelcomeScreenProps {
  onEnterApp: () => void;
  onLogin: () => void;
  onSignUp: () => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onEnterApp, onLogin, onSignUp }) => {
  return (
    <div className="flutter-screen min-h-screen p-6 bg-gradient-to-b from-white to-viver-yellow/10 flex flex-col justify-center items-center">
      <motion.div 
        initial={{ y: -20, opacity: 0 }} 
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md flex flex-col items-center"
      >
        <div className="w-36 h-36 mb-6 rounded-full bg-viver-yellow/10 flex items-center justify-center shadow-lg">
          <img 
            src="/lovable-uploads/faca4f99-20c6-4b35-bcc4-bf561ee25dc9.png" 
            alt="ONG Viver"
            className="w-28 h-28 object-contain"
          />
        </div>
        
        <motion.h1 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-3xl font-bold text-center text-viver-yellow mb-2"
        >
          ONG Viver
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-center text-muted-foreground mb-10 max-w-xs"
        >
          Transformando vidas através da solidariedade
        </motion.p>
        
        <motion.div 
          initial={{ y: 20, opacity: 0 }} 
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="space-y-3 w-full max-w-xs"
        >
          <Button 
            className="w-full bg-viver-yellow hover:bg-viver-yellow/90 text-black font-medium py-6 text-lg"
            onClick={onEnterApp}
          >
            Entrar como visitante
          </Button>
          
          <Button 
            variant="outline" 
            className="w-full border-viver-yellow text-viver-yellow hover:bg-viver-yellow/10 py-5"
            onClick={onLogin}
          >
            Login
          </Button>

          <Button 
            variant="outline" 
            className="w-full border-solidario-purple text-solidario-purple hover:bg-solidario-purple/10 py-5"
            onClick={onSignUp}
          >
            Cadastrar-se
          </Button>
        </motion.div>
        
        <p className="text-xs text-muted-foreground text-center mt-10">
          Versão 1.0.0
        </p>
      </motion.div>
    </div>
  );
};

export default WelcomeScreen;
