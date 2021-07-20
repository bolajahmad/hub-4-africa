import { useFormik } from 'formik';
import { motion } from 'framer-motion';
import React from 'react';
import { useMutation } from 'react-query';
import styled from 'styled-components';
import { LoaderComponent } from '../../../../components/utils';
import { OrdersService } from '../../../../services';
import { StyledFormWrapper, StyledInputWrapper } from '../../../../styles';
import { useWindowDimensions } from '../../../../utils';

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

      > * {
        margin: 2em auto;
        padding: 1em 20%;
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
  const { mutate, isError, isLoading, error } = useMutation(OrdersService.trackOrder);
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
            {isError && (
              <span className="error-message centered mt-4 bold-6">
                {(error as any).message}: {(error as any).payload}
              </span>
            )}
          </StyledInputWrapper>

          <StyledFormWrapper width={width}>
            <div className="footer">
              <div style={{ maxWidth: '12em', marginLeft: 'auto', marginRight: 'auto' }}>
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
