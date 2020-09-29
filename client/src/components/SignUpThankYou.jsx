import React from 'react';
import { useHistory } from 'react-router-dom';

import { Button, Card, CardFull, Text } from './elements';

const SignUpThankYou = () => {
  const history = useHistory();
  return (
    <>
      <CardFull>
        <Card>
          <Text
            headline="Thank You!"
            headlineSub="What happens now?"
            text="Wait for your confirmation e-mail. In the meantime..."
          />
        </Card>

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
        <Button
          history
          style={{ marginBottom: 'auto' }}
          onClick={() => {
            history.push('/signin');
          }}
        >
          Log in
        </Button>
      </CardFull>
    </>
  );
};

export default SignUpThankYou;
