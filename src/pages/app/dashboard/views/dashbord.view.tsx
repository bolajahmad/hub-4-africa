import React from 'react';
import { useQuery } from 'react-query';
import styled from 'styled-components';
import { PrimaryTable } from '../../../../components';
import { DashboardService } from '../../../../services/dashboard.service';
import { StyledDashboard } from '../../../../styles';
import { useWindowDimensions } from '../../../../utils';
import { dashboardStats, StatsBox } from '../components/stats-box';

const Wrapper = styled(StyledDashboard)``;

export const DashboardView: React.FC = () => {
  const { width } = useWindowDimensions();

  const { data } = useQuery(['orders'], DashboardService.fetchAllOrders);

  console.log({ data });

  return (
    <Wrapper width={width}>
      <div className="stats-box">
        {dashboardStats.map(({ name, value, color, icon }, i) => (
          <StatsBox key={i + name} name={name} icon={icon} value={value} color={color} />
        ))}
      </div>

      <div className="table-wrapper">
        <div className="bold-8">Shipment History</div>

        <PrimaryTable collectionName="Shipment history" data={[]} columns={[]} />
      </div>
    </Wrapper>
  );
};
