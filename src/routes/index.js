import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';

const Routes = () => (
  <Switch>
    <Route path="/" component={() => <h1>Home</h1>} exact isPrivate />
    <Route path="/clientes" component={() => <h1>clientes</h1>} isPrivate />
    <Route path="/login" component={SignIn} />
    <Route path="/register" component={SignUp} />
    <Route path="*" component={() => <h1>Page not found</h1>} isPrivate />
  </Switch>
);

export default Routes;
