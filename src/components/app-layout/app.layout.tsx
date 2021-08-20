import React, { useEffect, useMemo, useState } from 'react';
import Scrollbars from 'react-custom-scrollbars';
import styled from 'styled-components';
import { devices, getWindowDimensions, useWindowDimensions } from '../../utils';
import { HeaderBar } from './header-bar';
import { Sidebar } from './sidebar';

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 250px 1fr;
  background-color: #f2f2f2;

  > main {
    display: flex;
    flex-direction: column;
    height: ${getWindowDimensions().height}px;
  }

  .page__body {
    flex: 1;
  }

  ${devices.tablet} {
    display: flex;
    flex-direction: column;
  }
`;

interface Props {
  barComponent?: React.ReactNode;
}

export const AppLayout: React.FC<Props> = ({ children }) => {
  const { width } = useWindowDimensions();
  const [isOpen, setOpen] = useState(true);
  const isMobile = useMemo(() => width <= 768, [width]);

  useEffect(() => {
    if (width < 900) {
      setOpen(false);
    }
  }, []);

  return (
    <Wrapper>
      <Sidebar sidebarOpen={isOpen} isMobile={isMobile} />
      <main>
        <HeaderBar setSidebarOpen={setOpen} sidebarOpen={isOpen} />
        <div className="page__body">
          <Scrollbars style={{ height: '100%', width: '100%' }}>{children}</Scrollbars>
        </div>
      </main>
    </Wrapper>
  );
};

const WidthRestrictor = styled.div<{
  shiftRight?: boolean;
  width?: number;
}>`
  width: 100%;
  /* max-width: ${({ width }) => (width && width >= 900 ? '100%' : '480px')}; */
  margin-left: ${(props) => (props.shiftRight ? '200px' : 0)};
  margin: ${({ width }) => width && width >= 900 && 0};
`;

export const Page = {
  WidthRestrictor,
};
