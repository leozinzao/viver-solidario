
import React from 'react';
import DoacoesFisicasRefactored from '@/components/donation/DoacoesFisicasRefactored';

const DoacoesFisicasScreenRefactored: React.FC = () => {
  return (
    <div className="flutter-screen bg-background p-4">
      <h1 className="text-2xl font-bold mb-6 text-viver-yellow text-center">
        Doações Físicas - Versão Refatorada
      </h1>
      <DoacoesFisicasRefactored />
    </div>
  );
};

export default DoacoesFisicasScreenRefactored;
