
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Download, X } from 'lucide-react';
import { usePWA } from '@/hooks/usePWA';

interface InstallPromptProps {
  onDismiss: () => void;
}

const InstallPrompt: React.FC<InstallPromptProps> = ({ onDismiss }) => {
  const { installApp } = usePWA();

  const handleInstall = async () => {
    const success = await installApp();
    if (success) {
      onDismiss();
    }
  };

  return (
    <Card className="fixed bottom-20 left-4 right-4 p-4 bg-primary text-primary-foreground shadow-lg z-50 max-w-md mx-auto">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <Download className="h-5 w-5" />
          <span className="font-semibold">Instalar App</span>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={onDismiss}
          className="text-primary-foreground hover:bg-primary-foreground/20"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
      <p className="text-sm mb-3 opacity-90">
        Instale o Viver Solidário em seu dispositivo para acesso rápido e notificações.
      </p>
      <div className="flex gap-2">
        <Button
          onClick={handleInstall}
          variant="secondary"
          size="sm"
          className="flex-1"
        >
          Instalar
        </Button>
        <Button
          onClick={onDismiss}
          variant="ghost"
          size="sm"
          className="text-primary-foreground hover:bg-primary-foreground/20"
        >
          Agora não
        </Button>
      </div>
    </Card>
  );
};

export default InstallPrompt;
