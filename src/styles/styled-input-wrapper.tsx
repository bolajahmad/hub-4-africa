import styled from 'styled-components';

export const StyledInputWrapper = styled.div<{
  width: number;
  white?: boolean;
}>`
  display: flex;
  width: 100%;
  position: relative;
  flex-direction: column;
  transition: all 0.5s ease-in;
  font-size: ${({ width }) => (width <= 600 ? '0.75rem' : '1rem')};

  .label {
    display: block;
    min-width: fit-content;
    margin-bottom: 0.25em;
    word-wrap: no-wrap;
    white-space: pre-wrap;
    text-align: left;
    text-transform: uppercase;
    font-weight: 500;
    font-size: 0.85em;
    color: var(--primary-color);
    transition: all 0.5s ease-in;
  }

  .body {
    background-color: ${({ white }) => (white ? '#fff' : '#f9f9f9')};
    border-radius: 14px;
    display: flex;
    transition: 0.2s;
    position: relative;
    height: 3em;

    :hover {
      border-color: #aaa;
    }

    :focus-within {
      border-color: #004491ac;
      box-shadow: 0 0 0px 2px var(--primary-color) inset;
    }
  }

  .body.error {
    border: 1px solid #bb8181;
    box-shadow: 0 0 0px 3px #fbdbdb inset;

    .input::placeholder {
      color: #bb8181;
      text-transform: capitalize;
    }
  }

  .input {
    height: 100%;
    font-size: 1em;
    padding: 0.7em 0.85em;
    border: none;
    background: none;
    font-size: ${({ width }) => (width < 500 ? '0.75em' : '1em')};
    outline: none !important;
    min-width: 0;
    flex: 1;
    font-weight: 400;
    color: var(--primary-color);
    appearance: none;
    transition: all 0.5s ease-in;

    &.as-placeholder {
      color: #130f26;
      opacity: 0.5;
      font-size: 12px;
    }

    &::placeholder {
      font-size: 12px;
    }
  }

  .switch-button {
    display: flex;
    justify-content: center;
    align-items: center;
    background: transparent;
    border: none;
    cursor: pointer;
    color: #00a159;
    border-left: 1px solid transparent;
    width: 4em;
    outline: none !important;
    appearance: none;
    flex-shrink: 0;
    transition: color 0.5s ease-in, border-color 0.5s ease-in;
    will-change: color, border-color;

    .switch-icon {
      transform: none;
      transition: transform 0.5s ease-in;
      will-change: transition;
    }

    :hover {
      border-color: currentColor;
      color: #00a158c0;

      .switch-icon {
        transform: scale(1.25);
      }
    }
  }

  .error-message {
    color: #c70000;
    font-size: 0.8em;

    transition: all 0.5s ease-in;
  }
`;
