import React, { useMemo } from 'react';
import { useMutation, useQuery } from 'react-query';
import ReactTooltip from 'react-tooltip';
import { PrimaryTable } from '../../../../components';
import { CopyCard, CustomDropdown, CustomDropdownItem, LoaderComponent } from '../../../../components/utils';
import { useNotificationContext } from '../../../../contexts/NotificationContext';
import { OrdersModel } from '../../../../models';
import { OrdersService, UtilService } from '../../../../services';
import { DashboardService } from '../../../../services/dashboard.service';
import { StyledProgressWrapper } from '../../../../styles';
import { NotificationType, OrderStatuses, usePageMatch } from '../../../../utils';
import { MobileTable } from './mobile-table';

export const DashboardTable: React.FC = () => {
  const { addNotification } = useNotificationContext()!;
  const { matches: isMobile } = usePageMatch('(max-width: 900px)');
  const { data: statusData } = useQuery(['order-status'], UtilService.fetchOrderStatus);
  const { data: ordersData, isLoading } = useQuery(['orders'], DashboardService.fetchAllOrders);
  const { mutate } = useMutation(OrdersService.updateOrderStatus, {
    onError: (error) => {
      addNotification(NotificationType.ERROR, (error as any)?.message);
    },
  });
  const orders = useMemo(() => (ordersData?.payload ?? []) as OrdersModel[], [ordersData]);
  const status = useMemo(() => (statusData?.payload ?? []) as { id: number; name: string }[], [statusData]);

  return (
    <React.Fragment>
      <div className="bold-8">Shipment History</div>

      {isLoading ? (
        <div className="centered">
          <LoaderComponent />
        </div>
      ) : isMobile ? (
        <ul className="orders-list">
          {orders.map((order) => (
            <MobileTable key={order.id} status={status} data={order} />
          ))}
        </ul>
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
              accessor: ({ paymentStatus }: OrdersModel) => (
                <StyledProgressWrapper
                  color={paymentStatus === 0 ? '#F33B3B' : paymentStatus === 1 ? '#FFD039' : '#0EBE7E'}
                >
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
    </React.Fragment>
  );
};
