import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { Home, SignIn, SignUp, SignUpThankYou, Welcome } from './components';
// import ProtectedRoute from './ProtectedRoute';

function Routes() {
  return (
    <Router>
      <Switch>
        {/* Protected */}
        <Route exact path="/home" component={Home} />
        <Route exact path="/signin" component={SignIn} />
        <Route exact path="/signup" component={SignUp} />
        <Route exact path="/signup/thankyou" component={SignUpThankYou} />
        <Route exact path="/" component={Welcome} />
      </Switch>
    </Router>
  );
}

export default Routes;
