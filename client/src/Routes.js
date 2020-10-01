import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { Home, SignIn, SignOut, SignUp, SignUpThankYou, Users, Welcome } from './components';
import ProtectedRoute from './components/ProtectedRoute';

function Routes() {
  return (
    <Router>
      <Switch>
        <ProtectedRoute exact path="/home" component={Home} />
        <ProtectedRoute exact path="/users" component={Users} />
        <Route exact path="/signin" component={SignIn} />
        <Route exact path="/signup" component={SignUp} />
        <Route exact path="/signup/thankyou" component={SignUpThankYou} />
        <Route exact path="/signout" component={SignOut} />
        <Route exact path="/" component={Welcome} />
      </Switch>
    </Router>
  );
}

export default Routes;
