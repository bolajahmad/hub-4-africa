import React, { Dispatch, SetStateAction } from 'react';
import { MdNotifications } from 'react-icons/md';
import { RiMenu4Line } from 'react-icons/ri';
import { Redirect } from 'react-router-dom';
import Logo from '../../../assets/images/logo-mini.svg';
import { useAuthContext } from '../../../contexts/AuthContext';
import { TextButton } from '../../buttons';
import { HeaderStyleWrapper } from './styles';

interface Props {
  sidebarOpen?: boolean;
  setSidebarOpen?: Dispatch<SetStateAction<boolean>>;
  barComponent?: React.ReactNode;
}

export const HeaderBar: React.FC<Props> = ({ sidebarOpen, setSidebarOpen }) => {
  const { account } = useAuthContext()!;

  if (!account) {
    return <Redirect to="/" />;
  }

  return (
    <HeaderStyleWrapper sidebarOpen={sidebarOpen} className="d-flex justify-content-between">
      <div className="header-title">
        <span className="logo">
          <img src={Logo} alt="logo" />
        </span>
        <span>{account.warehouse.state} Warehouse</span>
      </div>
      <div className="user__area">
        <MdNotifications className="notification-icon" />
        <span className="bold-6">Hi {account.fullName.split(' ')[0]}!</span>
        <TextButton className="menu" onClick={() => setSidebarOpen?.((prev) => !prev)}>
          <RiMenu4Line size="18" />
        </TextButton>
      </div>
    </HeaderStyleWrapper>
  );
};
