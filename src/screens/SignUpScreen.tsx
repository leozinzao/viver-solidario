
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { api } from '@/lib/api';
import { toast } from '@/components/ui/use-toast';
import { motion } from "framer-motion";
import { Eye, EyeOff, ArrowLeft } from "lucide-react";

interface SignUpScreenProps {
  onBackToWelcome: () => void;
  onSignUpSuccess: () => void;
}

const SignUpScreen: React.FC<SignUpScreenProps> = ({ onBackToWelcome, onSignUpSuccess }) => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmaSenha, setConfirmaSenha] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!nome || !email || !senha) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha todos os campos obrigatórios.",
        variant: "destructive"
      });
      return;
    }
    
    if (senha !== confirmaSenha) {
      toast({
        title: "Senhas diferentes",
        description: "As senhas informadas não coincidem.",
        variant: "destructive"
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Simulação de cadastro bem-sucedido
      console.log("Simulando cadastro com:", { nome, email, role: 'donor' });
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Cadastro realizado com sucesso",
        description: "Sua conta foi criada! Agora você pode fazer login."
      });
      
      // Limpa os campos do formulário
      setNome('');
      setEmail('');
      setSenha('');
      setConfirmaSenha('');
      
      onSignUpSuccess();
    } catch (error: any) {
      console.error('Erro ao cadastrar:', error);
      
      let errorMessage = "Ocorreu um erro ao realizar o cadastro.";
      
      if (error.message) {
        if (error.message.includes("duplicate") || error.message.includes("já está cadastrado")) {
          errorMessage = "Este e-mail já está cadastrado.";
        } else {
          errorMessage = error.message;
        }
      }
      
      toast({
        title: "Erro no cadastro",
        description: errorMessage,
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flutter-screen p-4 flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-white to-solidario-purple/5">
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="border-none shadow-lg">
          <CardHeader className="text-center pb-2">
            <div className="mx-auto mb-4 w-20 h-20 rounded-full bg-solidario-purple/10 flex items-center justify-center">
              <img 
                src="/lovable-uploads/faca4f99-20c6-4b35-bcc4-bf561ee25dc9.png" 
                alt="ONG Viver"
                className="w-14 h-14 object-contain"
              />
            </div>
            <CardTitle className="text-2xl font-bold text-solidario-purple">Cadastrar-se</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSignUp} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="nome" className="text-sm font-medium">Nome completo</label>
                <Input
                  id="nome"
                  placeholder="Seu nome completo"
                  type="text"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  className="w-full"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">Email</label>
                <Input
                  id="email"
                  placeholder="Seu email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="senha" className="text-sm font-medium">Senha</label>
                <div className="relative">
                  <Input
                    id="senha"
                    placeholder="Sua senha"
                    type={showPassword ? "text" : "password"}
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                    className="w-full pr-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="confirmaSenha" className="text-sm font-medium">Confirmar senha</label>
                <div className="relative">
                  <Input
                    id="confirmaSenha"
                    placeholder="Confirme sua senha"
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmaSenha}
                    onChange={(e) => setConfirmaSenha(e.target.value)}
                    className="w-full pr-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
                  >
                    {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
              
              <div className="pt-2">
                <Button 
                  type="submit" 
                  className="w-full bg-solidario-purple hover:bg-solidario-purple/90 text-white font-medium py-5"
                  disabled={isLoading}
                >
                  {isLoading ? 'Cadastrando...' : 'Cadastrar'}
                </Button>
              </div>
            </form>
            
            <div className="mt-4 flex justify-center">
              <Button 
                variant="ghost" 
                onClick={onBackToWelcome}
                className="text-solidario-purple flex items-center gap-1"
              >
                <ArrowLeft size={16} />
                <span>Voltar para a tela inicial</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default SignUpScreen;
