import React, { useEffect, useState } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
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
    background-color: #4cf8b9;
    color: white;
    border-radius: 5px;
    border: none;
    font-weight: 600;
  }

  .copy {
    justify-content: center;

    span {
      color: inherit;
      font-weight: 600;
    }
  }
`;

interface Props {
  title: string;
  text?: React.ReactNode;
}

export const CopyCard: React.FC<Props> = ({ title, text }) => {
  const [copied, setCopied] = useState(false);
  const onCopy = React.useCallback(() => {
    setCopied(true);
  }, []);

  useEffect(() => {
    let timeout: any = null;
    if (copied) {
      timeout && clearTimeout(timeout);
      timeout = setTimeout(() => {
        setCopied(false);
      }, 2000);
    }
    return () => timeout && clearTimeout(timeout);
  }, [copied]);

  return (
    <WrapperStyle>
      <CopyToClipboard text={title} onCopy={onCopy}>
        <TextButton className={`text__btn copy${copied ? 'copied' : ''}`}>
          <span>{copied ? 'Copied' : text || 'Copy Key'}</span>
        </TextButton>
      </CopyToClipboard>
    </WrapperStyle>
  );
};
