import React, { useMemo, useState } from 'react';
import { useQuery } from 'react-query';
import { useHistory } from 'react-router';
import styled from 'styled-components';
import ArrowDownSquare from '../../../../assets/images/arrow-down-square.svg';
import { OrderStatsModel, OrderStatsType } from '../../../../models';
import { DashboardService } from '../../../../services/dashboard.service';
import { StyledDashboard } from '../../../../styles';
import { DashboardTable } from '../components';
import { dashboardStats, StatsBox } from '../components/stats-box';

const Wrapper = styled(StyledDashboard)``;

export const DashboardView: React.FC = () => {
  const history = useHistory();
  const [filterBy, setFilterBy] = useState<OrderStatsType>('transactions');
  const { data: statsData, isLoading: loadingStats } = useQuery(['order-stats'], DashboardService.fetchOrderStats);
  const { data: ordersData, isLoading } = useQuery(['orders', filterBy], () =>
    DashboardService.fetchAllOrders(filterBy)
  );

  const orders = useMemo(() => ordersData?.payload ?? [], [ordersData]);
  const pendings: OrderStatsModel = useMemo(
    () => ({
      name: 'Pending Orders',
      id: 'pending',
      value: statsData?.payload?.pending ?? 0,
      color: 'rgba(255, 208, 57, 0.1)',
      icon: ArrowDownSquare,
    }),
    [statsData]
  );
  const stats = useMemo(() => {
    if (statsData && statsData.payload) {
      const actualData = Object.keys(statsData.payload)
        .filter((data) => data !== 'pending')
        .map((key) => {
          const data = dashboardStats.find(({ id }) => id === key) as OrderStatsModel;

          return {
            ...data,
            value: statsData.payload ? statsData.payload[key as OrderStatsType] : 0,
          };
        });

      return actualData.sort((a, b) => a.id.localeCompare(b.id));
    } else {
      return dashboardStats;
    }
  }, [statsData]);

  return (
    <Wrapper>
      <div className="stats-box">
        <StatsBox {...pendings} handleClick={() => history.push('/orders/all')} isLoading={loadingStats} />
        {stats.map((props) => (
          <StatsBox key={props.id} handleClick={() => setFilterBy(props.id)} {...props} isLoading={loadingStats} />
        ))}
      </div>

      <div className="table-wrapper">
        <DashboardTable orders={orders} isLoading={isLoading} />
      </div>
    </Wrapper>
  );
};
