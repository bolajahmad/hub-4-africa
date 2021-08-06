import { useFormik } from 'formik';
import { motion } from 'framer-motion';
import React, { useMemo, useState } from 'react';
import { IoMdInformationCircle } from 'react-icons/io';
import { IoReloadSharp } from 'react-icons/io5';
import { useMutation, useQuery } from 'react-query';
import ReactTooltip from 'react-tooltip';
import styled from 'styled-components';
import { TextButton } from '../../../../components';
import { LoaderComponent, Popup } from '../../../../components/utils';
import { useNotificationContext } from '../../../../contexts/NotificationContext';
import { OrdersModel } from '../../../../models';
import { OrdersService } from '../../../../services';
import { StyledFormWrapper, StyledInputWrapper } from '../../../../styles';
import { NotificationType, useWindowDimensions } from '../../../../utils';
const PageWrapper = styled(motion.div)`
  width: 100%;
  padding: 1.5em 2.5em;

  .tooltip {
    border-radius: 6px;
  }

  > .header {
    span {
      margin-left: 0.3em;
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
`;

const ModalWrapper = styled.div`
  width: 100%;
  background-color: white;
  max-width: 30em;
  min-width: 25em;
  width: 40em;

  > * {
    padding: 1em 4em;
  }

  > * + * {
    border-top: 1px solid rgba(234, 234, 234, 0.49);
  }

  > .header {
    text-align: center;
    padding: 1em 2em;
  }

  .list {
    display: flex;
    flex-direction: column;
    gap: 5px;
    font-weight: 700;
    text-transform: capitalize;
  }
`;

export const PendingOrdersView: React.FC = () => {
  const { addNotification } = useNotificationContext()!;
  const [orderSelected, setOrder] = useState<OrdersModel | undefined>();
  const { width } = useWindowDimensions();
  const { data, isLoading: isFetching, refetch } = useQuery(['pending-orders'], OrdersService.fetchPendingOrders);
  const { mutate, isLoading, isError, error } = useMutation(OrdersService.orderEstimate, {
    onSuccess: (response) => {
      setOrder(undefined);
      addNotification(NotificationType.SUCCESS, 'Order Updated Successfully');
    },
  });
  const pendingOrders = useMemo(() => data?.payload || [], [data]);

  const {
    values: { weight },
    handleChange,
    handleBlur,
    resetForm,
  } = useFormik({
    initialValues: { weight: '' },
    onSubmit: (model) => console.log(model),
  });

  if (orderSelected) {
    return (
      <Popup
        close={() => {
          resetForm();
          setOrder(undefined);
        }}
      >
        <ModalWrapper>
          <h3 className="header">Enter Total Goods Weight</h3>

          <StyledInputWrapper width={width}>
            <div className="body">
              <input
                type="number"
                name="weight"
                value={weight}
                placeholder="Enter weight"
                onBlur={handleBlur}
                onChange={handleChange}
                className="input"
              />
            </div>

            {isError && <span className="error-message centered">{(error as any)?.message}</span>}
            <span style={{ marginTop: '3em', fontSize: '0.7em', fontWeight: 500 }}>Order Details</span>
          </StyledInputWrapper>

          <div className="list">
            <span style={{ opacity: 0.6, fontWeight: 400 }}>Sending Location</span>
            <span>
              {orderSelected.warehouses[0].address}, {orderSelected.warehouses[0].state}
            </span>
          </div>
          <div className="list">
            <span style={{ opacity: 0.6, fontWeight: 400 }}>Package Conditions</span>
            <span>
              {orderSelected.packageConditions.map(({ packageConditionName }) => packageConditionName).join(', ')}
            </span>
          </div>
          <div className="list">
            <span style={{ opacity: 0.6, fontWeight: 400 }}>Receiver&rsquo;s Location</span>
            <span>
              {orderSelected.pickupLocalGovt},&nbsp;{orderSelected.pickupState}
            </span>
          </div>
          <div className="list">
            <span style={{ opacity: 0.6, fontWeight: 400 }}>Package Size</span>
            <span>{orderSelected.packageSize}kg</span>
          </div>

          <StyledFormWrapper width={width}>
            <div className="footer">
              <div style={{ maxWidth: '12em', marginLeft: 'auto', marginRight: 'auto' }}>
                <button
                  type="button"
                  onClick={() =>
                    mutate({
                      pickupState: orderSelected.pickupState,
                      packageConditionIds: orderSelected.packageConditions.map(({ id }) => id),
                      packageSize: Number(weight),
                      meansOfTransportationId: orderSelected.meansOfTransportations[0].id,
                      warehouseId: orderSelected.warehouses[0].id,
                    })
                  }
                  className="submit__btn"
                >
                  {isLoading ? <LoaderComponent /> : 'Update Amount'}
                </button>
              </div>
            </div>
          </StyledFormWrapper>
        </ModalWrapper>
      </Popup>
    );
  }

  return (
    <PageWrapper>
      <div className="content">
        <h2 className="header">
          Pending Orders
          <span data-tip data-for="global">
            <IoMdInformationCircle size="15" />
          </span>
          <ReactTooltip id="global" className="tooltip" place="bottom">
            <p style={{ fontWeight: 400, color: 'white', maxWidth: 200 }}>
              These are orders that haven’t been recieved at the warehouse{' '}
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
                  <button onClick={() => setOrder(order)}>RECEIVED GOOD</button>
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
