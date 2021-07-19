import { motion, useMotionValue } from 'framer-motion';
import React, { useEffect } from 'react';
import { MdDashboard, MdSettings, MdSupervisorAccount } from 'react-icons/md';
import { Link, NavLink } from 'react-router-dom';
import styled from 'styled-components';
import Logo from '../../../assets/images/Logo.svg';
import { compileClass, useWindowDimensions } from '../../../utils';

const Wrapper = styled(motion.div)<{
  width: number;
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
      width: 5em;
      align-items: center;
      justify-content: flex-start;
      height: 40px;
    }
  }

  /* Disable temporarily */
  &.xmobile {
    flex-direction: row;
    height: unset;
    position: absolute;

    .logo {
      display: none;
    }

    .links {
      display: flex;
      justify-content: space-between;
      width: 100%;
    }

    .link {
      padding: 10px;
      height: unset;

      span {
        display: none;
      }
    }

    .link.active {
      ::after {
        display: none;
      }
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
`;

interface SidebarLink {
  name: string;
  path: string;
  icon: React.ComponentType<any>;
  inactive?: boolean;
}

const links: SidebarLink[] = [
  { name: 'Dashboard', path: '/app/dashboard', icon: MdDashboard },
  {
    name: 'Orders',
    path: '/app/orders',
    icon: MdSupervisorAccount,
  },
  {
    name: 'Settings',
    path: '/app/settings',
    icon: MdSettings,
    inactive: false,
  },
];

interface Props {
  isMobile: boolean;
}

export const Sidebar: React.FC<Props> = ({ isMobile }) => {
  const x = useMotionValue(0);
  const position = useMotionValue('initial');
  const { width } = useWindowDimensions();

  useEffect(() => {
    if (isMobile) {
      x.set(-600);
      position.set('absolute');
    } else {
      x.set(0);
      position.set('initial');
    }
  }, [isMobile, x, position]);

  return (
    <Wrapper width={width} className={compileClass(isMobile && 'mobile')} style={{ x, position }}>
      <div>
        <div className="logo">
          <Link to="/">
            <img src={Logo} alt="App Logo" />
          </Link>
        </div>
        <div className="links">
          {links
            .filter((link) => !link.inactive)
            .map(({ name, path, icon: Icon, inactive }, i) => (
              <motion.div key={i} whileHover={inactive ? undefined : { scale: 1.035 }}>
                <NavLink
                  className={compileClass('link', inactive && 'inactive')}
                  to={path}
                  onClick={inactive ? (e) => e.preventDefault() : undefined}
                >
                  <Icon className="icon" />
                  <span>{name}</span>
                </NavLink>
              </motion.div>
            ))}
        </div>
      </div>
    </Wrapper>
  );
};
