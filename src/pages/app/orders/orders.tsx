import { AnimatePresence } from 'framer-motion';
import React from 'react';
import { Route, Switch } from 'react-router';
import { AppLayout, Page } from '../../../components';
import { NestedPath, useWindowDimensions } from '../../../utils';
import { OrderStatusView, OrdersView, PendingOrdersView, TrackOrdersView } from './views';

const nestedPath = new NestedPath('app/orders');

export const OrdersPage: React.FC = () => {
  const { width } = useWindowDimensions();

  return (
    <AppLayout>
      <Page.WidthRestrictor width={width}>
        <Switch>
          <AnimatePresence>
            {/* path components must be wrapped in a motion component */}
            <Route exact key="orders-view" path={nestedPath.getPath('')} component={OrdersView} />
            <Route path={nestedPath.getPath('all')} key="pending-orders" component={PendingOrdersView} />
            <Route path={nestedPath.getPath('track')} key="track-orders" component={TrackOrdersView} />
            <Route path={nestedPath.getPath('status')} key="order-status" component={OrderStatusView} />
            {/* <Redirect to={nestedPath.getPath('')} /> */}
          </AnimatePresence>
        </Switch>
      </Page.WidthRestrictor>
    </AppLayout>
  );
};
