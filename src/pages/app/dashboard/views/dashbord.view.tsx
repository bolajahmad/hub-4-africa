import React, { useMemo } from 'react';
import { useMutation, useQuery } from 'react-query';
import ReactTooltip from 'react-tooltip';
import styled from 'styled-components';
import { PrimaryTable } from '../../../../components';
import { CopyCard, CustomDropdown, CustomDropdownItem, LoaderComponent } from '../../../../components/utils';
import { useNotificationContext } from '../../../../contexts/NotificationContext';
import { OrdersModel, OrderStatsModel, OrderStatsType } from '../../../../models';
import { OrdersService, UtilService } from '../../../../services';
import { DashboardService } from '../../../../services/dashboard.service';
import { StyledDashboard, StyledProgressWrapper } from '../../../../styles';
import { NotificationType, OrderStatuses, useWindowDimensions } from '../../../../utils';
import { dashboardStats, StatsBox } from '../components/stats-box';

const Wrapper = styled(StyledDashboard)``;

export const DashboardView: React.FC = () => {
  const { addNotification } = useNotificationContext()!;
  const { width } = useWindowDimensions();

  const { data: statsData, isLoading: loadingStats } = useQuery(['order-stats'], DashboardService.fetchOrderStats);
  const { data: statusData } = useQuery(['order-status'], UtilService.fetchOrderStatus);
  const { data: ordersData, isLoading } = useQuery(['orders'], DashboardService.fetchAllOrders);
  const { mutate } = useMutation(OrdersService.updateOrderStatus, {
    onError: (error) => {
      addNotification(NotificationType.ERROR, (error as any)?.message);
    },
  });
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
  const orders = useMemo(() => (ordersData?.payload ?? []) as OrdersModel[], [ordersData]);
  const status = useMemo(() => (statusData?.payload ?? []) as { id: number; name: string }[], [statusData]);

  return (
    <Wrapper width={width}>
      <div className="stats-box">
        {stats.map((props) => (
          <StatsBox key={props.id} {...props} isLoading={loadingStats} />
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
                accessor: ({ id }: OrdersModel) => (
                  <React.Fragment>
                    <CopyCard data-tip={id} data-for={id} title={id} hoveredText={id} text="Copy Number" />
                    <ReactTooltip id={id} className="tooltip" place="bottom">
                      <p
                        style={{
                          fontWeight: 400,
                          color: 'white',
                          maxWidth: 200,
                        }}
                      >
                        {id}{' '}
                      </p>
                    </ReactTooltip>
                  </React.Fragment>
                ),
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
                accessor: () => (
                  <StyledProgressWrapper>
                    <div className="circle"></div>
                    Ready for Delivery
                  </StyledProgressWrapper>
                ),
              },
              {
                Header: 'Update Status',
                accessor: ({ orderStatus, id: orderId }: OrdersModel) => (
                  <CustomDropdown
                    triggerComponent={() => (
                      <span>{OrderStatuses.find(({ id: status }) => status === orderStatus)?.display}</span>
                    )}
                  >
                    {status.map(({ name, id }) => (
                      <CustomDropdownItem
                        onClick={() => mutate({ orderStatus: id, orderId })}
                        className="capitalize"
                        key={id}
                      >
                        {OrderStatuses.find(({ name: orderName }) => name === orderName)?.display}
                      </CustomDropdownItem>
                    ))}
                  </CustomDropdown>
                ),
              },
            ]}
          />
        )}
      </div>
    </Wrapper>
  );
};
