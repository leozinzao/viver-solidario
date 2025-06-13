
import React from 'react';
import { Bell } from 'lucide-react';

const EmptyNotifications: React.FC = () => {
  return (
    <div className="text-center py-12 px-6">
      <div className="w-16 h-16 rounded-full bg-gray-100 mx-auto mb-4 flex items-center justify-center">
        <Bell className="h-8 w-8 text-gray-400" />
      </div>
      <h3 className="font-semibold text-lg text-gray-700 mb-2">
        Nenhuma notificação
      </h3>
      <p className="text-sm text-gray-500 max-w-sm mx-auto">
        Você está em dia com todas as atividades! 
        <br />
        Novas notificações aparecerão aqui.
      </p>
    </div>
  );
};

export default EmptyNotifications;
