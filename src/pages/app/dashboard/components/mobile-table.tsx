import React from 'react';
import { useMutation } from 'react-query';
import styled from 'styled-components';
import { CopyCard, CustomDropdown, CustomDropdownItem } from '../../../../components/utils';
import { useNotificationContext } from '../../../../contexts/NotificationContext';
import { OrdersModel } from '../../../../models';
import { OrdersService } from '../../../../services';
import { StyledProgressWrapper } from '../../../../styles';
import { devices, NotificationType, OrderStatuses } from '../../../../utils';

const Wrapper = styled.li`
  list-style: none;
  background-color: white;
  border-radius: 4px;
  padding: 1em 2em;
  font-size: 0.85rem;
  min-height: 10em;

  > .header {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 30px;

    .copy-box {
      display: inline-flex;
      align-items: center;
      justify-content: flex-start;
      gap: 15px;
      font-weight: 800;
    }
  }

  > .details-box {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 40px;
    margin-top: 2em;

    .data {
      display: inline-flex;
      flex-direction: column;
      gap: 20px;
      font-weight: 700;

      .label {
        font-weight: 500;
        opacity: 0.3;
      }

      &.data-update {
        flex: 1;
        margin-left: auto;
        max-width: 200px;
      }
    }
  }

  ${devices.phoneM} {
    > .details-box {
      flex-direction: column;
      align-items: flex-start;

      & .data.data-update {
        margin-left: 0;
        min-width: 200px;
      }
    }
  }
`;

interface Props {
  data: OrdersModel;
  status: { id: number; name: string }[];
}

export const MobileTable: React.FC<Props> = ({ data, status }) => {
  const { addNotification } = useNotificationContext()!;
  const { paymentStatus, id: orderId, pickupLocalGovt, pickupState, receiverName, orderStatus } = data;

  const { mutate } = useMutation(OrdersService.updateOrderStatus, {
    onError: (error) => {
      addNotification(NotificationType.ERROR, (error as any)?.message);
    },
  });

  return (
    <Wrapper>
      <div className="header">
        <StyledProgressWrapper color={paymentStatus === 0 ? '#F33B3B' : paymentStatus === 1 ? '#FFD039' : '#0EBE7E'}>
          <div className="circle"></div>
        </StyledProgressWrapper>

        <h4 className="copy-box">
          {orderId}
          <CopyCard data-tip={orderId} data-for={orderId} title={orderId} />
        </h4>
      </div>

      <div className="details-box">
        <p className="data">
          <span className="label">Delivery Location</span>
          <span className="value">
            {pickupLocalGovt}, {pickupState}
          </span>
        </p>

        <p className="data">
          <span className="label">Receiver&rsquo;s Name</span>
          <span className="value">{receiverName}</span>
        </p>

        <p className="data-update data">
          <span className="label">Update Status</span>
          <CustomDropdown
            triggerComponent={() => (
              <span>{OrderStatuses.find(({ id: status }) => status === orderStatus)?.display}</span>
            )}
          >
            {status.map(({ name, id }) => (
              <CustomDropdownItem onClick={() => mutate({ orderStatus: id, orderId })} className="capitalize" key={id}>
                {OrderStatuses.find(({ name: orderName }) => name === orderName)?.display}
              </CustomDropdownItem>
            ))}
          </CustomDropdown>
        </p>
      </div>
    </Wrapper>
  );
};
