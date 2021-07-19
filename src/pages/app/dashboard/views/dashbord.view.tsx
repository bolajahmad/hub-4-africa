import React, { useMemo } from 'react';
import { useQuery } from 'react-query';
import styled from 'styled-components';
import { PrimaryTable } from '../../../../components';
import { LoaderComponent } from '../../../../components/utils';
import {
  OrdersModel,
  OrderStatsModel,
  OrderStatsType,
} from '../../../../models';
import { DashboardService } from '../../../../services/dashboard.service';
import { StyledDashboard } from '../../../../styles';
import { useWindowDimensions } from '../../../../utils';
import { dashboardStats, StatsBox } from '../components/stats-box';

const Wrapper = styled(StyledDashboard)``;

export const DashboardView: React.FC = () => {
  const { width } = useWindowDimensions();

  const { data: statsData, isLoading: loadingStats } = useQuery(
    ['order-stats'],
    DashboardService.fetchOrderStats,
  );
  const { data: ordersData, isLoading } = useQuery(
    ['orders'],
    DashboardService.fetchAllOrders,
  );

  const stats = useMemo(() => {
    if (statsData && statsData.payload) {
      const actualData = Object.keys(statsData.payload).map((key) => {
        const data = dashboardStats.find(
          ({ id }) => id === key,
        ) as OrderStatsModel;

        return {
          ...data,
          value: statsData.payload ?
            statsData.payload[key as OrderStatsType] :
            0,
        };
      });

      return actualData;
    } else {
      return dashboardStats;
    }
  }, [statsData]);
  const orders = useMemo(
    () => (ordersData?.payload ?? []) as OrdersModel[],
    [ordersData],
  );

  return (
    <Wrapper width={width}>
      <div className="stats-box">
        {stats.map(({ name, value, color, icon, id }) => (
          <StatsBox
            key={id}
            name={name}
            icon={icon}
            id={id}
            isLoading={loadingStats}
            value={value}
            color={color}
          />
        ))}
      </div>

      <div className="table-wrapper">
        <div className="bold-8">Shipment History</div>

        {isLoading ? (
          <div className="centered">
            <LoaderComponent />
          </div>
        ) : (
          <PrimaryTable
            collectionName="Shipment history"
            data={orders}
            columns={[
              {
                Header: 'Tracking NO.',
                accessor: () => <span>#43521678947219736216</span>,
              },
              {
                Header: 'Delivery Location',
                accessor: ({ pickupLocalGovt, pickupState }: OrdersModel) => (
                  <span>
                    {pickupLocalGovt}, {pickupState}
                  </span>
                ),
              },
              { Header: 'Receiver\'s Name', accessor: 'receiverName' },
              {
                Header: 'Progress Status',
                accessor: () => 'Ready for delivery',
              },
              {
                Header: 'Update Status',
                accessor: () => <span>In-Progress</span>,
              },
            ]}
          />
        )}
      </div>
    </Wrapper>
  );
};
