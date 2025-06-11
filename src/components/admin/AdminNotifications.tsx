
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Bell, 
  AlertTriangle, 
  Info, 
  CheckCircle, 
  X,
  Eye,
  EyeOff
} from 'lucide-react';

interface AdminNotification {
  id: string;
  type: 'info' | 'warning' | 'success' | 'error';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  actionRequired?: boolean;
  link?: string;
}

const AdminNotifications: React.FC = () => {
  const [notifications, setNotifications] = useState<AdminNotification[]>([
    {
      id: '1',
      type: 'warning',
      title: 'Doações Pendentes',
      message: '3 doações aguardando aprovação há mais de 24 horas',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      read: false,
      actionRequired: true,
      link: '/admin/doacoes'
    },
    {
      id: '2',
      type: 'info',
      title: 'Novo Voluntário',
      message: 'Maria Silva se cadastrou como voluntária',
      timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000),
      read: false,
      actionRequired: false
    },
    {
      id: '3',
      type: 'success',
      title: 'Meta Atingida',
      message: 'Meta de doações do mês foi atingida!',
      timestamp: new Date(Date.now() - 30 * 60 * 1000),
      read: true,
      actionRequired: false
    }
  ]);

  const [showAll, setShowAll] = useState(false);

  const unreadCount = notifications.filter(n => !n.read).length;
  const urgentCount = notifications.filter(n => !n.read && n.actionRequired).length;

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notif => ({ ...notif, read: true }))
    );
  };

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  const getIcon = (type: AdminNotification['type']) => {
    switch (type) {
      case 'warning':
        return <AlertTriangle className="h-4 w-4 text-orange-500" />;
      case 'error':
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case 'success':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      default:
        return <Info className="h-4 w-4 text-blue-500" />;
    }
  };

  const getTimeString = (timestamp: Date) => {
    const now = new Date();
    const diff = now.getTime() - timestamp.getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    
    if (minutes < 60) {
      return `${minutes}m atrás`;
    } else if (hours < 24) {
      return `${hours}h atrás`;
    } else {
      return timestamp.toLocaleDateString();
    }
  };

  const displayedNotifications = showAll ? notifications : notifications.slice(0, 3);

  return (
    <Card className="mb-6">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bell className="h-5 w-5 text-viver-yellow" />
            <CardTitle className="text-lg">Notificações</CardTitle>
            {unreadCount > 0 && (
              <Badge variant="destructive" className="bg-red-500">
                {unreadCount}
              </Badge>
            )}
            {urgentCount > 0 && (
              <Badge variant="outline" className="border-orange-500 text-orange-700">
                {urgentCount} urgente(s)
              </Badge>
            )}
          </div>
          
          <div className="flex gap-2">
            {unreadCount > 0 && (
              <Button variant="ghost" size="sm" onClick={markAllAsRead}>
                <Eye className="h-4 w-4 mr-1" />
                Marcar todas como lidas
              </Button>
            )}
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setShowAll(!showAll)}
            >
              {showAll ? 'Mostrar menos' : `Ver todas (${notifications.length})`}
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-3">
        {displayedNotifications.map((notification) => (
          <div
            key={notification.id}
            className={`p-3 rounded-lg border transition-all ${
              notification.read 
                ? 'bg-gray-50 border-gray-200' 
                : notification.actionRequired
                ? 'bg-orange-50 border-orange-200'
                : 'bg-blue-50 border-blue-200'
            }`}
          >
            <div className="flex items-start gap-3">
              <div className="mt-0.5">
                {getIcon(notification.type)}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <h4 className={`font-medium text-sm ${
                      notification.read ? 'text-gray-700' : 'text-gray-900'
                    }`}>
                      {notification.title}
                      {notification.actionRequired && (
                        <Badge variant="outline" className="ml-2 text-xs border-orange-500 text-orange-700">
                          Ação necessária
                        </Badge>
                      )}
                    </h4>
                    <p className={`text-sm mt-1 ${
                      notification.read ? 'text-gray-500' : 'text-gray-700'
                    }`}>
                      {notification.message}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      {getTimeString(notification.timestamp)}
                    </p>
                  </div>
                  
                  <div className="flex gap-1">
                    {!notification.read && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => markAsRead(notification.id)}
                        className="h-6 w-6 p-0"
                      >
                        <EyeOff className="h-3 w-3" />
                      </Button>
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeNotification(notification.id)}
                      className="h-6 w-6 p-0 text-gray-400 hover:text-red-500"
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
        
        {notifications.length === 0 && (
          <div className="text-center py-6 text-gray-500">
            <Bell className="h-8 w-8 mx-auto mb-2 text-gray-300" />
            <p>Nenhuma notificação no momento</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AdminNotifications;
