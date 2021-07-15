import { motion } from 'framer-motion';
import styled from 'styled-components';

export const StyledDashboard = styled(motion.div)<{
  width: number;
}>`
  width: 100%;
  padding: 1.5em 2.5em;

  > .stats-box {
    border-radius: 8px;
    background-color: white;
    padding: 2em;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(10em, 1fr));
    gap: 0;
    width: 100%;

    > div {
      padding: 0em 1em;
    }

    > div + div {
      border-left: 1px solid #c4c4c4;
    }
  }

  > .table-wrapper {
    margin-top: 3em;
  }
`;
