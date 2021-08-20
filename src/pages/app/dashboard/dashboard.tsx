import React from 'react';
import { AppLayout, Page } from '../../../components';
import { DashboardView } from './views';

export const Dashboard: React.FC = () => {
  return (
    <AppLayout>
      <Page.WidthRestrictor>
        <DashboardView />
      </Page.WidthRestrictor>
    </AppLayout>
  );
};
