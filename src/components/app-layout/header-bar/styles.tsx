import styled from 'styled-components';
import { devices } from '../../../utils';

export const HeaderStyleWrapper = styled.div<{
  sidebarOpen?: boolean;
}>`
  margin-bottom: 30px;
  background-color: white;
  padding: 1em 1.5em;
  padding-right: 2.5em;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .header-title {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    font-weight: 800;
    gap: 20px;
    transform: ${({ sidebarOpen }) => (sidebarOpen ? 'translateX(155px)' : 'translateX(0)')};
    transition: transform 250ms ease-in, width 200ms ease-in;

    .logo {
      display: none;
    }
  }

  .user__area {
    display: flex;
    align-items: center;
    gap: 10px;

    .notification-icon {
      color: #939bbd;
      height: 25px;
      width: 25px;
    }
  }

  .menu {
    display: none;
  }

  ${devices.tabletM} {
    .header-title .logo {
      display: inline-block;
      max-width: 7em;
    }

    .menu {
      display: initial;
    }
  }

  ${devices.phone} {
    .header-title {
      transform: ${({ sidebarOpen }) => sidebarOpen && 'translateX(-20px)'};
    }
  }

  ${devices.phoneS} {
    padding-right: 0;
    padding: 0.5em;
    font-size: 0.8rem;
  }
`;
