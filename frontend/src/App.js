import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Chat from './pages/Chat';
import Join from './pages/join/Join';

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route component={Join} path="/" exact />
        <Route component={Chat} path="/chat" />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
