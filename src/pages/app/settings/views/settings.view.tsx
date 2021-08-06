import { AnimatePresence } from 'framer-motion';
import React, { useState } from 'react';
import { useWindowDimensions } from '../../../../utils';
import { SettingsPageWrapper, SettingsUpdateDrawer } from '../components';

export const SettingsView: React.FC = () => {
  const { width } = useWindowDimensions();
  const [isUpdating, setUpdating] = useState<string | undefined>();

  return (
    <SettingsPageWrapper width={width}>
      <AnimatePresence>
        {isUpdating && <SettingsUpdateDrawer isUpdating={isUpdating} closeDrawer={() => setUpdating(undefined)} />}
      </AnimatePresence>
      <div className="container">
        <ul className="list">
          <li className="list-item">
            <div className="text">
              <h3>Update Warehouse</h3>
              <p>
                Add new data to the list of warehouse provided Add new data to the list of warehouse provided Add new
                data to the list of warehouse provided{' '}
              </p>
            </div>
            <div className="btn-box">
              <button type="button" onClick={() => setUpdating('warehouse')}>
                UPDATE
              </button>
            </div>
          </li>
          <li className="list-item">
            <div className="text">
              <h3>Update Package Conditions</h3>
              <p>
                Add new data to the list of warehouse provided Add new data to the list of warehouse provided Add new
                data to the list of warehouse provided{' '}
              </p>
            </div>
            <div className="btn-box">
              <button type="button" onClick={() => setUpdating('package-condition')}>
                UPDATE
              </button>
            </div>
          </li>
          {/* <li className="list-item">
            <div className="text">
              <h3>Update Shipping Channels </h3>
              <p>
                Add new data to the list of warehouse provided Add new data to
                the list of warehouse provided Add new data to the list of
                warehouse provided{' '}
              </p>
            </div>
            <div className="btn-box">
              <button type="button" onClick={() => setUpdating(true)}>UPDATE</button>
            </div>
          </li> */}
          <li className="list-item">
            <div className="text">
              <h3>Update Admin Role</h3>
              <p>
                Add new data to the list of warehouse provided Add new data to the list of warehouse provided Add new
                data to the list of warehouse provided{' '}
              </p>
            </div>
            <div className="btn-box">
              <button type="button" onClick={() => setUpdating('role')}>
                UPDATE
              </button>
            </div>
          </li>
        </ul>
      </div>
    </SettingsPageWrapper>
  );
};
