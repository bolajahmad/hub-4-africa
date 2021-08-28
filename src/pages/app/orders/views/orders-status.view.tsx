import { motion } from 'framer-motion';
import React, { useCallback, useMemo, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import ReactTooltip from 'react-tooltip';
import styled from 'styled-components';
import { PrimaryTable } from '../../../../components';
import { CopyCard, CustomDropdown, CustomDropdownItem, LoaderComponent } from '../../../../components/utils';
import { useNotificationContext } from '../../../../contexts/NotificationContext';
import { OrdersModel } from '../../../../models';
import { DashboardService, OrdersService, UtilService } from '../../../../services';
import { StyledProgressWrapper } from '../../../../styles';
import { NotificationType, OrderStatuses } from '../../../../utils';

const PageWrapper = styled(motion.div)`
  width: 100%;
  padding: 1.5em 2.5em;

  .content {
    width: 100%;

    .table-wrapper {
      margin-top: 2em;
    }
  }
`;

export const OrderStatusView: React.FC = () => {
  const { addNotification } = useNotificationContext()!;
  const { invalidateQueries } = useQueryClient();
  const [isUpdating, setUpdating] = useState<string | undefined>();
  const { data: ordersData, isLoading } = useQuery(['orders'], () => DashboardService.fetchAllOrders());
  const { data: statusData } = useQuery(['order-status'], UtilService.fetchOrderStatus);
  const { mutate } = useMutation(OrdersService.updateOrderStatus, {
    onMutate: (variables) => {
      setUpdating(variables.orderId);
    },
    onError: (error) => {
      setUpdating(undefined);
      addNotification(NotificationType.ERROR, (error as any)?.message);
    },
    onSuccess: () => {
      setUpdating(undefined);
      invalidateQueries('orders');
    },
  });
  const orders = useMemo(() => (ordersData?.payload || []) as OrdersModel[], [ordersData]);
  const status = useMemo(() => (statusData?.payload ?? []) as { id: number; name: string }[], [statusData]);
  const ratio = useCallback((status: number) => {
    switch (status) {
      case 2:
        return 0.5;
      case 3:
        return 0.75;
      case 4:
        return 1;
      default:
        return 0.25;
    }
  }, []);

  return (
    <PageWrapper>
      <div className="content">
        <h2>Order Status</h2>

        <div className="table-wrapper">
          {isLoading ? (
            <div className="centered">
              <LoaderComponent />
            </div>
          ) : (
            <PrimaryTable
              collectionName="Orders"
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
                  accessor: ({ paymentStatus, orderStatus }: OrdersModel) => (
                    <StyledProgressWrapper
                      ratio={ratio(orderStatus)}
                      color={paymentStatus === 0 ? '#F33B3B' : paymentStatus === 1 ? '#FFD039' : '#0EBE7E'}
                    >
                      <div className="circle"></div>
                      {OrderStatuses.find(({ id: status }) => status === orderStatus)
                        ?.name.toLowerCase()
                        .split('_')
                        .join(' ')}
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
                          {isUpdating ? (
                            <LoaderComponent size={1} borderWidth={2} headColor="#c4c4c4" bodyColor="#f0f5ef" />
                          ) : (
                            OrderStatuses.find(({ name: orderName }) => name === orderName)?.display
                          )}
                        </CustomDropdownItem>
                      ))}
                    </CustomDropdown>
                  ),
                },
              ]}
            />
          )}
        </div>
      </div>
    </PageWrapper>
  );
};
