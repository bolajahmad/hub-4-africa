import React, { ReactNode, useState } from 'react';
import { Notification, NotificationContent, NotificationType } from '../utils/constants';

interface ContextInterface {
  notifications: Notification[];
  addNotification: (type: NotificationType, message: NotificationContent, sticky?: boolean) => void;
  removeNotification: (id: number) => void;
}

interface NotificationContextInterface {
  children: ReactNode;
}

const Context = React.createContext<ContextInterface | null>(null);

const NotificationContext: React.FC<NotificationContextInterface> = ({ children }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const addNotification = React.useCallback(
    (type: NotificationType, message: NotificationContent, sticky?: boolean) => {
      const notif = new Notification(type, message, sticky);
      notif.id = notifications.length;
      setNotifications((notifications) => [...notifications, notif]);
    },
    [notifications],
  );

  const removeNotification = React.useCallback(
    (notificationId) => {
      const notificationIndex = notifications.findIndex((notification) => notification.id === notificationId);

      const copy = [...notifications];

      if (notificationIndex !== -1) {
        copy.splice(notificationIndex, 1);
        setNotifications(copy);
      }
    },
    [notifications],
  );

  return (
    <Context.Provider
      value={{
        notifications,
        addNotification,
        removeNotification,
      }}
    >
      {children}
    </Context.Provider>
  );
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const useNotificationContext = () => React.useContext(Context);

export { NotificationContext as default, useNotificationContext };
