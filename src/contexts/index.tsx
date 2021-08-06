import * as React from 'react';
import AuthContext from './AuthContext';
import NotificationContext from './NotificationContext';

export interface ApplicationContextProps {
  children: React.ReactNode;
}

const ApplicationContext: React.FC<ApplicationContextProps> = ({ children }) => {
  return (
    <AuthContext>
      <NotificationContext>{children}</NotificationContext>
    </AuthContext>
  );
};

export default ApplicationContext;
