import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Chat from './pages/chat/Chat';
import Join from './pages/join/Join';
import Login from './pages/login/Login';

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route component={Login} path="/" exact />
        <Route component={Join} path="/join" />
        <Route component={Chat} path="/chat" />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
