import React from 'react';
import { useHistory } from 'react-router-dom';

import { Button, CardFull, Text } from './elements';

const SignUpThankYou = () => {
  const history = useHistory();
  return (
    <>
      <CardFull>
        <Text headline="Thank You!" text="What happens now?" />

        {/* Margins to center buttons vertically */}
        <Button
          history
          style={{ marginTop: 'auto' }}
          onClick={() => {
            history.push('/');
          }}
        >
          Home
        </Button>
        {/*         <Button
          history
          style={{ marginBottom: 'auto' }}
          onClick={() => {
            history.push('/signin');
          }}
        >
          Log in
        </Button> */}
      </CardFull>
    </>
  );
};

export default SignUpThankYou;
