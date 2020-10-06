/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Route } from 'react-router-dom';

import { authService } from '../services';
import AccessRestricted from './AccessRestricted';

/*
  Renders component if user is logged in
  Else Redirect to landing page
*/
const AdminRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        const user = authService.currentUserValue;
        const jsonUser = JSON.parse(user);
        const { roles } = jsonUser.user;
        console.log(roles);
        if (jsonUser && roles.includes('ROLE_ADMIN')) {
          return <Component {...props} currentUser={user} />;
        }
        return (
          <AccessRestricted
            {...props}
            msg="You need Admin privileges to access this page"
          />
        );
      }}
    />
  );
};

export default AdminRoute;
