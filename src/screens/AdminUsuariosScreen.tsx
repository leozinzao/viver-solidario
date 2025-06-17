
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import UserManagement from '@/components/admin/UserManagement';
import { Users } from 'lucide-react';

const AdminUsuariosScreen: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <Card className="bg-gradient-to-r from-green-50 to-green-100 border-green-200">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-green-200 flex items-center justify-center">
                <Users className="h-8 w-8 text-green-600" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Gestão de Usuários</h1>
                <p className="text-gray-600">Controle usuários, permissões e roles</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Componente de gestão de usuários */}
        <UserManagement />
      </div>
    </div>
  );
};

export default AdminUsuariosScreen;
