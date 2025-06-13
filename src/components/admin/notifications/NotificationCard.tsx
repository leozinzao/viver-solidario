
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  AlertTriangle, 
  Info, 
  CheckCircle, 
  X,
  EyeOff,
  ExternalLink,
  Clock
} from 'lucide-react';
import { AdminNotification } from '@/types/notifications';

interface NotificationCardProps {
  notification: AdminNotification;
  onMarkAsRead: (id: string) => void;
  onRemove: (id: string) => void;
}

const NotificationCard: React.FC<NotificationCardProps> = ({
  notification,
  onMarkAsRead,
  onRemove
}) => {
  const getIcon = (type: AdminNotification['type']) => {
    switch (type) {
      case 'warning':
        return <AlertTriangle className="h-5 w-5 text-orange-600" />;
      case 'error':
        return <AlertTriangle className="h-5 w-5 text-red-600" />;
      case 'success':
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      default:
        return <Info className="h-5 w-5 text-blue-600" />;
    }
  };

  const getTimeString = (timestamp: Date) => {
    const now = new Date();
    const diff = now.getTime() - timestamp.getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    
    if (minutes < 60) {
      return `${minutes} min atrás`;
    } else if (hours < 24) {
      return `${hours}h atrás`;
    } else {
      const days = Math.floor(hours / 24);
      return `${days}d atrás`;
    }
  };

  return (
    <div
      className={`p-6 transition-all duration-200 hover:bg-gray-50/50 ${
        !notification.read 
          ? 'bg-gradient-to-r from-blue-50/30 to-transparent border-l-4 border-l-blue-400' 
          : 'hover:bg-gray-50/30'
      } ${
        notification.actionRequired && !notification.read
          ? 'bg-gradient-to-r from-orange-50/50 to-transparent border-l-4 border-l-orange-400'
          : ''
      }`}
    >
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 mt-1">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
            notification.type === 'warning' ? 'bg-orange-100' :
            notification.type === 'error' ? 'bg-red-100' :
            notification.type === 'success' ? 'bg-green-100' :
            'bg-blue-100'
          }`}>
            {getIcon(notification.type)}
          </div>
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-3 mb-3">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <h4 className={`font-bold text-lg leading-tight ${
                  notification.read ? 'text-gray-600' : 'text-gray-900'
                }`}>
                  {notification.title}
                </h4>
                {notification.actionRequired && !notification.read && (
                  <Badge className="bg-orange-100 text-orange-800 border-orange-200 text-xs px-2 py-1">
                    <AlertTriangle className="h-3 w-3 mr-1" />
                    Ação necessária
                  </Badge>
                )}
              </div>
              
              <p className={`text-sm leading-relaxed mb-3 ${
                notification.read ? 'text-gray-500' : 'text-gray-700'
              }`}>
                {notification.message}
              </p>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs text-gray-400">
                  <Clock className="h-3 w-3" />
                  <span>{getTimeString(notification.timestamp)}</span>
                </div>
                
                {notification.link && (
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-xs h-7 px-3 text-viver-yellow hover:bg-viver-yellow/10 hover:text-viver-yellow"
                  >
                    <ExternalLink className="h-3 w-3 mr-1" />
                    Ver detalhes
                  </Button>
                )}
              </div>
            </div>
            
            <div className="flex gap-1 flex-shrink-0">
              {!notification.read && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onMarkAsRead(notification.id)}
                  className="h-8 w-8 p-0 hover:bg-blue-100 text-blue-600"
                  title="Marcar como lida"
                >
                  <EyeOff className="h-4 w-4" />
                </Button>
              )}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onRemove(notification.id)}
                className="h-8 w-8 p-0 text-gray-400 hover:text-red-500 hover:bg-red-50"
                title="Remover notificação"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationCard;
