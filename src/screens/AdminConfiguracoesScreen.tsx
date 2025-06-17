
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Settings, AlertTriangle } from 'lucide-react';

const AdminConfiguracoesScreen: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <Card className="bg-gradient-to-r from-gray-50 to-gray-100 border-gray-200">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center">
                <Settings className="h-8 w-8 text-gray-600" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Configurações do Sistema</h1>
                <p className="text-gray-600">Gerencie configurações globais da plataforma</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Placeholder para configurações */}
        <Card>
          <CardContent className="p-12">
            <div className="text-center">
              <div className="w-20 h-20 rounded-full bg-orange-100 flex items-center justify-center mx-auto mb-6">
                <AlertTriangle className="h-10 w-10 text-orange-600" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                Área de Configurações
              </h3>
              <p className="text-gray-600 max-w-md mx-auto">
                Funcionalidades avançadas de configuração e personalização do sistema estarão disponíveis em breve.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminConfiguracoesScreen;
