
import React from 'react';
import { CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Bell, AlertTriangle, Eye } from 'lucide-react';

interface NotificationHeaderProps {
  unreadCount: number;
  urgentCount: number;
  showAll: boolean;
  totalNotifications: number;
  onMarkAllAsRead: () => void;
  onToggleShowAll: () => void;
}

const NotificationHeader: React.FC<NotificationHeaderProps> = ({
  unreadCount,
  urgentCount,
  showAll,
  totalNotifications,
  onMarkAllAsRead,
  onToggleShowAll
}) => {
  return (
    <CardHeader className="pb-4 bg-gradient-to-r from-viver-yellow/5 to-orange-50/50 rounded-t-lg">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-viver-yellow/20 to-viver-yellow/40 flex items-center justify-center">
              <Bell className="h-6 w-6 text-viver-yellow" />
            </div>
            {unreadCount > 0 && (
              <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                <span className="text-xs font-bold text-white">{unreadCount}</span>
              </div>
            )}
          </div>
          
          <div className="flex-1">
            <CardTitle className="text-2xl font-bold text-gray-900 mb-1">
              Central de Notificações
            </CardTitle>
            <p className="text-sm text-gray-600">
              Mantenha-se atualizado com as atividades importantes
            </p>
          </div>

          <div className="flex items-center gap-2">
            {unreadCount > 0 && (
              <Badge className="bg-red-100 text-red-800 border-red-200 px-3 py-1">
                <span className="text-xs font-semibold">
                  {unreadCount} nova{unreadCount !== 1 ? 's' : ''}
                </span>
              </Badge>
            )}
            {urgentCount > 0 && (
              <Badge className="bg-orange-100 text-orange-800 border-orange-200 px-3 py-1">
                <AlertTriangle className="h-3 w-3 mr-1" />
                <span className="text-xs font-semibold">
                  {urgentCount} urgente{urgentCount !== 1 ? 's' : ''}
                </span>
              </Badge>
            )}
          </div>
        </div>
      </div>
      
      <div className="flex justify-end gap-2 mt-4">
        {unreadCount > 0 && (
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onMarkAllAsRead} 
            className="text-sm hover:bg-white/80 transition-colors"
          >
            <Eye className="h-4 w-4 mr-2" />
            Marcar todas como lidas
          </Button>
        )}
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={onToggleShowAll}
          className="text-sm hover:bg-white/80 transition-colors"
        >
          {showAll ? 'Mostrar menos' : `Ver todas (${totalNotifications})`}
        </Button>
      </div>
    </CardHeader>
  );
};

export default NotificationHeader;
