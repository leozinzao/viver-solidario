
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/context/AuthContext';
import { toast } from '@/components/ui/use-toast';
import { motion } from "framer-motion";
import { Eye, EyeOff, AlertCircle } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { supabase } from '@/lib/supabase';

interface LoginScreenProps {
  onBackToWelcome: () => void;
  onLoginSuccess: () => void;
}

const loginSchema = z.object({
  email: z.string()
    .email({ message: "Email inválido" }),
  password: z.string()
    .min(1, { message: "A senha é obrigatória" })
});

type LoginFormValues = z.infer<typeof loginSchema>;

const LoginScreen: React.FC<LoginScreenProps> = ({ onBackToWelcome, onLoginSuccess }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showEmailConfirmationAlert, setShowEmailConfirmationAlert] = useState(false);
  const { login } = useAuth();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  });

  const handleLogin = async (values: LoginFormValues) => {
    setIsLoading(true);
    setShowEmailConfirmationAlert(false);
    
    try {
      await login(values.email, values.password);
      toast({
        title: "Login realizado com sucesso",
        description: "Bem-vindo à ONG Viver!",
      });
      onLoginSuccess();
    } catch (error: any) {
      console.log('Login error:', error);
      
      // Verificar se é erro de email não confirmado
      if (error.message.includes('confirme seu email') || error.message.includes('Email not confirmed')) {
        setShowEmailConfirmationAlert(true);
      }
      
      toast({
        title: "Erro ao fazer login",
        description: error.message || "Verifique suas credenciais e tente novamente.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendConfirmation = async () => {
    const email = form.getValues('email');
    if (!email) {
      toast({
        title: "Digite seu email",
        description: "Por favor, digite seu email para reenviar a confirmação.",
        variant: "destructive"
      });
      return;
    }

    try {
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email: email
      });

      if (error) throw error;

      toast({
        title: "Email de confirmação reenviado",
        description: "Verifique sua caixa de entrada e spam.",
      });
    } catch (error: any) {
      toast({
        title: "Erro ao reenviar confirmação",
        description: error.message || "Tente novamente mais tarde.",
        variant: "destructive"
      });
    }
  };

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}`
        }
      });
      
      if (error) throw error;
      
      toast({
        title: "Redirecionando...",
        description: "Você será redirecionado para fazer login com o Google.",
      });
    } catch (error: any) {
      toast({
        title: "Erro ao fazer login com Google",
        description: error.message || "Tente novamente.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
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
            {/* Alerta de confirmação de email */}
            {showEmailConfirmationAlert && (
              <Alert className="mb-4 border-orange-200 bg-orange-50">
                <AlertCircle className="h-4 w-4 text-orange-600" />
                <AlertDescription className="text-orange-800">
                  <div className="space-y-2">
                    <p>Seu email ainda não foi confirmado. Verifique sua caixa de entrada e spam.</p>
                    <Button 
                      onClick={handleResendConfirmation}
                      variant="outline" 
                      size="sm"
                      className="text-orange-700 border-orange-300 hover:bg-orange-100"
                    >
                      Reenviar email de confirmação
                    </Button>
                  </div>
                </AlertDescription>
              </Alert>
            )}

            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleLogin)} className="space-y-4">
                {/* Campo de Email */}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Seu email"
                          type="email"
                          autoComplete="email"
                          disabled={isLoading}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Campo de Senha */}
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Senha</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            {...field}
                            placeholder="Sua senha"
                            type={showPassword ? "text" : "password"}
                            autoComplete="current-password"
                            disabled={isLoading}
                            className="pr-10"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
                            tabIndex={-1}
                          >
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                          </button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Botão de Login */}
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
            </Form>

            {/* Divisor */}
            <div className="flex items-center my-4">
              <div className="flex-1 border-t border-gray-300"></div>
              <span className="px-3 text-sm text-gray-500">ou</span>
              <div className="flex-1 border-t border-gray-300"></div>
            </div>

            {/* Botão Google */}
            <Button 
              onClick={handleGoogleLogin}
              variant="outline"
              className="w-full py-5 border-gray-300 hover:bg-gray-50"
              disabled={isLoading}
            >
              <img 
                src="https://developers.google.com/identity/images/g-logo.png" 
                alt="Google"
                className="w-5 h-5 mr-2"
              />
              Entrar com Google
            </Button>
            
            {/* Botão para Voltar */}
            <div className="mt-4 text-center">
              <Button 
                variant="link" 
                onClick={onBackToWelcome}
                className="text-viver-yellow"
              >
                Voltar para a tela inicial
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default LoginScreen;
