import React from 'react';
import { Link } from 'react-router-dom';

import Button from './Button';
import Card from './Card';

const Welcome = () => {
  return (
    <Card>
      <h2>Welcome Component!</h2>
      <Link to="/signup">
        <Button>Register</Button>
      </Link>
      <Link to="/signin">
        <Button>Log in</Button>
      </Link>
    </Card>
  );
};

export default Welcome;
