/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Route } from 'react-router-dom';

import { authService } from '../services';
import AccessRestricted from './AccessRestricted';

/*
  Renders component if user is logged in
  Else Redirect to landing page
*/
const ProtectedRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        const user = authService.currentUserValue;
        if (user === null) {
          return (
            <AccessRestricted
              {...props}
              msg="You need to log in to access this page"
            />
          );
        }
        return <Component {...props} currentUser={user} />;
      }}
    />
  );
};

export default ProtectedRoute;
