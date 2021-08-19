import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { ToastNotificationArea } from './components/utils';
import ApplicationContext from './contexts';
import { Dashboard, OrdersPage, SettingsPage } from './pages/app';
import { ForgotPasswordPage, LoginPage } from './pages/auth';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 3,
    },
  },
});

function App() {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <ApplicationContext>
          <Switch>
            <Route exact path="/" component={LoginPage} />
            <Route path="/login" component={LoginPage} />
            <Route path="/forgot-password" component={ForgotPasswordPage} />

            <Route path="/dashboard" component={Dashboard} />
            <Route path="/orders" component={OrdersPage} />
            <Route path="/settings" component={SettingsPage} />

            <Redirect to="/" />
          </Switch>

          <ToastNotificationArea />
        </ApplicationContext>
      </QueryClientProvider>
    </BrowserRouter>
  );
}

export default App;
