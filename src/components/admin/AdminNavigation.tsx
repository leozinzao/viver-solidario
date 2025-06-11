
import React from 'react';
import { Button } from '@/components/ui/button';
import { Home, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const AdminNavigation: React.FC = () => {
  return (
    <div className="bg-white border-b border-gray-200 px-6 py-4 mb-6">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link to="/">
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Voltar ao App
            </Button>
          </Link>
          <div className="h-6 w-px bg-gray-300"></div>
          <h1 className="text-xl font-semibold text-gray-900">
            Painel Administrativo - ONG Viver
          </h1>
        </div>
        
        <Link to="/">
          <Button variant="ghost" size="sm" className="flex items-center gap-2">
            <Home className="h-4 w-4" />
            Página Inicial
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default AdminNavigation;
