
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { useCreateTestimonial } from '@/hooks/useTestimonials';
import { useAuth } from '@/context/AuthContext';

interface TestimonialFormProps {
  onSuccess?: () => void;
}

const TestimonialForm: React.FC<TestimonialFormProps> = ({ onSuccess }) => {
  const { user } = useAuth();
  const [nome, setNome] = useState(user?.name || '');
  const [depoimento, setDepoimento] = useState('');
  
  const createTestimonial = useCreateTestimonial();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!nome || !depoimento) return;
    
    await createTestimonial.mutateAsync({
      nome,
      depoimento
    });
    
    // Limpa o formulário
    setNome(user?.name || '');
    setDepoimento('');
    
    if (onSuccess) {
      onSuccess();
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Compartilhe sua experiência</CardTitle>
        <CardDescription>
          Conte como a ONG Viver impactou sua vida. Seu depoimento será revisado antes de ser publicado.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="nome" className="text-sm font-medium">Nome</label>
            <Input
              id="nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder="Seu nome"
              required
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="depoimento" className="text-sm font-medium">Seu depoimento</label>
            <Textarea
              id="depoimento"
              value={depoimento}
              onChange={(e) => setDepoimento(e.target.value)}
              placeholder="Escreva aqui sua experiência com a ONG Viver..."
              rows={5}
              required
            />
          </div>
          
          <Button 
            type="submit" 
            disabled={createTestimonial.isPending}
            className="w-full bg-viver-yellow hover:bg-viver-yellow/90 text-black"
          >
            {createTestimonial.isPending ? 'Enviando...' : 'Enviar depoimento'}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="text-xs text-muted-foreground">
        Os depoimentos são moderados pela nossa equipe antes de serem publicados.
      </CardFooter>
    </Card>
  );
};

export default TestimonialForm;
