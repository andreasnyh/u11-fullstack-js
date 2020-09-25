import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Welcome from './components/Welcome';

function Routes() {
  return (
    <Router>
      <Switch>
        <Route path="/signin" component={SignIn} />
        <Route path="/signup" component={SignUp} />
        <Route path="/" exact component={Welcome} />
      </Switch>
    </Router>
  );
}

export default Routes;
