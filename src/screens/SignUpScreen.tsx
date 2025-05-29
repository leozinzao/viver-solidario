
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/components/ui/use-toast';
import { motion } from "framer-motion";
import { Eye, EyeOff, ArrowLeft } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { supabase } from "@/lib/supabase";

interface SignUpScreenProps {
  onBackToWelcome: () => void;
  onSignUpSuccess: () => void;
}

const signUpSchema = z.object({
  nome: z.string()
    .min(3, { message: "O nome deve ter pelo menos 3 caracteres" })
    .max(100, { message: "O nome não pode ter mais de 100 caracteres" }),
  email: z.string()
    .email({ message: "Email inválido" }),
  senha: z.string()
    .min(6, { message: "A senha deve ter pelo menos 6 caracteres" })
    .max(100, { message: "A senha não pode ter mais de 100 caracteres" }),
  confirmaSenha: z.string(),
  perfil: z.enum(["donor", "volunteer"], { required_error: "Selecione um perfil" }),
  telefone: z.string().optional(),
}).refine((data) => data.senha === data.confirmaSenha, {
  message: "As senhas não coincidem",
  path: ["confirmaSenha"],
});

type SignUpFormValues = z.infer<typeof signUpSchema>;

const SignUpScreen: React.FC<SignUpScreenProps> = ({ onBackToWelcome, onSignUpSuccess }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  const form = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      nome: "",
      email: "",
      senha: "",
      confirmaSenha: "",
      perfil: "donor",
      telefone: ""
    }
  });

  const handleSignUp = async (values: SignUpFormValues) => {
    setIsLoading(true);

    try {
      console.log('Iniciando cadastro com email...');
      
      const { data, error } = await supabase.auth.signUp({
        email: values.email,
        password: values.senha,
        options: {
          data: {
            nome: values.nome,
            perfil: values.perfil,
            telefone: values.telefone
          },
          emailRedirectTo: `${window.location.origin}`
        }
      });

      if (error) {
        console.error('Erro no cadastro:', error);
        throw error;
      }

      console.log('Cadastro realizado:', data);

      toast({
        title: "Cadastro realizado com sucesso!",
        description: "Verifique seu e-mail para confirmar o cadastro antes de fazer login.",
      });

      form.reset();
      onSignUpSuccess();
    } catch (error: any) {
      console.error('Erro completo no cadastro:', error);
      toast({
        title: "Erro no cadastro",
        description: error.message || "Ocorreu um erro ao realizar o cadastro.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignUp = async () => {
    setIsGoogleLoading(true);
    
    try {
      console.log('Iniciando login com Google...');
      
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}`,
          queryParams: {
            access_type: 'offline',
            prompt: 'select_account',
          },
        }
      });
      
      if (error) {
        console.error('Erro no Google OAuth:', error);
        throw error;
      }
      
      console.log('Google OAuth iniciado com sucesso');
      
      // O redirecionamento acontece automaticamente
      toast({
        title: "Redirecionando para Google...",
        description: "Você será redirecionado para se cadastrar com o Google.",
      });
      
    } catch (error: any) {
      console.error('Erro no Google signup:', error);
      toast({
        title: "Erro ao cadastrar com Google",
        description: error.message || "Ocorreu um erro. Tente usar o cadastro com email.",
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
              Cadastre-se
            </CardTitle>
            <p className="text-gray-500 text-sm mt-2">Junte-se à nossa comunidade solidária</p>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Botão Google */}
            <Button 
              onClick={handleGoogleSignUp}
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
                {isGoogleLoading ? 'Conectando com Google...' : 'Cadastrar com Google'}
              </div>
            </Button>

            {/* Divisor */}
            <div className="flex items-center">
              <div className="flex-1 border-t border-gray-200"></div>
              <span className="px-3 text-sm text-gray-400">ou cadastre-se com email</span>
              <div className="flex-1 border-t border-gray-200"></div>
            </div>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleSignUp)} className="space-y-4">
                {/* Campo Nome */}
                <FormField
                  control={form.control}
                  name="nome"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nome completo</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Seu nome completo"
                          autoComplete="name"
                          disabled={isLoading || isGoogleLoading}
                          className="h-11"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                {/* Campo Email */}
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
                          className="h-11"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Campo Telefone */}
                <FormField
                  control={form.control}
                  name="telefone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Telefone (opcional)</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="(11) 99999-9999"
                          type="tel"
                          disabled={isLoading || isGoogleLoading}
                          className="h-11"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                {/* Campo Perfil */}
                <FormField
                  control={form.control}
                  name="perfil"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Como você quer contribuir?</FormLabel>
                      <FormControl>
                        <Select onValueChange={field.onChange} defaultValue={field.value} disabled={isLoading || isGoogleLoading}>
                          <SelectTrigger className="h-11">
                            <SelectValue placeholder="Selecione uma opção" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="donor">Doador - Quero fazer doações</SelectItem>
                            <SelectItem value="volunteer">Voluntário - Quero ajudar com meu tempo</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                {/* Campo Senha */}
                <FormField
                  control={form.control}
                  name="senha"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Senha</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            {...field}
                            placeholder="Mínimo 6 caracteres"
                            type={showPassword ? "text" : "password"}
                            autoComplete="new-password"
                            disabled={isLoading || isGoogleLoading}
                            className="h-11 pr-12"
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
                
                {/* Campo Confirmar Senha */}
                <FormField
                  control={form.control}
                  name="confirmaSenha"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirmar senha</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            {...field}
                            placeholder="Digite a senha novamente"
                            type={showConfirmPassword ? "text" : "password"}
                            autoComplete="new-password"
                            disabled={isLoading || isGoogleLoading}
                            className="h-11 pr-12"
                          />
                          <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-gray-700 transition-colors"
                            tabIndex={-1}
                          >
                            {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                          </button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="pt-2">
                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-viver-yellow to-yellow-400 hover:from-viver-yellow/90 hover:to-yellow-400/90 text-black font-semibold h-12 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                    disabled={isLoading || isGoogleLoading}
                  >
                    {isLoading ? 'Cadastrando...' : 'Criar conta'}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default SignUpScreen;
