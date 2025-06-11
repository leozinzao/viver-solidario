
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
  EyeOff,
  ExternalLink
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
      title: 'Doações Pendentes de Aprovação',
      message: '3 doações estão aguardando aprovação há mais de 24 horas',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      read: false,
      actionRequired: true,
      link: '/admin/doacoes'
    },
    {
      id: '2',
      type: 'info',
      title: 'Novo Voluntário Cadastrado',
      message: 'Maria Silva se cadastrou como voluntária na plataforma',
      timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000),
      read: false,
      actionRequired: false
    },
    {
      id: '3',
      type: 'success',
      title: 'Meta Mensal Atingida',
      message: 'Parabéns! Meta de doações do mês foi atingida com sucesso',
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
        return <AlertTriangle className="h-5 w-5 text-orange-500" />;
      case 'error':
        return <AlertTriangle className="h-5 w-5 text-red-500" />;
      case 'success':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      default:
        return <Info className="h-5 w-5 text-blue-500" />;
    }
  };

  const getTimeString = (timestamp: Date) => {
    const now = new Date();
    const diff = now.getTime() - timestamp.getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    
    if (minutes < 60) {
      return `${minutes} minutos atrás`;
    } else if (hours < 24) {
      return `${hours} horas atrás`;
    } else {
      const days = Math.floor(hours / 24);
      return `${days} dias atrás`;
    }
  };

  const displayedNotifications = showAll ? notifications : notifications.slice(0, 3);

  return (
    <Card className="mb-6">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Bell className="h-6 w-6 text-viver-yellow" />
            <div>
              <CardTitle className="text-xl">Central de Notificações</CardTitle>
              <p className="text-sm text-gray-600 mt-1">Acompanhe atividades importantes</p>
            </div>
            {unreadCount > 0 && (
              <Badge variant="destructive" className="bg-red-500 text-white">
                {unreadCount} nova{unreadCount !== 1 ? 's' : ''}
              </Badge>
            )}
            {urgentCount > 0 && (
              <Badge variant="outline" className="border-orange-500 text-orange-700 bg-orange-50">
                {urgentCount} urgente{urgentCount !== 1 ? 's' : ''}
              </Badge>
            )}
          </div>
          
          <div className="flex gap-2">
            {unreadCount > 0 && (
              <Button variant="ghost" size="sm" onClick={markAllAsRead} className="text-sm">
                <Eye className="h-4 w-4 mr-2" />
                Marcar todas como lidas
              </Button>
            )}
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setShowAll(!showAll)}
              className="text-sm"
            >
              {showAll ? 'Mostrar menos' : `Ver todas (${notifications.length})`}
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {displayedNotifications.map((notification) => (
          <div
            key={notification.id}
            className={`p-4 rounded-lg border-l-4 transition-all ${
              notification.read 
                ? 'bg-gray-50 border-l-gray-300' 
                : notification.actionRequired
                ? 'bg-orange-50 border-l-orange-400'
                : 'bg-blue-50 border-l-blue-400'
            }`}
          >
            <div className="flex items-start gap-4">
              <div className="mt-1">
                {getIcon(notification.type)}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className={`font-semibold ${
                        notification.read ? 'text-gray-700' : 'text-gray-900'
                      }`}>
                        {notification.title}
                      </h4>
                      {notification.actionRequired && (
                        <Badge variant="outline" className="text-xs border-orange-500 text-orange-700 bg-orange-100">
                          Ação necessária
                        </Badge>
                      )}
                    </div>
                    <p className={`text-sm mb-2 leading-relaxed ${
                      notification.read ? 'text-gray-500' : 'text-gray-700'
                    }`}>
                      {notification.message}
                    </p>
                    <div className="flex items-center justify-between">
                      <p className="text-xs text-gray-400">
                        {getTimeString(notification.timestamp)}
                      </p>
                      {notification.link && (
                        <Button variant="ghost" size="sm" className="text-xs h-6 px-2">
                          <ExternalLink className="h-3 w-3 mr-1" />
                          Ver detalhes
                        </Button>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex gap-1">
                    {!notification.read && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => markAsRead(notification.id)}
                        className="h-8 w-8 p-0"
                        title="Marcar como lida"
                      >
                        <EyeOff className="h-4 w-4" />
                      </Button>
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeNotification(notification.id)}
                      className="h-8 w-8 p-0 text-gray-400 hover:text-red-500"
                      title="Remover notificação"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
        
        {notifications.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <Bell className="h-12 w-12 mx-auto mb-3 text-gray-300" />
            <h3 className="font-medium text-gray-700 mb-1">Nenhuma notificação</h3>
            <p className="text-sm">Você está em dia com todas as atividades!</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AdminNotifications;
