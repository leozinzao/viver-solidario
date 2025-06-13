
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
  ExternalLink,
  Clock
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

  const displayedNotifications = showAll ? notifications : notifications.slice(0, 3);

  return (
    <Card className="mb-8 shadow-lg border-0 bg-gradient-to-br from-white to-gray-50/30">
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
        
        {/* Action Buttons */}
        <div className="flex justify-end gap-2 mt-4">
          {unreadCount > 0 && (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={markAllAsRead} 
              className="text-sm hover:bg-white/80 transition-colors"
            >
              <Eye className="h-4 w-4 mr-2" />
              Marcar todas como lidas
            </Button>
          )}
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setShowAll(!showAll)}
            className="text-sm hover:bg-white/80 transition-colors"
          >
            {showAll ? 'Mostrar menos' : `Ver todas (${notifications.length})`}
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="p-0">
        {displayedNotifications.length > 0 ? (
          <div className="divide-y divide-gray-100">
            {displayedNotifications.map((notification, index) => (
              <div
                key={notification.id}
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
                            onClick={() => markAsRead(notification.id)}
                            className="h-8 w-8 p-0 hover:bg-blue-100 text-blue-600"
                            title="Marcar como lida"
                          >
                            <EyeOff className="h-4 w-4" />
                          </Button>
                        )}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeNotification(notification.id)}
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
            ))}
          </div>
        ) : (
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
        )}
      </CardContent>
    </Card>
  );
};

export default AdminNotifications;
