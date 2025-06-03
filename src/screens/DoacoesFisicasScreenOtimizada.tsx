
import React from 'react';
import DoacoesFisicasOtimizadas from '@/components/donation/DoacoesFisicasOtimizadas';

const DoacoesFisicasScreenOtimizada: React.FC = () => {
  return (
    <div className="flutter-screen bg-background p-4">
      <h1 className="text-2xl font-bold mb-6 text-viver-yellow text-center">
        Doações Físicas
      </h1>
      <DoacoesFisicasOtimizadas />
    </div>
  );
};

export default DoacoesFisicasScreenOtimizada;
