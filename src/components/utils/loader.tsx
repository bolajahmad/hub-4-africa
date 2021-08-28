import React, { CSSProperties } from 'react';
import styled, { keyframes } from 'styled-components';

const loading = keyframes`
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
`;

const Wrapper = styled.div<LoaderProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 5px;
  font-size: ${({ fontSize }) => (fontSize === 'normal' ? '0.9rem' : fontSize === 'large' ? '1.2rem' : '0.8rem')};

  > * + * {
    margin-top: 1.5em;
  }

  .loader:after {
    border-radius: 50%;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
  .loader,
  .loader::after {
    border-radius: 50%;
  }
  .loader {
    height: ${({ size }) => size + 'rem'};
    width: ${({ size }) => size + 'rem'};
    position: relative;
    -webkit-transform: translateZ(0);
    -ms-transform: translateZ(0);
    transform: translateZ(0);
    -webkit-animation: ${loading} 1.1s infinite linear;
    animation: ${loading} 1.1s infinite linear;
    border: ${({ borderWidth, bodyColor }) => `${borderWidth}px solid ${bodyColor}`};
    border-left: ${({ borderWidth, headColor }) => `${borderWidth}px solid ${headColor}`};
  }
`;

interface LoaderProps {
  text?: string;
  size?: number;
  fontSize?: 'large' | 'normal';
  borderWidth?: number;
  headColor?: CSSProperties['color'];
  bodyColor?: CSSProperties['color'];
}

export const LoaderComponent: React.FC<LoaderProps> = ({
  text,
  size = 2,
  fontSize,
  borderWidth = 3,
  headColor = '#089b11',
  bodyColor = '#99d290',
}) => {
  return (
    <Wrapper size={size} fontSize={fontSize} borderWidth={borderWidth} headColor={headColor} bodyColor={bodyColor}>
      <div className="loader" />
      {text && <div className="text bold uppercase">{text}</div>}
    </Wrapper>
  );
};
