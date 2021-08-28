import { motion } from 'framer-motion';
import styled from 'styled-components';
import { devices } from '../utils';

export const StyledDashboard = styled(motion.div)`
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

  ${devices.laptop} {
    .stats-box {
      grid-template-columns: repeat(2, minmax(10em, 1fr));

      > div {
        padding: 1em;
        border-color: #c4c4c4;

        &:nth-child(2n) {
          border-bottom: 1px solid;
        }

        &:nth-child(2n + 1) {
          border-top: 1px solid;
          border-right: 1px solid;
        }

        &:nth-child(1) {
          border-top: none;
        }

        &:last-child {
          border-bottom: none;
        }
      }

      > div + div {
        border-left: none;
      }
    }
  }

  ${devices.tabletM} {
    .orders-list {
      margin-top: 3em;

      > li + li {
        margin-top: 1.5em;
      }
    }
  }

  ${devices.phoneM} {
    .stats-box {
      grid-template-columns: 1fr;

      > div {
        padding: 1em;
        border: none;

        &:nth-child(2) {
          border-left: 0px solid;
          border-bottom: 0px solid;
        }

        &:nth-child(3) {
          border-top: 1px solid #c4c4c4;
          border-right: 0px solid;
        }
      }

      > div + div {
        border-top: 1px solid #c4c4c4;
      }
    }
  }
`;

export const StyledProgressWrapper = styled(motion.div)<{
  color: '#FFD039' | '#F33B3B' | '#0EBE7E';
  ratio?: number;
}>`
  display: inline-flex;
  align-items: center;
  justify-content: flex-start;
  gap: 4px;
  font-size: 1rem;

  .circle {
    width: 2em;
    height: 2em;
    padding: 0.5em;
    border-radius: 50%;
    transform: rotate(-45deg);
    color: ${({ color = '#F33B3B' }) => color};
    border: 5px solid;
    border-color: ${({ ratio = 0.1 }) =>
      `${0 <= ratio ? 'currentColor' : '#f3f3f3'} 
      ${ratio >= 0.25 ? 'currentColor' : '#f3f3f3'} 
      ${ratio >= 0.5 ? 'currentColor' : '#f3f3f3'}
      ${ratio >= 0.75 ? 'currentColor' : '#f3f3f3'}`};
  }
`;
