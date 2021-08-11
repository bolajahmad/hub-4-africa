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
    > div {
      margin-top: 2em;
    }
  }
`;

export const StyledProgressWrapper = styled(motion.div)<{
  color?: '#FFD039' | '#F33B3B' | '#0EBE7E';
  ratio?: number;
}>`
  display: inline-flex;
  align-items: center;
  justify-content: flex-start;
  gap: 4px;

  .circle {
    width: 2em;
    height: 2em;
    padding: 0.5em;
    border-radius: 50%;
    transform: rotate(-45deg);
    color: ${({ color = '#F33B3B' }) => color};
    border: 5px solid;
    border-color: ${({ ratio = 0.1 }) =>
    `${0 <= ratio ? 'currentColor' : '#f3f3f3'} ${ratio > 0.25 ? 'currentColor' : '#f3f3f3'} ${
      ratio > 0.5 ? 'currentColor' : '#f3f3f3'
    } ${ratio > 0.75 ? 'currentColor' : '#f3f3f3'}`};
  }
`;
