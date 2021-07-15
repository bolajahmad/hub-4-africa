import { motion } from 'framer-motion';
import React from 'react';
import styled from 'styled-components';

const PageWrapper = styled(motion.div)`
  width: 100%;
  padding: 1.5em 2.5em;

  > .content {
    background-color: white;
    padding: 1em 2em;
    max-width: 40em;
    min-width: 30em;
    width: 40em;
    margin: 2em auto;

    > .header {
      text-align: center;
    }
  }
`;

export const TrackOrdersView: React.FC = () => {
  return (
    <PageWrapper>
      <div className="content">
        <div className="header">
          <h3>Track Your Orders</h3>
        </div>
      </div>
    </PageWrapper>
  );
};
