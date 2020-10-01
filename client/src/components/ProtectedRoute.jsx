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
        if (authService.currentUserValue) {
          return <Component {...props} />;
        }
        return <AccessRestricted />;
      }}
    />
  );
};

export default ProtectedRoute;
