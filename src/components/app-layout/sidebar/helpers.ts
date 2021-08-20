import { MdDashboard, MdSettings, MdSupervisorAccount } from 'react-icons/md';


export interface SidebarLink {
  name: string;
  path: string;
  icon: React.ComponentType<any>;
  inactive?: boolean;
}

export const sidebarLinks: SidebarLink[] = [
  { name: 'Dashboard', path: '/dashboard', icon: MdDashboard },
  {
    name: 'Orders',
    path: '/orders',
    icon: MdSupervisorAccount,
  },
  {
    name: 'Settings',
    path: '/settings',
    icon: MdSettings,
    inactive: false,
  },
];
