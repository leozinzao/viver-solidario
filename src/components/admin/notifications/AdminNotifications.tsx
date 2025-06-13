
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { useNotifications } from '@/hooks/useNotifications';
import NotificationHeader from './NotificationHeader';
import NotificationCard from './NotificationCard';
import EmptyNotifications from './EmptyNotifications';

const AdminNotifications: React.FC = () => {
  const {
    notifications,
    displayedNotifications,
    showAll,
    setShowAll,
    unreadCount,
    urgentCount,
    markAsRead,
    markAllAsRead,
    removeNotification
  } = useNotifications();

  return (
    <Card className="mb-8 shadow-lg border-0 bg-gradient-to-br from-white to-gray-50/30">
      <NotificationHeader
        unreadCount={unreadCount}
        urgentCount={urgentCount}
        showAll={showAll}
        totalNotifications={notifications.length}
        onMarkAllAsRead={markAllAsRead}
        onToggleShowAll={() => setShowAll(!showAll)}
      />
      
      <CardContent className="p-0">
        {displayedNotifications.length > 0 ? (
          <div className="divide-y divide-gray-100">
            {displayedNotifications.map((notification) => (
              <NotificationCard
                key={notification.id}
                notification={notification}
                onMarkAsRead={markAsRead}
                onRemove={removeNotification}
              />
            ))}
          </div>
        ) : (
          <EmptyNotifications />
        )}
      </CardContent>
    </Card>
  );
};

export default AdminNotifications;
