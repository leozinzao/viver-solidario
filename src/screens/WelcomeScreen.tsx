
import React from 'react';
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Heart, Users, HandHeart, Sparkles } from "lucide-react";

interface WelcomeScreenProps {
  onEnterApp: () => void;
  onLogin: () => void;
  onSignUp: () => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onEnterApp, onLogin, onSignUp }) => {
  return (
    <div className="flutter-screen min-h-screen bg-gradient-to-br from-viver-yellow/20 via-white to-solidario-purple/20 flex flex-col justify-center items-center relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-viver-yellow/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-solidario-purple/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-viver-yellow/5 to-solidario-purple/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 w-full max-w-md px-6">
        <motion.div 
          initial={{ y: -30, opacity: 0 }} 
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col items-center"
        >
          {/* Logo with enhanced styling */}
          <div className="relative mb-8">
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="w-32 h-32 rounded-full bg-gradient-to-br from-viver-yellow/20 to-viver-yellow/10 flex items-center justify-center shadow-2xl border border-viver-yellow/20"
            >
              <img 
                src="/lovable-uploads/faca4f99-20c6-4b35-bcc4-bf561ee25dc9.png" 
                alt="ONG Viver"
                className="w-24 h-24 object-contain"
              />
            </motion.div>
            
            {/* Floating hearts animation */}
            <motion.div
              animate={{ 
                y: [-10, -20, -10],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ 
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute -top-2 -right-2"
            >
              <Heart className="w-6 h-6 text-red-400 fill-red-400" />
            </motion.div>
          </div>
          
          {/* Title with enhanced typography */}
          <motion.h1 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-4xl font-bold text-center bg-gradient-to-r from-viver-yellow to-solidario-purple bg-clip-text text-transparent mb-3"
          >
            ONG Viver
          </motion.h1>
          
          {/* Subtitle with better spacing */}
          <motion.p 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="text-center text-gray-600 mb-8 text-lg font-medium max-w-sm leading-relaxed"
          >
            Transformando vidas através da solidariedade e do amor ao próximo
          </motion.p>

          {/* Feature highlights */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="flex justify-center space-x-8 mb-10"
          >
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-viver-yellow/10 rounded-full flex items-center justify-center mb-2">
                <Users className="w-6 h-6 text-viver-yellow" />
              </div>
              <span className="text-xs text-gray-500 font-medium">Comunidade</span>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-solidario-purple/10 rounded-full flex items-center justify-center mb-2">
                <HandHeart className="w-6 h-6 text-solidario-purple" />
              </div>
              <span className="text-xs text-gray-500 font-medium">Solidariedade</span>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-green-500/10 rounded-full flex items-center justify-center mb-2">
                <Sparkles className="w-6 h-6 text-green-500" />
              </div>
              <span className="text-xs text-gray-500 font-medium">Impacto</span>
            </div>
          </motion.div>
          
          {/* Action buttons with enhanced styling */}
          <motion.div 
            initial={{ y: 30, opacity: 0 }} 
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1, duration: 0.6 }}
            className="space-y-4 w-full"
          >
            <Button 
              className="w-full bg-gradient-to-r from-viver-yellow to-yellow-400 hover:from-viver-yellow/90 hover:to-yellow-400/90 text-black font-semibold py-6 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]"
              onClick={onEnterApp}
            >
              <Users className="w-5 h-5 mr-2" />
              Entrar como visitante
            </Button>
            
            <div className="flex space-x-3">
              <Button 
                variant="outline" 
                className="flex-1 border-2 border-viver-yellow text-viver-yellow hover:bg-viver-yellow hover:text-black py-5 rounded-xl font-semibold transition-all duration-300 hover:shadow-lg"
                onClick={onLogin}
              >
                Login
              </Button>

              <Button 
                variant="outline" 
                className="flex-1 border-2 border-solidario-purple text-solidario-purple hover:bg-solidario-purple hover:text-white py-5 rounded-xl font-semibold transition-all duration-300 hover:shadow-lg"
                onClick={onSignUp}
              >
                Cadastrar-se
              </Button>
            </div>
          </motion.div>
          
          {/* Footer with better styling */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.6 }}
            className="mt-12 text-center"
          >
            <p className="text-xs text-gray-400 mb-2">
              Versão 1.0.0
            </p>
            <p className="text-xs text-gray-500 max-w-xs">
              Juntos somos mais fortes. Cada gesto de amor faz a diferença.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default WelcomeScreen;
