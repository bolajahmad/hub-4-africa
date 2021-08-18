/* eslint-disable no-unused-vars */
import { motion, MotionProps } from 'framer-motion';
import { capitalize } from 'lodash';
import React from 'react';
import { FiCheck, FiInfo, FiTriangle, FiX } from 'react-icons/fi';
import styled from 'styled-components';
import { useNotificationContext } from '../../../contexts/NotificationContext';
import { Notification, NotificationType } from '../../../utils';

enum Colors {
  Success = '#18A956',
  Info = '#1A9BFC',
  Error = '#FD6D6B',
  Warning = '#FEBF2C',
}

const Container = styled(motion.div)`
  width: 100%;
  box-shadow: 0px 3px 6px #00000029;
  border-radius: 8px;
  background-color: white;
  position: relative;
  pointer-events: auto;

  .toast__indicator {
    background: red;
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 8px;
  }

  .toast__icon {
    color: white;
    width: 30px;
    height: 30px;
  }

  .toast__dismiss-button {
    border: none;
    outline: none;
    height: 25px;
    width: 25px;
    color: #888888;
    background-color: white;
    transition: background-color 400ms;

    :hover {
      background-color: rgba(0, 0, 0, 0.2);
      color: black;
    }
  }

  .toast__header {
    font-size: 14px;
  }

  .toast__message {
    font-size: 12px;
    color: #888888;
  }

  .success {
    background: ${Colors.Success};
  }

  .info {
    background: ${Colors.Info};
  }

  .error {
    background: ${Colors.Error};
  }

  .warning {
    background: ${Colors.Warning};
  }
`;

const NOTIFICATION_TIMEOUT = 3 * 1000; // 5 Seconds

export const ToastNotification: React.FC<Notification> = ({
  id,
  type,
  message,
  sticky,
}) => {
  const { removeNotification } = useNotificationContext()!;
  const dismissNotification = React.useCallback(() => {
    removeNotification(id);
  }, [id]);

  const timeoutDuration =
    type === NotificationType.ERROR
      ? NOTIFICATION_TIMEOUT * 2
      : NOTIFICATION_TIMEOUT;

  const state = React.useMemo(() => {
    switch (type) {
      case NotificationType.SUCCESS:
        return 'success';
      case NotificationType.INFO:
        return 'info';
      case NotificationType.ERROR:
        return 'error';
      case NotificationType.WARNING:
        return 'warning';
    }
  }, [type]);

  const Icon = React.useMemo(() => {
    switch (type) {
      case NotificationType.SUCCESS:
        return FiCheck;
      case NotificationType.INFO:
        return FiInfo;
      case NotificationType.ERROR:
        return FiX;
      case NotificationType.WARNING:
        return FiTriangle;
      default:
        return FiCheck;
    }
  }, [type]);

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      if (!sticky) {
        dismissNotification();
      }
    }, timeoutDuration);

    return () => {
      clearTimeout(timeout);
    };
  }, [dismissNotification, timeoutDuration, sticky]);

  const animationProps = React.useMemo(
    () =>
      ({
        initial: { x: 200, opacity: 0 },
        animate: { x: 0, opacity: 1 },
        exit: { opacity: 0 },
      } as MotionProps),
    []
  );

  return (
    <Container
      className="overflow-hidden flex items-center"
      {...animationProps}
    >
      <div className={`toast__indicator flex-grow-0 flex-shrink-0 ${state}`} />
      <div className="flex justify-between items-center px-3 py-4 flex-grow">
        <div className="flex">
          <div
            className={`toast__icon centered rounded-full flex-shrink-0 ${state}`}
          >
            <Icon size={16} strokeWidth={3} />
          </div>
          <div className="toast__content ml-2">
            <p className="toast__header font-bolder m-0">{capitalize(state)}</p>
            {message.map((msg, i) => (
              <span className="toast__message" key={i}>
                {msg}
              </span>
            ))}
          </div>
        </div>
        <button
          className="toast__dismiss-button flex-shrink-0 rounded-full p-0 centered"
          onClick={dismissNotification}
        >
          <FiX size={18} strokeWidth={2} />
        </button>
      </div>
    </Container>
  );
};
