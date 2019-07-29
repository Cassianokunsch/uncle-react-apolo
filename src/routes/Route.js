import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { isAuthenticated } from '../store';

import AuthLayout from '../pages/_layouts/auth';
import DefaultLayout from '../pages/_layouts/default';

const RouteWrapper = ({ component: Component, isPrivate, ...rest }) => {
  if (!isAuthenticated() && isPrivate) {
    return <Redirect to="/login" />;
  }

  if (isAuthenticated() && !isPrivate) {
    return <Redirect to="/" />;
  }

  const Layout = isAuthenticated() ? DefaultLayout : AuthLayout;

  return (
    <Route
      {...rest}
      render={props => (
        <Layout>
          <Component {...props} />
        </Layout>
      )}
    />
  );
};

export default RouteWrapper;
