import React from 'react';
import styled from 'styled-components';
import ArrowDownSquare from '../../../../assets/images/arrow-down-square.svg';
import ArrowUpSquare from '../../../../assets/images/arrow-up-square.svg';
import OrdersSquare from '../../../../assets/images/orders-icon.svg';
import WalletIcon from '../../../../assets/images/wallet-icon.svg';

export const dashboardStats = [
  {
    name: 'Pending Orders',
    value: 6,
    color: 'rgba(255, 208, 57, 0.1)',
    icon: ArrowDownSquare,
  },
  {
    name: 'Fulfilled Orders',
    value: 60,
    color: 'rgba(14, 190, 125, 0.1)',
    icon: ArrowUpSquare,
  },
  {
    name: 'Rejected Orders',
    value: 3,
    icon: OrdersSquare,
    color: 'rgba(255, 71, 87, 0.1)',
  },
  {
    name: 'Total Transactions',
    icon: WalletIcon,
    value: 3,
    color: 'rgba(62, 115, 171, 0.1)',
  },
];

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  flex-wrap: nowrap;
  padding: 0em 1em;

  .content {
    display: flex;
    flex: 1;
    flex-direction: column;
    gap: 5px;

    .title {
      font-weight: 500;
    }

    .value {
      font-weight: 800;
      font-size: 2rem;
    }
  }
`;

const IconStyle = styled.div<{
  color: string;
}>`
  width: 3em;
  height: 3em;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  padding: 1em;
  background-color: ${({ color }) => color};
`;

export interface DashboardStatsProps {
  name: string;
  value: number;
  color: string;
  icon: string;
}

export const StatsBox: React.FC<DashboardStatsProps> = ({ name, value, color, icon }) => {
  return (
    <Wrapper>
      <IconStyle color={color}>
        <img src={icon} alt="" />
      </IconStyle>

      <div className="content">
        <div className="title">{name}</div>
        <div className="value">{value}</div>
      </div>
    </Wrapper>
  );
};
