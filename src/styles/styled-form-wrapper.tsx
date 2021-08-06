import styled from 'styled-components';

export const StyledFormWrapper = styled.form<{
  width: number;
  smaller?: boolean;
}>`
  width: 100%;
  margin: 0;
  padding: 0;

  > .main {
    width: 100%;
    padding: 2em 0;
    margin: 0;

    > div + div {
      margin-top: ${({ smaller }) => (smaller ? '0.75em' : '1.5em')};
    }
  }

  > div + div {
    margin-top: ${({ smaller }) => (smaller ? '0em' : '2em')};
  }

  > .footer {
    width: 100%;

    .submit__btn {
      width: 100%;
      padding: 1.3em;
      background-color: #0ebe7e;
      border: none;
      outline: none;
      font-weight: 700;
      border-radius: 12px;
      color: white;
      transform: translateY(0);
      filter: none;
      transition: transform 0.5s cubic-bezier(0.215, 0.61, 0.355, 1),
        filter 0.5s ease-in;
      will-change: transform, filter;

      &:focus,
      &:hover {
        filter: saturate(0.65);
        transform: translateY(-5px);
      }

      &:disabled {
        filter: saturate(0.2) !important;
        transform: translateY(-0px);
        cursor: not-allowed;
      }
    }
  }
`;
