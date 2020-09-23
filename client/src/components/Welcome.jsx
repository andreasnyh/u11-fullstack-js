import React from 'react';

import Button from './Button';

const Welcome = () => {
  return (
    <div className="welcome">
      <h1>Welcome</h1>
      <Button>Register</Button>
      <Button lightMode="lightMode">Log in</Button>
    </div>
  );
};

export default Welcome;
