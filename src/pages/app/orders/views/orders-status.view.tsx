import { motion } from 'framer-motion';
import React from 'react';
import styled from 'styled-components';
import { PrimaryTable } from '../../../../components';

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
  return (
    <PageWrapper>
      <div className="content">
        <h2>Order Status</h2>

        <div className="table-wrapper">
          <PrimaryTable collectionName="Pending Orders" columns={[]} data={[]} />
        </div>
      </div>
    </PageWrapper>
  );
};
