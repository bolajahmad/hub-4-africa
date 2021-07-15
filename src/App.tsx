import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
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

            <Route path="/app/dashboard" component={Dashboard} />
            <Route path="/app/orders" component={OrdersPage} />
            <Route path="/app/settings" component={SettingsPage} />

            <Redirect to="/" />
          </Switch>
        </ApplicationContext>
      </QueryClientProvider>
    </BrowserRouter>
  );
}

export default App;
