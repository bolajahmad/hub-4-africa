import React, { useMemo, useState } from 'react';
import { useQuery } from 'react-query';
import { useHistory } from 'react-router';
import styled from 'styled-components';
import ArrowDownSquare from '../../../../assets/images/arrow-down-square.svg';
import { OrdersModel, OrderStatsModel, OrderStatsType } from '../../../../models';
import { DashboardService } from '../../../../services/dashboard.service';
import { StyledDashboard } from '../../../../styles';
import { DashboardTable } from '../components';
import { dashboardStats, StatsBox } from '../components/stats-box';

const Wrapper = styled(StyledDashboard)``;

export const DashboardView: React.FC = () => {
  const history = useHistory();
  const [filterBy, setFilterBy] = useState<OrderStatsType>('transactions');
  const { data: statsData, isLoading: loadingStats } = useQuery(['order-stats'], DashboardService.fetchOrderStats, {
    enabled: filterBy === 'transactions',
  });
  const { data: completedOrders, isLoading: loadingCompleted } = useQuery(
    ['completed-orders'],
    () => DashboardService.allCompletedOrders(),
    {
      enabled: filterBy === 'fulfilled',
    }
  );
  const { data: rejectedOrders, isLoading: loadingrejected } = useQuery(
    ['rejected-orders'],
    () => DashboardService.allRejectedOrders(),
    {
      enabled: filterBy === 'rejected',
    }
  );
  const { data: ordersData, isLoading: loadingAllOrders } = useQuery(['orders'], DashboardService.fetchAllOrders);

  const { orders, isLoading } = useMemo(() => {
    switch (filterBy) {
    case 'awaitingShipment':
      const orders = (ordersData?.payload ?? []).filter(
        ({ paymentStatus, orderStatus }) => paymentStatus > 0 && orderStatus === 2
      );
      return { orders, isLoading: false };
    case 'rejected':
      return { orders: (rejectedOrders?.payload ?? []) as OrdersModel[], isLoading: loadingrejected };
    case 'fulfilled':
      return { orders: (completedOrders?.payload ?? []) as OrdersModel[], isLoading: loadingCompleted };
    default:
      return { orders: (ordersData?.payload ?? []) as OrdersModel[], isLoading: loadingAllOrders };
    }
  }, [ordersData, filterBy]);
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

      return actualData;
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
