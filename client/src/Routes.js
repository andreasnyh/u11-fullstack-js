import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import {
  AddRoom,
  AdminDashboard,
  AdminRoute,
  Home,
  ProtectedRoute,
  SignIn,
  SignOut,
  SignUp,
  SignUpThankYou,
  UserDashboard,
  Users,
  Welcome
} from './components';

function Routes() {
  return (
    <Router>
      <Switch>
        <AdminRoute exact path="/admin/addroom" component={AddRoom} />
        <AdminRoute exact path="/admin/users" component={Users} />
        <AdminRoute exact path="/admin" component={AdminDashboard} />
        <ProtectedRoute
          exact
          path="/user/dashboard"
          component={UserDashboard}
        />
        <ProtectedRoute exact path="/home" component={Home} />
        <Route exact path="/signin" component={SignIn} />
        <Route exact path="/signup" component={SignUp} />
        <Route exact path="/signup/thankyou" component={SignUpThankYou} />
        <Route exact path="/signout" component={SignOut} />
        <Route exact path="/" component={Welcome} />
        <Route path="*" component={Welcome} />
      </Switch>
    </Router>
  );
}

export default Routes;
