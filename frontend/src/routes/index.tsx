import React from 'react';

import { Switch, Route } from 'react-router-dom';

import Dashboard from '../pages/Dashboard';
import Import from '../pages/Import';

import { TransactionProvider } from '../hooks/transactions';

const Routes: React.FC = () => (
  <Switch>
    <TransactionProvider>
      <Route path="/" exact component={Dashboard} />
      <Route path="/import" component={Import} />
    </TransactionProvider>
  </Switch>
);

export default Routes;
