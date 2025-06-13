
import { useState } from 'react';
import { AdminNotification } from '@/types/notifications';

export const useNotifications = () => {
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

  const displayedNotifications = showAll ? notifications : notifications.slice(0, 3);

  return {
    notifications,
    displayedNotifications,
    showAll,
    setShowAll,
    unreadCount,
    urgentCount,
    markAsRead,
    markAllAsRead,
    removeNotification
  };
};
