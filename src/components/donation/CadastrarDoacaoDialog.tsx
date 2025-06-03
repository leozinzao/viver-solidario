
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Heart } from 'lucide-react';
import { useDoacoesFisicasImproved } from '@/hooks/useDoacoesFisicasImproved';
import { useAuth } from '@/context/AuthContext';
import FormularioDoacaoFisica from './FormularioDoacaoFisica';

interface CadastrarDoacaoDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const CadastrarDoacaoDialog: React.FC<CadastrarDoacaoDialogProps> = ({
  isOpen,
  onOpenChange
}) => {
  const { criarDoacao } = useDoacoesFisicasImproved();
  const { user } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (dadosDoacao: any): Promise<boolean> => {
    if (!user) {
      return false;
    }

    setIsSubmitting(true);

    try {
      // Preparar dados com o ID do usuário
      const dadosCompletos = {
        ...dadosDoacao,
        doador_id: user.id
      };

      console.log('Enviando dados:', dadosCompletos);
      
      const sucesso = await criarDoacao(dadosCompletos);
      
      if (sucesso) {
        onOpenChange(false);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Erro ao cadastrar doação:', error);
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    onOpenChange(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Heart className="h-5 w-5 text-viver-yellow" />
            Doar para a ONG Viver
          </DialogTitle>
        </DialogHeader>
        
        <FormularioDoacaoFisica
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
          onCancel={handleCancel}
        />
      </DialogContent>
    </Dialog>
  );
};

export default CadastrarDoacaoDialog;
