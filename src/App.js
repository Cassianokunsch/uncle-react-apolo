import React from 'react';
import { Router } from 'react-router-dom';

import Routes from './routes';
import History from './services/history';
import GlobalStyled from './styles/global';

const App = () => {
  return (
    <Router history={History}>
      <Routes />
      <GlobalStyled />
    </Router>
  );
};

export default App;
