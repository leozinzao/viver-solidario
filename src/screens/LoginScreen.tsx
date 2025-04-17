
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/context/AuthContext';
import { toast } from '@/components/ui/use-toast';

interface LoginScreenProps {
  onBackToWelcome: () => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onBackToWelcome }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
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

  return (
    <div className="flutter-screen p-4 flex flex-col items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-viver-yellow">Login</CardTitle>
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
              <Input
                id="password"
                placeholder="Sua senha"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full"
              />
            </div>
            <div className="pt-2">
              <Button 
                type="submit" 
                className="w-full bg-viver-yellow hover:bg-viver-yellow/90 text-black"
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
              Voltar
            </Button>
          </div>
          
          <div className="mt-6 text-xs text-muted-foreground text-center">
            <p>Dica para teste:</p>
            <p>Use "interno@viver.org" para acessar como usuário interno</p>
            <p>Use "voluntario@viver.org" para acessar como voluntário</p>
            <p>Use qualquer outro email para acessar como doador</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginScreen;
