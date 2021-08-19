import { useFormik } from 'formik';
import React, { Dispatch, SetStateAction } from 'react';
import { useMutation } from 'react-query';
import styled from 'styled-components';
import { LoaderComponent, Popup } from '../../../../components/utils';
import { useNotificationContext } from '../../../../contexts/NotificationContext';
import { OrdersModel } from '../../../../models';
import { OrdersService } from '../../../../services';
import { StyledFormWrapper, StyledInputWrapper } from '../../../../styles';
import { NotificationType, useWindowDimensions } from '../../../../utils';

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

interface Props {
  orderSelected: OrdersModel;
  setOrder: Dispatch<SetStateAction<OrdersModel | undefined>>;
}

export const PendingOrdersView: React.FC<Props> = ({ orderSelected, setOrder }) => {
  const { addNotification } = useNotificationContext()!;
  const { width } = useWindowDimensions();
  const { mutate, isLoading, isError, error } = useMutation(OrdersService.orderEstimate, {
    onSuccess: (response) => {
      setOrder(undefined);
      addNotification(NotificationType.SUCCESS, 'Order Updated Successfully');
    },
  });

  const {
    values: { weight },
    handleChange,
    handleBlur,
    resetForm,
  } = useFormik({
    initialValues: { weight: '' },
    onSubmit: (model) => console.log(model),
  });

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
            {orderSelected?.warehouse?.address}, {orderSelected?.warehouse?.state}
          </span>
        </div>
        <div className="list">
          <span style={{ opacity: 0.6, fontWeight: 400 }}>Package Conditions</span>
          <span>
            {orderSelected.packageConditions.map(({ packageConditionName }) => packageConditionName).join(', ') ??
                'Not Specified'}
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
            <div
              style={{
                maxWidth: '12em',
                marginLeft: 'auto',
                marginRight: 'auto',
              }}
            >
              <button
                type="button"
                onClick={() =>
                  mutate({
                    orderId: orderSelected.id,
                    weight: Number(weight),
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
};
