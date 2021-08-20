import React, { useEffect, useState } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import { FiClipboard } from 'react-icons/fi';
import styled from 'styled-components';
import { TextButton } from '../buttons';

const WrapperStyle = styled.div`
  display: inline-flex;
  align-items: end;
  flex-direction: row;
  cursor: context-menu;
  color: inherit;
  font-style: italic;

  .text__btn {
    background-color: #0ebe7e;
    color: white;
    border-radius: 5px;
    border: none;
    font-weight: 700;
  }

  .copy {
    justify-content: center;

    .text {
      color: inherit;
    }

    .hovered {
      max-width: 10em;
    }
  }
`;

interface Props {
  title: string;
  text?: React.ReactNode;
  hoveredText?: string;
}

export const CopyCard: React.FC<Props> = ({ title, text, hoveredText }) => {
  const [copied, setCopied] = useState(false);
  const [showHovered, setShowHovered] = useState(false);
  const onCopy = React.useCallback(() => {
    setCopied(true);
  }, []);

  useEffect(() => {
    let timeout: any = null;
    if (copied) {
      timeout && clearTimeout(timeout);
      timeout = setTimeout(() => {
        setCopied(false);
      }, 3000);
    }
    return () => timeout && clearTimeout(timeout);
  }, [copied]);

  return (
    <WrapperStyle>
      <CopyToClipboard text={title} onCopy={onCopy}>
        <TextButton
          onClick={() => {
            if (hoveredText) {
              setShowHovered((prev) => !prev);
              setTimeout(() => {
                setShowHovered(false);
              }, 2000);
            }
          }}
          className={`text__btn copy ${copied ? 'copied' : ''}`}
        >
          <span className={`text ${showHovered ? 'visually-hidden' : ''}`}>
            {copied ? 'Copied' : text || <FiClipboard size="18" />}
          </span>
          <span className={`hovered ${showHovered ? '' : 'visually-hidden'}`}>{hoveredText}</span>
        </TextButton>
      </CopyToClipboard>
    </WrapperStyle>
  );
};
