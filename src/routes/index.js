import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import Customers from '../pages/Customers';

const Routes = () => (
  <Switch>
    <Route path="/" component={() => <h1>Home</h1>} exact isPrivate />
    <Route path="/clientes" component={Customers} isPrivate />
    <Route path="/visitas" component={() => <h1>visitas</h1>} isPrivate />
    <Route path="/perfil" component={() => <h1>perfils</h1>} isPrivate />
    <Route path="/login" component={SignIn} />
    <Route path="/register" component={SignUp} />
    <Route path="*" component={() => <h1>Page not found</h1>} isPrivate />
  </Switch>
);

export default Routes;
