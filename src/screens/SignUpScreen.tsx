import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/input';
import { api } from '@/lib/api';
import { toast } from '@/components/ui/use-toast';
import { motion } from "framer-motion";
import { Eye, EyeOff, ArrowLeft } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

interface SignUpScreenProps {
  onBackToWelcome: () => void;
  onSignUpSuccess: () => void;
}

// Atualize o schema para incluir o campo perfil
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
}).refine((data) => data.senha === data.confirmaSenha, {
  message: "As senhas não coincidem",
  path: ["confirmaSenha"],
});

// Define form values type from schema
type SignUpFormValues = z.infer<typeof signUpSchema>;

const SignUpScreen: React.FC<SignUpScreenProps> = ({ onBackToWelcome, onSignUpSuccess }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const form = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      nome: "",
      email: "",
      senha: "",
      confirmaSenha: "",
      perfil: "donor"
    }
  });

  const handleSignUp = async (values: SignUpFormValues) => {
    setIsLoading(true);

    try {
      await api('/api/auth/register', {
        method: 'POST',
        body: JSON.stringify({
          nome: values.nome,
          email: values.email,
          senha: values.senha,
          perfil: values.perfil
        })
      });

      toast({
        title: "Cadastro realizado com sucesso",
        description: "Sua conta foi criada! Agora você pode fazer login."
      });

      form.reset();
      onSignUpSuccess();
    } catch (error: any) {
      console.error('Erro ao cadastrar:', error);

      let errorMessage = "Ocorreu um erro ao realizar o cadastro.";

      if (error.message && typeof error.message === "string") {
        errorMessage = error.message;
      } else if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (String(error).includes("duplicate")) {
        errorMessage = "Este e-mail já está cadastrado.";
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
                          disabled={isLoading}
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
                            placeholder="Sua senha"
                            type={showPassword ? "text" : "password"}
                            autoComplete="new-password"
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
                            placeholder="Confirme sua senha"
                            type={showConfirmPassword ? "text" : "password"}
                            autoComplete="new-password"
                            disabled={isLoading}
                            className="pr-10"
                          />
                          <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
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

                {/* Campo Perfil */}
                <FormField
                  control={form.control}
                  name="perfil"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tipo de Perfil</FormLabel>
                      <FormControl>
                        <select
                          {...field}
                          disabled={isLoading}
                          className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-solidario-purple"
                        >
                          <option value="donor">Doador</option>
                          <option value="volunteer">Voluntário</option>
                        </select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

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
            </Form>
            
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