import { motion } from 'framer-motion';
import React from 'react';
import styled from 'styled-components';
import { useWindowDimensions } from '../../../../utils';
import { PackageConditionsDrawer } from './package-conditions';
import { AdminRoleDrawer } from './uodate-admin-role';
import { WarehouseDrawer } from './warehouse-drawer';

const DrawerWrapper = styled(motion.div)<{
  width: number;
}>`
  display: block;
  position: fixed;
  right: 0;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-color: #1c1c1c7a;
  bottom: 0;
  font-size: ${({ width }) => (width <= 900 ? '0.9em' : '1rem')};

  .content {
    width: 30em;
    background-color: white;
    height: 100%;
    right: 0;
    position: absolute;
    padding: 1em 0;

    > * + * {
      border-top: 1.37179px solid #efefef;
    }

    > * {
      padding: 1em 2em;
    }

    .header {
      font-size: 1.125em;
      font-weight: 800;
      color: #130f26;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .list-wrapper {
      border-top: none;
      padding: 1em 0em;

      .header {
        font-weight: 500;
        margin-top: 1.5em;
        padding: 0 2em;
        text-transform: uppercase;
        border-bottom: 1.37179px solid #efefef;
      }

      .list {
        padding: 0 2em;
        height: 20em;
        overflow: auto;

        &::-webkit-scrollbar {
          display: none;
        }

        > li + li {
          border-top: 1.37179px solid #efefef;
        }

        li {
          display: flex;
          padding: 1.5em 0 0.5em;
          align-items: flex-start;
          justify-content: space-between;
          gap: 10px;

          .text {
            flex: 1;
            display: inline-flex;
            flex-direction: column;
            gap: 10px;

            h4 {
              font-weight: 700;
            }

            span {
              font-weight: 500;
              color: #020003;
              opacity: 0.5;
            }
          }
        }
      }
    }
  }
`;

interface DrawerProps {
  closeDrawer: () => void;
  isUpdating?: string;
  title?: string;
}

export const SettingsUpdateDrawer: React.FC<DrawerProps> = ({
  closeDrawer,
  isUpdating,
}) => {
  const { width } = useWindowDimensions();

  return (
    <DrawerWrapper
      // variants={animateDrawer}
      // initial="initial"
      // exit="exit"
      // animate="animate"
      // transition={{ duration: 0.5 }}
      width={width}
    >
      {isUpdating === 'warehouse' && (
        <WarehouseDrawer closeDrawer={closeDrawer} />
      )}
      {isUpdating === 'package-condition' && (
        <PackageConditionsDrawer closeDrawer={closeDrawer} />
      )}
      {isUpdating === 'role' && <AdminRoleDrawer closeDrawer={closeDrawer} />}
    </DrawerWrapper>
  );
};
