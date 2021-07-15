import React from 'react';
import { MdNotifications } from 'react-icons/md';
import { Link, Redirect } from 'react-router-dom';
import styled from 'styled-components';
import { useAuthContext } from '../../../contexts/AuthContext';

const Wrapper = styled.div`
  margin-bottom: 30px;
  background-color: white;
  padding: 1em 1.5em;
  padding-right: 2.5em;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .user__area {
    display: flex;
    align-items: center;
    gap: 10px;

    .notification-icon {
      color: #939bbd;
      height: 25px;
      width: 25px;
    }
  }
`;

const UserIcon = styled(Link)`
  background: #f0f2f7;
  border: 1px solid #f0f2f7;
  height: 40px;
  width: 40px;
  border-radius: 100%;
`;

interface Props {
  barComponent?: React.ReactNode;
}

export const HeaderBar: React.FC<Props> = () => {
  const { account } = useAuthContext()!;

  if (!account) {
    return <Redirect to="/" />;
  }

  return (
    <Wrapper className="d-flex justify-content-between">
      <div className="bold-8">{account.userName}</div>
      <div className="user__area">
        <MdNotifications className="notification-icon" />
        <UserIcon to="/app/profile" />
        <span className="bold-6">Hi {account.fullName.split(' ')[0]}!</span>
      </div>
    </Wrapper>
  );
};
