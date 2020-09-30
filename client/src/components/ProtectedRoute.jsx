/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Redirect, Route } from 'react-router-dom';

import { AuthService } from '../services';

/*
  Renders component if user is logged in
  Else Redirect to landing page
*/
const ProtectedRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (AuthService.isAuthenticated()) {
          return <Component {...props} />;
        }
        return (
          console.log('Need to be logged in'),
          (
            <Redirect
              to={{
                pathname: '/',
                state: {
                  from: props.location
                }
              }}
            />
          )
        );
      }}
    />
  );
};

export default ProtectedRoute;
