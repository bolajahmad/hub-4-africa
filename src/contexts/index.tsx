import * as React from 'react';
import AuthContext from './AuthContext';

export interface ApplicationContextProps {
  children: React.ReactNode;
}

const ApplicationContext: React.FC<ApplicationContextProps> = ({
  children,
}) => {
  return <AuthContext>{children}</AuthContext>;
};

export default ApplicationContext;
