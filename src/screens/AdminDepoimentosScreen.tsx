
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import TestimonialManager from '@/components/admin/TestimonialManager';
import { MessageSquare } from 'lucide-react';

const AdminDepoimentosScreen: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <Card className="bg-gradient-to-r from-purple-50 to-purple-100 border-purple-200">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-purple-200 flex items-center justify-center">
                <MessageSquare className="h-8 w-8 text-purple-600" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Gestão de Depoimentos</h1>
                <p className="text-gray-600">Modere e publique depoimentos dos usuários</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Componente de gestão de depoimentos */}
        <Card>
          <CardContent className="p-6">
            <TestimonialManager />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDepoimentosScreen;
