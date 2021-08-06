import { AnimatePresence } from 'framer-motion';
import React from 'react';
import styled from 'styled-components';
import { useNotificationContext } from '../../../contexts/NotificationContext';
import { ToastNotification } from './toast-notification';

const Container = styled.div`
  position: fixed;
  bottom: 0;
  top: 0;
  z-index: 1081;
  width: 100vw;
  padding: 10px;
  pointer-events: none;

  > * + * {
    margin-top: 20px;
  }
`;

export const ToastNotificationArea: React.FC = () => {
  const { notifications } = useNotificationContext()!;

  return (
    <Container>
      <AnimatePresence>
        {notifications &&
          notifications.map((notification) => <ToastNotification key={notification.id} {...notification} />)}
      </AnimatePresence>
    </Container>
  );
};
