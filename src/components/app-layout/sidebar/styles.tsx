import { motion } from 'framer-motion';
import styled from 'styled-components';
import { devices } from '../../../utils';

export const SidebarStylesWrapper = styled(motion.div)<{
  sideBarOpen?: boolean;
}>`
  background: #ffffff;
  height: 100vh;
  padding: 30px;
  vertical-align: middle;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: box-shadow 0.3s cubic-bezier(0.55, 0.085, 0.68, 0.53);
  will-change: box-shadow;

  > div {
    position: relative;
    height: 100%;
  }

  &:focus,
  &:hover {
    box-shadow: 0px 4px 11px rgba(234, 234, 234, 0.38);
  }

  .logo {
    width: 100%;
    text-align: center;
    margin-bottom: 2em;

    a {
      display: flex;
      max-width: 10em;
      align-items: center;
      justify-content: flex-start;
      height: 40px;
    }
  }

  .links {
    display: grid;
    margin-top: 2em;

    gap: 30px;
  }

  .link {
    color: #c4c4c4;
    font-weight: 600;
    display: grid;
    grid-template-columns: 15px 1fr;
    gap: 15px;
    padding: 0 25px;
    align-items: center;
    position: relative;
    transition: color 0.3s ease-in;
    will-change: color;

    span {
      transform: translateY(2px);
    }

    &:focus,
    &:hover {
      color: rgb(172 226 206);
    }
  }

  .link.active {
    background: white;
    color: #0ebe7e;
    border-radius: 8px;

    ::after {
      display: block;
      content: '';
      position: absolute;
      top: 0;
      left: calc(100% + 20px);
      height: 100%;
      background: rgba(255, 255, 255, 0.2);
      width: 20px;
      border-radius: inherit;
    }
  }

  .link.inactive {
    color: #424242 !important;
    cursor: default;
    text-decoration: none !important;
  }

  .icon {
    width: 15px;
  }

  .log-out-area {
    margin: 0 auto;
    width: 100%;
  }

  ${devices.tabletM} {
    position: absolute;
    left: 0;
    max-width: 300px;
    transform: ${({ sideBarOpen }) => (sideBarOpen ? 'translateX(0px)' : 'translateX(-300px)')};
    z-index: 1;
    transition: transform 300ms ease-in-out;
  }
`;

export const LogoutButton = styled.button`
  background: #252525;
  position: absolute;
  bottom: 0;
  margin-top: auto;
  border-radius: 8px;
  color: white;
  border: none;
  width: 100%;
  font-weight: bold;
  padding: 15px 20px;
  display: flex;
  outline: none !important;
  transition: 0.2s;

  /* :hover {
    background: white;
    color: black;
  } */

  span {
    margin-left: 15px;
  }
`;
