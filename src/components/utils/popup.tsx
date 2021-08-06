import * as React from 'react';
import { FiX } from 'react-icons/fi';
import styled from 'styled-components';
import { TextButton } from '../buttons';

const PopupStyle = styled.div`
  align-items: center;
  background-color: #5d5f5d66;
  display: flex;
  height: 100%;
  justify-content: center;
  left: 0;
  overflow-y: auto;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 60;

  .content-box {
    border-radius: 9px;
    padding: 20px 0;
    background-color: white;
    min-width: 300px;

    h3 {
      font-size: 16px;
    }
  }
`;
interface PopupProps {
  children: React.ReactNode;
  close?: () => void;
}

export const Popup: React.FC<PopupProps> = ({ children, close }) => {
  const ref = React.useRef<HTMLDivElement | null>(null);

  return (
    <PopupStyle className="popup">
      <div ref={ref} className="content-box">
        <div className="flex justify-end w-full">
          <TextButton className=" mr-3" onClick={() => close?.()}>
            <FiX size={24} />
          </TextButton>
        </div>
        <div>{children}</div>
      </div>
    </PopupStyle>
  );
};
