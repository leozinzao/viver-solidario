
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
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [role, setRole] = useState(user?.role === 'volunteer' ? 'Voluntário' : '');
  
  const createTestimonial = useCreateTestimonial();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title || !content) return;
    
    await createTestimonial.mutateAsync({
      titulo: title,
      conteudo: content,
      autor_nome: user?.name || 'Usuário anônimo',
      autor_cargo: role,
      publicado: false // Por padrão, depoimentos precisam de aprovação
    });
    
    // Limpa o formulário
    setTitle('');
    setContent('');
    setRole(user?.role === 'volunteer' ? 'Voluntário' : '');
    
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
            <label htmlFor="title" className="text-sm font-medium">Título</label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Um título para seu depoimento"
              required
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="content" className="text-sm font-medium">Seu depoimento</label>
            <Textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Escreva aqui sua experiência com a ONG Viver..."
              rows={5}
              required
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="role" className="text-sm font-medium">Sua relação com a ONG</label>
            <Input
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              placeholder="Ex: Voluntário, Beneficiado, Doador..."
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
