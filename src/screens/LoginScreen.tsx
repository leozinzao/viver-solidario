
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/context/AuthContext';
import { useNavigation } from '@/context/NavigationContext';
import { toast } from '@/components/ui/use-toast';
import { motion } from "framer-motion";
import { Eye, EyeOff, Mail, ArrowLeft, AlertTriangle } from "lucide-react";
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
  const [isResendingEmail, setIsResendingEmail] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [showGoogleError, setShowGoogleError] = useState(false);
  const { login, isAuthenticated } = useAuth();
  const { navigateToScreen } = useNavigation();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  });

  // Monitorar autenticação e redirecionar
  useEffect(() => {
    console.log('LoginScreen - Auth status:', isAuthenticated);
    
    if (isAuthenticated) {
      console.log('Usuário autenticado, redirecionando para home...');
      // Usar timeout para garantir que a mudança de estado seja processada
      setTimeout(() => {
        onLoginSuccess();
        navigateToScreen('home');
      }, 100);
    }
  }, [isAuthenticated, navigateToScreen, onLoginSuccess]);

  const handleLogin = async (values: LoginFormValues) => {
    setIsLoading(true);
    setShowEmailConfirmationAlert(false);
    
    try {
      console.log('Tentando fazer login com:', values.email);
      await login(values.email, values.password);
      
      // O redirecionamento será feito pelo useEffect quando isAuthenticated mudar
      console.log('Login iniciado, aguardando autenticação...');
      
    } catch (error: any) {
      console.log('Erro no login:', error);
      
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

    setIsResendingEmail(true);
    
    try {
      console.log('Reenviando email de confirmação para:', email);
      
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email: email,
        options: {
          emailRedirectTo: `${window.location.origin}`
        }
      });

      if (error) {
        console.error('Erro ao reenviar email:', error);
        throw error;
      }

      toast({
        title: "Email de confirmação reenviado",
        description: "Verifique sua caixa de entrada e pasta de spam. O email pode levar alguns minutos para chegar.",
      });
      
    } catch (error: any) {
      console.error('Erro ao reenviar confirmação:', error);
      toast({
        title: "Erro ao reenviar confirmação",
        description: error.message || "Tente novamente mais tarde.",
        variant: "destructive"
      });
    } finally {
      setIsResendingEmail(false);
    }
  };

  const handleGoogleLogin = async () => {
    setIsGoogleLoading(true);
    setShowGoogleError(false);
    
    try {
      console.log('Iniciando login com Google...');
      
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: window.location.origin,
          queryParams: {
            access_type: 'offline',
            prompt: 'select_account',
          },
        }
      });
      
      if (error) {
        console.error('Erro no Google login:', error);
        
        if (error.message.includes('provider is not enabled') || 
            error.message.includes('validation_failed') ||
            error.message.includes('Unsupported provider')) {
          
          setShowGoogleError(true);
          toast({
            title: "Problema com Google OAuth",
            description: "Há um problema na configuração do Google. Use o login com email.",
            variant: "destructive"
          });
          return;
        }
        
        throw error;
      }
      
      console.log('Google login iniciado com sucesso');
      
      toast({
        title: "Redirecionando para Google...",
        description: "Você será redirecionado para fazer login com o Google.",
      });
      
    } catch (error: any) {
      console.error('Erro inesperado no Google login:', error);
      
      toast({
        title: "Erro ao fazer login com Google",
        description: "Ocorreu um erro inesperado. Use o login com email.",
        variant: "destructive"
      });
    } finally {
      setIsGoogleLoading(false);
    }
  };

  return (
    <div className="flutter-screen p-4 flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-viver-yellow/10 via-white to-solidario-purple/10">
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="border-none shadow-xl bg-white/80 backdrop-blur-sm">
          <CardHeader className="text-center pb-2">
            <Button
              variant="ghost"
              onClick={onBackToWelcome}
              className="absolute top-4 left-4 p-2 hover:bg-gray-100 rounded-full"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </Button>
            
            <div className="mx-auto mb-4 w-20 h-20 rounded-full bg-gradient-to-br from-viver-yellow/20 to-viver-yellow/10 flex items-center justify-center shadow-lg">
              <img 
                src="/lovable-uploads/faca4f99-20c6-4b35-bcc4-bf561ee25dc9.png" 
                alt="ONG Viver"
                className="w-14 h-14 object-contain"
              />
            </div>
            <CardTitle className="text-2xl font-bold bg-gradient-to-r from-viver-yellow to-solidario-purple bg-clip-text text-transparent">
              Bem-vindo de volta
            </CardTitle>
            <p className="text-gray-500 text-sm mt-2">Entre em sua conta para continuar</p>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Alerta de confirmação de email */}
            {showEmailConfirmationAlert && (
              <Alert className="border-amber-200 bg-amber-50">
                <Mail className="h-4 w-4 text-amber-600" />
                <AlertDescription className="text-amber-800">
                  <div className="space-y-3">
                    <p className="font-medium">Email não confirmado</p>
                    <p className="text-sm">
                      Você precisa confirmar seu email antes de fazer login. Verifique sua caixa de entrada e pasta de spam.
                    </p>
                    <Button 
                      onClick={handleResendConfirmation}
                      disabled={isResendingEmail}
                      variant="outline" 
                      size="sm"
                      className="text-amber-700 border-amber-300 hover:bg-amber-100"
                    >
                      {isResendingEmail ? 'Reenviando...' : 'Reenviar email de confirmação'}
                    </Button>
                  </div>
                </AlertDescription>
              </Alert>
            )}

            {/* Alerta de erro do Google */}
            {showGoogleError && (
              <Alert className="border-red-200 bg-red-50">
                <AlertTriangle className="h-4 w-4 text-red-600" />
                <AlertDescription className="text-red-800">
                  <div className="space-y-2">
                    <p className="font-medium">Problema na configuração do Google</p>
                    <p className="text-sm">
                      O Google OAuth precisa ser reconfigurado. Use o login com email abaixo.
                    </p>
                  </div>
                </AlertDescription>
              </Alert>
            )}

            {/* Botão Google */}
            <Button 
              onClick={handleGoogleLogin}
              variant="outline"
              className="w-full h-12 border-2 border-gray-200 hover:bg-gray-50 rounded-xl font-medium shadow-sm hover:shadow-md transition-all duration-300"
              disabled={isGoogleLoading || isLoading}
            >
              <div className="flex items-center justify-center">
                <img 
                  src="https://developers.google.com/identity/images/g-logo.png" 
                  alt="Google"
                  className="w-5 h-5 mr-3"
                />
                {isGoogleLoading ? 'Conectando...' : 'Entrar com Google'}
              </div>
            </Button>

            {/* Divisor */}
            <div className="flex items-center">
              <div className="flex-1 border-t border-gray-200"></div>
              <span className="px-3 text-sm text-gray-400">ou continue com email</span>
              <div className="flex-1 border-t border-gray-200"></div>
            </div>

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
                          placeholder="seu@email.com"
                          type="email"
                          autoComplete="email"
                          disabled={isLoading || isGoogleLoading}
                          className="h-12"
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
                            disabled={isLoading || isGoogleLoading}
                            className="h-12 pr-12"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-gray-700 transition-colors"
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
                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-viver-yellow to-yellow-400 hover:from-viver-yellow/90 hover:to-yellow-400/90 text-black font-semibold h-12 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                  disabled={isLoading || isGoogleLoading}
                >
                  {isLoading ? 'Entrando...' : 'Entrar com Email'}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default LoginScreen;
