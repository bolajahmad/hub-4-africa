import { motion } from 'framer-motion';
import React, { useMemo } from 'react';
import { useQuery } from 'react-query';
import styled from 'styled-components';
import { PrimaryTable } from '../../../../components';
import { LoaderComponent } from '../../../../components/utils';
import { OrdersModel } from '../../../../models';
import { OrdersService } from '../../../../services';

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
  const { data, isLoading } = useQuery(['order-status'], OrdersService.fetchOrderStatus);
  const orders = useMemo(() => /* data?.payload ||  */ [] as OrdersModel[], [data]);

  return (
    <PageWrapper>
      <div className="content">
        <h2>Order Status</h2>

        <div className="table-wrapper">
          {isLoading ? (
            <div className="centered">
              <LoaderComponent />
            </div>
          ) : orders.length ? (
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
          ) : (
            <div className="centered info-box">You have no Orders</div>
          )}
        </div>
      </div>
    </PageWrapper>
  );
};
