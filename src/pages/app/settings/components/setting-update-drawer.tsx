import { Formik } from 'formik';
import { motion } from 'framer-motion';
import React from 'react';
import { FiX } from 'react-icons/fi';
import { MdDelete } from 'react-icons/md';
import styled from 'styled-components';
import { TextButton, TextInput } from '../../../../components';
import { StyledFormWrapper } from '../../../../styles';
import { UpdateWarehouseSchema, useWindowDimensions } from '../../../../utils';

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
  title?: string;
}

export const SettingsUpdateDrawer: React.FC<DrawerProps> = ({ closeDrawer }) => {
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
      <div className="content">
        <h2 className="header">
          <span>Update Warehouse</span>
          <TextButton onClick={closeDrawer}>
            <span className="visually-hidden">Close</span>
            <FiX size="24" />
          </TextButton>
        </h2>

        <Formik
          initialValues={{ warehouseName: '', warehouseCity: '', standardRate: '' }}
          validateSchema={UpdateWarehouseSchema}
          onSubmit={console.log}
        >
          {({ handleSubmit, isValid }) => {
            return (
              <StyledFormWrapper width={width} onSubmit={handleSubmit}>
                <div className="main">
                  <TextInput name="warehouseName" placeholder="WareHouse Name" />
                  <TextInput name="warehouseCity" placeholder="WareHouse City" />
                  <TextInput name="standardRate" placeholder="Standard Rate" />
                </div>

                <div className="footer mt-4">
                  <div>
                    <button type="submit" disabled={!isValid} className="submit__btn">
                      Update
                    </button>
                  </div>
                </div>
              </StyledFormWrapper>
            );
          }}
        </Formik>

        <div className="list-wrapper">
          <h3 className="header">All Warehouses</h3>
          <ul className="list">
            <li>
              <div className="text">
                <h4>London Texas Warehouse</h4>
                <span>324, texas hills newyork</span>
              </div>
              <TextButton>
                <MdDelete size="14" color="#e02e2e" />
              </TextButton>
            </li>
            <li>
              <div className="text">
                <h4>London Texas Warehouse</h4>
                <span>324, texas hills newyork</span>
              </div>
              <TextButton>
                <MdDelete size="14" color="#e02e2e" />
              </TextButton>
            </li>
          </ul>
        </div>
      </div>
    </DrawerWrapper>
  );
};
