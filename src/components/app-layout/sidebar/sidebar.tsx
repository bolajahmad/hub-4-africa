import { motion } from 'framer-motion';
import React, { Dispatch, SetStateAction, useRef } from 'react';
import { MdExitToApp } from 'react-icons/md';
import { Link, NavLink } from 'react-router-dom';
import Logo from '../../../assets/images/Logo.svg';
import { useAuthContext } from '../../../contexts/AuthContext';
import { compileClass, useOnClickOutside } from '../../../utils';
import { sidebarLinks } from './helpers';
import { LogoutButton, SidebarStylesWrapper } from './styles';

interface Props {
  isMobile: boolean;
  sidebarOpen: boolean;
  setSidebarOpen?: Dispatch<SetStateAction<boolean>>;
}

export const Sidebar: React.FC<Props> = ({ isMobile, sidebarOpen, setSidebarOpen }) => {
  const { logout } = useAuthContext()!;
  const ref = useRef<HTMLDivElement | null>(null);

  useOnClickOutside(ref, () => setSidebarOpen?.(false));

  return (
    <SidebarStylesWrapper ref={ref} sideBarOpen={sidebarOpen} className={compileClass(isMobile && 'mobile')}>
      <div>
        <div className="logo">
          <Link to="/">
            <img src={Logo} alt="App Logo" />
          </Link>
        </div>
        <div className="links">
          {sidebarLinks
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

        <LogoutButton onClick={logout}>
          <MdExitToApp />
          <span>Log out</span>
        </LogoutButton>
      </div>
    </SidebarStylesWrapper>
  );
};
