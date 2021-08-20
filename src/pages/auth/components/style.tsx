import styled from 'styled-components';
import { devices } from '../../../utils';

export const AuthPageWrapper = styled.div`
  width: 100%;
  font-size: 1rem;
  background-color: #f2f2f2;
  height: 100vh;

  > .container {
    width: 100%;
    display: flex;
    max-width: max-content;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    max-width: 30em;
    margin: 0 auto;
    height: 100%;
  }

  ${devices.phone} {
    > .container {
      padding: 0em 2em;
      max-width: initial;
    }
  }
`;
