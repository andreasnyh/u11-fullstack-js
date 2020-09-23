import React from 'react';
import { /* BrowserRouter as Router, */ Link, Route, Switch } from 'react-router-dom';

import Button from './Button';
import Card from './Card';

const SignUp = () => {
  return (
    <Card>
      <h2>Sign In Component!</h2>
      <Link to="/">
        <Button lightMode>Back</Button>
      </Link>

      <Switch>
        <Route path="/" />
      </Switch>
    </Card>
  );
};

export default SignUp;
