import { useFormik } from 'formik';
import { motion } from 'framer-motion';
import moment from 'moment';
import React from 'react';
import { FiSend } from 'react-icons/fi';
import { useMutation } from 'react-query';
import styled from 'styled-components';
import { LoaderComponent } from '../../../../components/utils';
import { useNotificationContext } from '../../../../contexts/NotificationContext';
import { OrdersService } from '../../../../services';
import { StyledFormWrapper, StyledInputWrapper } from '../../../../styles';
import { NotificationType, useWindowDimensions } from '../../../../utils';

const PageWrapper = styled(motion.div)`
  width: 100%;
  padding: 1.5em 2.5em;

  > .content {
    background-color: white;
    max-width: 40em;
    min-width: 30em;
    padding: 2em 0 1em;
    border-radius: 9px;
    width: 40em;
    margin: 2em auto;

    > .header {
      text-align: center;
      padding: 1em 2em;
    }

    .track-form {
      padding-bottom: 1em;

      .info__list {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: stretch;

        .item {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 15px;
          width: 100%;
          color: #020003;

          .icon {
            width: 3.5em;
            height: 3.5em;
            border-radius: 8px;
            padding: 0.5em;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            color: white;
            background-color: #0ebe7e;

            &.faded {
              background-color: #e7f8f2;
              color: #0ebe7e;
            }
          }

          .text {
            flex: 1;
            font-weight: 400;
            font-size: 0.8rem;

            .bold {
              font-weight: 700;
              font-size: 0.95em;
            }
          }

          .time {
            opacity: 0.2;
          }
        }
      }

      > * {
        margin: 2em auto;
        padding: 1em 10%;
      }

      > * + * {
        margin-top: 2em;
        border-top: 1px solid rgba(234, 234, 234, 0.49);
      }
    }
  }
`;

export const TrackOrdersView: React.FC = () => {
  const { width } = useWindowDimensions();
  const { addNotification } = useNotificationContext()!;
  const { mutate, isLoading, data } = useMutation(OrdersService.trackOrder, {
    onSuccess: ({ message }) => addNotification(NotificationType.SUCCESS, message, true),
  });
  const { values, handleChange, handleBlur } = useFormik({
    initialValues: { orderId: '' },
    onSubmit: (model) => {
      console.log({ model });
    },
  });
  const handleSubmit = () => mutate(values.orderId);

  return (
    <PageWrapper>
      <div className="content">
        <div className="header">
          <h3>Track Your Orders</h3>
        </div>

        <div className="track-form">
          <StyledInputWrapper width={width}>
            <div className="body">
              <input
                name="orderId"
                type="text"
                value={values.orderId}
                onChange={handleChange}
                onBlur={handleBlur}
                className="input"
                placeholder="Paste order id"
              />
            </div>
            {/* {isError && (
              <span className="error-message centered mt-4 bold-6">
                {(error as any)?.message}: {(error as any)?.payload}
              </span>
            )} */}
          </StyledInputWrapper>

          {data && (
            <ul className="info__list">
              <li className="item">
                <span className="icon">
                  <FiSend size={24} />
                </span>

                <div className="text">
                  <p className="bold">New Orleans Warehouse</p>
                  <p>312, texas malbrocks united state</p>
                </div>

                <span className="time">{moment().format('HH:mm')}</span>
              </li>
            </ul>
          )}

          <StyledFormWrapper width={width}>
            <div className="footer">
              <div
                style={{
                  maxWidth: '12em',
                  marginLeft: 'auto',
                  marginRight: 'auto',
                }}
              >
                <button type="button" onClick={() => handleSubmit()} className="submit__btn">
                  {isLoading ? <LoaderComponent /> : 'Track'}
                </button>
              </div>
            </div>
          </StyledFormWrapper>
        </div>
      </div>
    </PageWrapper>
  );
};
