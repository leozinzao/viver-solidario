
import React from 'react';
import ListaDoacoesFisicas from '@/components/donation/ListaDoacoesFisicas';

const DoacoesFisicasScreen: React.FC = () => {
  return (
    <div className="flutter-screen bg-background p-4">
      <h1 className="text-2xl font-bold mb-6 text-viver-yellow text-center">
        Doações Físicas
      </h1>
      <ListaDoacoesFisicas />
    </div>
  );
};

export default DoacoesFisicasScreen;
