
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from '@/components/ui/use-toast';

interface ContaLuzDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const ContaLuzDialog: React.FC<ContaLuzDialogProps> = ({ isOpen, onOpenChange }) => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [consentimento, setConsentimento] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!nome || !email || !consentimento) {
      toast({
        title: "Campos obrigatórios",
        description: "Preencha todos os campos e aceite o consentimento.",
        variant: "destructive"
      });
      return;
    }

    // Aqui você pode implementar o envio dos dados
    toast({
      title: "Dados enviados",
      description: "Entraremos em contato em breve!"
    });

    // Limpar formulário
    setNome('');
    setEmail('');
    setConsentimento(false);
    onOpenChange(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-viver-yellow">Conta de Luz / Carnê Solidário</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Contribua com valores a partir de R$ 15,00 mensais. Deixe seus dados que entraremos em contato!
          </p>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="nome">Nome</Label>
              <Input
                id="nome"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                placeholder="Seu nome completo"
              />
            </div>
            
            <div>
              <Label htmlFor="email">E-mail</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu@email.com"
              />
            </div>
            
            <div className="flex items-start space-x-2">
              <Checkbox
                id="consentimento"
                checked={consentimento}
                onCheckedChange={(checked) => setConsentimento(checked as boolean)}
              />
              <Label htmlFor="consentimento" className="text-xs leading-tight">
                Estou ciente de que ao enviar meus dados estou autorizando e consentindo com o tratamento dos meus dados pessoais como: nome completo e e-mail, telefone e etc, para finalidade exclusiva da Ong Viver e suas atividades.
              </Label>
            </div>
            
            <Button 
              type="submit" 
              className="w-full bg-viver-yellow hover:bg-viver-yellow/90 text-black"
            >
              Enviar mensagem
            </Button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ContaLuzDialog;
