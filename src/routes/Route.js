import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';

import AuthLayout from '../pages/_layouts/auth';
import DefaultLayout from '../pages/_layouts/default';

const RouteWrapper = ({ component: Component, isPrivate, token, ...rest }) => {
  if (!token && isPrivate) {
    return <Redirect to="/login" />;
  }

  if (token && !isPrivate) {
    return <Redirect to="/" />;
  }

  const Layout = token ? DefaultLayout : AuthLayout;

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

const mapStateToProps = ({ seller }) => ({
  token: seller.token,
});

export default connect(mapStateToProps)(RouteWrapper);
