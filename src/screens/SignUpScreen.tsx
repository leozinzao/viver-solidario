
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { supabaseAuth } from '@/lib/supabase';
import { toast } from '@/components/ui/use-toast';

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
      // Registra o usuário no Supabase Auth
      const { data, error } = await supabaseAuth.signUp(email, senha);
      
      if (error) throw error;
      
      if (data) {
        // Após o registro bem-sucedido, podemos adicionar o nome do usuário à tabela de voluntários
        const { error: profileError } = await supabase
          .from('voluntarios')
          .upsert([
            { 
              id: data.user.id,
              nome: nome,
              email: email,
              role: 'donor',
              theme: 'light'
            }
          ]);
        
        if (profileError) throw profileError;
        
        toast({
          title: "Cadastro realizado com sucesso",
          description: "Bem-vindo à ONG Viver!"
        });
        
        onSignUpSuccess();
      }
    } catch (error: any) {
      console.error('Erro ao cadastrar:', error);
      
      let errorMessage = "Ocorreu um erro ao realizar o cadastro.";
      
      if (error.message) {
        if (error.message.includes("duplicate")) {
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
    <div className="flutter-screen p-4 flex flex-col items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-viver-yellow">Cadastre-se</CardTitle>
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
              <Input
                id="senha"
                placeholder="Sua senha"
                type="password"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                className="w-full"
                required
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="confirmaSenha" className="text-sm font-medium">Confirmar senha</label>
              <Input
                id="confirmaSenha"
                placeholder="Confirme sua senha"
                type="password"
                value={confirmaSenha}
                onChange={(e) => setConfirmaSenha(e.target.value)}
                className="w-full"
                required
              />
            </div>
            
            <div className="pt-2">
              <Button 
                type="submit" 
                className="w-full bg-viver-yellow hover:bg-viver-yellow/90 text-black"
                disabled={isLoading}
              >
                {isLoading ? 'Cadastrando...' : 'Cadastrar'}
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
        </CardContent>
      </Card>
    </div>
  );
};

export default SignUpScreen;
