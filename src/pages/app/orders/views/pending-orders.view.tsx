import { motion } from 'framer-motion';
import React from 'react';
import styled from 'styled-components';

const PageWrapper = styled(motion.div)`
  width: 100%;
  padding: 1.5em 2.5em;
`;

export const PendingOrdersView: React.FC = () => {
  return (
    <PageWrapper>
      <div className="content">
        <h2>Pending Orders</h2>
      </div>
    </PageWrapper>
  );
};
