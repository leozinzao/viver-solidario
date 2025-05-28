
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from '@/components/ui/use-toast';
import { Heart, Send } from 'lucide-react';
import { supabase } from '@/lib/supabase';

const volunteerSchema = z.object({
  nome: z.string().min(3, "Nome deve ter pelo menos 3 caracteres"),
  email: z.string().email("Email inválido"),
  telefone: z.string().min(10, "Telefone deve ter pelo menos 10 dígitos"),
  areasInteresse: z.array(z.string()).min(1, "Selecione pelo menos uma área de interesse"),
  disponibilidade: z.string().min(1, "Selecione sua disponibilidade"),
  experienciaAnterior: z.string().optional(),
});

type VolunteerFormValues = z.infer<typeof volunteerSchema>;

const areasDisponiveis = [
  "Educação",
  "Meio Ambiente", 
  "Cultura",
  "Direitos Humanos",
  "Saúde",
  "Assistência Social",
  "Esporte",
  "Animais"
];

const disponibilidades = [
  "Manhã - Dias de semana",
  "Tarde - Dias de semana", 
  "Noite - Dias de semana",
  "Finais de semana",
  "Eventos pontuais",
  "Flexível"
];

const VolunteerForm: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<VolunteerFormValues>({
    resolver: zodResolver(volunteerSchema),
    defaultValues: {
      nome: "",
      email: "",
      telefone: "",
      areasInteresse: [],
      disponibilidade: "",
      experienciaAnterior: "",
    }
  });

  const handleAreaChange = (area: string, checked: boolean) => {
    const currentAreas = form.getValues('areasInteresse');
    if (checked) {
      form.setValue('areasInteresse', [...currentAreas, area]);
    } else {
      form.setValue('areasInteresse', currentAreas.filter(a => a !== area));
    }
  };

  const onSubmit = async (data: VolunteerFormValues) => {
    setIsLoading(true);
    
    try {
      const { error } = await supabase.functions.invoke('send-volunteer-email', {
        body: data
      });

      if (error) {
        console.error('Erro ao enviar email:', error);
        throw error;
      }

      toast({
        title: "Cadastro enviado com sucesso!",
        description: "Obrigado pelo interesse! Nossa equipe entrará em contato em breve.",
      });

      form.reset();
    } catch (error: any) {
      console.error('Erro completo:', error);
      toast({
        title: "Erro ao enviar cadastro",
        description: "Tente novamente ou entre em contato conosco diretamente.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="flutter-card">
      <CardHeader>
        <CardTitle className="flex items-center text-lg">
          <Heart className="mr-2 h-5 w-5 text-viver-yellow" />
          Cadastrar Novo Voluntário
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Nome completo */}
            <FormField
              control={form.control}
              name="nome"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome completo</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Seu nome completo" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Email */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} type="email" placeholder="seu@email.com" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Telefone */}
            <FormField
              control={form.control}
              name="telefone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Telefone</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="(11) 99999-9999" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Áreas de interesse */}
            <FormField
              control={form.control}
              name="areasInteresse"
              render={() => (
                <FormItem>
                  <FormLabel>Áreas de interesse</FormLabel>
                  <div className="grid grid-cols-2 gap-3">
                    {areasDisponiveis.map((area) => (
                      <div key={area} className="flex items-center space-x-2">
                        <Checkbox
                          id={area}
                          onCheckedChange={(checked) => handleAreaChange(area, checked as boolean)}
                        />
                        <label
                          htmlFor={area}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {area}
                        </label>
                      </div>
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Disponibilidade */}
            <FormField
              control={form.control}
              name="disponibilidade"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Disponibilidade</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione a disponibilidade" />
                      </SelectTrigger>
                      <SelectContent>
                        {disponibilidades.map((disp) => (
                          <SelectItem key={disp} value={disp}>
                            {disp}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Experiência anterior (opcional) */}
            <FormField
              control={form.control}
              name="experienciaAnterior"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Experiência anterior (opcional)</FormLabel>
                  <FormControl>
                    <Textarea 
                      {...field} 
                      placeholder="Descreva experiências anteriores como voluntário..."
                      rows={4}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button 
              type="submit" 
              className="w-full bg-viver-yellow hover:bg-viver-yellow/90 text-black"
              disabled={isLoading}
            >
              <Send className="mr-2 h-4 w-4" />
              {isLoading ? 'Enviando...' : 'Cadastrar'}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default VolunteerForm;
