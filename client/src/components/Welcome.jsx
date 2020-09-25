import React from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

import Button from './Button';
import SplashImage from './SplashImage';

const StyledWelcome = styled.div`
  top: 50%;
  bottom: 0;
  width: 100%;
  padding: 2em;
  margin: 0 auto;
  background-color: lightPink;
  border-radius: 30px 30px 0 0;
  position: absolute;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const Welcome = () => {
  const history = useHistory();
  return (
    <>
      <SplashImage imgUrl="https://via.placeholder.com/414x414?text=Splash+image+placeholder" />
      <StyledWelcome>
        <h2>Welcome Component!</h2>
        {/* Margins to center buttons vertically */}

        <Button
          history
          style={{ marginTop: 'auto' }}
          onClick={() => {
            history.push('/signup');
          }}
        >
          Register
        </Button>
        <Button
          style={{ marginBottom: 'auto' }}
          onClick={() => {
            history.push('/signin');
          }}
        >
          Log in
        </Button>
      </StyledWelcome>
    </>
  );
};

export default Welcome;
