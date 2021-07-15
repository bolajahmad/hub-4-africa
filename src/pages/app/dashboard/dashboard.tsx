import React from 'react';
import { AppLayout, Page } from '../../../components';
import { useWindowDimensions } from '../../../utils';
import { DashboardView } from './views';

export const Dashboard: React.FC = () => {
  const { width } = useWindowDimensions();

  return (
    <AppLayout>
      <Page.WidthRestrictor width={width}>
        <DashboardView />
      </Page.WidthRestrictor>
    </AppLayout>
  );
};
