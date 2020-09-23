import React from 'react';
import { Route, Router, Switch } from 'react-router-dom';

import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Welcome from './components/Welcome';
import history from './config/history';

function Routes() {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={Welcome} />
        <Route path="/signin" component={SignIn} />
        <Route path="/signup" component={SignUp} />
      </Switch>
    </Router>
  );
}

export default Routes;
