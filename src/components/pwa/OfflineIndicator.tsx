
import React from 'react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { WifiOff, Wifi } from 'lucide-react';
import { usePWA } from '@/hooks/usePWA';

const OfflineIndicator: React.FC = () => {
  const { isOnline } = usePWA();

  if (isOnline) return null;

  return (
    <Alert className="fixed top-4 left-4 right-4 z-50 bg-destructive text-destructive-foreground max-w-md mx-auto">
      <WifiOff className="h-4 w-4" />
      <AlertDescription className="flex items-center justify-between">
        <span>Você está offline</span>
        <Wifi className="h-4 w-4 opacity-50" />
      </AlertDescription>
    </Alert>
  );
};

export default OfflineIndicator;
