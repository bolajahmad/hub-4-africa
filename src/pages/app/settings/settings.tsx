import React from 'react';
import { AppLayout, Page } from '../../../components';
import { useWindowDimensions } from '../../../utils';
import { SettingsView } from './views';

export const SettingsPage: React.FC = () => {
  const { width } = useWindowDimensions();

  return (
    <AppLayout>
      <Page.WidthRestrictor width={width}>
        <SettingsView />
      </Page.WidthRestrictor>
    </AppLayout>
  );
};
