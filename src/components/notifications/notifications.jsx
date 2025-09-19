import { useState } from "react";
import { 
  Bell, 
  AlertTriangle, 
  Calendar, 
  Target, 
  TrendingUp, 
  CreditCard, 
  PiggyBank,
  CheckCircle,
  Clock,
  X
} from "lucide-react";

const mockNotifications = [
  {
    id: '1',
    type: 'alert',
    title: 'Budget Alert',
    message: "You've spent 85% of your monthly food budget",
    time: '2 minutes ago',
    isRead: false,
    icon: AlertTriangle,
    category: 'Budget'
  },
  {
    id: '2',
    type: 'reminder',
    title: 'Bill Reminder',
    message: 'Electricity bill payment due tomorrow ($89.50)',
    time: '1 hour ago',
    isRead: false,
    icon: Calendar,
    category: 'Bills'
  },
  {
    id: '3',
    type: 'achievement',
    title: 'Savings Goal Reached!',
    message: "Congratulations! You've reached your vacation savings goal",
    time: '3 hours ago',
    isRead: true,
    icon: Target,
    category: 'Goals'
  },
  {
    id: '4',
    type: 'info',
    title: 'Weekly Report Ready',
    message: 'Your spending decreased by 12% this week',
    time: '1 day ago',
    isRead: true,
    icon: TrendingUp,
    category: 'Reports'
  },
  {
    id: '5',
    type: 'reminder',
    title: 'Credit Card Payment',
    message: 'Card ending in 4567 payment due in 3 days ($432.18)',
    time: '2 days ago',
    isRead: false,
    icon: CreditCard,
    category: 'Bills'
  },
  {
    id: '6',
    type: 'achievement',
    title: 'Spending Streak',
    message: "You've stayed under budget for 7 consecutive days!",
    time: '3 days ago',
    isRead: true,
    icon: PiggyBank,
    category: 'Achievements'
  }
];

const Notifications = () => {
  const [notifications, setNotifications] = useState(mockNotifications);
  const [filter, setFilter] = useState('all');

  const markAsRead = (id) => {
    setNotifications(prev =>
      prev.map(notification =>
        notification.id === id ? { ...notification, isRead: true } : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(notification => ({ ...notification, isRead: true })));
  };

  const deleteNotification = (id) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  };

  const filteredNotifications =
    filter === 'unread' ? notifications.filter(n => !n.isRead) : notifications;

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const getNotificationStyles = (type) => {
    const baseStyles =
      "relative overflow-hidden rounded-xl border bg-white shadow transition-all duration-300 hover:scale-[1.01] hover:shadow-lg";

    switch (type) {
      case 'alert':
        return `${baseStyles} border-l-4 border-yellow-500 bg-yellow-50`;
      case 'reminder':
        return `${baseStyles} border-l-4 border-blue-500 bg-blue-50`;
      case 'achievement':
        return `${baseStyles} border-l-4 border-green-500 bg-green-50`;
      case 'info':
        return `${baseStyles} border-l-4 border-indigo-500 bg-indigo-50`;
      default:
        return baseStyles;
    }
  };

  const getIconColor = (type) => {
    switch (type) {
      case 'alert':
        return 'text-yellow-600';
      case 'reminder':
        return 'text-blue-600';
      case 'achievement':
        return 'text-green-600';
      case 'info':
        return 'text-indigo-600';
      default:
        return 'text-gray-500';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Bell className="h-8 w-8 text-indigo-600" />
              {unreadCount > 0 && (
                <span className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center rounded-full bg-yellow-500 text-white text-xs font-bold">
                  {unreadCount}
                </span>
              )}
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Notifications</h1>
              <p className="text-gray-500">Stay updated with your finances</p>
            </div>
          </div>

          {unreadCount > 0 && (
            <button
              onClick={markAllAsRead}
              className="flex items-center gap-2 px-3 py-2 border rounded-lg text-sm font-medium text-gray-600 hover:bg-indigo-600 hover:text-white transition"
            >
              <CheckCircle className="h-4 w-4" />
              Mark all as read
            </button>
          )}
        </div>

        {/* Filter Buttons */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1 rounded-md text-sm font-medium ${
              filter === 'all'
                ? 'bg-indigo-600 text-white'
                : 'border border-gray-300 text-gray-600 hover:bg-gray-100'
            }`}
          >
            All ({notifications.length})
          </button>
          <button
            onClick={() => setFilter('unread')}
            className={`px-3 py-1 rounded-md text-sm font-medium ${
              filter === 'unread'
                ? 'bg-indigo-600 text-white'
                : 'border border-gray-300 text-gray-600 hover:bg-gray-100'
            }`}
          >
            Unread ({unreadCount})
          </button>
        </div>

        {/* Notifications List */}
        <div className="space-y-4">
          {filteredNotifications.length === 0 ? (
            <div className="p-12 text-center rounded-xl border bg-white shadow">
              <Bell className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <h3 className="text-lg font-medium text-gray-600 mb-2">
                {filter === 'unread' ? 'No unread notifications' : 'No notifications'}
              </h3>
              <p className="text-sm text-gray-500">
                {filter === 'unread'
                  ? 'All caught up! Check back later for updates.'
                  : "You'll see your expense notifications here."}
              </p>
            </div>
          ) : (
            filteredNotifications.map((notification) => {
              const IconComponent = notification.icon;
              return (
                <div
                  key={notification.id}
                  className={getNotificationStyles(notification.type)}
                >
                  <div className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3 flex-1">
                        <div
                          className={`p-2 rounded-full bg-white shadow ${getIconColor(
                            notification.type
                          )}`}
                        >
                          <IconComponent className="h-5 w-5" />
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h3
                              className={`font-semibold text-sm ${
                                ['achievement', 'alert', 'reminder'].includes(notification.type)
                                 ? 'text-green-700 italic'
                                  : 'text-gray-800'
                                   }`}
>
                              {notification.title}
                            </h3>
                            {!notification.isRead && (
                              <div className="w-2 h-2 rounded-full bg-indigo-600 animate-pulse"></div>
                            )}
                          </div>

                          <p className="text-sm text-gray-600 mb-2 leading-relaxed">
                            {notification.message}
                          </p>

                          <div className="flex items-center gap-3 text-xs text-gray-500">
                            <div className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {notification.time}
                            </div>
                            <span className="px-2 py-0.5 rounded-full bg-gray-200 text-gray-700 text-xs">
                              {notification.category}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-1 ml-2">
                        {!notification.isRead && (
                          <button
                            onClick={() => markAsRead(notification.id)}
                            className="h-8 w-8 flex items-center justify-center rounded-full hover:bg-indigo-100 text-indigo-600"
                          >
                            <CheckCircle className="h-4 w-4" />
                          </button>
                        )}
                        <button
                          onClick={() => deleteNotification(notification.id)}
                          className="h-8 w-8 flex items-center justify-center rounded-full hover:bg-red-100 text-red-600"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Gradient overlay for unread notifications */}
                  {!notification.isRead && (
                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-50 to-transparent pointer-events-none"></div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Quick Stats Footer */}
        {notifications.length > 0 && (
          <div className="mt-8 p-4 rounded-xl border bg-white shadow">
            <div className="flex items-center justify-center gap-6 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <span>{notifications.filter(n => n.type === 'alert').length} Alerts</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                <span>{notifications.filter(n => n.type === 'reminder').length} Reminders</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span>{notifications.filter(n => n.type === 'achievement').length} Achievements</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Notifications;