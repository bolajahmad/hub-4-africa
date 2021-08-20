import React, { useMemo } from 'react';
import { useQuery } from 'react-query';
import styled from 'styled-components';
import { OrderStatsModel, OrderStatsType } from '../../../../models';
import { DashboardService } from '../../../../services/dashboard.service';
import { StyledDashboard } from '../../../../styles';
import { DashboardTable } from '../components';
import { dashboardStats, StatsBox } from '../components/stats-box';

const Wrapper = styled(StyledDashboard)``;

export const DashboardView: React.FC = () => {
  const { data: statsData, isLoading: loadingStats } = useQuery(['order-stats'], DashboardService.fetchOrderStats);
  const stats = useMemo(() => {
    if (statsData && statsData.payload) {
      const actualData = Object.keys(statsData.payload).map((key) => {
        const data = dashboardStats.find(({ id }) => id === key) as OrderStatsModel;

        return {
          ...data,
          value: statsData.payload ? statsData.payload[key as OrderStatsType] : 0,
        };
      });

      return actualData;
    } else {
      return dashboardStats;
    }
  }, [statsData]);

  return (
    <Wrapper>
      <div className="stats-box">
        {stats.map((props) => (
          <StatsBox key={props.id} {...props} isLoading={loadingStats} />
        ))}
      </div>

      <div className="table-wrapper">
        <DashboardTable />
      </div>
    </Wrapper>
  );
};
