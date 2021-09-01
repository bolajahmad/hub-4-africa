import { motion } from 'framer-motion';
import React, { useMemo, useState } from 'react';
import { BsInfoSquareFill } from 'react-icons/bs';
import { IoReloadSharp } from 'react-icons/io5';
import { useQuery } from 'react-query';
import ReactTooltip from 'react-tooltip';
import styled from 'styled-components';
import { TextButton } from '../../../../components';
import { LoaderComponent } from '../../../../components/utils';
import { OrdersModel } from '../../../../models';
import { OrdersService } from '../../../../services';
import { devices } from '../../../../utils';
import { UpdateAmountModal } from '../components';

const PageWrapper = styled(motion.div)`
  width: 100%;
  padding: 1.5em 2.5em;

  .tooltip {
    border-radius: 6px;
  }

  > .content {
    > .header {
      display: flex;
      gap: 5px;
      align-items: center;
    }
  }

  .orders-list {
    display: block;
    width: 100%;
    padding: 0;
    margin-top: 2em;
    font-size: 0.9rem;
    color: #130f26;

    > li + li {
      margin-top: 2em;
    }

    > li {
      background-color: white;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 1em 2em;
      border-radius: 5px;

      h3 {
        text-transform: uppercase;
        font-weight: 800;
        display: flex;
        align-items: center;
        gap: 5px;

        span {
          width: 0.65em;
          height: 0.65em;
          border-radius: 50%;
          background-color: #46bb46;
        }
      }

      .details {
        display: flex;
        align-items: start;
        padding-left: 1em;
        justify-content: space-evenly;
        gap: 20px;
        margin-top: 0.75em;

        > li {
          display: flex;
          align-items: flex-start;
          flex-direction: column;
          font-size: 0.85em;
          font-weight: 700;

          .title {
            opacity: 0.5;
          }
        }
      }

      .btn-box {
        button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          color: #2f878a;
          background-color: #e7f8f2;
          width: fit-content;
          padding: 0.5em 0.75em;
          border: none;
          outline: none;
          font-weight: 800;
        }
      }
    }
  }

  ${devices.phoneM} {
    .orders-list > li {
      h3 {
        display: initial;

        span {
          display: inline-block;
        }
      }

      .details {
        flex-direction: column;
      }
    }
  }
`;

export const PendingOrdersView: React.FC = () => {
  const [orderSelected, setOrder] = useState<OrdersModel | undefined>();
  const { data, isLoading: isFetching, refetch } = useQuery(['pending-orders'], OrdersService.fetchPendingOrders);
  const pendingOrders = useMemo(() => data?.payload || [], [data]);

  if (orderSelected) {
    return <UpdateAmountModal orderSelected={orderSelected} setOrder={setOrder} />;
  }

  return (
    <PageWrapper>
      <div className="content">
        <h2 className="header">
          Pending Orders
          <span data-tip data-for="global">
            <BsInfoSquareFill size="15" />
          </span>
          <ReactTooltip id="global" className="tooltip" place="bottom">
            <p style={{ fontWeight: 400, color: 'white', maxWidth: 200 }}>
              These are orders that haven’t been received at the warehouse{' '}
            </p>
          </ReactTooltip>
        </h2>

        <ul className="orders-list">
          {isFetching ? (
            <div className="centered">
              <LoaderComponent />
            </div>
          ) : pendingOrders.length ? (
            pendingOrders.map((order) => (
              <li key={order.id}>
                <div>
                  <h3>
                    <span />
                    &nbsp;{order.id}
                  </h3>
                  <ul className="details">
                    <li>
                      <span className="title">Delivery Location</span>
                      <span className="sub">{order.pickupAddress}</span>
                    </li>
                    <li>
                      <span className="title">Receiver&rsquo;s Name</span>
                      <span className="sub">{order.receiverName}</span>
                    </li>
                    <li>
                      <span className="title">Receiver&rsquo;s Phone</span>
                      <span className="sub">{order.receiverPhone}</span>
                    </li>
                  </ul>
                </div>
                <div className="btn-box">
                  {order.paymentStatus === 0 ? (
                    <button onClick={() => setOrder(order)}>RECEIVED GOOD</button>
                  ) : (
                    <button>Awaiting Payment</button>
                  )}
                </div>
              </li>
            ))
          ) : (
            <div className="centered info-box">
              There are no pending orders
              <TextButton onClick={() => refetch()}>
                <span className="visually-hidden">
                  <IoReloadSharp />
                </span>
              </TextButton>
            </div>
          )}
        </ul>
      </div>
    </PageWrapper>
  );
};
