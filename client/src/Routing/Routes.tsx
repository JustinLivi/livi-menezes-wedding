import * as React from 'react';
import { Route, Switch } from 'react-router-dom';

import { Disclaimer } from '../Pages/Credits/Disclaimer';
import { LoginPage } from '../Pages/Login';
import { ProtectedRouter } from './ProtectedRouter';

export const Routes: React.SFC = () => (
  <Switch>
    <Route path='/login/:userId' exact component={LoginPage} />
    <Route path='/legal' exact component={Disclaimer} />
    <Route component={ProtectedRouter} />
  </Switch>
);
