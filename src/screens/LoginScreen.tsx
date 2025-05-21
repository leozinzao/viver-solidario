
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/context/AuthContext';
import { toast } from '@/components/ui/use-toast';
import { motion } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";

interface LoginScreenProps {
  onBackToWelcome: () => void;
  onLoginSuccess: () => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onBackToWelcome, onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha todos os campos.",
        variant: "destructive"
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      await login(email, password);
      toast({
        title: "Login realizado com sucesso",
        description: "Bem-vindo à ONG Viver!",
      });
      onLoginSuccess();
    } catch (error) {
      toast({
        title: "Erro ao fazer login",
        description: "Verifique suas credenciais e tente novamente.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flutter-screen p-4 flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-white to-viver-yellow/5">
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="border-none shadow-lg">
          <CardHeader className="text-center pb-2">
            <div className="mx-auto mb-4 w-20 h-20 rounded-full bg-viver-yellow/10 flex items-center justify-center">
              <img 
                src="/lovable-uploads/faca4f99-20c6-4b35-bcc4-bf561ee25dc9.png" 
                alt="ONG Viver"
                className="w-14 h-14 object-contain"
              />
            </div>
            <CardTitle className="text-2xl font-bold text-viver-yellow">Acesso ao Sistema</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">Email</label>
                <Input
                  id="email"
                  placeholder="Seu email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium">Senha</label>
                <div className="relative">
                  <Input
                    id="password"
                    placeholder="Sua senha"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pr-10"
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
              <div className="pt-2">
                <Button 
                  type="submit" 
                  className="w-full bg-viver-yellow hover:bg-viver-yellow/90 text-black font-medium py-5"
                  disabled={isLoading}
                >
                  {isLoading ? 'Entrando...' : 'Entrar'}
                </Button>
              </div>
            </form>
            
            <div className="mt-4 text-center">
              <Button 
                variant="link" 
                onClick={onBackToWelcome}
                className="text-viver-yellow"
              >
                Voltar para a tela inicial
              </Button>
            </div>
            
            <div className="mt-6 text-xs text-muted-foreground text-center px-4 py-3 bg-muted/30 rounded-md">
              <p className="mb-1 font-medium">Acessos para teste:</p>
              <p>interno@viver.org (acesso interno)</p>
              <p>voluntario@viver.org (voluntário)</p>
              <p>qualquer@email.com (doador)</p>
              <p className="mt-1 text-[11px]">Senha: qualquer senha</p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default LoginScreen;
