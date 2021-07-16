import { motion } from 'framer-motion';
import React from 'react';
import { IoMdInformationCircle } from 'react-icons/io';
import ReactTooltip from 'react-tooltip';
import styled from 'styled-components';

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
`;

export const PendingOrdersView: React.FC = () => {
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
      </div>
    </PageWrapper>
  );
};
