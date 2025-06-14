
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AdminKPICards from '@/components/admin/AdminKPICards';
import DoacoesFisicasAdmin from '@/components/admin/DoacoesFisicasAdmin';
import { Package } from 'lucide-react';

const AdminDoacoesScreen: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <Card className="bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-blue-200 flex items-center justify-center">
                <Package className="h-8 w-8 text-blue-600" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Gestão de Doações</h1>
                <p className="text-gray-600">Gerencie todas as doações físicas da ONG</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* KPIs específicos de Doações */}
        <AdminKPICards />
        
        {/* Componente principal de doações */}
        <DoacoesFisicasAdmin />
      </div>
    </div>
  );
};

export default AdminDoacoesScreen;
